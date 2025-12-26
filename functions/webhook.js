export function onRequestGet() {
  return new Response("ok", { status: 200 });
}

export async function onRequestPost({ request }) {
  let data;
  try {
    data = await request.json();
  } catch {
    console.log("POST but invalid JSON");
    return new Response("invalid json", { status: 400 });
  }

  console.log("Incoming webhook payload:", data);

  return new Response(JSON.stringify({ ok: true, received: data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
