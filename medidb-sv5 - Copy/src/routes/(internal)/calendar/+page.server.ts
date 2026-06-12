import { api } from "$lib/server/api";
import type { PageServerLoad } from "./$types";
import { Temporal } from "temporal-polyfill";

export interface AppointmentEntry {
  uuid: string;
  cpr: string;
  name: string;
  reason: string;
  time: number;
  pfp: string;
}

export const load: PageServerLoad = async ({ cookies, locals }) => {
  const cookieHeader = cookies
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // TODO: pull doctorID from session cookie once auth is wired up
  const doctorID = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";

  let appointment_data: AppointmentEntry[] = [];

  const timeAddon = 1800; // 30 minutes in seconds (hardcoded, cause i can't be fucked to implement it properly)

  try {
    appointment_data = await api.get<AppointmentEntry[]>(
      `/api/dpm/calendar/sync/${doctorID}`,
      cookieHeader,
      locals.token,
    );
  } catch (e) {
    console.error("Appointments fetch failed:", e);
  }

  // DEBUGGING SECTION
  // console.warn('Appointments:', appointment_data);

  // id: time,
  // title: reason - name
  // description: cpr
  // start: time
  // end: time + 30 minutes

  //calendar.map is needed because the api returns an object with a calendar property
  let events = appointment_data.calendar.map((appointment) => ({
    id: appointment.time,
    title: `${appointment.reason} - ${appointment.name}`,
    description: appointment.cpr,
    start: Temporal.ZonedDateTime.from(unixToZonedDateTime(appointment.time)), //convert to Temporal.ZonedDateTime
    end: Temporal.ZonedDateTime.from(
      unixToZonedDateTime(appointment.time + timeAddon),
    ), //convert to Temporal.ZonedDateTime
  }));

  console.warn("Events:", events);

  return { events };
};

function unixToZonedDateTime(
  unixSeconds: number,
  timeZone: string = "UTC",
): string {
  return Temporal.Instant.fromEpochMilliseconds(unixSeconds * 1000)
    .toZonedDateTimeISO(timeZone)
    .toString();
}
