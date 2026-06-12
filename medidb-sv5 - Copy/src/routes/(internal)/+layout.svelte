<script lang="ts">
  import "../../app.css";
  import SidebarMenu from "$lib/SidebarMenu.svelte";
  import { isExpanded } from "$lib/stores/ui.js";
  import { page } from "$app/state";
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  // 1. Reactive derivation of path segments
  // Filter removes empty strings from the split (like the first slash)
  let pathSegments = $derived(page.url.pathname.split("/").filter(Boolean));

  // 2. Helper to make the labels pretty
  function getLabel(segment: string) {
    // Otherwise, capitalize the word (e.g., "patients" -> "Patients")
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }

  // 3. Construct the href for each step
  // e.g., for the second segment in /patients/p-001, the href should be /patients
  function getHref(index: number) {
    const segments = page.url.pathname.split("/").filter(Boolean);
    return "/" + segments.slice(0, index + 1).join("/");
  }

  let { children } = $props();
</script>

<div class="flex min-h-screen w-full overflow-x-hidden">
  <SidebarMenu />

  <main
    class="flex-1 min-w-0 transition-all duration-300 {$isExpanded
      ? 'ml-64'
      : 'ml-20'}"
  >
    <header class="w-full">
      <nav class="pl-6 mt-2">
        <Breadcrumb aria-label="Global navigation">
          <BreadcrumbItem href="/home" home>Home</BreadcrumbItem>

          {#each pathSegments as segment, i}
            {#if segment !== "home"}
              <BreadcrumbItem href={getHref(i)}>
                {getLabel(segment)}
              </BreadcrumbItem>
            {/if}
          {/each}
        </Breadcrumb>
      </nav>
    </header>

    <div class="p-6 overflow-x-auto">
      {@render children()}
    </div>
  </main>
</div>

<style>
  :global(.text-cyan) {
    color: var(--medi-cyan);
  }
  :global(.bg-cyan) {
    background-color: var(--medi-cyan);
  }
  :global(.outline-cyan) {
    outline-color: var(--medi-cyan);
    outline-style: solid;
  }
</style>
