import { api } from '$lib/server/api';
import type { PageServerLoad } from './$types';

type TimeLineSeverity = 'High' | 'Medium' | 'Low';
type TimeLineDataType =
	| 'Vitals'
	| 'Lab Results'
	| 'Prescriptions'
	| 'Journal'
	| 'Personal info'
	| 'Diagnosis'
	| 'Appointments';

export interface TimelineEntry {
	PatientId: number;
	doctor_accessing: string;
	date: string;
	doctor: string;
	data_type: TimeLineDataType;
	changes: string;
	severity: TimeLineSeverity;
}

export interface AppointmentEntry {
	uuid: string;
	name: string;
	reason: string;
	time: number;
	pfp: string;
}

export interface PermissionRequest {
	ptCPR: string;
	drUUID: number;
	permInt: number;
	note: string;
}

export const load: PageServerLoad = async ({ cookies }) => {
	const cookieHeader = cookies
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');

	// TODO: pull doctorID from session cookie once auth is wired up
	const doctorID = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'; 

	let timeline_data: TimelineEntry[] = [];
	let appointment_data: AppointmentEntry[] = [];
	let permission_requests: PermissionRequest[] = [];
	try {
		timeline_data = await api.get<TimelineEntry[]>(
			`/api/dpm/${doctorID}/timeline/get`,
			cookieHeader
		);
	} catch (e) {
		console.error('Timeline fetch failed:', e);
	}
	try {
		appointment_data = await api.get<AppointmentEntry[]>(
			`/api/dpm/calendar/sync/${doctorID}`,
			cookieHeader
		);
	} catch (e) {
		console.error('Appointment fetch failed:', e);
	}
	try {
		permission_requests = await api.get<PermissionRequest[]>(
			`/api/dpm/perm/request/get/${doctorID}`,
			cookieHeader
		);
	} catch (e) {
		console.error('Permission request fetch failed:', e);
	}
	// DEBUGGING SESSION
	// console.warn('Timeline data:', timeline_data);
	// console.warn('Appointment data:', appointment_data);
	console.warn('Permission requests:', permission_requests);

	return { timeline_data, appointment_data, permission_requests };
};
