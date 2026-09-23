# VIoT website

Production-ready Next.js App Router website for VIoT Technologies LLP. The site is static except for `POST /api/contact`, which saves each valid enquiry to MongoDB, appends it to Google Sheets, and emails two administrators.

## Local setup

Requirements: Node.js 20+ and pnpm.

```bash
pnpm install
copy .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`. Before deployment, verify the production build with `pnpm build`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string; primary contact storage |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service-account email that has editor access to the Sheet |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Service-account private key with line breaks stored as `\n` |
| `GOOGLE_SHEET_ID` | ID between `/d/` and `/edit` in the Sheet URL |
| `GMAIL_USER` | Gmail or Google Workspace mailbox used to send admin alerts |
| `GMAIL_APP_PASSWORD` | 16-character Google App Password, without spaces |
| `ADMIN_EMAIL_1` | First notification recipient |
| `ADMIN_EMAIL_2` | Second notification recipient |

Never commit `.env.local`, service-account JSON, or any credentials.

## MongoDB Atlas

1. Create an Atlas project and a free or production cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Under **Database Access**, create an application database user with read/write access.
3. Under **Network Access**, allow the production host's outbound IP. For platforms with rotating outbound IPs, follow that host's Atlas guidance rather than leaving broad access enabled unnecessarily.
4. Select **Connect → Drivers**, copy the connection string, replace its username/password placeholders, and set it as `MONGODB_URI`.
5. The app uses database `viot` and collection `contactSubmissions`; both are created on the first successful submission.

The MongoDB record is the source of truth and contains `name`, `email`, optional `company`, `message`, `createdAt`, `syncedToSheet`, and `emailSent`.

## Google Sheet and service account

1. In [Google Cloud Console](https://console.cloud.google.com/), create or select a project and enable the **Google Sheets API**.
2. Create a service account under **IAM & Admin → Service Accounts**, then create a JSON key.
3. Put the JSON file's `client_email` into `GOOGLE_SERVICE_ACCOUNT_EMAIL`. Put `private_key` into `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, keeping it quoted and converting actual line breaks to `\n` as shown in `.env.example`.
4. Create a Google Sheet. Add these headings to row 1 in this order: `createdAt`, `name`, `email`, `company`, `message`.
5. Share the Sheet with the service-account email as **Editor**.
6. Copy the Sheet ID from its URL and set `GOOGLE_SHEET_ID`.

The API appends to columns A:E of the first sheet tab, so keep that tab as the enquiry log.

## Gmail admin notifications

1. Use a Gmail or Google Workspace account with 2-Step Verification enabled.
2. Open the Google Account **Security** page and create an App Password for the website. Google Workspace administrators may need to allow App Passwords first.
3. Set the mailbox address as `GMAIL_USER` and the generated 16-character password as `GMAIL_APP_PASSWORD`.
4. Set both admin recipients. The sender mailbox may also be one of the recipients.

Only the two admin addresses receive email. The visitor does not receive an automatic reply.

## Contact reliability model

The route validates on the server, silently accepts honeypot submissions, and attempts MongoDB, Google Sheets, and Gmail independently. Sheet or email failure is logged and recorded on the MongoDB document without showing a false failure to the visitor. A visitor-facing error is returned only when the primary MongoDB write fails. In-memory per-IP throttling provides basic spam resistance; production infrastructure may add a durable rate limiter or WAF.

## Deployment checklist

- Add every variable from `.env.example` to the hosting provider.
- Confirm the service account still has Editor access to the target Sheet.
- Confirm the Atlas network allowlist accepts the production runtime.
- Submit one real test and verify the MongoDB document, Sheet row, and both admin inboxes.
- Run `pnpm lint` and `pnpm build` before release.
