// DEPRECATED: This endpoint only works with SSR hosting (Node.js server).
// GitHub Pages does not support server-side code, so this endpoint will never run in production.
// Use Formspree AJAX submission in contact.astro instead.
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, website, budget, message } = data;
    
    // Log to console (for now - can hook up to Resend/SendGrid later)
    console.log('📬 Contact form submission:', { name, email, website, budget, message });
    
    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Bad request' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};