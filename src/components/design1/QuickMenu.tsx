import { COMPANY } from "@/lib/content";

// Desktop: vertical menu fixed to the right-center of the viewport.
// Mobile: same 3 actions, but as a bottom-fixed bar (a side rail doesn't
// work well on narrow screens / thumb reach).
export function QuickMenu() {
  const kakaoHref = COMPANY.kakaoUrl ?? undefined;

  return (
    <>
      {/* Desktop / tablet */}
      <nav
        aria-label="빠른 메뉴"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col overflow-hidden rounded-md border-2 border-red-600 bg-white/90 shadow-lg backdrop-blur md:flex"
      >
        <a
          href="#estimate"
          className="group flex flex-col items-center gap-1.5 border-b border-zinc-100 px-6 py-6 text-sm font-semibold text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <span aria-hidden className="text-2xl">✎</span>
          무료 견적
        </a>
        <a
          href={`tel:${COMPANY.phone}`}
          className="group flex flex-col items-center gap-1.5 border-b border-zinc-100 px-6 py-6 text-sm font-semibold text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <span aria-hidden className="text-2xl">☎</span>
          전화 상담
        </a>
        {kakaoHref ? (
          <a
            href={kakaoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-1.5 px-6 py-6 text-sm font-semibold text-zinc-600 transition-colors hover:bg-[#FEE500]/20 hover:text-zinc-900"
          >
            <span aria-hidden className="text-2xl">💬</span>
            카카오 상담
          </a>
        ) : (
          <span className="flex flex-col items-center gap-1.5 px-6 py-6 text-sm font-semibold text-zinc-300">
            <span aria-hidden className="text-2xl">💬</span>
            카카오 상담
          </span>
        )}
      </nav>

      {/* Mobile */}
      <nav
        aria-label="빠른 메뉴"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 divide-x divide-zinc-100 border-t border-zinc-200 bg-white/95 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] backdrop-blur md:hidden"
      >
        <a
          href="#estimate"
          className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-zinc-600 active:bg-red-50 active:text-red-600"
        >
          <span aria-hidden className="text-base">✎</span>
          무료 견적
        </a>
        <a
          href={`tel:${COMPANY.phone}`}
          className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-zinc-600 active:bg-red-50 active:text-red-600"
        >
          <span aria-hidden className="text-base">☎</span>
          전화 상담
        </a>
        {kakaoHref ? (
          <a
            href={kakaoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-zinc-600 active:bg-[#FEE500]/20"
          >
            <span aria-hidden className="text-base">💬</span>
            카카오 상담
          </a>
        ) : (
          <span className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold text-zinc-300">
            <span aria-hidden className="text-base">💬</span>
            카카오 상담
          </span>
        )}
      </nav>
    </>
  );
}
