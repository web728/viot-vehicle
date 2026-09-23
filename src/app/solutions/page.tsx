import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { solutions } from "@/lib/solutions";

export const metadata: Metadata = { title: "Solutions", description: "VIoT connected-device and platform workflows across logistics, mining, construction, infrastructure and other operating environments.", alternates: { canonical: "/solutions" } };

export default function SolutionsPage() {
  return <>
    <section className="page-hero"><div className="container"><p className="breadcrumb">Solutions / Operating environments</p><h1>Start with the workflow. <em>Then choose the system.</em></h1><p className="page-lede">The same device can create very different value depending on the field conditions, operating decision and people responsible for acting.</p></div></section>
    <section className="section"><div className="container"><div className="split-heading"><div><p className="eyebrow dark"><span />Current solution areas</p><h2>Eight contexts.<br />No generic deployment.</h2></div><p>Each solution begins with technical and operating fit. A listed sector is not a claim of a named deployment or customer reference.</p></div><div className="solutions-grid">{solutions.map((solution) => <Link href={`/solutions/${solution.slug}`} key={solution.slug}><span>{solution.number}</span><div><h2>{solution.name}</h2><p>{solution.lede}</p></div><ArrowIcon /></Link>)}</div></div></section>
    <section className="cta-band"><div className="container cta-grid"><div><p className="eyebrow"><span />Scope the real workflow</p><h2>Describe the operating environment.</h2></div><div><p>Share the assets, field conditions, current system and the event your team needs to see.</p><Link className="button button-primary" href="/contact">Write to VIoT <ArrowIcon /></Link></div></div></section>
  </>;
}
