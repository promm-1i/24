"use client";

import { useEffect, useState } from "react";

export type ReviewCardData = {
  id: string;
  title: string;
  body: string;
  authorName: string | null;
  rating: number | null;
};

const PLACEHOLDER_TITLES = [
  "친절한 상담 감사했어요",
  "포장이 꼼꼼해서 좋았어요",
  "시간 약속을 잘 지켜요",
  "가격이 합리적이었어요",
  "다음에도 이용할게요",
  "가구 배치까지 도와주셨어요",
  "매니저님이 직접 오셔서 안심됐어요",
  "이사 후 정리까지 깔끔했어요",
  "원룸이사도 세심하게 해주셨어요",
  "사무실 이전도 문제없었어요",
];

const PLACEHOLDER_REVIEWS: ReviewCardData[] = PLACEHOLDER_TITLES.map((title, i) => ({
  id: `placeholder-${i}`,
  title,
  body: "고객 후기 작성 시 이 자리에 실제 후기 내용으로 변경됩니다.",
  authorName: "이사가요",
  rating: 5,
}));

const SLIDE_INTERVAL_MS = 4000;
const CARDS_PER_PAGE = 3;

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

export function ReviewsCarousel({ reviews }: { reviews: ReviewCardData[] }) {
  const items = reviews.length > 0 ? reviews : PLACEHOLDER_REVIEWS;
  const isPlaceholder = reviews.length === 0;
  const pages = chunk(items, CARDS_PER_PAGE);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (pages.length <= 1) return;
    const id = setInterval(() => {
      setPageIndex((i) => (i + 1) % pages.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [pages.length]);

  const currentPage = pages[pageIndex];

  return (
    <div className="mx-auto max-w-5xl">
      {isPlaceholder && (
        <p className="mb-4 text-center text-xs font-semibold text-amber-600">
          아직 등록된 후기가 없어 임시 문구로 표시 중입니다
        </p>
      )}
      <div
        key={pageIndex}
        className="grid animate-[fade-slide_0.5s_ease-out] grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {currentPage.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
          >
            {item.rating && (
              <p className="mb-2 text-amber-500">{"★".repeat(item.rating)}</p>
            )}
            <h3 className="font-bold text-zinc-900">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-600">{item.body}</p>
            <p className="mt-3 text-xs text-zinc-400">{item.authorName ?? "익명"}</p>
          </div>
        ))}
      </div>

      {pages.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {pages.map((page, i) => (
            <button
              key={page.map((p) => p.id).join("-")}
              type="button"
              aria-label={`${i + 1}번째 후기 그룹으로 이동`}
              onClick={() => setPageIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === pageIndex ? "w-6 bg-red-600" : "w-2 bg-zinc-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
