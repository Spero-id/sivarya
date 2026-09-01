import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { projects, categories } from "../../../db/schema";

const JSON_HEADERS = { "Content-Type": "application/json" };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function error(message: string, status = 500): Response {
  return json({ error: message }, status);
}

type ProjectInsert = typeof projects.$inferInsert;

function parseId(raw: string | undefined): number | null {
  const id = Number(raw);
  if (!raw || Number.isNaN(id) || id <= 0) return null;
  return id;
}

function mapProject(row: any) {
  const category = row.categoryNameId
    ? { id: row.categoryNameId, en: row.categoryNameEn }
    : null;
  return {
    id: Number(row.id),
    slug: row.slug,
    categoryId: Number(row.categoryId),
    categorySlug: row.categorySlug ?? null,
    categoryName: category,
    title: row.title,
    client: row.client,
    image: row.coverImage,
    aspect: row.aspect,
    status: row.status,
    featured: Boolean(row.featured),
    sortOrder: row.sortOrder,
    views: Number(row.views ?? 0),
    summary: { id: row.summaryId, en: row.summaryEn },
    challenge: row.challengeId ? { id: row.challengeId, en: row.challengeEn } : null,
    strategy: row.strategyId ? { id: row.strategyId, en: row.strategyEn } : null,
    result: row.resultId ? { id: row.resultId, en: row.resultEn } : null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    publishedAt: row.publishedAt,
  };
}

const SELECT_COLS = {
  id: projects.id,
  slug: projects.slug,
  categoryId: projects.categoryId,
  title: projects.title,
  client: projects.client,
  coverImage: projects.coverImage,
  aspect: projects.aspect,
  status: projects.status,
  featured: projects.featured,
  sortOrder: projects.sortOrder,
  views: projects.views,
  summaryId: projects.summaryId,
  summaryEn: projects.summaryEn,
  challengeId: projects.challengeId,
  challengeEn: projects.challengeEn,
  strategyId: projects.strategyId,
  strategyEn: projects.strategyEn,
  resultId: projects.resultId,
  resultEn: projects.resultEn,
  createdAt: projects.createdAt,
  updatedAt: projects.updatedAt,
  publishedAt: projects.publishedAt,
  categorySlug: categories.slug,
  categoryNameId: categories.nameId,
  categoryNameEn: categories.nameEn,
};

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = parseId(params.id);
    if (id === null) return error("ID tidak valid.", 400);
    const rows = await db
      .select(SELECT_COLS)
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(eq(projects.id, id))
      .limit(1);
    if (!rows.length) return error("Data proyek tidak ditemukan.", 404);
    return json(mapProject(rows[0]));
  } catch (e: any) {
    console.error(e);
    return error(e?.message ?? "Terjadi kesalahan.");
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = parseId(params.id);
    if (id === null) return error("ID tidak valid.", 400);

    const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    if (!rows.length) return error("Data proyek tidak ditemukan.", 404);
    const existing = rows[0];

    const body = await request.json();
    const patch: ProjectInsert = {};
    const s = (v: any) => String(v ?? "").trim();

    if ("title" in body) {
      if (s(body.title) === "") return error("Judul proyek tidak boleh kosong.", 400);
      patch.title = s(body.title);
    }
    if ("slug" in body && s(body.slug)) patch.slug = s(body.slug);
    if ("image" in body) patch.coverImage = s(body.image);
    if ("client" in body) patch.client = s(body.client);
    if ("aspect" in body) patch.aspect = s(body.aspect) || "4/5";
    if ("status" in body) patch.status = body.status === "published" ? "published" : "draft";
    if ("featured" in body) patch.featured = body.featured ? 1 : 0;
    if ("categoryId" in body) patch.categoryId = Number(body.categoryId);

    if (body.summary) {
      if (s(body.summary.id) === "") return error("Ringkasan (bahasa Indonesia) wajib diisi.", 400);
      patch.summaryId = s(body.summary.id);
      patch.summaryEn = s(body.summary.en);
    }
    if (body.challenge) {
      const cid = s(body.challenge.id);
      patch.challengeId = cid || null;
      patch.challengeEn = cid ? s(body.challenge.en) : null;
    }
    if (body.strategy) {
      const sid = s(body.strategy.id);
      patch.strategyId = sid || null;
      patch.strategyEn = sid ? s(body.strategy.en) : null;
    }
    if (body.result) {
      const rid = s(body.result.id);
      patch.resultId = rid || null;
      patch.resultEn = rid ? s(body.result.en) : null;
    }

    const wasDraft = existing.status === "draft";
    const toPublished = "status" in body && body.status === "published";
    if (toPublished && wasDraft && !existing.publishedAt) {
      patch.publishedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    }

    await db.update(projects).set(patch).where(eq(projects.id, id));
    const updated = await db
      .select(SELECT_COLS)
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(eq(projects.id, id))
      .limit(1);

    return json(mapProject(updated[0]));
  } catch (e: any) {
    console.error(e);
    if (e?.code === "ER_DUP_ENTRY") return error("Slug proyek sudah digunakan.", 409);
    return error(e?.message ?? "Gagal memperbarui proyek.");
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = parseId(params.id);
    if (id === null) return error("ID tidak valid.", 400);

    const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    if (!rows.length) return error("Data proyek tidak ditemukan.", 404);

    await db.delete(projects).where(eq(projects.id, id));
    return json({ ok: true, id });
  } catch (e: any) {
    console.error(e);
    return error(e?.message ?? "Gagal menghapus proyek.");
  }
};
