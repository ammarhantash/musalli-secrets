import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export default function FaqPage({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang).faq;
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">{t.title}</h1>
      {t.groups.map((g) => (
        <section key={g.heading} className="mt-12">
          <h2 className="font-serif text-2xl text-rosegold">{g.heading}</h2>
          <dl className="mt-6 space-y-6">
            {g.qa.map(([q, a]) => (
              <div key={q}>
                <dt className="font-medium text-offwhite">{q}</dt>
                <dd className="mt-2 leading-relaxed text-silver/75">{a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
