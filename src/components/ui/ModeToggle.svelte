<script lang="ts">
    import { resetMode, setMode, userPrefersMode } from "mode-watcher";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import LucideLaptopMinimal from "~icons/lucide/laptop-minimal";
    import LucideMoon from "~icons/lucide/moon";
    import LucideSun from "~icons/lucide/sun";
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger
        class={buttonVariants({ variant: "outline", size: "icon" })}
    >
        <LucideSun
            class="h-[1.2rem] w-[1.2rem] !transition-all {userPrefersMode.current ===
            'light'
                ? 'rotate-0 scale-100'
                : 'rotate-90 scale-0'}"
        />

        <LucideMoon
            class="absolute h-[1.2rem] w-[1.2rem] !transition-all {userPrefersMode.current ===
            'dark'
                ? 'rotate-0 scale-100'
                : '-rotate-90 scale-0'}"
        />

        <LucideLaptopMinimal
            class="absolute h-[1.2rem] w-[1.2rem] !transition-all {userPrefersMode.current ===
            'system'
                ? 'rotate-0 scale-100'
                : '-rotate-90 scale-0'}"
        />

        <span class="sr-only">Toggle theme</span>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
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
