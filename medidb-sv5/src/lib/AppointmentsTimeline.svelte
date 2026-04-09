<!-- AppointmentsTimeline.svelte -->
<script lang="ts">
  import { Timeline, TimelineItem } from "flowbite-svelte";
  import { CalendarWeekSolid, ClockSolid } from "flowbite-svelte-icons";

  type Appointment = {
    name: string;
    patientGuid: string;
    reason: string;
    time: number;
    pfp: string;
  };

  let { calendar }: { calendar: Appointment[] } = $props();

  const now = Math.floor(Date.now() / 1000);

  const upcoming = $derived(
    [...(calendar ?? [])]
      .filter((a) => a.time >= now)
      .sort((a, b) => a.time - b.time)
      .slice(0, 5)
  );

  function formatTime(unix: number): string {
    return new Date(unix * 1000).toLocaleString("da-DK", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
</script>

<Timeline order="vertical">
  {#if upcoming.length > 0}
    {#each upcoming as appointment, index}
      {@const isLastItem = index === upcoming.length - 1}

      <TimelineItem
        title={appointment.name}
        date={formatTime(appointment.time)}
        color="blue"
        isLast={isLastItem}
      >
        {#snippet orientationSlot()}
          <span
            class="absolute bg-blue-200 dark:bg-blue-900 -left-4.5 flex h-6 w-6 items-center justify-center rounded-full dark:ring-gray-900"
          >
            <CalendarWeekSolid class="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </span>
        {/snippet}

        <div class="pl-4 flex flex-col gap-1">
          <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <ClockSolid class="h-3.5 w-3.5 shrink-0" />
            {appointment.reason}
          </p>
        </div>
      </TimelineItem>
    {/each}
  {:else}
    <p class="text-sm text-gray-400 py-4">No upcoming appointments.</p>
  {/if}
</Timeline>