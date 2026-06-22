import Link from "next/link";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import LangToggle from "./LangToggle";

export default function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const links = [
    { href: `/${lang}/collections`, label: dict.nav.collections },
    { href: `/${lang}/experience`, label: dict.nav.experience },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/brand`, label: dict.nav.brand_id },
    { href: `/${lang}/faq`, label: dict.nav.faq },
    { href: `/${lang}/studio`, label: dict.nav.shop },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-rosegold/20 bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href={`/${lang}`} className="font-serif text-2xl tracking-[0.2em] text-offwhite">
          {dict.nav.brand}
        </Link>
        <ul className="hidden items-center gap-7 text-sm tracking-wide md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-silver/80 transition hover:text-rosegold">
                {l.label}
              </Link>
            </li>
          ))}
          <li><LangToggle lang={lang} /></li>
        </ul>
      </nav>
    </header>
  );
}
