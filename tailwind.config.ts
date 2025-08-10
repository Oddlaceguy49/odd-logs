import plugin from "tailwindcss/plugin";

export default {
    darkMode: "class",
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
    ],
};
