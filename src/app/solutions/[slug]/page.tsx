import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { getSolution, solutions } from "@/lib/solutions";

export const dynamicParams = false;
export function generateStaticParams() { return solutions.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return { title: solution.name, description: solution.lede, alternates: { canonical: `/solutions/${slug}` } };
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  return <>
    <section className="page-hero"><div className="container"><p className="breadcrumb">Solutions / {solution.name}</p><h1>{solution.headline}</h1><p className="page-lede">{solution.lede}</p></div></section>
    <section className="section solution-focus"><div className="container solution-focus-grid"><div><p className="section-index">{solution.number} / SOLUTION AREA</p><h2>What the evaluation centres on.</h2><p>VIoT starts with the current operation and confirms product, connectivity and integration scope before making a deployment recommendation.</p></div><ul>{solution.priorities.map((priority) => <li key={priority}><CheckIcon /><span>{priority}</span></li>)}</ul></div></section>
    <section className="section section-ink"><div className="container founder-grid"><div><p className="eyebrow"><span />Hardware + platform</p><h2>One path from field event to operating response.</h2></div><div><p className="large-copy solution-light-copy">Devices, connectivity and the VIoT platform are evaluated together so the customer is not left reconciling separate vendors when the data breaks.</p><Link className="text-link light" href="/platform">See the platform <ArrowIcon /></Link></div></div></section>
    <section className="cta-band"><div className="container cta-grid"><div><p className="eyebrow"><span />Fit before proposal</p><h2>Bring us the actual requirement.</h2></div><div><p>No automated demo queue. Bharat or Vyom will review the operating context and reply directly.</p><Link className="button button-primary" href="/contact">Get in touch <ArrowIcon /></Link></div></div></section>
  </>;
}
