import {
    defineCollection,
    reference,
    type SchemaContext,
    z,
} from "astro:content";
import { glob } from "astro/loaders";
import { languageIconTags } from "$lib/languageIcons";
import { LOG_PATH, LOG_PREVIEW_PATH } from "./data/logs/logConfig";

const logSchema = z.object({
    title: z.string(),
    slug: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string(),
    author: reference("authors"),
    draft: z.boolean().optional(),
    tags: z.array(z.string()),
    category: z.string().optional(),
    readingTime: z.number().optional(),
    lang: z.string().optional(),
    featured: z.boolean().optional(),
    series: z.string().optional(),
    // summary: z.string().optional(),
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

export const projectsSchema = ({ image }: SchemaContext) =>
    z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        images: z
            .array(
                z.object({
                    image: image(),
                    alt: z.string().optional(),
                })
            )
            .optional(),
        languages: z.array(z.enum(languageIconTags)).optional(),
        blogTag: z.string().optional(),
        projectLink: z.string().url(),
        githubLink: z.string().url().optional(),
    });

const projects = defineCollection({
    loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/projects" }),
    schema: projectsSchema,
});

export const collections = {
    logs,
    logPreviews,
    authors,
    projects,
};
