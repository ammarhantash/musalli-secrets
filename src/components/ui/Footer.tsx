import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-rosegold/20 bg-indigo-deep text-silver">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        {/* Closing brand statement (About page §9) */}
        <p className="font-serif text-2xl text-offwhite">Musalli Secrets.</p>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-silver/70">
          The key is not just in our logo. It is in what we know about gold,
          about diamonds, about what makes something worth keeping. We have been
          trusted with the most sacred spaces in the world. Now we bring that
          trust — and that craft — to you.
        </p>
        <p className="mt-6 text-sm tracking-widest text-rosegold/80">
          MECCA · JEDDAH · EST. 1898 / 2024
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs tracking-wide text-silver/60">
          <span>CR Registered</span>
          <span>IGI Certified</span>
          <span>MADA Accepted</span>
          <span>VAT Compliant</span>
          <span>Saudi-Owned</span>
        </div>

        <p className="mt-10 text-xs text-silver/40">
          © {new Date().getFullYear()} Musalli Secrets. All rights reserved. ·{" "}
          <Link href="/faq" className="hover:text-rosegold">
            FAQ
          </Link>
        </p>
      </div>
    </footer>
  );
}
