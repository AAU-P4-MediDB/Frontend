<script>
  import { goto } from "$app/navigation";
  import { Tooltip } from "flowbite-svelte";

  async function handleLogout() {
    await goto("/login");
  }

  import {
    Home,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    SquareChartGantt,
    ListCheck,
    ClipboardList,
    CalendarDays,
    Settings,
    LogOut,
  } from "lucide-svelte";

  import { isExpanded } from "$lib/stores/ui.js";

  const menuItems = [
    { icon: Home, label: "Home", href: "/home" },
    {
      icon: SquareChartGantt,
      label: "Patient Overview",
      href: "/patients/overview",
    },
    {
      icon: ListCheck,
      label: "Patient Permissions",
      href: "/patients/permissions",
    },
    {
      icon: ClipboardList,
      label: "Patient Test Results",
      href: "/patients/test_results",
    },
    { icon: CalendarDays, label: "Calendar", href: "/calendar" },
    {
      icon: Settings,
      label: "Patient Management",
      href: "/settings/admin/patient",
    },
    {
      icon: Settings,
      label: "Doctor Management",
      href: "/settings/admin/doctor",
    },
    {
      icon: Settings,
      label: "System Admin",
      href: "/settings/admin/system",
    },
  ];

  function toggleSidebar() {
    isExpanded.update((n) => !n);
  }
</script>

<aside
  class="fixed top-0 left-0 z-50 flex flex-col h-screen bg-darker text-white transition-all duration-300 ease-in-out {$isExpanded
    ? 'w-64'
    : 'w-20'}"
>
  <div class="flex items-center p-4 h-16 transition-all duration-300">
    {#if $isExpanded}
      <span class="font-bold text-xl overflow-hidden whitespace-nowrap"
        >MediDB</span
      >
    {/if}

    <button
      onclick={toggleSidebar}
      class="p-2 rounded-lg hover:bg-light hover:text-darker transition-colors {$isExpanded
        ? 'ml-auto'
        : 'mx-auto'}"
    >
      {#if $isExpanded}
        <ChevronLeft size={20} />
      {:else}
        <ChevronRight size={20} />
      {/if}
    </button>
  </div>

  <nav class="px-3 space-y-2 mt-4">
    {#each menuItems as item}
      <a
        href={item.href}
        class="flex items-center p-3 rounded-xl hover:bg-light hover:text-darker transition-colors group"
      >
        <div class="flex items-center justify-center min-w-8">
          <item.icon size={24} />
        </div>
        {#if $isExpanded}
          <span class="ml-4 font-medium overflow-hidden whitespace-nowrap"
            >{item.label}</span
          >
        {/if}
      </a>
      {#if !$isExpanded}
        <Tooltip
          placement="right"
          class="bg-dark px-4 py-2 text-white font-medium"
          arrow={false}
        >
          {item.label}
        </Tooltip>
      {/if}
    {/each}
  </nav>

  <div class="flex-1"></div>

  <div class="px-3 pb-6 space-y-2 border-t border-white/10 pt-4">
    <button
      onclick={handleLogout}
      class="w-full flex items-center p-3 rounded-xl hover:bg-red-500 hover:text-white transition-colors group text-red-400"
    >
      <div class="flex items-center justify-center min-w-8">
        <LogOut size={24} />
      </div>
      {#if $isExpanded}
        <span class="ml-4 font-medium overflow-hidden whitespace-nowrap"
          >Logout</span
        >
      {/if}
    </button>
    {#if !$isExpanded}
      <Tooltip
        placement="right"
        class=" bg-red-600 px-4 py-2 text-white font-medium"
        arrow={false}
        >Logout
      </Tooltip>
    {/if}
  </div>
</aside>
