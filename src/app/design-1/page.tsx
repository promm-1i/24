import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { COMPANY, HIGHLIGHTS } from "@/lib/content";
import { EstimateForm } from "@/components/landing/EstimateForm";
import { HeroSlideshow } from "@/components/design1/HeroSlideshow";
import { ReviewsCarousel } from "@/components/design1/ReviewsCarousel";

// TODO: swap for real client photos (현장/차량/작업/대표 사진) once received.
// Curated Unsplash stock photos in the meantime — real, licensed-for-hotlink
// stock (not generated), picked to roughly match each section's subject.
const HERO_IMAGES = [
  { src: "https://images.unsplash.com/photo-1780932564199-1bcb4d9e6571?w=1600&q=80&auto=format&fit=crop", alt: "이사 준비 중인 거실" },
  { src: "https://images.unsplash.com/photo-1758227365187-016878604d94?w=1600&q=80&auto=format&fit=crop", alt: "가족 이사" },
  { src: "https://images.unsplash.com/photo-1758523671637-5a39ea2c129b?w=1600&q=80&auto=format&fit=crop", alt: "이사 포장 박스" },
  { src: "https://images.unsplash.com/photo-1783473007464-1dbf2ff30dec?w=1600&q=80&auto=format&fit=crop", alt: "이사 정리" },
];

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1772724317350-520faccb15e6?w=600&q=80&auto=format&fit=crop", caption: "포장이사" },
  { src: "https://images.unsplash.com/photo-1758523671165-967ec4af0d76?w=600&q=80&auto=format&fit=crop", caption: "원룸이사" },
  { src: "https://images.unsplash.com/photo-1758523671893-0ba21cf4260f?w=600&q=80&auto=format&fit=crop", caption: "가정이사" },
  { src: "https://images.unsplash.com/photo-1577702312572-5bb9328a9f15?w=600&q=80&auto=format&fit=crop", caption: "사무실이사" },
];

export const metadata = { title: `${COMPANY.name} - 시안 1` };

const NAV = [
  { href: "#about", label: "회사소개" },
  { href: "#services", label: "서비스안내" },
  { href: "#gallery", label: "현장사진" },
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

      {/* Hero — full-bleed slideshow (임시 이미지, 실제 사진/영상 받으면 교체) */}
      <HeroSlideshow images={HERO_IMAGES}>
        <p className="text-lg font-bold text-red-400 sm:text-xl">
          기쁜날 함께가는 좋은친구
        </p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">
          믿음직한 이사,
          <br />
          깔끔한 정리,
          <br />
          <span className="text-red-500">새로운 시작</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-zinc-200">
          이사가요와 함께 편안하고 완벽한 이사를 경험하세요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#estimate"
            className="rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white hover:bg-red-700 sm:text-lg"
          >
            무료 견적 신청
          </a>
          <a
            href={`tel:${COMPANY.phone}`}
            className="rounded-full border border-white/70 px-8 py-4 text-base font-bold text-white hover:bg-white/10 sm:text-lg"
          >
            전화 상담 {COMPANY.phone}
          </a>
        </div>
      </HeroSlideshow>

      {/* Badges */}
      <section className="border-y border-red-100 bg-red-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {BADGES.map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-3 text-center">
              <span className="text-4xl sm:text-5xl">{b.icon}</span>
              <span className="text-lg font-bold text-zinc-700 sm:text-xl">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">현장 사진</h2>
        <p className="mt-2 text-center text-zinc-500">
          실제 현장·차량 사진은 전달받는 대로 교체됩니다
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GALLERY_IMAGES.map((g) => (
            <div key={g.src} className="group relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={g.src}
                alt={g.caption}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 text-xs font-bold text-white">
                {g.caption}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-zinc-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">서비스 안내</h2>
          <p className="mt-2 text-center text-zinc-500">
            고객님의 상황에 맞는 이사 서비스를 선택해주세요
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.id} className="rounded-xl border border-red-100 bg-white p-6">
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
        </div>
      </section>

      {/* Highlights */}
      <section id="about" className="bg-gradient-to-br from-red-600 to-red-700 px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            {COMPANY.name}가 다른 이유
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h} className="rounded-xl bg-white/10 p-6 text-center backdrop-blur">
                <p className="text-sm font-semibold">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="info" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">고객 후기</h2>
        <div className="mt-10">
          <ReviewsCarousel reviews={reviews} />
        </div>
      </section>

      {/* Estimate */}
      <section id="estimate" className="bg-zinc-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">무료 견적 요청</h2>
          <p className="mt-2 text-center text-zinc-500">
            출발지/도착지 지역을 선택하고 남겨주시면 빠르게 연락드릴게요
          </p>
          <div className="mt-8">
            <EstimateForm accent="red" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-900 px-4 py-10 text-sm text-zinc-400 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold text-white">{COMPANY.name}</p>
          <p className="mt-2">
            대표: {COMPANY.ownerName} · 사업장 주소: {COMPANY.bizAddress}
          </p>
          <p className="mt-1">고객센터: {COMPANY.phone}</p>
          <p className="mt-4 text-xs text-zinc-600">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <Link href="/" className="mt-4 inline-block text-xs text-zinc-500 underline">
            ← 시안 목록으로
          </Link>
        </div>
      </footer>
    </div>
  );
}
