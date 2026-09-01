import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

const JSON_HEADERS = { "Content-Type": "application/json" };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function error(message: string, status = 500): Response {
  return json({ error: message }, status);
}

type UserInsert = typeof users.$inferInsert;

function sanitize(user: any): any {
  const { passwordHash, ...rest } = user;
  return { ...rest, id: Number(user.id) };
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const role = url.searchParams.get("role");
    const email = url.searchParams.get("email");

    let query = db.select().from(users).$dynamic();

    if (role === "admin" || role === "editor") {
      query = query.where(eq(users.role, role));
    } else if (email) {
      query = query.where(eq(users.email, email));
    }

    const data = await query;
    return json(data.map(sanitize));
  } catch (e: any) {
    console.error(e);
    return error(e?.message ?? "Terjadi kesalahan.");
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const username = String(body.username ?? "").trim();
    const email = String(body.email ?? "").trim();
    const password = body.password ? String(body.password) : "";
    const role = body.role === "editor" ? "editor" : "admin";

    if (!name) return error("Nama wajib diisi.", 400);
    if (!username) return error("Username wajib diisi.", 400);
    if (!email) return error("Email wajib diisi.", 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return error("Format email tidak valid.", 400);
    if (!password || password.length < 6) return error("Password minimal 6 karakter.", 400);

    const data: UserInsert = { name, username, email, passwordHash: password, role };

    const inserted = await db.insert(users).values(data);
    const id = Number(inserted[0].insertId);
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);

    return json(sanitize(rows[0]), 201);
  } catch (e: any) {
    console.error(e);
    if (e?.code === "ER_DUP_ENTRY") return error("Username atau email sudah digunakan.", 409);
    return error(e?.message ?? "Gagal menambahkan user.");
  }
};
