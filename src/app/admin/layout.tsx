import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { logoutAction } from "./actions";
import { AdminNav } from "./AdminNav";

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
            <AdminNav />
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600">
            <Link
              href="/design-1"
              target="_blank"
              className="rounded-md border border-zinc-300 px-3 py-1.5 hover:border-zinc-500 hover:text-zinc-900"
            >
              메인 화면 보기 ↗
            </Link>
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
