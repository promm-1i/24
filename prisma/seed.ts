import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

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

  const services = [
    { category: "이사", name: "가정이사", slug: "home-move", description: "가족 단위 포장이사, 전 과정 책임 진행", sortOrder: 1 },
    { category: "이사", name: "원룸이사", slug: "studio-move", description: "자취생·1인 가구를 위한 합리적인 이사", sortOrder: 2 },
    { category: "이사", name: "보관이사", slug: "storage-move", description: "이사와 보관을 한 번에, 안전한 물품 보관", sortOrder: 3 },
    { category: "이사", name: "사무실이사", slug: "office-move", description: "기업·사무실 이전, 주말·야간 진행 가능", sortOrder: 4 },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log(`Seeded ${services.length} services`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
