import { relations } from "drizzle-orm/relations";
import { projects, media, projectViews, categories } from "./schema";

export const mediaRelations = relations(media, ({one}) => ({
    project: one(projects, {
        fields: [media.projectId],
        references: [projects.id]
    }),
}));

export const projectsRelations = relations(projects, ({one, many}) => ({
    media: many(media),
    projectViews: many(projectViews),
    category: one(categories, {
        fields: [projects.categoryId],
        references: [categories.id]
    }),
}));

export const projectViewsRelations = relations(projectViews, ({one}) => ({
    project: one(projects, {
        fields: [projectViews.projectId],
        references: [projects.id]
    }),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
    projects: many(projects),
}));