const NAV_ITEMS = [
  { href: "#services", label: "서비스 안내" },
  { href: "#process", label: "이사 과정" },
  { href: "#gallery", label: "현장 사진" },
  { href: "#reviews", label: "고객 후기" },
];

const COMPANY_PHONE = "1588-0000"; // TODO: 실제 클라이언트 연락처로 교체

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="text-lg font-extrabold tracking-tight text-zinc-900">
          [회사명]<span className="text-blue-600">이사</span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium text-zinc-600 md:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-zinc-900">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${COMPANY_PHONE}`}
            className="hidden rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 sm:block"
          >
            {COMPANY_PHONE}
          </a>
          <a
            href="#estimate"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            무료 견적
          </a>
        </div>
      </div>
    </header>
  );
}
