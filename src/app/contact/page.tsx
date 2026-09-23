import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Talk directly with Bharat or Vyom about a VIoT telematics, fleet security, EV or OEM requirement.", alternates: { canonical: "/contact" } };

const interestLabels: Record<string, string> = {
  "fleet-management": "Fleet Management",
  "ev-management": "EV Management",
  "e-lock": "E Lock",
  video: "Video",
  "fuel-monitoring": "Fuel Monitoring",
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { interest } = await searchParams;
  const selectedInterest = typeof interest === "string" ? interestLabels[interest] : undefined;
  const defaultMessage = selectedInterest ? `I would like to discuss ${selectedInterest}. Our current requirement is: ` : "";
  return <><section className="page-hero"><div className="container"><p className="breadcrumb">Contact / Founder-led</p><h1>Skip the demo queue. <em>Tell us the problem.</em></h1><p className="page-lede">The more specific you are about the fleet, field conditions and current gap, the more useful our first reply will be.</p></div></section><section className="section"><div className="container contact-grid"><aside className="contact-aside"><p className="eyebrow dark"><span />Direct contact</p><h2>Bharat or Vyom will reply.</h2><p>VIoT is a two-person public team today. There is no outsourced sales desk and no automated scheduling flow behind this form.</p><div className="contact-direct"><p>Prefer email?</p><a href="mailto:team@viot.in">team@viot.in</a><p>Sector 104, Noida<br />Uttar Pradesh 201301, India</p></div></aside><ContactForm defaultMessage={defaultMessage} /></div></section></>;
}
