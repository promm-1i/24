import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { COMPANY, HIGHLIGHTS } from "@/lib/content";
import { EstimateForm } from "@/components/landing/EstimateForm";

export const metadata = { title: `${COMPANY.name} - 시안 2` };

const NAV = [
  { href: "#services", label: "서비스안내" },
  { href: "#about", label: "회사소개" },
  { href: "#reviews", label: "고객후기" },
  { href: "#contact", label: "고객센터" },
];

const SERVICE_TONES = [
  "from-slate-700 to-slate-900",
  "from-zinc-700 to-zinc-900",
  "from-stone-700 to-stone-900",
  "from-slate-600 to-slate-800",
  "from-zinc-600 to-zinc-800",
  "from-stone-600 to-stone-800",
];

export default async function Design2Page() {
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
      <header className="sticky top-0 z-50 bg-slate-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="text-lg font-extrabold tracking-tight text-white">
            {COMPANY.name}
          </span>
          <nav className="hidden gap-8 text-sm font-medium text-slate-300 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#estimate"
            className="rounded-md bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-amber-400"
          >
            견적 신청
          </a>
        </div>
      </header>

      {/* Full-bleed hero */}
      <section className="relative flex h-[520px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-black sm:h-[620px]">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_60%,white,transparent_30%)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white sm:px-6">
          <p className="text-sm font-semibold tracking-widest text-amber-400">
            {COMPANY.name} PROFESSIONAL MOVING
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
            전문가가 만드는
            <br />
            정확하고 안전한 이사
          </h1>
          <p className="mt-5 text-slate-300">
            가정이사부터 관공서·사무실이사까지, 이사가요 직영팀이 처음부터 끝까지 책임집니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#estimate"
              className="rounded-md bg-amber-500 px-8 py-3 text-sm font-bold text-slate-900 hover:bg-amber-400"
            >
              무료 견적 요청
            </a>
            <a
              href={`tel:${COMPANY.phone}`}
              className="rounded-md border border-slate-500 px-8 py-3 text-sm font-bold text-white hover:border-white"
            >
              전화 상담 {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6">
          {HIGHLIGHTS.map((h) => (
            <div key={h} className="flex items-start gap-3 border-l-2 border-amber-500 pl-4">
              <p className="text-sm font-medium text-slate-200">{h}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services with image blocks */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">서비스 안내</h2>
        <p className="mt-2 text-center text-zinc-500">
          현장 경험을 바탕으로 한 6가지 전문 이사 서비스
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.id} className="overflow-hidden rounded-lg border border-zinc-200">
              <div
                className={`h-36 bg-gradient-to-br ${SERVICE_TONES[i % SERVICE_TONES.length]}`}
              />
              <div className="p-5">
                <h3 className="font-bold text-slate-900">{s.name}</h3>
                <p className="mt-2 text-sm text-zinc-600">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About with image */}
      <section id="about" className="bg-zinc-50 px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="h-64 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 sm:h-80" />
          <div>
            <p className="text-sm font-semibold text-amber-600">WHY {COMPANY.name}</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              직영팀이 처음부터 끝까지
              <br />
              책임지는 이사
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-zinc-600">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-amber-500">●</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">고객 후기</h2>
        {reviews.length === 0 ? (
          <p className="mt-10 text-center text-sm text-zinc-400">
            등록된 후기가 아직 없습니다.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-lg border border-zinc-200 p-6">
                {r.rating && <p className="mb-2 text-amber-500">{"★".repeat(r.rating)}</p>}
                <h3 className="font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{r.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Estimate */}
      <section id="estimate" className="bg-slate-900 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
            무료 견적 요청
          </h2>
          <p className="mt-2 text-center text-slate-300">
            전문 매니저가 직접 확인 후 빠르게 연락드립니다
          </p>
          <div className="mt-8">
            <EstimateForm accent="slate" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black px-4 py-10 text-sm text-slate-400 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold text-white">{COMPANY.name}</p>
          <p className="mt-2">
            대표: {COMPANY.ownerName} · 사업자등록 주소: {COMPANY.bizRegisteredAddress}
          </p>
          <p className="mt-1">고객센터: {COMPANY.phone}</p>
          <p className="mt-4 text-xs text-slate-600">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <Link href="/" className="mt-4 inline-block text-xs text-slate-500 underline">
            ← 시안 목록으로
          </Link>
        </div>
      </footer>
    </div>
  );
}
