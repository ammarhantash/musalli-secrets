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
