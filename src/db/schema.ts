import { mysqlTable, mysqlSchema, primaryKey, unique, bigint, varchar, int, tinyint, index, foreignKey, timestamp, text, date, mysqlEnum, boolean, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const categories = mysqlTable("categories", {
    id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
    slug: varchar({ length: 50 }).notNull(),
    nameId: varchar("name_id", { length: 100 }).notNull(),
    nameEn: varchar("name_en", { length: 100 }).notNull(),
    sortOrder: int("sort_order").default(0).notNull(),
},
(table) => [
    primaryKey({ columns: [table.id], name: "categories_id"}),
    unique("uq_categories_slug").on(table.slug),
]);

export const media = mysqlTable("media", {
    id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
    projectId: bigint("project_id", { mode: "number", unsigned: true }).references(() => projects.id, { onDelete: "set null", onUpdate: "cascade" } ),
    filename: varchar({ length: 255 }).notNull(),
    path: varchar({ length: 500 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }).default('').notNull(),
    sizeBytes: bigint("size_bytes", { mode: "number", unsigned: true }).notNull(),
    alt: varchar({ length: 255 }).default('').notNull(),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
    index("idx_media_project").on(table.projectId),
    primaryKey({ columns: [table.id], name: "media_id"}),
]);

export const messages = mysqlTable("messages", {
    id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 190 }).notNull(),
    subject: varchar({ length: 255 }).default('').notNull(),
    message: text().notNull(),
    isRead: tinyint("is_read").default(0).notNull(),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
    index("idx_messages_read").on(table.isRead),
    primaryKey({ columns: [table.id], name: "messages_id"}),
]);

export const projectViews = mysqlTable("project_views", {
    projectId: bigint("project_id", { mode: "number", unsigned: true }).notNull().references(() => projects.id, { onDelete: "cascade", onUpdate: "cascade" } ),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    viewDate: date("view_date", { mode: 'string' }).notNull(),
    count: bigint({ mode: "number", unsigned: true }).notNull(),
},
(table) => [
    primaryKey({ columns: [table.projectId, table.viewDate], name: "project_views_project_id_view_date"}),
]);

export const projects = mysqlTable("projects", {
    id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
    slug: varchar({ length: 120 }).notNull(),
    categoryId: bigint("category_id", { mode: "number", unsigned: true }).notNull().references(() => categories.id, { onDelete: "restrict", onUpdate: "cascade" } ),
    title: varchar({ length: 255 }).notNull(),
    client: varchar({ length: 255 }).default('').notNull(),
    coverImage: varchar("cover_image", { length: 500 }).default('').notNull(),
    aspect: varchar({ length: 20 }).default('4/5').notNull(),
    status: mysqlEnum(['draft','published']).default('draft').notNull(),
    featured: tinyint().default(0).notNull(),
    sortOrder: int("sort_order").default(0).notNull(),
    views: bigint({ mode: "number", unsigned: true }).notNull(),
    summaryId: text("summary_id").notNull(),
    summaryEn: text("summary_en").notNull(),
    challengeId: text("challenge_id"),
    challengeEn: text("challenge_en"),
    strategyId: text("strategy_id"),
    strategyEn: text("strategy_en"),
    resultId: text("result_id"),
    resultEn: text("result_en"),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
    publishedAt: timestamp("published_at", { mode: 'string' }),
},
(table) => [
    index("idx_projects_category").on(table.categoryId),
    index("idx_projects_status_featured").on(table.status, table.featured),
    index("idx_projects_sort").on(table.sortOrder),
    primaryKey({ columns: [table.id], name: "projects_id"}),
    unique("uq_projects_slug").on(table.slug),
]);

export const users = mysqlTable("users", {
    id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
    name: varchar({ length: 100 }).notNull(),
    username: varchar({ length: 50 }),
    email: varchar({ length: 190 }).notNull(),
    password: varchar({ length: 255 }),
    role: mysqlEnum(['admin','editor']).default('admin').notNull(),
    lastLoginAt: timestamp("last_login_at", { mode: 'string' }),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: varchar({ length: 500 }),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => [
    primaryKey({ columns: [table.id], name: "users_id"}),
    unique("uq_users_username").on(table.username),
    unique("uq_users_email").on(table.email),
]);

export const session = mysqlTable("session", {
    id: varchar({ length: 128 }).primaryKey(),
    userId: bigint({ mode: "number", unsigned: true }).notNull(),
    token: varchar({ length: 128 }).notNull().unique(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    ipAddress: varchar("ip_address", { length: 64 }),
    userAgent: varchar("user_agent", { length: 255 }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const account = mysqlTable("account", {
    id: varchar({ length: 128 }).primaryKey(),
    userId: bigint({ mode: "number", unsigned: true }).notNull(),
    accountId: varchar("account_id", { length: 255 }).notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: "string" }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: "string" }),
    scope: text("scope"),
    issuer: text("issuer"),
    password: text("password"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const verification = mysqlTable("verification", {
    id: varchar({ length: 128 }).primaryKey(),
    identifier: varchar({ length: 255 }).notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
});
