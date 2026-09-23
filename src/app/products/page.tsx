import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, LockIcon, PinIcon, PulseIcon, SignalIcon } from "@/components/icons";
import { orderedProducts, type ProductIcon } from "@/lib/products";

export const metadata: Metadata = { title: "Connected devices", description: "Vehicle and video telematics, smart locks, asset trackers and IoT sensors designed around the VIoT platform.", alternates: { canonical: "/products" } };

function ProductGlyph({ icon }: { icon: ProductIcon }) {
  if (icon === "lock") return <LockIcon />;
  if (icon === "pulse") return <PulseIcon />;
  if (icon === "video") return <PinIcon />;
  return <SignalIcon />;
}

export default function ProductsPage() {
  return <>
    <section className="page-hero"><div className="container"><p className="breadcrumb">Products / Device layer</p><h1>Hardware that treats every packet as <em>accountable.</em></h1><p className="page-lede">Six device families organised around one idea: the relevant event has to survive the trip from the field to the platform.</p></div></section>
    {orderedProducts.map((product) => <section className="section product-detail" id={product.id} key={product.id}><div className="container"><div className="product-sticky"><span className="product-icon"><ProductGlyph icon={product.icon} /></span><p className="section-index">{product.number} / DEVICE FAMILY</p><h2>{product.name}</h2><span className={`availability ${product.inDevelopment ? "dev" : ""}`}>{product.status}</span></div><div className="product-body"><p>{product.description}</p><div className="spec-grid">{product.specs.slice(0, 6).map(([name, value]) => <div className="spec-item" key={name}><strong>{name}</strong><span>{value}</span></div>)}</div>{product.note && <div className="note-panel"><strong>Clear status:</strong> {product.note}</div>}<Link className="text-link product-deep-link" href={`/products/${product.slug}`}>Open product detail <ArrowIcon /></Link></div></div></section>)}
    <section className="cta-band"><div className="container cta-grid"><div><p className="eyebrow"><span />Hardware + platform</p><h2>Evaluate the whole data path.</h2></div><div><p>Tell us what you run, where it operates and what is failing today. We will tell you where VIoT fits—and where it does not.</p><Link className="button button-primary" href="/contact">Discuss your fleet <ArrowIcon /></Link></div></div></section>
  </>;
}
