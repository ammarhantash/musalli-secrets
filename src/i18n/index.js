import en from './en.js';
import ar from './ar.js';

const DICTS = { en, ar };

export function getLang() {
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'ar') return stored;
  } catch (_) {}
  return navigator.language.startsWith('ar') ? 'ar' : 'en';
}

export function setLang(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  window.dispatchEvent(new CustomEvent('lang-change', { detail: { lang } }));
}

export function t(lang) {
  return DICTS[lang] || DICTS.en;
}

export function initLang() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  return lang;
}
