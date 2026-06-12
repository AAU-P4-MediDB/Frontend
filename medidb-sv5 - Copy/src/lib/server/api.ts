import { env } from '$env/dynamic/private';

async function request<T>(
    path: string,
    init?: RequestInit,
    cookieHeader?: string,
    token?: string
): Promise<T> {
    const base = env.API_BASE_URL ?? 'http://192.168.134.6:10140';
    const res = await fetch(`${base}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...init?.headers,
        },
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
    return res.json();
}

export const api = {
    get: <T>(path: string, cookies?: string, token?: string, queryParams?: Record<string, string>) => {
        const url = queryParams ? `${path}?${new URLSearchParams(queryParams)}` : path;
        return request<T>(url, { method: 'GET' }, cookies, token);
    },
    post: <T>(path: string, body: unknown, cookies?: string, token?: string) =>
        request<T>(path, { method: 'POST', body: JSON.stringify(body) }, cookies, token),
    delete: <T>(path: string, cookies?: string, token?: string) =>
        request<T>(path, { method: 'DELETE' }, cookies, token),
};