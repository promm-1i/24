"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { EstimateForm } from "./EstimateForm";

type ModalContextValue = { open: () => void };
const ModalContext = createContext<ModalContextValue | null>(null);

export function useEstimateModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useEstimateModal must be used within EstimateModalProvider");
  return ctx;
}

export function EstimateModalTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open } = useEstimateModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

export function EstimateModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white px-5 py-4">
              <p className="text-lg font-bold text-zinc-900">무료 견적 신청</p>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-xl text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              <EstimateForm accent="red" bare onSuccess={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
