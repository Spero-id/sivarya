import type { APIRoute } from "astro";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const JSON_HEADERS = { "Content-Type": "application/json" };

const UPLOAD_DIR = fileURLToPath(new URL("../../../storage/uploads/", import.meta.url));

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
const EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function error(message: string, status = 400): Response {
  return json({ error: message }, status);
}

async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return error("Tidak ada file yang diunggah.");
    }
    if (!ALLOWED.has(file.type)) {
      return error("Tipe file tidak diizinkan. Gunakan JPG, PNG, WebP, GIF, atau AVIF.");
    }

    await ensureDir();
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${EXT[file.type] || ".jpg"}`;
    const dest = path.join(UPLOAD_DIR, name);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(dest, buffer);

    return json({ url: `/uploads/${name}` }, 201);
  } catch (e: any) {
    console.error(e);
    return error(e?.message ?? "Gagal mengunggah file.", 500);
  }
};
