<script>
  import "../../app.css";
  import SidebarMenu from "$lib/SidebarMenu.svelte";
  import { isExpanded } from "$lib/stores/ui.js";

  let { children } = $props();
</script>

<div class="flex min-h-screen w-full overflow-x-hidden">
  <SidebarMenu />

  <main
    class="flex-1 min-w-0 transition-all duration-300 {$isExpanded
      ? 'ml-64'
      : 'ml-20'}"
  >
    <header
      class="w-full bg-[--medi-cyan]/80 dark:bg-[--medi-cyan]/70 bg-cyan shadow-md"
    >
    </header>

    <div class="p-6 overflow-x-auto">
      {@render children()}
    </div>
  </main>
</div>
