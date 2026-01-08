import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
console.log(`Connected as ${connectionString}`);
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
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Apple iPhone 15 — latest model with advanced camera and performance.',
      },
      {
        name: 'Samsung Galaxy S23',
        price: 899,
        inventory: 45,
        categoryId: electronics.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Samsung Galaxy S23 — premium Android smartphone with excellent display.',
      },
      {
        name: 'Sony WH-1000XM5 Headphones',
        price: 399,
        inventory: 30,
        categoryId: electronics.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Sony WH-1000XM5 — industry-leading noise cancelling wireless headphones.',
      },
      {
        name: 'Apple MacBook Pro',
        price: 1999,
        inventory: 20,
        categoryId: electronics.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Apple MacBook Pro — powerful laptop for professionals and creators.',
      },
      {
        name: 'Nintendo Switch',
        price: 299,
        inventory: 40,
        categoryId: electronics.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Nintendo Switch — versatile gaming console for home and on-the-go.',
      },

      // Clothing
      {
        name: 'Classic T-Shirt',
        price: 19.99,
        inventory: 100,
        categoryId: clothing.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Comfortable classic cotton t-shirt available in multiple sizes.',
      },
      {
        name: 'Denim Jeans',
        price: 59.99,
        inventory: 60,
        categoryId: clothing.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description: 'Durable denim jeans with a modern slim fit.',
      },
      {
        name: 'Hooded Sweatshirt',
        price: 39.99,
        inventory: 70,
        categoryId: clothing.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description: 'Cozy hooded sweatshirt ideal for everyday wear.',
      },
      {
        name: 'Running Shoes',
        price: 89.99,
        inventory: 35,
        categoryId: clothing.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Lightweight running shoes with breathable upper and cushioned sole.',
      },
      {
        name: 'Baseball Cap',
        price: 14.99,
        inventory: 80,
        categoryId: clothing.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description: 'Adjustable baseball cap with embroidered logo.',
      },

      // Home
      {
        name: 'Blender',
        price: 49.99,
        inventory: 25,
        categoryId: home.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description: 'High-speed blender for smoothies, soups, and sauces.',
      },
      {
        name: 'Vacuum Cleaner',
        price: 129.99,
        inventory: 22,
        categoryId: home.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description: 'Powerful vacuum cleaner with multiple attachments.',
      },
      {
        name: 'Coffee Maker',
        price: 79.99,
        inventory: 18,
        categoryId: home.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Automatic coffee maker with programmable timer and strong brew settings.',
      },
      {
        name: 'Desk Lamp',
        price: 24.99,
        inventory: 55,
        categoryId: home.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description: 'Adjustable desk lamp with LED lighting and dimmer.',
      },
      {
        name: 'Air Fryer',
        price: 99.99,
        inventory: 28,
        categoryId: home.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Versatile air fryer for healthier frying with crisp results.',
      },

      // Books
      {
        name: 'The Pragmatic Programmer',
        price: 39.99,
        inventory: 15,
        categoryId: books.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Classic software engineering book covering practical development techniques.',
      },
      {
        name: 'Clean Code',
        price: 34.99,
        inventory: 17,
        categoryId: books.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'A handbook of agile software craftsmanship and code quality principles.',
      },
      {
        name: "You Don't Know JS",
        price: 29.99,
        inventory: 21,
        categoryId: books.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description: 'In-depth JavaScript book series that explores core mechanisms of JS.',
      },
      {
        name: 'Eloquent JavaScript',
        price: 24.99,
        inventory: 13,
        categoryId: books.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description: 'A modern introduction to programming using JavaScript.',
      },
      {
        name: 'Design Patterns',
        price: 44.99,
        inventory: 12,
        categoryId: books.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Software design patterns and best practices for creating robust systems.',
      },

      // Extra to ensure >20
      {
        name: 'Wireless Charger',
        price: 29.99,
        inventory: 50,
        categoryId: electronics.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description:
          'Fast wireless charger compatible with Qi-enabled devices.',
      },
      {
        name: 'Scented Candle',
        price: 12.99,
        inventory: 40,
        categoryId: home.id,
        imageUrl: '/public/productImages/wireless headphones.webp',
        description: 'Long-burning scented candle with relaxing fragrance.',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded with 4 categories and 22+ products');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
