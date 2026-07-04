import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
  const body = await request.json();
  let res;

  try {
    res = await fetch("http://192.168.134.230:10140/api/um/ac/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error("Fetch to backend failed:", e);
    return json({ error: "Server unreachable" }, { status: 502 });
  }

  if (!res.ok) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }

  const data = await res.json();

  cookies.set("jwt", data.jwt_token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return json({ success: true });
}
