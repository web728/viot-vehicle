import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How VIoT Technologies LLP handles information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <>
    <section className="page-hero compact-hero"><div className="container"><p className="breadcrumb">Company / Privacy</p><h1>A plain-English <em>privacy notice.</em></h1><p className="page-lede">What we collect through this website, why we need it, and how to reach us about it.</p></div></section>
    <section className="section"><div className="container policy-layout"><aside><p className="section-index">LAST UPDATED</p><p>23 September 2026</p><a href="mailto:team@viot.in">team@viot.in</a></aside><div className="policy-copy">
      <section><h2>Information you choose to send</h2><p>When you use the contact form or email us, we receive the details you provide: your name, email, optional company name and message.</p></section>
      <section><h2>Why we use it</h2><p>We use this information to understand your enquiry, reply to you, assess whether VIoT fits the requirement and continue the business conversation you asked us to start.</p></section>
      <section><h2>Where it is kept</h2><p>Website enquiries are stored in a private MongoDB database and copied to a restricted Google Sheet. The two designated VIoT administrators also receive the enquiry by email so they can respond.</p></section>
      <section><h2>What we do not do</h2><p>We do not sell contact information or use a website enquiry to enrol you in an unrelated mailing list. We may share information with a service provider only when needed to operate these systems or respond to the enquiry.</p></section>
      <section><h2>Retention and your choices</h2><p>We keep enquiry information only for as long as it is useful for the conversation, a resulting business relationship, or applicable record-keeping requirements. You can ask us to correct or delete your contact information by writing to <a href="mailto:team@viot.in">team@viot.in</a>.</p></section>
      <section><h2>Company contact</h2><p>VIoT Technologies LLP<br />Sector 104, Noida, Uttar Pradesh 201301, India<br /><a href="mailto:team@viot.in">team@viot.in</a></p></section>
    </div></div></section>
  </>;
}
