import { env } from '$env/dynamic/private';

async function request<T>(
	path: string,
	init?: RequestInit,
	cookieHeader?: string
): Promise<T> {
	const base = env.API_BASE_URL ?? 'http://192.168.134.6:10140';

	const res = await fetch(`${base}${path}`, {
		...init,
		headers: {
			'Content-Type': 'application/json',
			...(cookieHeader ? { Cookie: cookieHeader } : {}),
			...init?.headers,
		},
	});

	if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
	return res.json();
}

export const api = {
	get: <T>(path: string, cookies?: string, queryParams?: Record<string, string>) => {
		const url = queryParams ? `${path}?${new URLSearchParams(queryParams)}` : path;
		return request<T>(url, { method: 'GET' }, cookies);
	},
	post: <T>(path: string, body: unknown, cookies?: string) =>
		request<T>(path, { method: 'POST', body: JSON.stringify(body) }, cookies),
	delete: <T>(path: string, cookies?: string) =>
		request<T>(path, { method: 'DELETE' }, cookies),
};
