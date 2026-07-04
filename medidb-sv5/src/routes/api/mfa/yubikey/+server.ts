import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

const BASE = env.API_BASE_URL ?? "http://192.168.134.230:10140";

export async function GET({ locals }) {
  if (!locals.token) return json({ error: "Unauthorized" }, { status: 401 });

  const res = await fetch(`${BASE}/api/um/mfa/yubikey`, {
    headers: { Authorization: `Bearer ${locals.token}` },
  });

  if (!res.ok) return json({ error: "Failed" }, { status: res.status });
  return json(await res.json());
}

export async function POST({ request, locals }) {
  if (!locals.token) return json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const res = await fetch(`${BASE}/api/um/mfa/yubikey/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${locals.token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  return json(data, { status: res.status });
}
