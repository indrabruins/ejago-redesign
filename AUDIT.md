# Ejago.com — Full Code Audit
**Audited:** April 11, 2026 | **Source:** `/Users/botbruins/work/Ejago FInal Site/`
**Stack:** Astro 6.1.4 · GSAP 3.14 · Lenis 1.3 · Framer Motion 12 · React 19 · Tailwind 4.2

---

## Verdict: Solid Foundation, 5 Critical Bugs, 10+ Improvements Needed

The site runs Astro with GSAP + ScrollTrigger + Lenis pre-wired — a legitimately strong stack. But there are TypeScript runtime errors in the browser, duplicate JS on every page, dead form endpoints, and design inconsistencies costing conversion.

---

## CRITICAL BUGS

### 1. TypeScript in Browser `<script>` — Runtime Errors

**File:** `src/components/SocialProof.astro` (lines 442–465)

```ts
// BROKEN — no lang="ts", these types are invalid plain JS
let autoplay: ReturnType<typeof setInterval>;
function show(idx: number) {
  cards?.forEach((c, i) => {
    (c as HTMLElement).style.opacity = ...
```

Astro does not transpile TypeScript inside `<script>` tags by default. Only `<script lang="ts">` gets processed. The current code throws in the browser.

---

### 2. Duplicate Cursor Follower — Two Cursors Rendering

**Files:** `src/layouts/Layout.astro` (line 25–26) + `src/components/Hero.astro` (line 403–410)

Both files independently create `.cursor-dot` and `.cursor-ring` divs and append them to `<body>`. On every page that includes Hero (all pages), two sets of cursors stack on top of each other — one lagging behind the other.

**Fix:** Remove cursor creation from `Hero.astro`. Keep only in `Layout.astro`.

---

### 3. Duplicate Magnetic Button Init

**Files:** `src/layouts/Layout.astro` (line 434–442) + `src/components/Hero.astro` (line 433–442)

Both initialize magnetic button behavior on all `.magnetic-btn` elements. Runs twice per page load. Pick Layout as the single source of truth.

---

### 4. Contact Form — `YOUR_FORM_ID` Never Replaced

**File:** `src/pages/contact.astro` (line 119–120)

```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', ...
```

This is a live placeholder. The form works via the mailto fallback, but Formspree never receives any submissions. Either replace with a real Formspree ID or strip the dead fetch.

---

### 5. Lead API — No-Op (Sends No Email)

**File:** `src/pages/api/lead.ts`

```ts
export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  console.log('📬 Lead magnet signup:', data.email);
  return new Response(JSON.stringify({ success: true }), ...);
};
```

The endpoint just console.logs. No Resend, no SendGrid, no forwarding. The DTC Growth Audit lead magnet CTA sends to this, gets `{ success: true }`, but nobody receives the email.

---

## HIGH-PRIORITY ISSUES

### 6. Font Family Mismatch — Syne vs Playfair Display

**Spec says:** `font-display: "Playfair Display", Georgia, serif` (V2_ARCHITECTURE.md)

**global.css actually has:**
```css
--font-display: "Syne", sans-serif;
```

Meanwhile `Layout.astro` loads BOTH from Google Fonts. Syne is being used everywhere despite the spec calling for Playfair Display. Pick one — Playfair Display gives the editorial premium agency feel the brand is going for.

---

### 7. Work Page — Case Studies Use Placeholder Letters, Not Real Images

**File:** `src/pages/work/index.astro` (line 46)

```astro
<span class="case-icon">{study.image[0].toUpperCase()}</span>
```

Renders "F", "F", "T" instead of real case study visuals. Actual images exist at:
- `/assets/case-study-baltic-born.png`
- `/assets/case-study-steelbone-fitness.png`

But the Work page never uses them.

---

### 8. Contact API Route — Dead Code

**File:** `src/pages/api/contact.ts`

Marked deprecated. On GitHub Pages (static host) this code never runs. Dead weight — remove it.

---

### 9. SEO — Missing Fundamentals

- `sitemap.xml` — missing
- `robots.txt` — missing
- `og:image` meta tags — missing on all pages
- `twitter:card` meta — missing
- Schema.org structured data — missing

---

## MEDIUM-PRIORITY ISSUES

### 10. Footer Dead Links

**File:** `src/components/Footer.astro`

- Blog → `#` (no blog page)
- Careers → `#` (no careers page)
- Dribbble → `https://dribbble.com` (external, no Ejago account)

---

### 11. Hardcoded Availability Date

**File:** `src/components/CTA.astro` (line 62)

```
Next available start: May 15, 2026
```

Statically hardcoded. Will look unprofessional past that date.

---

### 12. Video Backgrounds — Missing Poster Fallbacks

| Section | File | Has Poster |
|---------|------|-----------|
| Hero | `Hero.astro` | ✅ yes |
| Manifesto | `Manifesto.astro` | ✅ yes |
| Services | `Services.astro` | ❌ no |
| Social Proof | `SocialProof.astro` | ❌ no |
| Process | `Process.astro` | ❌ no |
| Pricing | `Pricing.astro` | ❌ no |
| CTA | `CTA.astro` | ❌ no |

On slow connections or mobile, sections go blank with no fallback.

---

### 13. Manifesto Overlay — Hardcoded Opacity

**File:** `src/components/Manifesto.astro` (line 58–62)

```css
background: linear-gradient(
  rgba(99,102,241,0.85) 0%,
  rgba(99,102,241,0.60) 50%,
  rgba(99,102,241,0.80) 100%
);
```

Fixed gradient overlay — if the actual video content changes, contrast may fail. Needs QA on real video assets.

---

### 14. Pricing Float Animation + Featured Scale Conflict

**File:** `src/components/Pricing.astro`

```css
.card-float:nth-child(2) { ... transform: scale(1.02); }
.pricing-card.featured { transform: scale(1.02); }
```

The float animation overwrites the featured scale via CSS animation. Works visually but confusing — the animation should not re-declare scale.

---

### 15. Manifesto GSAP Clip-Path Overrides CSS Animation

**File:** `src/components/Manifesto.astro` (line 79)

CSS defines `animation: clip-reveal 900ms ...` on `.manifesto-text`. But `Layout.astro` (line 122–127) also runs a GSAP `fromTo` clip-path animation on `.manifesto-text` via ScrollTrigger.

Both run. GSAP likely wins due to IntersectionObserver trigger, but the CSS animation declaration is redundant.

---

### 16. Testimonial Slider — Auto-Resize on DOM Changes

**File:** `src/components/SocialProof.astro` (line 255)

```js
.testimonial-card { position: absolute; ... }
.testimonial-card.active { position: relative; }
```

Switching from `position: absolute` to `position: relative` on the active card causes layout reflow. The container `.testimonial-slider` has `min-height: 280px` which mitigates this, but a card with more content than expected would still cause jump.

---

## WHAT'S WORKING WELL

- **Animation stack** — GSAP + Lenis + ScrollTrigger properly wired. The V2 spec is largely already implemented
- **Typography system** — CSS variables, `clamp()`, proper font stack. Solid
- **Color palette** — Indigo primary + coral CTA. Distinctive and well-applied
- **Cursor follower** — Ring lag, hover expansion, mobile disabled. Good implementation
- **3D card tilt** — Smooth, subtle, performant
- **Mouse parallax** — Three-layer parallax with scroll + mousemove. Premium feel
- **Word scramble** — Clean RAF loop, good character set
- **Accessibility** — `aria-label`, `aria-hidden`, `prefers-reduced-motion`. Good coverage
- **Mobile nav** — Hamburger, keyboard accessible, slide-down
- **Reduced motion** — Global support throughout
- **Container width** — 85% max-width strategy matches V2 spec

---

## FILE INVENTORY

| File | Lines | Purpose | Status |
|------|-------|---------|--------|
| `src/layouts/Layout.astro` | 214 | Global layout + GSAP/Lenis init | 🟡 Needs fixes |
| `src/pages/index.astro` | 28 | Homepage shell | ✅ OK |
| `src/components/Hero.astro` | 499 | Hero section | 🟡 Duplicate cursor/magnetic |
| `src/components/Manifesto.astro` | 95 | Brand statement | 🟡 Duplicate animation |
| `src/components/Services.astro` | 341 | Services bento grid | ✅ OK |
| `src/components/Process.astro` | 319 | 4-phase timeline | ✅ OK |
| `src/components/SocialProof.astro` | 474 | Logos, metrics, testimonials | 🔴 TS errors |
| `src/components/Pricing.astro` | 336 | 3-tier pricing | 🟡 CSS conflict |
| `src/components/CTA.astro` | 393 | Lead magnet + CTA | 🟡 Dead API wire |
| `src/components/Header.astro` | 222 | Fixed nav | ✅ OK |
| `src/components/Footer.astro` | 228 | 4-col footer | 🟡 Dead links |
| `src/components/Marquee.astro` | 54 | Top strip marquee | ✅ OK |
| `src/pages/contact.astro` | 150 | Contact form | 🔴 Formspree placeholder |
| `src/pages/about.astro` | 82 | About page | 🟡 Very thin content |
| `src/pages/services.astro` | 100 | Services listing | ✅ OK |
| `src/pages/work/index.astro` | 94 | Case studies | 🟡 Placeholder visuals |
| `src/pages/api/lead.ts` | 18 | Lead API | 🔴 No-op |
| `src/pages/api/contact.ts` | 24 | Contact API | 🟡 Dead code |
| `src/styles/global.css` | 409 | Design tokens + utilities | 🟡 Font mismatch |
| `package.json` | 30 | Astro + deps | ✅ OK |

---

*Audit by Hermes — Ejago Lead Financial Analyst | April 11, 2026*
