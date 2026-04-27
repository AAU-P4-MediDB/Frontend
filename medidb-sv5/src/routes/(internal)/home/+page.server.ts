import { api } from "$lib/server/api";
import type { PageServerLoad } from "./$types";

type TimeLineSeverity = "High" | "Medium" | "Low";
type TimeLineDataType =
  | "Vitals"
  | "Lab Results"
  | "Prescriptions"
  | "Journal"
  | "Personal info"
  | "Diagnosis"
  | "Appointments";

export interface TimelineEntry {
  PatientId: string;
  doctor_accessing: string;
  date: string;
  doctor: string;
  data_type: TimeLineDataType;
  changes: string;
  severity: TimeLineSeverity;
}


export interface AppointmentEntry {
  patientGuid: string;
  cpr: string;
  name: string;
  reason: string;
  time: number;
  pfp: string;
}

export interface PermissionRequest {
  ptCPR: string;
  drUUID: string;
  permInt: number;
  note: string;
}

export interface Patients {
  name: string;
  pronouns: string;
  bday: string;
  bio_sex: boolean;
  pfp: string;
}

export interface Doctor {
  uuid: number;
  name: string;
  clinic: string;
  email: string;
  position: string;
  pfp: string;
  phone: number;
}

export const load: PageServerLoad = async ({ cookies, locals }) => {
  const cookieHeader = cookies
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // TODO: pull doctorID from session cookie once auth is wired up
  const doctorID = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";

  let timeline_data: TimelineEntry[] = [];
  let appointment_data: AppointmentEntry[] = [];
  let permission_requests: PermissionRequest[] = [];
  let patients: Patients[] = [];
  let doctor: Doctor | null = null;

  try {
    timeline_data = await api.get<TimelineEntry[]>(
      `/api/dpm/${doctorID}/timeline/get`,
      cookieHeader,
      locals.token,
    );
  } catch (e) {
    console.error("Timeline fetch failed:", e);
  }
  try {
    const res = await api.get<{
      code: number;
      calender: AppointmentEntry[];
    }>(
        `/api/dpm/calendar/sync/${doctorID}`,
        cookieHeader,
        locals.token,
    );

    console.log("APPOINTMENT RAW RESPONSE:", res);
    appointment_data = Array.isArray(res.calendar)
        ? res.calendar
        : [];

    appointment_data = appointment_data.sort(
        (a, b) => a.time - b.time
    );
  } catch (e) {
    console.error("Appointment fetch failed:", e);
  }
  try {
    permission_requests = await api.get<PermissionRequest[]>(
      `/api/dpm/perm/request/get/${doctorID}`,
      cookieHeader,
      locals.token,
    );
  } catch (e) {
    console.error("Permission request fetch failed:", e);
  }
  try {
    patients = await api.post<Patients[]>(
      `/api/dpm/usrfet/info`,
      // TODO: replace with actual patient CPR from appointments
      // colby durdan, uuid: e5f6a7b8-c9d0-4123-d0e1-f2a3b4c5d6e7
      {
        CPR_pt: "120472-1023",
      },
      cookieHeader,
      locals.token,
    );
  } catch (e) {
    console.error("Patients fetch failed:", e);
  }
  try {
    doctor = await api.post<Doctor>(
      `/api/um/fetch`,
      {
        uuid: doctorID,
      },
      cookieHeader,
      locals.token,
    );
  } catch (e) {
    console.error("Doctor fetch failed:", e);
  }

  // DEBUGGING SECTION
  // console.warn('Timeline data:', timeline_data);
  // console.warn('Appointment data:', appointment_data);
  // console.warn('Permission requests:', permission_requests);
  // console.warn('Doctor:', doctor);
  // console.warn('Patients:', patients);

  return {
    timeline_data,
    appointment_data,
    permission_requests,
    patients,
    doctor,
  };
};
