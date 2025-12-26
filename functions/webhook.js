export async function onRequestPost({ request }) {
  const data = await request.json();
  
  // Filter hanya 3 field yang dibutuhkan
  const filteredData = {
    name: data.name || "",
    pengirim: data.pengirim || "",
    pesan: data.pesan || ""
  };
  
  console.log("Filtered message:", filteredData);
  
  return new Response("ok", { status: 200 });
}
