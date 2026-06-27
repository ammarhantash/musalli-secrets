import { checkAuth } from './lib/auth.js';
import { store } from './state/config-store.js';
import { initLang, getLang, t } from './i18n/index.js';
import { PIECE_IMAGES } from './lib/images.js';
import { formatSAR } from './lib/utils.js';

checkAuth();
let lang = initLang();
let i18n = t(lang).configurator;

const FALLBACK_SETS = [
  { id: 'set_alnur', name: 'Al Nur Bridal Set', occasion: 'Bridal',
    description: 'A luminous bridal suite evoking the golden light of Mecca at dawn. Four pieces unified by geometric precision.',
    pieces: [
      { id: 'p1', name: 'Solitaire Engagement Ring', category: 'Ring',     basePriceSAR: 18000 },
      { id: 'p2', name: 'Diamond Wedding Band',      category: 'Ring',     basePriceSAR: 9500  },
      { id: 'p3', name: 'Drop Pendant Necklace',     category: 'Necklace', basePriceSAR: 14000 },
      { id: 'p4', name: 'Stud Earrings',             category: 'Earrings', basePriceSAR: 8500  },
    ] },
  { id: 'set_layla', name: 'Layla Evening Set', occasion: 'Evening',
    description: 'Sculptural evening pieces for the woman who commands a room. Fluid lines, bold presence.',
    pieces: [
      { id: 'p5', name: 'Cocktail Ring',            category: 'Ring',     basePriceSAR: 12000 },
      { id: 'p6', name: 'Collar Necklace',          category: 'Necklace', basePriceSAR: 16500 },
      { id: 'p7', name: 'Drop Chandelier Earrings', category: 'Earrings', basePriceSAR: 11000 },
    ] },
  { id: 'set_mecca', name: 'Mecca Heritage Set', occasion: 'Heritage',
    description: 'Rooted in Islamic geometric tradition. Three pieces that carry centuries of craft into the present.',
    pieces: [
      { id: 'p8',  name: 'Filigree Band Ring', category: 'Ring',     basePriceSAR: 8500  },
      { id: 'p9',  name: 'Geometric Cuff',     category: 'Bracelet', basePriceSAR: 13000 },
      { id: 'p10', name: 'Crescent Necklace',  category: 'Necklace', basePriceSAR: 11500 },
    ] },
  { id: 'set_yawm', name: 'Yawm Everyday Set', occasion: 'Everyday',
    description: 'Refined simplicity for daily wear. Lightweight, durable, and effortlessly elegant.',
    pieces: [
      { id: 'p11', name: 'Stackable Ring',          category: 'Ring',     basePriceSAR: 5500 },
      { id: 'p12', name: 'Delicate Chain Necklace', category: 'Necklace', basePriceSAR: 7000 },
      { id: 'p13', name: 'Huggie Earrings',         category: 'Earrings', basePriceSAR: 4800 },
    ] },
];

const params  = new URLSearchParams(location.search);
const setId   = params.get('id');
let currentSet = null;

const $loading     = document.getElementById('loading');
const $configurator = document.getElementById('configurator');
const $error       = document.getElementById('error-state');
const $btn         = document.getElementById('commission-btn');

async function init() {
  if (!setId) { showError(); return; }

  let s;
  try {
    const res = await fetch(`/api/sets/${setId}`);
    if (!res.ok) throw new Error('Not found');
    s = await res.json();
  } catch {
    s = FALLBACK_SETS.find(f => f.id === setId) || null;
  }

  try {
    if (!s) { showError(); return; }

    currentSet = s;
    document.title = `${s.name} — Musalli Secrets`;
    document.getElementById('set-occasion').textContent = `${i18n.occasionPrefix}${s.occasion}${i18n.occasionSuffix}`;
    document.getElementById('set-name').textContent     = s.name;
    document.getElementById('set-desc').textContent     = s.description;
    document.getElementById('back-link').textContent    = i18n.backLink;
    document.getElementById('pieces-heading').textContent = i18n.piecesHeading;
    document.getElementById('commission-btn').textContent = i18n.commissionBtn;
    document.getElementById('price-note').textContent   = i18n.priceNote;
    document.getElementById('viewer-hint').textContent  = i18n.viewerHint;
    document.getElementById('loading-text').textContent = i18n.loading;

    store.initSet(s.id, s.name, s.pieces);
    renderPieces(s.pieces);

    $loading.style.display = 'none';
    $configurator.style.display = 'flex';

    // Explicitly start the 3D viewer now that the container has real dimensions
    // Double-rAF guarantees layout has been flushed before reading offsetWidth/Height
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.getElementById('viewer')?.startViewer();
    }));

    // Update pieces prices on config change
    store.addEventListener('config-change', () => renderPieces(s.pieces));
  } catch {
    showError();
  }
}

function renderPieces(pieces) {
  const { metalType, gemType, caratWeight } = store;
  const metalMult = metalType === 'platinum' ? 1.3 : 1.0;
  const gemMult   = gemType === 'diamond' ? 1.0 : gemType === 'ruby' ? 0.8 : 0.65;

  document.getElementById('pieces-list').innerHTML = pieces.map(p => {
    const pieceTotal = Math.round(p.basePriceSAR * caratWeight * metalMult * gemMult);
    const img = PIECE_IMAGES[p.category];
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;padding:0.5rem 0">
        <div style="display:flex;align-items:center;gap:0.75rem">
          ${img ? `<div style="width:40px;height:40px;flex-shrink:0;overflow:hidden;border-radius:2px">
            <img src="${img}" alt="${p.name}" loading="lazy" decoding="async"
              style="width:100%;height:100%;object-fit:cover"/>
          </div>` : ''}
          <div>
            <div style="font-size:0.75rem;color:#CCCCCC">${p.name}</div>
            <div style="font-size:0.7rem;color:#444">${p.category}</div>
          </div>
        </div>
        <span style="font-size:0.75rem;color:#888;font-variant-numeric:tabular-nums;flex-shrink:0">${formatSAR(pieceTotal)}</span>
      </div>`;
  }).join('');
}

function showError() {
  $loading.style.display = 'none';
  const errMsg = document.getElementById('error-msg');
  const errBack = document.getElementById('error-back');
  if (errMsg) errMsg.textContent = i18n.errorMsg;
  if (errBack) errBack.textContent = i18n.errorBack;
  $error.style.display = 'flex';
}

// Commission button
$btn?.addEventListener('click', async () => {
  const { setId, metalType, gemType, caratWeight, totalPriceSAR } = store;
  try {
    await fetch('/api/commission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setId, metalType, gemType, caratWeight, totalPriceSAR }),
    });
  } catch { /* offline graceful */ }

  $btn.textContent  = i18n.commissionSuccess;
  $btn.style.background = '#2A4A2A';
  $btn.style.color   = '#7EC87E';
  $btn.style.borderColor = '#4A8A4A';
  $btn.disabled = true;
  setTimeout(() => {
    $btn.textContent  = i18n.commissionBtn;
    $btn.style.background = '#C5A059';
    $btn.style.color   = '#1A1A1A';
    $btn.style.borderColor = 'transparent';
    $btn.disabled = false;
  }, 3000);
});

// Re-apply translated static strings when language is toggled
window.addEventListener('lang-change', (e) => {
  lang = e.detail.lang;
  i18n = t(lang).configurator;
  const applyText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  if (currentSet) applyText('set-occasion', `${i18n.occasionPrefix}${currentSet.occasion}${i18n.occasionSuffix}`);
  applyText('back-link', i18n.backLink);
  applyText('pieces-heading', i18n.piecesHeading);
  applyText('commission-btn', i18n.commissionBtn);
  applyText('price-note', i18n.priceNote);
  applyText('viewer-hint', i18n.viewerHint);
  applyText('loading-text', i18n.loading);
  // Trigger config-controls and price-display re-render via store event
  store.dispatchEvent(new CustomEvent('config-change'));
});

init();
