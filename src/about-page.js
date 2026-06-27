import { checkAuth } from './lib/auth.js';
import { initLang, t } from './i18n/index.js';
checkAuth();

function render(lang) {
  const d = t(lang).about;
  const isRtl = lang === 'ar';

  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.title = `${isRtl ? 'من نحن' : 'About'} — Musalli Secrets`;

  const hero = document.getElementById('about-hero');
  if (hero) hero.textContent = d.heroStatement;

  const sectionsEl = document.getElementById('about-sections');
  if (sectionsEl) {
    sectionsEl.innerHTML = d.sections.map(s => `
      <div style="margin-bottom:3.5rem">
        <h2 style="font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:400;
                   color:#F0EDE8;margin-bottom:${s.subheading ? '0.35rem' : '1.25rem'}">${s.heading}</h2>
        ${s.subheading ? `<p style="font-size:0.75rem;letter-spacing:0.2em;color:#C5A059;
                              text-transform:uppercase;margin-bottom:1.25rem">${s.subheading}</p>` : ''}
        ${s.paragraphs.map(p => `
          <p style="color:#777;line-height:1.8;font-size:0.9rem;margin-bottom:1rem">${p}</p>
        `).join('')}
      </div>`).join('');
  }

  const valuesEl = document.getElementById('about-values');
  if (valuesEl) {
    valuesEl.innerHTML = d.values.map(([title, body]) => `
      <div style="border-top:2px solid #C5A059;padding-top:1rem">
        <h3 style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;
                   color:#C5A059;margin-bottom:0.6rem">${title}</h3>
        <p style="font-size:0.8rem;color:#555;line-height:1.6">${body}</p>
      </div>`).join('');
  }
}

const lang = initLang();
render(lang);
window.addEventListener('lang-change', (e) => render(e.detail.lang));
