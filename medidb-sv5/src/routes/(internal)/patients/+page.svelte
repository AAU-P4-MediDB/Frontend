<script lang="ts">
  import ImageCard from "$lib/ImageCard.svelte";
  import { Search } from "flowbite-svelte";
  import { session } from "$lib/services/session.svelte";
  import { MOCK_PATIENTS } from "$lib/mocks/patients";
  import dayjs from "dayjs";

  let searchTerm = $state("");

  // 1. First, we identify which patients belong to the current doctor
  // Using Svelte 5 $derived to keep it reactive

  // did someone use ai and forget to remove the comments?
  let assignedPatients = $derived(
    MOCK_PATIENTS.filter((p) => p.doctor === session.user?.uuid),
  );

  // 2. Then, we apply the search filter on those specific patients
  let filteredItems = $derived(
    assignedPatients.filter(
      (patient) =>
        !searchTerm ||
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  // Helper to calculate age from DOB string (Spec 3.3.1 requirement)
  const calculateAge = (dob: string) => dayjs().diff(dayjs(dob), "year");
</script>

<div class="mb-6">
  <h2 class="text-xl font-semibold text-gray-700 mb-2">My Assigned Patients</h2>
  <Search
    size="md"
    clearable
    bind:value={searchTerm}
    placeholder="Search by name..."
  />
</div>

<hr class="border-gray-200 my-6" />

{#if filteredItems.length > 0}
  <div class="grid grid-cols-4 gap-4">
    {#each filteredItems as patient}
      <a href="/patients/dashboard/{patient.uuid}">
        <ImageCard
          name={patient.name}
          pronouns={patient.pronouns}
          age={calculateAge(patient.dob).toString()}
          pfp={patient.pfp}
        /></a
      >
    {/each}
  </div>
{:else}
  <div
    class="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
  >
    <p class="text-gray-500">No patients found matching your criteria.</p>
  </div>
{/if}
