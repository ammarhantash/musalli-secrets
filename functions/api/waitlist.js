export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name  = String(body.name  ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const city  = String(body.city  ?? '').trim();

  if (!name || !email) {
    return Response.json({ error: 'name and email are required' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  try {
    await env.DB.prepare(`
      INSERT INTO waitlist (id, name, email, city) VALUES (?, ?, ?, ?)
    `).bind(id, name, email, city).run();
    return Response.json({ ok: true, id }, { status: 201 });
  } catch {
    // Duplicate email — still respond OK so UX doesn't leak info
    return Response.json({ ok: true });
  }
}
