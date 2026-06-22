import Link from "next/link";
import WaitlistForm from "@/components/ui/WaitlistForm";

const pillars = [
  {
    icon: "🔑",
    title: "125 Years of Gold",
    body: "A family legacy stretching to 1898 — the same hands that gilded the Kaaba's doors.",
  },
  {
    icon: "💎",
    title: "Certified Diamond Expert",
    body: "Our founder holds IGI certification as a diamond expert — what you receive is graded, verified, and guaranteed.",
  },
  {
    icon: "📦",
    title: "Delivered Personally",
    body: "Your jewelry does not arrive in a courier box. A personal representative brings it to you.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero ------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-28 text-center md:py-36">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-rosegold/80">
            Hushed · Rare · Yours
          </p>
          <h1 className="font-serif text-5xl leading-tight text-offwhite md:text-7xl">
            Where secrets turn into pieces.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-silver/80">
            The finest jewelry in the Kingdom — curated, limited, and delivered
            to your door. A new secret drops every season. This one won&apos;t
            wait long.
          </p>
          <div className="mt-10">
            <Link
              href="/studio"
              className="inline-block rounded-full bg-rosegold px-9 py-3 font-medium text-ink transition hover:bg-rosegold-soft"
            >
              Discover the Current Secret →
            </Link>
          </div>
        </div>
      </section>

      {/* Three value pillars --------------------------------------------- */}
      <section className="border-y border-rosegold/15 bg-indigo/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="text-center">
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-4 font-serif text-xl text-offwhite">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver/70">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Collection drop teaser ------------------------------------------ */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-serif text-4xl text-offwhite">
          The Next Secret Is Almost Ready.
        </h2>
        <p className="mt-6 leading-relaxed text-silver/80">
          Every quarter, we reveal one collection. One theme. One limited run.
          When it&apos;s gone — it&apos;s gone.
        </p>
        <div className="mt-8 space-y-1 text-sm text-silver/60">
          {/* TODO: wire these to the live collection data */}
          <p>
            Current season:{" "}
            <span className="text-rosegold">[Live Collection Name]</span>
          </p>
          <p>
            Pieces remaining: <span className="text-rosegold">[Live Count]</span>
          </p>
        </div>
        <Link
          href="/collections"
          className="mt-8 inline-block border-b border-rosegold pb-1 text-rosegold transition hover:text-rosegold-soft"
        >
          Enter the Secret →
        </Link>
      </section>

      {/* Heritage strip --------------------------------------------------- */}
      <section className="border-y border-rosegold/15 bg-indigo-deep">
        <p className="mx-auto max-w-4xl px-6 py-10 text-center font-serif text-lg italic text-silver/80">
          Est. 1898 in Mecca · Jewelers to the Kingdom · Creators of the
          Kaaba&apos;s golden doors · Now online, for you.
        </p>
      </section>

      {/* Waitlist (live — writes to MongoDB) ----------------------------- */}
      <section id="waitlist" className="mx-auto max-w-xl px-6 py-24">
        <h2 className="text-center font-serif text-3xl text-offwhite">
          Join the Waitlist
        </h2>
        <p className="mt-3 text-center text-silver/70">
          Notify lists open before each drop. Be among the first to access the
          next secret.
        </p>
        <div className="mt-8">
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
