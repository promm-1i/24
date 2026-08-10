import { prisma } from "@/lib/prisma";
import { createReviewAction, deleteReviewAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const board = await prisma.board.findUnique({ where: { code: "review" } });
  const reviews = board
    ? await prisma.post.findMany({
        where: { boardId: board.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-lg font-bold text-zinc-900">후기 등록</h1>
        <form action={createReviewAction} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              name="authorName"
              placeholder="작성자명 (예: 김**님)"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
            <input
              name="rating"
              type="number"
              min={1}
              max={5}
              placeholder="평점 (1-5)"
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
          <input
            name="title"
            required
            placeholder="후기 제목"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
          <textarea
            name="body"
            required
            rows={3}
            placeholder="후기 내용"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="self-start rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
          >
            등록
          </button>
        </form>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-zinc-900">
          등록된 후기 ({reviews.length})
        </h2>
        <ul className="flex flex-col divide-y divide-zinc-100">
          {reviews.map((r) => (
            <li key={r.id} className="flex items-start justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  {r.title}{" "}
                  {r.rating && (
                    <span className="ml-1 text-amber-500">
                      {"★".repeat(r.rating)}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-zinc-600">{r.body}</p>
                <p className="mt-1 text-xs text-zinc-400">
                  {r.authorName ?? "익명"} · {r.createdAt.toLocaleDateString("ko-KR")}
                </p>
              </div>
              <form
                action={async () => {
                  "use server";
                  await deleteReviewAction(r.id);
                }}
              >
                <button type="submit" className="text-xs text-red-600 underline">
                  삭제
                </button>
              </form>
            </li>
          ))}
          {reviews.length === 0 && (
            <li className="py-8 text-center text-sm text-zinc-400">
              등록된 후기가 없습니다.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
