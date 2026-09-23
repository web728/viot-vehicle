import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://viot.in"),
  title: { default: "VIoT — Reliable fleet data, from device to platform", template: "%s | VIoT" },
  description: "VIoT connects certified telematics, smart locks, asset trackers, application-specific sensors and one operating platform.",
  keywords: ["AIS-140 telematics", "fleet telematics India", "mining fleet tracking", "e-locks", "EV telematics", "fleet management platform"],
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: "VIoT",
    title: "VIoT — Reliable fleet data, from device to platform",
    description: "Connected field devices and one operating platform, evaluated as a single accountable system.",
    url: "https://viot.in",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
