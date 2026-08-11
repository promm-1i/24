"use client";

import { useEffect, useRef, useState } from "react";

type Slot = { src: string; active: boolean };

// Double-buffered video player: two <video> elements share the slot,
// the hidden one preloads the next clip while the visible one plays,
// so switching clips doesn't show a loading/grey frame (after the very
// first clip, which still has to load once on page open).
export function HeroVideo({
  sources,
  children,
}: {
  sources: string[];
  children: React.ReactNode;
}) {
  const [slots, setSlots] = useState<Slot[]>(() => [
    { src: sources[0], active: true },
    { src: sources[1 % sources.length] ?? sources[0], active: false },
  ]);
  const nextIndexRef = useRef(2 % sources.length);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null]);

  useEffect(() => {
    slots.forEach((slot, i) => {
      const el = videoRefs.current[i];
      if (!el) return;
      if (slot.active) {
        el.currentTime = 0;
        const playResult = el.play();
        if (playResult) playResult.catch(() => {});
      } else {
        el.pause();
        el.load();
      }
    });
  }, [slots]);

  function handleEnded(slotIdx: number) {
    if (sources.length <= 1) {
      videoRefs.current[slotIdx]?.play().catch(() => {});
      return;
    }
    const otherIdx = slotIdx === 0 ? 1 : 0;
    setSlots((prev) => {
      const updated: Slot[] = [...prev];
      updated[otherIdx] = { ...updated[otherIdx], active: true };
      updated[slotIdx] = { src: sources[nextIndexRef.current], active: false };
      nextIndexRef.current = (nextIndexRef.current + 1) % sources.length;
      return updated;
    });
  }

  function goTo(targetIndex: number) {
    const frontIdx = slots.findIndex((s) => s.active);
    const backIdx = frontIdx === 0 ? 1 : 0;
    setSlots((prev) => {
      const updated: Slot[] = [...prev];
      updated[frontIdx] = { src: sources[targetIndex], active: true };
      updated[backIdx] = { ...updated[backIdx], active: false };
      return updated;
    });
    nextIndexRef.current = (targetIndex + 1) % sources.length;
  }

  const activeIndex = sources.indexOf(slots.find((s) => s.active)?.src ?? sources[0]);

  return (
    <section className="relative flex h-[520px] items-center justify-center overflow-hidden sm:h-[640px]">
      {slots.map((slot, i) => (
        <video
          key={i}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            slot.active ? "opacity-100" : "opacity-0"
          }`}
          src={slot.src}
          muted
          playsInline
          preload="auto"
          onEnded={() => handleEnded(i)}
        />
      ))}

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
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
