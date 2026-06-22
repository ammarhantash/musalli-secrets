import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop — Musalli Secrets",
  description: "Enter the current secret. Shop the live collection in the Structura storefront.",
};

// The Shop is powered by Structura (the storefront/configurator app).
//
// INTEGRATION OPTIONS (pick one — see README.md "Integrating Structura"):
//   1. Link out  — run Structura as its own app and link to it (current).
//   2. Rewrite   — proxy /studio to the Structura server via next.config.mjs.
//   3. Merge     — move Structura's catalog/configurator routes into this app.
//
// TODO: replace STRUCTURA_URL with the real storefront URL and wire it up.
export default function StudioPage() {
  const STRUCTURA_URL = "http://localhost:3001";

  return (
    <section className="mx-auto max-w-3xl px-6 py-28 text-center">
      <p className="mb-6 text-xs uppercase tracking-[0.4em] text-rosegold/80">
        The Current Secret
      </p>
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">
        Enter the Storefront
      </h1>
      <p className="mx-auto mt-6 max-w-xl leading-relaxed text-silver/80">
        Browse and configure the live collection in Structura — our jewelry
        storefront. Choose your piece, your metal, and your stone.
      </p>

      <Link
        href={STRUCTURA_URL}
        className="mt-10 inline-block rounded-full bg-rosegold px-9 py-3 font-medium text-ink transition hover:bg-rosegold-soft"
      >
        Shop the Collection →
      </Link>

      <p className="mt-6 text-sm text-silver/40">
        (Placeholder — wire this to the Structura storefront. See README.)
      </p>
    </section>
  );
}
