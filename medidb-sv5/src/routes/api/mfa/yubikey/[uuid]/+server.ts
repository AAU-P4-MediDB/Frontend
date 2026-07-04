import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

const BASE = env.API_BASE_URL ?? "http://192.168.134.230:10140";

export async function DELETE({ params, locals }) {
  if (!locals.token) return json({ error: "Unauthorized" }, { status: 401 });

  const res = await fetch(`${BASE}/api/um/mfa/yubikey/${params.uuid}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${locals.token}` },
  });

  if (!res.ok) return json({ error: "Not found" }, { status: res.status });
  return json(await res.json());
}
