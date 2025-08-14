import cloudflare from "@astrojs/cloudflare";

import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import { defineConfig, passthroughImageService } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import remarkToc from "remark-toc";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import remarkFlexibleCodeTitles from "remark-flexible-code-titles";

const siteUrl = "https://base-astro.copperdevs.com";

// https://astro.build/config
export default defineConfig({
    site: /*import.meta.env.PROD*/ true ? siteUrl : "http://localhost:4321",
    output: "server",
    adapter: cloudflare({
        imageService: "cloudflare",
        platformProxy: {
            enabled: true,
        },
    }),
    image: { service: passthroughImageService() },
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: { theme: "dracula" },
        remarkPlugins: [remarkToc, [remarkFlexibleCodeTitles, {}]],
        rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeExternalLinks,
        ],
        remarkRehype: { footnoteLabel: "References" },
        gfm: true,
    },
    integrations: [svelte(), sitemap(), mdx()],
    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },

        ssr: {
            external: ["node:buffer"],
        },

        plugins: [tailwindcss()],
    },
    experimental: {
        contentIntellisense: true,
        headingIdCompat: true,
    },
    devToolbar: {
        enabled: false,
    },
    prefetch: true,
});
