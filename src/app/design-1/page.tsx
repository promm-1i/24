import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { COMPANY } from "@/lib/content";
import { EstimateForm } from "@/components/landing/EstimateForm";
import { EstimateModalProvider, EstimateModalTrigger } from "@/components/landing/EstimateModal";
import { HeroVideo } from "@/components/design1/HeroVideo";
import { ReviewsMarquee } from "@/components/design1/ReviewsMarquee";
import { GalleryMarquee } from "@/components/design1/GalleryMarquee";
import { Reveal } from "@/components/design1/Reveal";
import { ServiceShowcase } from "@/components/design1/ServiceShowcase";
import { QuickMenu } from "@/components/design1/QuickMenu";
import { InsuranceBadge } from "@/components/design1/InsuranceBadge";

// 클라이언트가 전달한 실제 배경 영상 (public/videos) — 순서대로 반복 재생
const HERO_VIDEOS = [
  "/videos/moving-final.mp4",
  "/videos/moving-truck.mp4",
];

// 실제 현장 사진 (클라이언트 전달, 파일명을 캡션으로 매칭)
const GALLERY_IMAGES = [
  { src: "/images/gallery/gallery-01.jpg", caption: "깔끔한 매트리스 설치 사진 입니다" },
  { src: "/images/gallery/gallery-02.jpg", caption: "냉장고에 기스가 나지 않도록 꼼꼼하게 포장하는 사진입니다" },
  { src: "/images/gallery/gallery-03.jpg", caption: "냉장고에 식품을 넣기 전 살균소독을 진행하는 사진입니다" },
  { src: "/images/gallery/gallery-04.jpg", caption: "드럼세탁기 이동설치 사진입니다" },
  { src: "/images/gallery/gallery-05.jpg", caption: "매트리스 분해 및 조립 사진입니다" },
  { src: "/images/gallery/gallery-06.jpg", caption: "바닥에 깨끗한 물걸레로 청소중인 사진입니다" },
  { src: "/images/gallery/gallery-07.jpg", caption: "비품 정리하는 사진입니다" },
  { src: "/images/gallery/gallery-08.jpg", caption: "식자재 정리하는 사진입니다" },
  { src: "/images/gallery/gallery-09.jpg", caption: "신발장 정리하는 사진입니다" },
  { src: "/images/gallery/gallery-10.jpg", caption: "신선하게 운반한 식품을 냉장고에 정리하는 사진입니다" },
  { src: "/images/gallery/gallery-11.jpg", caption: "안전하게 TV 설치하고 있는 사진입니다" },
  { src: "/images/gallery/gallery-12.jpg", caption: "에어컨 분해 및 조립 사진입니다" },
  { src: "/images/gallery/gallery-13.jpg", caption: "이사 완료 된 주방사진 입니다" },
  { src: "/images/gallery/gallery-14.jpg", caption: "이사 전 미리 냉장고 상단에 있는 쌓인 먼지 청소하는 사진입니다" },
  { src: "/images/gallery/gallery-15.jpg", caption: "이삿짐 하차지에 보양재를 설치하는 사진입니다" },
  { src: "/images/gallery/gallery-16.jpg", caption: "주방 집기류 정리중인 사진입니다" },
  { src: "/images/gallery/gallery-17.jpg", caption: "화장실 서랍장 청소 완료후 사진입니다" },
  { src: "/images/gallery/gallery-18.jpg", caption: "화장실 짐정리 사진입니다" },
];

// 실제 현장/브랜드 사진 (클라이언트 전달)
const HIGHLIGHT_ITEMS = [
  {
    keyword: "DIRECT TEAM",
    titleLines: ["외국인 NO,", "한국인으로만 구성된 직영팀"],
    descLines: ["하청 없이 이사가요 소속 직영팀이 처음부터 끝까지", "직접 진행합니다."],
    image: "/images/highlight-1.jpg",
    alt: "이사가요 직영팀",
  },
  {
    keyword: "SAME MANAGER",
    titleLines: ["방문견적 담당 매니저가", "이사 당일 처음부터 끝까지", "책임관리 합니다"],
    descLines: ["견적부터 마무리까지 같은 매니저가 직접 관리해 원활한 소통, 안심할 수 있습니다."],
    image: "/images/highlight-2.jpg",
    alt: "현장 방문 견적 작성",
  },
  {
    keyword: "CAREFUL MOVING",
    titleLines: ["합리적인 비용,", "철저한 사후관리 및 AS"],
    descLines: ["불필요한 비용없이 합리적인 가격으로 진행하며,", "철저한 사후관리 및 AS"],
    image: "/images/highlight-3.jpg",
    alt: "KB손해보험 3억원 가입",
    fit: "contain" as const,
  },
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
  { icon: "/images/badge-safe-packing.png", label: "안전한 포장" },
  { icon: "/images/badge-fast-shipping.png", label: "신속한 운송" },
  { icon: "/images/badge-clean-organizing.png", label: "깔끔한 정리" },
  { icon: "/images/badge-custom-service.png", label: "고객 맞춤 서비스" },
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
        take: 10,
      })
    : [];

  const galleryItems =
    galleryPhotos.length > 0
      ? galleryPhotos.map((p) => ({
          id: p.id,
          src: p.imageUrl,
          caption: p.category,
        }))
      : GALLERY_IMAGES.map((g) => ({ id: g.src, src: g.src, caption: g.caption }));

  return (
    <EstimateModalProvider>
    <div className="min-h-screen bg-white pb-16 text-zinc-900 md:pb-0">
      <QuickMenu />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-icon.png"
              alt={`${COMPANY.name} 로고`}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-lg font-extrabold">{COMPANY.name}</span>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-zinc-600 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-zinc-900">
                {n.label}
              </a>
            ))}
          </nav>
          <EstimateModalTrigger className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">
            견적 신청하기
          </EstimateModalTrigger>
        </div>
      </header>

      {/* Hero — 실제 클라이언트 배경 영상 3개 순환 재생 */}
      <HeroVideo sources={HERO_VIDEOS} cornerBadge={<InsuranceBadge />}>
        <div className="mx-auto max-w-xl text-left">
          <p className="text-lg font-light tracking-wide text-white sm:text-xl">
            기쁜날 함께가는 좋은친구
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">
            믿음직한 이사,
            <br />
            깔끔한 정리,
            <br />
            <span className="text-red-500">새로운 시작</span>
          </h1>
          <p className="mt-4 max-w-md text-zinc-200">
            이사가요와 함께 편안하고 완벽한 이사를 경험하세요.
          </p>
          <div className="mt-8 flex flex-wrap justify-start gap-3">
            <EstimateModalTrigger className="rounded-full bg-red-600 px-8 py-4 text-base font-bold text-white hover:bg-red-700 sm:text-lg">
              무료 견적 신청
            </EstimateModalTrigger>
            <a
              href={`tel:${COMPANY.phone}`}
              className="rounded-full border border-white/70 px-8 py-4 text-base font-bold text-white hover:bg-white/10 sm:text-lg"
            >
              전화 상담 {COMPANY.phone}
            </a>
          </div>
        </div>
      </HeroVideo>

      {/* 모바일에서는 현장사진 다음에 다른이유가 오도록 순서 조정, PC는 기존 순서 유지 */}
      <div className="flex flex-col">
      {/* Badges */}
      <section className="order-1 border-y border-red-100 bg-red-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {BADGES.map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-3 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.icon} alt={b.label} className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
              <span className="text-lg font-bold text-zinc-700 sm:text-xl">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery — 오른쪽에서 왼쪽으로 흐르는 티커, 관리자 페이지에서 등록한 사진이 우선 노출 */}
      <section id="gallery" className="order-2 py-16">
        <Reveal direction="up">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">현장 사진</h2>
          <p className="mt-2 text-center text-zinc-500">
            이사가요 실제 현장 작업사진 입니다
          </p>
        </Reveal>
        <div className="mt-10">
          <GalleryMarquee items={galleryItems} />
        </div>
      </section>

      {/* Services — 좌측 대표 이미지 + 우측 세로 목록, 호버/탭으로 전환 */}
      {/* 모바일: 다른이유 다음(4번째), PC: 다른이유 앞(3번째) */}
      <section id="services" className="order-4 px-4 py-20 sm:px-6 md:order-3">
        <div className="mx-auto max-w-6xl">
          <Reveal direction="up">
            <h2 className="text-2xl font-bold sm:text-3xl">서비스 안내</h2>
            <p className="mt-2 text-zinc-500">
              고객님의 상황에 맞는 이사 서비스를 선택해주세요
            </p>
          </Reveal>
          <div className="mt-12">
            <Reveal direction="up">
              <ServiceShowcase services={services} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Highlights — 항목마다 텍스트/이미지 교차 배치 + 반대 방향 슬라이드 강조 */}
      {/* 모바일: 현장사진 다음(3번째), PC: 서비스안내 다음(4번째) */}
      <section id="about" className="order-3 bg-white px-4 py-16 sm:px-6 md:order-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="flex items-center justify-center gap-2 text-center text-2xl font-bold sm:text-3xl">
            <Image
              src="/images/logo-icon.png"
              alt={`${COMPANY.name} 로고`}
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            {COMPANY.name}가 다른 이유
          </h2>
          <div className="mt-16 flex flex-col gap-24 sm:gap-32">
            {HIGHLIGHT_ITEMS.map((item, i) => {
              const imageFrom = i % 2 === 0 ? "left" : "right";
              const textFrom = i % 2 === 0 ? "right" : "left";
              return (
                <div
                  key={item.keyword}
                  className={`flex flex-col items-center gap-8 md:flex-row md:gap-14 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <Reveal direction={imageFrom} className="w-full md:w-3/5">
                    <div
                      className={`relative h-72 w-full overflow-hidden rounded-md sm:h-96 md:h-[440px] ${
                        item.fit === "contain" ? "bg-zinc-50" : ""
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className={item.fit === "contain" ? "object-contain" : "object-cover"}
                      />
                    </div>
                  </Reveal>
                  <Reveal direction={textFrom} className="w-full md:w-2/5">
                    <p className="font-mono text-sm font-bold tracking-[0.2em] text-red-600 sm:text-base">
                      {String(i + 1).padStart(2, "0")} — {item.keyword}
                    </p>
                    <h3 className="mt-4 text-2xl font-bold text-zinc-900 sm:text-3xl">
                      {item.titleLines.map((line, li) => (
                        <span key={line}>
                          {line}
                          {li < item.titleLines.length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-500 sm:text-base">
                      {item.descLines.map((line, li) => (
                        <span key={line}>
                          {line}
                          {li < item.descLines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews — 오른쪽에서 왼쪽으로 끊김없이 흐르는 티커 */}
      <section id="info" className="order-5 bg-zinc-50 py-16">
        <Reveal direction="up">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">고객 후기</h2>
        </Reveal>
        <div className="mt-10">
          <ReviewsMarquee reviews={reviews} />
        </div>
      </section>

      {/* Estimate */}
      <section id="estimate" className="order-6 px-4 py-16 sm:px-6">
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
      </div>

      {/* KB손해보험 배상보험 가입 고지 — 푸터 바로 위 한 줄 */}
      <div className="bg-zinc-950 px-4 py-2.5 text-center text-xs font-semibold text-amber-400 sm:px-6">
        KB손해보험 이삿짐배상보험 3억원 가입
      </div>

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
    </EstimateModalProvider>
  );
}
