<!-- AppointmentsTimeline.svelte -->
<script lang="ts">
  import { Timeline, TimelineItem } from "flowbite-svelte";
  import {
    CalendarWeekSolid,
    CheckCircleSolid,
    CloseCircleSolid,
    ClockSolid,
  } from "flowbite-svelte-icons";

  type AppointmentStatus =
    | "completed"
    | "in-progress"
    | "upcoming"
    | "cancelled";

  type Appointment = {
    id: number;
    title: string;
    date: string;
    status: AppointmentStatus;
    description: string;
  };

  let { appointments }: { appointments: Appointment[] } = $props();

  function getColorForStatus(status: AppointmentStatus) {
    switch (status) {
      case "completed":
        return "green";
      case "in-progress":
        return "orange";
      case "upcoming":
        return "blue";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  }

  function getIconForStatus(status: AppointmentStatus) {
    switch (status) {
      case "completed":
        return CheckCircleSolid;
      case "in-progress":
        return ClockSolid;
      default:
        return CalendarWeekSolid;
    }
  }
</script>

<Timeline order="vertical">
  {#each appointments as appointment, index}
    {@const isLastItem = index === appointments.length - 1}
    {@const itemColor = getColorForStatus(appointment.status)}
    {@const IconComponent = getIconForStatus(appointment.status)}

    <TimelineItem
      title={appointment.title}
      date={appointment.date}
      color={itemColor}
      isLast={isLastItem}
      dateFormat="full-date"
      classes={{ h3: "ml-4" }}
      datePrefix="Released on"
    >
      {#snippet orientationSlot()}
        <span
          class="absolute -left-4 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-900 {appointment.status ===
          'completed'
            ? 'bg-blue-200 dark:bg-blue-900'
            : appointment.status === 'in-progress'
              ? 'bg-orange-200 dark:bg-orange-900'
              : appointment.status === 'upcoming'
                ? 'bg-blue-200 dark:bg-blue-900'
                : 'bg-gray-200 dark:bg-gray-900'}"
        >
          <IconComponent
            class="h-4 w-4 {appointment.status === 'completed'
              ? 'text-blue-600 dark:text-blue-400'
              : appointment.status === 'in-progress'
                ? 'text-orange-600 dark:text-orange-400'
                : appointment.status === 'upcoming'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'}"
          />
        </span>
      {/snippet}
      <div class="pl-4">
        <p class="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
          {appointment.description}
        </p>
        <span
          class="absolute -left-4 flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white dark:ring-gray-900 {appointment.status ===
          'completed'
            ? 'bg-green-200 dark:bg-green-900'
            : appointment.status === 'in-progress'
              ? 'bg-orange-200 dark:bg-orange-900'
              : appointment.status === 'upcoming'
                ? 'bg-blue-200 dark:bg-blue-900'
                : 'bg-gray-200 dark:bg-gray-900'}"
        >
          <IconComponent
            class="h-4 w-4 {appointment.status === 'completed'
              ? 'text-green-600 dark:text-green-400'
              : appointment.status === 'in-progress'
                ? 'text-orange-600 dark:text-orange-400'
                : appointment.status === 'upcoming'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'}"
          />
        </span>
        <span
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {appointment.status ===
          'completed'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            : appointment.status === 'in-progress'
              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
              : appointment.status === 'upcoming'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'}"
        >
          {appointment.status.replace("-", " ")}
        </span>
      </div>
    </TimelineItem>
  {/each}
</Timeline>
