<script lang="ts">
    let {
        class: className = "", // Accept external classes
        count = 0,
        ...restProps // Accept all other HTML attributes (id, style, etc.)
    } = $props();
</script>

<div class="inline-flex items-center align-middle {className}" {...restProps}>
    <button
        class="h-full cursor-pointer rounded-l-md bg-transparent px-2 font-bold text-white hover:bg-black/20"
        onclick={() => (count = count - 1)}>-</button
    >
    <span class="min-w-[2ch] px-1 text-center font-bold text-white"
        >{count}</span
    >
    <button
        class="h-full cursor-pointer rounded-r-md bg-transparent px-2 font-bold text-white hover:bg-black/20"
        onclick={() => (count = count + 1)}>+</button
    >
</div>

<style>
    div {
        background: darkorange;
        height: 24px; /* Slightly taller for better click targets */
        font-size: 14px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        user-select: none; /* Prevents text selection when double-clicking */
    }
</style>
