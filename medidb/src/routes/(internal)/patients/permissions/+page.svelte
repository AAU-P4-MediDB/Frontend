<script lang="ts">
  import { Card, Toggle } from "flowbite-svelte";
  import ImageCard from "$lib/ImageCard.svelte";

  const patients = [{
    title: "Chef",
    name: "John Cena",
    gender: "Male",
    age: "45",
    imageUrl: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2b06880c98",
  }];
</script>

<div class="flex h-screen gap-10 p-4 px-20 max-w-[1000px] mx-auto overflow-hidden">
  <!-- Left column ~1/4 -->
  <div class="flex flex-col gap-4 w-64 shrink-0 overflow-y-auto">
    {#each patients as patient}
      <ImageCard
        title={patient.title}
        imageUrl={patient.imageUrl}
        name={patient.name}
        gender={patient.gender}
        age={patient.age}
      />
    {/each}

    <Card href="/cards" class="p-4 cursor-pointer">
      <h5 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Dr. Elias Thornbridge</h5>
      <p class="text-sm text-gray-500 dark:text-gray-400">Full read access</p>
    </Card>
    <Card href="/cards" class="p-4 cursor-pointer">
      <h5 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Dr. Marissa Vale</h5>
      <p class="text-sm text-gray-500 dark:text-gray-400">Read/write prescriptions</p>
    </Card>
    <Card href="/cards" class="p-4 cursor-pointer">
      <h5 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Dr. Quentin Harlow</h5>
      <p class="text-sm text-gray-500 dark:text-gray-400">Read diagnosis, anonymous</p>
    </Card>
    <Card href="/cards" class="p-4 cursor-pointer">
      <h5 class="mb-1 text-lg font-bold text-gray-900 dark:text-white">Dr. Lila Ravenscroft</h5>
      <p class="text-sm text-gray-500 dark:text-gray-400">Read/write blood lab</p>
    </Card>
  </div>

  <!-- Right column ~3/4 — permission card fills all remaining space -->
  <Card class="flex-1 p-8 max-h-[500px] !max-w-none overflow-y-auto">
    <div class="grid grid-cols-2 gap-x-16 gap-y-6">
      <Toggle>Write All</Toggle>
      <Toggle>Read All</Toggle>
      <Toggle>Write Prescription</Toggle>
      <Toggle>Read Prescription</Toggle>
      <Toggle>Write Journal</Toggle>
      <Toggle>Read Journal</Toggle>
      <Toggle>Write Vitals</Toggle>
      <Toggle>Read Vitals</Toggle>
      <Toggle>Write Diagnosis</Toggle>
      <Toggle>Read Diagnosis</Toggle>
      <Toggle>Write Appointments</Toggle>
      <Toggle>Read Appointments</Toggle>
      <Toggle>Write Person Info</Toggle>
      <Toggle>Read Person Info</Toggle>
      <Toggle>Write Lab Results</Toggle>
      <Toggle>Read Lab Results</Toggle>
    </div>
  </Card>
</div>