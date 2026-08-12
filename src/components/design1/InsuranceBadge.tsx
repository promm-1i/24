// KB손해보험 3억원 한도배상 보험가입 배지 — 히어로 우측 상단에 고정 노출.
export function InsuranceBadge() {
  return (
    <div className="flex aspect-square w-36 flex-col items-center justify-center gap-1.5 rounded-full bg-white/95 px-3 text-center shadow-lg backdrop-blur-sm sm:w-44">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/kb-insurance-logo.png"
        alt="KB손해보험"
        className="h-12 w-auto object-contain sm:h-14"
      />
      <span className="text-xs font-black leading-tight text-red-600 sm:text-sm">
        3억원 한도배상
      </span>
      <span className="text-[10px] font-semibold text-zinc-500 sm:text-xs">보험가입</span>
    </div>
  );
}
