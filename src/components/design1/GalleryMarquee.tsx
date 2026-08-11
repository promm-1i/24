export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
};

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="group relative h-56 w-72 shrink-0 overflow-hidden rounded-lg sm:h-64 sm:w-80">
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
export function GalleryMarquee({ items }: { items: GalleryItem[] }) {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="flex w-max gap-4 animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <GalleryCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
