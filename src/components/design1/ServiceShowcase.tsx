"use client";

import { useState } from "react";

type ServiceItem = {
  id: string;
  name: string;
  description: string | null;
  features: string[];
};

const SERVICE_IMAGES: Record<string, string> = {
  포장이사: "/images/services/moving-packing.jpg",
  사무실이사: "/images/services/moving-office.jpg",
  보관이사: "/images/services/moving-storage.jpg",
  관공서이사: "/images/services/moving-government.jpg",
  "원/투룸이사": "/images/services/moving-studio.jpg",
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
                <span className="text-sm font-mono">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={`text-2xl transition-all sm:text-3xl ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
                >
                  {s.name}
                </span>
              </button>
              {isActive && (
                <div className="animate-[fade-slide_0.4s_ease-out] pb-6 pl-8">
                  <p className="text-lg leading-relaxed text-zinc-500">{s.description}</p>
                  {s.features.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-1 text-sm text-zinc-400">
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
