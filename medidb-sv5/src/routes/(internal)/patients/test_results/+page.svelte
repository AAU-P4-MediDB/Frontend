<script lang="ts">
  import { Card } from "flowbite-svelte";
  import ImageCard from "$lib/ImageCard.svelte";
  import { Search } from "flowbite-svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";

  let searchTerm = $state("");
  let { data } = $props();

  $effect(() => {
    console.log("patients", data.patients);
    console.log("testResults", data.testResults);
  });

  let filteredPatients = $derived(
    (data.patients?.data ?? []).filter(
      (p: { name: string }) =>
        !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  // State for the selected patient
  let selectedPatient = $state(null);
  let selectedTestResult = $state(null);

  // Helper function to handle the click
  function selectPatient(patient: any) {
    selectedPatient = selectedPatient?.name === patient.name ? null : patient;
  }
  function selectTestResult(testResult: any) {
    selectedTestResult = testResult;
  }
</script>

<div class="grid">
  <Search
    size="md"
    clearable
    bind:value={searchTerm}
    placeholder="Search by name"
  />
  <!-- Reference logic for the page -->

  <hr class="border-gray-200 mt-6 mb-8" />

  <div class="grid grid-cols-4 grid-flow-col grid-rows-4 gap-4 h-150">
    <div class="row-span-4">
      {#if filteredPatients.length > 0}
        <div class="grid grid-cols-1 gap-4">
          {#each filteredPatients as patient}
            <button
              type="button"
              class="text-left transition-transform hover:scale-102 focus:outline-none {selectedPatient?.name === patient.name ? '' : 'opacity-50'}"
              onclick={() => selectPatient(patient)}
            >
              <!--<a href="/patients/dashboard/{patient.cpr}"> Hvis patienten linkes gennem cpr nummer-->
              <div class="{selectedPatient?.name === patient.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''}">
                <ImageCard
                  name={patient.name}
                  pronouns={patient.pronouns}
                  birthdate={patient.birthdate}
                  pfp={patient.pfp}
                />
              </div>
            </button>
          {/each}
        </div>
      {:else}
        <div
          class="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
        >
          <p class="text-gray-500">No patients found matching your criteria.</p>
        </div>
      {/if}
    </div>

    <div class="col-span-1">
      <CardOverlay>
        <div class="font-sm">Subject</div>
        {#if selectedPatient}
          <div class="text-md font-light">{selectedPatient.name}</div>
          <div class="text-md font-light">CPR: {selectedPatient.cpr}</div>
          <div class="text-md font-light">
            Birthday: {selectedPatient.birthdate || selectedPatient.bday}
          </div>
        {:else}
          <div class="font-sm font-light">Select a patient to view details</div>
        {/if}
      </CardOverlay>
    </div>

    <div class="col-span-1 row-span-3">
      <CardOverlay>
        {#each data.testResults?.lab_results as testResult}
          <button
            type="button"
            class="text-left transition-transform w-full hover:scale-102 focus:outline-none"
            onclick={() => selectTestResult(testResult)}
          >
            <div class="text-md">Test Info</div>
            <div class="font-light mb-2">{testResult.test}</div>
            <div class="font-light mb-2">{testResult.notes}</div>
          </button>
        {/each}
      </CardOverlay>
    </div>

    <div class="row-span-4 col-span-5">
      <CardOverlay>
        {#if selectedTestResult}
          <div class="mb-4 border-b pb-4">
            <h2 class="text-xl font-bold text-gray-800">
              {selectedTestResult.test}
            </h2>
            <p class="text-sm text-gray-500 italic">
              Ordered by: {selectedTestResult.ordered_by}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            {#each Object.entries(selectedTestResult.results) as [key, details]}
              <div
                class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span class="text-sm font-semibold text-gray-700">{key}</span>
                  {#if details.ref}
                    <span class="block text-xs text-gray-400"
                      >Ref: {details.ref}</span
                    >
                  {/if}
                </div>

                <div class="text-right">
                  <span
                    class="text-lg font-mono font-bold {details.flag
                      ? 'text-red-600'
                      : 'text-gray-900'}"
                  >
                    {details.value}
                  </span>
                  <span class="text-xs text-gray-500 ml-1">{details.unit}</span>

                  {#if details.flag}
                    <span
                      class="block text-[10px] font-bold uppercase text-red-500"
                      >{details.flag}</span
                    >
                  {/if}
                </div>
              </div>
            {/each}
          </div>

          {#if selectedTestResult.notes}
            <div
              class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800"
            >
              <strong>Clinical Notes:</strong>
              {selectedTestResult.notes}
            </div>
          {/if}
        {:else}
          <div
            class="h-64 flex flex-col items-center justify-center text-gray-400"
          >
            <p>Please select a lab result from the list to view details.</p>
          </div>
        {/if}</CardOverlay
      >
    </div>
  </div>
</div>

<!-- well the reference isn't less placeholdery than this, so you're on your own ;) -->
<!--
<div
  class="flex h-screen gap-6 p-6 max-w-300 mx-auto overflow-hidden bg-gray-50"
>
  <div class="flex flex-col gap-4 w-80 shrink-0 overflow-y-auto pr-2">
    <Card href="#" class="p-4">
      <h5 class="mb-1 text-lg font-bold text-gray-900">John Cena</h5>
      <p class="text-sm text-gray-600">Blood Test - 04/10/2026</p>
      <p class="text-sm text-gray-500">Status: Definitive</p>
    </Card>

    <Card href="#" class="p-4 opacity-60">
      <h5 class="mb-1 text-lg font-bold text-gray-900">John Cena</h5>
      <p class="text-sm text-gray-600">Blood Test - 04/10/2026</p>
      <p class="text-sm text-gray-500">Status: Definitive</p>
    </Card>
  </div>

  <div
    class="flex-1 bg-white rounded-xl border border-gray-200 p-8 overflow-y-auto shadow-sm"
  >
    <h2 class="text-xl font-bold mb-6 text-gray-800">Information</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex flex-col gap-6">
        <div class="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
          <h3 class="font-bold mb-4">Subject</h3>
          <p class="text-gray-700">John Cena</p>
          <p class="text-gray-700">45yrs</p>
          <p class="text-gray-700">Male</p>
        </div>

        <div class="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
          <h3 class="font-bold mb-4">Test Info</h3>
          <p class="text-gray-700">Blood test</p>
          <p class="text-gray-700">07/10/2026 - Definitive</p>
          <p class="text-gray-700">04/10/2026 - Dr. Vanna Bardot</p>
        </div>
      </div>

      <div class="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
        <h3 class="font-bold mb-4">Results</h3>
        <div class="text-gray-600 space-y-4 text-sm leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat.
          </p>
          <p>
            In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
            sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus
            bibendum egestas.
          </p>
          <p>
            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>-->
