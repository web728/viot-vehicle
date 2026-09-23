"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowIcon } from "./icons";

const productLinks = [
  ["Vehicle telematics", "/products/vehicle-telematics"],
  ["Video telematics", "/products/video-telematics"],
  ["Smart Logistics locks", "/products/smart-logistics-locks"],
  ["Smart Infra Locks", "/products/smart-infra-locks"],
  ["Asset Trackers", "/products/asset-trackers"],
  ["IoT Sensors", "/products/iot-sensors"],
] as const;
const solutionLinks = [
  ["Logistics & Supply Chain", "/solutions/logistics-supply-chain"],
  ["Pharmaceuticals & Chemicals", "/solutions/pharmaceuticals-chemicals"],
  ["Construction", "/solutions/construction"],
  ["Mining", "/solutions/mining"],
  ["FMCG", "/solutions/fmcg"],
  ["Data Centres", "/solutions/data-centres"],
  ["Schools & Universities", "/solutions/schools-universities"],
  ["Smart Infrastructure", "/solutions/smart-infrastructure"],
] as const;
const platformLinks = [
  ["Fleet Management", "/platform#fleet-management"],
  ["EV Management", "/platform#ev-management"],
  ["E Lock", "/platform#e-lock"],
  ["Video", "/platform#video"],
  ["Fuel Monitoring", "/platform#fuel-monitoring"],
] as const;

function NavGroup({ label, href, links, active, close }: { label: string; href: string; links: ReadonlyArray<readonly [string, string]>; active: boolean; close: () => void }) {
  return <div className="nav-group"><Link className={active ? "active nav-product-link" : "nav-product-link"} href={href} onClick={close}>{label} <span aria-hidden="true">⌄</span></Link><div className="nav-flyout" aria-label={`${label} pages`}>{links.map(([itemLabel, itemHref], index) => <Link href={itemHref} key={itemHref} onClick={close}><span>{String(index + 1).padStart(2, "0")}</span>{itemLabel}</Link>)}</div></div>;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return <header className="site-header"><div className="container header-inner">
    <Link className="brand" href="/" aria-label="VIoT home" onClick={close}><span className="brand-mark">V<span>I</span>oT</span><span className="brand-rule" /><span className="brand-descriptor">Vehicle intelligence<br />built for the field</span></Link>
    <button className="menu-toggle" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /></button>
    <nav id="primary-navigation" className={open ? "nav open" : "nav"} aria-label="Primary navigation">
      <Link className={pathname === "/" ? "active" : ""} href="/" onClick={close}>Home</Link>
      <Link className={pathname === "/about" ? "active" : ""} href="/about" onClick={close}>About Us</Link>
      <NavGroup label="Products" href="/products" links={productLinks} active={pathname.startsWith("/products")} close={close} />
      <NavGroup label="Solutions" href="/solutions" links={solutionLinks} active={pathname.startsWith("/solutions")} close={close} />
      <NavGroup label="Platform" href="/platform" links={platformLinks} active={pathname.startsWith("/platform")} close={close} />
      <Link className="nav-contact" href="/contact" onClick={close}>Get In Touch <ArrowIcon /></Link>
    </nav>
  </div></header>;
}
