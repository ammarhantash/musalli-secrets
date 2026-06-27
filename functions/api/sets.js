export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(`
    SELECT
      js.id, js.name, js.description, js.occasion,
      sp.id   AS piece_id,
      sp.name AS piece_name,
      sp.category,
      sp.base_price_sar,
      sp.sort_order
    FROM jewelry_sets js
    LEFT JOIN set_pieces sp ON sp.set_id = js.id
    ORDER BY js.created_at, sp.sort_order
  `).all();

  // Group flat rows into nested set objects
  const map = new Map();
  for (const row of results) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id, name: row.name,
        description: row.description, occasion: row.occasion,
        pieces: [],
      });
    }
    if (row.piece_id) {
      map.get(row.id).pieces.push({
        id: row.piece_id, name: row.piece_name,
        category: row.category, basePriceSAR: row.base_price_sar,
        sortOrder: row.sort_order,
      });
    }
  }

  return Response.json([...map.values()]);
}
