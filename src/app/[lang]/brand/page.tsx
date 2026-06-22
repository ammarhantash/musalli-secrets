import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export default function BrandPage({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang).brandId;
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">{t.title}</h1>
      <p className="mt-6 leading-relaxed text-silver/80">{t.intro}</p>

      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">{t.conceptTitle}</h2>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        {t.conceptBody.map((p, i) => <p key={i}>{p}</p>)}
        <blockquote className="border-l-2 border-rosegold/60 pl-5 font-serif text-xl italic text-offwhite">
          {t.conceptQuote}
        </blockquote>
      </div>

      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">{t.logoTitle}</h2>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        <p>{t.logoIntro}</p>
        <ul className="space-y-3">
          {t.logoLines.map(([symbol, text]) => (
            <li key={symbol} className="flex gap-3">
              <span className="text-rosegold">{symbol}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
