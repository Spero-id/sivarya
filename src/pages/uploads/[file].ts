import type { APIRoute } from "astro";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const UPLOAD_DIR = fileURLToPath(new URL("../../../storage/uploads/", import.meta.url));

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export const GET: APIRoute = async ({ params }) => {
  try {
    const name = path.basename(params.file ?? "");
    if (!name || name.includes("..")) {
      return new Response("Not found", { status: 404 });
    }

    const filePath = path.join(UPLOAD_DIR, name);
    const data = await fs.readFile(filePath);
    const ext = path.extname(name).toLowerCase();

    return new Response(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
};
