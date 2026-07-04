<script>
  import { Tooltip } from "flowbite-svelte";
  import { page } from "$app/stores";

  let currentUser = $derived($page.data.user);

  async function handleLogout() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      cache: "no-store",
    });

    if (response.ok) {
      window.location.href = "/login";
    }
  }

  import {
    Home,
    ChevronLeft,
    ChevronRight,
    SquareChartGantt,
    ListCheck,
    ClipboardList,
    CalendarDays,
    LogOut,
    User2,
    ShieldCheck,
  } from "lucide-svelte";

  import { isExpanded } from "$lib/stores/ui.js";

  const menuItems = [
    { icon: Home, label: "Home", href: "/home" },
    {
      icon: SquareChartGantt,
      label: "Patient Overview",
      href: "/patients/overview",
      roles: ["Doctor"],
    },
    {
      icon: ListCheck,
      label: "Patient Permissions",
      href: "/patients/permissions",
      roles: ["Doctor"],
    },
    {
      icon: ClipboardList,
      label: "Patient Test Results",
      href: "/patients/test_results",
      roles: ["Doctor"],
    },
    {
      icon: CalendarDays,
      label: "Calendar",
      href: "/calendar",
      roles: ["Doctor"],
    },
    { icon: ShieldCheck, label: "Security", href: "/settings/security" },
  ];

  let allowedMenuItems = $derived(
    menuItems.filter(
      (item) => !item.roles || item.roles.includes(currentUser?.position),
    ),
  );

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
    {#each allowedMenuItems as item}
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

  <div class="px-3 border-t border-white/10 pt-4">
    <div class="flex items-center p-3 rounded-xl bg-white/5 text-slate-300">
      <div class="flex items-center justify-center min-w-8">
        <User2 size={24} class="text-slate-400" />
      </div>
      {#if $isExpanded}
        <div class="ml-4 flex flex-col overflow-hidden text-left leading-tight">
          <span
            class="font-medium text-sm text-white overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {currentUser?.position === "Doctor"
              ? `Dr. ${currentUser.email}`
              : (currentUser?.email ?? "Loading user...")}
          </span>
          {#if currentUser?.position !== "Doctor"}
            <span class="text-xs text-slate-400 font-normal mt-0.5">
              {currentUser?.position
                ? currentUser.position.replace("_", " ")
                : "Staff"}
            </span>
          {/if}
        </div>
      {/if}
    </div>
    {#if !$isExpanded}
      <Tooltip
        placement="right"
        class="bg-dark px-4 py-2 text-white font-medium"
        arrow={false}
      >
        {currentUser?.position === "Doctor"
          ? `Dr. ${currentUser.email}`
          : (currentUser?.email ?? "User Session")}
      </Tooltip>
    {/if}
  </div>

  <div class="px-3 pb-6 mt-2">
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
        class="bg-red-600 px-4 py-2 text-white font-medium"
        arrow={false}
      >
        Logout
      </Tooltip>
    {/if}
  </div>
</aside>
