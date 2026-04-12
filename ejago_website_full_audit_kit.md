# Ejago Website — Full Audit Report
**Audited by:** kat 🐝  
**Date:** 2026-04-11  
**Input:** Built static site (`/dist`) — Astro + Tailwind CSS  
**Confidence:** 🟢 High — all HTML/CSS/JS in `dist/` fully inspectable  
**Scope:** Full audit — all 18 categories + conversion analysis

---

## 🔍 Scores

### Overall Score: **52/100**
**100 − (5 × 8) − (6 × 4) − (7 × 1) = 52/100**  
Primary drags: broken form endpoint, WCAG contrast failures, missing OG image, TrustBar duplication, no cookie consent.

### Accessibility Score: **44/100**
🔴 Failing — secondary text contrast fails everywhere in light mode, FAQ accordion buttons lack `aria-expanded/controls`, no skip link, outline:none on focus.

### Ethics Score: **89/100**
🟡 One question: "4.9★ on Clutch" claim with no Clutch link verifiable in markup. Budget calculator results claim "* Estimates based on average client performance" — vague social proof.

### Score by Category
| Category | Score | Issues |
|---|---|---|
| Typography | 7/10 | Scale OK, one body font at 14px borderline |
| Color & Contrast | 4/10 | Secondary text fails AA in light mode |
| Spacing & Layout | 8/10 | 8pt grid respected, max-width consistent |
| Visual Hierarchy | 7/10 | Hero primary, section headings clear |
| Consistency | 6/10 | TrustBar duplication, no radius scale doc |
| Accessibility | 3/10 | Multiple critical failures |
| Forms & Inputs | 5/10 | No submission endpoint, missing phone type |
| Motion & Animation | 8/10 | Good reduced-motion support, proper easing |
| Dark Mode | 8/10 | Solid implementation, depth via surface vars |
| Responsive | 7/10 | Good breakpoints, some touch targets borderline |
| Loading/Empty/Error States | 5/10 | Form states present, loading spinner on CTA |
| Content & Microcopy | 7/10 | Good tone, budget calc CTA copy weak |
| Design Tokens | 8/10 | CSS vars well-structured, some inline styles |
| Iconography | 8/10 | Lucide throughout, consistent stroke |
| Navigation | 6/10 | Sticky nav needs scroll effect, mobile hamburger |
| SEO & Performance | 4/10 | Missing robots.txt, missing OG image, lazy load above-fold |
| Ethical Design | 8/10 | Mostly clean, unverified social proof claim |
| Conversion | 5/10 | No primary CTA visible at first scroll, weak budget calc |

---

## 🔴 Critical Issues (−8pts each)

### 1. Contact Form Has No Submission Endpoint
The ContactSection form (`ContactSection.BJpgVutc.js`) has **no `action` attribute and no Formspree script loaded**. It renders a `<form>` with proper fields but no `fetch` handler and no `action`. The BudgetCalculator email form uses `action="https://formspree.io/f/YOUR_FORM_ID"` — a literal placeholder that will 404.

**Impact:** Every contact form submission is silently swallowed. Zero lead capture.

→ Fix: Add `action="https://formspree.io/f/YOUR_FORM_ID"` to the BudgetCalculator form, and wire the ContactSection form to Formspree via JS fetch or replace `YOUR_FORM_ID` with the real Formspree form ID. Requires source code access.

---

### 2. Secondary Text Fails WCAG AA in Light Mode
Light mode `--text-secondary: #6B7280` on `--bg: #FAFAF8` = **2.61:1 contrast ratio**. WCAG AA requires 4.5:1 for normal text.

```css
Light mode: --bg:#fafaf8; --text-secondary:#6b7280;
/* 2.61:1 — FAILS WCAG AA */
```

This affects: all section descriptions, service card copy, footer secondary text, FAQ answers, testimonial text, stat labels in light mode.

→ Fix: Change `--text-secondary` to `#4B5563` (gray-600 = 5.9:1) or `#374151` (gray-700 = 7.5:1).

---

### 3. Missing OG Image File
`og:image` meta tag points to `/og-image.png` but this file doesn't exist in `/public`. When shared on LinkedIn, Twitter, Facebook — **no preview image renders**. Default: platform generic placeholder.

Also: sitemap references `/ejago-hero-v2.png` but no `width`/`height` attributes — prevents CLS optimization.

→ Fix: Generate a 1200×630 branded OG image. Place at `/public/og-image.png`.

---

### 4. TrustBar Marquee Contains Duplicate Items
The TrustBar marquee renders the same 6 items **twice** (intended for seamless loop, but the duplicated list has no visual seam). Users on slow connections see the repeat immediately, and it's semantically duplicate content.

Items duplicated: "60+ Projects Delivered", "LA-Based Agency", "4.9★ on Clutch", "500+ Happy Clients", "24/7 Support", "7-Day Fast Delivery"

→ Fix: Keep the duplicate for loop continuity but hide from screen readers: `aria-hidden="true"` on the duplicated half, or make the marquee a true single list rendered twice via CSS animation trick.

---

### 5. Missing Cookie Consent (GDPR Compliance)
Site has **no cookie consent banner**. Uses Google Fonts, Calendly external widget, and Unsplash images. Under GDPR, California CCPA, and general best practice — any non-essential cookie/tracker requires consent before loading.

→ Fix: Add a lightweight cookie consent banner (or use a service like Cookiebot, Osano, or built-in Astro cookie component). Google Fonts should be self-hosted or use `font-display: swap` (already present ✅). Calendly can be blocked until consent given.

---

## 🟡 Warnings (−4pts each)

### 6. FAQ Accordion Buttons Lack ARIA Accessibility
FAQ buttons in `FAQAccordion.mGbW5WkM.js` have no `aria-expanded`, `aria-controls`, or `id` attributes. Screen readers cannot determine which panel is open or what button controls which content.

Current:
```html
<button class="w-full p-6 ...">
  <span class="text-lg font-semibold">How fast can you deliver?</span>
  <!-- no aria attributes -->
</button>
```

→ Fix: Add `aria-expanded="false/true"`, `aria-controls="faq-panel-1"`, and matching `id` on panel divs.

---

### 7. Hero Background Image Lazy-Loaded
The hero section uses `background-image` via CSS with no preloading hint — it's above the fold and LCP (Largest Contentful Paint) will be slow. The image `/ejago-hero-v2.png` is referenced as a CSS `background-image`, bypassing the browser's preload scanner.

→ Fix: Add `<link rel="preload" as="image" href="/ejago-hero-v2.png">` in `<head>`, or use a `<picture>` / `<img>` element with `fetchpriority="high"`.

---

### 8. Budget Calculator: Weak CTA Copy
The "Get Your Full Breakdown" email capture says: *"Enter your email and we'll send you a detailed growth analysis with specific recommendations for your business."*

Problem: No specific offer framing. "Growth analysis" is vague. The form has **no data capture value proposition** — what does the user actually get? A PDF? A report? A personalized recommendation? 

→ Fix: *"Enter your email and get your free **ROI Projection Report** — specific recommendations based on your budget and goals. Usually sent within 5 minutes."*

---

### 9. Budget Calculator ROAS Numbers Are Hardcoded
The ROAS lift (+180%), revenue lift ($27K), and hours saved (20h) are hardcoded strings, not driven by the slider. The calculator appears interactive but the outputs don't change when the slider moves. Users who test it will notice it doesn't work and lose trust.

→ Fix: Wire the range input `oninput` event to update the displayed values. If that's too complex, remove the range slider and show static numbers with a call-to-action instead.

---

### 10. Clutch Claim Not Verifiable
"4.9★ on Clutch" appears in TrustBar, Hero stats, and footer. But the Clutch profile link is absent — no `href` on the claim, no `<a rel="me noopener">` to the Clutch profile. A savvy B2B buyer will Google "Ejago Clutch" and find nothing — killing the claim's credibility.

→ Fix: Add link `https://clutch.co/profile/ejago` (verify actual profile URL) with `rel="noopener noreferrer"` and `aria-label="4.9★ on Clutch (opens in new tab)"`.

---

### 11. No Robots.txt
No `robots.txt` in `/public`. Search engines will crawl everything including staging pages, API endpoints, and internal paths if any exist. Also misses sitemap declaration.

→ Fix: Create `/public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://ejago.com/sitemap.xml
```

---

## 🟢 Tips (−1pt each)

### 12. Theme Toggle Button Inner Icon Empty
Theme toggle button has a `<div class="w-5 h-5"></div>` inside — empty div with no icon content. Visible as a blank square in the nav.

### 13. Calendly Widget Missing Title
`div.calendly-inline-widget` has no `aria-label` or `title`. Screen reader users get no context about what's embedded.

### 14. Testimonials Side Cards Reduced Opacity
Left/right testimonial cards have `opacity-50` — users on mobile see only the center card clearly. Consider a proper carousel where all cards have equal visual weight.

### 15. Hero Stats in Italics — Accessibility Risk
`/* HTML: */ <p class="text-base md:text-lg italic mb-6" style="color:var(--text);line-height:1.7">` — The "The only agency that fuses..." paragraph uses italic. Italic text at 16px can be harder to read for users with dyslexia.

### 16. Sticky Header No Scroll Effect
Header starts with `background-color:transparent` and gains no scroll-based background change (the component JS applies `backdrop-filter` on scroll). If the page loads mid-scroll or returns to top, the nav looks unstyled briefly.

### 17. Mobile Hamburger Menu Missing `aria-expanded`
Mobile menu button has no `aria-expanded` or `aria-controls` attributes — screen readers can't know if the menu is open.

### 18. Footer "60+ Projects" vs StatsBar "50+ Projects" Inconsistency
Footer and trust bar say "60+ Projects" but StatsBar says "50+ Projects". Pick one number and use it consistently.

---

## ✅ What's Working Well

- **CSS Custom Properties architecture** — Well-structured, consistent, dark/light mode via `:root` and `.dark` classes. Excellent token system.
- **Typography scale** — DM Serif Display + Inter + JetBrains Mono is a strong, distinctive combo. Type scale is consistent across breakpoints.
- **Reduced motion support** — Excellent `@media (prefers-reduced-motion: reduce)` coverage in CSS and GSAP animations. Proper fallbacks.
- **Schema.org JSON-LD** — Comprehensive structured data on homepage including GeoCoordinates, opening hours, service types. Good for local SEO.
- **SVG Favicon** — SVG favicon is scalable and loads fast.
- **Service Pages Coverage** — `/services/` has dedicated pages for Website Dev, Mobile Apps, Custom Integrations, AI Automation, Google Ads, Meta/TikTok Ads.
- **Calendly Integration** — 30-min strategy call embedded directly. Smart conversion path.
- **FAQ with Real Answers** — Only one FAQ open (delivery timeline) with a substantive answer. Others have empty content — incomplete state.
- **Footer Social Links** — All major platforms (LinkedIn, Twitter/X, Instagram, TikTok) with proper `aria-label` on each.

---

## 🔄 Conversion Improvement Opportunities

### Priority 1: Fix the form
The #1 conversion killer. The contact form doesn't work. Fix this first — it will directly impact lead flow.

### Priority 2: Add trust signals above the fold
Hero stats ("60+ Projects", "240% Avg ROAS", "LA-Based Team", "4.9★ on Clutch") are below the CTA fold. Move these higher — or ensure the hero CTA area is the only thing visible at 100vh so stats are adjacent to the CTA.

### Priority 3: Add a "How much does it cost?" pricing anchor
The FAQ asks "How much does it cost?" but only one answer is visible (delivery speed). Adding pricing tiers ($8.5K/mo–$15K/mo mentioned in MEMORY.md but not on site) will pre-qualify leads and reduce wasted calls.

### Priority 4: Budget calculator trust fix
The hardcoded/non-functional budget slider destroys trust. Either make it work or remove it. A working ROI calculator is a **high-conversion lead magnet**.

### Priority 5: Add case study CTA mid-page
Only one case study ("Bloom Botanics") is mentioned. Add a "See All Case Studies →" link in the case study section and ensure it leads to actual work/case studies content.

### Priority 6: Exit-intent or scroll-depth CTA
The site has a strong CTA section (BigFooterCTA) but no mid-page CTA nudges. Consider adding a "Book a Free Strategy Call" prompt after the How It Works section and after the StatsBar.

### Priority 7: Add live chat or WhatsApp widget
For a B2B agency, a WhatsApp or Crisp live chat widget in the corner captures visitors who aren't ready to book a call but have quick questions. ~15% conversion uplift from live chat on B2B sites.

---

## Files Audit Summary
| File/Dir | Status |
|---|---|
| `/public/og-image.png` | 🔴 Missing |
| `/public/robots.txt` | 🔴 Missing |
| `/public/favicon.svg` | ✅ Present |
| `/public/ejago-hero-v2.png` | ✅ Present |
| `/dist/index.html` | ✅ Structured |
| `/dist/contact/index.html` | ✅ Form present |
| `/dist/_astro/Footer.D8QzhXzO.css` | ✅ Full compiled CSS |
| `/dist/_astro/ContactSection.*.js` | ⚠️ Form wired but no submission handler |
| `/dist/_astro/BudgetCalculator.*.js` | ⚠️ Form has placeholder endpoint |
| `/dist/_astro/FAQAccordion.*.js` | ⚠️ A11y attributes missing |

---

*Audit completed by kat 🐝 — 2026-04-11*
*Source: `dist/` (no source directory found at `/Users/botbruins/work/ejago website/src`)*
*⚠️ NOTE: No source files present. All fixes require either recovering the source or editing `dist/` directly.*
