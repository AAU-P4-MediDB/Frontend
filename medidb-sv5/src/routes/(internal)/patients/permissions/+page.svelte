<script lang="ts">
  import DoctorPermissionsCard from "$lib/DoctorPermissionsCard.svelte";
  import ToggleCard from "$lib/ToggleCard.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";

  let { data } = $props();

  let selectedCprs = $state<Record<string, boolean>>({});

  function toggleSelection(cpr: string) {
    selectedCprs[cpr] = !selectedCprs[cpr];
  }

  let assignDoctorId = $state("");

  // ── Per-request toggle state ──────────────────────────────────────────────
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

  let requestStates = $state(
    (data.permission_requests?.dr_perm_requests ?? []).map(() => ({
      writeList: makeWriteList(),
      readList: makeReadList(),
    }))
  );

  let selectedIndex = $state<number | null>(null);

  let activeWrite = $derived(
    selectedIndex !== null ? requestStates[selectedIndex].writeList : makeWriteList()
  );
  let activeRead = $derived(
    selectedIndex !== null ? requestStates[selectedIndex].readList : makeReadList()
  );

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

    <div>
      <CardOverlay>
        {#each data.permission_requests?.dr_perm_requests as permission, i}
          <div class="flex items-start gap-2 p-1">
            <input
              type="checkbox"
              checked={selectedCprs[permission.pt_cpr] ?? false}
              onchange={() => toggleSelection(permission.pt_cpr)}
              class="mt-3 h-4 w-4 cursor-pointer accent-blue-600"
            />
            <button
              type="button"
              onclick={() => (selectedIndex = selectedIndex === i ? null : i)}
              class="flex-1 text-left rounded-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                {selectedIndex === i
                  ? 'border-blue-500 bg-white shadow-md ring-1 ring-blue-500'
                  : 'border-gray-200 bg-gray-100 opacity-50 hover:opacity-75'}"
            >
              <DoctorPermissionsCard
                pt_cpr={permission.pt_cpr}
                note={permission.note}
              />
            </button>
          </div>
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

      <hr class="border-gray-200 my-6" />

      <form method="POST" action="?/assign" data-sveltekit-reload>
        <input
          type="hidden"
          name="pt_cprs"
          value={JSON.stringify(Object.keys(selectedCprs).filter(cpr => selectedCprs[cpr]))}
        />

        <div class="flex items-end gap-4">
          <div class="flex-1">
            <label
              for="assign-doctor"
              class="mb-1 block text-sm font-medium text-gray-700"
            >
              Assign selected patients to
            </label>
            <select
              id="assign-doctor"
              name="dr_uuid"
              bind:value={assignDoctorId}
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Choose a doctor...</option>
              {#each data.doctors as doctor}
                <option value={doctor.uuid}>{doctor.name}</option>
              {/each}
            </select>
          </div>

          <button
            type="submit"
            disabled={Object.keys(selectedCprs).length === 0 || !assignDoctorId}
            class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Assign
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
