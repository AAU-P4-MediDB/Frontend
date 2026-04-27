import { api } from '$lib/server/api';
import type { PageServerLoad } from './$types';

// --- Existing ---
export interface Patient {
	name: string;
	pronouns: string;
	age: number;
	pfp: string;
	uuid: string;
}

// --- 3.1.1 Vitals ---
export interface Vitals {
	date: string;
	heart_rate?: string;
	blood_pressure?: string;
	SpO2?: string;
	[key: string]: unknown;
}
export interface VitalsResponse {
	uuid: string;
	vitals: Vitals;
}

// --- 3.1.2 Journal ---
export interface Journal {
	date: string;
	patient_summary?: string;
	eprescription_edispensation?: string;
	laboratory_results?: string;
	medical_imaging_and_reports?: string;
	hospital_discharge_reports?: string;
}
export interface JournalResponse {
	uuid: string;
	journal: Journal;
}

// --- 3.1.3 Prescription ---
export interface PrescriptionResponse {
	uuid: string;
	prescriptions: Record<string, unknown>;
}

// --- 3.1.4 Diagnosis ---
export interface DiagnosisResponse {
	uuid: string;
	diagnoses: string[];
}

// --- 3.1.5 Appointment ---
export interface Appointment {
	appointment_id: string;
	date: string;
	time: string;
	doctor: string;   // ref to CUR (uuid)
	notes: string;
	clinic: string;   // ref to CCR (uuid)
}
export interface AppointmentResponse {
	uuid: string;
	appointments: Appointment[];
}

// --- 3.1.6 Person Info ---
export interface PersonInfo {
	uuid: string;
	name: string;
	pronouns: string;
	bday: string;
	bio_sex: boolean;
	clinic: string;
	pfp?: string; // optional
}

// --- 3.1.7 Lab Results ---
export interface LabResult {
	test_issuer: string;         // ref to CUR (uuid)
	test_issuer_clinic: string;  // ref to CCR (uuid)
	test_executor: string;
	test_executor_phone: number;
	result_id: string;
	date: string;
	test_name: string;
	result: Record<string, unknown>;
	unit: string;
	reference_range: string;
	notes: string;
}
export interface LabResultResponse {
	uuid: string;
	lab_results: LabResult[];
}

// --- Helpers ---

async function fetchPatientData<T>(
	endpoint: string,
	cpr: string,
	cookieHeader: string,
	token: string
): Promise<T | null> {
	try {
		return await api.post<T>(endpoint, { CPR_pt: cpr }, cookieHeader, token);
	} catch (e) {
		console.error(`Fetch failed [${endpoint}]:`, e);
		return null;
	}
}

// --- Load ---

export const load: PageServerLoad = async ({ cookies, url, locals }) => {
	const cookieHeader = cookies
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');

	// TODO: pull doctorID from session cookie once auth is wired up
	const doctorID = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';

	// let patients: Patient[] = [];
	// try {
		// patients = await api.get<Patient[]>(`/api/dpm/pf/${doctorID}`, cookieHeader);
	// } catch (e) {
		// console.error('Patients fetch failed:', e);
	// }

	// Selected patient CPR from query param, e.g. ?cpr=1234567890
	const cprParam = '120472-1023';
	const selectedCPR = cprParam ? cprParam : null;

	let vitals:        VitalsResponse       | null = null;
	let journal:       JournalResponse      | null = null;
	let prescriptions: PrescriptionResponse | null = null;
	let diagnoses:     DiagnosisResponse    | null = null;
	let appointments:  AppointmentResponse  | null = null;
	let info:          PersonInfo           | null = null;
	let labResults:    LabResultResponse    | null = null;

	if (selectedCPR !== null) {
		[vitals, journal, prescriptions, diagnoses, appointments, info, labResults] =
			await Promise.all([
				fetchPatientData<VitalsResponse>      ('/api/dpm/usrfet/vitals',        selectedCPR, cookieHeader, locals.token),
				fetchPatientData<JournalResponse>     ('/api/dpm/usrfet/journal',       selectedCPR, cookieHeader, locals.token),
				fetchPatientData<PrescriptionResponse>('/api/dpm/usrfet/prescription',  selectedCPR, cookieHeader, locals.token),
				fetchPatientData<DiagnosisResponse>   ('/api/dpm/usrfet/diagnosis',     selectedCPR, cookieHeader, locals.token),
				fetchPatientData<AppointmentResponse> ('/api/dpm/usrfet/appointment',   selectedCPR, cookieHeader, locals.token),
				fetchPatientData<PersonInfo>          ('/api/dpm/usrfet/info',          selectedCPR, cookieHeader, locals.token),
				fetchPatientData<LabResultResponse>   ('/api/dpm/usrfet/labresult',     selectedCPR, cookieHeader, locals.token),
			]);
	}

	// DEBUGGING SECTION
	// console.warn('Patients:', patients);
	// console.warn('Selected CPR:', selectedCPR);
	// console.warn('Person info:', info);
	// console.warn('Vitals:', vitals);
	// console.warn('Journal:', journal);
	// console.warn('Prescriptions:', prescriptions);
	// console.warn('Diagnoses:', diagnoses);
	// console.warn('Appointments:', appointments);
	// console.warn('Lab results:', labResults);

	return {
		// patients,
		selectedCPR,
		vitals,
		journal,
		prescriptions,
		diagnoses,
		appointments,
		info,
		labResults,
	};
};