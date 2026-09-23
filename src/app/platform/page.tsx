import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { ProcessReveal, Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "Fleet intelligence platform", description: "One operating picture for every VIoT device: live map, zones, alerts, analytics, driver behaviour and API access.", alternates: { canonical: "/platform" } };
const features = [
  ["01", "Live fleet view", "Current asset position, trip state and the health of the device feeding the data."],
  ["02", "Zones and geofences", "Define operating areas and know when a vehicle or secured asset crosses the line."],
  ["03", "Real-time exceptions", "Surface tamper, panic, unauthorised movement and low-battery events while action is still possible."],
  ["04", "Fleet analytics", "Turn trip and event history into patterns for operations, security and maintenance decisions."],
  ["05", "Driver behaviour", "See movement patterns that warrant coaching, review or closer attention."],
  ["06", "API access", "Move trusted VIoT data into an ERP, TMS or another system already used by the business."],
];

const modules = [
  { id: "fleet-management", number: "01", name: "Fleet Management", status: "Core platform", copy: "Live fleet position, trip state, device health, zones and exceptions in one operating view." },
  { id: "ev-management", number: "02", name: "EV Management", status: "Deployment scoped", copy: "Bring available battery, charging and vehicle data into the fleet workflow after the supported vehicle inputs are confirmed." },
  { id: "e-lock", number: "03", name: "E Lock", status: "Connected security", copy: "Read lock state, tamper and unauthorised-access events with the location and time context needed to respond." },
  { id: "video", number: "04", name: "Video", status: "In development", copy: "A planned visual-safety layer for the VIoT platform. It is in active development and is not currently available to order." },
  { id: "fuel-monitoring", number: "05", name: "Fuel Monitoring", status: "Configuration dependent", copy: "Evaluate fuel inputs, reporting logic and installation constraints against the actual vehicle and operating requirement." },
];

export default function PlatformPage() {
  return <>
    <section className="page-hero"><div className="container"><p className="breadcrumb">Platform / Operating layer</p><h1>One place to know what the fleet is <em>actually doing.</em></h1><p className="page-lede">Every VIoT device reports into the same system, so location, security, vehicle health and exceptions stay connected.</p></div></section>
    <section className="section section-ink"><div className="container"><Reveal direction="left"><p className="eyebrow"><span />The operating loop</p><h2>Capture. Deliver. Read. Act.</h2></Reveal><ProcessReveal className="process-line"><div><span>01 / EDGE</span><h3>Capture</h3><p>The device records position, vehicle and security events.</p></div><div><span>02 / NETWORK</span><h3>Deliver</h3><p>Live reporting with fallback and offline storage for interruptions.</p></div><div><span>03 / PLATFORM</span><h3>Read</h3><p>One operating picture makes the current state visible.</p></div><div><span>04 / TEAM</span><h3>Act</h3><p>Alerts and history give teams the context to respond.</p></div></ProcessReveal></div></section>
    <section className="section"><div className="container"><div className="split-heading"><div><p className="eyebrow dark"><span />Capabilities</p><h2>Useful when something changes.</h2></div><p>The platform is organised around decisions, not a wall of charts. See the current state, find the exception, and trace what led to it.</p></div><div className="feature-table">{features.map(([number, title, copy]) => <div className="feature-row" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>
    <section className="section platform-modules-section"><div className="container"><div className="split-heading"><div><p className="eyebrow dark"><span />Platform areas</p><h2>Five focused operating views.</h2></div><p>Availability and data depth depend on the device, vehicle and integration scope. The platform does not imply that every module is included in every deployment.</p></div><div className="platform-module-list">{modules.map((module) => <article id={module.id} className="platform-module" key={module.id}><span>{module.number}</span><div><p>{module.status}</p><h3>{module.name}</h3></div><p>{module.copy}</p><Link href={`/contact?interest=${module.id}`} aria-label={`Discuss ${module.name}`}><ArrowIcon /></Link></article>)}</div></div></section>
    <section className="section founder-section"><div className="container founder-grid"><div><p className="eyebrow dark"><span />Integrations</p><h2>Keep the systems your operation already uses.</h2></div><div><p className="large-copy">API access lets VIoT data feed an ERP, TMS or a partner-built workflow. The platform can be the operating surface, the source system, or both—depending on the deployment.</p><Link className="text-link" href="/contact">Discuss an integration <ArrowIcon /></Link></div></div></section>
  </>;
}
