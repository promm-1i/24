"use client";

import { useState } from "react";

type ServiceItem = {
  id: string;
  name: string;
  description: string | null;
  features: string[];
};

// TODO: swap for real client photos once received.
const SERVICE_IMAGES: Record<string, string> = {
  포장이사: "https://images.unsplash.com/photo-1772724317350-520faccb15e6?w=1000&q=80&auto=format&fit=crop",
  가정이사: "https://images.unsplash.com/photo-1758523671893-0ba21cf4260f?w=1000&q=80&auto=format&fit=crop",
  사무실이사: "https://images.unsplash.com/photo-1577702312572-5bb9328a9f15?w=1000&q=80&auto=format&fit=crop",
  보관이사: "https://images.unsplash.com/photo-1766040923580-16ad32fae8b4?w=1000&q=80&auto=format&fit=crop",
  관공서이사: "https://images.unsplash.com/photo-1785423832602-53aa5bfd6cd6?w=1000&q=80&auto=format&fit=crop",
  원룸이사: "https://images.unsplash.com/photo-1758523671165-967ec4af0d76?w=1000&q=80&auto=format&fit=crop",
};

const FALLBACK_IMAGE = SERVICE_IMAGES["포장이사"];

// Editorial split layout: one large image on the left, a plain vertical
// list of service names on the right (no cards, no borders around each
// item — separated only by thin divider lines). Hovering (desktop) or
// tapping (touch) a name swaps the image and expands that item's
// description/features inline; the rest stay as quiet single-line text.
export function ServiceShowcase({ services }: { services: ServiceItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md sm:aspect-[4/3] md:aspect-[3/4]">
        <img
          key={active?.id}
          src={SERVICE_IMAGES[active?.name] ?? FALLBACK_IMAGE}
          alt={active?.name}
          className="h-full w-full animate-[fade-slide_0.4s_ease-out] object-cover"
        />
        <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-5 text-lg font-bold text-white">
          {active?.name}
        </span>
      </div>

      <div className="divide-y divide-zinc-200">
        {services.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <div key={s.id}>
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                className={`flex w-full items-baseline gap-4 py-5 text-left transition-colors ${
                  isActive ? "text-red-600" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <span className="text-xs font-mono">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`text-xl transition-all sm:text-2xl ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {s.name}
                </span>
              </button>
              {isActive && (
                <div className="animate-[fade-slide_0.4s_ease-out] pb-6 pl-8">
                  <p className="text-sm leading-relaxed text-zinc-500">{s.description}</p>
                  {s.features.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1 text-xs text-zinc-400">
                      {s.features.slice(0, 3).map((f) => (
                        <li key={f}>— {f}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
