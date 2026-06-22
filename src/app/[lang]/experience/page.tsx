import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export default function ExperiencePage({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang).experience;
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">{t.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-silver/80">{t.intro}</p>

      <div className="rule-gold mx-auto my-14" />
      <ol className="space-y-8">
        {t.moments.map(([title, body], i) => (
          <li key={title} className="flex gap-5">
            <span className="font-serif text-3xl text-rosegold/70">{i + 1}</span>
            <div>
              <h3 className="font-serif text-xl text-offwhite">{title}</h3>
              <p className="mt-2 leading-relaxed text-silver/75">{body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-center font-serif text-xl italic text-rosegold-soft">{t.serviceLine}</p>

      <div className="rule-gold mx-auto my-14" />
      <h2 className="font-serif text-2xl text-rosegold">{t.boxTitle}</h2>
      <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
        {t.boxBody.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {t.palette.map(([color, meaning]) => (
          <div key={color} className="rounded-lg border border-silver/15 bg-indigo/30 p-5">
            <h3 className="font-serif text-lg text-offwhite">{color}</h3>
            <p className="mt-1 text-sm text-silver/70">{meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
