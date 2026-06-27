export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { setId, metalType, gemType, caratWeight, totalPriceSAR } = body;
  if (!setId || !metalType || !gemType) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(`
    INSERT INTO commissions (id, set_id, metal_type, gem_type, carat_weight, total_price_sar)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, setId, metalType, gemType, caratWeight ?? 1.0, totalPriceSAR ?? 0).run();

  return Response.json({ ok: true, id }, { status: 201 });
}
