const STEPS = [
  { step: "1", title: "무료 견적 요청", desc: "간단한 정보 입력만으로 견적 요청 완료" },
  { step: "2", title: "전문 상담", desc: "담당 상담원이 세부 일정과 비용을 안내" },
  { step: "3", title: "포장 및 이사", desc: "숙련된 인력이 안전하게 포장·운송 진행" },
  { step: "4", title: "정리 및 완료", desc: "이사 후 정리까지 책임지고 마무리" },
];

export function Process() {
  return (
    <section id="process" className="bg-zinc-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-zinc-900 sm:text-3xl">
          이사 진행 과정
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                {s.step}
              </div>
              <h3 className="mt-4 font-bold text-zinc-900">{s.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
