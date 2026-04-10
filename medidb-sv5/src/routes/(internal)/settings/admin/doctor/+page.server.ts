import { fail } from '@sveltejs/kit';
import { api } from '$lib/server/api';
import type { Actions } from './$types';

export interface User {
	uuid: number;
	name: string;
	clinic: string;
	email: string;
	position: string;
	pfp?: string; // optional
	phone: number;
}

export const actions: Actions = {
	register: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();

		const email = formData.get('email')?.toString().trim();
		const password = formData.get('password')?.toString();
		const name = formData.get('name')?.toString().trim();
		const clinic = formData.get('clinic')?.toString().trim();
		const positionRaw = formData.get('position')?.toString();
		const phoneRaw = formData.get('phone')?.toString();
		const pfpFile = formData.get('pfp') as File | null;

		if (!email || !password || !name || !clinic || !positionRaw || !phoneRaw) {
			return fail(400, { action: 'register', error: 'All required fields must be filled out.' });
		}

		const position = parseInt(positionRaw, 10);
		const phone = parseInt(phoneRaw, 10);

		if (isNaN(position)) return fail(400, { action: 'register', error: 'Position must be a valid integer.' });
		if (isNaN(phone)) return fail(400, { action: 'register', error: 'Phone must be a valid integer.' });

		const body: Record<string, unknown> = { email, password, name, clinic, position, phone };

		if (pfpFile && pfpFile.size > 0) {
			const base64 = Buffer.from(await pfpFile.arrayBuffer()).toString('base64');
			body.pfp = `data:${pfpFile.type};base64,${base64}`;
		}

		try {
			await api.post('/api/um/ac/register', body, cookieHeader);
		} catch (e) {
			console.error('Register failed:', e);
			return fail(500, { action: 'register', error: 'Registration failed.' });
		}

		return { action: 'register', success: true };
	},

	deleteUser: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();
		const uuid = formData.get('uuid')?.toString().trim();

		if (!uuid) return fail(400, { action: 'deleteUser', error: 'User UUID is required.' });

		try {
			await api.delete(`/api/um/${uuid}/del/`, cookieHeader);
		} catch (e) {
			console.error('Delete failed:', e);
			return fail(500, { action: 'deleteUser', error: 'Deletion failed.' });
		}

		return { action: 'deleteUser', success: true };
	},

	fetchUser: async ({ request, cookies }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();

		if (!email) return fail(400, { action: 'fetchUser', error: 'Email is required.' });

		let user: User;
		try {
			user = await api.post<User>('/api/um/fetch', { email }, cookieHeader);
		} catch (e) {
			console.error('Fetch user failed:', e);
			return fail(500, { action: 'fetchUser', error: 'User fetch failed.' });
		}

		return { action: 'fetchUser', success: true, user };
	}
};