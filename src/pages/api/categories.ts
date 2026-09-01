import type { APIRoute } from "astro";
import { asc } from "drizzle-orm";
import { db } from "../../db";
import { categories } from "../../db/schema";

const JSON_HEADERS = { "Content-Type": "application/json" };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function error(message: string, status = 500): Response {
  return json({ error: message }, status);
}

export const GET: APIRoute = async () => {
  try {
    const rows = await db.select().from(categories).orderBy(asc(categories.sortOrder));
    return json(
      rows.map(row => ({
        id: Number(row.id),
        slug: row.slug,
        name: { id: row.nameId, en: row.nameEn },
        sortOrder: row.sortOrder,
      }))
    );
  } catch (e: any) {
    console.error(e);
    return error(e?.message ?? "Terjadi kesalahan.");
  }
};
