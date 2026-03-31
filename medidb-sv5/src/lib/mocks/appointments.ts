import type { Appointment } from "../types";

import dayjs from "dayjs";
export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    appointment_id: "ap1",
    title: "Routine Checkup 2",
    date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
    doctor: "uuid", //ref to CUR
    notes: "Vitals normal. No concerns reported.",
    clinic: "uuid", //ref to CCR
    status: "completed" as const,
    app_type: "routine-checkup" as const,
  },
  {
    appointment_id: "ap2",
    title: "Blood test results",
    date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
    doctor: "uuid", //ref to CUR
    notes: "Waiting for lab results",
    clinic: "uuid", //ref to CCR
    status: "in-progress" as const,
    app_type: "screening" as const,
  },
  {
    appointment_id: "ap3",
    title: "Vaccination",
    date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
    doctor: "uuid", //ref to CUR
    notes: "Vaccine for Covid",
    clinic: "uuid", //ref to CCR
    status: "completed" as const,
    app_type: "immunization" as const,
  },
  {
    appointment_id: "ap4",
    title: "Follow-up appointment",
    date: dayjs().subtract(3, "day").format("YYYY-MM-DDTHH:mm:ss"),
    doctor: "uuid", //ref to CUR
    notes: "Follow-up appointment completed successfully.",
    clinic: "uuid", //ref to CCR
    status: "completed" as const,
    app_type: "follow-up" as const,
  },
];
