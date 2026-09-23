import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon, LockIcon, PinIcon, PulseIcon, SignalIcon } from "@/components/icons";
import { SignalPath } from "@/components/signal-path";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const products = [
  { number: "01", title: "AIS-140 4G Telematics", copy: "Certified hardware built to keep reporting through weak signal, power loss and rough operating conditions.", meta: "Shipping", href: "/products/vehicle-telematics", icon: <SignalIcon /> },
  { number: "02", title: "Video telematics", copy: "A visual safety layer being developed for the same device-to-platform system.", meta: "In development", href: "/products/video-telematics", icon: <PinIcon /> },
  { number: "03", title: "Smart Logistics locks", copy: "Lock state, tamper and unauthorised-access events tied to the live fleet view.", meta: "Cargo security", href: "/products/smart-logistics-locks", icon: <LockIcon /> },
  { number: "04", title: "Smart Infra Locks", copy: "Connected lock-state and exception visibility configured for infrastructure workflows.", meta: "Configuration led", href: "/products/smart-infra-locks", icon: <LockIcon /> },
  { number: "05", title: "Asset Trackers", copy: "Asset visibility scoped around movement, power, network and field conditions.", meta: "Field assets", href: "/products/asset-trackers", icon: <SignalIcon /> },
  { number: "06", title: "IoT Sensors", copy: "Application-specific field events brought into the same operating picture.", meta: "Application specific", href: "/products/iot-sensors", icon: <PulseIcon /> },
];

export default function Home() {
  return (
    <>
      <section className="hero section-dark">
        <div className="container hero-grid">
          <Reveal className="hero-copy" direction="left" immediate>
            <p className="eyebrow"><span />Connected vehicle systems · Built in Noida</p>
            <h1>Fleet data should arrive. <em>Every time.</em></h1>
            <p className="hero-lede">VIoT combines certified telematics hardware and one monitoring platform into a single accountable system—from the vehicle to the decision.</p>
            <div className="button-row"><Link className="button button-primary" href="/contact">Talk to the founders <ArrowIcon /></Link><Link className="button button-ghost" href="/platform">See how it works</Link></div>
            <p className="founder-note">No call centre. No automated demo queue. A founder replies personally.</p>
          </Reveal>
          <Reveal direction="right" delay={.08} immediate><SignalPath /></Reveal>
        </div>
        <div className="container spec-strip" aria-label="Core device specifications">
          <div><strong>AIS-140</strong><span>Certified</span></div><div><strong>4G LTE</strong><span>3G / 2G fallback</span></div><div><strong>9–36V</strong><span>Operating range</span></div><div><strong>IP65</strong><span>Rugged enclosure</span></div>
        </div>
      </section>

      <section className="section thesis-section"><div className="container thesis-grid"><div className="section-index">01 / THE PROBLEM</div><Reveal><h2>The industry normalised unreliable data. We didn’t.</h2><p className="large-copy">A compliance device that stops reporting when the signal drops or the power flickers is not a working system. VIoT is built around continuity: capture the event, hold it safely, and deliver it to the platform when the path returns.</p><ul className="check-list"><li><CheckIcon /> Hardware and platform owned as one outcome</li><li><CheckIcon /> Offline storage instead of silent data loss</li><li><CheckIcon /> Ongoing device monitoring after deployment</li></ul></Reveal></div></section>

      <section className="section products-section" id="products"><div className="container"><div className="section-heading split-heading"><div><p className="eyebrow dark"><span />The system</p><h2>Six device families.<br />One source of truth.</h2></div><p>Different jobs, one shared data path. Every VIoT device is evaluated around the platform workflow instead of creating another isolated dashboard.</p></div><Stagger className="product-grid">{products.map((product) => <StaggerItem className="product-motion" key={product.number}><Link className="product-card" href={product.href}><div className="card-top"><span>{product.number}</span><span className="product-icon">{product.icon}</span></div><div><p className="card-meta">{product.meta}</p><h3>{product.title}</h3><p>{product.copy}</p></div><span className="text-link">Inspect product <ArrowIcon /></span></Link></StaggerItem>)}</Stagger></div></section>

      <section className="section approach-section"><div className="container approach-grid"><div className="approach-intro"><p className="eyebrow"><span />How VIoT works</p><h2>One team stays accountable from fit to field.</h2><p>VIoT is a system integrator: the device and platform are evaluated, deployed and monitored as one operating outcome.</p><Link className="text-link light" href="/about">Why the team works this way <ArrowIcon /></Link></div><div className="approach-steps"><div><span>01</span><h3>Evaluate the fit</h3><p>Start with the vehicle, field conditions and the current data gap.</p></div><div><span>02</span><h3>Configure the system</h3><p>Match the device and platform workflow to the job.</p></div><div><span>03</span><h3>Deploy the path</h3><p>Connect hardware, network behaviour and the operating view.</p></div><div><span>04</span><h3>Monitor and respond</h3><p>Stay close to device health and the people using the data.</p></div></div></div></section>

      <section className="section platform-section section-ink"><div className="container platform-grid"><div className="platform-copy"><p className="eyebrow"><span />One operating picture</p><h2>See the fleet. Catch the exception. Act.</h2><p>Location is only the start. The VIoT platform turns device events into a live operating picture for fleet, security and maintenance teams.</p><Link className="text-link light" href="/platform">Explore the platform <ArrowIcon /></Link></div><div className="capability-stack" aria-label="Platform capabilities"><div className="capability-row active"><span>01</span><strong>Live fleet map</strong><small>Current location + trip state</small></div><div className="capability-row"><span>02</span><strong>Exception alerts</strong><small>Tamper · panic · movement · battery</small></div><div className="capability-row"><span>03</span><strong>Fleet analytics</strong><small>Patterns you can act on</small></div><div className="capability-row"><span>04</span><strong>API access</strong><small>Connect ERP and TMS workflows</small></div></div></div></section>

      <section className="section industries-section"><div className="container"><div className="section-index">02 / BUILT FROM THE HARD END</div><div className="industry-feature"><div className="mine-diagram" aria-hidden="true"><span className="terrain-line line-one" /><span className="terrain-line line-two" /><span className="tower"><i /><i /><i /></span><span className="vehicle-dot"><b>UNIT 017</b></span><span className="signal-ring ring-one" /><span className="signal-ring ring-two" /><span className="coordinates">28.5355° N<br />77.3910° E</span></div><div className="industry-copy"><p className="eyebrow dark"><span />Mining fleets first</p><h2>If it holds up here, the rest gets easier.</h2><p>Weak signal. Unstable power. Dust, vibration and long shifts. Mining is where VIoT is building first because reliable data has to be proven under pressure—not in a boardroom.</p><Link className="text-link" href="/solutions">Explore every solution area <ArrowIcon /></Link></div></div><div className="industry-list"><div><span>01</span><h3>Mining operations</h3><p>Visibility that survives harsh field conditions.</p></div><div><span>02</span><h3>Commercial fleets</h3><p>Location, security and vehicle health in one view.</p></div><div><span>03</span><h3>OEM programmes</h3><p>Connectivity installed at the point of manufacture.</p></div></div></div></section>

      <section className="section founder-section"><div className="container founder-grid"><div><p className="eyebrow dark"><span />Built close to the work</p><h2>Accountability does not end when the box ships.</h2></div><div><p className="large-copy">VIoT is a new company, not a new team. We stay close to every deployment: evaluating the fit, monitoring devices in the field, and answering when something does not behave as expected.</p><Link className="text-link" href="/about">Meet the two people behind VIoT <ArrowIcon /></Link></div></div></section>

      <section className="section stage-section"><div className="container stage-grid"><div><p className="section-index">03 / WHERE WE ARE</p><h2>Early enough to stay close. Honest enough to say so.</h2></div><div className="stage-copy"><p>VIoT is a new company building first for mining fleets. We do not publish customer logos, testimonials or case studies yet because there are no named references ready to share.</p><p>When real deployment proof is available, this section is designed to hold it. Until then, the product, certification and the people accountable for the work are the proof we can stand behind.</p></div></div></section>

      <section className="cta-band"><div className="container cta-grid"><div><p className="eyebrow"><span />Start with the operating problem</p><h2>Tell us where your data breaks.</h2></div><div><p>Share the fleet, the conditions and the gap you are trying to close. Bharat or Vyom will reply directly.</p><Link className="button button-primary" href="/contact">Write to VIoT <ArrowIcon /></Link></div></div></section>
    </>
  );
}
