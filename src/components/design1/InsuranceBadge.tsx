// KB손해보험 3억원 한도배상 보험가입 배지 — 히어로 우측 상단에 고정 노출.
// 원형 대신 상장/트로피 느낌의 "인증 씰(seal)" 모양 — 톱니 테두리 + 리본.
const SEAL_CLIP =
  "polygon(50.0% 0.0%, 56.6% 8.5%, 65.5% 2.4%, 69.1% 12.6%, 79.4% 9.5%, 79.7% 20.3%, 90.5% 20.6%, 87.4% 30.9%, 97.6% 34.5%, 91.5% 43.4%, 100.0% 50.0%, 91.5% 56.6%, 97.6% 65.5%, 87.4% 69.1%, 90.5% 79.4%, 79.7% 79.7%, 79.4% 90.5%, 69.1% 87.4%, 65.5% 97.6%, 56.6% 91.5%, 50.0% 100.0%, 43.4% 91.5%, 34.5% 97.6%, 30.9% 87.4%, 20.6% 90.5%, 20.3% 79.7%, 9.5% 79.4%, 12.6% 69.1%, 2.4% 65.5%, 8.5% 56.6%, 0.0% 50.0%, 8.5% 43.4%, 2.4% 34.5%, 12.6% 30.9%, 9.5% 20.6%, 20.3% 20.3%, 20.6% 9.5%, 30.9% 12.6%, 34.5% 2.4%, 43.4% 8.5%)";
const RIBBON_CLIP = "polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)";

export function InsuranceBadge() {
  return (
    <div className="relative aspect-square w-36 origin-top-right scale-[0.8] sm:w-44">
      {/* 리본 꼬리 — 씰 뒤쪽 아래로 살짝 나오게 */}
      <div
        className="absolute bottom-[6%] left-1/2 h-[26%] w-[16%] -translate-x-[125%] translate-y-[55%] rotate-[10deg] bg-red-600/90 shadow"
        style={{ clipPath: RIBBON_CLIP }}
      />
      <div
        className="absolute bottom-[6%] left-1/2 h-[26%] w-[16%] translate-x-[25%] translate-y-[55%] -rotate-[10deg] bg-red-600/90 shadow"
        style={{ clipPath: RIBBON_CLIP }}
      />

      {/* 금색 테두리(rim) */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-lg"
        style={{ clipPath: SEAL_CLIP }}
      />
      {/* 흰색 안쪽 면 — 내용 표시 */}
      <div
        className="absolute inset-[5%] flex flex-col items-center justify-center gap-1 bg-white/85 px-2 text-center"
        style={{ clipPath: SEAL_CLIP }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/kb-insurance-logo.png"
          alt="KB손해보험"
          className="h-9 w-auto object-contain sm:h-11"
        />
        <span className="text-[11px] font-black leading-tight text-red-600 sm:text-xs">
          3억원 한도배상
        </span>
        <span className="text-[9px] font-semibold text-zinc-500 sm:text-[10px]">보험가입</span>
      </div>
    </div>
  );
}
