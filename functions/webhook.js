export async function onRequestGet() {
  return new Response("ok", { status: 200 });
}

export async function onRequestPost({ request }) {
  let data = null;
  try {
    data = await request.json();
  } catch (e) {
    return new Response("invalid json", { status: 400 });
  }

  // sementara: log ke console (lihat di Pages > Functions/Logs)
  console.log(data);

  return new Response("ok", { status: 200 });
}
