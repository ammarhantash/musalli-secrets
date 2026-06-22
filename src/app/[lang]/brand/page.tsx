import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Identity — Musalli Secrets",
  description:
    "Hidden vs. Shown. The design language of a brand that deals in secrets.",
};

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">
        The Language We Speak Without Words
      </h1>
      <p className="mt-6 leading-relaxed text-silver/80">
        A brand that deals in secrets cannot afford to be obvious. Our visual
        language is deliberate, considered, and layered — like the objects we
        sell.
      </p>

      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">The Concept: Hidden vs. Shown</h2>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        <p>
          Jewelry and secrets share a paradox: both are deeply personal, both are
          rarely shared, and both are most powerful when they are finally
          revealed.
        </p>
        <blockquote className="border-l-2 border-rosegold/60 pl-5 font-serif text-xl italic text-offwhite">
          Secrets are always hidden. Jewelry is always shown. Yet both are
          private — and never truly shared.
        </blockquote>
        <p>
          Everything we make — from the logo to the packaging to the website —
          exists somewhere on this spectrum. Dark before light. Sealed before
          open. Private before public.
        </p>
      </div>

      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">The Logo: A Key Locked in Form</h2>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        <p>
          The key and lock are not decoration. They are the brand&apos;s central
          promise: that what we offer is worth protecting, worth waiting for, and
          worth the moment of opening.
        </p>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-rosegold">╱</span>
            <span><strong className="text-offwhite">Diagonal lines</strong> carry energy and movement — something approaching, about to arrive.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-rosegold">◡</span>
            <span><strong className="text-offwhite">Curved lines</strong> soften the mystery — because luxury is never aggressive.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-rosegold">⬡</span>
            <span><strong className="text-offwhite">The hexagon</strong> references the diamond at the molecular level — beauty, understood from the inside, is mathematical.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
