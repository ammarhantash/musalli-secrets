import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Musalli Secrets",
  description:
    "A century of gold, blessed by the holiest house on earth. The story of Musalli Secrets and its founder, Husni Ahmed Musalli.",
};

const values = [
  ["Legacy", "Every piece we make is accountable to 125 years of our family's reputation."],
  ["Mastery", "Our founder holds diamond expert certification from the world's most respected gemological institutes."],
  ["Exclusivity", "We release on our terms — curated quarterly secrets, never mass-produced."],
  ["Integrity", "We disclose everything: origin, grade, composition, and value — nothing hidden."],
  ["Modernity", "We embrace lab-grown diamond innovation without apology — science and beauty are not opposites."],
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      {/* Hero statement -------------------------------------------------- */}
      <p className="text-center font-serif text-3xl leading-snug text-offwhite md:text-4xl">
        Some legacies are built over decades. Ours was forged over a century —
        and blessed by the holiest house on earth.
      </p>

      <div className="rule-gold mx-auto my-16" />

      {/* Heritage -------------------------------------------------------- */}
      <h2 className="font-serif text-3xl text-rosegold">The Story Behind the Name</h2>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        <p>
          Musalli Secrets was not born in a boardroom. It was born in a
          workshop, passed down through the hands of craftsmen, carried in the
          memory of gold dust and polished stone.
        </p>
        <p>
          The name <em>Musalli</em> stretches back to <strong>1898</strong> — to
          a family that did not merely sell jewelry, but built the very
          foundation of the gold industry in the Kingdom of Saudi Arabia.
          Alongside them, the Al-Rais family established the first gold
          manufacturing factory in the country, a workshop that would grow to
          become one of the three largest jewelry factories in the world by
          1996.
        </p>
        <p>
          From these workshops, gold was not only shaped into adornments — it
          was shaped into history. The <strong>doors of the Holy Kaaba</strong>{" "}
          were crafted in gold by these same hands, in these same foundries.
          That is not a marketing claim. It is a lineage.
        </p>
        <p>
          Today, Musalli Secrets carries that legacy forward — not as a monument
          to the past, but as a living standard for the present.
        </p>
      </div>

      {/* Chairman's message --------------------------------------------- */}
      <div className="rule-gold mx-auto my-16" />
      <h2 className="font-serif text-3xl text-rosegold">A Message from the Chairman</h2>
      <p className="mt-1 text-sm tracking-wide text-silver/60">Husni Ahmed Musalli</p>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        <p>
          I did not choose jewelry. Jewelry chose me — long before I was old
          enough to choose anything at all.
        </p>
        <p>
          I was born in Mecca, at the hour of Fajr, on the last day of November
          1988. From childhood, my mother sent me to the workshops, the
          factories, the storefronts — not as a student on a field trip, but as
          a member of a family for whom gold was a language. At twenty-one, I
          traveled to India for a full year — six months of intensive study at
          the International Gemological Institute, and six months working without
          a salary at Rosy Blue, then the largest diamond company in India and
          second largest in the world. I came back a Certified Diamond Expert.
        </p>
        <p>
          Musalli Secrets is not my ambition. It is my inheritance — and my
          responsibility. We craft jewelry for those who understand that true
          luxury is not about price. It is about meaning.
        </p>
        <p className="text-silver/60">— Husni Ahmed Musalli, Founder &amp; Chairman</p>
      </div>

      {/* Vision / Mission / Values -------------------------------------- */}
      <div className="rule-gold mx-auto my-16" />
      <h2 className="font-serif text-3xl text-rosegold">Vision, Mission &amp; Values</h2>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        <p>
          <strong className="text-offwhite">Our Vision —</strong> To be the most
          trusted and coveted fine jewelry destination in the Arab world, where a
          century of heritage meets the pinnacle of modern gemology.
        </p>
        <p>
          <strong className="text-offwhite">Our Mission —</strong> To deliver
          extraordinary jewelry experiences through curated, limited collections
          that celebrate beauty, craftsmanship, and meaning — made accessible
          through an exclusive online channel that brings the boutique to your
          door.
        </p>
      </div>
      <dl className="mt-8 space-y-4">
        {values.map(([title, body]) => (
          <div key={title} className="border-l-2 border-rosegold/50 pl-4">
            <dt className="font-serif text-lg text-offwhite">{title}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-silver/70">{body}</dd>
          </div>
        ))}
      </dl>

      {/* The science of beauty ------------------------------------------ */}
      <div className="rule-gold mx-auto my-16" />
      <h2 className="font-serif text-3xl text-rosegold">The Science of Beauty</h2>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        <p>
          Today, the same process that took the earth millennia — the same
          temperature, the same pressure, the same molecular transformation — can
          be replicated in weeks by human innovation. The result is chemically,
          physically, and optically identical to a mined diamond.
        </p>
        <p>
          We choose to embrace this science. Not because it is cheaper — but
          because it is extraordinary. Our lab-grown diamonds are 100% real,
          certified by international gemological institutions, environmentally
          responsible, and graded with full transparency.
        </p>
        <p>
          Our family has shaped gold for 125 years. Now we shape the future of
          what diamonds can be.
        </p>
      </div>
    </div>
  );
}
