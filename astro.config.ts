import cloudflare from "@astrojs/cloudflare";

import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import { defineConfig, passthroughImageService } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

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
});