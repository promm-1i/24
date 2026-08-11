import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { COMPANY, HIGHLIGHTS } from "@/lib/content";
import { EstimateForm } from "@/components/landing/EstimateForm";

export const metadata = { title: `${COMPANY.name} - 시안 1` };

const NAV = [
  { href: "#about", label: "회사소개" },
  { href: "#services", label: "서비스안내" },
  { href: "#info", label: "이사정보" },
  { href: "#contact", label: "고객센터" },
];

const BADGES = [
  { icon: "🛡️", label: "안전한 포장" },
  { icon: "🚚", label: "신속한 운송" },
  { icon: "🧹", label: "깔끔한 정리" },
  { icon: "🤝", label: "고객 맞춤 서비스" },
];

export default async function Design1Page() {
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
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-sm font-black text-white">
              이사
            </div>
            <span className="text-lg font-extrabold">{COMPANY.name}</span>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-zinc-600 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-zinc-900">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#estimate"
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
          >
            견적 신청하기
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-lg font-bold text-red-600 sm:text-xl">
            기쁜날 함께가는 좋은친구
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">
            믿음직한 이사,
            <br />
            깔끔한 정리,
            <br />
            <span className="text-red-600">새로운 시작</span>
          </h1>
          <p className="mt-4 text-zinc-500">
            이사가요와 함께 편안하고 완벽한 이사를 경험하세요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#estimate"
              className="rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white hover:bg-red-700 sm:text-lg"
            >
              무료 견적 신청
            </a>
            <a
              href={`tel:${COMPANY.phone}`}
              className="rounded-full border border-zinc-300 px-8 py-4 text-base font-bold text-zinc-700 hover:border-zinc-400 sm:text-lg"
            >
              전화 상담 {COMPANY.phone}
            </a>
          </div>
        </div>

        {/* Illustrated hero visual (placeholder for real photo) */}
        <div className="relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 sm:h-96">
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative h-24 w-20 rounded-md bg-gradient-to-br from-amber-200 to-amber-300 shadow-md sm:h-32 sm:w-28"
                style={{ marginTop: i === 1 ? 0 : 20 }}
              >
                <span className="absolute left-1/2 top-2 -translate-x-1/2 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  이사가요
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="border-y border-zinc-100 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {BADGES.map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl sm:text-5xl">{b.icon}</span>
              <span className="text-lg font-bold text-zinc-700 sm:text-xl">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">서비스 안내</h2>
        <p className="mt-2 text-center text-zinc-500">
          고객님의 상황에 맞는 이사 서비스를 선택해주세요
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="rounded-xl border border-zinc-200 p-6">
              <h3 className="font-bold text-red-600">{s.name}</h3>
              <p className="mt-2 text-sm text-zinc-600">{s.description}</p>
              {s.features.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-zinc-500">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section id="about" className="bg-zinc-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            {COMPANY.name}가 다른 이유
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-semibold text-zinc-700">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="info" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">고객 후기</h2>
        {reviews.length === 0 ? (
          <p className="mt-10 text-center text-sm text-zinc-400">
            등록된 후기가 아직 없습니다.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-zinc-200 p-6">
                {r.rating && <p className="mb-2 text-amber-500">{"★".repeat(r.rating)}</p>}
                <h3 className="font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{r.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Estimate */}
      <section id="estimate" className="bg-zinc-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">무료 견적 요청</h2>
          <p className="mt-2 text-center text-zinc-500">
            이름, 연락처, 출발지, 도착지, 희망일을 남겨주시면 빠르게 연락드릴게요
          </p>
          <div className="mt-8">
            <EstimateForm accent="red" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-zinc-100 px-4 py-10 text-sm text-zinc-500 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold text-zinc-700">{COMPANY.name}</p>
          <p className="mt-2">
            대표: {COMPANY.ownerName} · 사업장 주소: {COMPANY.bizAddress}
          </p>
          <p className="mt-1">고객센터: {COMPANY.phone}</p>
          <p className="mt-4 text-xs text-zinc-400">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <Link href="/" className="mt-4 inline-block text-xs text-zinc-400 underline">
            ← 시안 목록으로
          </Link>
        </div>
      </footer>
    </div>
  );
}
