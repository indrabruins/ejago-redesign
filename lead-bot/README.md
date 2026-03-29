# Ejago Lead Qualification Bot — Setup Guide

## Overview

This directory contains the "Book a Strategy Call" intake page (`lead.html`) for the Ejago AI Automation agency site.

**Live URL:** `https://indrabruins.github.io/ejago-redesign/lead.html`

---

## Setup Checklist

### 1. Formspree — Form Backend & Auto-Reply Email

Formspree handles form submission storage AND auto-reply emails with zero backend code.

**Steps:**
1. Create a free account at [formspree.io](https://formspree.io)
2. Click **New Form** → name it "Ejago Lead Intake"
3. Copy the **Form ID** from your form's endpoint (e.g., `xpwzvjkl`)
4. Open `lead.html` and replace the form action:

```diff
- action="https://formspree.io/f/YOUR_FORM_ID"
+ action="https://formspree.io/f/xpwzvjkl"
```

5. In your Formspree dashboard, go to **Settings → Email Notifications** and ensure your reply-to email is set.
6. Formspree's **auto-reply** feature sends a confirmation email to the submitter automatically. Configure it under **Settings → Autoresponse**.

**Formspree free plan limits:** 50 submissions/month, 1 form, auto-reply enabled.

---

### 2. Discord Webhook — Lead Notifications

When a lead submits the form, a notification is posted to your Discord channel via a webhook.

**Steps:**
1. Open [Discord](https://discord.com) → open the **Techbruins Project** server
2. Go to **Channel Settings → Integrations → Webhooks** → **Create Webhook**
3. Name it "Ejago Lead Bot" and copy the webhook URL
4. In `lead.html`, the Discord notification is handled client-side by Formspree's webhook integration OR you can add a serverless function. For now, leads appear in your **Formspree dashboard**.

> **Note:** Full Discord webhook integration requires a serverless function (Vercel/Netlify) or a Google Apps Script to POST to Discord after Formspree submission. See the "Advanced: Discord + Formspree" section below.

---

### 3. Deploy to GitHub Pages

The site auto-deploys from the `main` branch via GitHub Pages.

**Steps:**
1. Push changes to the `ejago` branch (or main — check repo settings):
   ```bash
   cd /Users/botbruins/ejago-redesign
   git checkout ejago  # or main
   git add lead.html index.html
   git commit -m "feat: add lead intake page and Book a Call CTA"
   git push origin ejago
   ```
2. Wait ~2 minutes for GitHub Pages to rebuild.
3. Verify at `https://indrabruins.github.io/ejago-redesign/lead.html`

**To enable GitHub Pages if not already enabled:**
1. Go to `https://github.com/indrabruins/ejago-redesign/settings/pages`
2. Under **Source**, select `gh-pages` branch (or `main` / `ejago` depending on your deploy branch)
3. Click **Save**

---

## How Leads Are Received

| Channel | How |
|---------|-----|
| **Formspree dashboard** | All submissions stored and searchable at formspree.io |
| **Auto-reply email** | Formspree sends a confirmation email to the lead immediately |
| **Discord** | (Optional) Set up a Zapier/Make automation: Formspree → Discord webhook |

---

## Advanced: Full Discord + Formspree Automation

If you want leads posted to Discord automatically:

### Option A — Zapier (easiest, no code)
1. Create Zap: **Formspree** (new submission trigger) → **Discord** (send message action)
2. Map fields: `fullName`, `workEmail`, `companyName`, `monthlyBudget`, `primaryChallenge`
3. Discord message format:
   ```
   🆕 New Ejago Lead!
   **Name:** {{fullName}}
   **Email:** {{workEmail}}
   **Company:** {{companyName}}
   **Budget:** {{monthlyBudget}}
   **Challenge:** {{primaryChallenge}}
   ```

### Option B — Google Apps Script (free)
1. Create a Google Apps Script Web App that receives Formspree's POST and forwards to Discord.
2. Change `lead.html` form action to your Apps Script URL.

---

## File Structure

```
ejago-redesign/
├── index.html          # Main site (updated with Book a Call button)
├── lead.html           # Lead intake / Book a Strategy Call page
└── lead-bot/
    ├── SPEC.md         # Project specification
    └── README.md       # This file
```

---

## Calendly Integration

The Calendly link (`https://calendly.com/indra-ejago`) is pre-configured in `lead.html` as an optional shortcut for leads who want an immediate 15-minute call.

---

## Troubleshooting

**Form not submitting?**
- Verify YOUR_FORM_ID is replaced with your real Formspree form ID.
- Check browser console for CORS errors.

**GitHub Pages 404 on lead.html?**
- Ensure the file is on the correct branch (main/ejago) and that GitHub Pages source is set to that branch.
- Wait 2 minutes after push before testing.

**Formspree not sending auto-reply?**
- Check Formspree dashboard → Settings → Autoresponse is enabled.
- Check the lead's spam folder.
