<script lang="ts">
  import CyanButton      from '$lib/components/CyanButton.svelte';
  import PopupCard1      from '$lib/components/PopupCard1.svelte';
  import PopupCard2      from '$lib/components/PopupCard2.svelte';
  import PopupCard3      from '$lib/components/PopupCard3.svelte';
  import PopupCard4      from '$lib/components/PopupCard4.svelte';

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
</script>

<!-- ── Popup cards (rendered outside the grid, portal-like via fixed overlay) ── -->
<PopupCard1 bind:open={openNote}         on:submit={onNoteSubmit} />
<PopupCard2 bind:open={openAppointment}  on:submit={onAppointmentSubmit} />
<PopupCard3 bind:open={openPrescription} on:submit={onPrescriptionSubmit} />
<PopupCard4 bind:open={openDiagnosis}    on:submit={onDiagnosisSubmit} />

<!-- ── Drop-in replacement for your col-span-2 block ── -->
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
