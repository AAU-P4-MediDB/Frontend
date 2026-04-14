<!-- Don't mess with this one, I got it - VoxVoltera -->

<script lang="ts">
import { ScheduleXCalendar } from "@schedule-x/svelte";
import {
  createCalendar,
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import "@schedule-x/theme-default/dist/calendar.css";
import "temporal-polyfill/global";

let { data } = $props();

const eventModal = createEventModalPlugin();

const calendarApp = createCalendar({
  views: [createViewMonthGrid(), createViewWeek(), createViewDay()],
  plugins: [eventModal],
  events: data.events,
});
</script>

<div class="p-4">
  <ScheduleXCalendar {calendarApp} />
</div>