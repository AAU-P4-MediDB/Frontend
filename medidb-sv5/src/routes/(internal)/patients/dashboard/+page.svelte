<script lang="ts">
  // Components
  import CyanButton from "$lib/CyanButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import ImageCard from "$lib/ImageCard.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";
  import AppointmentsTimeline from "$lib/PatientTimeline.svelte";

  import dayjs from "dayjs";

  let { data } = $props();

  $effect(() => {
    console.log("vitals", data.vitals);
    console.log("journal", data.journal);
    console.log("prescriptions", data.prescriptions);
    console.log("diagnoses", data.diagnoses);
    console.log("appointments", data.appointments);
    console.log("info", data.info);
    console.log("labResults", data.labResults);
  });
</script>

<div class="grid grid-cols-3 gap-4">
  <div class="...">
    <ImageCard
      pfp={data.info?.pfp}
      name={data.info?.name}
      pronouns={data.info?.pronouns}
      birthdate={data.info?.bday}
    />
  </div>

  <div class="col-span-2">
    <div class="grid grid-cols-4 gap-4">
      <div class="...">
        <CyanButton href="/patients/dashboard">Add Journal Note</CyanButton>
      </div>
      <div class="...">
        <CyanButton href="/calendar">Order Tests</CyanButton>
      </div>
      <div class="...">
        <CyanButton href="/login">New Prescription</CyanButton>
      </div>
      <div class="...">
        <CyanButton href="/login">New Diagnosis</CyanButton>
      </div>
    </div>
  </div>
</div>

<hr class="border-gray-200 my-6" />

<div class="grid grid-cols-3 grid-flow-col grid-rows-2 gap-4">
  <div class="...">
    <CardOverlay>
      <div class="">Vitals</div>
      <div class="text-sm font-light">{data.vitals?.vitals}</div>
    </CardOverlay>
  </div>

  <div class="...">
    <CardOverlay>
      <div class="">Recent Measurements</div>
      {#each data.labResults?.lab_results as labResult}
        <DefaultCard
          date={dayjs.unix(labResult?.time).format("ddd, MMM D @ h:mm A")}
          name={labResult?.test}
          reason={labResult?.notes}
          status="green"
        ></DefaultCard>
      {/each}
    </CardOverlay>
  </div>
  <div class="...">
    <CardOverlay>
      <div class="">Upcoming Appointments</div>
      {#each data.appointments?.appointment as appointment}
        <DefaultCard
          date={dayjs.unix(appointment?.time).format("ddd, MMM D @ h:mm A")}
          name={appointment?.name}
          reason={appointment?.reason}
          status="green"
        ></DefaultCard>
      {/each}
    </CardOverlay>
  </div>
  <div class="row-span-3">
    <CardOverlay>
      <div class="">Timeline</div>
      <!-- <AppointmentsTimeline {appointments} /> -->

      {#each data.appointments?.appointment as appointment}
        <DefaultCard
          date={dayjs.unix(appointment?.time).format("ddd, MMM D @ h:mm A")}
          name={appointment?.name}
          reason={appointment?.reason}
          status="green"
        ></DefaultCard>
      {/each}
    </CardOverlay>
  </div>

  <div class="...">
    <CardOverlay>
      <div class="">Prescriptions</div>
      <div class="text-sm font-light">{data.prescriptions?.prescription}</div>
    </CardOverlay>
  </div>
  <div class="...">
    <CardOverlay>
      <div class="">Diagnoses</div>
      <div class="text-sm font-light">{data.diagnoses?.diagnosis}</div>
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
