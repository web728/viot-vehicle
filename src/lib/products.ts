export type ProductIcon = "signal" | "lock" | "pulse" | "video";

export type Product = {
  slug: string;
  id: string;
  number: string;
  name: string;
  shortName: string;
  icon: ProductIcon;
  status: string;
  inDevelopment?: boolean;
  headline: string;
  lede: string;
  description: string;
  points: string[];
  specs: [string, string][];
  note?: string;
};

export const products: Product[] = [
  {
    slug: "vehicle-telematics",
    id: "ais-140",
    number: "01",
    name: "AIS-140 4G Telematics",
    shortName: "Vehicle telematics",
    icon: "signal",
    status: "Available · AIS-140 certified",
    headline: "Reliable reporting starts at the vehicle.",
    lede: "The core VIoT device keeps the data path intact through weak signal, power interruption and rough operating conditions.",
    description: "Certification establishes the baseline. VIoT is built around what happens after installation: capturing events consistently, retaining them when the network drops, and delivering them when the path returns.",
    points: ["4G LTE with 3G / 2G fallback", "GPS + GLONASS positioning", "Offline storage during interruptions", "Backup battery through power loss"],
    specs: [["Network", "4G LTE with 3G / 2G fallback"], ["Positioning", "GPS + GLONASS GNSS"], ["Resilience", "Onboard offline data logging"], ["Power", "9–36V DC input + backup battery"], ["Safety", "SOS / panic input + tamper detection"], ["Enclosure", "IP65-rated rugged housing"], ["Certification", "AIS-140 certified"]],
  },
  {
    slug: "smart-logistics-locks",
    id: "e-locks",
    number: "03",
    name: "Smart Logistics locks",
    shortName: "Logistics locks",
    icon: "lock",
    status: "Available · Cargo security",
    headline: "Know the lock state and the event around it.",
    lede: "Connect container and cargo security to the same operating picture as vehicle location and movement.",
    description: "Electronic locks add a security layer to the VIoT system. Lock state, tamper and unauthorised-access events arrive with location and time context so operations teams can see what changed and where.",
    points: ["Locked and unlocked state", "Tamper event detection", "Unauthorised-access alerts", "Location and timestamp context"],
    specs: [["State", "Locked / unlocked status"], ["Security", "Tamper event detection"], ["Access", "Unauthorised-access alerts"], ["Context", "Event location and timestamp"], ["Workflow", "Shared platform notifications"], ["Use case", "Containers and high-value cargo"]],
  },
  {
    slug: "video-telematics",
    id: "dashcams",
    number: "02",
    name: "Dashcams",
    shortName: "Video telematics",
    icon: "video",
    status: "In development · Not yet available",
    inDevelopment: true,
    headline: "Visual context is the next layer—not a current promise.",
    lede: "A visual safety layer is in development for the same VIoT platform and is not available to order today.",
    description: "The direction is to connect visual safety context with the same location, vehicle and exception data already handled by the platform. Exact features and release timing will be published only after validation.",
    points: ["Active product development", "Planned VIoT platform integration", "Designed for visual safety context", "Not currently available to order"],
    specs: [["Status", "Active development"], ["Platform", "Planned VIoT integration"], ["Purpose", "Visual safety context"], ["Ordering", "Not currently available"]],
    note: "VIoT is not taking dashcam orders yet. Exact specifications and timing will be published only after the product is validated.",
  },
  {
    slug: "smart-infra-locks",
    id: "infra-locks",
    number: "04",
    name: "Smart Infra Locks",
    shortName: "Infra locks",
    icon: "lock",
    status: "Configuration dependent",
    headline: "Connected access control for infrastructure workflows.",
    lede: "A lock is useful when its state and exceptions reach the people responsible for the site.",
    description: "VIoT evaluates smart-lock requirements against the access point, operating conditions and response workflow. Device configuration and integration scope are confirmed before a deployment is proposed.",
    points: ["Lock-state visibility", "Exception-led monitoring", "Event context in the platform", "Deployment-specific configuration"],
    specs: [["Application", "Infrastructure access workflows"], ["Monitoring", "Lock state and exceptions"], ["Platform", "VIoT event visibility"], ["Configuration", "Confirmed per deployment"]],
    note: "Exact locking mechanism, enclosure and connectivity are confirmed against the site requirement; they are not represented as one universal specification.",
  },
  {
    slug: "asset-trackers",
    id: "asset-trackers",
    number: "05",
    name: "Asset Trackers",
    shortName: "Asset trackers",
    icon: "signal",
    status: "Configuration dependent",
    headline: "Visibility for assets that do not stay with one vehicle.",
    lede: "Track the asset as the operating object, with device configuration matched to its movement and field conditions.",
    description: "Asset-tracking requirements vary by reporting interval, power availability, network conditions and enclosure needs. VIoT scopes those variables first and confirms the device specification during evaluation.",
    points: ["Asset location visibility", "Movement and exception context", "Field-condition evaluation", "Platform reporting"],
    specs: [["Use case", "Mobile and field assets"], ["Reporting", "Location and movement context"], ["Platform", "VIoT monitoring"], ["Configuration", "Confirmed per deployment"]],
    note: "Battery, connectivity and enclosure specifications are not published until the operating requirement is confirmed.",
  },
  {
    slug: "iot-sensors",
    id: "iot-sensors",
    number: "06",
    name: "IoT Sensors",
    shortName: "IoT sensors",
    icon: "pulse",
    status: "Application specific",
    headline: "Bring the relevant field event into the same operating view.",
    lede: "Sensor requirements start with the event the business needs to see—not a generic catalogue of inputs.",
    description: "VIoT evaluates sensor-led monitoring as part of a connected device and platform workflow. The sensor, input, enclosure and reporting behaviour are selected around the application.",
    points: ["Event-led monitoring", "Device-to-platform reporting", "Application-specific inputs", "Integration with operating workflows"],
    specs: [["Purpose", "Application-specific event monitoring"], ["Data path", "Device to VIoT platform"], ["Inputs", "Confirmed for the use case"], ["Integration", "Scoped per deployment"]],
    note: "No universal sensor specification is implied. Exact inputs and hardware are confirmed during technical evaluation.",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const orderedProducts = [...products].sort((a, b) => Number(a.number) - Number(b.number));
