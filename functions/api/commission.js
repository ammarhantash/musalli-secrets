import {
  METAL_MULTIPLIERS, GEM_MULTIPLIERS, CARAT_MIN, CARAT_MAX, computeTotal,
} from './_pricing.js';

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const setId = String(body.setId ?? '').trim();
  const metalType = String(body.metalType ?? '');
  const gemType = String(body.gemType ?? '');
  const caratWeight = Number(body.caratWeight ?? 1.0);

  if (!setId) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!(metalType in METAL_MULTIPLIERS) || !(gemType in GEM_MULTIPLIERS)) {
    return Response.json({ error: 'Invalid metal or gem type' }, { status: 400 });
  }
  if (!Number.isFinite(caratWeight) || caratWeight < CARAT_MIN || caratWeight > CARAT_MAX) {
    return Response.json({ error: `caratWeight must be between ${CARAT_MIN} and ${CARAT_MAX}` }, { status: 400 });
  }

  // Price is computed server-side from the set's pieces — the client's total is ignored.
  const { results: pieces } = await env.DB.prepare(
    'SELECT base_price_sar FROM set_pieces WHERE set_id = ?'
  ).bind(setId).all();

  if (!pieces.length) {
    return Response.json({ error: 'Set not found' }, { status: 404 });
  }

  const totalPriceSAR = computeTotal(pieces, metalType, gemType, caratWeight);

  const id = crypto.randomUUID();
  await env.DB.prepare(`
    INSERT INTO commissions (id, set_id, metal_type, gem_type, carat_weight, total_price_sar)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, setId, metalType, gemType, caratWeight, totalPriceSAR).run();

  return Response.json({ ok: true, id, totalPriceSAR }, { status: 201 });
}
