import { fail } from '@sveltejs/kit';
import { api } from '$lib/server/api';
import type { Actions } from './$types';

export interface Clinic {
	name: string;
	uuid: string;
	location: string;
	email?: string;
	phone: number;
	cvr: number;
}

export interface LocalAdmin {
	uuid: number;
	email: string;
	name: string;
	clinic: string;
	pfp?: string;
	phone: number;
}

export const actions: Actions = {
	// --- 4.1.1 - Create Clinic ---
	createClinic: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();

		const name = formData.get('name')?.toString().trim();
		const location = formData.get('location')?.toString().trim();
		const email = formData.get('email')?.toString().trim() || undefined;
		const phoneRaw = formData.get('phone')?.toString();
		const cvrRaw = formData.get('cvr')?.toString();

		if (!name || !location || !phoneRaw || !cvrRaw) {
			return fail(400, { action: 'createClinic', error: 'All required fields must be filled out.' });
		}

		const phone = parseInt(phoneRaw, 10);
		const cvr = parseInt(cvrRaw, 10);

		if (isNaN(phone)) return fail(400, { action: 'createClinic', error: 'Phone must be a valid integer.' });
		if (isNaN(cvr)) return fail(400, { action: 'createClinic', error: 'CVR must be a valid integer.' });

		const body: Record<string, unknown> = { name, location, phone, cvr };
		if (email) body.email = email;

		try {
			await api.post('/api/sudo/cc', body, cookieHeader);
		} catch (e) {
			console.error('Create clinic failed:', e);
			return fail(500, { action: 'createClinic', error: 'Clinic creation failed.' });
		}

		return { action: 'createClinic', success: true };
	},

	// --- 4.1.2 - Fetch Clinic ---
	fetchClinic: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();

		if (!email) return fail(400, { action: 'fetchClinic', error: 'Email is required.' });

		let clinic: Clinic;
		try {
			clinic = await api.post<Clinic>('/api/sudo/fc', { email }, cookieHeader);
		} catch (e) {
			console.error('Fetch clinic failed:', e);
			return fail(500, { action: 'fetchClinic', error: 'Clinic fetch failed.' });
		}

		return { action: 'fetchClinic', success: true, clinic };
	},

	// --- 4.1.3 - Delete Clinic ---
	deleteClinic: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();
		const uuid = formData.get('uuid')?.toString().trim();

		if (!uuid) return fail(400, { action: 'deleteClinic', error: 'Clinic UUID is required.' });

		try {
			await api.delete(`/api/sudo/dc/${uuid}`, cookieHeader);
		} catch (e) {
			console.error('Delete clinic failed:', e);
			return fail(500, { action: 'deleteClinic', error: 'Clinic deletion failed.' });
		}

		return { action: 'deleteClinic', success: true };
	},

	// --- 4.2.1 - Create Local Admin ---
	createLocalAdmin: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();

		const email = formData.get('email')?.toString().trim();
		const password = formData.get('password')?.toString();
		const name = formData.get('name')?.toString().trim();
		const clinic = formData.get('clinic')?.toString().trim();
		const phoneRaw = formData.get('phone')?.toString();
		const pfpFile = formData.get('pfp') as File | null;

		if (!email || !password || !name || !clinic || !phoneRaw) {
			return fail(400, { action: 'createLocalAdmin', error: 'All required fields must be filled out.' });
		}

		const phone = parseInt(phoneRaw, 10);
		if (isNaN(phone)) return fail(400, { action: 'createLocalAdmin', error: 'Phone must be a valid integer.' });

		const body: Record<string, unknown> = {
			email,
			password,
			name,
			clinic,
			phone,
			position: 4 // always 4 per spec
		};

		if (pfpFile && pfpFile.size > 0) {
			const base64 = Buffer.from(await pfpFile.arrayBuffer()).toString('base64');
			body.pfp = `data:${pfpFile.type};base64,${base64}`;
		}

		try {
			await api.post('/api/sudo/lam/create', body, cookieHeader);
		} catch (e) {
			console.error('Create local admin failed:', e);
			return fail(500, { action: 'createLocalAdmin', error: 'Local admin creation failed.' });
		}

		return { action: 'createLocalAdmin', success: true };
	},

	// --- 4.2.2 - Delete Local Admin ---
	deleteLocalAdmin: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();
		const uuid = formData.get('uuid')?.toString().trim();

		if (!uuid) return fail(400, { action: 'deleteLocalAdmin', error: 'User UUID is required.' });

		try {
			await api.delete(`/api/sudo/lam/${uuid}/del/`, cookieHeader);
		} catch (e) {
			console.error('Delete local admin failed:', e);
			return fail(500, { action: 'deleteLocalAdmin', error: 'Local admin deletion failed.' });
		}

		return { action: 'deleteLocalAdmin', success: true };
	},

	// --- 4.2.3 - Fetch Local Admin ---
	fetchLocalAdmin: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();

		if (!email) return fail(400, { action: 'fetchLocalAdmin', error: 'Email is required.' });

		let localAdmin: LocalAdmin;
		try {
			localAdmin = await api.post<LocalAdmin>('/api/sudo/lam/fetch', { email }, cookieHeader);
		} catch (e) {
			console.error('Fetch local admin failed:', e);
			return fail(500, { action: 'fetchLocalAdmin', error: 'Local admin fetch failed.' });
		}

		return { action: 'fetchLocalAdmin', success: true, localAdmin };
	}
};
