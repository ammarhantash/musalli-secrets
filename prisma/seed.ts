import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SETS = [
  {
    name: 'Al Nur Bridal Set',
    description: 'The complete bridal statement. Four pieces unified by light and precision — worn together or as a lifelong collection.',
    occasion: 'Bridal',
    pieces: [
      { name: 'Solitaire Engagement Ring',  category: 'Ring',     basePriceSAR: 18000, sortOrder: 1 },
      { name: 'Diamond Wedding Band',        category: 'Ring',     basePriceSAR: 9500,  sortOrder: 2 },
      { name: 'Drop Pendant Necklace',       category: 'Necklace', basePriceSAR: 14000, sortOrder: 3 },
      { name: 'Stud Earrings',               category: 'Earrings', basePriceSAR: 8500,  sortOrder: 4 },
    ],
  },
  {
    name: 'Layla Evening Set',
    description: 'Three pieces designed for the hour after sundown. The gem catches light; the metal holds it.',
    occasion: 'Evening',
    pieces: [
      { name: 'Cocktail Ring',               category: 'Ring',     basePriceSAR: 12000, sortOrder: 1 },
      { name: 'Collar Necklace',             category: 'Necklace', basePriceSAR: 16500, sortOrder: 2 },
      { name: 'Drop Chandelier Earrings',    category: 'Earrings', basePriceSAR: 11000, sortOrder: 3 },
    ],
  },
  {
    name: 'Mecca Heritage Set',
    description: 'Inspired by 125 years of goldsmithing in the Holy City. Motifs drawn from geometric Islamic art, rendered in precious metal.',
    occasion: 'Heritage',
    pieces: [
      { name: 'Filigree Band Ring',          category: 'Ring',     basePriceSAR: 8500,  sortOrder: 1 },
      { name: 'Geometric Cuff',              category: 'Bracelet', basePriceSAR: 13000, sortOrder: 2 },
      { name: 'Crescent Necklace',           category: 'Necklace', basePriceSAR: 11500, sortOrder: 3 },
    ],
  },
  {
    name: 'Yawm Everyday Set',
    description: 'Quiet luxury for daily wear. Three refined pieces that never compete — only complement.',
    occasion: 'Everyday',
    pieces: [
      { name: 'Stackable Ring',              category: 'Ring',     basePriceSAR: 5500,  sortOrder: 1 },
      { name: 'Delicate Chain Necklace',     category: 'Necklace', basePriceSAR: 7000,  sortOrder: 2 },
      { name: 'Huggie Earrings',             category: 'Earrings', basePriceSAR: 4800,  sortOrder: 3 },
    ],
  },
];

async function main() {
  console.log('Seeding Structura database...');

  await prisma.setPiece.deleteMany();
  await prisma.jewelrySet.deleteMany();

  for (const s of SETS) {
    const created = await prisma.jewelrySet.create({
      data: {
        name: s.name,
        description: s.description,
        occasion: s.occasion,
        pieces: { create: s.pieces },
      },
    });
    const total = s.pieces.reduce((sum, p) => sum + p.basePriceSAR, 0);
    console.log(`  ✓ ${s.name}  (${s.pieces.length} pieces · SAR ${total.toLocaleString()})  →  ${created.id}`);
  }

  console.log('Seed complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
