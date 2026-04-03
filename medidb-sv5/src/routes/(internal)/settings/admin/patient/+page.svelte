<script lang="ts">
  import { Input, Label, Textarea } from "flowbite-svelte";
  import InputCard from "$lib/InputCard.svelte";
  import { fade } from "svelte/transition";

  // State for the Title
  let activeTitle = $state("");

  // 1. All Form States
  let registrationData = $state({
    name: "",
    pronouns: "",
    cpr: "",
    weight: "",
    diagnoses: "",
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
    onfocus={() => setActive("Patient Registration")}
  />
  <Input
    placeholder="Pronouns"
    bind:value={registrationData.pronouns}
    onfocus={() => setActive("Patient Registration")}
  />
  <Input
    placeholder="CPR"
    bind:value={registrationData.cpr}
    onfocus={() => setActive("Patient Registration")}
  />
  <Input
    placeholder="Weight"
    bind:value={registrationData.weight}
    onfocus={() => setActive("Patient Registration")}
  />
  <Textarea
    placeholder="Diagnoses"
    class="w-full"
    bind:value={registrationData.diagnoses}
    onfocus={() => setActive("Patient Registration")}
  />
{/snippet}

{#snippet fetchFields()}
  <Input
    placeholder="CPR"
    bind:value={fetchData.cpr}
    onfocus={() => setActive("Fetch Patient")}
  />
  <Input
    placeholder="Email"
    bind:value={fetchData.email}
    onfocus={() => setActive("Fetch Patient")}
  />
{/snippet}

{#snippet assignFields()}
  <Input
    placeholder="CPR"
    bind:value={assignData.cpr}
    onfocus={() => setActive("Assign Patient")}
  />
  <Input
    placeholder="Doctor's Email"
    bind:value={assignData.doctorEmail}
    onfocus={() => setActive("Assign Patient")}
  />
{/snippet}

{#snippet removeFields()}
  <Input
    placeholder="CPR"
    bind:value={removeData.cpr}
    onfocus={() => setActive("Remove Patient")}
  />
  <Input
    placeholder="Email"
    bind:value={removeData.email}
    onfocus={() => setActive("Remove Patient")}
  />
{/snippet}

<div class="grid grid-flow-col grid-rows-2 gap-6">
  <div class="row-span-3 ...">
    <InputCard
      title="Patient registration"
      buttonText="Register Patient"
      onsubmit={() => {}}
      fields={registrationFields}
    />
  </div>

  <div class="col-span-2 ...">
    <div class="grid grid-cols-3 gap-6">
      <div class="...">
        <InputCard
          title="Fetch patient"
          buttonText="Fetch Patient"
          fields={fetchFields}
          onsubmit={() => {}}
        />
      </div>
      <div class="...">
        <InputCard
          title="Assign patient"
          buttonText="Assign/Confirm"
          fields={assignFields}
          onsubmit={() => {}}
        />
      </div>
      <div class="...">
        <InputCard
          title="Remove patient"
          buttonText="Remove patient"
          fields={removeFields}
          onsubmit={() => {}}
        />
      </div>
    </div>
  </div>
  <div
    class="col-span-2 row-span-2 p-6 bg-white rounded-xl shadow-md border border-gray-100"
  >
    <h3 class="text-gray-400 font-bold mb-4 uppercase text-xs tracking-widest">
      Output
    </h3>

    {#if hasData}
      <div transition:fade>
        <p class="mb-4"><strong>Title:</strong> {activeTitle}</p>

        <div class="grid grid-cols-2 gap-y-4 text-sm">
          {#if activeTitle === "Patient Registration"}
            <div class="flex gap-2">
              <span class="text-gray-400">Name:</span>
              {registrationData.name}
            </div>
            <div class="flex gap-2">
              <span class="text-gray-400">Pronouns:</span>
              {registrationData.pronouns}
            </div>
            <div class="flex gap-2">
              <span class="text-gray-400">CPR:</span>
              {registrationData.cpr}
            </div>
            <div class="flex gap-2">
              <span class="text-gray-400">Weight:</span>
              {registrationData.weight}
            </div>
            <div class="flex gap-2">
              <span class="text-gray-400">Diagnoses:</span>
              {registrationData.diagnoses}
            </div>
          {:else if activeTitle === "Fetch Patient"}
            <div class="flex gap-2">
              <span class="text-gray-400">CPR:</span>
              {fetchData.cpr}
            </div>
            <div class="flex gap-2">
              <span class="text-gray-400">Email:</span>
              {fetchData.email}
            </div>
          {:else if activeTitle === "Assign Patient"}
            <div class="flex gap-2">
              <span class="text-gray-400">CPR:</span>
              {assignData.cpr}
            </div>
            <div class="flex gap-2">
              <span class="text-gray-400">Doctor:</span>
              {assignData.doctorEmail}
            </div>
          {:else if activeTitle === "Remove Patient"}
            <div class="flex gap-2">
              <span class="text-gray-400">CPR:</span>
              {removeData.cpr}
            </div>
            <div class="flex gap-2">
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
