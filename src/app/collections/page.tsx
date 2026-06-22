import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections — Musalli Secrets",
  description:
    "Every secret has a season. Four limited quarterly drops a year — thematically complete, never restocked.",
};

const inspirations = [
  ["Nature", "Flowers, desert bloom, water, moonlight"],
  ["Royalty", "Crowns, seals, court jewelry, imperial geometry"],
  ["Occasions", "Valentine's Day, Eid, milestones, anniversaries"],
  ["Architecture", "Islamic geometric patterns, Kaaba's sacred forms"],
  ["The Night", "Stars, indigo sky, hidden light"],
];

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">
        Every Secret Has a Season.
      </h1>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        <p>
          Not everything precious can be owned forever. Some things are only
          available for those who arrive in time.
        </p>
        <p>
          Four times a year, we design a complete world — one theme, one complete
          line of jewelry, one limited window to claim it. Then the secret is
          sealed again.
        </p>
      </div>

      {/* Drop model ------------------------------------------------------ */}
      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">How the Secret Works</h2>
      <ul className="mt-6 space-y-3 text-silver/80">
        {[
          ["Thematically complete", "rings, necklaces, bracelets, earrings designed as a unified collection"],
          ["Strictly limited", "no reprints, no restocks after sellout"],
          ["Online exclusive", "available only through musallisecrets.com"],
          ["Personally delivered", "a brand representative brings your order to you"],
        ].map(([t, d]) => (
          <li key={t} className="flex gap-3">
            <span className="text-rosegold">◆</span>
            <span>
              <strong className="text-offwhite">{t}</strong> — {d}
            </span>
          </li>
        ))}
      </ul>

      {/* Inspiration ----------------------------------------------------- */}
      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">Where Our Secrets Come From</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {inspirations.map(([t, d]) => (
          <div key={t} className="rounded-lg border border-silver/15 bg-indigo/30 p-5">
            <h3 className="font-serif text-lg text-offwhite">{t}</h3>
            <p className="mt-1 text-sm text-silver/70">{d}</p>
          </div>
        ))}
      </div>

      {/* The Vault ------------------------------------------------------- */}
      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">The Vault</h2>
      <p className="mt-4 text-silver/80">
        Past secrets. Once gone, they are sealed — but they tell the story of
        where we have been.
      </p>
      <div className="mt-6 space-y-2 text-sm text-silver/60">
        {/* TODO: populate from real past collections */}
        <p>Spring 2024 · [Theme] · <span className="text-rosegold">SEALED 🔒</span></p>
        <p>Summer 2024 · [Theme] · <span className="text-rosegold">SEALED 🔒</span></p>
      </div>
    </div>
  );
}
