import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const data = await req.json();

    // Insert data from enquiry.html form into enquiries table
    await sql`
      INSERT INTO enquiries (parent_name, email, phone, child_age, message, intro_call)
      VALUES (${data.parentName}, ${data.email}, ${data.phone}, ${data.childAge}, ${data.message}, ${data.introCall});
    `;

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};
