"use client";

import { useState } from "react";

export function HeroVideo({
  sources,
  children,
}: {
  sources: string[];
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);

  return (
    <section className="relative flex h-[520px] items-center justify-center overflow-hidden sm:h-[640px]">
      <video
        key={sources[index]}
        className="absolute inset-0 h-full w-full object-cover"
        src={sources[index]}
        autoPlay
        muted
        playsInline
        onEnded={() => setIndex((i) => (i + 1) % sources.length)}
      />
      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/60" />

      <div className="relative z-10 px-4 text-center text-white sm:px-6">{children}</div>

      {sources.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {sources.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`${i + 1}번째 영상으로 이동`}
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
