<!-- DoctorTimeline.svelte -->
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
  type TimeLineSeverity =
    | "High"
    | "Medium"
    | "Low";

  type TimeLineDataType =
    | "Vitals"
    | "Lab Results"
    | "Prescriptions"
    | "Journal"
    | "Personal info"
    | "Diagnosis"
    | "Appointments";

  type TimeLine = {
    PatientId: number;
    doctor_accessing: string;
    date: string;
    doctor: string;
    data_type: TimeLineDataType;
    changes: string;
    severity: TimeLineSeverity;
  };
  
  let { timeline_data }: { timeline_data: TimeLine[] } = $props();

  function getColorForStatus(status: TimeLineSeverity) {
    switch (status) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "blue";
      default:
        return "gray";
    }
  }

  function getIconForStatus(status: TimeLineDataType) {
    switch (status) {
      case "Vitals":
        return CheckCircleSolid;
      case "Lab Results":
        return ClockSolid;
      default:
        return CalendarWeekSolid;
    }
  }

  function getIconForAppointment(status: TimeLineDataType) {
    switch (status) {
      case "Vitals": // General wellness visits
        return CalendarMonthSolid;
      case "Lab Results": // Post-treatment or post-surgery reviews
        return CalendarPlusSolid;
      case "Prescriptions": // Specialist meetings
        return MessagesSolid;
      case "Journal": // Vaccination appointments
        return Syringe;
      case "Personal info": // Preventative tests (e.g., Eye exam, Hearing test)
        return ClockSolid;
      default:
        return CalendarWeekSolid;
    }
  }
</script>

<Timeline order="vertical">
  {#each timeline_data as appointment, index}
    {@const isLastItem = index === timeline_data.length - 1}
    {@const itemColor = getColorForStatus(appointment.severity)}
    {@const IconComponent = getIconForStatus(appointment.data_type)}
    {@const IconComponentAppointment = getIconForAppointment(
      appointment.data_type,
    )}

    <TimelineItem
      title={appointment.data_type}
      date={appointment.date}
      color={itemColor}
      isLast={isLastItem}
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
          {appointment.doctor_accessing}
        </p>

        <div class="flex gap-2">
          <IconComponent
            class="h-4 w-4 self-center {appointment.severity === 'High'
              ? 'text-green-600 dark:text-green-400'
              : appointment.severity === 'Medium'
                ? 'text-orange-600 dark:text-orange-400'
                : appointment.severity === 'Low'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'}"
          />
          <span
            class=" self-center items-center rounded-full px-2.5 py-1 text-xs font-medium {appointment.severity ===
            'High'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : appointment.severity === 'Medium'
                ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                : appointment.severity === 'Low'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'}"
          >
            {appointment.severity}
          </span>
        </div>
      </div>
    </TimelineItem>
  {/each}
</Timeline>
