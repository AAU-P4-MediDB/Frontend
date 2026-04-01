<script lang="ts">
  // Components
  import GreyButton from "$lib/GreyButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import AppointmentsTimeline from "$lib/AppointmentsTimeline.svelte";

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
  const journals = [
    {
      uuid: "p-001", // Matches a Patient CPR or ID
      journal: {
        // Spec 3.1.2: date must be 'int' (Unix Timestamp)
        date: dayjs().subtract(2, "days").unix(),
        patient_summary:
          "Patient presented with mild hypertension. Blood pressure 145/90.",
        eprescription_edispensation:
          "Amoxicillin 500mg - 1 tablet twice daily.",
        laboratory_results: "Blood panel clear. Cholesterol slightly elevated.",
        medical_imaging_and_reports: "Chest X-Ray: Normal findings.",
        hospital_discharge_reports:
          "Discharged from Northside Medical with follow-up in 2 weeks.",
      },
    },
    {
      uuid: "p-002",
      journal: {
        date: dayjs().subtract(1, "month").unix(),
        patient_summary: "Routine screening for Type 2 Diabetes management.",
        eprescription_edispensation: "Metformin 500mg.",
        laboratory_results: "HbA1c: 6.5% - Stable.",
        medical_imaging_and_reports: "N/A",
        hospital_discharge_reports: "N/A",
      },
    },
    {
      uuid: "p-003",
      journal: {
        date: dayjs().unix(),
        patient_summary:
          "Acute allergic reaction to pollen. Prescribed antihistamines.",
        eprescription_edispensation: "Cetirizine 10mg.",
        laboratory_results: "IgE levels elevated.",
        medical_imaging_and_reports: "N/A",
        hospital_discharge_reports:
          "Patient stabilized in clinic; no hospitalization required.",
      },
    },
  ];
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
        <div>
          {notification.message} - {notification.type}
        </div>
      {/each}
    </CardOverlay>
  </div>

  <div class="...">
    <CardOverlay>
      <div class="">Journals</div>

      {#each journals as journal}
        <div class="text-sm">
          {dayjs.unix(journal.journal.date).format("HH:mm DD/MM/YYYY")}
        </div>
        <div class="text-sm font-light">
          {journal.journal.patient_summary}
        </div>
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
