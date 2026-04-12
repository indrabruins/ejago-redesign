# Ejago Website — Design & Build Specification
**Version:** 1.0 | **CEO:** Kit | **Date:** March 25, 2026

---

## 1. CONCEPT & VISION

Ejago is a full-stack convergence agency: websites, apps, custom integrations, Google/Meta/TikTok ads, and AI business automation. The site must immediately communicate two things:
1. **We are the only agency that genuinely does ALL of this** — not as a checklist, but as an integrated system
2. **We are not like every other AI agency** — higher craft, warmer, more human, visually unforgettable

The site should feel like the love child of a world-class design studio and an AI research lab — premium, sharp, warm, alive. Not cold tech. Not generic agency.

**Tagline:** "We Build. We Scale. We Automate."
**Core Positioning:** The convergence agency for growth-stage companies.

---

## 2. DESIGN LANGUAGE

### Aesthetic Direction
**"Warm Precision"** — the anti-generic-AI-agency. Where every competitor is cold blue/purple gradients and all-sans-serif typography, Ejago is warm, editorial, and confident. Think: Apple meets a Venice Beach design studio. Serif headlines punch through a warm background, amber accents add energy, and a genuine dark/light mode makes it feel alive.

### Color Palette

#### Light Mode
| Role | Name | Hex |
|------|------|-----|
| Background | Warm White | `#FAFAF8` |
| Surface | Pure White | `#FFFFFF` |
| Surface Alt | Warm Gray | `#F5F4F0` |
| Primary Text | Near Black | `#111111` |
| Secondary Text | Warm Gray | `#6B7280` |
| Accent Primary | Violet | `#7C3AED` |
| Accent Hover | Deep Violet | `#6D28D9` |
| Accent Secondary | Amber | `#F59E0B` |
| Success | Emerald | `#10B981` |
| Border | Subtle | `#E5E5E3` |

#### Dark Mode
| Role | Name | Hex |
|------|------|-----|
| Background | Warm Black | `#0A0A0E` |
| Surface | Charcoal | `#141418` |
| Surface Alt | Dark Gray | `#1C1C22` |
| Primary Text | Warm White | `#F5F5F3` |
| Secondary Text | Cool Gray | `#9CA3AF` |
| Accent Primary | Violet | `#7C3AED` |
| Accent Hover | Bright Violet | `#8B5CF6` |
| Accent Secondary | Amber | `#F59E0B` |
| Success | Emerald | `#10B981` |
| Border | Subtle | `#2A2A2E` |

### Typography
- **Display/Hero Headlines:** `DM Serif Display` (Google Fonts) — serif creates premium editorial distinction. Size: 56px–96px on desktop, 36px–56px on mobile.
- **Section Headlines:** `Inter` (Google Fonts), weight 700, size 32px–48px
- **Body Text:** `Inter`, weight 400, size 16px–18px, line-height 1.7
- **UI Labels/Navigation:** `Inter`, weight 500, size 14px
- **Stats/Numbers:** `JetBrains Mono` (Google Fonts), weight 700, size 32px–64px for impact
- **Fallbacks:** system-ui, -apple-system, sans-serif

### Spatial System
- Base unit: 4px
- Section padding: 80px–120px vertical (desktop), 48px–64px (mobile)
- Container max-width: 1200px, centered, 24px horizontal padding
- Card border-radius: 16px
- Button border-radius: 8px
- Grid gap: 24px

### Motion Philosophy
- **Entrance animations:** Staggered fade-up (opacity 0→1, translateY 20px→0), 400ms ease-out, 80ms stagger between items
- **Scroll-triggered reveals:** Intersection Observer, threshold 0.15
- **Hover states:** 200ms ease transitions, subtle lift (translateY -4px) + shadow increase
- **Stats counters:** Count-up animation when scrolled into view, 1500ms duration, easeOutExpo
- **Theme toggle:** 300ms smooth transition on all color properties
- **Flywheel animation:** Continuous slow rotation (20s per revolution), pause on hover, nodes pulse when hovered
- **No jarring motion** — Ralph Wiggum test: "Smooth and fast. Like sliding on a swing."
- **Reduced motion:** Respect prefers-reduced-motion

### Visual Assets
- **Icons:** Lucide React icons — consistent 24px stroke, 1.5px weight
- **Grain texture:** Subtle noise overlay (opacity 0.03–0.05), applied via CSS filter to the body in dark mode only
- **Background:** Animated mesh gradient in hero (3–4 color blobs, slow movement, low opacity)
- **Decorative:** Subtle geometric shapes (circles, lines) as section dividers

---

## 3. LAYOUT & STRUCTURE

### Page Architecture (Home — Single Page, Scroll-Driven)

```
[HEADER — sticky, blur backdrop, logo left, nav center, CTA right, theme toggle]
    ↓
[HERO — 100vh, serif headline, animated mesh bg, dual CTA, scroll indicator]
    ↓
[TRUST BAR — horizontal scroll logos/metrics, 6 items]
    ↓
[SERVICES GRID — 6-card bento grid: Web, Mobile, Integrations, AI, Google Ads, TikTok/Meta]
    ↓
[HOW IT WORKS — 3-step horizontal: Build → Automate → Scale]
    ↓
[CASE STUDY SPOTLIGHT — full-width featured case with big metrics]
    ↓
[CONVERGENCE ENGINE — animated SVG flywheel: AI→Data→Ads→Revenue]
    ↓
[STATS BAR — 6 metrics with count-up animation]
    ↓
[TESTIMONIALS — 3-card carousel with photos/quotes]
    ↓
[FAQ ACCORDION — 6 objection-handling Q&As]
    ↓
[BUDGET CALCULATOR — interactive sliders → estimated outcomes]
    ↓
[BIG FOOTER CTA — full-width dramatic section]
    ↓
[FOOTER — 4 columns: Services, Company, Resources, Contact]
```

### Responsive Strategy
- **Desktop:** 1200px container, multi-column grids, horizontal layouts
- **Tablet (768–1199px):** 2-column grids, reduced spacing
- **Mobile (<768px):** Single column, full-width cards, bottom-fixed CTA, hamburger nav

### Pacing
Ralph Wiggum's feedback: "There's a LOT happening. Tone it down just a tiny bit."
**→ Solution:** Each section has ONE clear focus. No competing CTAs. Generous whitespace. Section transitions are calm (not explosive).

---

## 4. FEATURES & INTERACTIONS

### Dark/Light Mode Toggle
- Toggle button in header (sun/moon icon)
- Smooth 300ms CSS transition
- Persisted in localStorage
- Default: dark mode
- On toggle: all colors transition smoothly

### Animated Hero
- Headline: "We Build. We Scale. We Automate." in DM Serif Display, 80px+
- Subheadline: "The only agency that fuses AI automation with performance advertising. One team. One system. Maximum compounding growth."
- Two CTAs: Primary "Start a Project" (violet), Secondary "Book a Call" (ghost/outline)
- Background: Animated mesh gradient (violet, amber, emerald blobs, very slow movement)
- Scroll indicator: animated chevron bouncing

### Trust Bar
- Horizontal scrolling strip of 6 trust items
- Each: icon + short label (e.g., "60+ Projects Delivered", "LA-Based", "4.9★ on Clutch")
- Infinite scroll animation (CSS marquee)
- Pauses on hover

### Services Bento Grid
- 6 cards in 3×2 grid (desktop), 2×3 (tablet), 1×6 (mobile)
- Each card: icon, title, 1-line description, subtle arrow indicator
- Hover: card lifts (translateY -6px), shadow increases, border glows with violet
- Services: Website Development, Mobile Apps, Custom Integrations, AI Automation, Google Ads, Meta & TikTok Ads

### How It Works
- 3 numbered steps with connecting line
- Step 1: "Build" — "We engineer your digital product — websites, apps, or integrations"
- Step 2: "Automate" — "We layer in AI workflows that eliminate manual bottleneck"
- Step 3: "Scale" — "We drive targeted traffic via Google, Meta, and TikTok — optimized by the data AI collects"
- Each step: large number (DM Serif Display, 64px), title, description
- Horizontal on desktop, vertical on mobile

### Case Study Spotlight
- Full-width section with warm surface background
- Left: large serif headline for client name + industry
- Center: challenge description + approach
- Right: BIG metric (e.g., "+240% ROAS" in 80px emerald)
- CTA: "See All Case Studies →"
- Placeholder case for now: "E-commerce Brand — +240% ROAS in 90 days"

### Convergence Engine (WOW Factor)
- Animated SVG/canvas flywheel diagram
- 4 nodes in a circle: AI Automation → Customer Data → Smarter Ads → Revenue Growth → (loops back)
- Arrows connect nodes, animated dash stroke
- Nodes pulse on hover, show tooltip with specific example
- Background: subtle dark gradient to make it pop
- This is the centerpiece interactive element

### Stats Bar
- 6 metrics in a row
- Each: big number (JetBrains Mono, count-up animation), label below
- Stats: "60%+ Cost Reduction", "7-Day First Delivery", "$100K+ Saved", "240% Avg ROAS", "50+ Projects", "98% Client Retention"
- Count-up triggers on scroll into view

### Testimonials
- 3 cards in a row
- Each: client photo (circular), quote in italics, name, title, company
- Cards have subtle warm surface background
- Navigation: dots below (carousel behavior)

### FAQ Accordion (NinjaPromo Pattern)
- 6 Q&As addressing common objections
- Questions: "How fast can you deliver?", "How much does it cost?", "What if I already tried AI and it failed?", "Do you work with startups or only enterprises?", "What's your process?", "What happens after launch?"
- Smooth expand/collapse animation
- First item open by default
- Questions in bold, answers in regular weight

### Budget Calculator
- Section with warm surface background
- Inputs: Monthly ad spend (slider, $1K–$100K), Primary goal (dropdown: More leads / More revenue / Lower costs / All of the above)
- Output: Estimated ROAS improvement, potential revenue lift, time saved via automation
- "Get Full Breakdown" CTA → captures email, shows detailed PDF-style breakdown
- All calculations are realistic estimates with clear disclaimers

### Big Footer CTA
- Full-width section, violet background
- Large serif headline: "Ready to build something remarkable?"
- Single CTA: "Book Your Free Strategy Call"
- Subtext: "No pitch deck. No vague promises. Just a real conversation about your growth."

### Footer
- 4 columns: Services (links to each), Company (About, Blog, Careers, Contact), Resources (Case Studies, FAQ, Calculator), Contact (hello@ejago.com, LA-based)
- Bottom: copyright, privacy, terms
- Social icons: LinkedIn, Twitter/X, Instagram, TikTok

---

## 5. COMPONENT INVENTORY

### Header
- Logo (left): "ejago" wordmark in Inter Bold
- Nav (center): Home, Services (dropdown), Work, About, Blog
- Right: Theme toggle (sun/moon), "Start a Project" button
- Behavior: transparent on hero, solid on scroll, blur backdrop
- Mobile: hamburger → full-screen overlay menu

### Hero Section
- States: default (animated), scrolled-past (reduced motion option)
- CTA buttons: default, hover (lift + glow), active (press)

### Service Card
- States: default (flat), hover (lift + glow border), mobile (full-width tap)
- Contains: Lucide icon (violet), title (Inter 700), description (Inter 400)

### Process Step
- States: inactive (muted), active (full color), hover (highlighted)
- Contains: large number, title, description, connecting line

### FAQ Accordion Item
- States: collapsed (chevron right), expanded (chevron down, answer visible)
- Animation: max-height transition 300ms ease

### Stat Counter
- States: pre-scroll (shows "0"), in-view (counts up), complete (shows final number)
- Animation: easeOutExpo over 1500ms

### Theme Toggle Button
- States: light mode (sun icon), dark mode (moon icon)
- Animation: icon rotates + morphs on toggle

### CTA Buttons
- Primary: violet bg, white text, hover: darker violet + lift
- Secondary/Ghost: transparent bg, violet border, hover: violet bg fills
- States: default, hover, active, disabled

---

## 6. TECHNICAL APPROACH

### Framework & Stack
- **Framework:** Astro 4.x (static-first with React islands for interactive components)
- **UI:** React 18 + Tailwind CSS 3.x
- **Animations:** Framer Motion (React islands)
- **Hosting:** Vercel (zero-config)
- **Forms:** Web3Forms (contact form)
- **Scheduling:** Calendly embed (call booking)
- **Analytics:** Google Analytics 4 + Vercel Analytics
- **Icons:** Lucide React

### Project Structure
```
ejago-redesign/site/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── CaseStudySpotlight.tsx
│   │   ├── ConvergenceEngine.tsx
│   │   ├── StatsBar.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── BudgetCalculator.tsx
│   │   ├── BigFooterCTA.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ui/ (buttons, cards, etc.)
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── thank-you.astro
│   ├── styles/
│   │   └── global.css
│   └── lib/
│       └── utils.ts
├── public/
│   ├── fonts/
│   └── images/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── SPEC.md
```

### Performance Targets
- Lighthouse Performance: 95+
- First Contentful Paint: < 1.2s
- Time to Interactive: < 2.0s
- Core Web Vitals: All Green
- Total JS bundle: < 150KB (defer non-critical)

### Accessibility
- All interactive elements keyboard navigable
- ARIA labels on buttons and form elements
- Color contrast: WCAG AA minimum
- prefers-reduced-motion respected

### SEO
- Meta title: "Ejago — We Build. We Scale. We Automate. | LA Digital Agency"
- Meta description: "Full-stack digital agency in Los Angeles. Websites, apps, AI automation, and performance advertising — one team, one system."
- OG image: 1200x630 branded
- Sitemap: auto-generated by Astro
- Schema markup: LocalBusiness + Organization

---

## 7. PHASES

### Phase 1 — Foundation (NOW)
- Astro + React + Tailwind + Framer Motion scaffold
- Core layout (Header, Hero, Footer)
- Dark/light mode toggle (functional)
- Responsive container system

### Phase 2 — Content Sections
- Trust Bar, Services Grid, How It Works
- Case Study Spotlight, Convergence Engine
- Stats Bar, Testimonials

### Phase 3 — Interactive & Conversion
- FAQ Accordion
- Budget Calculator
- Contact Form (Web3Forms)
- Calendly embed

### Phase 4 — Polish & Launch
- Grain texture overlay
- Scroll animations
- Mobile responsive QA
- Performance optimization
- SEO + OG images
- Vercel deploy

---

## 8. RALPH WIGGUM NOTES (from UX test)

- ✅ Toggle must be findable in 5 seconds — put in header, always visible
- ✅ Headlines need supporting sentence below each — don't rely on visuals alone
- ✅ Too much happening = bad — use whitespace as a weapon, one idea per section
- ✅ Calculator must feel like a fortune teller — exciting, not intimidating
- ✅ FAQ must pre-answer objections — NinjaPromo pattern confirmed
- ✅ Animations make it better IF they're not slow
- ✅ Testimonials need real faces — not stock photos
- ✅ Chatbot should be friendly, not condescending
