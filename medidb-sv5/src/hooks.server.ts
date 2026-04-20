import { redirect, type Handle } from '@sveltejs/kit';
import { verifyJwt } from '$lib/server/auth';

const PUBLIC_ROUTES = ['/', '/login'];

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('jwt');

    if (token) {
    const payload = await verifyJwt(token);
        if (payload) {
            event.locals.token = token;
            event.locals.user = {
                uuid: payload.sub as string,
                email: payload.email as string,
                position: payload.position as App.Locals['user']['position'],
            };
        }
    }

    const isPublic = PUBLIC_ROUTES.includes(event.url.pathname);
    if (!isPublic && !event.locals.token) {
        throw redirect(303, '/login');
    }

    return resolve(event);
};