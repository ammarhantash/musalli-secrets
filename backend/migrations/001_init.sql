CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS jewelry_sets (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  occasion    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS set_pieces (
  id             TEXT PRIMARY KEY,
  set_id         TEXT NOT NULL REFERENCES jewelry_sets(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  category       TEXT NOT NULL,
  base_price_sar NUMERIC(12,2) NOT NULL,
  sort_order     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS commissions (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  set_id          TEXT NOT NULL REFERENCES jewelry_sets(id),
  metal_type      TEXT NOT NULL,
  gem_type        TEXT NOT NULL,
  carat_weight    NUMERIC(5,2) NOT NULL,
  total_price_sar NUMERIC(12,2) NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
