import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import { LOG_PATH, LOG_PREVIEW_PATH } from "./data/logs/logConfig";

const logSchema = z.object({
    title: z.string(),
    slug: z.string().optional(),
    pubDate: z.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string(),
    author: reference("authors"),
    draft: z.boolean().optional(),
    tags: z.array(z.string()),
    category: z.string().optional(),
    readingTime: z.number().optional(),
    canonicalUrl: z.string().url().optional(),
    image: z.object({
        url: z.string(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
    }),
    lang: z.string().optional(),
    ogType: z.string().optional(),
    featured: z.boolean().optional(),
    series: z.string().optional(),
    summary: z.string().optional(),
});

const logs = defineCollection({
    loader: glob({
        pattern: ["**/[^_]*.mdx", "**/[^_]*.md"],
        base: LOG_PATH,
    }),
    schema: logSchema,
});

const logPreviews = defineCollection({
    loader: glob({
        pattern: ["**/[^_]*.mdx", "**/[^_]*.md"],
        base: LOG_PREVIEW_PATH,
    }),
    schema: z.object({
        slug: z.string(),
    }),
});

const authors = defineCollection({
    loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/authors" }),
    schema: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        bio: z.string().optional(),
        contacts: z.array(z.string()).optional(),
    }),
});

export const collections = {
    logs,
    logPreviews,
    authors,
};
