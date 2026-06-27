import { checkAuth } from './lib/auth.js';
import { initLang, t } from './i18n/index.js';
checkAuth();

function render(lang) {
  const d = t(lang).home;
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'right' : 'left';

  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  const setDir = (id) => { const el = document.getElementById(id); if (el) el.style.textAlign = isRtl ? 'right' : 'center'; };

  set('home-eyebrow', d.eyebrow);
  set('home-title', d.heroTitle);
  set('home-body', d.heroBody);
  set('home-cta', d.heroCta);
  set('home-dropTitle', d.dropTitle);
  set('home-dropBody', d.dropBody);
  set('home-dropCta', d.dropCta);
  set('home-heritage', d.heritageStrip);
  set('home-wlTitle', d.waitlistTitle);
  set('home-wlBody', d.waitlistBody);

  const pillarsEl = document.getElementById('home-pillars');
  if (pillarsEl) {
    pillarsEl.innerHTML = d.pillars.map(p => `
      <div>
        <div style="font-size:2rem;margin-bottom:1rem">${p.icon}</div>
        <h3 style="font-family:'Playfair Display',serif;font-size:1rem;color:#F0EDE8;
                   margin-bottom:0.75rem;font-weight:400">${p.title}</h3>
        <p style="font-size:0.8rem;color:#555;line-height:1.7">${p.body}</p>
      </div>`).join('');
  }
}

const lang = initLang();
render(lang);
window.addEventListener('lang-change', (e) => render(e.detail.lang));
