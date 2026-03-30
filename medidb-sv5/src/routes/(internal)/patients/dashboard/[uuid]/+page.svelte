<script lang="ts">
  import { page } from "$app/state"; // SvelteKit 5 way to get params
  import { MOCK_PATIENTS } from "$lib/mocks/patients";

  // Components
  import GreyButton from "$lib/GreyButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import ImageCard from "$lib/ImageCard.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";
  import AppointmentsTimeline from "$lib/AppointmentsTimeline.svelte";

  import dayjs from "dayjs";

  // Grab the [uuid] from the URL
  const patientId = $derived(page.params.uuid);

  // Find the specific patient in your mock data
  const patient = $derived(MOCK_PATIENTS.find((p) => p.uuid === patientId));

  const appointments = [
    {
      appointment_id: 1,
      title: "Routine Checkup",
      date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
      doctor: "uuid", //ref to CUR
      notes: "Vitals normal. No concerns reported.",
      clinic: "uuid", //ref to CCR
      status: "completed" as const,
      app_type: "routine-checkup" as const,
    },
    {
      appointment_id: 2,
      title: "Blood test results",
      date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
      doctor: "uuid", //ref to CUR
      notes: "Waiting for lab results",
      clinic: "uuid", //ref to CCR
      status: "in-progress" as const,
      app_type: "screening" as const,
    },
    {
      appointment_id: 3,
      title: "Vaccination",
      date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
      doctor: "uuid", //ref to CUR
      notes: "Vaccine for Covid",
      clinic: "uuid", //ref to CCR
      status: "completed" as const,
      app_type: "immunization" as const,
    },
    {
      appointment_id: 4,
      title: "Follow-up appointment",
      date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
      doctor: "uuid", //ref to CUR
      notes: "Follow-up appointment completed successfully.",
      clinic: "uuid", //ref to CCR
      status: "completed" as const,
      app_type: "follow-up" as const,
    },
  ];

  const users = [
    {
      name: "Sophia Lee",
      age: "24",
      cpr: "150303-1234",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2bc07d8ed9",
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
    {#if patient}
      <ImageCard
        pfp={patient.pfp}
        name={patient.name}
        pronouns={patient.pronouns}
        age={dayjs().diff(dayjs(patient.dob), "year").toString()}
      />
    {/if}
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
          description={appointment.notes}
          status={appointment.status}
        />
      {/each}
    </CardOverlay>
  </div>
</div>
