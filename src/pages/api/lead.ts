import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, name, company } = data;

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Send lead notification via Resend (only if key is configured)
    const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: 'Ejago Lead Bot <leadbot@ejago.com>',
          to: ['info@ejago.com'],
          replyTo: email,
          subject: `New lead: ${name || email} ${company ? `from ${company}` : ''}`,
          html: `
            <h2>New Ejago Website Lead</h2>
            <p><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Source:</strong> Ejago Lead Magnet Form</p>
          `,
        });
      } catch (emailError) {
        console.error('Resend email error:', emailError);
        // Don't fail the request — lead was still captured
      }
    }

    console.log('📬 Lead magnet signup:', email);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Lead form error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
