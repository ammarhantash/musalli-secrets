import { checkAuth } from './lib/auth.js';
import { initLang, t } from './i18n/index.js';
checkAuth();

function render(lang) {
  const d = t(lang).faq;
  const isRtl = lang === 'ar';

  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.title = `${isRtl ? 'الأسئلة الشائعة' : 'FAQ'} — Musalli Secrets`;

  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  set('faq-title', d.title);

  const groupsEl = document.getElementById('faq-groups');
  if (groupsEl) {
    groupsEl.innerHTML = d.groups.map(group => `
      <div style="margin-bottom:3rem">
        <h2 style="font-size:0.7rem;letter-spacing:0.3em;text-transform:uppercase;
                   color:#C5A059;margin-bottom:1.5rem;padding-bottom:0.75rem;
                   border-bottom:1px solid #1a1a1a">${group.heading}</h2>
        ${group.qa.map(([q, a]) => `
          <details style="border-bottom:1px solid #0f0f0f;padding:1.25rem 0;
                          cursor:pointer" open>
            <summary style="list-style:none;display:flex;justify-content:space-between;
                            align-items:start;gap:1rem;cursor:pointer;
                            font-size:0.875rem;color:#D0CCC7;font-weight:500;
                            line-height:1.5">
              <span>${q}</span>
              <span style="color:#C5A059;flex-shrink:0;margin-top:0.1rem">+</span>
            </summary>
            <p style="margin-top:0.75rem;font-size:0.825rem;color:#555;
                      line-height:1.8;padding-right:2rem">${a}</p>
          </details>`).join('')}
      </div>`).join('');
  }
}

const lang = initLang();
render(lang);
window.addEventListener('lang-change', (e) => render(e.detail.lang));
