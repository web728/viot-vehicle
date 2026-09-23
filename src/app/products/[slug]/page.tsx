import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, CheckIcon, LockIcon, PinIcon, PulseIcon, SignalIcon } from "@/components/icons";
import { getProduct, orderedProducts, products, type ProductIcon } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.lede,
    alternates: { canonical: `/products/${slug}` },
  };
}

function ProductIcon({ icon }: { icon: ProductIcon }) {
  if (icon === "lock") return <LockIcon />;
  if (icon === "pulse") return <PulseIcon />;
  if (icon === "video") return <PinIcon />;
  return <SignalIcon />;
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = orderedProducts.filter((item) => item.slug !== slug).slice(0, 5);

  return <>
    <section className="page-hero product-page-hero"><div className="container"><p className="breadcrumb">Products / {product.shortName}</p><h1>{product.headline}</h1><p className="page-lede">{product.lede}</p></div></section>

    <section className="section product-showcase-section"><div className="container product-showcase">
      <div className={`device-schematic device-${product.icon}`} aria-label={`${product.name} product illustration`}>
        <span className="schematic-label">VIoT / {product.number}</span>
        <span className="schematic-device"><ProductIcon icon={product.icon} /><b>{product.shortName}</b><small>DEVICE → PLATFORM</small></span>
        <span className="schematic-signal signal-a" /><span className="schematic-signal signal-b" />
        <span className="schematic-status">{product.inDevelopment ? "DEVELOPMENT" : "CONNECTED"}</span>
      </div>
      <div className="product-narrative"><p className="section-index">{product.number} / PRODUCT</p><h2>{product.name}</h2><span className={`availability ${product.inDevelopment ? "dev" : ""}`}>{product.status}</span><p>{product.description}</p><ul className="product-points">{product.points.map((point) => <li key={point}><CheckIcon />{point}</li>)}</ul><div className="button-row"><a className="button button-ghost dark" href="#specifications">View specifications</a><Link className="button button-primary" href="/contact">Get in touch <ArrowIcon /></Link></div></div>
    </div></section>

    <section className="section section-ink product-system"><div className="container"><div className="split-heading"><div><p className="eyebrow"><span />Part of one system</p><h2>The device is only useful when the data arrives.</h2></div><p>VIoT supplies the hardware and platform together, keeping one team accountable for the path from the asset to the operating decision.</p></div><div className="product-flow"><div><span>01</span><strong>Capture</strong><p>The device records the relevant vehicle, security or battery event.</p></div><div><span>02</span><strong>Deliver</strong><p>The data path carries the event into the shared platform.</p></div><div><span>03</span><strong>Act</strong><p>The operating team sees current state, exceptions and history in context.</p></div></div></div></section>

    <section className="section product-specifications" id="specifications"><div className="container spec-layout"><div><p className="section-index">SPECIFICATIONS</p><h2>What is verified today.</h2><p>Only confirmed capabilities are listed. Exact deployment fit is evaluated against the vehicle, operating environment and required workflow.</p></div><div><div className="spec-grid product-page-specs">{product.specs.map(([name, value]) => <div className="spec-item" key={name}><strong>{name}</strong><span>{value}</span></div>)}</div>{product.note && <div className="note-panel"><strong>Clear status:</strong> {product.note}</div>}</div></div></section>

    <section className="related-products"><div className="container"><p className="section-index">CONTINUE EXPLORING</p><div className="related-grid">{related.map((item) => <Link href={`/products/${item.slug}`} key={item.slug}><span>{item.number}</span><strong>{item.shortName}</strong><ArrowIcon /></Link>)}</div></div></section>

    <section className="cta-band"><div className="container cta-grid"><div><p className="eyebrow"><span />Fit before pitch</p><h2>Start with the operating conditions.</h2></div><div><p>Tell us what is running, where it operates and where the current data path fails. Bharat or Vyom will reply directly.</p><Link className="button button-primary" href="/contact">Write to VIoT <ArrowIcon /></Link></div></div></section>
  </>;
}
