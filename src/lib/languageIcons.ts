import DeviconAstro from "~icons/devicon/astro";
import DeviconSvelte from "~icons/devicon/svelte";
import DeviconTailwindcss from "~icons/devicon/tailwindcss";
import DeviconTypescript from "~icons/devicon/typescript";

export const languageIcons = {
    svelte: {
        label: "Svelte",
        icon: DeviconSvelte,
    },
    typescript: {
        label: "Typescript",
        icon: DeviconTypescript,
    },
    tailwindcss: {
        label: "Tailwind CSS",
        icon: DeviconTailwindcss,
    },
    astro: {
        label: "Astro",
        icon: DeviconAstro,
    },
} as const;

export type LanguageIconTag = keyof typeof languageIcons;

export const languageIconTags = Object.keys(languageIcons) as [
    LanguageIconTag,
    ...LanguageIconTag[]
];
