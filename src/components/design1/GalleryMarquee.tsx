"use client";

import { useState } from "react";

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
};

function GalleryCard({ item, onOpen }: { item: GalleryItem; onOpen: (item: GalleryItem) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="relative h-[336px] w-[430px] shrink-0 overflow-hidden rounded-lg text-left sm:h-[384px] sm:w-[480px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.src} alt={item.caption} className="h-full w-full object-cover" />
      <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 text-sm font-bold text-white">
        {item.caption}
      </span>
    </button>
  );
}

// Continuous right-to-left photo ticker, same seamless-loop technique as
// ReviewsMarquee: track rendered twice, animated by exactly -50%.
// Clicking a photo opens it large in a modal (backdrop or ✕ closes it) —
// no hover-zoom, since scaling photos continuously while the track is
// animating was janky/laggy.
export function GalleryMarquee({ items }: { items: GalleryItem[] }) {
  const track = [...items, ...items];
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max gap-4 animate-[marquee_89s_linear_infinite] hover:[animation-play-state:paused]">
          {track.map((item, i) => (
            <GalleryCard key={`${item.id}-${i}`} item={item} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setSelected(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selected.src}
            alt={selected.caption}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
