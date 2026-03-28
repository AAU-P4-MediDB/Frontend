<script>
  import "../../app.css";
  import { DarkMode } from "flowbite-svelte";
  import GreyButton from "$lib/GreyButton.svelte";
  import { afterNavigate } from "$app/navigation";

  let BmenuOpen = false;
  let menuOpen = false;

  afterNavigate(() => {
    BmenuOpen = false;
  });

  //const el = document.getElementById('tab-title');
  //if (el) el.textContent = document.title;
  let darkmodebtn =
    "text-[--medi-cyan]/80 dark:text-[--medi-cyan]/40 hover:bg-[--medi-cyan]/10 dark:hover:bg-[--medi-cyan]/70 focus:outline-none focus:ring-2 focus:ring-[--medi-cyan]/20 rounded-lg p-2.5";
</script>



<header
  class="w-full bg-[--medi-cyan]/80 dark:bg-[--medi-cyan]/70 bg-cyan shadow-md"
>
  <div
    class="flex items-center justify-between px-20 max-w-[2000px] py-3 mx-auto text-white"
  >
    <!-- Burger button -->
    <button
      on:click={() => (BmenuOpen = !BmenuOpen)}
      class="dark:text-white text-xl hover:bg-[--medi-cyan]/70 focus:outline-none focus:ring-2 focus:ring-[--medi-cyan]/20 rounded-lg p-2.5 transition-colors"
      aria-label="Toggle menu"
      style="position: relative;"
    >
    
      {#if BmenuOpen}
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
    <div class="dark:text-white font-bold text-xl tracking-wide" id="tab-title">MediDB</div>

    <!-- Right side controls -->
    <div class="flex items-center gap-2">
      <div class="relative">
        <button
          class="flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          on:click|preventDefault={() => menuOpen = !menuOpen}
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.5c3.53 0 6.5 2.97 6.5 6.5S15.53 18 12 18s-6.5-2.97-6.5-6.5S8.47 6.5 12 6.5zm0 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0-1.01a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm0-1.51a5.5 5.5 0 110-11 5.5 5.5 0 010 11z"
            ></path>
          </svg>
          <span>Menu</span>
        </button>
        {#if menuOpen}
          <div class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
            <a href="/" class="block px-4 py-2 text-black hover:bg-green-100">Home</a>
            <a href="/settings" class="block px-4 py-2 text-black hover:bg-green-100">Settings</a>
            <a href="/login" class="block px-4 py-2 text-red-500 hover:bg-green-100">Logout</a>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Dropdown nav menu -->
  {#if BmenuOpen}
    <div
      class="ml-auto fixed top-140 left-0 w-1/4 bg-white shadow-xl z-99"
      style="left: {BmenuOpen ? '0' : '-100%'};"
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
