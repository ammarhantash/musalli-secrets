import { checkAuth } from './lib/auth.js';
import { getLang, initLang, t } from './i18n/index.js';

checkAuth();

function applyLang() {
  const lang = getLang();
  const cat = t(lang).catalog;
  const eyebrow = document.getElementById('cat-eyebrow');
  const heading = document.getElementById('cat-heading');
  const sub = document.getElementById('cat-subheading');
  if (eyebrow) eyebrow.textContent = cat.eyebrow;
  if (heading) heading.textContent = cat.heading;
  if (sub) sub.textContent = cat.subheading;
}

initLang();
applyLang();
window.addEventListener('lang-change', applyLang);
