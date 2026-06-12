<!-- for all the settings pages you're on your own, as they function fundamentally different to the rest of the app. I suggest you start with other pages first to  get the grasp of it, and then return to here when you're confident -->
<!-- if you where to experience too many issues, contact @voxvoltera -->

<script lang="ts">
  import { Input, Label, Textarea } from "flowbite-svelte";
  import InputCard from "$lib/InputCard.svelte";
  import { fade } from "svelte/transition";

  // State for the Title
  let activeTitle = $state("");
  
  let { data } = $props();

  // 1. All Form States
  let registrationLocalAdminData = $state({
    name: "",
    password: "",
    email: "",
    clinic: "",
  });
  let registrationClinicData = $state({
    name: "",
    password: "",
    email: "",
    location: "",
  });

  let fetchLocalAdmin = $state({ email: "" });
  let RemoveLocalAdmin = $state({ email: "" });
  let fetchClinic = $state({ email: "" });
  let RemoveClinic = $state({ email: "" });

  // 2. Logic to detect if ANY form is being filled
  // This helper function checks if an object has any values
  const isDirty = (obj: Record<string, any>) =>
    Object.values(obj).some((v) =>
      typeof v === "string" ? v.length > 0 : !!v,
    );

  let hasData = $derived(
    isDirty(registrationLocalAdminData) ||
      isDirty(registrationClinicData) ||
      isDirty(fetchLocalAdmin) ||
      isDirty(RemoveLocalAdmin) ||
      isDirty(fetchClinic) ||
      isDirty(RemoveClinic),
  );

  // 3. Helper to switch titles based on where the user is typing
  function setActive(title: string) {
    activeTitle = title;
  }
</script>

{#snippet registrationLocalAdminFields()}
  <Input
    placeholder="Name"
    bind:value={registrationLocalAdminData.name}
    onfocus={() => setActive("Create Local Admin")}
  />
  <Input
    placeholder="Password"
    bind:value={registrationLocalAdminData.password}
    onfocus={() => setActive("Create Local Admin")}
  />
  <Input
    placeholder="Email"
    bind:value={registrationLocalAdminData.email}
    onfocus={() => setActive("Create Local Admin")}
  />
  <Input
    placeholder="Clinic"
    bind:value={registrationLocalAdminData.clinic}
    onfocus={() => setActive("Create Local Admin")}
  />
{/snippet}

{#snippet registrationClinicFields()}
  <Input
    placeholder="Name"
    bind:value={registrationClinicData.name}
    onfocus={() => setActive("Create Clinic")}
  />
  <Input
    placeholder="Password"
    bind:value={registrationClinicData.password}
    onfocus={() => setActive("Create Clinic")}
  />
  <Input
    placeholder="Email"
    bind:value={registrationClinicData.email}
    onfocus={() => setActive("Create Clinic")}
  />
  <Input
    placeholder="Location"
    bind:value={registrationClinicData.location}
    onfocus={() => setActive("Create Clinic")}
  />
{/snippet}

{#snippet fetchLocalAdminFields()}
  <Input
    placeholder="Email"
    bind:value={fetchLocalAdmin.email}
    onfocus={() => setActive("Fetch Local Admin")}
  />
{/snippet}

{#snippet removeLocalAdminFields()}
  <Input
    placeholder="Email"
    bind:value={RemoveLocalAdmin.email}
    onfocus={() => setActive("Remove Local Admin")}
  />
{/snippet}

{#snippet fetchClinicFields()}
  <Input
    placeholder="Email"
    bind:value={fetchClinic.email}
    onfocus={() => setActive("Fetch Clinic")}
  />
{/snippet}

{#snippet removeClinicFields()}
  <Input
    placeholder="Email"
    bind:value={RemoveClinic.email}
    onfocus={() => setActive("Remove Clinic")}
  />
{/snippet}

<div class="grid grid-flow-col grid-cols-4 grid-rows-2 gap-4">
  <div class="">
    <InputCard
      title="Create Local Admin"
      buttonText="Create Local Admin"
      fields={registrationLocalAdminFields}
      onsubmit={() => {}}
    />
  </div>
  <div class="">
    <InputCard
      title="Create Clinic"
      buttonText="Create Clinic"
      fields={registrationClinicFields}
      onsubmit={() => {}}
    />
  </div>
  <div class="">
    <InputCard
      title="Fetch Local Admin"
      buttonText="Fetch Local Admin"
      fields={fetchLocalAdminFields}
      onsubmit={() => {}}
    />
  </div>
  <div class="">
    <InputCard
      title="Fetch Clinic"
      buttonText="Fetch Clinic"
      fields={fetchClinicFields}
      onsubmit={() => {}}
    />
  </div>
  <div class="">
    <InputCard
      title="Remove Local Admin"
      buttonText="Remove Local Admin"
      fields={removeLocalAdminFields}
      onsubmit={() => {}}
    />
  </div>
  <div class="">
    <InputCard
      title="Remove Clinic"
      buttonText="Remove Clinic"
      fields={removeClinicFields}
      onsubmit={() => {}}
    />
  </div>
  <div
    class="col-span-2 row-span-2 p-6 bg-white rounded-xl shadow-md border border-gray-100"
  >
    <h3 class="text-gray-400 font-bold mb-4 uppercase text-xs">Output</h3>

    {#if hasData}
      <div transition:fade>
        <p class="mb-4"><strong>Title:</strong> {activeTitle}</p>

        <div class="grid grid-cols-1 gap-y-4 text-sm">
          {#if activeTitle === "Create Local Admin"}
            <div class=" gap-2">
              <span class="text-gray-400">Name:</span>
              {registrationLocalAdminData.name}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Password:</span>
              {registrationLocalAdminData.password}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Email:</span>
              {registrationLocalAdminData.email}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Clinic:</span>
              {registrationLocalAdminData.clinic}
            </div>
          {:else if activeTitle === "Create Clinic"}
            <div class=" gap-2">
              <span class="text-gray-400">Name:</span>
              {registrationClinicData.name}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Password:</span>
              {registrationClinicData.password}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Email:</span>
              {registrationClinicData.email}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Location:</span>
              {registrationClinicData.location}
            </div>
          {:else if activeTitle === "Fetch Local Admin"}
            <div class=" gap-2">
              <span class="text-gray-400">Email:</span>
              {fetchLocalAdmin.email}
            </div>
          {:else if activeTitle === "Remove Local Admin"}
            <div class="   gap-2">
              <span class="text-gray-400">Email:</span>
              {RemoveLocalAdmin.email}
            </div>
          {:else if activeTitle === "Fetch Clinic"}
            <div class=" gap-2">
              <span class="text-gray-400">Email:</span>
              {fetchClinic.email}
            </div>
          {:else if activeTitle === "Remove Clinic"}
            <div class="   gap-2">
              <span class="text-gray-400">Email:</span>
              {RemoveClinic.email}
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <div
        class="flex items-center justify-center h-32 border-2 border-dashed border-gray-100 rounded-lg"
      >
        <p class="text-gray-300 italic text-sm">
          Fill out a form to see the output preview
        </p>
      </div>
    {/if}
  </div>
</div>
