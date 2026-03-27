<script lang="ts">
  import { Card, Button, Label, Input, Checkbox } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  import CyanButton from "$lib/CyanButton.svelte";
  import DefaultButton from "$lib/DefaultButton.svelte";
  import GreyButton from "$lib/GreyButton.svelte";

  import CardOverlay from "$lib/CardOverlay.svelte";
  import ImageCard from "$lib/ImageCard.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";

  const patients = [
    {
      title: "Pirate",
      name: "Emma Nielsen",
      gender: "Female",
      age: "22",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba15f58c562b",
    },
  ];
  const notifications = [
    {
      date: "Mar 2026",
      title: "EKG",
      description: "No heartrate detected",
      status: "red",
    },
    {
      date: "June 2026",
      title: "Ultrasound",
      description: "No baby detected",
      status: "red",
    },
    {
      date: "Aug 2026",
      title: "EKG",
      description: "Heartrate detected",
      status: "blue",
    },
  ];
  const permissionRequests = [
    {
      date: "Mar 2026",
      title: "Blood test lab results",
      description: "Vitals normal. No concerns reported",
      status: "red",
    },
  ];
  const recentHistory = [
    {
      date: "Mar 2026",
      title: "Routine Checkup",
      description: "Vitals normal. No concerns reported.",
      status: "blue",
    },
    {
      date: "Feb 2026",
      title: "Routine Checkup",
      description: "Vitals normal. No concerns reported.",
      status: "blue",
    },
    {
      date: "April 2026",
      title: "Blood test lab results",
      description: "Vitals normal. No concerns reported",
      status: "red",
    },
    {
      date: "April 2026",
      title: "Blood test lab results",
      description: "Vitals normal. No concerns reported",
      status: "red",
    },
    {
      date: "April 2026",
      title: "Blood test lab results",
      description: "Vitals normal. No concerns reported",
      status: "red",
    },
  ];
  const appointments = [
    {
      date: "Mar 2026",
      title: "Routine Checkup",
      description: "Vitals normal. No concerns reported.",
      status: "blue",
    },
    {
      date: "Feb 2026",
      title: "Routine Checkup",
      description: "Vitals normal. No concerns reported.",
      status: "blue",
    },
    {
      date: "April 2026",
      title: "Blood test lab results",
      description: "Vitals normal. No concerns reported",
      status: "red",
    },
    {
      date: "April 2026",
      title: "Blood test lab results",
      description: "Vitals normal. No concerns reported",
      status: "red",
    },
  ];
</script>
<div class="px-20 max-w-[2000px] mx-auto">
  <div class="h-auto p-4">
    <div class="grid grid-cols-3 gap-4">
      <div class="col">
        {#each patients as patient}
          <ImageCard
            title={patient.title}
            imageUrl={patient.imageUrl}
            name={patient.name}
            gender={patient.gender}
            age={patient.age}
          />
        {/each}
      </div>

      <div class="col-span-2 pl-[40%] flex gap-6 justify-center items-center">
        <GreyButton href="/patients/dashboard">Patients</GreyButton>
        <GreyButton href="/calendar">Calendar</GreyButton>
        <GreyButton href="/login">Test results</GreyButton>
        <GreyButton href="/login">Permissions</GreyButton>
      </div>
    </div>

    <hr class="my-6" />
  </div>

  <div class="grid grid-flow-col grid-rows-3 gap-10 m-4">
    <div class="col-span-1">
      <CardOverlay>
        <div class="my-3">Notification</div>

        {#each notifications as notification}
          <DefaultCard
            title={notification.title}
            date={notification.date}
            description={notification.description}
            status={notification.status}
          />
        {/each}
      </CardOverlay>
    </div>
    <div class="col-span-1 row-span-2">
      <CardOverlay>
        <div class="my-3">Permission requests</div>
        {#each permissionRequests as request}
          <DefaultCard
            title={request.title}
            date={request.date}
            description={request.description}
            status={request.status}
          />
        {/each}
      </CardOverlay>
    </div>
    <div class="row-span-3">
      <CardOverlay>
        <div class="my-3">Recent history</div>
        {#each recentHistory as history}
          <DefaultCard
            title={history.title}
            date={history.date}
            description={history.description}
            status={history.status}
          />
        {/each}
      </CardOverlay>
    </div>
    <div class="row-span-3">
      <CardOverlay>
        <div class="my-3">Appointments</div>
        {#each appointments as appointment}
          <DefaultCard
            title={appointment.title}
            date={appointment.date}
            description={appointment.description}
            status={appointment.status}
          />
        {/each}
      </CardOverlay>
    </div>
  </div>
</div>
<style>
  :global(.text-cyan) {
    color: var(--medi-cyan);
  }
  :global(.bg-cyan) {
    background-color: var(--medi-cyan);
  }
  :global(.outline-cyan) {
    outline-color: var(--medi-cyan);
    outline-style: solid;
  }
</style>
