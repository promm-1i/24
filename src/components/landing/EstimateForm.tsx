"use client";

import { useState, type FormEvent } from "react";
import { KOREA_REGIONS, SIDO_LIST } from "@/lib/koreaRegions";

const TERMS_TEXT = `제1조 (목적)
본 약관은 이사가요(이하 "회사")가 제공하는 이사 견적 상담 신청 서비스(이하 "서비스") 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 정함을 목적으로 합니다.

제2조 (서비스의 내용)
회사는 이용자가 입력한 정보를 바탕으로 이사 견적 상담을 위해 이용자에게 유선 또는 문자로 연락합니다.

제3조 (이용자의 의무)
이용자는 신청 시 정확한 정보를 입력해야 하며, 허위 정보 입력으로 발생하는 불이익에 대해 회사는 책임지지 않습니다.

제4조 (서비스의 변경 및 중단)
회사는 서비스 품질 향상을 위해 사전 고지 후 서비스 내용을 변경하거나 일시 중단할 수 있습니다.`;

const PRIVACY_TEXT = `이사가요는 견적 상담을 위해 아래와 같이 개인정보를 수집·이용합니다.

1. 수집 항목: 이름, 연락처, 출발지/도착지 주소, 이사 예정일, 요청 사항
2. 수집 목적: 이사 견적 상담 및 안내, 상담 이력 관리
3. 보유 및 이용 기간: 상담 완료일로부터 6개월 (관계 법령에 따른 보관 의무가 있는 경우 해당 기간까지)
4. 동의 거부 권리: 이용자는 개인정보 수집·이용에 동의하지 않을 권리가 있으며, 동의하지 않을 경우 견적 상담 서비스 이용이 제한될 수 있습니다.`;

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

export function EstimateForm({
  accent = "blue",
  bare = false,
  onSuccess,
}: {
  accent?: AccentKey;
  bare?: boolean;
  onSuccess?: () => void;
}) {
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
      onSuccess?.();
    } catch {
      setState({ status: "error", message: "네트워크 오류가 발생했습니다." });
    }
  }

  if (state.status === "success") {
    return (
      <div className={bare ? "p-8 text-center" : "rounded-xl bg-white p-8 text-center shadow-sm"}>
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
      className={
        bare
          ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
          : "grid grid-cols-1 gap-3 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
      }
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

      <div className="flex flex-col gap-2 rounded-md bg-zinc-50 p-3 text-xs text-zinc-600 sm:col-span-2">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="agreeTerms"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-current"
          />
          <span>
            <span className="font-semibold text-zinc-800">이용약관 동의 (필수)</span>
          </span>
        </label>
        <details className="ml-6 -mt-1 text-zinc-500">
          <summary className="cursor-pointer select-none text-[11px] underline">
            전문 보기
          </summary>
          <p className="mt-1 max-h-32 overflow-y-auto whitespace-pre-line rounded border border-zinc-200 bg-white p-2 text-[11px] leading-relaxed">
            {TERMS_TEXT}
          </p>
        </details>

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            name="agreePrivacy"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-current"
          />
          <span>
            <span className="font-semibold text-zinc-800">개인정보 수집·이용 동의 (필수)</span>
          </span>
        </label>
        <details className="ml-6 -mt-1 text-zinc-500">
          <summary className="cursor-pointer select-none text-[11px] underline">
            전문 보기
          </summary>
          <p className="mt-1 max-h-32 overflow-y-auto whitespace-pre-line rounded border border-zinc-200 bg-white p-2 text-[11px] leading-relaxed">
            {PRIVACY_TEXT}
          </p>
        </details>
      </div>

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
