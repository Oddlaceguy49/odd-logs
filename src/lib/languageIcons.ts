import DeviconAstro from "~icons/simple-icons/astro";
import DeviconSvelte from "~icons/simple-icons/svelte";
import DeviconTailwindcss from "~icons/simple-icons/tailwindcss";
import DeviconTypescript from "~icons/simple-icons/typescript";
import DeviconGithub from "~icons/simple-icons/github";

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
    github: {
        label: "GitHub",
        icon: DeviconGithub,
    },
} as const;

export type LanguageIconTag = keyof typeof languageIcons;

export const languageIconTags = Object.keys(languageIcons) as [
    LanguageIconTag,
    ...LanguageIconTag[]
];
