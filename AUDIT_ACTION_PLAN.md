# Ejago.com — Audit Action Plan
**Priority order. Fix critical bugs first, then conversion, then SEO.**

---

## WEEK 1 — Critical Bug Fixes

### 1. Fix TypeScript in SocialProof.astro
**File:** `src/components/SocialProof.astro`
**Change:** Add `lang="ts"` to the `<script>` tag (line 436)
```astro
<script lang="ts">
```
TypeScript annotations in browser `<script>` are invalid unless `lang="ts"` is set. This causes runtime errors.

---

### 2. Remove Duplicate Cursor from Hero.astro
**File:** `src/components/Hero.astro`
**Change:** Delete lines 403–431 (the entire cursor creation IIFE inside `<script>`)
```js
// DELETE THIS ENTIRE BLOCK:
(function() {
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  // ... rest of cursor script
})();
```
The cursor is already created in `Layout.astro` and applied globally. Hero.astro is duplicating it.

---

### 3. Remove Duplicate Magnetic Init from Hero.astro
**File:** `src/components/Hero.astro`
**Change:** Delete lines 433–442 (magnetic button script block)
```js
// DELETE:
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => { ... });
  btn.addEventListener('mouseleave', () => { ... });
});
```
Magnetic buttons are already initialized in `Layout.astro`.

---

### 4. Fix Contact Form — Replace Formspree Placeholder
**File:** `src/pages/contact.astro`
**Option A — Use Web3Forms (simplest, no backend):**
1. Get free API key at web3forms.com
2. Replace fetch URL with:
```js
const res = await fetch('https://api.web3forms.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    access_key: 'YOUR_WEB3FORMS_KEY',
    name: data.get('name'),
    email: data.get('email'),
    website: data.get('website'),
    budget: data.get('budget'),
    message: data.get('message'),
    to: 'info@ejago.com'
  })
});
```

**Option B — Use Resend (recommended for email deliverability):**
1. Set up Resend account + add `info@ejago.com` domain
2. Install: `npm install resend`
3. Wire `/api/contact.ts` with Resend client

---

### 5. Wire Lead API to Resend
**File:** `src/pages/api/lead.ts`
**Change:** Replace the no-op with actual email sending:
```ts
import { Resend } from 'resend';
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();
  await resend.emails.send({
    from: 'lead@ejago.com',
    to: 'info@ejago.com',
    subject: 'New DTC Growth Audit Request',
    html: `<p>Email: ${email}</p><p>Source: Homepage Lead Magnet</p>`
  });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
```
Add `RESEND_API_KEY` to environment variables.

---

## WEEK 2 — Content Quality

### 6. Fix Work Page Case Study Images
**File:** `src/pages/work/index.astro`

Replace:
```astro
<div class="case-visual">
  <span class="case-icon">{study.image[0].toUpperCase()}</span>
</div>
```
With:
```astro
<div class="case-visual">
  {study.image === 'fashion' && (
    <img src="/assets/case-study-baltic-born.png" alt={study.client} />
  )}
  {study.image === 'fitness' && (
    <img src="/assets/case-study-steelbone-fitness.png" alt={study.client} />
  )}
  {study.image === 'travel' && (
    <img src="/assets/case-study-baltic-born.png" alt={study.client} />
  )}
</div>
```
Add CSS to style the images:
```css
.case-visual img { width: 100%; height: 100%; object-fit: cover; }
```

---

### 7. Add OG Images for All Pages
**File:** `src/layouts/Layout.astro`

Add to `<head>`:
```astro
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content="https://www.ejago.com/assets/og-image.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content="https://www.ejago.com/assets/og-image.png" />
```

Create a 1200×630px OG image at `/public/assets/og-image.png`.

---

### 8. Add sitemap.xml and robots.txt

**File:** `/public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.ejago.com/</loc></url>
  <url><loc>https://www.ejago.com/services/</loc></url>
  <url><loc>https://www.ejago.com/work/</loc></url>
  <url><loc>https://www.ejago.com/about/</loc></url>
  <url><loc>https://www.ejago.com/contact/</loc></url>
</urlset>
```

**File:** `/public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://www.ejago.com/sitemap.xml
```

---

### 9. Fix Manifesto Duplicate Animation
**File:** `src/components/Manifesto.astro`

Remove the CSS `animation: clip-reveal 900ms` from `.manifesto-text` (line 79). The GSAP animation in Layout.astro handles this already via ScrollTrigger. The CSS animation is redundant and may conflict.

---

### 10. Fix Pricing CSS Conflict
**File:** `src/components/Pricing.astro`

Remove `transform: scale(1.02)` from the `.card-float:nth-child(2)` animation (line 177). Let the `featured` class handle the scale. Float animation should only affect `translateY`.

---

## WEEK 3 — Conversion

### 11. Switch Display Font to Playfair Display
**File:** `src/styles/global.css` (line 20)
```css
--font-display: "Playfair Display", Georgia, serif;
```
Remove "Syne" — it doesn't match the premium editorial positioning. Keep Inter and JetBrains Mono as body/mono.

---

### 12. Add Video Poster Fallbacks
**Files:** `Services.astro`, `SocialProof.astro`, `Process.astro`, `Pricing.astro`, `CTA.astro`

Add `poster` attribute to each `<video>` element:
```astro
<video class="section-video" autoplay muted loop playsinline poster="/assets/hero-parallax-mid.png">
```
Use the existing `/assets/hero-parallax-mid.png` or create section-specific poster images.

---

### 13. Remove Footer Dead Links
**File:** `src/components/Footer.astro`

Option A — Build placeholder pages:
- `/work/blog/` (even a "coming soon" stub)
- `/work/careers/` (even a "no open roles" page)

Option B — Remove the dead links:
```astro
// Remove: { label: "Blog", href: "#" }
// Remove: { label: "Careers", href: "#" }
// Update Dribbble href or remove entirely
```

---

### 14. Dynamic Availability Date
**File:** `src/components/CTA.astro` (line 62)

Replace hardcoded date with a JS-generated date or a config variable:
```js
// In <script>:
const nextDate = new Date('2026-05-15');
const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
document.getElementById('next-start-date').textContent = formatter.format(nextDate);
```
```astro
<span id="next-start-date">May 15, 2026</span>
```

---

### 15. Add Google Analytics / Plausible
**File:** `src/layouts/Layout.astro`

Add Plausible (privacy-friendly, no cookie banner required):
```astro
<script defer data-domain="ejago.com" src="https://plausible.io/js/script.js"></script>
```
Or GA4:
```astro
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## QUICK WINS (Under 30 Min Each)

| Fix | File | Change |
|-----|------|--------|
| Strip TS types | `SocialProof.astro` | Add `lang="ts"` to `<script>` tag |
| Remove duplicate cursor | `Hero.astro` | Delete cursor IIFE (lines 403–431) |
| Remove duplicate magnetic | `Hero.astro` | Delete magnetic init (lines 433–442) |
| Fix Formspree | `contact.astro` | Replace placeholder ID with Web3Forms or Resend |
| Font fix | `global.css` | Change Syne → Playfair Display |
| OG image | Create file | `/public/assets/og-image.png` (1200×630) |
| sitemap | Create file | `/public/sitemap.xml` |
| robots.txt | Create file | `/public/robots.txt` |

---

## DEFER (Nice to Have)

- Cookie consent banner (GDPR for EU — only needed if significant EU traffic)
- Blog page (content strategy first)
- Careers page (recruitment needs first)
- Case study detail pages (need client approval for full write-ups)
- Dynamic availability system (needs backend or CMS)
- A/B testing infrastructure

---

*Action plan by Hermes — Ejago Lead Financial Analyst | April 11, 2026*
