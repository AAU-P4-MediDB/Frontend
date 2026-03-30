<!-- AppointmentsTimeline.svelte -->
<script lang="ts">
  import { Timeline, TimelineItem } from "flowbite-svelte";
  import {
    CalendarWeekSolid,
    CheckCircleSolid,
    ClockSolid,
    CalendarMonthSolid,
    CalendarPlusSolid,
    MessagesSolid,
  } from "flowbite-svelte-icons";

  import { Syringe } from "lucide-svelte";
  type AppointmentStatus =
    | "completed"
    | "in-progress"
    | "upcoming"
    | "cancelled";

  type AppointmentType =
    | "routine-checkup"
    | "follow-up"
    | "consultation"
    | "immunization"
    | "screening";

  type Appointment = {
    appointment_id: number;
    title: string;
    date: string;
    doctor: string;
    notes: string;
    clinic: string;
    status: AppointmentStatus;
    app_type: AppointmentType;
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

  function getIconForAppointment(status: AppointmentType) {
    switch (status) {
      case "routine-checkup": // General wellness visits
        return CalendarMonthSolid;
      case "follow-up": // Post-treatment or post-surgery reviews
        return CalendarPlusSolid;
      case "consultation": // Specialist meetings
        return MessagesSolid;
      case "immunization": // Vaccination appointments
        return Syringe;
      case "screening": // Preventative tests (e.g., Eye exam, Hearing test)
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
    {@const IconComponentAppointment = getIconForAppointment(
      appointment.app_type,
    )}

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
          class="absolute bg-blue-200 dark:bg-blue-900 -left-4.5 flex h-6 w-6 items-center justify-center rounded-full dark:ring-gray-900"
        >
          <IconComponentAppointment
            class="h-4 w-4 text-blue-600 dark:text-blue-400"
          />
        </span>
      {/snippet}
      <div class="pl-4">
        <p class="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
          {appointment.notes}
        </p>

        <div class="flex gap-2">
          <IconComponent
            class="h-4 w-4 self-center {appointment.status === 'completed'
              ? 'text-green-600 dark:text-green-400'
              : appointment.status === 'in-progress'
                ? 'text-orange-600 dark:text-orange-400'
                : appointment.status === 'upcoming'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'}"
          />
          <span
            class=" self-center items-center rounded-full px-2.5 py-1 text-xs font-medium {appointment.status ===
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
      </div>
    </TimelineItem>
  {/each}
</Timeline>
