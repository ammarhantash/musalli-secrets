import { store } from '../state/config-store.js';
import { formatSAR } from '../lib/utils.js';
import { getLang, t } from '../i18n/index.js';

class PriceDisplay extends HTMLElement {
  connectedCallback() {
    this._render();
    store.addEventListener('config-change', () => this._render());
  }

  _render() {
    const { totalPriceSAR, caratWeight, metalType, gemType, pieces } = store;
    const i18n = t(getLang()).configurator;
    const metalLabel = { gold: i18n.gold, platinum: i18n.platinum };
    const gemLabel   = { diamond: i18n.diamond, ruby: i18n.ruby, emerald: i18n.emerald };
    const align = document.documentElement.dir === 'rtl' ? 'left' : 'right';
    this.innerHTML = `
      <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:1.5rem">
        <div>
          <div style="font-size:0.7rem;color:#555;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px">${i18n.fullSetPrice}</div>
          <div style="font-size:1.875rem;font-weight:300;color:#C5A059;font-variant-numeric:tabular-nums">${formatSAR(totalPriceSAR)}</div>
        </div>
        <div style="text-align:${align}">
          <div style="font-size:0.7rem;color:#444;font-variant-numeric:tabular-nums;margin-bottom:2px">${caratWeight.toFixed(2)} ct · ${pieces.length} pcs</div>
          <div style="font-size:0.7rem;color:#444">${metalLabel[metalType] || metalType} · ${gemLabel[gemType] || gemType}</div>
        </div>
      </div>`;
  }
}
customElements.define('price-display', PriceDisplay);
