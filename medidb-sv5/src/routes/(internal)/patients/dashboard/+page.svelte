<script lang="ts">
  // Components
  import CyanButton from "$lib/CyanButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import ImageCard from "$lib/ImageCard.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";
  import AppointmentsTimeline from "$lib/PatientTimeline.svelte";
  import PrescriptionCard from "$lib/PrescriptionCard.svelte";

  import dayjs from "dayjs";
  import PopupCard1 from '$lib/journal_update_menu.svelte';
  import PopupCard2 from '$lib/appointment_update_menu.svelte';
  import PopupCard3 from '$lib/prescriptions_update_menu.svelte';
  import PopupCard4 from '$lib/diagnosis_update_menu.svelte';

  // One open-state per card
  let openNote         = $state(false);
  let openAppointment  = $state(false);
  let openPrescription = $state(false);
  let openDiagnosis    = $state(false);

  // Handle submit events however you like
  function onNoteSubmit(e: CustomEvent)         { console.log('note',         e.detail); }
  function onAppointmentSubmit(e: CustomEvent)  { console.log('appointment',  e.detail); }
  function onPrescriptionSubmit(e: CustomEvent) { console.log('prescription', e.detail); }
  function onDiagnosisSubmit(e: CustomEvent)    { console.log('diagnosis',    e.detail); }

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

<PopupCard1 bind:open={openNote}         on:submit={onNoteSubmit} />
<PopupCard2 bind:open={openAppointment}  on:submit={onAppointmentSubmit} />
<PopupCard3 bind:open={openPrescription} on:submit={onPrescriptionSubmit} />
<PopupCard4 bind:open={openDiagnosis}    on:submit={onDiagnosisSubmit} />


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
        <CyanButton onclick={() => (openNote = true)}>Add Journal Note</CyanButton>
      </div>

      <div class="...">
        <CyanButton onclick={() => (openAppointment = true)}>New Appointment</CyanButton>
      </div>

      <div class="...">
        <CyanButton onclick={() => (openPrescription = true)}>New Prescription</CyanButton>
      </div>

      <div class="...">
        <CyanButton onclick={() => (openDiagnosis = true)}>New Diagnosis</CyanButton>
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
      <div class="">Journal</div>
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
      <PrescriptionCard prescriptions={data.prescriptions?.prescription}/>
    </CardOverlay>
  </div>
  <div class="...">
    <CardOverlay>
      <div class="">Diagnoses</div>
      <div class="text-sm font-light">{data.diagnoses?.diagnosis}</div>
    </CardOverlay>
  </div>
</div>

