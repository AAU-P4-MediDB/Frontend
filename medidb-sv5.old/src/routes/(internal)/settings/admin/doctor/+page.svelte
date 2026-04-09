<script lang="ts">
  import { Input, Label, Textarea } from "flowbite-svelte";
  import InputCard from "$lib/InputCard.svelte";
  import { fade } from "svelte/transition";

  // State for the Title
  let activeTitle = $state("");

  // 1. All Form States
  let registrationData = $state({
    name: "",
    password: "",
    email: "",
    clinic: "",
    position: "",
  });
  let fetchData = $state({ cpr: "", email: "" });
  let assignData = $state({ cpr: "", doctorEmail: "" });
  let removeData = $state({ cpr: "", email: "" });

  // 2. Logic to detect if ANY form is being filled
  // This helper function checks if an object has any values
  const isDirty = (obj: Record<string, any>) =>
    Object.values(obj).some((v) =>
      typeof v === "string" ? v.length > 0 : !!v,
    );

  let hasData = $derived(
    isDirty(registrationData) ||
      isDirty(fetchData) ||
      isDirty(assignData) ||
      isDirty(removeData),
  );

  // 3. Helper to switch titles based on where the user is typing
  function setActive(title: string) {
    activeTitle = title;
  }
</script>

{#snippet registrationFields()}
  <Input
    placeholder="Name"
    bind:value={registrationData.name}
    onfocus={() => setActive("Doctor Registration")}
  />
  <Input
    placeholder="Password"
    bind:value={registrationData.password}
    onfocus={() => setActive("Doctor Registration")}
  />
  <Input
    placeholder="Email"
    bind:value={registrationData.email}
    onfocus={() => setActive("Doctor Registration")}
  />
  <Input
    placeholder="Clinic"
    bind:value={registrationData.clinic}
    onfocus={() => setActive("Doctor Registration")}
  />
  <Input
    placeholder="Position"
    bind:value={registrationData.position}
    onfocus={() => setActive("Doctor Registration")}
  />
{/snippet}

{#snippet fetchFields()}
  <Input
    placeholder="CPR"
    bind:value={fetchData.cpr}
    onfocus={() => setActive("Fetch Doctor")}
  />
  <Input
    placeholder="Email"
    bind:value={fetchData.email}
    onfocus={() => setActive("Fetch Doctor")}
  />
{/snippet}

{#snippet removeFields()}
  <Input
    placeholder="CPR"
    bind:value={removeData.cpr}
    onfocus={() => setActive("Remove Doctor")}
  />
  <Input
    placeholder="Email"
    bind:value={removeData.email}
    onfocus={() => setActive("Remove Doctor")}
  />
{/snippet}

<div class="grid grid-flow-col grid-cols-3 grid-rows-2 gap-4">
  <div class="row-span-2">
    <InputCard
      title="Doctor registration"
      buttonText="Register Doctor"
      onsubmit={() => {}}
      fields={registrationFields}
    />
  </div>
  <div class="">
    <InputCard
      title="Fetch Doctor"
      buttonText="Fetch Doctor"
      fields={fetchFields}
      onsubmit={() => {}}
    />
  </div>
  <div class="">
    <InputCard
      title="Remove Doctor"
      buttonText="Remove Doctor"
      fields={removeFields}
      onsubmit={() => {}}
    />
  </div>
  <div
    class="col-span-2 row-span-2 p-6 bg-white rounded-xl shadow-md border border-gray-100"
  >
    <h3 class="text-gray-400 font-bold mb-4 uppercase text-xs ">
      Output
    </h3>

    {#if hasData}
      <div transition:fade>
        <p class="mb-4"><strong>Title:</strong> {activeTitle}</p>

        <div class="grid grid-cols-1 gap-y-4 text-sm">
          {#if activeTitle === "Doctor Registration"}
            <div class=" gap-2">
              <span class="text-gray-400">Name:</span>
              {registrationData.name}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Password:</span>
              {registrationData.password}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Email:</span>
              {registrationData.email}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Clinic:</span>
              {registrationData.clinic}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Position:</span>
              {registrationData.position}
            </div>
          {:else if activeTitle === "Fetch Doctor"}
            <div class=" gap-2">
              <span class="text-gray-400">CPR:</span>
              {fetchData.cpr}
            </div>
            <div class=" gap-2">
              <span class="text-gray-400">Email:</span>
              {fetchData.email}
            </div>
          {:else if activeTitle === "Remove Doctor"}
            <div class=" gap-2">
              <span class="text-gray-400">CPR:</span>
              {removeData.cpr}
            </div>
            <div class="   gap-2">
              <span class="text-gray-400">Email:</span>
              {removeData.email}
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
