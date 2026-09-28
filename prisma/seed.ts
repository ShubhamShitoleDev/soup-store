import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  const soups = await prisma.category.upsert({
    where: { slug: "gourmet-soups" },
    update: {},
    create: {
      name: "Gourmet Soups",
      slug: "gourmet-soups",
      description: "Nutritious, hot, and delicious instant soup ready in minutes.",
      sortOrder: 1,
    },
  });

  await prisma.category.upsert({
    where: { slug: "gravies" },
    update: {},
    create: {
      name: "Gravies",
      slug: "gravies",
      description: "Restaurant style food in 5 mins, preservative free.",
      sortOrder: 2,
    },
  });

  await prisma.category.upsert({
    where: { slug: "seasonings-toppings" },
    update: {},
    create: {
      name: "Seasonings & Toppings",
      slug: "seasonings-toppings",
      description: "Artisanal seasoning & exotic veggie toppings.",
      sortOrder: 3,
    },
  });

  const products = [
    { name: "Tomato Basil Soup", slug: "tomato-basil-soup", price: 240, mrp: 280, tag: "Bestseller", video: "tomato-basil" },
    { name: "Sweet Corn Soup", slug: "sweet-corn-soup", price: 220, mrp: 260, tag: null, video: "sweet-corn" },
    { name: "Hot & Sour Soup", slug: "hot-sour-soup", price: 250, mrp: 290, tag: "Spicy", video: "hot-sour" },
    { name: "Cream of Mushroom", slug: "mushroom-soup", price: 270, mrp: 300, tag: null, video: "mushroom" },
  ];

  for (const [i, p] of products.entries()) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        categoryId: soups.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        mrp: p.mrp,
        tag: p.tag,
        stockQty: 100,
        shortDescription: `Slow-simmered ${p.name.toLowerCase()}, freeze-dried to lock in flavour.`,
      },
    });

    await prisma.reel.create({
      data: {
        productId: product.id,
        title: p.name,
        videoUrl: `/reels/${p.video}.mp4`,
        posterUrl: `/reels/${p.video}.jpg`,
        sortOrder: i + 1,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
