import { getLang, initLang, t } from '../i18n/index.js';

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this._lang = initLang();
    this._render();
    window.addEventListener('lang-change', (e) => {
      this._lang = e.detail.lang;
      this._render();
    });
  }

  _render() {
    const lang = this._lang;
    const d = t(lang).footer;
    const year = new Date().getFullYear();
    const isRtl = lang === 'ar';

    const badges = d.badges.map(b =>
      `<span style="font-size:0.65rem;letter-spacing:0.1em;color:#555;border:1px solid #222;
                    padding:3px 10px;">${b}</span>`
    ).join('');

    this.innerHTML = `
      <footer style="border-top:1px solid #1E1E1E;padding:3.5rem 2rem 2rem;
                     background:#0A0A0A;text-align:${isRtl ? 'right' : 'left'}">
        <div style="max-width:90rem;margin:0 auto">

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-bottom:2.5rem">
            <div>
              <div style="font-family:'Playfair Display',serif;font-size:1.1rem;
                          letter-spacing:0.35em;color:#F0EDE8;margin-bottom:1rem">
                ${d.name}
              </div>
              <p style="font-size:0.78rem;color:#555;line-height:1.8;max-width:32rem">
                ${d.statement}
              </p>
            </div>
            <div style="display:flex;flex-direction:column;align-items:${isRtl ? 'flex-start' : 'flex-end'};gap:0.5rem;justify-content:flex-start;padding-top:0.25rem">
              <div style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:${isRtl ? 'flex-start' : 'flex-end'}">
                ${badges}
              </div>
              <div style="font-size:0.65rem;letter-spacing:0.25em;color:#444;margin-top:1rem">
                ${d.locations}
              </div>
            </div>
          </div>

          <div style="border-top:1px solid #1A1A1A;padding-top:1.5rem;
                      display:flex;justify-content:space-between;align-items:center;
                      flex-direction:${isRtl ? 'row-reverse' : 'row'}">
            <span style="font-size:0.65rem;color:#333;letter-spacing:0.05em">
              © ${year} ${d.name} ${d.rights}
            </span>
            <div style="display:flex;gap:1.5rem">
              <a href="/catalog.html" style="font-size:0.65rem;color:#444;text-decoration:none;letter-spacing:0.1em;transition:color 0.2s"
                onmouseover="this.style.color='#C5A059'" onmouseout="this.style.color='#444'">
                ${t(lang).nav.collections}
              </a>
              <a href="/about.html" style="font-size:0.65rem;color:#444;text-decoration:none;letter-spacing:0.1em;transition:color 0.2s"
                onmouseover="this.style.color='#C5A059'" onmouseout="this.style.color='#444'">
                ${t(lang).nav.about}
              </a>
              <a href="/faq.html" style="font-size:0.65rem;color:#444;text-decoration:none;letter-spacing:0.1em;transition:color 0.2s"
                onmouseover="this.style.color='#C5A059'" onmouseout="this.style.color='#444'">
                ${t(lang).nav.faq}
              </a>
            </div>
          </div>

        </div>
      </footer>`;
  }
}

customElements.define('site-footer', SiteFooter);
