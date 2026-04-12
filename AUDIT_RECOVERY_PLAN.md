# Ejago Website — Recovery & Fix Plan

## Priority 1: RECOVER / REBUILD SOURCE CODE

**Why this is the #1 priority.** The repo at `ejago website/` has no `src/`, no `.astro` components, no React hooks, no `package.json`. Only the built `dist/` exists. Without source, any future change requires rebuilding from scratch.

---

### Option A: Reverse-Engineer from `dist/` (Fastest Path)

Use the built output to reconstruct the source. This is a best-effort recovery — CSS class names, HTML structure, and JS logic are all recoverable. Custom CSS vars and component names are preserved in the build.

**Step 1 — Map components from build output**

From the built HTML, the following islands exist:

| Island Name | File in `dist/_astro/` | Purpose |
|---|---|---|
| Header | `Header.DcnQLUc9.js` | Fixed nav + logo + CTA |
| Hero | `Hero.CeBxzYEm.js` | Hero section + CTA |
| SectionDivider | `SectionDivider.D092JMN9.js` | Decorative glow divider |
| TrustBar | `TrustBar.BX7hTy53.js` | Marquee trust signals |
| ServicesGrid | `ServicesGrid.2sPL6pPU.js` | Services cards grid |
| HowItWorks | `HowItWorks.BMYKlK6U.js` | Process/steps section |
| CaseStudySpotlight | `CaseStudySpotlight.BPxslUPp.js` | Portfolio spotlight |
| ConvergenceEngine | `ConvergenceEngine.DWIWh6n9.js` | Stats/features section |
| Testimonials | `Testimonials.BCRGg7x4.js` | Social proof |
| FAQAccordion | `FAQAccordion.mGbW5WkM.js` | FAQ accordion |
| BudgetCalculator | `BudgetCalculator.C8tmQ8rP.js` | ROAS estimator |
| BigFooterCTA | `BigFooterCTA.CTr_SLTh.js` | CTA banner |
| ContactSection | `ContactSection.BJpgVutc.js` | Form + Calendly |
| Footer | `Footer.ClB7Qokf.js` | Footer + social links |
| BackToTop | `BackToTop.OzYf2hI3.js` | Scroll-to-top button |

**Step 2 — Initialize new Astro project**

```bash
cd "/Users/botbruins/work/"
npm create astro@latest ejago-website-rebuilt -- --template minimal
cd ejago-website-rebuilt
npm install @astrojs/react react react-dom lucide-react
npm install framer-motion gsap lenis
npm install -D tailwindcss @tailwindcss/vite
```

**Step 3 — Reconstruct directory structure**

```
ejago-website-rebuilt/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── SectionDivider.astro
│   │   ├── TrustBar.astro
│   │   ├── ServicesGrid.astro
│   │   ├── HowItWorks.astro
│   │   ├── CaseStudySpotlight.astro
│   │   ├── ConvergenceEngine.astro
│   │   ├── Testimonials.astro
│   │   ├── FAQAccordion.astro
│   │   ├── BudgetCalculator.astro
│   │   ├── BigFooterCTA.astro
│   │   ├── ContactSection.astro
│   │   ├── Footer.astro
│   │   └── BackToTop.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── work.astro
│   │   ├── contact.astro
│   │   ├── services/
│   │   │   ├── index.astro
│   │   │   ├── mobile-apps.astro
│   │   │   └── custom-integrations.astro
│   │   ├── blog/
│   │   │   └── index.astro
│   │   ├── privacy.astro
│   │   └── terms.astro
│   ├── styles/
│   │   └── global.css         ← copy from dist/_astro/Footer.D8QzhXzO.css
│   └── lib/
│       └── animations.ts       ← stitch-* animation classes
├── public/
│   ├── ejago-hero-v2.png
│   ├── ejago-dark-calligraphy.png
│   └── [all other assets from dist/]
└── astro.config.mjs
```

**Step 4 — Extract CSS from build**

The entire Tailwind CSS is in `dist/_astro/Footer.D8QzhXzO.css` (single file). Copy it as `src/styles/global.css`. The CSS custom properties (design tokens) are all there:

```css
/* Design tokens to preserve */
:root {
  --bg: #fafaf8;
  --surface: #fff;
  --surface-alt: #f5f4f0;
  --text: #111;
  --text-secondary: #6b7280;
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
  --amber: #f59e0b;
  --success: #10b981;
  --border: #e5e5e3;
  --font-display: "DM Serif Display", Georgia, serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
.dark {
  --bg: #0a0a0e;
  --surface: #111118;
  --surface-alt: #18181f;
  --text: #f5f5f3;
  --text-secondary: #9ca3af;
  --border: #252530;
}
```

**Step 5 — Reconstruct each component**

For each island file in `dist/_astro/`:
1. Read the minified JS to extract props interface
2. Read the HTML from `dist/index.html` for SSR-rendered structure
3. Look at class names for styling (all Tailwind utilities in the CSS file)
4. Write the `.astro` or `.jsx` component matching the original behavior

The HTML structure is fully readable in `dist/index.html` — it's not minified, just the JS is bundled.

**Step 6 — Rebuild pages by stitching components**

Each page (index, about, work, etc.) was a set of island components. Reconstruct by combining the appropriate components in `src/pages/`.

**Step 7 — Verify against original**

Compare the rebuilt `dist/` output against the original `dist/` to verify correctness.

**Time estimate:** 2–4 hours with an AI coding agent assisting.

---

### Option B: Clone from Ejago FInal Site Source (Recommended if Equivalent)

The "Ejago FInal Site" project at `/Users/botbruins/work/Ejago FInal Site/` has full source code (Astro with `src/` directory). Compare feature parity:

| Feature | Ejago FInal Site | ejago website |
|---|---|---|
| Pages | Homepage + About + Contact + Services | Same + Blog + Privacy + Terms |
| Components | Header, Hero, Services, etc. | Same |
| Animations | stitch-* CSS system | Same CSS system |
| Forms | Web3Forms / Resend | Calendly embed |
| Budget Calculator | No | Yes |
| TrustBar marquee | Yes | Yes |
| Tech Stack | Astro 6 + React 19 + Tailwind 4 | Same |

**If Ejago FInal Site is the newer/redesigned version with source**, the path is:
1. Use `Ejago FInal Site` as the canonical source going forward
2. Fork or copy the source
3. Add missing pages/features from `ejago website` (`BudgetCalculator`, `FAQAccordion`, `BigFooterCTA`)
4. Fix the `client="load"` hydration bug during the copy

---

### Option C: Start Fresh with Best Practices

If neither recovery path is clean, start from the `Ejago FInal Site` source and rebuild the `BudgetCalculator`, `FAQAccordion`, and contact form as new components. The CSS and design tokens from the old build can be copied directly.

**Do this if:** the `Ejago FInal Site` source is substantially complete and already has all the core components.

---

### Recommended Path

```
1. Check if /Users/botbruins/work/Ejago FInal Site/ has a working src/ and all pages
2. If YES → Use it as canonical source, add missing pages from old build
3. If NO  → Execute Option A (reverse-engineer from dist/)
4. Either way → Fix client="load" hydration bug as part of the rebuild
```

---

## Priority 2: FIX HYDRATION — `client="load"` → `client:visible`

**Problem:** Every component uses `client="load"`, meaning all 24 islands hydrate on page load regardless of position.

### Current (Bad)

```astro
<!-- Every component looks like this: -->
<astro-island ... client="load" ...>
```

### Fixed (Correct)

```astro
<!-- Above-fold: client="load" — needed immediately -->
<Header client="load" />
<Hero client="load" />
<TrustBar client="load" />  <!-- trust bar is near top -->

<!-- Below the fold: client="visible" — hydrate when scrolled into view -->
<ServicesGrid client:visible" />
<HowItWorks client:visible" />
<CaseStudySpotlight client:visible" />
<ConvergenceEngine client:visible" />
<Testimonials client:visible" />
<FAQAccordion client:visible" />
<BudgetCalculator client:visible" />

<!-- At bottom: client:idle" — hydrate when browser is idle -->
<ContactSection client:idle" />
<BigFooterCTA client:idle" />
<Footer client:idle" />
<BackToTop client:idle" />

<!-- SectionDivider is pure CSS — no client directive needed -->
<SectionDivider />
```

### What Changes

| Component | Old | New | Rationale |
|---|---|---|---|
| Header | `client="load"` | `client="load"` | Always needed for nav |
| Hero | `client="load"` | `client="load"` | CTAs must work immediately |
| TrustBar | `client="load"` | `client="load"` | Marquee near top |
| SectionDivider | `client="load"` | *(none)* | Pure CSS, no JS needed |
| ServicesGrid | `client="load"` | `client:visible` | Below fold |
| HowItWorks | `client="load"` | `client:visible` | Below fold |
| CaseStudySpotlight | `client="load"` | `client:visible` | Below fold |
| ConvergenceEngine | `client="load"` | `client:visible` | Below fold |
| Testimonials | `client="load"` | `client:visible` | Below fold |
| FAQAccordion | `client="load"` | `client:visible` | Below fold |
| BudgetCalculator | `client="load"` | `client:visible` | Below fold |
| BigFooterCTA | `client="load"` | `client:idle` | Near bottom, non-critical |
| ContactSection | `client="load"` | `client:idle` | Has Calendly — defer it |
| Footer | `client="load"` | `client:idle` | Static mostly |
| BackToTop | `client="load"` | `client:idle` | Button at bottom |

### Expected Impact

- **Lighthouse Performance:** +10–20 points on mobile (from deferring React hydration)
- **First Input Delay (FID):** Drops significantly (less main-thread work on load)
- **Total Blocking Time:** Reduced by ~200–400ms on mobile
- **JS Parse cost on load:** Drops from all 24 islands to ~3–4 critical islands

### Additional: Defer Calendly

The Calendly embed (`https://assets.calendly.com/assets/external/widget.js`) loads synchronously and blocks the contact section render. Replace with:

```astro
<!-- Option 1: Load Calendly only when ContactSection is visible -->
<ContactSection client:visible" />

<!-- Option 2: Replace Calendly with a static booking link + a simpler embed -->
<!-- Calendly inline widgets are heavy — consider a Calendly link button instead -->
```

---

## Priority 3: IMMEDIATE CONTENT TRUST FIXES (Do Today)

These don't require source code recovery — can be done in `dist/` directly or via source once recovered.

### Fix 1: Remove "24/7 Support" or Fix Hours

The footer says **"Mon–Fri, 9AM–6PM PST"** but TrustBar says **"24/7 Support"**.

**Fix in Footer component:** Change "Mon–Fri, 9AM–6PM PST" to "Mon–Fri, 9AM–6PM PST" (keep it) and **remove "24/7 Support"** from TrustBar marquee. Replace with something true like "Dedicated Account Manager" or "Slack Access for Clients."

### Fix 2: Link the Clutch Rating

The "4.9★ on Clutch" claim has no link. Find the actual Clutch profile and link it:

```astro
<a href="https://clutch.co/profile/ejago" target="_blank" rel="noopener noreferrer">
  4.9★ on Clutch
</a>
```

### Fix 3: Source the "240% Avg ROAS" Claim

Either:
- Add a footnote: "* Based on 12-month average across 30+ ad accounts, 2024"
- Remove it and replace with a verified range or specific client example
- Add a `<sup>` asterisk linking to a case study

### Fix 4: Fix Duplicate `#contact` ID

In `dist/index.html`, BudgetCalculator's section has `id="contact"` and ContactSection also has `id="contact"`. Rename one:

```html
<!-- BudgetCalculator section -->
<section id="contact" class="py-24 ...">

<!-- ContactSection section -->
<section id="contact-form" class="py-24 ...">
```

And update any anchor links pointing to the wrong section.

---

## Checklist

- [ ] **Priority 1:** Decide recovery path (Option A, B, or C)
- [ ] **Priority 1:** Recover or rebuild source code
- [ ] **Priority 1:** Add recovered project to Git with full `src/`
- [ ] **Priority 2:** Fix all `client="load"` → `client:visible` / `client:idle`
- [ ] **Priority 2:** Remove Calendly sync load or defer with `client:idle`
- [ ] **Priority 3:** Remove "24/7 Support" contradiction
- [ ] **Priority 3:** Link Clutch rating to profile
- [ ] **Priority 3:** Add ROAS footnote or remove claim
- [ ] **Priority 3:** Fix duplicate `#contact` ID
- [ ] **Short term:** Add `alt` text to all images
- [ ] **Short term:** Add `loading="lazy"` to below-fold images
- [ ] **Short term:** Convert hero PNG to WebP
- [ ] **Medium term:** Audit 185KB `client.js` bundle
- [ ] **Medium term:** Remove unused logo PNGs from `public/`
- [ ] **Medium term:** Add Lighthouse CI to repo
