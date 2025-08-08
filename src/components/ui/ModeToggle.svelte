<script lang="ts">
    import { userPrefersMode, setMode, resetMode } from "mode-watcher";
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";
    import LaptopMinimalIcon from "@lucide/svelte/icons/laptop-minimal";

    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger
        class={buttonVariants({ variant: "outline", size: "icon" })}
    >
        <SunIcon
            class="h-[1.2rem] w-[1.2rem] !transition-all {userPrefersMode.current ===
            'light'
                ? 'rotate-0 scale-100'
                : 'rotate-90 scale-0'}"
        />

        <MoonIcon
            class="absolute h-[1.2rem] w-[1.2rem] !transition-all {userPrefersMode.current ===
            'dark'
                ? 'rotate-0 scale-100'
                : '-rotate-90 scale-0'}"
        />

        <LaptopMinimalIcon
            class="absolute h-[1.2rem] w-[1.2rem] !transition-all {userPrefersMode.current ===
            'system'
                ? 'rotate-0 scale-100'
                : '-rotate-90 scale-0'}"
        />

        <span class="sr-only">Toggle theme</span>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
        <!-- 3. Use Svelte's on:click for event handling -->
        <DropdownMenu.Item onclick={() => setMode("light")}
            >Light</DropdownMenu.Item
        >
        <DropdownMenu.Item onclick={() => setMode("dark")}
            >Dark</DropdownMenu.Item
        >
        <DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item
        >
    </DropdownMenu.Content>
</DropdownMenu.Root>
