import { api } from '$lib/server/api';
import type { PageServerLoad } from './$types';


export interface permission_requests {
	Pt_CPR: string;
	Dr_UUID: string;
	Perm_Int: number;
	Note: string;
}

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const cookieHeader = cookies
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');

	// TODO: pull doctorID from session cookie once auth is wired up
	const patientID = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'; 

	let permission_requests: permission_requests[] = [];
	
	try {
		permission_requests = await api.get<permission_requests[]>(
			`/api/dpm/perm/request/get/${patientID}`,
			cookieHeader,
			locals.token
		);
	} catch (e) {
		console.error('Permission requests fetch failed:', e);
	}

	// DEBUGGING SECTION
	console.warn('Permission requests:', permission_requests);


	return { permission_requests };
};
