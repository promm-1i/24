export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-4 py-10 text-sm text-zinc-500 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-bold text-zinc-700">[회사명]</p>
        <p className="mt-2">
          대표: [대표자명] · 사업자등록번호: [000-00-00000] · 주소: [주소를 입력하세요]
        </p>
        <p className="mt-1">고객센터: 1588-0000 (평일 09:00 ~ 18:00)</p>
        <p className="mt-4 text-xs text-zinc-400">
          © {new Date().getFullYear()} [회사명]. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
