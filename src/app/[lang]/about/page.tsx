import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export default function AboutPage({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang).about;
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-center font-serif text-3xl leading-snug text-offwhite md:text-4xl">
        {t.heroStatement}
      </p>

      {t.sections.map((s, i) => (
        <div key={i}>
          <div className="rule-gold mx-auto my-16" />
          <h2 className="font-serif text-3xl text-rosegold">{s.heading}</h2>
          {s.subheading && (
            <p className="mt-1 text-sm tracking-wide text-silver/60">{s.subheading}</p>
          )}
          <div className="mt-6 space-y-5 leading-relaxed text-silver/80">
            {s.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
        </div>
      ))}

      <div className="rule-gold mx-auto my-16" />
      <dl className="mt-8 space-y-4">
        {t.values.map(([title, body]) => (
          <div key={title} className="border-l-2 border-rosegold/50 pl-4">
            <dt className="font-serif text-lg text-offwhite">{title}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-silver/70">{body}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
