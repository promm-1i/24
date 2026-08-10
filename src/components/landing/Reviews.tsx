import { prisma } from "@/lib/prisma";

export async function Reviews() {
  const board = await prisma.board.findUnique({ where: { code: "review" } });
  const reviews = board
    ? await prisma.post.findMany({
        where: { boardId: board.id, status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 6,
      })
    : [];

  return (
    <section id="reviews" className="bg-zinc-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
          고객 후기
        </h2>
        {reviews.length === 0 ? (
          <p className="mt-10 text-center text-sm text-zinc-400">
            등록된 후기가 아직 없습니다. 관리자 페이지에서 등록해주세요.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-xl bg-white p-6 shadow-sm">
                {r.rating && (
                  <p className="mb-2 text-amber-500">{"★".repeat(r.rating)}</p>
                )}
                <h3 className="font-bold text-zinc-900">{r.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{r.body}</p>
                <p className="mt-3 text-xs text-zinc-400">
                  {r.authorName ?? "익명"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
