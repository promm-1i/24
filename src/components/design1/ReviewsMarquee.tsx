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

function ReviewCard({ item }: { item: ReviewCardData }) {
  return (
    <div className="w-72 shrink-0 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      {item.rating && <p className="mb-2 text-amber-500">{"★".repeat(item.rating)}</p>}
      <h3 className="font-bold text-zinc-900">{item.title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{item.body}</p>
      <p className="mt-3 text-xs text-zinc-400">{item.authorName ?? "익명"}</p>
    </div>
  );
}

// Server component: pure CSS marquee (translateX loop), no client JS needed.
// The track is rendered twice back-to-back and animated by exactly -50%,
// so the moment the first copy scrolls fully offscreen the second copy is
// in the exact same position — the loop point is invisible.
export function ReviewsMarquee({ reviews }: { reviews: ReviewCardData[] }) {
  const items = reviews.length > 0 ? reviews : PLACEHOLDER_REVIEWS;
  const isPlaceholder = reviews.length === 0;
  const track = [...items, ...items];

  return (
    <div>
      {isPlaceholder && (
        <p className="mb-4 text-center text-xs font-semibold text-amber-600">
          아직 등록된 후기가 없어 임시 문구로 표시 중입니다
        </p>
      )}
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div
          className="flex w-max gap-4 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]"
        >
          {track.map((item, i) => (
            <ReviewCard key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
