import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: { name: 'Electronics' },
  });

  const clothing = await prisma.category.upsert({
    where: { name: 'Clothing' },
    update: {},
    create: { name: 'Clothing' },
  });

  const home = await prisma.category.upsert({
    where: { name: 'Home' },
    update: {},
    create: { name: 'Home' },
  });

  const books = await prisma.category.upsert({
    where: { name: 'Books' },
    update: {},
    create: { name: 'Books' },
  });

  await prisma.product.createMany({
    data: [
      // Electronics
      {
        name: 'iPhone 15',
        price: 999,
        inventory: 50,
        categoryId: electronics.id,
      },
      {
        name: 'Samsung Galaxy S23',
        price: 899,
        inventory: 45,
        categoryId: electronics.id,
      },
      {
        name: 'Sony WH-1000XM5 Headphones',
        price: 399,
        inventory: 30,
        categoryId: electronics.id,
      },
      {
        name: 'Apple MacBook Pro',
        price: 1999,
        inventory: 20,
        categoryId: electronics.id,
      },
      {
        name: 'Nintendo Switch',
        price: 299,
        inventory: 40,
        categoryId: electronics.id,
      },

      // Clothing
      {
        name: 'Classic T-Shirt',
        price: 19.99,
        inventory: 100,
        categoryId: clothing.id,
      },
      {
        name: 'Denim Jeans',
        price: 59.99,
        inventory: 60,
        categoryId: clothing.id,
      },
      {
        name: 'Hooded Sweatshirt',
        price: 39.99,
        inventory: 70,
        categoryId: clothing.id,
      },
      {
        name: 'Running Shoes',
        price: 89.99,
        inventory: 35,
        categoryId: clothing.id,
      },
      {
        name: 'Baseball Cap',
        price: 14.99,
        inventory: 80,
        categoryId: clothing.id,
      },

      // Home
      {
        name: 'Blender',
        price: 49.99,
        inventory: 25,
        categoryId: home.id,
      },
      {
        name: 'Vacuum Cleaner',
        price: 129.99,
        inventory: 22,
        categoryId: home.id,
      },
      {
        name: 'Coffee Maker',
        price: 79.99,
        inventory: 18,
        categoryId: home.id,
      },
      {
        name: 'Desk Lamp',
        price: 24.99,
        inventory: 55,
        categoryId: home.id,
      },
      {
        name: 'Air Fryer',
        price: 99.99,
        inventory: 28,
        categoryId: home.id,
      },

      // Books
      {
        name: 'The Pragmatic Programmer',
        price: 39.99,
        inventory: 15,
        categoryId: books.id,
      },
      {
        name: 'Clean Code',
        price: 34.99,
        inventory: 17,
        categoryId: books.id,
      },
      {
        name: "You Don't Know JS",
        price: 29.99,
        inventory: 21,
        categoryId: books.id,
      },
      {
        name: 'Eloquent JavaScript',
        price: 24.99,
        inventory: 13,
        categoryId: books.id,
      },
      {
        name: 'Design Patterns',
        price: 44.99,
        inventory: 12,
        categoryId: books.id,
      },

      // Extra to ensure >20
      {
        name: 'Wireless Charger',
        price: 29.99,
        inventory: 50,
        categoryId: electronics.id,
      },
      {
        name: 'Scented Candle',
        price: 12.99,
        inventory: 40,
        categoryId: home.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('🌱 Database seeded with 4 categories and 22+ products');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
