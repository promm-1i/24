"use client";

import { useTransition } from "react";
import { updateEstimateStatusAction } from "./actions";

type Status = "NEW" | "CONTACTED" | "CONFIRMED" | "CANCELLED";

export function EstimateStatusSelect({
  estimateId,
  status,
  label,
}: {
  estimateId: string;
  status: string;
  label: Record<string, string>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as Status;
        startTransition(() => {
          updateEstimateStatusAction(estimateId, next);
        });
      }}
      className="rounded border border-zinc-300 px-2 py-1 text-sm disabled:opacity-50"
    >
      {Object.entries(label).map(([value, text]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
}
