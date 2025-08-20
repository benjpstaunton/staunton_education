import postgres from "postgres";

// Use the environment variable provided by Netlify’s Neon extension
const sql = postgres(process.env.NETLIFY_DATABASE_URL, { ssl: "require" });

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
        ${data.emergencyContact}, ${data.allergies}, ${data.agreeTerms}
      );
    `;

    return new Response(JSON.stringify({ ok: true, message: "Enrolment saved successfully." }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("submit-enrolment error:", err);
    return new Response("Server error", { status: 500 });
  }
};
