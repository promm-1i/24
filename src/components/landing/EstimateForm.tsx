"use client";

import { useState, type FormEvent } from "react";
import { KOREA_REGIONS, SIDO_LIST } from "@/lib/koreaRegions";

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

type AccentKey = keyof typeof ACCENT_STYLES;

function AddressFields({
  label,
  sido,
  gugun,
  onSidoChange,
  onGugunChange,
  detailName,
  inputClass,
  selectClass,
}: {
  label: string;
  sido: string;
  gugun: string;
  onSidoChange: (v: string) => void;
  onGugunChange: (v: string) => void;
  detailName: string;
  inputClass: string;
  selectClass: string;
}) {
  const gugunOptions = sido ? KOREA_REGIONS[sido] : [];

  return (
    <div className="sm:col-span-2">
      <p className="mb-1 text-xs font-semibold text-zinc-500">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        <select
          required
          value={sido}
          onChange={(e) => onSidoChange(e.target.value)}
          className={selectClass}
        >
          <option value="">시/도 선택</option>
          {SIDO_LIST.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          required
          value={gugun}
          onChange={(e) => onGugunChange(e.target.value)}
          disabled={!sido}
          className={`${selectClass} disabled:bg-zinc-50 disabled:text-zinc-400`}
        >
          <option value="">시/군/구 선택</option>
          {gugunOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      <input
        name={detailName}
        placeholder="상세주소 (동/건물명, 선택)"
        className={`mt-2 w-full ${inputClass}`}
      />
    </div>
  );
}

export function EstimateForm({ accent = "blue" }: { accent?: AccentKey }) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [fromSido, setFromSido] = useState("");
  const [fromGugun, setFromGugun] = useState("");
  const [toSido, setToSido] = useState("");
  const [toGugun, setToGugun] = useState("");
  const styles = ACCENT_STYLES[accent];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fromDetail = String(data.get("fromDetail") ?? "").trim();
    const toDetail = String(data.get("toDetail") ?? "").trim();
    const fromAddr = [fromSido, fromGugun, fromDetail].filter(Boolean).join(" ");
    const toAddr = [toSido, toGugun, toDetail].filter(Boolean).join(" ");

    setState({ status: "submitting" });

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          fromAddr,
          toAddr,
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
      setFromSido("");
      setFromGugun("");
      setToSido("");
      setToGugun("");
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
  const selectClass = `rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ${styles.focus}`;

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

      <AddressFields
        label="출발지"
        sido={fromSido}
        gugun={fromGugun}
        onSidoChange={(v) => {
          setFromSido(v);
          setFromGugun("");
        }}
        onGugunChange={setFromGugun}
        detailName="fromDetail"
        inputClass={inputClass}
        selectClass={selectClass}
      />
      <AddressFields
        label="도착지"
        sido={toSido}
        gugun={toGugun}
        onSidoChange={(v) => {
          setToSido(v);
          setToGugun("");
        }}
        onGugunChange={setToGugun}
        detailName="toDetail"
        inputClass={inputClass}
        selectClass={selectClass}
      />

      <input name="moveDate" type="date" className={`${inputClass} sm:col-span-2`} />
      <input
        name="memo"
        placeholder="요청 사항 (선택, 한 줄로 입력)"
        className={`${inputClass} sm:col-span-2`}
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
