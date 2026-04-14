<script lang="ts">
  import GreyButton from "$lib/GreyButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import PatientCard from "$lib/PatientCard.svelte";
  import AppointmentsTimeline from "$lib/AppointmentsTimeline.svelte";
  import DoctorsTimeline from "$lib/DoctorsTimeline.svelte";

  import dayjs from "dayjs";

  let { data } = $props();

  console.log("doctor", data.doctor);
  console.log("timeline_data", data.timeline_data);
  console.log("patients", data.patients);
  console.log("appointment_data", data.appointment_data);
  console.log("permission_requests", data.permission_requests);

</script>

<div class="grid grid-cols-3 gap-4">
  <div class="...">
    <!-- Fetch doctor -->
     1.3
    <!-- sv3 reference code:  
     {#each users as user}
      <UserCard imageUrl={user.imageUrl} name={user.name} />
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
    </div> -->
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
      <!-- {console.log(data.appointment_data)} -->
      <AppointmentsTimeline calendar={data.appointment_data?.calendar ?? []} />
    </CardOverlay>
  </div>

  <div class="...">
    <CardOverlay>
      <div class="">Permission requests</div>
      <!-- Fetch permission requests -->
       3.5.4
    </CardOverlay>
  </div>

  <div class="row-span-3">
    <CardOverlay>
      <h2 class="text-lg font-semibold">Timeline</h2>
      <DoctorsTimeline timeline_data={data.timeline_data.timeline.filter((item) => item.data_type !== 'Patient') ?? null} />
    </CardOverlay>
  </div>

  <div class="row-span-3">
    <CardOverlay>
      <section>
        3.1.6
        <!-- sv3 reference code: 
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
        {/each} -->
      </section>
    </CardOverlay>
  </div>
</div>
