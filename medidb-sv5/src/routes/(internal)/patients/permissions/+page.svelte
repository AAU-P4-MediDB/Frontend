<script lang="ts">
  import { Card, Toggle, Label, Input, Checkbox } from "flowbite-svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import DoctorPermissionsCard from "$lib/DoctorPermissionsCard.svelte";
  import ToggleCard from "$lib/ToggleCard.svelte";

  const patients = [
    {
      title: "John Cena",
      name: "John Cena",
      gender: "Male",
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2b06880c98",
    },
  ];
  const doctorPermissions = [
    {
      uuid: "dr-001",
      name: "Elias Thornbridge",
      perm_int: 1,
      permission_type: "Full read access",
    },
    {
      uuid: "dr-002",
      name: "Marissa Vale",
      perm_int: 2,
      permission_type: "Read/Write perscriptions",
    },
    {
      uuid: "dr-003",
      name: "Quentin Harlow",
      perm_int: 3,
      permission_type: "Read diagnosis, anonymous",
    },
    {
      uuid: "dr-004",
      name: "Lila Ravenscroft",
      perm_int: 4,
      permission_type: "Blod lab r/w",
    },
  ]; // State for Write column
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
  <div>
    {#each patients as patient}
      <DoctorCard pfp={patient.pfp} name={patient.name} />
    {/each}
  </div>

  <hr class="border-gray-200 mt-6 mb-8" />
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-1">
      {#each doctorPermissions as permission}
        <DoctorPermissionsCard
          name={permission.name}
          permission_type={permission.permission_type}
        />
      {/each}
    </div>
    <div class="flex flex-col">
      {#each writeList as item, i}
        <ToggleCard
          bind:checked={item.checked}
          onUpdate={() => handleToggleLogic(writeList, i)}
        >
          {item.label}
        </ToggleCard>
      {/each}
    </div>

    <div class="flex flex-col">
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

  <div>
    <div class="grid grid-cols-4 m-4 px-20">
      <div>
        <Card href="/cards" class="p-4 sm:p-6 md:p-8">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Dr. Elias Thornbridge
          </h5>
          <p class="leading-tight font-normal text-gray-700 dark:text-gray-400">
            Full read access
          </p>
        </Card>
        <Card href="/cards" class="p-4 sm:p-6 md:p-8">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Dr. Marissa Vale
          </h5>
          <p class="leading-tight font-normal text-gray-700 dark:text-gray-400">
            Read/write presciptions
          </p>
        </Card>
        <Card href="/cards" class="p-4 sm:p-6 md:p-8">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Dr. Quentin Harlow
          </h5>
          <p class="leading-tight font-normal text-gray-700 dark:text-gray-400">
            Read diagnosis, anonymous
          </p>
        </Card>
        <Card href="/cards" class="p-4 sm:p-6 md:p-8">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Dr. Lila Ravenscroft
          </h5>
          <p class="leading-tight font-normal text-gray-700 dark:text-gray-400">
            Read/write blood lab
          </p>
        </Card>
      </div>
      <div class="flex col-start-2 col-span-3 justify-start items-start mt-4">
        <Card class="w-full p-4 sm:p-6 md:p-8 flex justify-center items-center">
          <div class="grid grid-cols-2 gap-y-6 gap-x-6 w-full max-w-none">
            <Toggle>Write all</Toggle>
            <Toggle>Read all</Toggle>
            <Toggle>Write prescriptions</Toggle>
            <Toggle>Read prescriptions</Toggle>
            <Toggle>Write journal</Toggle>
            <Toggle>Read journal</Toggle>
            <Toggle>Write vitals</Toggle>
            <Toggle>Read vitals</Toggle>
            <Toggle>Write diagnosis</Toggle>
            <Toggle>Read diagnosis</Toggle>
            <Toggle>Write appointments</Toggle>
            <Toggle>Read appointments</Toggle>
            <Toggle>Write person info</Toggle>
            <Toggle>Read person info</Toggle>
            <Toggle>Write lab results</Toggle>
            <Toggle>Read lab results</Toggle>
          </div>
        </Card>
      </div>
    </div>
  </div>
</div>
