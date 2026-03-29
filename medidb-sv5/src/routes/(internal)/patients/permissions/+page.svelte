<script lang="ts">
  import { Card, Toggle, Label, Input, Checkbox } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import ImageCard from "$lib/ImageCard.svelte";
  const patients = [{
  title: "Chef",
  name: "John Cena",
  gender: "Male",
  age: "45",
  imageUrl:
    "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2b06880c98",
}]
</script>

<div>{#each patients as patient}
  <ImageCard
    title={patient.title}
    imageUrl={patient.imageUrl}
    name={patient.name}
    gender={patient.gender}
    age={patient.age}
  />
{/each}</div>
<div>
  <div class="grid grid-cols-4 m-4 px-20">
    <div>
      <Card href="/cards" class="p-4 sm:p-6 md:p-8">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dr. Elias Thornbridge</h5>
        <p class="leading-tight font-normal text-gray-700 dark:text-gray-400">Full read access</p>
      </Card>
      <Card href="/cards" class="p-4 sm:p-6 md:p-8">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dr. Marissa Vale</h5>
        <p class="leading-tight font-normal text-gray-700 dark:text-gray-400">Read/write presciptions</p>
      </Card>
      <Card href="/cards" class="p-4 sm:p-6 md:p-8">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dr. Quentin Harlow</h5>
        <p class="leading-tight font-normal text-gray-700 dark:text-gray-400">Read diagnosis, anonymous</p>
      </Card>
      <Card href="/cards" class="p-4 sm:p-6 md:p-8">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dr. Lila Ravenscroft</h5>
        <p class="leading-tight font-normal text-gray-700 dark:text-gray-400">Read/write blood lab</p>
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