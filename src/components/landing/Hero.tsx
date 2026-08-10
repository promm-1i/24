export function Hero() {
  return (
    <section
      id="top"
      className="bg-gradient-to-b from-blue-600 to-blue-500 px-4 py-20 text-center text-white sm:px-6 sm:py-28"
    >
      <p className="text-sm font-semibold text-blue-100">
        투명한 견적 · 안전한 포장이사
      </p>
      <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
        믿을 수 있는 이사,
        <br />
        [회사명]과 함께하세요
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-blue-100">
        가정이사부터 원룸이사, 보관이사까지 — 최대 3분이면 무료 견적을 받아보실 수 있습니다.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#estimate"
          className="rounded-full bg-white px-8 py-3 text-sm font-bold text-blue-600 shadow-sm hover:bg-blue-50"
        >
          무료 견적 요청하기
        </a>
        <a
          href="tel:1588-0000"
          className="rounded-full border border-white/60 px-8 py-3 text-sm font-bold text-white hover:bg-white/10"
        >
          전화 상담 1588-0000
        </a>
      </div>
    </section>
  );
}
