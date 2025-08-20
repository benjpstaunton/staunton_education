export default async (req) => {
  return new Response(
    JSON.stringify({ ok: true, message: "Hello from Netlify Functions!" }),
    { headers: { "Content-Type": "application/json" } }
  );
};
