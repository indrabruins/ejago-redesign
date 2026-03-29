# Ejago Lead Qualification Bot — SPEC

## Problem
Ejago redesign is live at https://indrabruins.github.io/ejago-redesign/ but there's no lead capture. No contact form, no pricing page, no way to convert visitors into paying clients.

## Solution
A client intake system:
1. **Add a lead capture page** (`/lead`) to the Ejago site — a beautiful "Book a Strategy Call" landing page with:
   - Name, email, company, monthly budget dropdown ($1K-5K, $5K-10K, $10K+), primary challenge (dropdown: content ops, analytics, automation, full AI agency)
   - Inline validation, dark theme matching the site
2. **A Google Sheets integration** — form submits to a Google Form OR a Web App endpoint that appends to a Sheets spreadsheet
3. **A Discord notification** — when a lead comes in, post to the Techbruins Project Discord channel using the Discord bot token
4. **Auto-respond email** — sends a Calendly-style booking link or "we'll be in touch within 24h" reply

## Technical Approach
- **Lead form**: Add to existing index.html or create new `/lead.html` page
- **Form submission**: Use Google Apps Script Web App OR Formspree (no backend needed)
  - Formspree: `<form action="https://formspree.io/f/{form_id}" method="POST">`
  - Create a free Formspree account and get a form ID
  - Formspree handles email auto-reply out of the box
- **Discord notification**: POST to Discord webhook URL
  - Create a webhook in the Techbruins Project Discord channel
  - POST JSON: {content: "New Ejago Lead: {name} from {company}"} 
- **Sheets integration**: Use Formspree + Zapier, or Google Apps Script

## Files
- `lead.html` — the intake landing page (add to ejago-redesign repo)
- `webhook-handler.py` — optional Python script that receives form data and posts to Discord
- `README.md` — setup instructions (Formspree account, Discord webhook, GitHub Pages update)

## Success Criteria
- Live "Book a Strategy Call" page at https://indrabruins.github.io/ejago-redesign/lead.html
- Leads submitted to Formspree dashboard
- Discord notification fires when form submitted
- Auto-reply email sent to lead within minutes
