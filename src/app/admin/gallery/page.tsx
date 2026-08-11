import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/lib/content";
import { createGalleryPhotoAction, deleteGalleryPhotoAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-lg font-bold text-zinc-900">현장 사진 등록</h1>
        <p className="mb-4 text-xs text-zinc-500">
          지금은 이미지 URL을 붙여넣는 방식이에요. 파일을 직접 업로드하려면
          Supabase Storage 연동이 추가로 필요합니다 (요청하면 이어서 설정할게요).
        </p>
        <form action={createGalleryPhotoAction} className="flex flex-col gap-3">
          <select
            name="category"
            required
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
          >
            <option value="">이사 종류 선택</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            name="imageUrl"
            required
            placeholder="이미지 URL (https://...)"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
          <input
            name="caption"
            placeholder="캡션 (선택, 비우면 이사 종류명으로 표시)"
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
          등록된 사진 ({photos.length})
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-lg border border-zinc-200">
              <div className="relative aspect-square bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrl}
                  alt={p.caption ?? p.category}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="text-xs font-semibold text-zinc-700">{p.category}</p>
                <p className="truncate text-xs text-zinc-400">{p.caption ?? "-"}</p>
                <form
                  action={async () => {
                    "use server";
                    await deleteGalleryPhotoAction(p.id);
                  }}
                >
                  <button type="submit" className="mt-1 text-xs text-red-600 underline">
                    삭제
                  </button>
                </form>
              </div>
            </div>
          ))}
          {photos.length === 0 && (
            <p className="col-span-full py-8 text-center text-sm text-zinc-400">
              등록된 사진이 없습니다. 등록 전까지는 홈페이지에 기본 이미지가 표시됩니다.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
