<script lang="ts">
  import { api } from "$lib/api";
  import GreyButton from "$lib/GreyButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import PatientCard from "$lib/PatientCard.svelte";
  import AppointmentsTimeline from "$lib/DoctorsTimeline.svelte";

  import dayjs from "dayjs";

  const users = [
    {
      uuid: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      name: "Sophia Lee",
      email: "lee@clinic.dk",
      phone: 4512345678,
      clinic: "north-clinic-uuid",
      position: 3, // Doctor
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2bc07d8ed9",
    },
  ];

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

  const patients = [
    {
      uuid: "p-001",
      name: "Colby Durdan",
      dob: "1972-04-12",
      cpr_key: 1023,
      bio_gender: true,
      pronouns: "he/him",
      clinic: "North Clinic",
      doctor: "Sophia Lee",
      weight: 88.2,
      height: 182,
      diagnoses: ["Hypertension"],
      vitals: {
        date: 1711281600,
        "heart rate": "72 bpm",
        "blood pressure": "140/90",
        Sp02: "97%",
      },
      prescriptions: { active: ["Lisinopril"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba3026bc4e44",
    },
    {
      uuid: "p-002",
      name: "Liam Carter",
      dob: "1972-08-25", // Age 54
      cpr_key: 4452,
      bio_gender: true,
      pronouns: "he/him",
      clinic: "North Clinic",
      doctor: "Sophia Lee",
      weight: 75.0,
      height: 178,
      diagnoses: ["Asthma"],
      vitals: {
        date: 1711281600,
        "heart rate": "68 bpm",
        "blood pressure": "120/80",
        Sp02: "99%",
      },
      prescriptions: { active: ["Albuterol"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2c545a3381",
    },
  ];

  const notifications = [
    {
      notificationId: "n-011",
      doctor: "Sophia Lee",
      message: "New lab results available",
      type: "info" as const,
      read: false,
    },
    {
      notificationId: "n-012",
      doctor: "Sophia Lee",
      message: "Appointment starts in 15 mins",
      type: "urgent" as const,
      read: false,
    },
  ];

  let timeline_data = $state<any>(null);

  $effect(() => {
    // api.get("/dpm/{userId}/timeline/get").then(data => {
    api.get("/dpm/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/timeline/get").then(data => {
      timeline_data = data;
    });
  });
</script>

<div class="grid grid-cols-3 gap-4">
  <div class="...">
    {#each users as user}
      <DoctorCard pfp={user.pfp} name={user.name} />
    {/each}
  </div>

  <div class="col-span-2">
    <div class="grid grid-cols-4 gap-4">
      <div class="...">
        <GreyButton href="/patients/overview">Patients</GreyButton>
      </div>
      <div class="...">
        <GreyButton href="/calendar">Calendar</GreyButton>
      </div>
      <div class="...">
        <GreyButton href="/patients/test_results">Test results</GreyButton>
      </div>
      <div class="...">
        <GreyButton href="/patients/permissions">Permissions</GreyButton>
      </div>
    </div>
  </div>
</div>

<hr class="border-gray-200 my-6" />

<div class="grid grid-cols-3 grid-flow-col grid-rows-3 gap-4">
  <div class="row-span-2">
    <CardOverlay>
      <div class="my-3">Appointments</div>

      {#each notifications as notification}
        <div class="">
          {notification.message} - {notification.type}
        </div>
      {/each}
    </CardOverlay>
  </div>

  <div class="...">
    <CardOverlay>
      <div class="">Permission requests</div>
      {#each notifications as notification}
        {notification.message} - {notification.type}
      {/each}
    </CardOverlay>
  </div>

  <div class="row-span-3">
    <CardOverlay>
      <h2 class="text-lg font-semibold">Timeline</h2>
      <AppointmentsTimeline {timeline_data} />
    </CardOverlay>
  </div>

  <div class="row-span-3">
    <CardOverlay>
      <section>
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Your next Patients</h2>
          <span class=" text-blue-800 text-xs font-medium">
            {patients.length} Total
          </span>
        </div>

        {#each patients as patient}
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
