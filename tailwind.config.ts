import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config: Config = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],

    darkMode: "class",

    theme: {
        extend: {
            keyframes: {
                fade: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                "slide-from-right": {
                    from: { transform: "translateX(30px)" },
                    to: { transform: "translateX(0)" },
                },
                "slide-from-left": {
                    from: { transform: "translateX(-30px)" },
                    to: { transform: "translateX(0)" },
                },
            },
            animation: {
                "fade-in": "fade 0.4s ease-out",
                "slide-in-right": "slide-from-right 0.4s ease-out",
            },
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
