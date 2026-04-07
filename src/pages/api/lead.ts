import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    console.log('📬 Lead magnet signup:', data.email);
    
    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Lead form error:', error);
    return new Response(JSON.stringify({ error: 'Bad request' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};