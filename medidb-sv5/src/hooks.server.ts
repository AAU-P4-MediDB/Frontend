import { redirect, type Handle } from '@sveltejs/kit';

const PUBLIC_ROUTES = ['/', '/login'];

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('jwt');

    if (token) {
        event.locals.token = token;
    }

    const isPublic = PUBLIC_ROUTES.includes(event.url.pathname);
    if (!isPublic && !event.locals.token) {
        throw redirect(303, '/login');
    }

    return resolve(event);
};