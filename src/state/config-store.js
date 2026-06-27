// EventTarget-based store replacing Zustand
const METAL_MULTIPLIERS = { gold: 1.0, platinum: 1.3 };
const GEM_MULTIPLIERS   = { diamond: 1.0, ruby: 0.8, emerald: 0.65 };

function computeTotal(pieces, metal, gem, carat) {
  const base = pieces.reduce((sum, p) => sum + p.basePriceSAR, 0);
  return Math.round(base * carat * METAL_MULTIPLIERS[metal] * GEM_MULTIPLIERS[gem]);
}

class ConfigStore extends EventTarget {
  constructor() {
    super();
    this.setId        = '';
    this.setName      = '';
    this.pieces       = [];
    this.metalType    = 'gold';
    this.gemType      = 'diamond';
    this.caratWeight  = 1.0;
    this.totalPriceSAR = 0;
    this.commissioned = false;
  }

  _emit() {
    this.dispatchEvent(new CustomEvent('config-change', { detail: this._snapshot() }));
  }

  _snapshot() {
    return {
      setId:        this.setId,
      setName:      this.setName,
      pieces:       this.pieces,
      metalType:    this.metalType,
      gemType:      this.gemType,
      caratWeight:  this.caratWeight,
      totalPriceSAR: this.totalPriceSAR,
      commissioned: this.commissioned,
    };
  }

  initSet(id, name, pieces) {
    this.setId   = id;
    this.setName = name;
    this.pieces  = pieces;
    this.totalPriceSAR = computeTotal(pieces, this.metalType, this.gemType, this.caratWeight);
    this._emit();
  }

  setMetal(metal) {
    this.metalType = metal;
    this.totalPriceSAR = computeTotal(this.pieces, metal, this.gemType, this.caratWeight);
    this._emit();
  }

  setGem(gem) {
    this.gemType = gem;
    this.totalPriceSAR = computeTotal(this.pieces, this.metalType, gem, this.caratWeight);
    this._emit();
  }

  setCaratWeight(weight) {
    this.caratWeight = Math.min(5.0, Math.max(0.5, weight));
    this.totalPriceSAR = computeTotal(this.pieces, this.metalType, this.gemType, this.caratWeight);
    this._emit();
  }

  setCommissioned(val) {
    this.commissioned = val;
    this._emit();
  }
}

export const store = new ConfigStore();
export { METAL_MULTIPLIERS, GEM_MULTIPLIERS };
