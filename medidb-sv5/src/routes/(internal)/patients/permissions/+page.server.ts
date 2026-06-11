import { api } from '$lib/server/api';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';


interface PermissionRequest {
	pt_cpr: string;
	dr_id: string;
	perm_int: number;
	note: string;
}

interface Doctor {
	uuid: string;
	name: string;
	email: string;
	position: string;
	clinic: string;
}

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const doctorID = locals.user?.uuid;
	if (!doctorID) return { permission_requests: { dr_perm_requests: [] }, doctors: [] };

	const cookieHeader = cookies
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');

	let dr_perm_requests: PermissionRequest[] = [];
	let doctors: Doctor[] = [];

	try {
		const data = await api.get<{
			code: string;
			message: string;
			dr_perm_requests: PermissionRequest[];
		}>(`/api/dpm/perm/request/get/${doctorID}`, cookieHeader, locals.token);

		const seen = new Set<string>();
	dr_perm_requests = (data.dr_perm_requests ?? []).filter((r) => {
		if (seen.has(r.pt_cpr)) return false;
		seen.add(r.pt_cpr);
		return true;
	});

		const otherIds = [
			...new Set(dr_perm_requests.map((r) => r.dr_id)),
		].filter((id) => id !== doctorID);

		for (const id of otherIds) {
			try {
				const doc = await api.post<Record<string, unknown>>(
					'/api/um/fetch',
					{ uuid: id },
					cookieHeader,
					locals.token
				);
				doctors.push({
					uuid: id,
					name: (doc.name as string) ?? id,
					email: (doc.email as string) ?? '',
					position: (doc.position as string) ?? '',
					clinic: (doc.clinic as string) ?? '',
				});
			} catch {
				doctors.push({ uuid: id, name: id, email: '', position: '', clinic: '' });
			}
		}
	} catch (e) {
		console.error('Permission requests fetch failed:', e);
	}

	return { permission_requests: { dr_perm_requests }, doctors };
};

export const actions: Actions = {
	assign: async ({ request, cookies, locals }) => {
		const cookieHeader = cookies
			.getAll()
			.map((c) => `${c.name}=${c.value}`)
			.join('; ');

		const formData = await request.formData();
		const pt_cprsRaw = formData.get('pt_cprs')?.toString();
		const dr_uuid = formData.get('dr_uuid')?.toString().trim();

		if (!pt_cprsRaw || !dr_uuid) {
			return fail(400, { action: 'assign', error: 'Select patients and a target doctor.' });
		}

		const pt_cprs: string[] = JSON.parse(pt_cprsRaw);

		if (pt_cprs.length === 0) {
			return fail(400, { action: 'assign', error: 'Select at least one patient.' });
		}

		const results: { pt_cpr: string; success: boolean; error?: string }[] = [];

		for (const pt_cpr of pt_cprs) {
			try {
				await api.post(
					'/api/dpm/perm/request/create',
					{ 'Pt. CPR': pt_cpr, 'Dr. UUID': dr_uuid, 'Perm. Int': 0 },
					cookieHeader,
					locals.token
				);
				results.push({ pt_cpr, success: true });
			} catch (e) {
				results.push({ pt_cpr, success: false, error: String(e) });
			}
		}

		const allOk = results.every((r) => r.success);
		if (!allOk) {
			return fail(500, { action: 'assign', error: 'Some assignments failed.', results });
		}

		return { action: 'assign', success: true, results };
	},
};
