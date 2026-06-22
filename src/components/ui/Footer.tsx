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
