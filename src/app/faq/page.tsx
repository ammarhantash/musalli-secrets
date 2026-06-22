import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Musalli Secrets",
  description:
    "Answers about our collections, our jewelry, and our personal delivery.",
};

const groups = [
  {
    heading: "About the Collections",
    qa: [
      ["How often do new collections launch?", "Every quarter — four times a year. Each collection is a complete, thematically designed line."],
      ["What happens when a collection sells out?", "It is sealed. We do not restock or reprint. Past collections are archived in The Vault on our website."],
      ["Can I pre-order before a collection launches?", "Notify lists open before each drop. Join the waitlist to be among the first to access."],
      ["Are pieces sold individually or as sets?", "Both. Each piece stands alone, or can be purchased as part of a coordinated set."],
    ],
  },
  {
    heading: "About the Jewelry",
    qa: [
      ["Are the diamonds real?", "Yes — 100%. We use certified lab-grown diamonds that are physically, chemically, and optically identical to mined diamonds. Every stone comes with a certificate from an internationally recognized gemological institution."],
      ["What metals do you use?", "Gold (yellow, white, and rose), silver, and platinum — specified per piece. All metals are stated in the product listing."],
      ["What certification do your diamonds carry?", "IGI (International Gemological Institute) certification. Our founder is himself an IGI-certified diamond expert."],
      ["Do you offer resizing or adjustments?", "Yes — contact us within 14 days of delivery and we arrange it through your personal representative."],
    ],
  },
  {
    heading: "About Ordering & Delivery",
    qa: [
      ["Is delivery really personal — not a courier?", "Yes. A trained Musalli Secrets representative delivers to your location — home, office, or wherever you prefer. They present your order, answer questions, and ensure your satisfaction before departing."],
      ["What areas do you deliver to?", "Currently Jeddah and Riyadh. Expansion underway — join our notification list to be informed when we reach your city."],
      ["What payment methods do you accept?", "MADA, credit/debit cards, and bank transfer. All transactions are VAT-inclusive and fully documented."],
      ["What is your return policy?", "If your piece arrives with any defect or damage, contact us within 48 hours and we will arrange a replacement via your representative. Custom or personalized pieces are non-returnable."],
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">
        Frequently Asked Questions
      </h1>

      {groups.map((g) => (
        <section key={g.heading} className="mt-12">
          <h2 className="font-serif text-2xl text-rosegold">{g.heading}</h2>
          <dl className="mt-6 space-y-6">
            {g.qa.map(([q, a]) => (
              <div key={q}>
                <dt className="font-medium text-offwhite">{q}</dt>
                <dd className="mt-2 leading-relaxed text-silver/75">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
