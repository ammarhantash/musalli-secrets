export async function onRequestGet({ env, params }) {
  const setId = params.id;

  const set = await env.DB.prepare(
    'SELECT * FROM jewelry_sets WHERE id = ?'
  ).bind(setId).first();

  if (!set) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  const { results: pieces } = await env.DB.prepare(
    'SELECT * FROM set_pieces WHERE set_id = ? ORDER BY sort_order'
  ).bind(setId).all();

  return Response.json({
    ...set,
    pieces: pieces.map(p => ({
      id: p.id, name: p.name, category: p.category,
      basePriceSAR: p.base_price_sar, sortOrder: p.sort_order,
    })),
  });
}
