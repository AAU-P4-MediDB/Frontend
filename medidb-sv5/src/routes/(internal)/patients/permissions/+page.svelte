<!-- TO BE FIXED IN JUNE REVISION -->

<script lang="ts">
  import DoctorPermissionsCard from "$lib/DoctorPermissionsCard.svelte";
  import ToggleCard from "$lib/ToggleCard.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";

  let { data } = $props();

  $effect(() => {
    console.log("permission request", data.permission_requests);
  });
  // State for Write column using the $state rune
  let writeList = $state([
    { label: "Write All", checked: false },
    { label: "Write Prescription", checked: false },
    { label: "Write Journal", checked: false },
    { label: "Write Vitals", checked: false },
    { label: "Write Diagnosis", checked: false },
    { label: "Write Appointments", checked: false },
    { label: "Write Person Info", checked: false },
    { label: "Write Lab Results", checked: false },
  ]);

  // State for Read column using the $state rune
  let readList = $state([
    { label: "Read All", checked: false },
    { label: "Read Prescription", checked: false },
    { label: "Read Journal", checked: false },
    { label: "Read Vitals", checked: false },
    { label: "Read Diagnosis", checked: false },
    { label: "Read Appointments", checked: false },
    { label: "Read Person Info", checked: false },
    { label: "Read Lab Results", checked: false },
  ]);

  /**
   * Handles the Master/Individual toggle logic
   */
  function handleToggleLogic(list: typeof writeList, index: number) {
    if (index === 0) {
      // "All" was toggled - sync everything to its value
      const isAllChecked = list[0].checked;
      for (let i = 1; i < list.length; i++) {
        list[i].checked = isAllChecked;
      }
    } else {
      // Individual item toggled
      if (!list[index].checked) {
        // If one is unchecked, "All" must be unchecked
        list[0].checked = false;
      } else {
        // Check if every item (except index 0) is now checked
        const allOthersChecked = list.slice(1).every((item) => item.checked);
        if (allOthersChecked) {
          list[0].checked = true;
        }
      }
    }
  }
</script>

<div class="grid">
  <!-- Reference logic for the page -->
  <!-- <div>
    {#each patients as patient}
      <DoctorCard pfp={patient.pfp} name={patient.name} />
    {/each}
  </div>-->

  <hr class="border-gray-200 mt-6 mb-8" />

  <div class="grid grid-cols-4 content-between gap-4">
    <div class="">
      <CardOverlay>
        {#each data.permission_requests?.dr_perm_requests as permission}
          <DoctorPermissionsCard
            pt_cpr={permission.pt_cpr}
            note={permission.note}
          />
        {/each}
      </CardOverlay>
    </div>
    <div class="col-span-3">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid grid-cols-1 content-between gap-1">
          {#each writeList as item, i}
            <ToggleCard
              bind:checked={item.checked}
              onUpdate={() => handleToggleLogic(writeList, i)}
            >
              {item.label}
            </ToggleCard>
          {/each}
        </div>
        <div class="grid grid-cols-1 content-between gap-1">
          {#each readList as item, i}
            <ToggleCard
              bind:checked={item.checked}
              onUpdate={() => handleToggleLogic(readList, i)}
            >
              {item.label}
            </ToggleCard>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
