import { SET_IMAGES, OCCASION_SYMBOL } from '../lib/images.js';
import { formatSAR } from '../lib/utils.js';

const FALLBACK_SETS = [
  {
    id: 'set_alnur', name: 'Al Nur Bridal Set', occasion: 'Bridal',
    description: 'A luminous bridal suite evoking the golden light of Mecca at dawn. Four pieces unified by geometric precision.',
    pieces: [
      { id: 'p1', name: 'Solitaire Engagement Ring', category: 'Ring',     basePriceSAR: 18000 },
      { id: 'p2', name: 'Diamond Wedding Band',      category: 'Ring',     basePriceSAR: 9500  },
      { id: 'p3', name: 'Drop Pendant Necklace',     category: 'Necklace', basePriceSAR: 14000 },
      { id: 'p4', name: 'Stud Earrings',             category: 'Earrings', basePriceSAR: 8500  },
    ],
  },
  {
    id: 'set_layla', name: 'Layla Evening Set', occasion: 'Evening',
    description: 'Sculptural evening pieces for the woman who commands a room. Fluid lines, bold presence.',
    pieces: [
      { id: 'p5', name: 'Cocktail Ring',              category: 'Ring',     basePriceSAR: 12000 },
      { id: 'p6', name: 'Collar Necklace',            category: 'Necklace', basePriceSAR: 16500 },
      { id: 'p7', name: 'Drop Chandelier Earrings',   category: 'Earrings', basePriceSAR: 11000 },
    ],
  },
  {
    id: 'set_mecca', name: 'Mecca Heritage Set', occasion: 'Heritage',
    description: 'Rooted in Islamic geometric tradition. Three pieces that carry centuries of craft into the present.',
    pieces: [
      { id: 'p8',  name: 'Filigree Band Ring',  category: 'Ring',     basePriceSAR: 8500  },
      { id: 'p9',  name: 'Geometric Cuff',       category: 'Bracelet', basePriceSAR: 13000 },
      { id: 'p10', name: 'Crescent Necklace',    category: 'Necklace', basePriceSAR: 11500 },
    ],
  },
  {
    id: 'set_yawm', name: 'Yawm Everyday Set', occasion: 'Everyday',
    description: 'Refined simplicity for daily wear. Lightweight, durable, and effortlessly elegant.',
    pieces: [
      { id: 'p11', name: 'Stackable Ring',           category: 'Ring',     basePriceSAR: 5500 },
      { id: 'p12', name: 'Delicate Chain Necklace',  category: 'Necklace', basePriceSAR: 7000 },
      { id: 'p13', name: 'Huggie Earrings',          category: 'Earrings', basePriceSAR: 4800 },
    ],
  },
];

class CatalogGrid extends HTMLElement {
  async connectedCallback() {
    const api = this.getAttribute('api') || '/api/sets';
    this.innerHTML = `<div style="text-align:center;padding:5rem 0;color:#555;font-size:0.8rem;letter-spacing:0.2em;text-transform:uppercase">Loading collection…</div>`;

    let sets;
    try {
      const res = await fetch(api);
      if (!res.ok) throw new Error('api-down');
      sets = await res.json();
      if (!sets.length) sets = FALLBACK_SETS;
    } catch {
      sets = FALLBACK_SETS;
    }

    try {

      if (!sets.length) {
        this.innerHTML = `
          <div style="text-align:center;padding:5rem 0;border:1px solid #2A2A2A">
            <p style="color:#555;font-size:0.875rem;margin-bottom:0.75rem">Database is empty.</p>
            <code style="font-size:0.75rem;color:#C5A059;background:#242424;padding:0.25rem 0.75rem;border-radius:2px">npm run db:seed</code>
          </div>`;
        return;
      }

      this.innerHTML = `<div class="grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1.5rem">${
        sets.map(s => this._card(s)).join('')
      }</div>`;
    } catch (e) {
      this.innerHTML = `<p style="color:#666;font-size:0.875rem;text-align:center;padding:4rem">${e.message}</p>`;
    }
  }

  _card(s) {
    const baseTotal = s.pieces.reduce((sum, p) => sum + p.basePriceSAR, 0);
    const img = SET_IMAGES[s.occasion] || SET_IMAGES.Bridal;
    const sym = OCCASION_SYMBOL[s.occasion] || '◇';
    const piecesHtml = s.pieces.map(p => `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem">
        <div style="display:flex;align-items:center;gap:0.5rem">
          <span style="width:4px;height:4px;border-radius:50%;background:rgba(197,160,89,0.5);display:inline-block"></span>
          <span style="font-size:0.75rem;color:#888">${p.name}</span>
        </div>
        <span style="font-size:0.75rem;color:#555;font-variant-numeric:tabular-nums">${formatSAR(p.basePriceSAR)}</span>
      </div>`).join('');

    return `
      <a href="./configurator.html?id=${s.id}" style="display:block;background:#242424;border:1px solid #2E2E2E;padding:1.75rem;text-decoration:none;transition:border-color 0.3s;cursor:pointer"
        onmouseover="this.style.borderColor='#C5A059'" onmouseout="this.style.borderColor='#2E2E2E'">

        <!-- Top row -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <span style="font-size:0.7rem;color:#C5A059;letter-spacing:0.35em;text-transform:uppercase">${s.occasion}</span>
          <span style="color:#C5A059;font-size:1.5rem">${sym}</span>
        </div>

        <!-- Hero image -->
        <div style="position:relative;width:100%;height:176px;overflow:hidden;margin-bottom:1.25rem">
          <img src="${img}" alt="${s.name}" loading="lazy" decoding="async"
            style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s"
            onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"/>
          <div style="position:absolute;inset:0;background:linear-gradient(to top,#242424,transparent)"></div>
        </div>

        <!-- Name & description -->
        <h2 style="color:#F5F5F5;font-weight:300;font-size:1.125rem;letter-spacing:0.05em;margin-bottom:0.5rem">${s.name}</h2>
        <p style="font-size:0.75rem;color:#555;line-height:1.6;margin-bottom:1.5rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${s.description}</p>

        <!-- Pieces -->
        <div style="border-top:1px solid #2A2A2A;padding-top:1.25rem;margin-bottom:1.5rem">${piecesHtml}</div>

        <!-- Price row -->
        <div style="display:flex;align-items:flex-end;justify-content:space-between">
          <div>
            <div style="font-size:0.7rem;color:#444;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:2px">Set from</div>
            <div style="color:#C5A059;font-size:1.125rem;font-weight:300;font-variant-numeric:tabular-nums">${formatSAR(baseTotal)}</div>
          </div>
          <span style="font-size:0.7rem;color:#444;letter-spacing:0.2em;text-transform:uppercase;transition:color 0.2s">Configure Set →</span>
        </div>
      </a>`;
  }
}
customElements.define('catalog-grid', CatalogGrid);
