import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { auth } from "../../../lib/auth";

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

function parseId(raw: string | undefined): number | null {
  const id = Number(raw);
  if (!raw || Number.isNaN(id) || id <= 0) return null;
  return id;
}

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = parseId(params.id);
    if (id === null) return error("ID tidak valid.", 400);

    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!rows.length) return error("Data user tidak ditemukan.", 404);
    return json(sanitize(rows[0]));
  } catch (e: any) {
    console.error(e);
    return error(e?.message ?? "Terjadi kesalahan.");
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = parseId(params.id);
    if (id === null) return error("ID tidak valid.", 400);

    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!rows.length) return error("Data user tidak ditemukan.", 404);

    const body = await request.json();
    const patch: Partial<UserInsert> = {};

    const name = String(body.name ?? "").trim();
    const username = String(body.username ?? "").trim();
    const email = String(body.email ?? "").trim();
    const role = body.role;

    if (name !== undefined && name === "") return error("Nama tidak boleh kosong.", 400);
    if (username !== undefined && username === "") return error("Username tidak boleh kosong.", 400);
    if (email !== undefined && email === "") return error("Email tidak boleh kosong.", 400);
    if (email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return error("Format email tidak valid.", 400);
    }

    if (name) patch.name = name;
    if (username) patch.username = username;
    if (email) patch.email = email;
    if (role === "admin" || role === "editor") patch.role = role;
    if (body.password) {
      if (String(body.password).length < 6) return error("Password minimal 6 karakter.", 400);
      const ctx = await auth.$context;
      patch.passwordHash = await ctx.password.hash(String(body.password));
    }

    await db.update(users).set(patch).where(eq(users.id, id));
    const updated = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return json(sanitize(updated[0]));
  } catch (e: any) {
    console.error(e);
    if (e?.code === "ER_DUP_ENTRY") return error("Username atau email sudah digunakan.", 409);
    return error(e?.message ?? "Gagal memperbarui user.");
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = parseId(params.id);
    if (id === null) return error("ID tidak valid.", 400);

    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!rows.length) return error("Data user tidak ditemukan.", 404);

    await db.delete(users).where(eq(users.id, id));
    return json({ ok: true, id });
  } catch (e: any) {
    console.error(e);
    return error(e?.message ?? "Gagal menghapus user.");
  }
};
