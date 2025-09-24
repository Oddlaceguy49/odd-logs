import fs from "fs/promises";
import { glob } from "glob";
import type { Root, RootContent } from "mdast";
import path from "path";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { LOG_PATH, LOG_PREVIEW_PATH } from "@/data/logs/logConfig";

const contentDir: string = path.join(process.cwd(), LOG_PATH);
const previewDir: string = path.join(process.cwd(), LOG_PREVIEW_PATH);
const separator: string = "{/* more */}";
const numFallbackNodes: number = 5;

function splitContent(
    content: string
): { frontmatter: string; body: string } | null {
    const frontmatterMarker = "---";
    if (!content.startsWith(frontmatterMarker)) return null;
    const endMarkerIndex = content.indexOf(
        `\n${frontmatterMarker}`,
        frontmatterMarker.length
    );
    if (endMarkerIndex === -1) return null;
    const frontmatter = content.substring(
        0,
        endMarkerIndex + frontmatterMarker.length + 1
    );
    const body = content.substring(
        endMarkerIndex + frontmatterMarker.length + 1
    );
    return { frontmatter, body };
}

const mdxProcessor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkStringify);

async function generatePreviews(): Promise<void> {
    console.log("Generating previews with AST-based safe fallback...");

    await fs.rm(previewDir, { recursive: true, force: true });
    await fs.mkdir(previewDir, { recursive: true });
    const files = await glob(`${contentDir}/**/*.mdx`);

    for (const file of files) {
        try {
            const relativePath = path.relative(contentDir, file);

            const previewPath = path.join(previewDir, relativePath);

            await fs.mkdir(path.dirname(previewPath), { recursive: true });

            const fullContent: string = await fs.readFile(file, "utf-8");
            const parts = splitContent(fullContent);

            if (!parts) {
                console.log(
                    `No valid frontmatter in: ${path.basename(file)}. Skipping.`
                );
                continue;
            }

            const { frontmatter, body } = parts;
            const baseFilename = path.basename(file);

            let previewBody: string | null = null;
            const separatorIndex: number = body.indexOf(separator);

            if (separatorIndex !== -1) {
                console.log(`✅ Using "{/* more */}" tag for: ${baseFilename}`);
                previewBody = body.substring(0, separatorIndex).trim();
            } else {
                console.log(
                    `No tag found for ${baseFilename}. Generating safe automatic preview.`
                );

                const tree = mdxProcessor.parse(body);
                const previewNodes: RootContent[] = tree.children.slice(
                    0,
                    numFallbackNodes
                );

                const previewTree: Root = {
                    type: "root",
                    children: previewNodes,
                };

                previewBody = mdxProcessor.stringify(previewTree).trim();
            }

            if (previewBody) {
                const finalPreviewContent = `${frontmatter.trim()}\n\n${previewBody}`;
                await fs.writeFile(previewPath, finalPreviewContent);
            } else {
                await fs.unlink(previewPath).catch((error) => {
                    if (error.code !== "ENOENT") throw error;
                });
            }
        } catch (error) {
            console.error(`Failed to process file ${file}:`, error);
        }
    }

    console.log("Preview generation complete.");
}

generatePreviews().catch((err) => {
    console.error("Error generating previews:", err);
    process.exit(1);
});
