import { promises as fs } from "node:fs";
import path from "node:path";

export function getUploadDir(): string {
  return process.env.UPLOAD_DIR || path.join(process.cwd(), "storage", "uploads");
}

export async function ensureUploadDir(): Promise<string> {
  const dir = getUploadDir();
  await fs.mkdir(dir, { recursive: true });
  return dir;
}