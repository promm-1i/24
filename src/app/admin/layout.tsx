import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { logoutAction } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // /admin/login renders without the shell (no session yet at that point).
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-zinc-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="font-bold text-zinc-900">관리자</span>
            <nav className="flex gap-4 text-sm text-zinc-600">
              <Link href="/admin" className="hover:text-zinc-900">
                견적 요청
              </Link>
              <Link href="/admin/reviews" className="hover:text-zinc-900">
                후기 관리
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <span>{session.name}님</span>
            <form action={logoutAction}>
              <button type="submit" className="text-zinc-900 underline">
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
