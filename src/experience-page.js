import { checkAuth } from './lib/auth.js';
import { initLang, t } from './i18n/index.js';
checkAuth();

function render(lang) {
  const d = t(lang).experience;
  const isRtl = lang === 'ar';

  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.title = `${isRtl ? 'التجربة' : 'The Experience'} — Musalli Secrets`;

  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  set('exp-title', d.title);
  set('exp-intro', d.intro);
  set('exp-service', d.serviceLine);
  set('exp-boxTitle', d.boxTitle);

  const momentsEl = document.getElementById('exp-moments');
  if (momentsEl) {
    momentsEl.innerHTML = d.moments.map(([step, body], i) => `
      <div style="display:grid;grid-template-columns:3rem 1fr;gap:1.5rem;
                  padding:2rem 0;border-bottom:1px solid #111;align-items:start">
        <div style="font-family:'Playfair Display',serif;font-size:2rem;color:#C5A059;
                    font-weight:400;line-height:1;padding-top:0.25rem">0${i + 1}</div>
        <div>
          <h3 style="font-size:0.75rem;letter-spacing:0.25em;text-transform:uppercase;
                     color:#F0EDE8;margin-bottom:0.75rem">${step}</h3>
          <p style="font-size:0.875rem;color:#666;line-height:1.7">${body}</p>
        </div>
      </div>`).join('');
  }

  const boxEl = document.getElementById('exp-boxBody');
  if (boxEl) {
    boxEl.innerHTML = d.boxBody.map(p =>
      `<p style="font-size:0.875rem;color:#666;line-height:1.8">${p}</p>`
    ).join('');
  }
}

const lang = initLang();
render(lang);
window.addEventListener('lang-change', (e) => render(e.detail.lang));
