// KB손해보험 3억원 한도배상 보험가입 배지 — 히어로 우측 상단에 고정 노출.
// 실제 KB 로고를 쓰는 대신(상표), 원형 골드 링 + 텍스트로 같은 정보를 강조.
export function InsuranceBadge() {
  return (
    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-amber-400 bg-black/40 text-center shadow-lg backdrop-blur-sm sm:h-28 sm:w-28">
      <span className="text-[10px] font-bold text-amber-300 sm:text-xs">KB손해보험</span>
      <span className="mt-0.5 text-xs font-black leading-tight text-white sm:text-sm">
        3억원
        <br />
        한도배상
      </span>
      <span className="mt-0.5 text-[9px] font-semibold text-amber-300 sm:text-[10px]">
        보험가입
      </span>
    </div>
  );
}
