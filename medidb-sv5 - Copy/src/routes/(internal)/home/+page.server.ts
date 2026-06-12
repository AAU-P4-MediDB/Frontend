import { api } from "$lib/server/api";
import { redirect } from "@sveltejs/kit"; // Import redirect for safety
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
  // 1. Safety Check: If no user is logged in, redirect to login page
  // This prevents the page from trying to fetch data for an 'undefined' ID
  if (!locals.user || !locals.token) {
    throw redirect(302, "/login");
  }

  // 2. Access the dynamic ID from locals
  const doctorID = locals.user.uuid;

  const cookieHeader = cookies
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // Initialize data holders
  let timeline_data: TimelineEntry[] = [];
  let appointment_data: AppointmentEntry[] = [];
  let permission_requests: PermissionRequest[] = [];
  let patients: Patients[] = [];
  let doctor: Doctor | null = null;

  // 3. API calls now use the authenticated doctorID and token
  try {
    timeline_data = await api.get<TimelineEntry[]>(
      `/api/dpm/${doctorID}/timeline/get`,
      cookieHeader,
      locals.token, // Uses real token from session
    );
  } catch (e) {
    console.error("Timeline fetch failed:", e);
  }

  try {
    const res = await api.get<{
      code: number;
      calender: AppointmentEntry[];
    }>(`/api/dpm/calendar/sync/${doctorID}`, cookieHeader, locals.token);

    appointment_data = Array.isArray(res.calender) ? res.calender : [];
    appointment_data = appointment_data.sort((a, b) => a.time - b.time);
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
      { CPR_pt: "120472-1023" }, // Keep this TODO as is for now
      cookieHeader,
      locals.token,
    );
  } catch (e) {
    console.error("Patients fetch failed:", e);
  }

  try {
    doctor = await api.post<Doctor>(
      `/api/um/fetch`,
      { uuid: doctorID },
      cookieHeader,
      locals.token,
    );
  } catch (e) {
    console.error("Doctor fetch failed:", e);
  }

  return {
    timeline_data,
    appointment_data,
    permission_requests,
    patients,
    doctor,
    user: locals.user, // Pass user info to the frontend for the UI
  };
};
