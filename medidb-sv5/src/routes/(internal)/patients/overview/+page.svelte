<script lang="ts">
  import ImageCard from "$lib/ImageCard.svelte";
  import { Search } from "flowbite-svelte";

  import dayjs from "dayjs";

  let searchTerm = $state("");

  let { data } = $props();

  console.log("Patients data:", data.patients);

  // your filter thing provided for  convinience
  // // 2. Then, we apply the search filter on those specific patients
  // let filteredItems = $derived(
  //   patients.filter(
  //     (patient) =>
  //       !searchTerm ||
  //       patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //   ),
  // );
  // // Helper to calculate age from DOB string (Spec 3.3.1 requirement)
  // const calculateAge = (dob: string) => dayjs().diff(dayjs(dob), "year");
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
<!-- and the reference code -->
<!-- {#if filteredItems.length > 0}
  <div class="grid grid-cols-4 gap-4">
    {#each filteredItems as patient}
      <a href="/patients/dashboard">
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
{/if} -->
