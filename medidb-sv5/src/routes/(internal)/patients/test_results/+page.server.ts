import { api } from '$lib/server/api';
import type { PageServerLoad } from './$types';


export interface Patients {
	name: string;
	pronouns: string;
	age: number;
	pfp: string; //path to pfp
	uuid: string;
}

export interface TestResults {
	uuid: string;
	test_results: Record<string, unknown>;
}

export const load: PageServerLoad = async ({ cookies }) => {
	const cookieHeader = cookies
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');

	// TODO: pull doctorID from session cookie once auth is wired up
	const doctorID = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'; 

	let patients: Patients[] = [];
	
	try {
		patients = await api.get<Patients[]>(
			`/api/dpm/pf/${doctorID}`,
			cookieHeader
		);
	} catch (e) {
		console.error('Patients fetch failed:', e);
	}

	// DEBUGGING SECTION
	console.warn('Patients:', patients);


	return { patients };
};
