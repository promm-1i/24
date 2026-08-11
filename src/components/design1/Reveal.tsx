"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right";

// 2x the original small nudge (was translate-x-16 / 4rem).
const HIDDEN_TRANSFORM: Record<Direction, string> = {
  up: "translate-y-10",
  left: "-translate-x-32",
  right: "translate-x-32",
};

// Fades/slides children in when they scroll into view, and back out again
// when they leave — re-triggers every time, in either scroll direction.
//
// The IntersectionObserver watches an untransformed wrapper (`ref`) so the
// slide-in transform — applied only to the inner div — never shifts the
// observed element itself out of the viewport. (Putting the transform on
// the observed element was the earlier bug: a large translateX pushed the
// hidden state fully outside the viewport's horizontal bounds, so it never
// reported as intersecting and the reveal never fired.)
export function Reveal({
  children,
  direction = "up",
  delayMs = 0,
  className,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div
        style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
        className={`transition-all duration-700 ease-out ${
          visible
            ? "translate-x-0 translate-y-0 opacity-100"
            : `opacity-0 ${HIDDEN_TRANSFORM[direction]}`
        }`}
      >
        {children}
      </div>
    </div>
  );
}
