<script lang="ts">
    import { mode } from "mode-watcher"; // Assuming this is your global mode store

    const { children } = $props();

    let rootElement: HTMLElement | undefined = $state();
    let ancestorMode = $state<"light" | "dark" | null>(null);

    $effect(() => {
        if (rootElement) {
            // `closest()` checks the element itself, then parents.
            const parent = rootElement.parentElement;

            if (parent?.closest(".mode-light")) {
                ancestorMode = "light";
            } else if (parent?.closest(".mode-dark")) {
                ancestorMode = "dark";
            } else {
                ancestorMode = null;
            }
        }
    });

    const finalTheme = $derived(() => {
        return (ancestorMode ?? mode.current) === "dark" ? "light" : "dark";
    });
</script>

<div
    bind:this={rootElement}
    class="contents"
    class:mode-light={finalTheme() === "light"}
    class:mode-dark={finalTheme() === "dark"}
>
    <!-- <h3>I am the Child (DOM Check with Fallback)</h3>

    <div class="debug-info">
        <p>Global Mode: <strong>{mode.current}</strong></p>
        <p>Ancestor Mode Found: <strong>{ancestorMode ?? "None"}</strong></p>
        <p style="color: green; font-weight: bold;">
            ✅ Final Calculated Theme: <strong>{finalTheme()}</strong>
        </p>
    </div> -->

    {@render children?.()}
</div>

<!-- <style>
    .debug-info {
        border: 1px dashed #888;
        padding: 0.5rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9em;
    }
</style> -->
