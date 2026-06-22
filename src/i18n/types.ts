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
