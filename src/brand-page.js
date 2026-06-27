import { checkAuth } from './lib/auth.js';
import { initLang, t } from './i18n/index.js';
checkAuth();

function render(lang) {
  const d = t(lang).brand;
  const isRtl = lang === 'ar';

  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.title = `${isRtl ? 'العلامة التجارية' : 'Brand'} — Musalli Secrets`;

  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  set('brand-title', d.title);
  set('brand-intro', d.intro);
  set('brand-conceptTitle', d.conceptTitle);
  set('brand-conceptQuote', d.conceptQuote);
  set('brand-logoTitle', d.logoTitle);
  set('brand-logoIntro', d.logoIntro);

  const bodyEl = document.getElementById('brand-conceptBody');
  if (bodyEl) {
    bodyEl.innerHTML = d.conceptBody.map(p =>
      `<p style="color:#666;line-height:1.8;font-size:0.9rem;margin-bottom:1rem">${p}</p>`
    ).join('');
  }
}

const lang = initLang();
render(lang);
window.addEventListener('lang-change', (e) => render(e.detail.lang));
