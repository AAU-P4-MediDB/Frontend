// src/hooks.server.ts
import { verifyJwt } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("auth_token");

  // Use 'undefined' instead of 'null'
  event.locals.token = undefined;
  event.locals.user = undefined;

  if (token) {
    const payload = await verifyJwt(token);
    if (payload) {
      event.locals.token = token;
      event.locals.user = {
        uuid: payload.sub as string,
        email: payload.email as string,
        position: payload.position as any,
      };
    }
  }

  return await resolve(event);
};
