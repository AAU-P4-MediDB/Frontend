<script>
  import "../../app.css";
  import { DarkMode } from "flowbite-svelte";
  import GreyButton from "$lib/GreyButton.svelte";

  let menuOpen = false;

  let darkmodebtn =
    "text-[--medi-cyan]/80 dark:text-[--medi-cyan]/40 hover:bg-[--medi-cyan]/10 dark:hover:bg-[--medi-cyan]/70 focus:outline-none focus:ring-2 focus:ring-[--medi-cyan]/20 rounded-lg p-2.5";
</script>

<header class="w-full bg-[--medi-cyan]/80 dark:bg-[--medi-cyan]/70 bg-cyan shadow-md">
  <div class="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto text-white">
    <!-- Burger button -->
    <button
      on:click={() => (menuOpen = !menuOpen)}
      class="dark:text-white text-xl hover:bg-[--medi-cyan]/70 focus:outline-none focus:ring-2 focus:ring-[--medi-cyan]/20 rounded-lg p-2.5 transition-colors"
      aria-label="Toggle menu"
      style="position: relative;"
    >
      {#if menuOpen}
        <!-- X icon -->
        <svg
          class="block w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style="top: 0; right: 0;"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      {:else}
        <!-- Hamburger icon -->
        <svg
          class="block w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style="top: 0; right: 0;"
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

    <!-- Logo / Title -->
    <div class="dark:text-white font-bold text-xl tracking-wide">MyApp</div>

    <!-- Right side controls -->
    <div class="flex items-center gap-2">
      <DarkMode btnClass={darkmodebtn} />
    </div>
  </div>

  <!-- Dropdown nav menu -->
  {#if menuOpen}
    <div
      class="ml-auto fixed top-140 left-0 w-1/4 bg-white shadow-xl"
      style="left: {menuOpen ? '0' : '-100%'};"
    >
      <nav class="flex flex-col">
        <GreyButton href="/home">Home</GreyButton>
        <GreyButton href="/patients/overview">Pt. Overview</GreyButton>
        <GreyButton href="/patients/dashboard">Pt. Dashboard</GreyButton>
        <GreyButton href="/patients/permissions">Pt. Permissions</GreyButton>
        <GreyButton href="/patients/test_results">Pt. Test results</GreyButton>
        <GreyButton href="/calendar">Calendar</GreyButton>
        <GreyButton href="/componentExamples">Component Examples</GreyButton>
      </nav>
    </div>
  {/if}
</header>

<slot />

