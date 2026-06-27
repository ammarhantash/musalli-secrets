import { getLang, setLang, initLang, t } from '../i18n/index.js';

class SiteNavbar extends HTMLElement {
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
    const d = t(lang);
    const active = this.getAttribute('active') || '';
    const isRtl = lang === 'ar';

    const links = [
      { key: 'catalog',     href: '/catalog.html',     label: d.nav.collections },
      { key: 'experience',  href: '/experience.html',  label: d.nav.experience },
      { key: 'about',       href: '/about.html',       label: d.nav.about },
      { key: 'brand',       href: '/brand.html',       label: d.nav.brand_id },
      { key: 'faq',         href: '/faq.html',         label: d.nav.faq },
    ];

    const linkHtml = links.map(l => `
      <li>
        <a href="${l.href}"
          style="font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;
                 transition:color 0.2s;color:${active === l.key ? '#C5A059' : '#AAAAAA'};
                 ${active === l.key ? 'border-bottom:1px solid #C5A059;padding-bottom:2px' : ''}">
          ${l.label}
        </a>
      </li>`).join('');

    this.innerHTML = `
      <header style="position:sticky;top:0;z-index:50;border-bottom:1px solid #1E1E1E;
                     background:rgba(10,10,10,0.92);backdrop-filter:blur(10px)">
        <nav style="max-width:90rem;margin:0 auto;display:flex;align-items:center;
                    justify-content:space-between;padding:0 2rem;height:68px;
                    flex-direction:${isRtl ? 'row-reverse' : 'row'}">

          <a href="/index.html"
            style="font-family:'Playfair Display',serif;font-size:1.05rem;letter-spacing:0.35em;
                   color:#F0EDE8;text-decoration:none;font-weight:400;white-space:nowrap">
            ${d.nav.brand}
          </a>

          <ul style="display:flex;align-items:center;gap:1.75rem;list-style:none;
                     flex-direction:${isRtl ? 'row-reverse' : 'row'}">
            ${linkHtml}
            <li>
              <button onclick="window.__toggleLang()"
                style="font-size:0.68rem;letter-spacing:0.15em;background:none;border:1px solid #333;
                       color:#888;cursor:pointer;padding:4px 10px;transition:all 0.2s;
                       font-family:inherit"
                onmouseover="this.style.borderColor='#C5A059';this.style.color='#C5A059'"
                onmouseout="this.style.borderColor='#333';this.style.color='#888'">
                ${lang === 'ar' ? 'EN' : 'عربي'}
              </button>
            </li>
          </ul>

        </nav>
      </header>`;

    window.__toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');
  }
}

customElements.define('site-navbar', SiteNavbar);
