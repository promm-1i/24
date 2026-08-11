"use client";

import { useState, type FormEvent } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const ACCENT_STYLES = {
  blue: {
    focus: "focus:border-blue-500",
    button: "bg-blue-600 hover:bg-blue-700",
    link: "text-blue-600",
  },
  red: {
    focus: "focus:border-red-500",
    button: "bg-red-600 hover:bg-red-700",
    link: "text-red-600",
  },
  slate: {
    focus: "focus:border-slate-500",
    button: "bg-slate-800 hover:bg-slate-900",
    link: "text-slate-700",
  },
  stone: {
    focus: "focus:border-stone-500",
    button: "bg-stone-800 hover:bg-stone-900",
    link: "text-stone-700",
  },
} as const;

export function EstimateForm({
  accent = "blue",
}: {
  accent?: keyof typeof ACCENT_STYLES;
}) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const styles = ACCENT_STYLES[accent];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setState({ status: "submitting" });

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          fromAddr: data.get("fromAddr"),
          toAddr: data.get("toAddr"),
          moveDate: data.get("moveDate"),
          memo: data.get("memo"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setState({
          status: "error",
          message: body?.error ?? "요청 처리 중 오류가 발생했습니다.",
        });
        return;
      }

      form.reset();
      setState({ status: "success" });
    } catch {
      setState({ status: "error", message: "네트워크 오류가 발생했습니다." });
    }
  }

  if (state.status === "success") {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-bold text-zinc-900">
          견적 요청이 접수되었습니다.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          빠른 시간 내에 담당자가 연락드리겠습니다.
        </p>
        <button
          type="button"
          onClick={() => setState({ status: "idle" })}
          className={`mt-4 text-sm font-semibold underline ${styles.link}`}
        >
          견적 다시 요청하기
        </button>
      </div>
    );
  }

  const submitting = state.status === "submitting";
  const inputClass = `rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none ${styles.focus}`;

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-3 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      <input name="name" required placeholder="이름" className={inputClass} />
      <input
        name="phone"
        required
        placeholder="연락처 (010-0000-0000)"
        className={inputClass}
      />
      <input
        name="fromAddr"
        required
        placeholder="출발지 주소"
        className={`${inputClass} sm:col-span-2`}
      />
      <input
        name="toAddr"
        required
        placeholder="도착지 주소"
        className={`${inputClass} sm:col-span-2`}
      />
      <input name="moveDate" type="date" className={inputClass} />
      <input
        name="memo"
        placeholder="요청 사항 (선택)"
        className={inputClass}
      />

      {state.status === "error" && (
        <p className="text-sm text-red-600 sm:col-span-2">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`mt-2 rounded-md px-4 py-3 text-sm font-bold text-white disabled:opacity-50 sm:col-span-2 ${styles.button}`}
      >
        {submitting ? "전송 중..." : "무료 견적 요청하기"}
      </button>
    </form>
  );
}
