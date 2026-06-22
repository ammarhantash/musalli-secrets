import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import WaitlistForm from "@/components/ui/WaitlistForm";

export default function HomePage({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang).home;
  const wl = getDictionary(params.lang).waitlist;
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 py-28 text-center md:py-36">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-rosegold/80">{t.eyebrow}</p>
          <h1 className="font-serif text-5xl leading-tight text-offwhite md:text-7xl">{t.heroTitle}</h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-silver/80">{t.heroBody}</p>
          <div className="mt-10">
            <Link href={`/${params.lang}/studio`} className="inline-block rounded-full bg-rosegold px-9 py-3 font-medium text-ink transition hover:bg-rosegold-soft">{t.heroCta}</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-rosegold/15 bg-indigo/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          {t.pillars.map((p) => (
            <div key={p.title} className="text-center">
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-4 font-serif text-xl text-offwhite">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver/70">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="font-serif text-4xl text-offwhite">{t.dropTitle}</h2>
        <p className="mt-6 leading-relaxed text-silver/80">{t.dropBody}</p>
        <div className="mt-8 space-y-1 text-sm text-silver/60">
          <p>{t.dropSeasonLabel} <span className="text-rosegold">[Live Collection Name]</span></p>
          <p>{t.dropRemainingLabel} <span className="text-rosegold">[Live Count]</span></p>
        </div>
        <Link href={`/${params.lang}/collections`} className="mt-8 inline-block border-b border-rosegold pb-1 text-rosegold transition hover:text-rosegold-soft">{t.dropCta}</Link>
      </section>

      <section className="border-y border-rosegold/15 bg-indigo-deep">
        <p className="mx-auto max-w-4xl px-6 py-10 text-center font-serif text-lg italic text-silver/80">{t.heritageStrip}</p>
      </section>

      <section id="waitlist" className="mx-auto max-w-xl px-6 py-24">
        <h2 className="text-center font-serif text-3xl text-offwhite">{t.waitlistTitle}</h2>
        <p className="mt-3 text-center text-silver/70">{t.waitlistBody}</p>
        <div className="mt-8"><WaitlistForm dict={wl} /></div>
      </section>
    </>
  );
}
