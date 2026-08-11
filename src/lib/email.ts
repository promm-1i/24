import "server-only";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendEstimateNotification(estimate: {
  name: string;
  phone: string;
  fromAddr: string;
  toAddr: string;
  moveDate: Date | null;
  memo: string | null;
}) {
  const to = process.env.ESTIMATE_NOTIFY_EMAIL;
  if (!resend || !to) return;

  try {
    await resend.emails.send({
      from: process.env.ESTIMATE_FROM_EMAIL || "onboarding@resend.dev",
      to,
      subject: `[이사가요] 새 견적 요청 — ${estimate.name}님`,
      html: `
        <h2>새 견적 요청이 접수됐습니다</h2>
        <table cellpadding="6">
          <tr><td><strong>이름</strong></td><td>${estimate.name}</td></tr>
          <tr><td><strong>연락처</strong></td><td>${estimate.phone}</td></tr>
          <tr><td><strong>출발지</strong></td><td>${estimate.fromAddr}</td></tr>
          <tr><td><strong>도착지</strong></td><td>${estimate.toAddr}</td></tr>
          <tr><td><strong>희망일</strong></td><td>${estimate.moveDate ? estimate.moveDate.toLocaleDateString("ko-KR") : "-"}</td></tr>
          <tr><td><strong>요청사항</strong></td><td>${estimate.memo ?? "-"}</td></tr>
        </table>
        <p>관리자 페이지 견적 목록에서도 확인 가능합니다.</p>
      `,
    });
  } catch (err) {
    // Best-effort: a failed notification email should never block the
    // estimate from being saved — it's already in the DB/admin dashboard.
    console.error("Failed to send estimate notification email:", err);
  }
}
