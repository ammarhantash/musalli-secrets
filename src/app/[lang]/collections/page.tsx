import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export default function CollectionsPage({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang).collections;
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">{t.title}</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        {t.intro.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">{t.howTitle}</h2>
      <ul className="mt-6 space-y-3 text-silver/80">
        {t.how.map(([term, desc]) => (
          <li key={term} className="flex gap-3">
            <span className="text-rosegold">◆</span>
            <span><strong className="text-offwhite">{term}</strong> — {desc}</span>
          </li>
        ))}
      </ul>

      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">{t.inspTitle}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {t.inspirations.map(([name, desc]) => (
          <div key={name} className="rounded-lg border border-silver/15 bg-indigo/30 p-5">
            <h3 className="font-serif text-lg text-offwhite">{name}</h3>
            <p className="mt-1 text-sm text-silver/70">{desc}</p>
          </div>
        ))}
      </div>

      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">{t.vaultTitle}</h2>
      <p className="mt-4 text-silver/80">{t.vaultBody}</p>
      <div className="mt-6 space-y-2 text-sm text-silver/60">
        {t.vaultItems.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    </div>
  );
}
