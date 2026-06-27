# Cloudflare Deployment Guide — Musalli Secrets

## Prerequisites

```bash
npm install -g wrangler
wrangler login        # opens browser → authenticate with your Cloudflare account
```

---

## Step 1 — Create the D1 database

```bash
cd D:\Claude\Projects\jewelry\structura
wrangler d1 create musalli-db
```

Copy the `database_id` from the output, then update `wrangler.toml`:

```toml
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"   # paste here
```

---

## Step 2 — Run migrations and seed

```bash
# Apply schema (creates tables)
wrangler d1 execute musalli-db --remote --file=./schema.sql

# Seed with jewelry sets data
wrangler d1 execute musalli-db --remote --file=./seed.sql
```

Verify rows landed:

```bash
wrangler d1 execute musalli-db --remote --command="SELECT id FROM jewelry_sets"
```

---

## Step 3 — Set the draft password secret

```bash
wrangler pages secret put VITE_DRAFT_PASSWORD
# Enter when prompted: musalli2026
```

> Note: Cloudflare Pages doesn't inject VITE_* vars at runtime the same way Vercel does.
> The password is baked into the JS bundle at build time via `vite define`.
> Set it as a build-time env var in the Pages dashboard instead (see Step 4).

---

## Step 4 — Connect repo to Cloudflare Pages

1. Push your code to GitHub (or GitLab):
   ```bash
   git add .
   git commit -m "feat: cloudflare pages deployment"
   git push origin main
   ```

2. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**

3. Select your repo, then configure:
   | Setting | Value |
   |---|---|
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave blank if structura is repo root)* |

4. Under **Environment variables → Production**, add:
   | Variable | Value |
   |---|---|
   | `VITE_DRAFT_PASSWORD` | `musalli2026` |

5. Under **Functions → D1 database bindings**, add:
   | Variable name | Database |
   |---|---|
   | `DB` | `musalli-db` |

6. Click **Save and Deploy**.

---

## Step 5 — Verify deployment

Once the build completes (≈2 min), visit your Pages URL:

```
https://musalli-secrets.pages.dev/gate.html   → should show password gate
https://musalli-secrets.pages.dev/            → should redirect to gate
https://musalli-secrets.pages.dev/api/sets    → should return JSON array of 4 sets
```

---

## Local dev with Wrangler (optional — mirrors production)

```bash
# Seed local D1 (separate from remote)
wrangler d1 execute musalli-db --local --file=./schema.sql
wrangler d1 execute musalli-db --local --file=./seed.sql

# Run Pages dev server (port 8788, binds D1 locally)
wrangler pages dev dist --d1 DB=musalli-db
```

Or keep using Vite dev server (`npm run dev`) with the Go backend on port 8080 — both approaches work.

---

## Custom domain (optional)

In Pages → your project → **Custom domains → Add domain**:
- Enter your domain (e.g. `musalli.ammar.dev`)
- Add the CNAME record Cloudflare shows you in your DNS

---

## Re-deploy after changes

- **Frontend changes**: just `git push` — Cloudflare auto-builds on every push to `main`
- **D1 schema changes**: run `wrangler d1 execute musalli-db --remote --file=./new_migration.sql`
- **Password change**: update the env var in Pages dashboard → trigger a new deploy
