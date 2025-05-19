export async function POST(request: Request) {
  const data = await request.json();
  return new Response(JSON.stringify({ received: data }), {
    headers: { 'Content-Type': 'application/json' },
  });
}