<script lang="ts">
    import { untrack } from "svelte";
    import { mode } from "mode-watcher";

    const { children, showDebugInfo = false } = $props();

    let isMounted = $state(false);
    $effect(() => {
        isMounted = true;
    });

    let rootElement: HTMLElement | undefined = $state();
    let ancestorMode = $state<"light" | "dark" | null>(null);

    let globalMode = $derived(mode.current);

    $effect(() => {
        if (!isMounted || !rootElement?.parentElement) return;

        const element = rootElement;
        const parent = element.parentElement!;

        untrack(() => {
            const nearestLight = parent.closest(".mode-light");
            const nearestDark = parent.closest(".dark, .mode-dark");

            if (nearestLight && nearestDark) {
                ancestorMode = nearestLight.contains(nearestDark)
                    ? "dark"
                    : "light";
            } else {
                ancestorMode = nearestLight
                    ? "light"
                    : nearestDark
                      ? "dark"
                      : null;
            }
        });
    });

    const finalTheme = $derived(
        (ancestorMode ?? globalMode) === "dark" ? "light" : "dark"
    );

    const themeClass = $derived(isMounted ? `mode-${finalTheme}` : "");
</script>

<div bind:this={rootElement} class="contents {themeClass}">
    {#if showDebugInfo}
        <div class="debug-info">
            <p>Global Mode: <strong>{globalMode}</strong></p>
            <p>
                Ancestor Mode Found: <strong>{ancestorMode ?? "None"}</strong>
            </p>
            <p style="color: green; font-weight: bold;">
                ✅ Final Calculated Theme: <strong>{finalTheme}</strong>
            </p>
        </div>
    {/if}

    {@render children?.()}
</div>

<style>
    .debug-info {
        border: 1px dashed #888;
        padding: 0.5rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-size: 0.9em;
    }
</style>
