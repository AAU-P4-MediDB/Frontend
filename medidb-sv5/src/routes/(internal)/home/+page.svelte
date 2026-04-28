<script lang="ts">
  import GreyButton from "$lib/GreyButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import PatientCard from "$lib/PatientCard.svelte";
  import AppointmentsTimeline from "$lib/AppointmentsTimeline.svelte";
  import DoctorsTimeline from "$lib/DoctorsTimeline.svelte";
  import DoctorPermissionsCard from "$lib/DoctorPermissionsCard.svelte";

  import dayjs from "dayjs";
  import DefaultCard from "$lib/DefaultCard.svelte";

  let { data } = $props();

  $effect(() => {
    console.log("doctor", data.doctor);
    console.log("timeline_data", data.timeline_data);
    console.log("patients", data.patients);
    console.log("appointment_data", data.appointment_data);
    console.log("permission_requests", data.permission_requests);
  });
</script>

<div class="grid grid-cols-3 gap-4">
  <div class="...">
    <!-- 1.3 Fetch doctor -->
    <DoctorCard pfp={data.doctor?.pfp} name={data.doctor?.name} />
    <!-- sv3 reference code: -->
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
      <div class="">Appointments</div>
      {#each data.appointment_data as appointment}
        <DefaultCard
          date={dayjs.unix(appointment.time).format("ddd, MMM D @ h:mm A")}
          name={appointment.name}
          reason={appointment.reason}
          status="green"
        ></DefaultCard>
      {/each}
    </CardOverlay>
  </div>

  <div class="row-span-1">
    <CardOverlay>
      <div class="">Permission requests</div>
      <!--3.5.4 Fetch permission requests -->
      <div class="max-h-24">
        {#each data.permission_requests?.dr_perm_requests as request}
          <DoctorPermissionsCard pt_cpr={request.pt_cpr} note={request.note} />
        {/each}
      </div>
    </CardOverlay>
  </div>

  <div class="row-span-3">
    <CardOverlay>
      <div class="">Timeline</div>

      <AppointmentsTimeline history={data.timeline_data.timeline} />
    </CardOverlay>
  </div>

  <div class="row-span-3">
    <CardOverlay>
      <!--<section>
        3.1.6 Fetch patients 
        {#each data.patients as patient}
          {patient.name}
        {/each}
        sv3 reference code:
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Your next Patients</h2>
          <span class=" text-blue-800 text-xs font-medium">
            {data.patient_data.length} Total
          </span>
        </div>

        {#each data.patient_data as patient}
          <PatientCard
            uuid={patient.uuid}
            name={patient.name}
            pronouns={patient.pronouns}
            diagnoses={patient.diagnoses}
            age={dayjs().diff(dayjs(patient.dob), "year").toString()}
          />
        {/each} 
      </section>-->
      <section>
        <div class="flex justify-between items-center mb-2">
          <div class="">Your Patients</div>
          <span class="text-blue-800 text-xs font-medium mr-4">
            {data.patients?.length} Total
          </span>
        </div>

        <PatientCard
          uuid={data.patients?.uuid}
          name={data.patients?.name}
          pronouns={data.patients?.pronouns}
          bday={dayjs().diff(dayjs(data.patients?.bday), "year").toString()}
        />

        <!--{#each data.patients as patient}
          <PatientCard
            uuid={patient.name}
            name={patient.name}
            pronouns={patient.pronouns}
            age={dayjs().diff(dayjs(patient.bday), "year").toString()}
          />
        {/each} -->
      </section>
    </CardOverlay>
  </div>
</div>
