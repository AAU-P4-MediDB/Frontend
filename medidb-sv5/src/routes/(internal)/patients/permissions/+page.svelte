<script lang="ts">
  import DoctorPermissionsCard from "$lib/DoctorPermissionsCard.svelte";
  import ToggleCard from "$lib/ToggleCard.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";

  let { data } = $props();

  $effect(() => {
    console.log("permission request", data.permission_requests);
  });

  // ── Per-request toggle state ──────────────────────────────────────────────
  // We keep a map of requestIndex → { writeList, readList } so each card has
  // its own independent toggle state.

  function makeWriteList() {
    return [
      { label: "Write All", checked: false },
      { label: "Write Prescription", checked: false },
      { label: "Write Journal", checked: false },
      { label: "Write Vitals", checked: false },
      { label: "Write Diagnosis", checked: false },
      { label: "Write Appointments", checked: false },
      { label: "Write Person Info", checked: false },
      { label: "Write Lab Results", checked: false },
    ];
  }

  function makeReadList() {
    return [
      { label: "Read All", checked: false },
      { label: "Read Prescription", checked: false },
      { label: "Read Journal", checked: false },
      { label: "Read Vitals", checked: false },
      { label: "Read Diagnosis", checked: false },
      { label: "Read Appointments", checked: false },
      { label: "Read Person Info", checked: false },
      { label: "Read Lab Results", checked: false },
    ];
  }

  // Build per-request state once the requests are available.
  // Using $state on an array of objects so Svelte tracks mutations.
  let requestStates = $state(
    (data.permission_requests?.dr_perm_requests ?? []).map(() => ({
      writeList: makeWriteList(),
      readList: makeReadList(),
    }))
  );

  // ── Selected card ─────────────────────────────────────────────────────────
  let selectedIndex = $state<number | null>(null);

  // Derived: the active toggle lists (fall back to empty if nothing selected)
  let activeWrite = $derived(
    selectedIndex !== null ? requestStates[selectedIndex].writeList : makeWriteList()
  );
  let activeRead = $derived(
    selectedIndex !== null ? requestStates[selectedIndex].readList : makeReadList()
  );

  // ── Toggle logic ──────────────────────────────────────────────────────────
  function handleToggleLogic(
    list: ReturnType<typeof makeWriteList>,
    index: number
  ) {
    if (index === 0) {
      const isAllChecked = list[0].checked;
      for (let i = 1; i < list.length; i++) {
        list[i].checked = isAllChecked;
      }
    } else {
      if (!list[index].checked) {
        list[0].checked = false;
      } else {
        const allOthersChecked = list.slice(1).every((item) => item.checked);
        if (allOthersChecked) list[0].checked = true;
      }
    }
  }
</script>

<div class="grid">
  <hr class="border-gray-200 mt-6 mb-8" />

  <div class="grid grid-cols-4 content-between gap-4">

    <!-- ── Left column: clickable permission-request cards ── -->
    <div>
      <CardOverlay>
        {#each data.permission_requests?.dr_perm_requests as permission, i}
          <button
            type="button"
            onclick={() => (selectedIndex = i)}
            class="w-full text-left rounded-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
              {selectedIndex === i
                ? 'border-blue-500 bg-white shadow-md ring-1 ring-blue-500'
                : 'border-gray-200 bg-gray-100 opacity-50 hover:opacity-75'}"
          >
            <DoctorPermissionsCard
              pt_cpr={permission.pt_cpr}
              note={permission.note}
            />
          </button>
        {/each}
      </CardOverlay>
    </div>

    <!-- ── Right columns: toggles for the selected request ── -->
    <div class="col-span-3">
      <div class="grid grid-cols-2 gap-4">

        <!-- Write -->
        <div class="grid grid-cols-1 content-between gap-1">
          {#each activeWrite as item, i}
            <ToggleCard
              bind:checked={item.checked}
              disabled={selectedIndex === null}
              onUpdate={() =>
                selectedIndex !== null &&
                handleToggleLogic(requestStates[selectedIndex].writeList, i)}
            >
              {item.label}
            </ToggleCard>
          {/each}
        </div>

        <!-- Read -->
        <div class="grid grid-cols-1 content-between gap-1">
          {#each activeRead as item, i}
            <ToggleCard
              bind:checked={item.checked}
              disabled={selectedIndex === null}
              onUpdate={() =>
                selectedIndex !== null &&
                handleToggleLogic(requestStates[selectedIndex].readList, i)}
            >
              {item.label}
            </ToggleCard>
          {/each}
        </div>

      </div>
    </div>
  </div>
</div>