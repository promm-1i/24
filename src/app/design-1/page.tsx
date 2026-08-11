import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { COMPANY } from "@/lib/content";
import { EstimateForm } from "@/components/landing/EstimateForm";
import { HeroVideo } from "@/components/design1/HeroVideo";
import { ReviewsMarquee } from "@/components/design1/ReviewsMarquee";
import { GalleryMarquee } from "@/components/design1/GalleryMarquee";
import { Reveal } from "@/components/design1/Reveal";

// 클라이언트가 전달한 실제 배경 영상 (public/videos) — 순서대로 반복 재생
const HERO_VIDEOS = [
  "/videos/boxes-stacking.mp4",
  "/videos/carrying-items.mp4",
  "/videos/truck-opening.mp4",
];

// TODO: swap for real client photos (현장/차량/작업/대표 사진) once received.
// Curated Unsplash stock photos in the meantime — real, licensed-for-hotlink
// stock (not generated), picked to roughly match each section's subject.
const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1772724317350-520faccb15e6?w=600&q=80&auto=format&fit=crop", caption: "포장이사" },
  { src: "https://images.unsplash.com/photo-1758523671165-967ec4af0d76?w=600&q=80&auto=format&fit=crop", caption: "원룸이사" },
  { src: "https://images.unsplash.com/photo-1758523671893-0ba21cf4260f?w=600&q=80&auto=format&fit=crop", caption: "가정이사" },
  { src: "https://images.unsplash.com/photo-1577702312572-5bb9328a9f15?w=600&q=80&auto=format&fit=crop", caption: "사무실이사" },
];

// TODO: swap for real client photos once received.
const HIGHLIGHT_ITEMS = [
  {
    title: "외국인 NO, 한국인으로만 구성된 직영팀",
    desc: "하청 없이 이사가요 소속 직영 인력이 처음부터 끝까지 직접 진행합니다.",
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=900&q=80&auto=format&fit=crop",
    alt: "이사가요 직영팀",
  },
  {
    title: "견적을 본 매니저가 직접 이삿날 방문",
    desc: "현장을 확인한 담당 매니저가 이사 당일까지 직접 챙기고 관리합니다.",
    image: "https://images.unsplash.com/photo-1523705480679-b5d0cc17a656?w=900&q=80&auto=format&fit=crop",
    alt: "현장 방문 견적 작성",
  },
  {
    title: "합리적인 비용, 꼼꼼한 포장·운반",
    desc: "불필요한 비용 없이 합리적인 가격으로, 포장은 더 꼼꼼하게 진행합니다.",
    image: "https://images.unsplash.com/photo-1580451301279-9ffaa7d55b4b?w=900&q=80&auto=format&fit=crop",
    alt: "꼼꼼한 포장",
  },
];

const SERVICE_ICONS: Record<string, string> = {
  포장이사: "📦",
  가정이사: "🏠",
  사무실이사: "🏢",
  보관이사: "🗄️",
  관공서이사: "🏛️",
  원룸이사: "🛏️",
};

// 데스크탑에서만 적용되는 줄바꿈 위치 (고객 요청 지점). 모바일은 자연스럽게 흐름.
const DESKTOP_LINE_BREAKS: Record<string, string[]> = {
  "포장이사": [
    "포장부터 운반, 정리까지 한 번에 진행해주는 편리한",
    "이사 서비스입니다. 가구, 가전제품, 생활용품 등",
    "모든 생활용품을 안전하게 포장하고 운송합니다.",
  ],
  "가정이사": [
    "가족 단위의 주거 이전을 위한 전문 서비스입니다.",
    "가구, 가전제품, 생활용품 등 모든 생활용품을",
    "안전하게 운송합니다.",
  ],
  "사무실이사": [
    "사무실·사업장의 집기와 장비를 안전하게",
    "포장·운반·정리해주는 전문 이사 서비스입니다.",
  ],
  "관공서이사": [
    "관공서의 서류·집기·장비 등을 안전하고 체계적으로",
    "포장·운반·배치하는 전문 이사 서비스입니다.",
  ],
};

function ServiceDescription({ name, description }: { name: string; description: string | null }) {
  const lines = DESKTOP_LINE_BREAKS[name];
  if (!lines) return <>{description}</>;

  return (
    <>
      {lines.map((line, i) => (
        <span key={line}>
          {line}
          {i < lines.length - 1 && <br className="hidden sm:block" />}
          {i < lines.length - 1 && <span className="sm:hidden"> </span>}
        </span>
      ))}
    </>
  );
}

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
  const [services, board, galleryPhotos] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.board.findUnique({ where: { code: "review" } }),
    prisma.galleryPhoto.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }),
  ]);
  const reviews = board
    ? await prisma.post.findMany({
        where: { boardId: board.id, status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 6,
      })
    : [];

  const galleryItems =
    galleryPhotos.length > 0
      ? galleryPhotos.map((p) => ({
          id: p.id,
          src: p.imageUrl,
          caption: p.caption ?? p.category,
        }))
      : GALLERY_IMAGES.map((g) => ({ id: g.src, src: g.src, caption: g.caption }));

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

      {/* Hero — 실제 클라이언트 배경 영상 3개 순환 재생 */}
      <HeroVideo sources={HERO_VIDEOS}>
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
      </HeroVideo>

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

      {/* Gallery — 오른쪽에서 왼쪽으로 흐르는 티커, 관리자 페이지에서 등록한 사진이 우선 노출 */}
      <section id="gallery" className="py-16">
        <Reveal direction="up">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">현장 사진</h2>
          <p className="mt-2 text-center text-zinc-500">
            실제 현장·차량 사진은 전달받는 대로 교체됩니다
          </p>
        </Reveal>
        <div className="mt-10">
          <GalleryMarquee items={galleryItems} />
        </div>
      </section>

      {/* Services — 아이콘 + 짧은 설명 + 태그칩으로 가독성 개선 */}
      <section id="services" className="bg-zinc-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal direction="up">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">서비스 안내</h2>
            <p className="mt-2 text-center text-zinc-500">
              고객님의 상황에 맞는 이사 서비스를 선택해주세요
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} direction="up" delayMs={(i % 3) * 100}>
                <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-2xl">
                      {SERVICE_ICONS[s.name] ?? "🚚"}
                    </span>
                    <h3 className="font-bold text-zinc-900">{s.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                    <ServiceDescription name={s.name} description={s.description} />
                  </p>
                  {s.features.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights — 항목마다 텍스트/이미지 교차 배치 + 반대 방향 슬라이드 강조 */}
      <section id="about" className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex items-center justify-center gap-2 text-center text-2xl font-bold sm:text-3xl">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-red-600 text-[10px] font-black text-white">
              CI
            </span>
            {COMPANY.name}가 다른 이유
          </h2>
          <div className="mt-12 flex flex-col gap-14">
            {HIGHLIGHT_ITEMS.map((item, i) => {
              const imageFrom = i % 2 === 0 ? "left" : "right";
              const textFrom = i % 2 === 0 ? "right" : "left";
              return (
                <div
                  key={item.title}
                  className={`flex flex-col items-center gap-6 md:flex-row md:gap-10 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <Reveal direction={imageFrom} className="w-full md:w-1/2">
                    <div className="group relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Reveal>
                  <Reveal direction={textFrom} className="w-full md:w-1/2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-zinc-900 sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                      {item.desc}
                    </p>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews — 오른쪽에서 왼쪽으로 끊김없이 흐르는 티커 */}
      <section id="info" className="bg-zinc-50 py-16">
        <Reveal direction="up">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">고객 후기</h2>
        </Reveal>
        <div className="mt-10">
          <ReviewsMarquee reviews={reviews} />
        </div>
      </section>

      {/* Estimate */}
      <section id="estimate" className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <Reveal direction="up">
            <h2 className="text-center text-2xl font-bold sm:text-3xl">무료 견적 요청</h2>
            <p className="mt-2 text-center text-zinc-500">
              출발지/도착지 지역을 선택하고 남겨주시면 빠르게 연락드릴게요
            </p>
          </Reveal>
          <div className="mt-8">
            <EstimateForm accent="red" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-900 px-4 py-10 text-sm text-zinc-400 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold text-white">{COMPANY.name}</p>

          {/* 상담 채널 */}
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`tel:${COMPANY.phone}`}
              className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              📞 고객센터 {COMPANY.phone}
            </a>
            {COMPANY.ownerPhone ? (
              <a
                href={`tel:${COMPANY.ownerPhone}`}
                className="rounded-full border border-zinc-600 px-5 py-2.5 text-sm font-bold text-white hover:border-zinc-400"
              >
                📞 대표 직통 {COMPANY.ownerPhone}
              </a>
            ) : (
              <span className="rounded-full border border-dashed border-zinc-600 px-5 py-2.5 text-sm font-bold text-zinc-500">
                📞 대표 직통 (번호 나오면 연결)
              </span>
            )}
            {COMPANY.kakaoUrl ? (
              <a
                href={COMPANY.kakaoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#FEE500] px-5 py-2.5 text-sm font-bold text-black hover:brightness-95"
              >
                💬 카카오톡 상담
              </a>
            ) : (
              <span className="rounded-full border border-dashed border-zinc-600 px-5 py-2.5 text-sm font-bold text-zinc-500">
                💬 카카오톡 상담 (링크 나오면 연결)
              </span>
            )}
          </div>

          {/* 주소 — 사업자등록 주소와 실제 상담 위치를 구분 표기 */}
          <div className="mt-6 space-y-1 text-xs">
            <p>대표: {COMPANY.ownerName}</p>
            <p>사업자등록 주소: {COMPANY.bizRegisteredAddress}</p>
            <p>
              사업장(상담) 주소:{" "}
              {COMPANY.officeAddress ?? "안내 예정 (전달받는 대로 반영)"}
            </p>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-zinc-600">
                © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
              </p>
              <Link href="/" className="mt-2 inline-block text-xs text-zinc-500 underline">
                ← 시안 목록으로
              </Link>
            </div>
            <Link
              href="/admin"
              className="text-xs text-zinc-600 underline hover:text-zinc-400"
            >
              관리자
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
