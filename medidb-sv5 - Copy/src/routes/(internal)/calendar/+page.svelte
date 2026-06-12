<!-- Don't mess with this one, I got it - VoxVoltera -->

<script lang="ts">
import { ScheduleXCalendar } from "@schedule-x/svelte";
import {
  createCalendar,
  createViewDay,
  createViewWeek,
  createViewMonthGrid
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import "@schedule-x/theme-default/dist/calendar.css";
import "temporal-polyfill/global";
// import CyanButton from "$lib/CyanButton.svelte";
import PopupCard2 from '$lib/appointment_update_menu.svelte';

let { data } = $props();

let openAppointment  = $state(false);

const eventModal = createEventModalPlugin();

// Add defensive programming to prevent crashes
const calendarApp = createCalendar({
  views: [createViewMonthGrid(), createViewWeek(), createViewDay(), ],
  plugins: [eventModal],
  events: data?.events || [],
});

function onAppointmentSubmit(e: CustomEvent)  { console.log('appointment',  e.detail); }

</script>
<PopupCard2 bind:open={openAppointment}  on:submit={onAppointmentSubmit} />

<!-- <div class="col-span-2">
  <div class="grid grid-cols-4 gap-4">
    <div class="...">
      <CyanButton onclick={() => (openAppointment = true)}>New Appointment</CyanButton>
    </div>
  </div>
</div> -->
<div class="p-4">
  <ScheduleXCalendar {calendarApp} />
</div>