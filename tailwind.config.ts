import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config: Config = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

    darkMode: "class",

    theme: {
        extend: {
            keyframes: {},
        },
    },

    plugins: [
        plugin(function ({ addUtilities }) {
            const utilities = {
                // light, dark color scheme
                ".light": {
                    "color-scheme": "light",
                },
                ".dark": {
                    "color-scheme": "dark",
                },
            };
            addUtilities(utilities);
        }),
        animate,
    ],
};

export default config;
