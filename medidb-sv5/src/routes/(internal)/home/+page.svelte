<script lang="ts">
  import { session } from "$lib/session.svelte";
  import { api } from "$lib/services/api";
  import { onMount } from "svelte";
  import type { JournalEntry } from "$lib/types";

  // Mock Data
  import { MOCK_DOCTORS } from "$lib/mocks/doctors";
  import { MOCK_PATIENTS } from "$lib/mocks/patients";

  // Components
  import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

  import GreyButton from "$lib/GreyButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import PatientCard from "$lib/PatientCard.svelte";
  import AppointmentsTimeline from "$lib/AppointmentsTimeline.svelte";

  import dayjs from "dayjs";

  let journals = $state<JournalEntry[]>([]);
  let loadingJournals = $state(true);

  onMount(async () => {
    // In a real app, you might fetch journals for a specific patient
    // or a list of recent updates for the doctor's clinic.
    // For now, we fetch the mock data.
    const result = await api.journals.getByPatient(1); // Fetching for Patient ID 1
    if (result) {
      // We wrap it in an array if your UI expects a list
      journals = [result];
    }
    loadingJournals = false;
  });
  // 1. Get the current logged-in doctor's data
  const currentDoctor = $derived(
    MOCK_DOCTORS.find((d) => d.uuid === session.user?.uuid),
  );

  // 2. Map the IDs in 'assignedPatients' to full Patient objects
  // 1. Get only the patients for the logged-in doctor
  const myPatients = $derived(
    MOCK_PATIENTS.filter((p) => p.doctor === session.user?.uuid),
  );

  // Helper: Calculate age for the ImageCard
  const getAge = (dob: string) => dayjs().diff(dayjs(dob), "year");
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
    {#if session.user}
      <DoctorCard pfp={session.user.pfp} name={session.user.name} />
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
      <div class="my-3">Recent Medical History</div>

      {#if loadingJournals}
        <p>Loading medical records...</p>
      {:else if journals.length > 0}
        {#each journals as entry}
          <DefaultCard
            title="Medical Entry: {dayjs
              .unix(entry.journal.date)
              .format('MMM D, YYYY')}"
            date={dayjs.unix(entry.journal.date).format("HH:mm")}
            description={entry.journal.patient_summary}
            status="blue"
          />
        {/each}
      {:else}
        <p>No recent history found.</p>
      {/if}
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
      <section>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Your Assigned Patients</h2>
          <span class=" text-blue-800 text-xs font-medium">
            {myPatients.length} Total
          </span>
        </div>

        {#each myPatients as patient}
          <PatientCard
            uuid={patient.uuid}
            name={patient.name}
            pronouns={patient.pronouns}
            diagnoses={patient.diagnoses}
            age={dayjs().diff(dayjs(patient.dob), "year").toString()}
          />
        {/each}
      </section>
    </CardOverlay>
  </div>
</div>
