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
      cpr: "120303-1234",
      age: "22",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba15f58c562b",
    },
  ];

  const medicalHistory = [
    { date: "Jan 2024", title: "Diabetes Type 2", description: "Diagnosed and managed with Metformin.", status: "red" },
    { date: "Mar 2022", title: "Hypertension", description: "Ongoing. Lisinopril prescribed.", status: "red" },
    { date: "Jun 2019", title: "Penicillin Allergy", description: "Confirmed allergy. Avoid penicillin-based antibiotics.", status: "red" },
  ];

  const recentMeasurements = [
    { date: "Mar 2026", title: "Blood Pressure", description: "145e+100/90 — Slightly elevated.", status: "red" },
    { date: "Mar 2026", title: "HbA1c", description: "7.8% — Above target range.", status: "red" },
    { date: "Mar 2026", title: "Weight", description: "62kg — Stable.", status: "blue" },
  ];

  const upcomingAppointments = [
    { date: "Apr 28 2026", title: "Diabetic Check-up", description: "Scheduled with Dr. Hansen.", status: "blue" },
  ];

  const recentHistory = [
    { date: "Mar 2026", title: "Routine Checkup", description: "Vitals normal. No concerns reported.", status: "blue" },
    { date: "Feb 2026", title: "Routine Checkup", description: "Vitals normal. No concerns reported.", status: "blue" },
    { date: "Apr 2026", title: "Blood test lab results", description: "Vitals normal. No concerns reported.", status: "red" },
    { date: "Apr 2026", title: "Routine Checkup", description: "Vitals normal. No concerns reported.", status: "blue" },
    { date: "Mar 2026", title: "EKG", description: "No heartrate detected.", status: "red" },
  ];

  const tasksAndMessages = [
    { date: "Today", title: "Lab Review", description: "Due today — review pending lab results.", status: "red" },
    { date: "Mar 2026", title: "Patient Message", description: "Headaches and fatigue reported by patient.", status: "red" },
    { date: "", title: "Medication List", description: "Quick link — review current medications.", status: "blue" },
    { date: "", title: "Journal", description: "Quick link — open patient journal.", status: "blue" },
    { date: "", title: "Referral Form", description: "Quick link — initiate referral.", status: "blue" },
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
            gender={patient.cpr}
            age={patient.age}
          />
        {/each}
      </div>

      <div class="col-span-2 ml-auto flex gap-1 justify-center items-center">
        <GreyButton href="/patients/dashboard">Add journal note</GreyButton>
        <GreyButton href="/calendar">Order tests</GreyButton>
        <GreyButton href="/login">New prescriptions</GreyButton>
        <GreyButton href="/login">New diagnosis</GreyButton>
      </div>
    </div>

    <hr class="my-6" />
  </div>

  <div class="grid grid-flow-col grid-rows-3 gap-10 m-4">
    <!-- Left: 3 stacked panels -->
    <div>
      <div class="row-span-1">
        <CardOverlay>
          <div class="my-3">Medical History</div>
          {#each medicalHistory as item}
            <DefaultCard title={item.title} date={item.date} description={item.description} status={item.status} />
          {/each}
        </CardOverlay>
      </div>
      <div class="row-span-1">
        <CardOverlay>
          <div class="my-3">Recent Measurements</div>
          {#each recentMeasurements as item}
            <DefaultCard title={item.title} date={item.date} description={item.description} status={item.status} />
          {/each}
        </CardOverlay>
      </div>
      <div class="row-span-1">
        <CardOverlay>
          <div class="my-3">Upcoming Appointment</div>
          {#each upcomingAppointments as item}
            <DefaultCard title={item.title} date={item.date} description={item.description} status={item.status} />
          {/each}
        </CardOverlay>
      </div>
    </div>
    <!-- Middle: tall Timeline -->
    <div class="row-span-3 w-full">
      <CardOverlay>
        <div class="my-3">Timeline</div>
        {#each recentHistory as history}
          <DefaultCard title={history.title} date={history.date} description={history.description} status={history.status} />
        {/each}
      </CardOverlay>
    </div>
    <div>
      <!-- Right: tall Tasks & Messages -->
      <div class="row-span-1">
        <CardOverlay>
          <div class="my-3">Tasks & Messages</div>
          {#each tasksAndMessages as item}
            <DefaultCard title={item.title} date={item.date} description={item.description} status={item.status} />
          {/each}
        </CardOverlay>
      </div>
      <div class="row-span-1">
        <CardOverlay>
          <div class="my-3">Recent Measurements</div>
          {#each recentMeasurements as item}
            <DefaultCard title={item.title} date={item.date} description={item.description} status={item.status} />
          {/each}
        </CardOverlay>
      </div>
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