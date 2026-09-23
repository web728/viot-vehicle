import { google } from "googleapis";
import nodemailer from "nodemailer";
import { getMongoClient } from "@/lib/mongodb";

type ContactSubmission = {
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: Date;
  syncedToSheet: boolean;
  emailSent: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 6;

declare global {
  var viotContactRateLimits: Map<string, number[]> | undefined;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isRateLimited(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || request.headers.get("x-real-ip") || "local";
  const now = Date.now();
  const store = global.viotContactRateLimits ?? new Map<string, number[]>();
  global.viotContactRateLimits = store;
  const recent = (store.get(key) || []).filter((time) => now - time < rateWindowMs);
  if (recent.length >= maxRequestsPerWindow) return true;
  recent.push(now);
  store.set(key, recent);
  return false;
}

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function escapeHtml(value: string) {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

async function appendToSheet(submission: ContactSubmission) {
  const auth = new google.auth.JWT({
    email: requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    key: requiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: requiredEnv("GOOGLE_SHEET_ID"),
    range: "A:E",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[submission.createdAt.toISOString(), submission.name, submission.email, submission.company || "", submission.message]] },
  });
}

async function notifyAdmins(submission: ContactSubmission) {
  const gmailUser = requiredEnv("GMAIL_USER");
  const recipients = [requiredEnv("ADMIN_EMAIL_1"), requiredEnv("ADMIN_EMAIL_2")];
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: requiredEnv("GMAIL_APP_PASSWORD") },
  });
  const subject = `New VIoT website enquiry — ${submission.company || submission.name}`;
  const details = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${submission.company || "Not provided"}`,
    `Received: ${submission.createdAt.toISOString()}`,
    "",
    submission.message,
  ].join("\n");
  await transporter.sendMail({
    from: `VIoT website <${gmailUser}>`,
    to: recipients,
    replyTo: submission.email,
    subject,
    text: details,
    html: `<h2>New VIoT website enquiry</h2><p><strong>Name:</strong> ${escapeHtml(submission.name)}</p><p><strong>Email:</strong> ${escapeHtml(submission.email)}</p><p><strong>Company:</strong> ${escapeHtml(submission.company || "Not provided")}</p><p><strong>Received:</strong> ${submission.createdAt.toISOString()}</p><hr><p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>`,
  });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Please submit the form again." }, { status: 400 });
  }

  if (clean(body.website, 100)) return Response.json({ ok: true });
  if (isRateLimited(request)) return Response.json({ message: "Too many attempts. Please wait a few minutes and try again." }, { status: 429 });

  const submission: ContactSubmission = {
    name: clean(body.name, 100),
    email: clean(body.email, 200).toLowerCase(),
    company: clean(body.company, 150) || undefined,
    message: clean(body.message, 3000),
    createdAt: new Date(),
    syncedToSheet: false,
    emailSent: false,
  };
  if (!submission.name || !emailPattern.test(submission.email) || submission.message.length < 10) {
    return Response.json({ message: "Please provide your name, a valid email, and a message of at least 10 characters." }, { status: 400 });
  }

  const mongoWrite = (async () => {
    const clientPromise = getMongoClient();
    if (!clientPromise) throw new Error("MONGODB_URI is not configured");
    const client = await clientPromise;
    return client.db("viot").collection<ContactSubmission>("contactSubmissions").insertOne(submission);
  })();
  const [mongoResult, sheetResult, emailResult] = await Promise.allSettled([mongoWrite, appendToSheet(submission), notifyAdmins(submission)]);

  if (sheetResult.status === "rejected") console.error("Google Sheets contact sync failed", sheetResult.reason);
  if (emailResult.status === "rejected") console.error("Admin contact email failed", emailResult.reason);
  if (mongoResult.status === "rejected") {
    console.error("Primary MongoDB contact write failed", mongoResult.reason);
    return Response.json({ message: "We could not send your message right now. Please try again shortly." }, { status: 500 });
  }

  try {
    const client = await getMongoClient();
    await client?.db("viot").collection<ContactSubmission>("contactSubmissions").updateOne(
      { _id: mongoResult.value.insertedId },
      { $set: { syncedToSheet: sheetResult.status === "fulfilled", emailSent: emailResult.status === "fulfilled" } },
    );
  } catch (error) {
    console.error("MongoDB delivery-status update failed", error);
  }
  return Response.json({ ok: true });
}
