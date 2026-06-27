CREATE TABLE IF NOT EXISTS jewelry_sets (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  occasion    TEXT NOT NULL,
  created_at  TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS set_pieces (
  id             TEXT PRIMARY KEY,
  set_id         TEXT NOT NULL REFERENCES jewelry_sets(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  category       TEXT NOT NULL,
  base_price_sar REAL NOT NULL,
  sort_order     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS commissions (
  id              TEXT PRIMARY KEY,
  set_id          TEXT NOT NULL,
  metal_type      TEXT NOT NULL,
  gem_type        TEXT NOT NULL,
  carat_weight    REAL NOT NULL,
  total_price_sar REAL NOT NULL,
  created_at      TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS waitlist (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  city       TEXT NOT NULL DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_pieces_set ON set_pieces(set_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
