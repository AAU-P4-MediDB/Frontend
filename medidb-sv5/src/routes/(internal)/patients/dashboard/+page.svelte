<script lang="ts">
  // Components
  import GreyButton from "$lib/GreyButton.svelte";
  import CardOverlay from "$lib/CardOverlay.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";
  import DoctorCard from "$lib/DoctorCard.svelte";
  import AppointmentsTimeline from "$lib/PatientTimeline.svelte";

  import dayjs from "dayjs";
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
