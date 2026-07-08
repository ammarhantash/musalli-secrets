const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name  = String(body.name  ?? '').trim().slice(0, 100);
  const email = String(body.email ?? '').trim().toLowerCase();
  const city  = String(body.city  ?? '').trim().slice(0, 100);

  if (!name || !email) {
    return Response.json({ error: 'name and email are required' }, { status: 400 });
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return Response.json({ error: 'invalid email address' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  try {
    await env.DB.prepare(`
      INSERT INTO waitlist (id, name, email, city) VALUES (?, ?, ?, ?)
    `).bind(id, name, email, city).run();
    return Response.json({ ok: true, id }, { status: 201 });
  } catch (e) {
    // Duplicate email — respond OK so the UI doesn't leak who's already signed up
    if (String(e?.message ?? '').includes('UNIQUE constraint failed')) {
      return Response.json({ ok: true });
    }
    // Anything else is a real failure — don't pretend the signup succeeded
    console.error('waitlist insert failed:', e);
    return Response.json({ error: 'Something went wrong, please try again' }, { status: 500 });
  }
}
