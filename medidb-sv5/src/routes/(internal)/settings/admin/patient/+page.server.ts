import { fail } from '@sveltejs/kit';
import { api } from '$lib/server/api';
import type { Actions } from './$types';

export const actions: Actions = {
	registerPatient: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();

		const name = formData.get('name')?.toString().trim();
		const pronouns = formData.get('pronouns')?.toString().trim();
		const clinic = formData.get('clinic')?.toString().trim();
		const bday = formData.get('bday')?.toString().trim();
		const weightRaw = formData.get('weight')?.toString();
		const bio_sexRaw = formData.get('bio_sex')?.toString();
		const CPRRaw = formData.get('CPR')?.toString();
		const diagnosesRaw = formData.get('diagnoses')?.toString();
		const vitalsRaw = formData.get('vitals')?.toString();
		const prescriptionsRaw = formData.get('prescriptions')?.toString();
		const pfpFile = formData.get('pfp') as File | null;

		if (!name || !pronouns || !clinic || !bday || !weightRaw || bio_sexRaw === undefined || !CPRRaw) {
			return fail(400, { action: 'registerPatient', error: 'All required fields must be filled out.' });
		}

		const weight = parseFloat(weightRaw);
		const CPR = parseInt(CPRRaw, 10);
		const bio_sex = bio_sexRaw === 'true';

		if (isNaN(weight)) return fail(400, { action: 'registerPatient', error: 'Weight must be a valid number.' });
		if (isNaN(CPR)) return fail(400, { action: 'registerPatient', error: 'CPR must be a valid integer.' });

		let diagnoses: string[] = [];
		if (diagnosesRaw) {
			try {
				diagnoses = JSON.parse(diagnosesRaw);
			} catch {
				return fail(400, { action: 'registerPatient', error: 'Diagnoses must be a valid JSON array.' });
			}
		}

		let vitals: unknown = null;
		if (vitalsRaw) {
			try {
				vitals = JSON.parse(vitalsRaw);
			} catch {
				return fail(400, { action: 'registerPatient', error: 'Vitals must be valid JSON.' });
			}
		}

		let prescriptions: unknown = null;
		if (prescriptionsRaw) {
			try {
				prescriptions = JSON.parse(prescriptionsRaw);
			} catch {
				return fail(400, { action: 'registerPatient', error: 'Prescriptions must be valid JSON.' });
			}
		}

		const body: Record<string, unknown> = {
			name,
			pronouns,
			clinic,
			bday,
			weight,
			bio_sex,
			CPR,
			diagnoses,
			vitals,
			prescriptions
		};

		if (pfpFile && pfpFile.size > 0) {
			const base64 = Buffer.from(await pfpFile.arrayBuffer()).toString('base64');
			body.pfp = `data:${pfpFile.type};base64,${base64}`;
		}

		try {
			await api.post('/api/pm/reg', body, cookieHeader);
		} catch (e) {
			console.error('Patient registration failed:', e);
			return fail(500, { action: 'registerPatient', error: 'Patient registration failed.' });
		}

		return { action: 'registerPatient', success: true };
	},

	deletePatient: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();
		const uuid = formData.get('uuid')?.toString().trim();

		if (!uuid) return fail(400, { action: 'deletePatient', error: 'Patient UUID is required.' });

		try {
			await api.delete(`/api/pm/${uuid}/del/`, cookieHeader);
		} catch (e) {
			console.error('Patient deletion failed:', e);
			return fail(500, { action: 'deletePatient', error: 'Patient deletion failed.' });
		}

		return { action: 'deletePatient', success: true };
	},

	assignPatient: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();
		const uuid_pt = formData.get('uuid_pt')?.toString().trim();
		const uuid_dr = formData.get('uuid_dr')?.toString().trim();

		if (!uuid_pt || !uuid_dr) {
			return fail(400, { action: 'assignPatient', error: 'Both patient UUID and doctor UUID are required.' });
		}

		try {
			await api.post('/api/pm/assignPat/confd', { uuid_pt, uuid_dr }, cookieHeader);
		} catch (e) {
			console.error('Patient assignment failed:', e);
			return fail(500, { action: 'assignPatient', error: 'Patient assignment failed.' });
		}

		return { action: 'assignPatient', success: true };
	}
};
