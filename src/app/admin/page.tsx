import { prisma } from "@/lib/prisma";
import { EstimateStatusSelect } from "./EstimateStatusSelect";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  NEW: "신규",
  CONTACTED: "연락완료",
  CONFIRMED: "확정",
  CANCELLED: "취소",
};

export default async function AdminDashboardPage() {
  const estimates = await prisma.estimate.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="mb-6 text-lg font-bold text-zinc-900">
        견적 요청 ({estimates.length})
      </h1>
      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 text-zinc-500">
            <tr>
              <th className="px-4 py-3">요청일</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">연락처</th>
              <th className="px-4 py-3">출발지</th>
              <th className="px-4 py-3">도착지</th>
              <th className="px-4 py-3">이사예정일</th>
              <th className="px-4 py-3">메모</th>
              <th className="px-4 py-3">상태</th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((e) => (
              <tr key={e.id} className="border-b border-zinc-100 last:border-0">
                <td className="px-4 py-3 whitespace-nowrap text-zinc-500">
                  {e.createdAt.toLocaleString("ko-KR")}
                </td>
                <td className="px-4 py-3">{e.name}</td>
                <td className="px-4 py-3">{e.phone}</td>
                <td className="px-4 py-3">{e.fromAddr}</td>
                <td className="px-4 py-3">{e.toAddr}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {e.moveDate ? e.moveDate.toLocaleDateString("ko-KR") : "-"}
                </td>
                <td className="px-4 py-3 max-w-[200px] truncate">
                  {e.memo ?? "-"}
                </td>
                <td className="px-4 py-3">
                  <EstimateStatusSelect
                    estimateId={e.id}
                    status={e.status}
                    label={STATUS_LABEL}
                  />
                </td>
              </tr>
            ))}
            {estimates.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-zinc-400">
                  아직 견적 요청이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
