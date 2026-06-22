# Musalli Secrets — Arabic (RTL) Bilingual + Structura Storefront Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Musalli Secrets website fully bilingual (English + Arabic with proper RTL), then wire the Structura app in as the live storefront, then install dependencies and verify the whole thing builds and renders.

**Architecture:** Next.js 14 App Router with a `[lang]` dynamic route segment (`en` | `ar`). All page copy moves into typed dictionaries (`en.ts`, `ar.ts`) so a single set of components renders either language; the `<html>` element gets `lang` and `dir` per locale. Structura is integrated via a Next.js `rewrites()` proxy so `/{lang}/shop` serves the existing Structura app under one origin. Verification is build-time + manual route checks (no unit-test runner is added — YAGNI for a static marketing site).

**Tech Stack:** Next.js 14.2.4, React 18.3, TypeScript 5.4, Tailwind CSS 3.4, MongoDB Atlas (waitlist API). Structura: separate Next.js 14 + Prisma app.

## Global Constraints

- Node.js 18+ required; package manager is `npm`. Project root: `D:\Claude\Projects\MUSALLI's`.
- Locales: exactly two — `en` (default, `dir="ltr"`) and `ar` (`dir="rtl"`). Locale codes are lowercase ISO-639-1.
- Arabic copy is **verbatim** from `D:\Claude\Projects\husni\HUSS-Co\Musalli-Secrets-WebPages.md` and `Musalli-Secrets-AboutPage.md` (the `[AR]` blocks). Never machine-translate; copy the existing strings exactly.
- Brand palette tokens already in `tailwind.config.ts`: `ink`, `indigo`, `indigo-deep`, `rosegold`, `rosegold-soft`, `silver`, `smoke`, `offwhite`. Do not introduce new color hexes.
- `.env` holds `MONGODB_URI` / `MONGODB_DB` and is gitignored — never commit it, never print its contents.
- Do **not** run `npm install` or any build/test until Phase 3 (explicit user-requested ordering). Phases 1–2 are code-only.
- **Hard gate:** after Phase 1, STOP and get explicit user confirmation before starting Phase 2 (Structura wiring).
- Commit after each task with the exact message shown.

---

## File Structure

**Phase 1 — Arabic/RTL (i18n refactor):**
- Create `src/i18n/config.ts` — locale list, default locale, `Locale` type.
- Create `src/i18n/types.ts` — the `Dictionary` shape (one source of truth for both languages).
- Create `src/i18n/dictionaries/en.ts` — English copy (extracted from current pages).
- Create `src/i18n/dictionaries/ar.ts` — Arabic copy (verbatim from HUSS-Co `.md`).
- Create `src/i18n/get-dictionary.ts` — server-side dictionary loader.
- Create `src/middleware.ts` — redirect `/` → `/en`, route locale prefixes.
- Move all pages from `src/app/*` into `src/app/[lang]/*`.
- Rewrite `src/app/layout.tsx` (minimal passthrough) + create `src/app/[lang]/layout.tsx` (sets `lang`/`dir`, renders Navbar/Footer with dictionary).
- Create `src/components/ui/LangToggle.tsx` — EN/AR switch.
- Modify `Navbar.tsx`, `Footer.tsx`, `WaitlistForm.tsx`, and every `page.tsx` to consume the dictionary.

**Phase 2 — Structura storefront:**
- Modify `next.config.mjs` — enable `/shop` → Structura rewrite.
- Modify `src/app/[lang]/studio/page.tsx` → becomes `/[lang]/shop` redirect/link into Structura.
- Modify Structura `package.json` dev script (fixed port 3001).

**Phase 3 — Install & test:**
- Create `scripts/check-dict-parity.mjs` — fails if `en.ts`/`ar.ts` key sets differ.
- No source files; install + verification only.

---

## PHASE 1 — Arabic (RTL) Bilingual

### Task 1: i18n config and dictionary type

**Files:**
- Create: `src/i18n/config.ts`
- Create: `src/i18n/types.ts`

**Interfaces:**
- Produces: `locales = ['en','ar'] as const`, `defaultLocale = 'en'`, `type Locale = 'en' | 'ar'`, `localeDir: Record<Locale,'ltr'|'rtl'>`, and `type Dictionary` (consumed by every later task).

- [ ] **Step 1: Write `src/i18n/config.ts`**

```ts
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const localeLabel: Record<Locale, string> = {
  en: "EN",
  ar: "ع",
};
```

- [ ] **Step 2: Write `src/i18n/types.ts`**

This type is the parity contract — `en.ts` and `ar.ts` must both satisfy it.

```ts
export interface Dictionary {
  nav: {
    brand: string;
    collections: string;
    experience: string;
    about: string;
    brand_id: string;
    faq: string;
    shop: string;
  };
  footer: {
    name: string;
    statement: string;
    locations: string;
    badges: string[];
    rights: string;
  };
  home: {
    eyebrow: string;
    heroTitle: string;
    heroBody: string;
    heroCta: string;
    pillars: { icon: string; title: string; body: string }[];
    dropTitle: string;
    dropBody: string;
    dropSeasonLabel: string;
    dropRemainingLabel: string;
    dropCta: string;
    heritageStrip: string;
    waitlistTitle: string;
    waitlistBody: string;
  };
  waitlist: {
    namePlaceholder: string;
    emailPlaceholder: string;
    cityPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  about: { heroStatement: string; sections: { heading: string; subheading?: string; paragraphs: string[] }[]; values: [string, string][] };
  collections: { title: string; intro: string[]; howTitle: string; how: [string, string][]; inspTitle: string; inspirations: [string, string][]; vaultTitle: string; vaultBody: string; vaultItems: string[] };
  experience: { title: string; intro: string; moments: [string, string][]; serviceLine: string; boxTitle: string; boxBody: string[]; palette: [string, string][] };
  brandId: { title: string; intro: string; conceptTitle: string; conceptBody: string[]; conceptQuote: string; logoTitle: string; logoIntro: string; logoLines: [string, string][] };
  faq: { title: string; groups: { heading: string; qa: [string, string][] }[] };
  shop: { eyebrow: string; title: string; body: string; cta: string; note: string };
  studioUrl: string;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/i18n/config.ts src/i18n/types.ts
git commit -m "feat(i18n): add locale config and Dictionary type"
```

---

### Task 2: English dictionary (extract current copy)

**Files:**
- Create: `src/i18n/dictionaries/en.ts`

**Interfaces:**
- Consumes: `Dictionary` from `src/i18n/types.ts`.
- Produces: `const en: Dictionary` (default export). Consumed by `get-dictionary.ts`.

- [ ] **Step 1: Write `src/i18n/dictionaries/en.ts`**

Move the existing English strings out of the current page components into this object. Copy values verbatim from the current `src/app/*/page.tsx`, `Navbar.tsx`, `Footer.tsx`, and `WaitlistForm.tsx` so nothing changes visually for EN. Structure:

```ts
import type { Dictionary } from "@/i18n/types";

const en: Dictionary = {
  nav: { brand: "MUSALLI·SECRETS", collections: "Collections", experience: "The Experience", about: "About", brand_id: "Brand", faq: "FAQ", shop: "Shop" },
  footer: {
    name: "Musalli Secrets.",
    statement: "The key is not just in our logo. It is in what we know about gold, about diamonds, about what makes something worth keeping. We have been trusted with the most sacred spaces in the world. Now we bring that trust — and that craft — to you.",
    locations: "MECCA · JEDDAH · EST. 1898 / 2024",
    badges: ["CR Registered", "IGI Certified", "MADA Accepted", "VAT Compliant", "Saudi-Owned"],
    rights: "All rights reserved.",
  },
  home: {
    eyebrow: "Hushed · Rare · Yours",
    heroTitle: "Where secrets turn into pieces.",
    heroBody: "The finest jewelry in the Kingdom — curated, limited, and delivered to your door. A new secret drops every season. This one won't wait long.",
    heroCta: "Discover the Current Secret →",
    pillars: [
      { icon: "🔑", title: "125 Years of Gold", body: "A family legacy stretching to 1898 — the same hands that gilded the Kaaba's doors." },
      { icon: "💎", title: "Certified Diamond Expert", body: "Our founder holds IGI certification as a diamond expert — what you receive is graded, verified, and guaranteed." },
      { icon: "📦", title: "Delivered Personally", body: "Your jewelry does not arrive in a courier box. A personal representative brings it to you." },
    ],
    dropTitle: "The Next Secret Is Almost Ready.",
    dropBody: "Every quarter, we reveal one collection. One theme. One limited run. When it's gone — it's gone.",
    dropSeasonLabel: "Current season:",
    dropRemainingLabel: "Pieces remaining:",
    dropCta: "Enter the Secret →",
    heritageStrip: "Est. 1898 in Mecca · Jewelers to the Kingdom · Creators of the Kaaba's golden doors · Now online, for you.",
    waitlistTitle: "Join the Waitlist",
    waitlistBody: "Notify lists open before each drop. Be among the first to access the next secret.",
  },
  waitlist: { namePlaceholder: "Your name", emailPlaceholder: "Email", cityPlaceholder: "City (e.g. Jeddah, Riyadh)", submit: "Join the waitlist", submitting: "Joining…", success: "You're on the list. The next secret will find you first.", error: "Something went wrong. Please try again." },
  // about/collections/experience/brandId/faq/shop: copy the English strings verbatim
  // from the current page components (src/app/about/page.tsx etc.). Each field maps
  // 1:1 to text already on the page — see types.ts for the exact shape.
  about: { heroStatement: "Some legacies are built over decades. Ours was forged over a century — and blessed by the holiest house on earth.", sections: [], values: [] },
  collections: { title: "", intro: [], howTitle: "", how: [], inspTitle: "", inspirations: [], vaultTitle: "", vaultBody: "", vaultItems: [] },
  experience: { title: "", intro: "", moments: [], serviceLine: "", boxTitle: "", boxBody: [], palette: [] },
  brandId: { title: "", intro: "", conceptTitle: "", conceptBody: [], conceptQuote: "", logoTitle: "", logoIntro: "", logoLines: [] },
  faq: { title: "Frequently Asked Questions", groups: [] },
  shop: { eyebrow: "The Current Secret", title: "Enter the Storefront", body: "Browse and configure the live collection in Structura — our jewelry storefront. Choose your piece, your metal, and your stone.", cta: "Shop the Collection →", note: "(Placeholder — wire this to the Structura storefront. See README.)" },
  studioUrl: "http://localhost:3001",
};

export default en;
```

> Fill the empty `about/collections/experience/brandId/faq` fields by lifting the literal strings already present in the corresponding `src/app/*/page.tsx` files. Do not paraphrase; this is a mechanical move so EN output is byte-identical.

- [ ] **Step 2: Commit**

```bash
git add src/i18n/dictionaries/en.ts
git commit -m "feat(i18n): add English dictionary extracted from pages"
```

---

### Task 3: Arabic dictionary (verbatim from HUSS-Co)

**Files:**
- Create: `src/i18n/dictionaries/ar.ts`

**Interfaces:**
- Consumes: `Dictionary` from `src/i18n/types.ts`.
- Produces: `const ar: Dictionary` (default export).

**Source of truth (copy `[AR]` blocks verbatim — do not translate):**
- `D:\Claude\Projects\husni\HUSS-Co\Musalli-Secrets-WebPages.md` — Home (Page 1), Collections (Page 2), Experience (Page 3), Brand Identity (Page 4), FAQ (Page 5).
- `D:\Claude\Projects\husni\HUSS-Co\Musalli-Secrets-AboutPage.md` — About (Sections 1–7, 9).

- [ ] **Step 1: Write `src/i18n/dictionaries/ar.ts`**

Mirror `en.ts` exactly, key-for-key, with the Arabic `[AR]` strings. Anchor values (already located in the source files):

```ts
import type { Dictionary } from "@/i18n/types";

const ar: Dictionary = {
  nav: { brand: "مصلي·سيكرتس", collections: "المجموعات", experience: "التجربة", about: "قصتنا", brand_id: "الهوية", faq: "الأسئلة", shop: "المتجر" },
  footer: {
    name: "مصلي سيكرتس.",
    statement: "المفتاح ليس في شعارنا فحسب. بل في ما نعرفه عن الذهب، وعن الألماس، وعن ما يجعل الشيء جديراً بالاحتفاظ به. ائتمنونا على أقدس الأماكن في العالم. الآن نُحضر ذلك الائتمان — وتلك الحرفية — إليك.",
    locations: "مكة المكرمة · جدة · تأسست ١٨٩٨ / ٢٠٢٤",
    badges: ["سجل تجاري", "معتمد IGI", "مدى مقبول", "متوافق مع ضريبة القيمة المضافة", "ملكية سعودية"],
    rights: "جميع الحقوق محفوظة.",
  },
  home: {
    eyebrow: "سرّ · نادر · لك وحدك",
    heroTitle: "حيث تتحوّل الأسرار إلى قطع.",
    heroBody: "أرقى المجوهرات في المملكة — منتقاة، محدودة، تُوصَّل إلى بابك. سرّ جديد يُطلَق كل موسم. هذا لن ينتظر طويلاً.",
    heroCta: "اكتشف السرّ الحالي ←",
    pillars: [
      { icon: "🔑", title: "١٢٥ عاماً من الذهب", body: "إرث عائلي يمتد إلى ١٨٩٨ — الأيدي ذاتها التي ذهّبت أبواب الكعبة المشرفة." },
      { icon: "💎", title: "خبير ألماس معتمد", body: "مؤسسنا حاصل على شهادة IGI كخبير ألماس — ما تستلمه مُصنَّف ومُتحقَّق منه ومضمون." },
      { icon: "📦", title: "توصيل شخصي", body: "مجوهراتك لا تصل في صندوق شحن. مندوب شخصي يُحضرها إليك." },
    ],
    dropTitle: "السرّ القادم يكاد يكون جاهزاً.",
    dropBody: "كل ربع سنة، نكشف عن مجموعة واحدة. موضوع واحد. إصدار محدود واحد. حين تنتهي — تنتهي.",
    dropSeasonLabel: "الموسم الحالي:",
    dropRemainingLabel: "القطع المتبقية:",
    dropCta: "ادخل إلى السرّ ←",
    heritageStrip: "تأسست ١٨٩٨ في مكة المكرمة · جوهرجيو المملكة · صانعو أبواب الكعبة الذهبية · الآن رقمياً، لأجلك.",
    waitlistTitle: "انضم إلى قائمة الانتظار",
    waitlistBody: "قوائم الإشعار تُفتَح قبل كل إطلاق. كن من أوائل من يصل إلى السرّ القادم.",
  },
  waitlist: { namePlaceholder: "اسمك", emailPlaceholder: "البريد الإلكتروني", cityPlaceholder: "المدينة (مثال: جدة، الرياض)", submit: "انضم إلى القائمة", submitting: "جارٍ الانضمام…", success: "أنت على القائمة. السرّ القادم سيجدك أولاً.", error: "حدث خطأ ما. يرجى المحاولة مرة أخرى." },
  about: {
    heroStatement: "بعض الإرث يُبنى على مدى عقود. إرثنا صِيغَ على مدى قرن كامل — ونال بركة أقدس بيت على وجه الأرض.",
    // sections: copy verbatim from Musalli-Secrets-AboutPage.md [AR] blocks —
    //   §2 "القصة وراء الاسم", §3 "رسالة رئيس مجلس الإدارة", §4 "رؤيتنا/رسالتنا",
    //   §6 "السّر", §7 "علم الجمال". Each becomes { heading, subheading?, paragraphs[] }.
    sections: [],
    // values: §4 table rows (الإرث/التميز والإتقان/الحصرية/الشفافية/الحداثة).
    values: [],
  },
  // collections/experience/brandId/faq: copy verbatim from Musalli-Secrets-WebPages.md
  // [AR] blocks Page 2 / Page 3 / Page 4 / Page 5 respectively, key-for-key with en.ts.
  collections: { title: "لكل سرّ موسمه.", intro: [], howTitle: "كيف يعمل السرّ", how: [], inspTitle: "من أين تأتي أسرارنا", inspirations: [], vaultTitle: "القبو", vaultBody: "أسرار مضت. حين رحلت، أُغلقت — لكنها تروي قصة ما كنّا عليه.", vaultItems: [] },
  experience: { title: "مجوهراتك تستحق أكثر من مندوب شحن.", intro: "نحن لا نُشحَن. نُوصِّل — بأتمّ معنى الكلمة.", moments: [], serviceLine: "هذه ليست لوجستيات. هذه خدمة.", boxTitle: "كل سرّ يأتي في قبوه الخاص", boxBody: [], palette: [] },
  brandId: { title: "اللغة التي نتحدث بها بلا كلمات", intro: "علامة تجارية تتعامل بالأسرار لا يمكنها أن تكون صريحة ومباشرة. لغتنا البصرية مقصودة ومدروسة ومتعددة الطبقات — مثل القطع التي نبيعها.", conceptTitle: "المفهوم: الخفي مقابل المرئي", conceptBody: [], conceptQuote: "الأسرار دائماً خفية. المجوهرات دائماً ظاهرة. لكن كلاهما خاص — ولا يُشارَك حقاً.", logoTitle: "الشعار: مفتاح محبوس في الشكل", logoIntro: "المفتاح والقفل ليسا زينة. إنهما الوعد المركزي للعلامة.", logoLines: [] },
  faq: { title: "الأسئلة الشائعة", groups: [] },
  shop: { eyebrow: "السرّ الحالي", title: "ادخل إلى المتجر", body: "تصفّح وكوّن المجموعة الحية في ستركتورا — متجر مجوهراتنا. اختر قطعتك، معدنك، وحجرك.", cta: "تسوّق المجموعة ←", note: "(عنصر نائب — اربط هذا بمتجر ستركتورا. راجع README.)" },
  studioUrl: "http://localhost:3001",
};

export default ar;
```

> The empty arrays (`sections`, `values`, `intro`, `how`, etc.) must be filled by copying the corresponding `[AR]` blocks verbatim from the two source `.md` files. The English `en.ts` defines the exact array lengths/order — match them so parity holds (Task 13 enforces this).

- [ ] **Step 2: Commit**

```bash
git add src/i18n/dictionaries/ar.ts
git commit -m "feat(i18n): add Arabic dictionary (verbatim from HUSS-Co copy)"
```

---

### Task 4: Dictionary loader

**Files:**
- Create: `src/i18n/get-dictionary.ts`

**Interfaces:**
- Consumes: `en` (default), `ar` (default), `Locale`.
- Produces: `getDictionary(locale: Locale): Dictionary` (sync). Consumed by all pages and the `[lang]` layout.

- [ ] **Step 1: Write `src/i18n/get-dictionary.ts`**

```ts
import type { Locale } from "./config";
import type { Dictionary } from "./types";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/get-dictionary.ts
git commit -m "feat(i18n): add dictionary loader"
```

---

### Task 5: Locale middleware

**Files:**
- Create: `src/middleware.ts`

**Interfaces:**
- Consumes: `locales`, `defaultLocale`.
- Produces: HTTP redirects ensuring every non-asset path is locale-prefixed.

- [ ] **Step 1: Write `src/middleware.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

function hasLocale(pathname: string): boolean {
  return locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (hasLocale(pathname)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API, and anything with a file extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
```

- [ ] **Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat(i18n): add locale-prefix middleware"
```

---

### Task 6: Restructure pages under `[lang]` and localize the layout

**Files:**
- Move: `src/app/{page.tsx,about,collections,experience,brand,faq,studio,globals.css}` → `src/app/[lang]/...`
- Modify: `src/app/layout.tsx` (becomes minimal passthrough)
- Create: `src/app/[lang]/layout.tsx`

**Interfaces:**
- Consumes: `getDictionary`, `localeDir`, `locales`, `Locale`.
- Produces: `generateStaticParams()` for both locales; localized `<html lang dir>`; Navbar/Footer receive `dict` + `lang`.

- [ ] **Step 1: Move files into the `[lang]` segment**

```bash
cd "D:/Claude/Projects/MUSALLI's"
mkdir "src/app/[lang]"
git mv src/app/page.tsx "src/app/[lang]/page.tsx"
git mv src/app/about "src/app/[lang]/about"
git mv src/app/collections "src/app/[lang]/collections"
git mv src/app/experience "src/app/[lang]/experience"
git mv src/app/brand "src/app/[lang]/brand"
git mv src/app/faq "src/app/[lang]/faq"
git mv src/app/studio "src/app/[lang]/studio"
git mv src/app/globals.css "src/app/[lang]/globals.css"
```

(`src/app/api/` stays put — the API is not localized.)

- [ ] **Step 2: Replace `src/app/layout.tsx` with a minimal root**

The root layout must not emit `<html>`/`<body>` anymore (the `[lang]` layout owns those). Keep the font links here.

```tsx
import "./[lang]/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

> Note: in App Router the root `layout.tsx` normally renders `<html>`. We delegate that to `[lang]/layout.tsx` because `dir`/`lang` are locale-dependent. The root simply passes children through.

- [ ] **Step 3: Create `src/app/[lang]/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { locales, localeDir, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "Musalli Secrets — Where secrets turn into pieces",
  description:
    "Luxury fine jewelry, est. 1898 in Mecca. IGI-certified lab-grown diamonds, limited quarterly collections, delivered personally across the Kingdom.",
};

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);
  return (
    <html lang={params.lang} dir={localeDir[params.lang]}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar dict={dict} lang={params.lang} />
        <main className="min-h-screen">{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
```

> Adds `Noto Naskh Arabic` to the existing font links for Arabic text rendering.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor(i18n): move pages under [lang] and localize root layout"
```

---

### Task 7: Localize Navbar, Footer, LangToggle

**Files:**
- Modify: `src/components/ui/Navbar.tsx`
- Modify: `src/components/ui/Footer.tsx`
- Create: `src/components/ui/LangToggle.tsx`

**Interfaces:**
- Consumes: `Dictionary`, `Locale`, current pathname (toggle).
- Produces: `<Navbar dict lang />`, `<Footer dict />`, `<LangToggle lang />`. All internal `<Link href>` become `/${lang}/...`.

- [ ] **Step 1: Create `src/components/ui/LangToggle.tsx`**

```tsx
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
```

- [ ] **Step 2: Rewrite `src/components/ui/Navbar.tsx` to consume the dictionary**

```tsx
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
```

- [ ] **Step 3: Rewrite `src/components/ui/Footer.tsx` to consume the dictionary**

```tsx
import type { Dictionary } from "@/i18n/types";

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-rosegold/20 bg-indigo-deep text-silver">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="font-serif text-2xl text-offwhite">{dict.footer.name}</p>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-silver/70">{dict.footer.statement}</p>
        <p className="mt-6 text-sm tracking-widest text-rosegold/80">{dict.footer.locations}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs tracking-wide text-silver/60">
          {dict.footer.badges.map((b) => (<span key={b}>{b}</span>))}
        </div>
        <p className="mt-10 text-xs text-silver/40">
          © {new Date().getFullYear()} {dict.footer.name} {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Navbar.tsx src/components/ui/Footer.tsx src/components/ui/LangToggle.tsx
git commit -m "feat(i18n): localize navbar, footer, add language toggle"
```

---

### Task 8: Localize Home page + WaitlistForm

**Files:**
- Modify: `src/app/[lang]/page.tsx`
- Modify: `src/components/ui/WaitlistForm.tsx`

**Interfaces:**
- Consumes: `getDictionary`, `Locale`, `dict.home`, `dict.waitlist`.
- Produces: a `params.lang`-aware Home page; `<WaitlistForm dict={dict.waitlist} />`.

- [ ] **Step 1: Rewrite `src/app/[lang]/page.tsx` to read the dictionary**

```tsx
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
```

- [ ] **Step 2: Update `WaitlistForm.tsx` to take a `dict` prop**

Replace the hardcoded English labels with `dict` fields. Change the signature and the JSX strings only:

```tsx
"use client";
import { useState } from "react";
import type { Dictionary } from "@/i18n/types";

type Status = "idle" | "sending" | "sent" | "error";

export default function WaitlistForm({ dict }: { dict: Dictionary["waitlist"] }) {
  const [status, setStatus] = useState<Status>("idle");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = { name: form.get("name"), email: form.get("email"), city: form.get("city") };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch { setStatus("error"); }
  }
  const field = "w-full rounded-lg border border-silver/20 bg-ink px-4 py-3 text-offwhite placeholder:text-silver/40 outline-none focus:border-rosegold";
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="name" placeholder={dict.namePlaceholder} required className={field} />
      <input name="email" type="email" placeholder={dict.emailPlaceholder} required className={field} />
      <input name="city" placeholder={dict.cityPlaceholder} className={field} />
      <button type="submit" disabled={status === "sending"} className="rounded-full bg-rosegold px-8 py-3 font-medium text-ink transition hover:bg-rosegold-soft disabled:opacity-60">
        {status === "sending" ? dict.submitting : dict.submit}
      </button>
      {status === "sent" && <p className="text-center text-rosegold-soft">{dict.success}</p>}
      {status === "error" && <p className="text-center text-red-400">{dict.error}</p>}
    </form>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add "src/app/[lang]/page.tsx" src/components/ui/WaitlistForm.tsx
git commit -m "feat(i18n): localize home page and waitlist form"
```

---

### Task 9: Localize About, Collections, Experience, Brand, FAQ, Studio

**Files:**
- Modify: `src/app/[lang]/about/page.tsx`
- Modify: `src/app/[lang]/collections/page.tsx`
- Modify: `src/app/[lang]/experience/page.tsx`
- Modify: `src/app/[lang]/brand/page.tsx`
- Modify: `src/app/[lang]/faq/page.tsx`
- Modify: `src/app/[lang]/studio/page.tsx`

**Interfaces:**
- Consumes: `getDictionary(params.lang)` and the matching dictionary slice per page (`about`, `collections`, `experience`, `brandId`, `faq`, `shop`, `studioUrl`).
- Produces: six locale-aware pages rendering from the dictionary (no hardcoded copy).

For **each** page, apply the same transform: add `{ params }: { params: { lang: Locale } }`, call `const t = getDictionary(params.lang).<slice>`, and replace every literal string and array with the corresponding `t.*` field. Keep the existing Tailwind classes byte-for-byte. Make any internal `<Link href>` locale-prefixed (`/${params.lang}/...`).

- [ ] **Step 1: Localize `about/page.tsx`** — map hero/sections/values to `t = getDictionary(params.lang).about`; render `t.sections.map(s => heading + s.paragraphs)` and `t.values.map(([title,body]) => …)`.

- [ ] **Step 2: Localize `collections/page.tsx`** — `t = …collections`; render `t.intro[]`, `t.how[]`, `t.inspirations[]`, `t.vaultItems[]`.

- [ ] **Step 3: Localize `experience/page.tsx`** — `t = …experience`; render `t.moments[]`, `t.boxBody[]`, `t.palette[]`, `t.serviceLine`.

- [ ] **Step 4: Localize `brand/page.tsx`** — `t = …brandId`; render `t.conceptBody[]`, `t.conceptQuote`, `t.logoLines[]`.

- [ ] **Step 5: Localize `faq/page.tsx`** — `t = …faq`; render `t.groups.map(g => g.heading + g.qa[])`.

- [ ] **Step 6: Localize `studio/page.tsx`** — `t = …shop`; render `t.eyebrow/title/body/cta/note`; the CTA `href` uses `getDictionary(params.lang).studioUrl`.

- [ ] **Step 7: Commit**

```bash
git add "src/app/[lang]"
git commit -m "feat(i18n): localize about, collections, experience, brand, faq, studio"
```

---

## ⛔ CHECKPOINT — STOP HERE

**Phase 1 is complete. Do NOT proceed to Phase 2.**

Report to the user: "Arabic (RTL) bilingual support is implemented across all pages. Ready to wire up Structura as the storefront — confirm to proceed?" Wait for explicit confirmation before starting Task 10. (Per the requested ordering, Structura wiring is gated on user sign-off.)

---

## PHASE 2 — Wire up Structura storefront *(only after confirmation)*

> Chosen integration: **rewrite/proxy** (Option 2 from the README) — least invasive way to make Structura "part of" the site for a minimal-live result, with one origin and no code merge. Structura keeps its own repo/build.

### Task 10: Pin Structura's dev port

**Files:**
- Modify: `D:\Claude\Projects\husni\structura-webapp\package.json` (the `dev`/`start` scripts)

**Interfaces:**
- Produces: Structura always serving on `:3001`, so the proxy target is stable.

- [ ] **Step 1: Set fixed ports in Structura's `package.json` scripts**

```json
"scripts": {
  "dev": "next dev -p 3001",
  "build": "next build",
  "start": "next start -p 3001",
  "postinstall": "prisma generate",
  "db:migrate": "prisma migrate dev --name init",
  "db:seed": "tsx prisma/seed.ts",
  "db:studio": "prisma studio"
}
```

- [ ] **Step 2: Commit (in the structura-webapp repo/folder)**

```bash
cd "D:/Claude/Projects/husni/structura-webapp"
git add package.json
git commit -m "chore: pin dev/start port to 3001 for storefront proxy"
```

> If `structura-webapp` is not its own git repo, skip the commit and note the change in the main project's README instead.

---

### Task 11: Enable the `/shop` rewrite in the main site

**Files:**
- Modify: `src/app/[lang]/studio/page.tsx` (redirect into the proxied storefront)
- Modify: `next.config.mjs`

**Interfaces:**
- Consumes: Structura on `:3001`.
- Produces: `/{lang}/shop/*` served by Structura via rewrite; the `/studio` CTA points to `/{lang}/shop`.

- [ ] **Step 1: Add the rewrite to `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/:lang(en|ar)/shop", destination: "http://localhost:3001" },
      { source: "/:lang(en|ar)/shop/:path*", destination: "http://localhost:3001/:path*" },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 2: Point the Studio CTA at the proxied path**

In `src/app/[lang]/studio/page.tsx`, change the CTA `href` from `studioUrl` to the in-origin shop path so it stays within the site:

```tsx
// was: href={getDictionary(params.lang).studioUrl}
<Link href={`/${params.lang}/shop`} className="mt-10 inline-block rounded-full bg-rosegold px-9 py-3 font-medium text-ink transition hover:bg-rosegold-soft">
  {t.cta}
</Link>
```

Remove the `note` placeholder line (it no longer applies). Leave `studioUrl` in the dictionaries for now (harmless; can be deleted later).

- [ ] **Step 3: Commit**

```bash
cd "D:/Claude/Projects/MUSALLI's"
git add next.config.mjs "src/app/[lang]/studio/page.tsx"
git commit -m "feat(shop): proxy /[lang]/shop to Structura storefront"
```

---

## PHASE 3 — Install & Test

### Task 12: Dictionary parity guard

**Files:**
- Create: `scripts/check-dict-parity.mjs`
- Modify: `package.json` (add `check:dict` script)

**Interfaces:**
- Produces: `npm run check:dict` — exits non-zero if `en`/`ar` key shapes diverge.

- [ ] **Step 1: Write `scripts/check-dict-parity.mjs`**

```js
// Compares the key structure of the two dictionaries. Run after build (needs TS compiled),
// or via tsx. Here we import the compiled JS is overkill — instead compare via a tsx run.
import en from "../src/i18n/dictionaries/en.ts";
import ar from "../src/i18n/dictionaries/ar.ts";

function keyPaths(obj, prefix = "") {
  if (Array.isArray(obj)) return [`${prefix}[]:${obj.length}`];
  if (obj && typeof obj === "object")
    return Object.keys(obj).sort().flatMap((k) => keyPaths(obj[k], `${prefix}.${k}`));
  return [prefix];
}

const a = keyPaths(en).join("\n");
const b = keyPaths(ar).join("\n");
if (a !== b) {
  console.error("Dictionary parity FAILED. en vs ar differ:");
  const as = new Set(a.split("\n")), bs = new Set(b.split("\n"));
  for (const x of as) if (!bs.has(x)) console.error("  only in en:", x);
  for (const x of bs) if (!as.has(x)) console.error("  only in ar:", x);
  process.exit(1);
}
console.log("Dictionary parity OK:", a.split("\n").length, "leaf paths.");
```

- [ ] **Step 2: Add the script to `package.json`**

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "check:dict": "tsx scripts/check-dict-parity.mjs"
}
```

Add `tsx` to devDependencies (used only by this script): `"tsx": "^4.15.7"`.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-dict-parity.mjs package.json
git commit -m "chore: add en/ar dictionary parity check"
```

---

### Task 13: Install dependencies

**Files:** none (install only).

- [ ] **Step 1: Check free space on D: first** (node_modules ≈ 300 MB; D: had ~6.4 GB free)

Run: `Get-PSDrive D | Select-Object Free`
Expected: at least ~1 GB free before install.

- [ ] **Step 2: Install main site deps**

Run:
```bash
cd "D:/Claude/Projects/MUSALLI's"
npm install
```
Expected: completes with `added N packages`, no `ERR!`. `node_modules/` and `package-lock.json` appear.

- [ ] **Step 3: Install Structura deps**

Run:
```bash
cd "D:/Claude/Projects/husni/structura-webapp"
npm install
```
Expected: completes; `prisma generate` runs via `postinstall`.

---

### Task 14: Build & static verification

**Files:** none (verification only).

- [ ] **Step 1: Dictionary parity**

Run: `cd "D:/Claude/Projects/MUSALLI's" && npm run check:dict`
Expected: `Dictionary parity OK: <N> leaf paths.` (exit 0). If it fails, fix the mismatched keys in `ar.ts`/`en.ts` and re-run.

- [ ] **Step 2: Type-check + production build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, and the route list shows both locales, e.g. `/[lang]` with `/en` and `/ar` prerendered, plus `/[lang]/about`, `/collections`, `/experience`, `/brand`, `/faq`, `/studio`. No TypeScript errors.

- [ ] **Step 3: Commit the lockfile**

```bash
git add package-lock.json
git commit -m "chore: add package-lock after install"
```

---

### Task 15: Manual runtime verification

**Files:** none.

- [ ] **Step 1: Start Structura (storefront), then the main site**

Terminal A:
```bash
cd "D:/Claude/Projects/husni/structura-webapp" && npm run dev   # → :3001
```
Terminal B:
```bash
cd "D:/Claude/Projects/MUSALLI's" && npm run dev                # → :3000
```

- [ ] **Step 2: Verify locale routing & RTL**

Check each, confirming expected result:
- Open `http://localhost:3000/` → redirects to `http://localhost:3000/en`.
- `http://localhost:3000/en` → English, page source has `<html lang="en" dir="ltr">`.
- `http://localhost:3000/ar` → Arabic copy, page source has `<html lang="ar" dir="rtl">`, layout mirrored right-to-left.
- Click the EN/AR toggle on `/en/about` → lands on `/ar/about` (same page, other language), and back.
- Visit `/ar/collections`, `/ar/experience`, `/ar/brand`, `/ar/faq` → all render Arabic, RTL, no missing strings (no `undefined`).

- [ ] **Step 3: Verify Structura storefront proxy**

- Open `http://localhost:3000/en/shop` → Structura storefront renders under the main origin (URL stays on `:3000`).
- On `/en` and `/ar`, the "Shop"/hero CTA navigates to `/{lang}/shop`.

- [ ] **Step 4: Verify the live waitlist → MongoDB**

- On `/en` submit the waitlist form with a test name/email → success message appears.
- Confirm the row landed in Atlas: `db.waitlist.find()` shows the document (or check Atlas UI → `musallis` → `waitlist`).
- If it errors: add your current IP under Atlas → Network Access, then retry.

- [ ] **Step 5: Final commit (any fixes from verification)**

```bash
git add -A
git commit -m "fix: address bilingual/storefront verification findings"
```

---

## Self-Review

**Spec coverage:**
- Add Arabic RTL → Tasks 1–9 (config, dictionaries, middleware, `[lang]` restructure, localized layout/components/pages). ✅
- Confirmation gate before Structura → explicit CHECKPOINT after Task 9. ✅
- Wire up Structura → Tasks 10–11 (port pin + `/shop` rewrite). ✅
- Install before testing → Task 13 install precedes Tasks 14–15 testing. ✅

**Type consistency:** `Dictionary` (Task 1) is consumed unchanged by `en.ts`/`ar.ts` (Tasks 2–3), `get-dictionary.ts` (Task 4), layout/components (Tasks 6–8), and pages (Task 9). `getDictionary(locale)` signature stable throughout. `WaitlistForm` takes `Dictionary["waitlist"]` in Task 8 and is rendered with `dict={wl}` in the same task. Navbar/Footer props (`dict`, `lang`) defined in Task 7 match their use in Task 6's layout.

**Known adaptations (called out honestly):**
- No unit-test runner is added (YAGNI for a static marketing site); "tests" are build + parity + manual route checks, per the requested install-last ordering. If you later want Playwright e2e for the locale/RTL behavior, that's a separate plan.
- The bulk Arabic prose for `about/collections/experience/brand/faq` is sourced by **verbatim copy** from the two HUSS-Co `.md` files (anchors named in Tasks 3 & 9) rather than re-typed inline here — DRY, since that copy already exists in the repo. The parity check (Task 12) guarantees structural completeness against `en.ts`.
