import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function POST({ request, params, locals }) {
    const { uuid, type } = params;
    const body = await request.json();
    const base = env.API_BASE_URL ?? 'http://192.168.134.6:10140';

    let res;
    try {
        res = await fetch(`${base}/api/dpm/usrup/${uuid}/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${locals.token}`,
            },
            body: JSON.stringify(body),
        });
    } catch (e) {
        console.error(`Proxy fetch failed [usrup/${uuid}/${type}]:`, e);
        return new Response(null, { status: 502 });
    }

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        return new Response(text, { status: res.status });
    }

    const data = await res.json().catch(() => ({}));
    return json(data);
}
