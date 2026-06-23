import Link from "next/link";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

export default function StudioPage({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang).shop;
  return (
    <section className="mx-auto max-w-3xl px-6 py-28 text-center">
      <p className="mb-6 text-xs uppercase tracking-[0.4em] text-rosegold/80">{t.eyebrow}</p>
      <h1 className="font-serif text-4xl text-offwhite md:text-5xl">{t.title}</h1>
      <p className="mx-auto mt-6 max-w-xl leading-relaxed text-silver/80">{t.body}</p>
      <Link
        href={`/${params.lang}/shop`}
        className="mt-10 inline-block rounded-full bg-rosegold px-9 py-3 font-medium text-ink transition hover:bg-rosegold-soft"
      >
        {t.cta}
      </Link>
    </section>
  );
}
