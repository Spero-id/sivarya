import type { APIRoute } from "astro";
import { eq, desc } from "drizzle-orm";
import { db } from "../../db";
import { projects, categories } from "../../db/schema";

const JSON_HEADERS = { "Content-Type": "application/json" };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function error(message: string, status = 500): Response {
  return json({ error: message }, status);
}

type ProjectInsert = typeof projects.$inferInsert;

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

export const GET: APIRoute = async ({ url }) => {
  try {
    const status = url.searchParams.get("status");
    const category = url.searchParams.get("category");
    const q = url.searchParams.get("q")?.toLowerCase() ?? "";

    let query = db
      .select(SELECT_COLS)
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id));

    const conditions = [];
    if (status === "published" || status === "draft") {
      conditions.push(eq(projects.status, status));
    }
    query = query.where(conditions.length ? conditions[0] : undefined);
    query = query.orderBy(desc(projects.updatedAt));

    const rows = await query;
    let result = rows.map(mapProject);

    if (category && category !== "all") {
      result = result.filter(item => item.categorySlug === category);
    }
    if (q) {
      result = result.filter(
        item =>
          item.title.toLowerCase().includes(q) ||
          item.client.toLowerCase().includes(q) ||
          item.categoryName?.id.toLowerCase().includes(q)
      );
    }

    return json(result);
  } catch (e: any) {
    console.error(e);
    return error(e?.message ?? "Terjadi kesalahan.");
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const s = (v: string | undefined) => String(v ?? "").trim();
    const title = s(body.title);
    const slug = s(body.slug || slugify(title));
    const client = s(body.client);
    const coverImage = s(body.image);
    const aspect = s(body.aspect || "4/5");

    if (!title) return error("Judul proyek wajib diisi.", 400);
    if (!body.categoryId) return error("Kategori wajib diisi.", 400);
    const summaryId = String(body.summary?.id ?? "").trim();
    if (!summaryId) return error("Ringkasan (bahasa Indonesia) wajib diisi.", 400);

    const data: ProjectInsert = {
      slug,
      categoryId: Number(body.categoryId),
      title,
      client,
      coverImage,
      aspect,
      status: body.status === "published" ? "published" : "draft",
      featured: body.featured ? 1 : 0,
      views: 0,
      summaryId,
      summaryEn: String(body.summary?.en ?? "").trim(),
      challengeId: String(body.challenge?.id ?? "").trim() || null,
      challengeEn: String(body.challenge?.en ?? "").trim() || null,
      strategyId: String(body.strategy?.id ?? "").trim() || null,
      strategyEn: String(body.strategy?.en ?? "").trim() || null,
      resultId: String(body.result?.id ?? "").trim() || null,
      resultEn: String(body.result?.en ?? "").trim() || null,
      publishedAt:
        body.status === "published"
          ? new Date().toISOString().slice(0, 19).replace("T", " ")
          : null,
    };

    const inserted = await db.insert(projects).values(data);
    const id = Number(inserted[0].insertId);
    const rows = await db
      .select(SELECT_COLS)
      .from(projects)
      .leftJoin(categories, eq(projects.categoryId, categories.id))
      .where(eq(projects.id, id))
      .limit(1);

    return json(mapProject(rows[0]), 201);
  } catch (e: any) {
    console.error(e);
    if (e?.code === "ER_DUP_ENTRY") return error("Slug proyek sudah digunakan.", 409);
    return error(e?.message ?? "Gagal menambahkan proyek.");
  }
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
