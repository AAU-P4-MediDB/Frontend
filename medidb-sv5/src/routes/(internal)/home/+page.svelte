<script lang="ts">
  import { Card, Button, Label, Input, Checkbox } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  import CyanButton from "$lib/CyanButton.svelte";
  import DefaultButton from "$lib/DefaultButton.svelte";
  import GreyButton from "$lib/GreyButton.svelte";

  import CardOverlay from "$lib/CardOverlay.svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";
  import AppointmentsTimeline from "$lib/AppointmentsTimeline.svelte";
  import dayjs from "dayjs";

  const appointments = [
    {
      id: 1,
      title: "Routine Checkup",
      date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
      status: "completed" as const,
      description: "Vitals normal. No concerns reported.",
    },
    {
      id: 2,
      title: "Blood test results",
      date: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      status: "in-progress" as const,
      description: "Waiting for lab results",
    },
    {
      id: 3,
      title: "Routine Checkup",
      date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
      status: "completed" as const,
      description: "Vitals normal. No concerns reported.",
    },
    {
      id: 4,
      title: "Follow-up appointment",
      date: dayjs().subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss"),
      status: "completed" as const,
      description: "Follow-up appointment completed successfully.",
    },
  ];

  const users = [
    {
      name: "Emma Nielsen",
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
</script>

<div class="grid grid-cols-3 gap-4">
  <div class="...">
    {#each users as user}
      <DoctorCard imageUrl={user.imageUrl} name={user.name} />
    {/each}
  </div>

  <div class="col-span-2">
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

<hr class="border-gray-200 my-6" />

<div class="grid grid-cols-3 grid-flow-col grid-rows-3 gap-4">
  <div class="row-span-2">
    <CardOverlay>
      <div class="">Notification</div>

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

  <div class="...">
    <CardOverlay>
      <div class="">Permission requests</div>
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
      <AppointmentsTimeline {appointments} />
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
