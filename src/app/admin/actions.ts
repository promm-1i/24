"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createAdminSession, destroyAdminSession } from "@/lib/auth";

export type ActionState = { error?: string } | null;

export async function loginAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 입력해주세요." };
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  await createAdminSession({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function updateEstimateStatusAction(
  estimateId: string,
  status: "NEW" | "CONTACTED" | "CONFIRMED" | "CANCELLED"
) {
  await prisma.estimate.update({
    where: { id: estimateId },
    data: { status },
  });
  revalidatePath("/admin");
}

export async function createReviewAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const authorName = String(formData.get("authorName") ?? "").trim() || null;
  const ratingRaw = formData.get("rating");
  const rating = ratingRaw ? Number(ratingRaw) : null;

  if (!title || !body) return;

  const board = await prisma.board.upsert({
    where: { code: "review" },
    update: {},
    create: { code: "review", name: "고객 후기" },
  });

  await prisma.post.create({
    data: {
      boardId: board.id,
      title,
      body,
      authorName,
      rating,
    },
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/design-1");
  revalidatePath("/design-2");
  revalidatePath("/design-3");
}

export async function deleteReviewAction(postId: string) {
  await prisma.post.delete({ where: { id: postId } });
  revalidatePath("/admin/reviews");
  revalidatePath("/design-1");
  revalidatePath("/design-2");
  revalidatePath("/design-3");
}

export async function createGalleryPhotoAction(formData: FormData) {
  const category = String(formData.get("category") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim() || null;

  if (!category || !imageUrl) return;
  if (!/^https?:\/\//.test(imageUrl)) return;

  await prisma.galleryPhoto.create({
    data: { category, imageUrl, caption },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/design-1");
}

export async function deleteGalleryPhotoAction(photoId: string) {
  await prisma.galleryPhoto.delete({ where: { id: photoId } });
  revalidatePath("/admin/gallery");
  revalidatePath("/design-1");
}
