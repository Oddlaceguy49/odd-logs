<script lang="ts">
    import { cn } from "$lib/utils";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = {
        count?: number;
        class?: string;
    } & HTMLAttributes<HTMLSpanElement>;

    let { count = 0, class: className, ...restProps }: Props = $props();

    const baseClasses =
        "inline-flex h-5 w-[65px] items-center justify-between rounded-sm bg-primary align-middle text-xs font-bold shadow-md leading-none select-none";
</script>

<span class={cn(baseClasses, className)} {...restProps}>
    <Button
        class="h-full flex-1 cursor-pointer rounded-l-sm bg-transparent px-2"
        onclick={() => (count = count - 1)}>-</Button
    >
    <span class="min-w-[2ch] text-center">{count}</span>
    <Button
        class="h-full flex-1 cursor-pointer rounded-r-sm bg-transparent px-2"
        onclick={() => (count = count + 1)}>+</Button
    >
</span>

<style>
</style>
