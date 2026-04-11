# Ejago v3 — Design & Development Brief

**Date:** 2026-04-06
**Status:** PLANNING PHASE
**Goal:** Complete redesign that's actually better than v1, not just prettier

---

## What V1 Had (The Good Stuff — KEEP)

V1 was a proper Astro-built site with strong content. Here's what made it work:

### Hero
- **Headline:** "Your Competitors Have Marketing. You Need Obsession."
- **Subheadline:** "AI-Powered growth for DTC brands who refuse to be forgettable."
- Two CTAs: "Start a Project" + "See Our Work"
- Animated blob visual

### Services (6 cards)
Each had: icon, title, outcome tagline, metric, price, link
1. **Brand Strategy** — "Turn anonymous into unforgettable" — 64% more conversions — $8,500/mo
2. **Web & App** — "Sites so good they steal attention" — 4x faster load — $25,000
3. **Growth Marketing** — "Revenue, not vanity metrics" — $47M+ revenue moved — $8,500/mo
4. **AI Consulting** — "AI that actually makes money" — 3x ROI average — $15,000/mo
5. **ERP Integration** — "The unsexy that makes millions" — 90% efficiency — $30,000
6. **Development** — "Web, app, custom — built to scale" — 99.9% uptime — $20,000

### Social Proof
- Metrics bar: $47M+ Revenue Moved | 64% Conversion Increase | 12M+ Impressions | 50+ AI Campaigns
- Testimonials:
  - Sarah Chen, CEO, Baltic Born: "They don't just build marketing. They build obsession. Our conversion rate tripled."
  - Marcus Rivera, Founder, Steelbone: "We went from $2M to $8M ARR in 18 months. The site was just the beginning."
  - James Park, Marketing Director, Nomad: "They found us opportunities we didn't even know existed."
- Authority badges: Google Partner | Shopify Plus | Meta Business

### Process (4 phases)
1. Discovery — 20 min — "A real conversation, not a questionnaire"
2. Strategy — 2 weeks — "Your custom roadmap + creative direction"
3. Build — 4-8 weeks — "Weekly sprints, you see everything first"
4. Grow — Ongoing — "Weekly reports, we optimize forever"

### Pricing (3 tiers)
- Starter: $8,500/mo ($106/hr) — 2 channels, strategy, reports, email support
- Growth: $15,000/mo ($94/hr) — 4 channels, dedicated strategist, weekly standups, CRM
- Scale: Custom — all channels, dedicated team, AI tools, 24/7 support

### CTA Section
- "Curious? Let's Talk."
- Lead magnet: Free "DTC Growth Audit" — 11 checkpoints with email capture
- Availability: "Our next available start: May 15, 2026"
- 90-day guarantee: "If we're not the right fit after our discovery call, we'll tell you"

### Footer
- AI badge: "Built by AI agents. We practice what we preach."
- Real contact: hello@ejago.com, (555) 123-4567

---

## What V2 Got Wrong (LESSONS)

1. **Same content, no improvement** — just changed font from Syne → Playfair Display
2. **Fixed widths, not %** — responsive design broken
3. **No new hooks** — same testimonials, same metrics, nothing new
4. **Cosmetic only** — GSAP animations added but no UX value
5. **Video backgrounds generic** — didn't match brand voice
6. **Custom cursor gimmicky** — UX anti-pattern on touch devices

---

## V3 Requirements

### Design
- [ ] Percentage-based fluid layout (container: 85-90% max, sections use fr/gap/%)
- [ ] CSS Grid + Flexbox, NO fixed px widths on major layouts
- [ ] Typography scale: fluid using clamp()
- [ ] Color system: maintain v1 palette (indigo accent #6366f1, orange CTA #f97316)
- [ ] Custom cursor ONLY on desktop (hover:none media query)

### Content Improvements (over v1)
- [ ] Stronger hero subheadline — more specific
- [ ] Add 1-2 more testimonials (v1 only had 3)
- [ ] Add case study snippets (before/after numbers)
- [ ] Add trust signals: "Used by brands featured in..."
- [ ] Improve pricing CTAs — more action-oriented

### Animations (that ADD value)
- [ ] Scroll-triggered fade-in for each section (Intersection Observer, not just CSS)
- [ ] Counter animation for metrics ($47M, 64%, etc.) — animate on scroll into view
- [ ] Staggered card reveals (services, process, testimonials)
- [ ] Smooth scroll to sections
- [ ] Hover: card lifts + subtle shadow growth
- [ ] NO autoplay video backgrounds (bandwidth + UX issue) — use poster images or subtle CSS animations instead
- [ ] Mobile: no animations, just clean static layout

### Video Strategy (if videos used)
- [ ] Hero: short (5-8s) brand-representative loop, muted, no autoplay on mobile
- [ ] All videos: compressed, WebM + MP4 fallback
- [ ] NO generic stock footage — brand-specific visuals only

### Technical
- [ ] Single index.html (no framework needed for landing page)
- [ ] All CSS in one `<style>` block or single CSS file
- [ ] All JS in one `<script>` block or single JS file
- [ ] Assets: relative paths, no absolute URLs except fonts
- [ ] Fonts: Google Fonts (Inter + Syne or similar)
- [ ] Responsive breakpoints: 480px, 768px, 1024px, 1280px

### Performance
- [ ] Lighthouse score target: 90+ Performance, 100 Accessibility
- [ ] No render-blocking resources
- [ ] Images: lazy loading, modern formats (WebP)
- [ ] Total page weight: <2MB (ideally <1MB)

---

## V3 Page Structure

```
HEADER (sticky, blur backdrop)
  Logo | Work | Services | Process | Pricing | [Let's Chat CTA]

HERO (100vh)
  Headline (large, display font)
  Subheadline
  2 CTAs
  Abstract background (CSS gradient/pattern, NOT video autoplay)

SOCIAL PROOF BAR (metrics ticker)
  $47M+ | 64% | 12M+ | 50+

SERVICES (6 cards, responsive grid)
  Icon + Title + Outcome + Metric + Price + CTA

PROCESS (4 phases, horizontal timeline on desktop)
  Number + Name + Duration + Description + Trust line

TESTIMONIALS (3 cards + authority badges)
  Quote + Author + Company

PRICING (3 tiers)
  Feature list + CTA

CASE STUDY SNIPPET (new for v3)
  Before/After numbers, brief description

CTA SECTION
  Headline + 2 CTAs
  Lead magnet form (email capture)

FOOTER
  AI badge | Links | Contact | Copyright
```

---

## Kling Video Prompts (for production videos if needed)

Hero section needs 1 brand video (5-8s loop):
```
Prompt: "Cinematic abstract visualization of digital marketing growth and brand obsession. 
Dark moody atmosphere, indigo and orange color palette, geometric shapes morphing and flowing. 
No text, no faces, no logos. Slow motion, high contrast, dark background. Loopable."
```

Services section:
```
Prompt: "Abstract data visualization showing AI-driven marketing analytics. 
Charts morphing, metrics appearing, network connections forming. 
Indigo (#6366f1) and orange (#f97316) color scheme. Clean, minimal, professional. Loopable."
```

---

## Deliverables

1. `DESIGN.md` — Full design spec (colors, typography, spacing, components)
2. `index.html` — Complete single-file landing page
3. `styles.css` — All styles (if separate from HTML)
4. `scripts.js` — All interactions
5. `assets/` — Images, icons, videos (if any)
6. Deployed to: `https://indrabruins.github.io/ejago-redesign/`

---

## Pipeline

1. **Kit** (this) — Write brief, coordinate pipeline
2. **Lee** — Content strategy: improve hooks, add new testimonials, refine CTAs
3. **Kim** — Video asset research: Kling prompts, stock video alternatives
4. **Zac (Claude Code)** — Full development: build index.html from DESIGN.md
5. **Lin** — QA: test responsiveness, accessibility, performance
