"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "견적 요청" },
  { href: "/admin/reviews", label: "후기 관리" },
  { href: "/admin/gallery", label: "현장사진 관리" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 text-sm">
      {TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              isActive
                ? "font-bold text-zinc-900"
                : "text-zinc-500 hover:text-zinc-900"
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
