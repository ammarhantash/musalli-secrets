# Structura Webapp - Deployment Guide

## Project Overview
- **Name:** structura-webapp
- **Type:** Next.js 14.2.4 + TypeScript
- **Purpose:** Jewelry configurator with 3D visualization
- **Database:** SQLite via Prisma ORM
- **Styling:** Tailwind CSS with luxury theme (gold/brass)

## Technology Stack
- **Frontend:** React 18.3, Next.js 14.2.4, TypeScript
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **3D:** React Three Fiber, Three.js, @react-three/drei
- **State:** Zustand 4.5.2
- **Database:** Prisma 5.14.0, SQLite
- **UI:** Lucide React icons

## Deployment Steps

### Step 1: Install Dependencies
```bash
cd structura-webapp
npm install
```
**Expected Output:** ~500MB of packages, ~2-3 minutes
**Generates:** node_modules folder

### Step 2: Generate Prisma Client & Setup Database
```bash
npx prisma generate
npx prisma migrate dev --name init
```
**Expected:** Creates prisma/dev.db, generates Prisma types

### Step 3: Seed Database with Initial Data
```bash
npm run db:seed
```
**Expected:** Populates Product and Configuration tables

### Step 4: Build Application (Optional for dev)
```bash
npm run build
```
**Expected:** Creates .next optimized build (~2-3 minutes)

### Step 5: Start Development Server
```bash
npm run dev
```
**Expected:** Server running on http://localhost:3000
**Access:** Open http://localhost:3000 in browser

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed database with initial data |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |

## Environment Variables
- **DATABASE_URL:** `file:./prisma/dev.db` (SQLite local file)
- Location: `.env`

## Directory Structure
```
structura-webapp/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/         # API routes
│   │   ├── catalog/     # Catalog pages
│   │   ├── configurator/# Configurator pages
│   │   └── layout.tsx   # Root layout
│   ├── components/      # React components
│   │   ├── bim/        # 3D BIM components
│   │   └── ui/         # UI components
│   ├── lib/            # Utilities & helpers
│   └── store/          # Zustand state
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Database seed
├── public/             # Static assets
├── .env                # Environment config
├── next.config.mjs     # Next.js config
├── tsconfig.json       # TypeScript config
├── tailwind.config.ts  # Tailwind theme
└── package.json        # Dependencies
```

## Database Schema
Two main models:
- **Product:** id, name, basePriceSAR, category, defaultMetal
- **Configuration:** metalType, gemType, caratWeight, finalPriceSAR

## Troubleshooting

### Node modules not found
```bash
npm install --legacy-peer-deps
```

### Database issues
```bash
rm prisma/dev.db
npx prisma migrate dev --name init
npm run db:seed
```

### Port 3000 in use
Change port in next.config.mjs or use:
```bash
npm run dev -- -p 3001
```

### Slow npm install
```bash
npm install --prefer-offline
npm ci  # Clean install from package-lock.json
```

## First Deployment Checklist
- [ ] Run `npm install`
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Run `npm run db:seed`
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Test configurator features
- [ ] Check browser console for errors
