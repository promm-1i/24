"use client";

import { useState, type FormEvent } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function EstimateForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

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
          className="mt-4 text-sm font-semibold text-blue-600 underline"
        >
          견적 다시 요청하기
        </button>
      </div>
    );
  }

  const submitting = state.status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-3 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      <input
        name="name"
        required
        placeholder="이름"
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />
      <input
        name="phone"
        required
        placeholder="연락처 (010-0000-0000)"
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />
      <input
        name="fromAddr"
        required
        placeholder="출발지 주소"
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 sm:col-span-2"
      />
      <input
        name="toAddr"
        required
        placeholder="도착지 주소"
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500 sm:col-span-2"
      />
      <input
        name="moveDate"
        type="date"
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />
      <input
        name="memo"
        placeholder="요청 사항 (선택)"
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />

      {state.status === "error" && (
        <p className="text-sm text-red-600 sm:col-span-2">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-md bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50 sm:col-span-2"
      >
        {submitting ? "전송 중..." : "무료 견적 요청하기"}
      </button>
    </form>
  );
}
