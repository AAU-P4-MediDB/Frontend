import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

const BASE = env.API_BASE_URL ?? "http://192.168.134.230:10140";

export async function POST({ request, cookies }) {
  const body = await request.json();
  let res;

  try {
    res = await fetch(`${BASE}/api/um/ac/mfa/verify`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error("Fetch to backend failed:", e);
    return json({ error: "Server unreachable" }, { status: 502 });
  }

  if (res.status === 202) {
    const data = await res.json();
    return json({ mfaRequired: true, mfaToken: data.mfaToken, remainingMethods: data.remainingMethods }, { status: 202 });
  }

  if (!res.ok) {
    return json({ error: "Invalid code" }, { status: 401 });
  }

  const data = await res.json();

  cookies.set("jwt", data.accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  cookies.set("refresh_token", data.refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return json({ success: true });
}
