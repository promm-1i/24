"use client";

import { useState } from "react";

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
};

function GalleryCard({
  item,
  onHoverStart,
  onHoverEnd,
}: {
  item: GalleryItem;
  onHoverStart: (item: GalleryItem) => void;
  onHoverEnd: () => void;
}) {
  return (
    <div
      className="group relative h-56 w-72 shrink-0 overflow-hidden rounded-lg"
      onMouseEnter={() => onHoverStart(item)}
      onMouseLeave={onHoverEnd}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.caption}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 text-xs font-bold text-white">
        {item.caption}
      </span>
    </div>
  );
}

// Continuous right-to-left photo ticker, same seamless-loop technique as
// ReviewsMarquee: track rendered twice, animated by exactly -50%.
// Hovering a photo dims/blurs the whole page behind it and shows an
// enlarged preview centered on screen (lightbox-style), independent of
// the card's position inside the moving track.
export function GalleryMarquee({ items }: { items: GalleryItem[] }) {
  const track = [...items, ...items];
  const [hovered, setHovered] = useState<GalleryItem | null>(null);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="flex w-max gap-4 animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
          {track.map((item, i) => (
            <GalleryCard
              key={`${item.id}-${i}`}
              item={item}
              onHoverStart={(it) => {
                setHovered(it);
                setVisible(true);
              }}
              onHoverEnd={() => setVisible(false)}
            />
          ))}
        </div>
      </div>

      <div
        aria-hidden={!visible}
        className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        {hovered && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hovered.src}
            alt={hovered.caption}
            className={`relative max-h-[75vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl transition-transform duration-300 ${
              visible ? "scale-100" : "scale-90"
            }`}
          />
        )}
      </div>
    </>
  );
}
