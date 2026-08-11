"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right";

const HIDDEN_TRANSFORM: Record<Direction, string> = {
  up: "translate-y-10",
  // Large viewport-relative offsets so left/right reveals genuinely start
  // from the screen edges instead of a small in-place nudge.
  left: "-translate-x-[60vw] sm:-translate-x-[45vw]",
  right: "translate-x-[60vw] sm:translate-x-[45vw]",
};

// Fades/slides children in when they scroll into view, and back out again
// when they leave — re-triggers every time, in either scroll direction.
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
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${HIDDEN_TRANSFORM[direction]}`
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
