<script>
  import '../../app.css';
  import { DarkMode } from 'flowbite-svelte';

  let menuOpen = false;

  let darkmodebtn =
    'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5';
</script>

<header class="w-full bg-cyan-600 dark:bg-cyan-800 shadow-md z-0">
  <div class="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
	<!-- Burger button -->
      <button
        on:click={() => (menuOpen = !menuOpen)}
        class="text-white hover:bg-red-700 dark:hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2.5 transition-colors"
        aria-label="Toggle menu"
      >
        {#if menuOpen}
          <!-- X icon -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        {:else}
          <!-- Hamburger icon -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        {/if}
      </button>

    <!-- Logo / Title -->
    <div class="text-white font-bold text-xl tracking-wide">
      MyApp
    </div>

    <!-- Right side controls -->
    <div class="flex items-center gap-2">
      <DarkMode btnClass={darkmodebtn} />      
    </div>
  </div>

  <!-- Dropdown nav menu -->
  {#if menuOpen}
    <nav class="bg-red-700">
		<a href="/home" class="text-white hover:text-red-200 transition-colors py-1">Home</a>
		<a href="/patients/overview" class="text-white hover:text-red-200 transition-colors py-1">Pt. Overview</a>
		<a href="/patients/dashboard" class="text-white hover:text-red-200 transition-colors py-1">Pt. Dashboard</a>
		<a href="/patients/permissions" class="text-white hover:text-red-200 transition-colors py-1">Pt. Permissions</a>
		<a href="/patients/test_results" class="text-white hover:text-red-200 transition-colors py-1">Pt. Test results</a>
		<a href="/calendar" class="text-white hover:text-red-200 transition-colors py-1">Calendar</a>
    </nav>
  {/if}
</header>

<slot />