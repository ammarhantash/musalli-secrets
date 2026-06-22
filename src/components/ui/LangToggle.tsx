"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabel, type Locale } from "@/i18n/config";

export default function LangToggle({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const other = locales.find((l) => l !== lang) ?? "en";
  // Swap the leading /<lang> segment for the other locale.
  const target = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);
  return (
    <Link href={target} className="text-silver/70 transition hover:text-rosegold">
      {localeLabel[other]}
    </Link>
  );
}
