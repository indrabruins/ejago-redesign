# Ejago Website — Source Recovery & Reconstruction Plan
**Author:** Zac (Apex Architect)
**Date:** 2026-04-11
**Status:** Actionable — Source Missing (dist/ only)

---

## Situation Summary

The Ejago website is a fully **deployed static Astro 5.x site** with React islands. The built output in `dist/` is complete and functional — but the source code (`.astro` files, React components, config files) is **entirely absent**. This makes future development impossible without reconstruction.

---

## What We Have (dist/)

```
dist/
├── _astro/                    # Compiled React/Astro JS modules
│   ├── Header.DcnQLUc9.js
│   ├── Hero.CeBxzYEm.js
│   ├── FAQAccordion.mGbW5WkM.js
│   ├── BudgetCalculator.C8tmQ8rP.js
│   ├── CaseStudySpotlight.BPxslUPp.js
│   ├── ContactSection.BJpgVutc.js
│   ├── Footer.ClB7Qokf.js
│   ├── ServicesGrid.2sPL6pPU.js
│   ├── Testimonials.BCRGg7x4.js
│   ├── TrustBar.BX7hTy53.js
│   ├── StatsBar.CcEIBwV0.js
│   ├── HowItWorks.BMYKlK6U.js
│   ├── ConvergenceEngine.DWIWh6n9.js
│   ├── SectionDivider.D092JMN9.js
│   ├── BackToTop.OzYf2hI3.js
│   ├── BigFooterCTA.CTr_SLTh.js
│   ├── proxy.BgNDYEsq.js       # Framer Motion proxy
│   ├── client.DIQWfPlE.js       # Astro hydration client
│   ├── jsx-runtime.u17CrQMm.js
│   ├── index.B02hbnpo.js        # React
│   ├── createLucideIcon.YKP7ukg7.js
│   └── [icon components]
├── index.html                  # Home page (SSR output)
├── about/index.html
├── blog/index.html
├── contact/index.html
├── services/index.html
├── services/website-development/index.html
├── services/mobile-apps/index.html
├── services/ai-automation/index.html
├── services/google-ads/index.html
├── services/meta-tiktok-ads/index.html
├── services/custom-integrations/index.html
├── privacy/index.html
├── terms/index.html
├── work/index.html
├── sitemap.xml
├── robots.txt
├── og-image*.png
├── ejago-*.png (logos, hero)
└── [other assets]
```

**What we DON'T have:**
- `package.json` — unknown dependencies/versions
- `astro.config.mjs` — unknown build config, integrations
- `tsconfig.json` or `jsconfig.json`
- `tailwind.config.js` — unknown theme variables
- `src/` directory — all component source
- `.env` or `.env.example` — any env vars

---

## Option A: Reverse-Engineer from dist/ (Recommended)

### Why This Is Viable

The dist/ output is high-quality. Each `astro-island` component is a self-contained compiled module. From the compiled JS, we can recover:
- ✅ Component structure and JSX
- ✅ All state logic (useState values, handlers)
- ✅ CSS inline styles (already resolved CSS vars)
- ✅ Form submission logic (including the Web3Forms key)
- ✅ Framer Motion animation configs
- ✅ Icon usage (Lucide)
- ✅ Tailwind class names (original ones not minified heavily)

### What We Can Recover Precisely

| Component | Recoverable | Notes |
|-----------|------------|-------|
| FAQAccordion | 100% | Data, open/close state, aria |
| BudgetCalculator | 100% | Calculation formula + UI + state |
| CaseStudySpotlight | 100% | Static data, layout |
| ContactSection | 100% | Form fields, Web3Forms endpoint + key |
| Header | 90% | Nav links, theme toggle logic |
| Hero | 95% | All copy, CTAs, stats |
| Footer | 95% | All links, social icons |
| ServicesGrid | 100% | All 6 services with icons + links |
| Testimonials | 100% | 3 testimonials with photos |
| StatsBar | 100% | All 6 stats |
| HowItWorks | 100% | All 3 steps |
| ConvergenceEngine | 100% | SVG diagram + labels |

### What Requires Heuristic Reconstruction

| Item | Method |
|------|--------|
| `package.json` | Infer from Astro 5 + React 18 + known deps |
| `tailwind.config.js` | Extract from CSS variables in HTML (`var(--accent)`, `var(--bg)`, etc.) |
| `astro.config.mjs` | Standard Astro 5 config |
| Responsive breakpoints | Inferred from class names (`md:`, `lg:`) |
| Animation timing | Extracted from Framer Motion configs |

### Step-by-Step Reverse Engineering Process

#### Step 1: Extract Design Tokens (CSS Variables)

The HTML files contain the CSS variable definitions inline. Search for all `var(--` occurrences:

```css
/* Color tokens found in HTML: */
--accent:       #7C3AED (violet-600)
--bg:           #0A0A0E
--surface:      #1C1C22 (inferred)
--surface-alt:  #141418 (inferred)
--text:         #F5F5F3
--text-secondary: inferred from style
--border:       #2D2D35 (inferred)
--amber:        #F59E0B
--success:      #10B981
/* Fonts: */
--font-display: 'DM Serif Display'
--font-sans:    'Inter'
--font-mono:    'JetBrains Mono'
```

#### Step 2: Scaffold Astro 5 Project

```bash
cd /Users/botbruins/work/ejago\ website
mkdir src
cd src
mkdir components/react pages layouts styles

# package.json (inferred)
cat > package.json << 'EOF'
{
  "name": "ejago-website",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/react": "^4.2.0",
    "astro": "^5.4.0",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.468.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@astrojs/tailwind": "^5.1.0",
    "tailwindcss": "^3.4.0"
  }
}
EOF

# astro.config.mjs
cat > astro.config.mjs << 'EOF'
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  build: {
    assets: '_astro'
  }
});
EOF
```

#### Step 3: Reconstruct Tailwind Config from CSS Variables

```js
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#7C3AED',
        amber: '#F59E0B',
        success: '#10B981',
        bg: '#0A0A0E',
        surface: '#1C1C22',
        'surface-alt': '#141418',
        text: '#F5F5F3',
        'text-secondary': '#A1A1AA',
        border: '#2D2D35',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: { '1400px': '1400px' },
    },
  },
  plugins: [],
}
```

#### Step 4: Reconstruct Each Component

**Priority order:**
1. `FAQAccordion.tsx` — most critical, conversion touchpoint
2. `BudgetCalculator.tsx` — lead gen tool
3. `CaseStudySpotlight.tsx` — social proof
4. `ContactSection.tsx` — form + Calendly
5. All others

From the compiled JS, we can extract the full React component code. The compiled modules use JSX with `e.jsx()` and `e.jsxs()` (hyperscript notation), which is readable as standard JSX.

#### Step 5: Recover Page Layouts

Each HTML file in `dist/` contains the full SSR output. The `astro-island` custom elements tell us:
- Which component renders where
- The `props` JSON for each island
- The `client:` directive (all are `client="load"`)

Reconstruct pages by copying the HTML structure as `.astro` layout shells, importing the reconstructed React components.

### Effort Estimate for Option A

| Phase | Effort | Deliverable |
|-------|--------|-------------|
| Scaffold project | 1-2 hrs | Working Astro shell |
| Extract design tokens | 2-3 hrs | tailwind.config.js + global.css |
| FAQAccordion | 2-3 hrs | Fully working component |
| BudgetCalculator | 2-3 hrs | Fully working component |
| CaseStudySpotlight | 1-2 hrs | Fully working component |
| ContactSection | 2-3 hrs | Form + Calendly embed |
| All other components | 4-6 hrs | Header, Hero, Footer, etc. |
| Page layouts | 3-4 hrs | All .astro page shells |
| Verify build matches dist | 2-3 hrs | Bit-for-bit diff check |
| **Total** | **~20-30 hrs** | Full source reconstruction |

---

## Option B: Check Git History / Backup

Before doing Option A, check:

```bash
# Check if there's a git repo with history
cd "/Users/botbruins/work/ejago website"
git log --oneline -20 2>/dev/null
git branch -a 2>/dev/null

# Check for backup directories
ls -la ~/.Trash/ 2>/dev/null | grep ejago
ls ~/Desktop/ 2>/dev/null | grep -i ejago
ls ~/Dropbox/ 2>/dev/null | grep -i ejago
find ~ -maxdepth 4 -name "ejago*" -type d 2>/dev/null
find ~ -maxdepth 4 -name "astro.config*" -o -name "package.json" 2>/dev/null | grep -i ejago
```

Also check if the hosting provider (Vercel/Netlify/Cloudflare) has a deploy history with source files.

---

## Option C: Start Fresh with the Same Design

If git backup fails and Option A feels too time-consuming:

1. Create a new Astro 5 project
2. Use the dist/ HTML as a visual reference / pixel guide
3. Build components from scratch using the design tokens extracted above
4. Estimated: 2-3 days of focused work

---

## 🚨 Critical Security Issue Discovered

**The Web3Forms API key is hardcoded and exposed in compiled JS:**

```
File: dist/_astro/ContactSection.BJpgVutc.js
Key:  3e180b49-e824-4938-8a70-784a4bd1ad94
```

This key is visible in any browser's dev tools. **Before doing anything else:**
1. Go to https://web3forms.com/dashboard and regenerate the access key
2. Move the new key to an environment variable: `PUBLIC_WEB3FORMS_KEY=...`
3. Update the ContactSection component to use `import.meta.env.PUBLIC_WEB3FORMS_KEY`

---

## Component Deep Dive (from dist/ analysis)

### FAQAccordion ✅ Working

**Logic extracted from compiled JS:**
- Array of 6 Q&A items stored in component
- State: `useState(null)` — stores index of open item (null = all closed)
- Only one item open at a time (accordion behavior)
- First item renders with open icon (minus) and answer visible (`height:0px` in SSR but open on click)
- Smooth transitions via CSS overflow/height

**Issues found:**
- ⚠️ First FAQ item is **hardcoded open** in the SSR HTML (`style="height:0px"` but has content visible)
- ⚠️ **No keyboard navigation** — tabindex and keydown handler missing from compiled output
- ⚠️ **No aria-expanded** attribute on buttons
- ⚠️ **No aria-controls** linking button to panel
- ⚠️ **Animation** relies on CSS height transition from 0 to auto-height — may be janky

**Quick fix (after reconstruction):**
```tsx
<button
  onClick={() => setOpen(index === open ? null : index)}
  aria-expanded={open === index}
  aria-controls={`faq-panel-${index}`}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') setOpen(index === open ? null : index);
  }}
>
```

### BudgetCalculator ✅ Working (but missing integration)

**Calculation formula extracted:**
```js
function calculate(spend, goal) {
  const multipliers = { leads: 2, revenue: 3.5, costs: 1.5, all: 2.8 };
  const currentRoas = 1.5;
  const projectedRoas = currentRoas * (multipliers[goal] || 2.5);
  const roasImprovement = ((projectedRoas - currentRoas) / currentRoas) * 100;
  const revenueLift = spend * (projectedRoas - currentRoas);
  const hoursSaved = Math.round(spend / 1000 * 2);
  return { roasImprovement, revenueLift, hoursSaved };
}
```

**Issues found:**
- ⚠️ The "Get Full Breakdown" email form **has NO submission handler** — it only calls `a&&m(!0)` which is a no-op. The email capture does nothing.
- ⚠️ The email field + submit button in BudgetCalculator section needs a real fetch to Web3Forms (similar to ContactSection)
- ⚠️ The range slider's CSS background is hardcoded at 9.09% fill — should update dynamically with `onChange`
- ⚠️ The "Primary Goal" buttons show "All of the Above" as pre-selected but there's no visual indicator it's selected

### CaseStudySpotlight ✅ Working

**Data extracted:**
- Client: Bloom Botanics (E-commerce Wellness Brand)
- Challenge: Low conversion rates + high CAC + manual order processing
- Solution: Custom e-commerce + AI-powered inventory + automated email flows + Meta & Google campaigns
- Result: +240% ROAS in 90 days

**Issues found:**
- ⚠️ "See All Case Studies" link is `href="#"` — broken link (should be `/work`)
- ⚠️ No image of the actual client/product
- ⚠️ Static data — no CMS or JSON source for multiple case studies
- ⚠️ Missing: What was the starting point? What's the business size? These would add credibility

### ContactSection ⚠️ Form Works, Calendly Fine

**Web3Forms integration confirmed:**
```js
fetch("https://api.web3forms.com/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    access_key: "3e180b49-e824-4938-8a70-784a4bd1ad94",
    subject: `New Lead from ${name} - Ejago`,
    name, email, company, service, budget, message
  })
})
```

**Issues found:**
- 🚨 **API key exposed** — must rotate immediately
- ⚠️ Form shows success state (`n` state) but only if `.ok` is true — no error handling
- ⚠️ Loading state (`l` state) not reflected in button (button just says "Send Message" throughout)
- ⚠️ No client-side validation messages (required fields rely on browser default)
- ⚠️ Calendly widget URL is hardcoded: `https://calendly.com/indra-ejago`

---

## Full Improvement Roadmap (Post-Recovery)

### 🔴 Critical (Fix Before Launch)
1. **Rotate Web3Forms API key** — exposed in public JS
2. **Fix BudgetCalculator email form** — currently does nothing
3. **Add aria attributes to FAQAccordion** — accessibility lawsuit risk
4. **Fix CaseStudySpotlight broken link** — `href="#"` → `/work`

### 🟠 High Priority (Conversion Wins)
1. **Add exit-intent popup** — capture visitors who are leaving
2. **Sticky CTA bar** — show "Start a Project" CTA after scrolling past hero
3. **Inline case study results** — Bloom Botanics needs real data points (CAC before/after, exact revenue lift)
4. **Add pricing page or pricing FAQ** — "How much does it cost?" is the #1 unanswered question
5. **Testimonials carousel** — currently shows 3 testimonials but only the middle one is visible; auto-rotate missing

### 🟡 Medium Priority (UX + SEO)
1. **Service pages content** — check if `services/*.html` pages have meaningful copy or are thin
2. **Blog page** — `/blog/index.html` exists but likely empty (check)
3. **Add Google Analytics 4** — no tracking code found in HTML
4. **Add Hotjar or similar** — session recording to find UX friction
5. **Preload critical fonts** — Google Fonts loaded without `font-display: swap` concern
6. **Add `loading="lazy"` to below-fold images** — Unsplash photos in Testimonials
7. **Schema markup expansion** — add `Review`, `FAQPage`, `Service` schema

### 🟢 Low Priority (Polish)
1. **Dark/light theme toggle** — moon/sun icon but no actual theme switching visible
2. **Animated scroll progress bar** — show reading progress on long pages
3. **Add a pricing calculator result CTA** — after using BudgetCalculator, prompt to contact
4. **Custom 404 page** — doesn't exist
5. **Multiple case studies** — only 1 featured, needs a real case studies section

---

## Immediate Action Checklist

- [ ] **Rotate Web3Forms API key** at https://web3forms.com/dashboard
- [ ] Check git history for original source: `cd "/Users/botbruins/work/ejago website" && git log --oneline -20`
- [ ] Check hosting deploy history (Vercel/Netlify/Cloudflare)
- [ ] Search for backup: `find ~ -maxdepth 5 -name "ejago*" -type d 2>/dev/null`
- [ ] If no backup found: proceed with Option A (reverse engineering)
- [ ] Set up new Astro 5 project
- [ ] Extract and hardcode all design tokens
- [ ] Reconstruct components in priority order
- [ ] Add GA4 tracking
- [ ] Run Lighthouse audit on reconstructed site
- [ ] Fix BudgetCalculator email form
- [ ] Accessibility audit on FAQAccordion

---

## Appendix: Design Tokens Extracted from dist/

```css
/* Colors */
--accent:        #7C3AED   (violet-600)
--amber:         #F59E0B   (amber-500)
--success:       #10B981   (emerald-500)
--bg:            #0A0A0E   (near-black)
--surface:       #1C1C22   (dark card bg)
--surface-alt:   #141418   (section alternate)
--text:          #F5F5F3   (off-white)
--text-secondary:#A1A1AA   (zinc-400)
--border:        #2D2D35   (dark border)

/* Fonts */
--font-display: 'DM Serif Display', serif
--font-sans:    'Inter', system-ui, sans-serif
--font-mono:    'JetBrains Mono', monospace

/* Spacing */
--max-w: 1400px
--px: 6 (mobile), 10 (tablet), 16 (desktop)
```

---

*Last updated: 2026-04-11 by Zac (Apex Architect)*
