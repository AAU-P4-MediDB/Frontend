import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function POST({ request, cookies }) {
    const body = await request.json();
    let res;
    try {
        res = await fetch('http://192.168.134.6:10140/api/um/ac/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        });
    } catch (e) {
        console.error('Fetch to backend failed:', e);
        return new Response(null, { status: 502 });
    }

    if (!res.ok) return new Response(null, { status: 401 });

    // const { jwt_token } = await res.json();
    const data = await res.json();
    console.log('Backend response:', data);

    cookies.set('jwt', data.jwt_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,   // set true when behind HTTPS
        path: '/',
        maxAge: 60 * 60 * 8
    });

    return json({ success: true });
}