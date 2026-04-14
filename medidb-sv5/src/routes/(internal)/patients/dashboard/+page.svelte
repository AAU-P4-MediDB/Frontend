<script lang="ts">
  // Components
  import GreyButton from "$lib/GreyButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import AppointmentsTimeline from "$lib/PatientTimeline.svelte";

  import dayjs from "dayjs";

  let { data } = $props();

  console.log("vitals", data.vitals);
  console.log("journal", data.journal);
  console.log("prescriptions", data.prescriptions);
  console.log("diagnoses", data.diagnoses);
  console.log("appointments", data.appointments);
  console.log("info", data.info);
  console.log("labResults", data.labResults);
</script>

<div class="grid grid-cols-3 gap-4">
  <div class="...">
    3.1.6
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
  <div class="...">
    <CardOverlay>
      <div class="">Vitals</div>
      3.1.1
    </CardOverlay>
  </div>

  <div class="...">
    <CardOverlay>
      <div class="">Recent Measurements</div>
      3.1.7
    </CardOverlay>
  </div>
  <div class="...">
    <CardOverlay>
      <div class="">Upcoming Appointments</div>
      3.1.5
    </CardOverlay>
  </div>
  <div class="row-span-3">
    <CardOverlay>
      <div class="">Timeline</div>
      <!-- <AppointmentsTimeline {appointments} /> -->
       3.1.2
    </CardOverlay>
  </div>

  <div class="...">
    <CardOverlay>
      <div class="">Prescriptions</div>

      3.1.3
    </CardOverlay>
  </div>
  <div class="...">
    <CardOverlay>
      <div class="">Diagnoses</div>

      3.1.4
    </CardOverlay>
  </div>
</div>


<!-- So, this code became a bit of a mess, so here's the full reference from previous version
 
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
    Left: 3 stacked panels
    <div class="max-w-[400px] flex flex-col gap-4" style="height: 100%">
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
    Middle: tall Timeline
    <div class="row-span-3 w-full">
      <CardOverlay>
        <div class="my-3">Timeline</div>
        {#each recentHistory as history}
          <DefaultCard title={history.title} date={history.date} description={history.description} status={history.status} />
        {/each}
      </CardOverlay>
    </div>
    <div class="max-w-[400px] flex flex-col gap-4" style="height: 100%">
      Right: tall Tasks & Messages
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
-->