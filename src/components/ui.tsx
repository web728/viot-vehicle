import Link from "next/link";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { ArrowIcon } from "./icons";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`section ${className}`.trim()}><div className="container">{children}</div></section>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`content-card ${className}`.trim()}>{children}</article>;
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "ghost" }) {
  return <Link className={`button button-${variant}`} href={href}>{children}<ArrowIcon /></Link>;
}

type SharedFieldProps = { id: string; name: string; label: string; error?: string; className?: string; as?: "input" | "textarea" };
type FormFieldProps = SharedFieldProps & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

export function FormField({ id, name, label, error, className = "", as = "input", ...props }: FormFieldProps) {
  const errorId = `${id}-error`;
  return <div className={`field ${className}`.trim()}>
    <label htmlFor={id}>{label}</label>
    {as === "textarea"
      ? <textarea id={id} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...props as TextareaHTMLAttributes<HTMLTextAreaElement>} />
      : <input id={id} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...props as InputHTMLAttributes<HTMLInputElement>} />}
    {error && <span className="field-error" id={errorId}>{error}</span>}
  </div>;
}
