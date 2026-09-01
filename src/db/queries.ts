import { eq, asc, desc } from "drizzle-orm";
import { db } from "./index";
import { projects, categories } from "./schema";

const ASPECT_CLASS: Record<string, string> = {
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "4/3": "aspect-[4/3]",
};

function toAspectClass(value: string | null | undefined): string {
  return ASPECT_CLASS[value || "4/5"] || "aspect-[4/5]";
}

export function mapPublicProject(row: any) {
  return {
    id: Number(row.id),
    slug: row.slug,
    category: row.categorySlug ?? "",
    categoryName: row.categoryNameId
      ? { id: row.categoryNameId, en: row.categoryNameEn }
      : { id: "", en: "" },
    title: row.title,
    client: row.client,
    image: row.coverImage,
    aspect: toAspectClass(row.aspect),
    summary: { id: row.summaryId, en: row.summaryEn },
    challenge: row.challengeId ? { id: row.challengeId, en: row.challengeEn } : null,
    strategy: row.strategyId ? { id: row.strategyId, en: row.strategyEn } : null,
    result: row.resultId ? { id: row.resultId, en: row.resultEn } : null,
  };
}

const PUBLIC_COLS = {
  id: projects.id,
  slug: projects.slug,
  categorySlug: categories.slug,
  categoryNameId: categories.nameId,
  categoryNameEn: categories.nameEn,
  title: projects.title,
  client: projects.client,
  coverImage: projects.coverImage,
  aspect: projects.aspect,
  summaryId: projects.summaryId,
  summaryEn: projects.summaryEn,
  challengeId: projects.challengeId,
  challengeEn: projects.challengeEn,
  strategyId: projects.strategyId,
  strategyEn: projects.strategyEn,
  resultId: projects.resultId,
  resultEn: projects.resultEn,
};

export async function getPublishedProjects() {
  const rows = await db
    .select(PUBLIC_COLS)
    .from(projects)
    .leftJoin(categories, eq(projects.categoryId, categories.id))
    .where(eq(projects.status, "published"))
    .orderBy(desc(projects.sortOrder), desc(projects.id));

  return rows.map(mapPublicProject);
}

export async function getProjectBySlug(slug: string) {
  const rows = await db
    .select(PUBLIC_COLS)
    .from(projects)
    .leftJoin(categories, eq(projects.categoryId, categories.id))
    .where(eq(projects.slug, slug))
    .limit(1);

  return rows.length ? mapPublicProject(rows[0]) : null;
}

export async function getProjectById(id: number) {
  const rows = await db
    .select(PUBLIC_COLS)
    .from(projects)
    .leftJoin(categories, eq(projects.categoryId, categories.id))
    .where(eq(projects.id, id))
    .limit(1);

  return rows.length ? mapPublicProject(rows[0]) : null;
}

export async function getPublicCategories() {
  const rows = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.sortOrder));

  return rows.map(row => ({
    id: row.slug,
    name: row.nameId,
  }));
}
