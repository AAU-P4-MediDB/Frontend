<!-- This page is fucked, and i have no clue why. probably some unknown css issues -->

<script>
  import CyanButton from "$lib/CyanButton.svelte";
  import DefaultButton from "$lib/DefaultButton.svelte";
  import GreyButton from "$lib/GreyButton.svelte";

  import DoctorCard from "$lib/DoctorCard.svelte";

  const users = [
    {
      title: "Pirate",
      name: "Emma Nielsen",
      gender: "Female",
      age: "22",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba15f58c562b",
    },
    {
      title: "Chef",
      name: "John Cena",
      gender: "Male",
      age: "45",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2b06880c98",
    },
  ];
</script>

<div class="grid grid-cols-3 gap-4">
  <div class="...">
    <div class="h2">System Settings</div>
    {#each users as user}
      <DoctorCard imageUrl={user.imageUrl} name={user.name} />
    {/each}
  </div>
  <div class="col-span-2 ...">
    <div class="grid grid-cols-4 gap-4">
      <div class="...">
        <GreyButton href="/patients/dashboard">Patients</GreyButton>
      </div>
      <div class="...">
        <GreyButton href="/calendar">Calendar</GreyButton>
      </div>
      <div class="...">
        <GreyButton href="/login">Test results</GreyButton>
      </div>
      <div class="...">
        <GreyButton href="/login">Permissions</GreyButton>
      </div>
    </div>
  </div>
</div>
