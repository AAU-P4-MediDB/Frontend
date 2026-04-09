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

export const load: PageServerLoad = async ({ cookies }) => {
	const cookieHeader = cookies
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');

	// TODO: pull userId from session cookie once auth is wired up
	const userId = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';

	let timeline_data: TimelineEntry[] = [];
	let appointment_data: AppointmentEntry[] = [];

	try {
		timeline_data = await api.get<TimelineEntry[]>(
			`/api/dpm/${userId}/timeline/get`,
			cookieHeader
		);
		appointment_data = await api.get<AppointmentEntry[]>(
			`/api/dpm/calendar/sync/${userId}`,
			cookieHeader
		);
	} catch (e) {
		// BE unreachable or returned an error — page still renders, timeline shows empty state
		console.error('Timeline fetch failed:', e);
	}
	// console.warn('Timeline data:', timeline_data);
	// console.warn('Appointment data:', appointment_data);

	return { timeline_data, appointment_data };
};

export interface AppointmentEntry {
	uuid: string;
	name: string;
	reason: string;
	time: number;
	pfp: string;
}
