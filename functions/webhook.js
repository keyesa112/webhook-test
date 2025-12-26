export function onRequestGet({ request }) {
  console.log("GET hit:", request.url);
  return new Response("ok", { status: 200 });
}

export async function onRequestPost({ request }) {
  console.log("POST hit:", request.url, "content-type:", request.headers.get("content-type"));

  const raw = await request.text();
  console.log("RAW body:", raw);

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    console.log("JSON parse failed");
    return new Response("invalid json", { status: 400 });
  }

  console.log("JSON parsed:", data);
  return new Response("ok", { status: 200 });
}
