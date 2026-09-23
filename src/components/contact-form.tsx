"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "./icons";
import { FormField } from "./ui";

type Status = { kind: "idle" | "sending" | "success" | "error"; message: string };
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({ defaultMessage = "" }: { defaultMessage?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(data: Record<string, FormDataEntryValue>) {
    const next: FieldErrors = {};
    if (!String(data.name || "").trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email || ""))) next.email = "Enter a valid email address.";
    if (String(data.message || "").trim().length < 10) next.message = "Please add at least 10 characters.";
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus({ kind: "error", message: "Please check the highlighted fields." });
      return;
    }
    setStatus({ kind: "sending", message: "Sending securely…" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not send your message.");
      form.reset();
      setErrors({});
      setStatus({ kind: "success", message: "Message received. Bharat or Vyom will reply personally." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Could not send your message. Please try again." });
    }
  }

  if (status.kind === "success") return <div className="form-success" role="status" aria-live="polite">
    <span className="success-mark"><CheckIcon /></span><p className="eyebrow dark"><span />Message received</p><h2>It is with the founding team.</h2><p>{status.message}</p>
    <button className="text-link form-reset" type="button" onClick={() => setStatus({ kind: "idle", message: "" })}>Send another message <ArrowIcon /></button>
  </div>;

  return <form className="contact-form" onSubmit={handleSubmit} noValidate>
    <div className="hp-field" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <FormField id="name" name="name" label="Your name" autoComplete="name" required error={errors.name} />
    <FormField id="email" name="email" label="Email" type="email" autoComplete="email" required error={errors.email} />
    <FormField id="company" name="company" label="Company (optional)" autoComplete="organization" className="full" />
    <FormField id="message" name="message" label="Where is the current data or workflow breaking?" as="textarea" className="full" placeholder="Operating conditions, current device or platform, and the outcome you need…" defaultValue={defaultMessage} required error={errors.message} />
    <p className="form-note">Your message goes to the VIoT founding team. By sending it, you agree to our <Link href="/privacy">privacy notice</Link>.</p>
    <div className="form-actions"><button className="button button-primary" type="submit" disabled={status.kind === "sending"} aria-busy={status.kind === "sending"}><span>{status.kind === "sending" ? "Sending" : "Send to the team"}</span><ArrowIcon /></button><span className={`form-status ${status.kind === "error" ? "error" : ""}`} role="status" aria-live="polite">{status.message}</span></div>
  </form>;
}
