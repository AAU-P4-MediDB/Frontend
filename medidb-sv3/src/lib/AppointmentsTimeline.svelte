<!-- AppointmentsTimeline.svelte -->
<script lang="ts">
  import { Timeline, TimelineItem } from "flowbite-svelte";
  import { CalendarWeekSolid, CheckCircleSolid, ClockSolid } from "flowbite-svelte-icons";

  type AppointmentStatus = "completed" | "in-progress" | "upcoming" | "cancelled";

  type Appointment = {
    id: number;
    title: string;
    date: string;
    status: AppointmentStatus;
    description: string;
  };

  export let appointments: Appointment[];

  function getColorForStatus(status: AppointmentStatus) {
    switch (status) {
      case "completed": return "green";
      case "in-progress": return "orange";
      case "upcoming": return "blue";
      case "cancelled": return "red";
      default: return "gray";
    }
  }

  function getIconForStatus(status: AppointmentStatus): typeof CheckCircleSolid {
    switch (status) {
      case "completed": return CheckCircleSolid;
      case "in-progress": return ClockSolid;
      default: return CalendarWeekSolid;
    }
  }
</script>

<div class="bg-white p-6 rounded-lg">
  <Timeline order="vertical">
    {#each appointments as appointment, index}
      {@const isLastItem = index === appointments.length - 1}
      {@const itemColor = getColorForStatus(appointment.status)}
      {@const IconComponent = getIconForStatus(appointment.status)}

      <TimelineItem title={appointment.title} date={appointment.date}>
        <span
          class="absolute -left-4 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white {appointment.status === 'completed'
            ? 'bg-green-200'
            : appointment.status === 'in-progress'
              ? 'bg-orange-200'
              : appointment.status === 'upcoming'
                ? 'bg-blue-200'
                : 'bg-gray-200'}"
        >
          <svelte:component this={IconComponent}
            class="h-4 w-4 {appointment.status === 'completed'
              ? 'text-green-600'
              : appointment.status === 'in-progress'
                ? 'text-orange-600'
                : appointment.status === 'upcoming'
                  ? 'text-blue-600'
                  : 'text-gray-600'}"
          />
        </span>
        <div class="pl-4">
          <p class="mb-2 text-base font-normal text-gray-500">
            {appointment.description}
          </p>
          <span
            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {appointment.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : appointment.status === 'in-progress'
                ? 'bg-orange-100 text-orange-800'
                : appointment.status === 'upcoming'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'}"
          >
            {appointment.status.replace("-", " ")}
          </span>
        </div>
      </TimelineItem>
    {/each}
  </Timeline>
</div>