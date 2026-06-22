# Musalli Secrets — Website

The brand website for **Musalli Secrets**, a luxury fine-jewelry house (est. 1898, Mecca). Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**. The **Structura** app serves as the storefront. A live waitlist form writes signups to **MongoDB Atlas**.

> Content source: `D:\Claude\Projects\husni\HUSS-Co\` — `Musalli-Secrets-WebPages.md`, `Musalli-Secrets-AboutPage.md`, and `HUSS-Co-ContentIndex.md`. The English copy is in place; **Arabic copy is ready in those files** to add next (see TODO).

## Getting started

```bash
npm install
npm run dev      # → http://localhost:3000
```

Requires Node.js 18+. Credentials are read from `.env` (already created — never commit it).

## Pages

| Route | Page | Source section |
|-------|------|----------------|
| `/` | Home — hero, value pillars, drop teaser, heritage, waitlist | WebPages · Page 1 |
| `/collections` | Collections — drop model, inspiration, The Vault | WebPages · Page 2 |
| `/experience` | The Experience — personal delivery, the vault box | WebPages · Page 3 |
| `/brand` | Brand Identity — "Hidden vs. Shown", logo philosophy | WebPages · Page 4 |
| `/faq` | Customer FAQ | WebPages · Page 5 |
| `/about` | About — heritage, Chairman's message, values, founder, science | AboutPage (all) |
| `/studio` | Shop — Structura storefront entry | — |

## Brand palette (Tailwind)

`ink` (near-black) · `indigo` · `rosegold` · `silver` · `offwhite` — dark luxury theme reflecting "darkness to light".

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, brand fonts, Navbar + Footer
│   ├── page.tsx                # Home
│   ├── about|collections|experience|brand|faq/page.tsx
│   ├── studio/page.tsx         # Structura storefront entry
│   └── api/contact/route.ts    # POST → waitlist signup → MongoDB
├── components/ui/              # Navbar, Footer, WaitlistForm
└── lib/mongodb.ts              # MongoDB connection helper
```

## Integrating Structura (the storefront)

`structura-webapp` (`D:\Claude\Projects\husni\structura-webapp`) is the Next.js jewelry storefront. Make it part of this site, in order of effort:

1. **Link out (current).** Run Structura separately; `/studio` links to it.
2. **Rewrite/proxy.** Run Structura on `:3001`, uncomment `rewrites()` in `next.config.mjs` so `/studio/*` serves it.
3. **Merge (recommended).** Move Structura's catalog/configurator routes into this app under `/studio`; share one Navbar, theme, and DB. Replace Structura's jewelry **sample** data with the real Musalli Secrets collections.

## TODO checklist (finish in VS Code)

- [ ] **Add Arabic (AR) versions** — bilingual RTL; copy already in the HUSS-Co `.md` files. Add locale routing + `dir="rtl"`.
- [ ] Wire the home "current season / pieces remaining" to live collection data
- [ ] Populate The Vault with real past collections
- [ ] Add real logo (key/lock/hexagon), favicon, and product/collection imagery to `public/`
- [ ] Choose and wire a Structura integration option (above)
- [ ] Verify the waitlist form saves to MongoDB (`waitlist` collection); add an Atlas Network Access IP entry
- [ ] Deploy (e.g. Vercel) with `MONGODB_URI` / `MONGODB_DB` env vars

## Environment variables

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | Atlas connection string |
| `MONGODB_DB`  | Database name (default `musallis`) |
