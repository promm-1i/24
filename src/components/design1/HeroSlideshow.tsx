"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_INTERVAL_MS = 5000;

export function HeroSlideshow({
  images,
  children,
}: {
  images: { src: string; alt: string }[];
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="relative flex h-[520px] items-center justify-center overflow-hidden sm:h-[640px]">
      {images.map((img, i) => (
        <div
          key={img.src}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="animate-[kenburns_10s_ease-in-out_infinite_alternate] object-cover"
          />
        </div>
      ))}
      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/60" />

      <div className="relative z-10 px-4 text-center text-white sm:px-6">{children}</div>

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`${i + 1}번째 이미지로 이동`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
