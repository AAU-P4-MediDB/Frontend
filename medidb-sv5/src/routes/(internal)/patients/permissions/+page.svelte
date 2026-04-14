<script lang="ts">
  import { Card, Toggle, Label, Input, Checkbox } from "flowbite-svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import DoctorPermissionsCard from "$lib/DoctorPermissionsCard.svelte";
  import ToggleCard from "$lib/ToggleCard.svelte";
  
  let { data } = $props();

  // State for Write column
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

  // State for Read column
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
   * Logic to handle Master Toggles
   * @param list The array to modify (writeList or readList)
   * @param index The index of the item clicked
   */
  function handleToggleLogic(list: typeof writeList, index: number) {
    // If we clicked "All" (index 0)
    if (index === 0) {
      // We use the current state of the "All" toggle
      const isAllChecked = list[0].checked;

      // Force every other item to match it exactly
      for (let i = 1; i < list.length; i++) {
        list[i].checked = isAllChecked;
      }
    } else {
      // Logic for individual toggles:
      // If any individual item is unchecked, "All" cannot be checked
      if (!list[index].checked) {
        list[0].checked = false;
      } else {
        // If every single individual item is now checked, turn "All" on
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
  </div>

  <hr class="border-gray-200 mt-6 mb-8" />

  <div class="grid grid-cols-4 content-between gap-4">
    <div class="">
      {#each doctorPermissions as permission}
        <DoctorPermissionsCard
          name={permission.name}
          permission_type={permission.permission_type}
        />
      {/each}
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
  </div> -->
</div>
