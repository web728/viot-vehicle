export type Solution = {
  slug: string;
  number: string;
  name: string;
  headline: string;
  lede: string;
  priorities: string[];
};

export const solutions: Solution[] = [
  { slug: "logistics-supply-chain", number: "01", name: "Logistics & Supply Chain", headline: "Connect vehicle, cargo and exception context.", lede: "Bring fleet movement, cargo-security events and operating exceptions into one accountable data path.", priorities: ["Fleet and trip visibility", "Cargo-security context", "Zone and movement exceptions", "ERP / TMS integration"] },
  { slug: "pharmaceuticals-chemicals", number: "02", name: "Pharmaceuticals & Chemicals", headline: "Start with the handling event that matters.", lede: "Evaluate connected tracking, security and sensor requirements around the actual handling workflow and compliance context.", priorities: ["Movement visibility", "Access and tamper context", "Application-specific sensing", "Traceable event history"] },
  { slug: "construction", number: "03", name: "Construction", headline: "See mobile assets across changing sites.", lede: "Structure vehicle and asset visibility around field conditions, movement patterns and site operating zones.", priorities: ["Vehicle and asset location", "Site geofences", "Movement exceptions", "Rugged field evaluation"] },
  { slug: "mining", number: "04", name: "Mining", headline: "Build for the conditions that expose weak systems.", lede: "Weak signal, unstable power, dust and vibration make mining the first environment VIoT is building for.", priorities: ["Continuous device reporting", "Offline data retention", "Field-ready power range", "Device-health monitoring"] },
  { slug: "fmcg", number: "05", name: "FMCG", headline: "Keep distribution movement and exceptions connected.", lede: "Evaluate day-to-day fleet, cargo and route workflows without creating another isolated operating tool.", priorities: ["Distribution fleet visibility", "Route and zone exceptions", "Cargo-security context", "Operational integrations"] },
  { slug: "data-centres", number: "06", name: "Data Centres", headline: "Connect physical access events to an operating view.", lede: "Scope smart-lock and sensor workflows around the infrastructure point, event response and system integration required.", priorities: ["Connected access state", "Exception alerts", "Event context", "Deployment-specific integration"] },
  { slug: "schools-universities", number: "07", name: "Schools & Universities", headline: "Make transport visibility direct and accountable.", lede: "Evaluate vehicle location, zones and exception workflows around the institution’s actual transport operation.", priorities: ["Vehicle location", "Route and zone visibility", "Exception-led alerts", "Operating-team access"] },
  { slug: "smart-infrastructure", number: "08", name: "Smart Infrastructure", headline: "Treat each field event as part of a working system.", lede: "Combine connected locks, sensors and platform visibility around the infrastructure workflow—not as disconnected devices.", priorities: ["Lock and sensor events", "Platform visibility", "Exception response", "Application-specific integration"] },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
