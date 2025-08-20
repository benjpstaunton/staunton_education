import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL, { ssl: "require" });

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const data = await req.json();

    // Insert data from enrolment.html form into enrolments table
    await sql`
      INSERT INTO enrolments (
        parent_name, parent_email, parent_phone,
        child_name, dob, address,
        emergency_contact, allergies, agree_terms
      )
      VALUES (
        ${data.parentName}, ${data.parentEmail}, ${data.parentPhone},
        ${data.childName}, ${data.dob}, ${data.address},
        ${data.emergencyContact}, ${data.allergies}, ${data.agreeTerms === "on"}
      );
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
