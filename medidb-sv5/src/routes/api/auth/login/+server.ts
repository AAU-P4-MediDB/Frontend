import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function POST({ request, cookies }) {
    const body = await request.json();

    // const res = await fetch(`${env.API_BASE_URL}/api/um/ac/login`, {
    const res = await fetch('http://192.168.134.6:10140/api/um/ac/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!res.ok) return new Response(null, { status: 401 });

    // const { token } = await res.json();

    // cookies.set('auth_token', token, {
    //     httpOnly: true,
    //     sameSite: 'strict',
    //     secure: true,
    //     path: '/',
    //     maxAge: 60 * 60 * 8 // 8 hours
    // });

    return json({ success: true });
}