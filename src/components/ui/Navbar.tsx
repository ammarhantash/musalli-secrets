import Link from "next/link";

const links = [
  { href: "/collections", label: "Collections" },
  { href: "/experience", label: "The Experience" },
  { href: "/about", label: "About" },
  { href: "/brand", label: "Brand" },
  { href: "/faq", label: "FAQ" },
  { href: "/studio", label: "Shop" }, // Structura storefront
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rosegold/20 bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.2em] text-offwhite"
        >
          MUSALLI<span className="text-rosegold">·</span>SECRETS
        </Link>
        <ul className="hidden gap-7 text-sm tracking-wide md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-silver/80 transition hover:text-rosegold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
