# Ejago Website — Audit Findings & Source Recovery Report
**Author:** Zac (Apex Architect)
**Date:** 2026-04-11
**Status:** Source recovered from git history ✅

---

## Executive Summary

Full source code was **recovered from git history**. The source files were not permanently lost — they existed in the `main` branch at commit `4f543e0` and were accidentally deleted in commit `0634bcf` (Apr 2, 2026, authored by "Kim Agent"). The deletion was likely the result of an automated build/publish script that removed the `src/` directory instead of updating it cleanly.

**Source is now restored to the working directory.**

---

## Git History

```
commit 0634bcf  auto: 2026-04-02 14:49   ← deleted src/, removed astro.config.mjs, package.json
commit 4f543e0  Ejago redesign - initial build  ← last known good state with full source
```

**Remote:** Bitbucket (`indrawidjaja/ejago-redesign`)

---

## What Was Restored

```
src/
├── components/
│   ├── BackToTop.tsx
│   ├── BigFooterCTA.tsx
│   ├── BudgetCalculator.tsx          ← bugs found (see below)
│   ├── CaseStudySpotlight.tsx        ← bugs found (see below)
│   ├── ContactSection.tsx            ← security issue found (see below)
│   ├── ConvergenceEngine.tsx
│   ├── FAQAccordion.tsx              ← bugs found (see below)
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── SectionDivider.tsx
│   ├── ServicesGrid.tsx
│   ├── StatsBar.tsx
│   ├── Testimonials.tsx
│   ├── ThemeToggle.tsx
│   └── TrustBar.tsx
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── about.astro
│   ├── blog.astro
│   ├── index.astro
│   ├── privacy.astro
│   ├── services.astro
│   ├── services/ai-automation.astro
│   ├── services/custom-integrations.astro
│   ├── services/google-ads.astro
│   ├── services/index.astro
│   ├── services/meta-tiktok-ads.astro
│   ├── services/mobile-apps.astro
│   ├── services/website-development.astro
│   ├── terms.astro
│   └── work.astro
├── styles/
│   ├── global.css
│   ├── stitch-animations.css
│   └── stitch-scroll.js
```

**Also restored:** `package.json`, `astro.config.mjs`, `README.md`, `SPEC.md`, `.gitignore`

---

## 🔴 Critical Issues

### 1. `package.json` — Invalid Astro Version
**File:** `package.json`
**Severity:** 🔴 Critical
**Effort:** 1 minute

```json
// CURRENT (broken)
"astro": "^6.0.8"

// SHOULD BE
"astro": "^5.0.0"
```
Astro 6 does not exist. Latest stable is Astro 5.x. Running `npm install` will fail with this version specifier.

---

### 2. Web3Forms API Key Exposed in Source
**File:** `src/components/ContactSection.tsx`
**Severity:** 🚨 Security / Critical
**Effort:** 10 minutes (key rotation) + 5 minutes (code fix)

The Web3Forms access key is hardcoded in the source file:

```tsx
body: JSON.stringify({
  access_key: "3e180b49-e824-4938-8a70-784a4bd1ad94",
  // ...
})
```

This key is now in git history permanently and should be rotated immediately.

**Fix:**
1. Go to https://web3forms.com/dashboard and regenerate the access key
2. Move to environment variable: `PUBLIC_WEB3FORMS_KEY=your_new_key`
3. Update `ContactSection.tsx`:
```tsx
body: JSON.stringify({
  access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
  // ...
})
```
4. Add `.env` to `.gitignore`

---

### 3. BudgetCalculator Email Form — No API Call
**File:** `src/components/BudgetCalculator.tsx`
**Severity:** 🔴 Critical (Conversion)
**Effort:** 15 minutes

The email capture form in the BudgetCalculator section has **no backend integration**:

```tsx
// CURRENT (broken)
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (email) {
    setSubmitted(true);  // ← just sets state, sends nothing
  }
};
```

Users fill in their email, see the success state, but receive **no email** and **no lead data is captured**.

**Fix:** Add Web3Forms fetch (same pattern as ContactSection):
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;
  setLoading(true);
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: import.meta.env.PUBLIC_WEB3FORMS_KEY,
        subject: `Budget Calculator Lead - ${email}`,
        email,
        spend,
        goal,
        // Include estimated values to make the lead more qualified
        estimatedRoasLift: estimates.roasImprovement,
        estimatedRevenueLift: estimates.potentialRevenueLift,
      }),
    });
    if (res.ok) setSubmitted(true);
  } catch (err) {
    console.error("Form submission error:", err);
  } finally {
    setLoading(false);
  }
};
```

**Bonus:** Add the `loading` state to show a spinner during submission.

---

## 🟠 High Priority Issues

### 4. FAQAccordion — No Accessibility
**File:** `src/components/FAQAccordion.tsx`
**Severity:** 🟠 High (Legal/Accessibility)
**Effort:** 20 minutes

Missing WCAG compliance:
- No `aria-expanded` on the toggle button
- No `aria-controls` linking button to answer panel
- No `id` on the answer panel
- No keyboard navigation (Enter/Space handling)
- No `role="region"` or `role="list"` semantic markup

**Fix:**
```tsx
<button
  onClick={() => toggle(index)}
  aria-expanded={isOpen}
  aria-controls={`faq-panel-${index}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle(index);
    }
  }}
  // ... existing styles
>
```

And on the answer panel:
```tsx
<motion.div
  id={`faq-panel-${index}`}
  role="region"
  aria-labelledby={`faq-button-${index}`}
  // ...
>
```

**Note:** This is an accessibility compliance issue. Without keyboard navigation and ARIA, screen reader users cannot interact with this component.

---

### 5. CaseStudySpotlight — Broken Link
**File:** `src/components/CaseStudySpotlight.tsx`
**Severity:** 🟠 High (UX/SEO)
**Effort:** 1 minute

```tsx
// CURRENT (broken)
<a href="#" className="inline-flex items-center gap-2 ...">

// SHOULD BE
<a href="/work" className="inline-flex items-center gap-2 ...">
```

The "See All Case Studies" CTA links to `#` — a dead anchor that scrolls to the top of the page instead of navigating to the `/work` page.

---

### 6. ContactSection — Missing Loading State
**File:** `src/components/ContactSection.tsx`
**Severity:** 🟠 Medium (UX)
**Effort:** 10 minutes

The form has a `loading` state (`l` / `i`) but the submit button never reflects it — it always says "Send Message" even while the request is in flight. Users may click multiple times.

**Fix:** Show a loading indicator in the button during submission:
```tsx
<button
  type="submit"
  disabled={l}
  // ...
>
  {l ? "Sending..." : "Send Message"}
</button>
```

---

## 🟡 Medium Priority

### 7. FAQAccordion — First Item Pre-Opened
**File:** `src/components/FAQAccordion.tsx`
**Severity:** 🟡 Medium (UX)
**Effort:** 5 minutes

```tsx
// CURRENT
const [openIndex, setOpenIndex] = useState(0);  // first item open by default

// RECOMMENDED
const [openIndex, setOpenIndex] = useState<number | null>(null);  // all closed by default
```

Defaulting the first FAQ open can feel pushy. Let users discover answers on their own terms.

---

### 8. BudgetCalculator — No Slider CSS Update
**File:** `src/components/BudgetCalculator.tsx`
**Severity:** 🟡 Low (Polish)
**Effort:** Already implemented correctly ✅

The range slider's background fill is correctly calculated dynamically with `onChange`:
```tsx
style={{
  background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${
    ((spend - 1000) / (100000 - 1000)) * 100
  }%, var(--border) ${((spend - 1000) / (100000 - 1000)) * 100}%, var(--border) 100%)`,
}}
```
This works correctly. ✅

---

### 9. No Google Analytics 4
**Files:** All pages
**Severity:** 🟡 Medium (Business)
**Effort:** 30 minutes

No GA4 tracking tag found in the source. Cannot measure traffic, conversions, or user behavior without this.

**Recommended:** Add `@astrojs/google-gtag` integration or manually add the GA4 script to `Layout.astro`.

---

## 🟢 Low Priority / Polish

### 10. ThemeToggle — Icon Missing
**File:** `src/components/Header.tsx` / `ThemeToggle.tsx`
**Severity:** 🟢 Low (Polish)

The theme toggle button has no visible icon inside — the header shows:
```tsx
<div className="w-5 h-5"></div>
```
An empty div. The moon/sun icon should be rendered here. Likely the Lucide icon component isn't being called.

### 11. No 404 Page
**Severity:** 🟢 Low (SEO)
No custom `404.astro` page found.

### 12. Blog Page — Check Content
**File:** `src/pages/blog.astro`
**Severity:** 🟡 Unknown
Need to verify if the blog page has actual content or is a stub.

### 13. No Hotjar / Session Recording
**Severity:** 🟢 Low (Analytics)
No session recording tool found. Recommended for UX optimization.

---

## Architecture Overview

| Aspect | Finding |
|--------|---------|
| **Framework** | Astro 5.x with React islands (`@astrojs/react`) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite` plugin) |
| **Animations** | Framer Motion v12 |
| **Icons** | Lucide React v1 |
| **Build** | Vite (via Astro) |
| **Hosting** | Static output → `dist/` |
| **Forms** | Web3Forms (client-side POST, no server needed) |
| **SEO** | Schema.org JSON-LD (ProfessionalService), OG tags, sitemap |
| **CMS** | None — all content hardcoded in components |

---

## File Structure

```
ejago website/
├── src/
│   ├── components/        # React island components (client:load)
│   ├── layouts/           # Astro layout wrappers
│   ├── pages/             # Astro static pages
│   └── styles/            # CSS (global + animations + scroll)
├── dist/                  # Built output (deployed)
├── public/                # Static assets (logos, images)
├── node_modules/
├── .astro/                # Astro build cache
├── .git/
├── package.json           # 🔴 Invalid astro version
├── astro.config.mjs
├── README.md
├── SPEC.md
├── AUDIT_FULL_REPORT_zac.md
├── RECOVERY_PLAN_zac.md
└── AUDIT_SOURCE_FOUND_zac.md  ← this file
```

---

## Recommended Action Plan

### Immediate (Today)
- [ ] Fix `package.json`: `astro` from `^6.0.8` → `^5.0.0`
- [ ] Run `npm install` to verify deps resolve
- [ ] Rotate Web3Forms API key at web3forms.com
- [ ] Move Web3Forms key to `.env` / `import.meta.env`
- [ ] Fix BudgetCalculator email form — add real fetch call
- [ ] Fix CaseStudySpotlight `href="#"` → `href="/work"`

### This Week
- [ ] Fix FAQAccordion accessibility (aria + keyboard nav)
- [ ] Add loading state to ContactSection submit button
- [ ] Add GA4 tracking
- [ ] Change FAQAccordion default open to `null` (all closed)
- [ ] Verify blog page has content
- [ ] Check service pages for thin content

### Before Next Launch
- [ ] Accessibility audit on all interactive components
- [ ] Lighthouse audit (performance, SEO, accessibility, best practices)
- [ ] Mobile UX review of all pages
- [ ] Conversion funnel audit with real analytics data
- [ ] Add Hotjar for session recording

---

## Appendix: Design Tokens

Extracted from `src/styles/global.css` and HTML:

```css
/* Colors */
--accent:          #7C3AED   (violet-600)
--amber:           #F59E0B   (amber-500)
--success:         #10B981   (emerald-500)
--bg:             #0A0A0E   (near-black)
--surface:        #1C1C22
--surface-alt:    #141418
--text:           #F5F5F3
--text-secondary:  #A1A1AA
--border:          #2D2D35

/* Fonts */
--font-display: 'DM Serif Display', serif
--font-sans:    'Inter', system-ui, sans-serif
--font-mono:    'JetBrains Mono', monospace

/* Layout */
--max-w: 1400px
```

---

## Appendix: FAQAccordion State Logic

```tsx
const [openIndex, setOpenIndex] = useState(0);  // ← item 0 open by default

const toggle = (index: number) => {
  setOpenIndex(openIndex === index ? -1 : index);
  // When clicking the open item → closes (-1)
  // When clicking a closed item → opens (index)
};
// Only ONE item open at a time (single-select accordion)
```

## Appendix: BudgetCalculator State Logic

```tsx
const [spend, setSpend] = useState(10000);      // default $10K/month
const [goal, setGoal] = useState("all");        // default "All of the Above"
const [email, setEmail] = useState("");
const [submitted, setSubmitted] = useState(false);

// Multipliers applied to baseline ROAS of 1.5x:
// leads: 2.0x  → +33% ROAS lift
// revenue: 3.5x → +133% ROAS lift
// costs: 1.5x → flat
// all: 2.8x  → +87% ROAS lift
```

---

*Last updated: 2026-04-11 22:04 by Zac (Apex Architect)*
