<script>
  import "../../app.css";
  import { DarkMode } from "flowbite-svelte";
  import GreyButton from "$lib/GreyButton.svelte";
  import { afterNavigate } from "$app/navigation";
  import SidebarMenu from "$lib/SidebarMenu.svelte";

  // 1. Import the global store (REMOVED the local let isExpanded)
  import { isExpanded } from "$lib/stores/ui.js";

  let BmenuOpen = false;
  let menuOpen = false;

  afterNavigate(() => {
    BmenuOpen = false;
  });

  let darkmodebtn =
    "text-[--medi-cyan]/80 dark:text-[--medi-cyan]/40 hover:bg-[--medi-cyan]/10 dark:hover:bg-[--medi-cyan]/70 focus:outline-none focus:ring-2 focus:ring-[--medi-cyan]/20 rounded-lg p-2.5";
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
      <div
        class="flex items-center justify-between px-6 max-w-[2000px] py-3 mx-auto text-white"
      >
        <button
          on:click={() => (BmenuOpen = !BmenuOpen)}
          class="dark:text-white text-xl hover:bg-[--medi-cyan]/70 focus:outline-none focus:ring-2 focus:ring-[--medi-cyan]/20 rounded-lg p-2.5 transition-colors"
          aria-label="Toggle menu"
        >
          {#if BmenuOpen}
            <svg
              class="block w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          {:else}
            <svg
              class="block w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          {/if}
        </button>

        <div
          class="dark:text-white font-bold text-xl tracking-wide"
          id="tab-title"
        >
          MediDB
        </div>

        <div class="flex items-center gap-2">
          <div class="relative">
            <button
              class="flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-200"
              on:click|preventDefault={() => (menuOpen = !menuOpen)}
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.5c3.53 0 6.5 2.97 6.5 6.5S15.53 18 12 18s-6.5-2.97-6.5-6.5S8.47 6.5 12 6.5zm0 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0-1.01a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm0-1.51a5.5 5.5 0 110-11 5.5 5.5 0 010 11z"
                />
              </svg>
              <span>Menu</span>
            </button>
            {#if menuOpen}
              <div
                class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50 text-black"
              >
                <a href="/" class="block px-4 py-2 hover:bg-green-100">Home</a>
                <a href="/settings" class="block px-4 py-2 hover:bg-green-100"
                  >Settings</a
                >
                <a
                  href="/login"
                  class="block px-4 py-2 text-red-500 hover:bg-green-100"
                  >Logout</a
                >
              </div>
            {/if}
          </div>
        </div>
      </div>

      {#if BmenuOpen}
        <div
          class="fixed top-16 left-0 w-64 bg-white shadow-xl z-[100] border-r"
        >
          <nav class="flex flex-col">
            <GreyButton href="/home">Home</GreyButton>
            <GreyButton href="/patients/overview">Pt. Overview</GreyButton>
            <GreyButton href="/patients/dashboard">Pt. Dashboard</GreyButton>
            <GreyButton href="/patients/permissions">Pt. Permissions</GreyButton
            >
            <GreyButton href="/patients/test_results"
              >Pt. Test results</GreyButton
            >
            <GreyButton href="/calendar">Calendar</GreyButton>
            <GreyButton href="/componentExamples">Component Examples</GreyButton
            >
          </nav>
        </div>
      {/if}
    </header>

    <div class="p-6 overflow-x-auto">
      <slot />
    </div>
  </main>
</div>

<style>
  :global(.text-cyan) {
    color: var(--medi-cyan);
  }
  :global(.text-dark) {
    color: var(--medi-dark);
  }
  :global(.bg-cyan) {
    background-color: var(--medi-cyan);
  }
  :global(.bg-light) {
    background-color: var(--medi-light);
  }
  :global(.bg-dark) {
    background-color: var(--medi-dark);
  }
  :global(.bg-darker) {
    background-color: var(--medi-darker);
  }
  :global(.outline-cyan) {
    outline-color: var(--medi-cyan);
    outline-style: solid;
  }
</style>
