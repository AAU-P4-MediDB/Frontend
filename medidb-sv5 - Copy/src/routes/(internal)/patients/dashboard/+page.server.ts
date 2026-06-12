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
	date: number;
	patient_summary?: string;
	eprescription_edispensation?: string;
	laboratory_results?: string;
	medical_imaging_and_reports?: string;
	hospital_discharge_reports?: string;
}
export interface JournalResponse {
	uuid: string;
	journal: Journal[]; // was Journal (singular), API returns an array
}

// --- 3.1.3 Prescription ---
export interface Prescription {
	date: string;
	name: string;
	dosage?: string;
	instructions?: string;
	status?: 'active' | 'expired' | 'paused';
}
export interface PrescriptionResponse {
	uuid: string;
	prescription: Prescription[]; // key is "prescription" (singular) to match API
}

// --- 3.1.4 Diagnosis ---
export interface Diagnosis {
	name: string;
	temp?: string;
}
export interface DiagnosisResponse {
	uuid: string;
	diagnosis: Diagnosis[]; // key is "diagnosis" (singular) to match API
}

// --- 3.1.5 Appointment ---
export interface Appointment {
	appointment_id: string;
	time: number; // unix timestamp
	name: string;
	reason: string;
	doctor: string;
	notes: string;
	clinic: string;
}
export interface AppointmentResponse {
	uuid: string;
	appointment: Appointment[]; // key is "appointment" (singular) to match API
}

// --- 3.1.6 Person Info ---
export interface PersonInfo {
	uuid: string;
	name: string;
	pronouns: string;
	bday: string;
	bio_sex: boolean;
	clinic: string;
	pfp?: string;
}

// --- 3.1.7 Lab Results ---
export interface LabResult {
	test_issuer: string;
	test_issuer_clinic: string;
	test_executor: string;
	test_executor_phone: number;
	result_id: string;
	time: number; // unix timestamp
	test: string;
	result: Record<string, unknown>;
	unit: string;
	reference_range: string;
	notes: string;
}
export interface LabResultResponse {
	uuid: string;
	lab_results: LabResult[]; // key is "lab_results" to match API
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

/**
 * The API returns some fields as JSON-encoded strings inside the JSON response.
 * This helper parses them in-place so components receive real arrays/objects.
 */
function parseField(obj: Record<string, unknown> | null, key: string): void {
	if (obj && typeof obj[key] === 'string') {
		try {
			obj[key] = JSON.parse(obj[key] as string);
		} catch {
			console.error(`Failed to parse field "${key}" on`, obj);
		}
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
	let token = locals.token;

	if (selectedCPR !== null) {
		[vitals, journal, prescriptions, diagnoses, appointments, info, labResults] =
			await Promise.all([
				fetchPatientData<VitalsResponse>      ('/api/dpm/usrfet/vitals',       selectedCPR, cookieHeader, locals.token),
				fetchPatientData<JournalResponse>     ('/api/dpm/usrfet/journal',      selectedCPR, cookieHeader, locals.token),
				fetchPatientData<PrescriptionResponse>('/api/dpm/usrfet/prescription', selectedCPR, cookieHeader, locals.token),
				fetchPatientData<DiagnosisResponse>   ('/api/dpm/usrfet/diagnosis',    selectedCPR, cookieHeader, locals.token),
				fetchPatientData<AppointmentResponse> ('/api/dpm/usrfet/appointment',  selectedCPR, cookieHeader, locals.token),
				fetchPatientData<PersonInfo>          ('/api/dpm/usrfet/info',         selectedCPR, cookieHeader, locals.token),
				fetchPatientData<LabResultResponse>   ('/api/dpm/usrfet/labresult',    selectedCPR, cookieHeader, locals.token),
			]);
	}

	// Parse any fields the API returns as JSON-encoded strings
	parseField(journal        as Record<string, unknown> | null, 'journal');
	parseField(prescriptions  as Record<string, unknown> | null, 'prescription');
	parseField(diagnoses      as Record<string, unknown> | null, 'diagnosis');
	parseField(appointments   as Record<string, unknown> | null, 'appointment');
	parseField(labResults     as Record<string, unknown> | null, 'lab_results');
	parseField(vitals         as Record<string, unknown> | null, 'vitals');

	return {
		selectedCPR,
		vitals,
		journal,
		prescriptions,
		diagnoses,
		appointments,
		info,
		labResults,
		token,
	};
};