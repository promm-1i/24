import Link from "next/link";
import { COMPANY } from "@/lib/content";

export const metadata = { title: `${COMPANY.name} - 시안 선택` };

const DESIGNS = [
  {
    href: "/design-1",
    label: "시안 1",
    desc: "화이트 + 레드 포인트, 깔끔한 형태",
  },
  {
    href: "/design-2",
    label: "시안 2",
    desc: "이미지를 크게 활용한 전문적인 느낌",
  },
  {
    href: "/design-3",
    label: "시안 3",
    desc: "여백을 넓게 사용한 세련되고 편안한 느낌",
  },
];

export default function DesignIndexPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-20">
      <h1 className="text-xl font-bold text-zinc-900">{COMPANY.name} 홈페이지 시안</h1>
      <p className="mt-2 text-sm text-zinc-500">
        검토하실 시안을 선택해주세요
      </p>
      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {DESIGNS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="rounded-xl border border-zinc-200 bg-white p-6 text-center transition hover:border-zinc-400 hover:shadow-sm"
          >
            <p className="font-bold text-zinc-900">{d.label}</p>
            <p className="mt-2 text-sm text-zinc-500">{d.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
