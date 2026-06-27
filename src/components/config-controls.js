import { store } from '../state/config-store.js';
import { getLang, t } from '../i18n/index.js';

const METALS = ['gold', 'platinum'];
const GEMS   = [
  { key: 'diamond', color: '#D4F1F9' },
  { key: 'emerald', color: '#3CB371' },
  { key: 'ruby',    color: '#9B111E' },
];

class ConfigControls extends HTMLElement {
  connectedCallback() {
    this._render();
    store.addEventListener('config-change', () => this._render());
  }

  _render() {
    const { metalType, gemType, caratWeight } = store;
    const lang = getLang();
    const i18n = t(lang).configurator;
    const metalLabel = { gold: i18n.gold, platinum: i18n.platinum };
    const gemLabel   = { diamond: i18n.diamond, ruby: i18n.ruby, emerald: i18n.emerald };
    const labelSpacing = lang === 'ar' ? '0' : '0.25em';
    this.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:2rem">

        <!-- Metal -->
        <div>
          <div style="font-size:0.7rem;letter-spacing:${labelSpacing};text-transform:uppercase;color:#CCCCCC;margin-bottom:0.75rem">${i18n.metalLabel}</div>
          <div style="display:flex;gap:0.5rem">
            ${METALS.map(m => `
              <button data-metal="${m}"
                style="flex:1;padding:0.625rem;border:1px solid ${m === metalType ? '#C5A059' : '#333'};
                  background:${m === metalType ? 'rgba(197,160,89,0.1)' : 'transparent'};
                  color:${m === metalType ? '#C5A059' : '#888'};
                  font-size:0.7rem;letter-spacing:0.1em;cursor:pointer;transition:all 0.2s">
                ${metalLabel[m] || m}
              </button>`).join('')}
          </div>
        </div>

        <!-- Gem -->
        <div>
          <div style="font-size:0.7rem;letter-spacing:${labelSpacing};text-transform:uppercase;color:#CCCCCC;margin-bottom:0.75rem">${i18n.gemLabel}</div>
          <div style="display:flex;gap:0.5rem">
            ${GEMS.map(g => `
              <button data-gem="${g.key}"
                style="flex:1;padding:0.625rem;border:1px solid ${g.key === gemType ? '#C5A059' : '#333'};
                  background:${g.key === gemType ? 'rgba(197,160,89,0.1)' : 'transparent'};
                  color:${g.key === gemType ? '#C5A059' : '#888'};
                  font-size:0.7rem;letter-spacing:0.05em;cursor:pointer;transition:all 0.2s;
                  display:flex;align-items:center;justify-content:center;gap:0.375rem">
                <span style="width:8px;height:8px;border-radius:50%;background:${g.color};display:inline-block;flex-shrink:0"></span>
                ${gemLabel[g.key] || g.key}
              </button>`).join('')}
          </div>
        </div>

        <!-- Carat -->
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem">
            <div style="font-size:0.7rem;letter-spacing:${labelSpacing};text-transform:uppercase;color:#CCCCCC">${i18n.caratLabel}</div>
            <div style="font-size:1rem;color:#C5A059;font-variant-numeric:tabular-nums">${caratWeight.toFixed(2)} ct</div>
          </div>
          <input type="range" min="0.5" max="5" step="0.25" value="${caratWeight}" data-carat
            style="width:100%" />
          <div style="display:flex;justify-content:space-between;margin-top:0.5rem">
            <span style="font-size:0.65rem;color:#444">0.50 ct</span>
            <span style="font-size:0.65rem;color:#444">5.00 ct</span>
          </div>
        </div>

      </div>`;

    // Wire events
    this.querySelectorAll('[data-metal]').forEach(btn =>
      btn.addEventListener('click', () => store.setMetal(btn.dataset.metal)));
    this.querySelectorAll('[data-gem]').forEach(btn =>
      btn.addEventListener('click', () => store.setGem(btn.dataset.gem)));
    const slider = this.querySelector('[data-carat]');
    if (slider) slider.addEventListener('input', e => store.setCaratWeight(parseFloat(e.target.value)));
  }
}
customElements.define('config-controls', ConfigControls);
