import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
  const body = await request.json();
  let res;

<<<<<<< HEAD
    if (!res.ok) return new Response(null, { status: 401 });

    // const { jwt_token } = await res.json();
    const data = await res.json();
    console.log('Backend response:', data);

    cookies.set('jwt', data.jwt_token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,   
        path: '/',
        maxAge: 60 * 60 * 8
=======
  try {
    res = await fetch("http://192.168.134.6:10140/api/um/ac/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
>>>>>>> origin/main
    });
  } catch (e) {
    console.error("Fetch to backend failed:", e);
    return json({ error: "Server unreachable" }, { status: 502 });
  }

  if (!res.ok) {
    return json({ error: "Invalid credentials" }, { status: 401 });
  }

  const data = await res.json();

  // Explicitly tie it to the root path scope
  cookies.set("jwt", data.jwt_token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/", // Crucial: Must match your logout endpoint path exactly
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return json({ success: true });
}
