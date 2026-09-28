"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function requireAdmin() {
  const session = await auth();
  if ((session?.user as { role?: string } | undefined)?.role !== "ADMIN") {
    throw new Error("Unauthorized — admin access only.");
  }
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  const mrp = Number(formData.get("mrp"));
  const stockQty = Number(formData.get("stockQty") ?? 0);
  const tag = String(formData.get("tag") ?? "").trim() || null;
  const shortDescription = String(formData.get("shortDescription") ?? "").trim() || null;

  // Handle file upload
  const imageFile = formData.get("imageFile") as File | null;
  const imageUrlFromForm = String(formData.get("imageUrl") ?? "").trim();

  let finalImageUrl = imageUrlFromForm || null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = imageFile.name.split(".").pop() || "jpg";
    const filename = `${slugify(name)}-${Date.now()}.${ext}`;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    finalImageUrl = `/uploads/${filename}`;
  }

  if (!name || !price || !mrp) {
    throw new Error("Name, price, and MRP are required.");
  }

  const product = await prisma.product.create({
    data: {
      name,
      slug: slugify(name) + "-" + Math.random().toString(36).slice(2, 6),
      price,
      mrp,
      stockQty,
      tag,
      shortDescription,
      images: finalImageUrl
        ? { create: [{ url: finalImageUrl, sortOrder: 0 }] }
        : undefined,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect(`/admin/products?created=${product.id}`);
}

export async function updateProduct(productId: string, formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  const mrp = Number(formData.get("mrp"));
  const stockQty = Number(formData.get("stockQty") ?? 0);
  const tag = String(formData.get("tag") ?? "").trim() || null;
  const shortDescription = String(formData.get("shortDescription") ?? "").trim() || null;
  const isActive = formData.get("isActive") === "on";

  await prisma.product.update({
    where: { id: productId },
    data: { name, price, mrp, stockQty, tag, shortDescription, isActive },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products?updated=1");
}

export async function deleteProduct(productId: string) {
  await requireAdmin();
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
  revalidatePath("/");
}

export async function updateOrderStatus(orderId: string, formData: FormData) {
  await requireAdmin();

  const orderStatus = String(formData.get("orderStatus")) as
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";
  const trackingNumber = String(formData.get("trackingNumber") ?? "").trim() || null;

  await prisma.order.update({
    where: { id: orderId },
    data: { orderStatus, trackingNumber },
  });

  revalidatePath("/admin/orders");
}