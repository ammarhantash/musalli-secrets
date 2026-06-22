import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Experience — Musalli Secrets",
  description:
    "We do not ship. We deliver — by a personal representative, to your door. Every secret comes in its own vault.",
};

const moments = [
  ["You Choose", "Browse the current secret collection. Select what calls to you. Complete your order — fully secure, MADA-accepted, VAT-included."],
  ["We Prepare", "Your pieces are selected, verified for quality and certification, and prepared with care. Every stone checked. Every clasp tested. Every certificate confirmed."],
  ["We Arrive", "A Musalli Secrets representative comes to you — at your home, your office, wherever suits you. They present your order, answer any questions, and ensure you are completely satisfied before they leave."],
];

const palette = [
  ["Indigo", "The depth of the hidden — what lies beneath, unseen, protected."],
  ["Rose Gold", "The warmth of revelation — the moment jewelry meets light."],
  ["Black", "The absolute of mystery — before the secret is opened."],
  ["Silver", "The purity of craft — the honesty of what we make."],
];

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">
        Your Jewelry Deserves More Than a Courier.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-silver/80">
        We do not ship. We deliver — in the truest sense of the word.
      </p>

      {/* Three moments --------------------------------------------------- */}
      <div className="rule-gold mx-auto my-14" />
      <ol className="space-y-8">
        {moments.map(([t, d], i) => (
          <li key={t} className="flex gap-5">
            <span className="font-serif text-3xl text-rosegold/70">{i + 1}</span>
            <div>
              <h3 className="font-serif text-xl text-offwhite">{t}</h3>
              <p className="mt-2 leading-relaxed text-silver/75">{d}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-center font-serif text-xl italic text-rosegold-soft">
        This is not logistics. This is service.
      </p>

      {/* The box --------------------------------------------------------- */}
      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">
        Every Secret Comes in Its Own Vault
      </h2>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        <p>
          The packaging is not an afterthought. It is the first reveal. Each
          piece arrives sealed in its box, as if it were waiting to be discovered
          by you alone. Dark. Private. Yours to open.
        </p>
        <p>
          The key is not just our logo. It is your permission to unlock what is
          inside.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {palette.map(([c, m]) => (
          <div key={c} className="rounded-lg border border-silver/15 bg-indigo/30 p-5">
            <h3 className="font-serif text-lg text-offwhite">{c}</h3>
            <p className="mt-1 text-sm text-silver/70">{m}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
