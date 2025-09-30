import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig, passthroughImageService } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkFlexibleCodeTitles from "remark-flexible-code-titles";
import remarkToc from "remark-toc";

import vtbot from "astro-vtbot";

import Icons from "unplugin-icons/vite";

const siteUrl = "https://oddlace.dev";

// https://astro.build/config
export default defineConfig({
    site: /*import.meta.env.PROD*/ true ? siteUrl : "http://localhost:4321",
    output: "static",
    // adapter: cloudflare({
    //     imageService: "cloudflare",
    //     platformProxy: {
    //         enabled: true,
    //     },
    // }),
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
    integrations: [svelte(), sitemap(), mdx(), vtbot()],
    vite: {
        server: {
            watch: {
                usePolling: true,
            },
        },

        ssr: {
            external: ["node:buffer"],
        },

        plugins: [tailwindcss(), 
            Icons({compiler: "svelte"}), 
            Icons({compiler: "astro"})
        ],
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