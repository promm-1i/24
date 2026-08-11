import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { SERVICES } from "../src/lib/content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "changeme123!";

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "관리자",
      role: "SUPER_ADMIN",
    },
  });
  console.log(`Admin user ready: ${adminEmail} / ${adminPassword}`);

  await prisma.board.upsert({
    where: { code: "review" },
    update: {},
    create: { code: "review", name: "고객 후기" },
  });

  // Remove placeholder services from the earlier scaffold so only the
  // client-provided 6 services remain.
  const currentSlugs = SERVICES.map((s) => s.slug);
  await prisma.service.deleteMany({ where: { slug: { notIn: currentSlugs } } });

  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        category: service.category,
        name: service.name,
        description: service.description,
        features: service.features,
        sortOrder: service.sortOrder,
      },
      create: {
        category: service.category,
        name: service.name,
        slug: service.slug,
        description: service.description,
        features: service.features,
        sortOrder: service.sortOrder,
      },
    });
  }
  console.log(`Seeded ${SERVICES.length} services`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
