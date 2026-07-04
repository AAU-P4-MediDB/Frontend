import { redirect, type Handle } from "@sveltejs/kit";
import { verifyJwt } from "$lib/server/auth";

const PUBLIC_ROUTES = ["/", "/login", "/api/auth/login", "/mfa", "/api/auth/mfa"];

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("jwt");

  // 1. If a cookie exists, decode it and populate the session
  if (token) {
    const payload = await verifyJwt(token);

    if (payload) {
      event.locals.token = token;
      event.locals.user = {
        uuid: payload.sub as string,
        email: payload.email as string,
        position: (payload.position as App.User["position"]) || "Doctor",
      };
    }
  }

  // 2. Guard private routes
  const isPublic = PUBLIC_ROUTES.includes(event.url.pathname);

  if (!isPublic && !event.locals.token) {
    // If an API endpoint is hit unauthenticated, return a clean 401 JSON packet
    if (event.url.pathname.startsWith("/api/")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Otherwise, redirect standard client pages back to the gatehouse
    throw redirect(303, "/login");
  }

  return resolve(event);
};
