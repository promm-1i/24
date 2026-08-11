import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { COMPANY, HIGHLIGHTS } from "@/lib/content";
import { EstimateForm } from "@/components/landing/EstimateForm";

export const metadata = { title: `${COMPANY.name} - 시안 3` };

const NAV = [
  { href: "#services", label: "서비스" },
  { href: "#about", label: "소개" },
  { href: "#reviews", label: "후기" },
  { href: "#contact", label: "문의" },
];

export default async function Design3Page() {
  const [services, board] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.board.findUnique({ where: { code: "review" } }),
  ]);
  const reviews = board
    ? await prisma.post.findMany({
        where: { boardId: board.id, status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 6,
      })
    : [];

  return (
    <div className="min-h-screen bg-stone-50 font-serif text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <span className="text-lg tracking-wide">{COMPANY.name}</span>
          <nav className="hidden gap-10 text-sm text-stone-500 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-stone-900">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#estimate"
            className="rounded-full border border-stone-400 px-5 py-2 text-sm hover:border-stone-800 hover:text-stone-900"
          >
            견적 문의
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center sm:py-40">
        <p className="text-sm tracking-[0.3em] text-stone-400">MOVING, DONE GENTLY</p>
        <h1 className="mt-6 text-3xl leading-relaxed sm:text-5xl">
          믿음직한 이사,
          <br />
          깔끔한 정리,
          <br />
          <span className="italic text-stone-500">새로운 시작</span>
        </h1>
        <p className="mx-auto mt-8 max-w-md text-stone-500">
          {COMPANY.name}와 함께 편안하고 완벽한 이사를 경험하세요.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#estimate"
            className="rounded-full bg-stone-800 px-10 py-3.5 text-sm text-white hover:bg-stone-900"
          >
            무료 견적 요청
          </a>
          <a href={`tel:${COMPANY.phone}`} className="text-sm text-stone-500 underline">
            전화 상담 {COMPANY.phone}
          </a>
        </div>
      </section>

      {/* Soft visual divider */}
      <div className="mx-auto h-56 max-w-4xl rounded-3xl bg-gradient-to-br from-stone-200 to-stone-100 sm:h-72" />

      {/* Highlights, minimal */}
      <section id="about" className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-32">
        <h2 className="text-2xl sm:text-3xl">우리가 다른 이유</h2>
        <div className="mt-14 flex flex-col gap-10">
          {HIGHLIGHTS.map((h, i) => (
            <div key={h}>
              <p className="text-xs tracking-widest text-stone-400">
                0{i + 1}
              </p>
              <p className="mt-2 text-lg text-stone-700">{h}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services, generous list */}
      <section id="services" className="border-t border-stone-200 bg-white px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl">서비스</h2>
          <p className="mt-4 text-stone-500">
            고객님의 상황에 맞는 이사 서비스를 안내해드립니다
          </p>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl flex-col divide-y divide-stone-200">
          {services.map((s, i) => (
            <div key={s.id} className="flex flex-col gap-2 py-8 sm:flex-row sm:gap-10">
              <span className="w-16 shrink-0 text-sm text-stone-400">0{i + 1}</span>
              <div>
                <h3 className="text-lg text-stone-800">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-32">
        <h2 className="text-2xl sm:text-3xl">고객 후기</h2>
        {reviews.length === 0 ? (
          <p className="mt-10 text-sm text-stone-400">등록된 후기가 아직 없습니다.</p>
        ) : (
          <div className="mt-14 flex flex-col gap-10">
            {reviews.map((r) => (
              <div key={r.id}>
                {r.rating && (
                  <p className="mb-2 text-stone-400">{"★".repeat(r.rating)}</p>
                )}
                <p className="text-lg text-stone-700">&ldquo;{r.body}&rdquo;</p>
                <p className="mt-3 text-xs tracking-widest text-stone-400">
                  {r.authorName ?? "고객"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Estimate */}
      <section id="estimate" className="border-t border-stone-200 bg-white px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl sm:text-3xl">무료 견적 요청</h2>
          <p className="mt-4 text-stone-500">
            이름, 연락처, 출발지, 도착지, 희망일을 남겨주세요
          </p>
          <div className="mt-12 text-left">
            <EstimateForm accent="stone" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-6 py-16 text-center text-sm text-stone-400">
        <p className="text-stone-600">{COMPANY.name}</p>
        <p className="mt-3">
          대표 {COMPANY.ownerName} · {COMPANY.bizRegisteredAddress}
        </p>
        <p className="mt-1">{COMPANY.phone}</p>
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} {COMPANY.name}
        </p>
        <Link href="/" className="mt-6 inline-block text-xs underline">
          ← 시안 목록으로
        </Link>
      </footer>
    </div>
  );
}
