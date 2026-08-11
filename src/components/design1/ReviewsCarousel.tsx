"use client";

import { useEffect, useState } from "react";

export type ReviewCardData = {
  id: string;
  title: string;
  body: string;
  authorName: string | null;
  rating: number | null;
};

const PLACEHOLDER_REVIEWS: ReviewCardData[] = [
  {
    id: "placeholder-1",
    title: "고객 후기 준비중",
    body: "고객 후기 작성 시 이 자리에 실제 후기 내용으로 변경됩니다.",
    authorName: "이사가요",
    rating: 5,
  },
  {
    id: "placeholder-2",
    title: "고객 후기 준비중",
    body: "고객 후기 작성 시 이 자리에 실제 후기 내용으로 변경됩니다.",
    authorName: "이사가요",
    rating: 5,
  },
  {
    id: "placeholder-3",
    title: "고객 후기 준비중",
    body: "고객 후기 작성 시 이 자리에 실제 후기 내용으로 변경됩니다.",
    authorName: "이사가요",
    rating: 5,
  },
];

const SLIDE_INTERVAL_MS = 4000;

export function ReviewsCarousel({ reviews }: { reviews: ReviewCardData[] }) {
  const items = reviews.length > 0 ? reviews : PLACEHOLDER_REVIEWS;
  const isPlaceholder = reviews.length === 0;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [items.length]);

  const current = items[index];

  return (
    <div className="mx-auto max-w-xl">
      {isPlaceholder && (
        <p className="mb-4 text-center text-xs font-semibold text-amber-600">
          아직 등록된 후기가 없어 임시 문구로 표시 중입니다
        </p>
      )}
      <div
        key={current.id}
        className="animate-[fade-slide_0.5s_ease-out] rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm"
      >
        {current.rating && (
          <p className="mb-2 text-amber-500">{"★".repeat(current.rating)}</p>
        )}
        <h3 className="font-bold text-zinc-900">{current.title}</h3>
        <p className="mt-2 text-sm text-zinc-600">{current.body}</p>
        <p className="mt-3 text-xs text-zinc-400">{current.authorName ?? "익명"}</p>
      </div>

      {items.length > 1 && (
        <div className="mt-5 flex justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`${i + 1}번째 후기로 이동`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-red-600" : "w-2 bg-zinc-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
