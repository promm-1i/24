// KB손해보험 3억원 한도배상 보험가입 배지 — 히어로 우측 상단에 고정 노출.
// 클라이언트가 완성된 원형 배지 이미지를 전달해서 그대로 사용 (텍스트/테두리 모두 이미지에 포함됨).
// 모바일에서는 데스크톱 대비 60% 크기로 축소.
export function InsuranceBadge() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/kb-insurance-logo.png"
      alt="KB손해보험 3억원 한도배상 보험가입"
      className="aspect-square w-[69px] object-contain drop-shadow-lg sm:w-[141px]"
    />
  );
}
