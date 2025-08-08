import { vitePreprocess } from "@astrojs/svelte";
import { mdsvex } from "mdsvex";

export default {
    extensions: [".svelte", ".svx"],
    preprocess: [vitePreprocess(), mdsvex()],
};
