<!-- Calendar month view needs expansion, so it's not so... smudged -->

<script lang="ts">
  import { ScheduleXCalendar } from "@schedule-x/svelte";
  import {
    createCalendar,
    createViewDay,
    createViewWeek,
    createViewMonthGrid,
  } from "@schedule-x/calendar";
  import "@schedule-x/theme-default/dist/calendar.css";

  import "temporal-polyfill/global"; // must be first

  const calendarApp = createCalendar({
    views: [createViewMonthGrid(), createViewWeek(), createViewDay()],
    events: [
      {
        id: "1",
        title: "Routine Checkup — Emma Nielsen",
        start: Temporal.PlainDate.from("2026-03-29"),
        end: Temporal.PlainDate.from("2026-03-29"),
      },
      {
        id: "2",
        title: "Blood Test Review — John Cena",
        start: Temporal.PlainDate.from("2026-04-02"),
        end: Temporal.PlainDate.from("2026-04-02"),
      },
      {
        id: "3",
        title: "Diabetic Check-up — Emma Nielsen",
        start: Temporal.PlainDate.from("2026-04-28"),
        end: Temporal.PlainDate.from("2026-04-28"),
      },
    ],
  });
</script>

<div class="p-4">
  <ScheduleXCalendar {calendarApp} />
</div>
