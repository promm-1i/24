import { prisma } from "@/lib/prisma";

const FALLBACK_SERVICES = [
  { id: "fallback-1", name: "가정이사", description: "가족 단위 포장이사, 전 과정 책임 진행" },
  { id: "fallback-2", name: "원룸이사", description: "자취생·1인 가구를 위한 합리적인 이사" },
  { id: "fallback-3", name: "보관이사", description: "이사와 보관을 한 번에, 안전한 물품 보관" },
  { id: "fallback-4", name: "사무실이사", description: "기업·사무실 이전, 주말·야간 진행 가능" },
];

export async function Services() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const items = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
        서비스 안내
      </h2>
      <p className="mt-2 text-center text-zinc-500">
        고객님의 상황에 맞는 이사 서비스를 선택해주세요
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((service) => (
          <div
            key={service.id}
            className="rounded-xl border border-zinc-200 p-6 transition hover:border-blue-300 hover:shadow-sm"
          >
            <div className="mb-3 h-10 w-10 rounded-lg bg-blue-100" />
            <h3 className="font-bold text-zinc-900">{service.name}</h3>
            <p className="mt-1 text-sm text-zinc-500">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
