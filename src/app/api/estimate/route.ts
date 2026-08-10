import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const fromAddr = String(body.fromAddr ?? "").trim();
  const toAddr = String(body.toAddr ?? "").trim();
  const moveDateRaw = String(body.moveDate ?? "").trim();
  const memo = body.memo ? String(body.memo).trim() : null;

  if (!name || !phone || !fromAddr || !toAddr) {
    return NextResponse.json(
      { error: "이름, 연락처, 출발지, 도착지는 필수입니다." },
      { status: 400 }
    );
  }

  const phonePattern = /^[0-9-]{9,13}$/;
  if (!phonePattern.test(phone)) {
    return NextResponse.json(
      { error: "연락처 형식을 확인해주세요." },
      { status: 400 }
    );
  }

  const moveDate = moveDateRaw ? new Date(moveDateRaw) : null;
  if (moveDate && Number.isNaN(moveDate.getTime())) {
    return NextResponse.json(
      { error: "이사 예정일 형식을 확인해주세요." },
      { status: 400 }
    );
  }

  const estimate = await prisma.estimate.create({
    data: { name, phone, fromAddr, toAddr, moveDate, memo },
  });

  return NextResponse.json({ id: estimate.id }, { status: 201 });
}
