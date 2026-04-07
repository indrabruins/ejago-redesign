# Ejago Website Redesign — Complete Specification
**Version:** 1.0
**Compiled:** April 6, 2026
**Authors:** Zac (Animation), Kim (Conversion), Lead Design Engineer (Synthesis)
**Status:** Ready for Implementation
**Theme:** Light — warm cream base (NOT dark)

---

## Table of Contents
1. [Design System](#1-design-system)
2. [Section-by-Section Specifications](#2-section-by-section-specifications)
3. [Animation Library](#3-animation-library)
4. [Component Inventory](#4-component-inventory)
5. [Image & Asset List](#5-image--asset-list)
6. [Conversion Elements](#6-conversion-elements)

---

## 0. Design Direction Notes

### Theme Decision: LIGHT
The existing site codebase (`global.css`) uses a warm cream base. This redesign doubles down on that direction: editorial, premium, warm — not dark tech. Think Kinfolk magazine meets Stripe's clarity. Indigo (#6366f1) and coral-orange (#f97316) as accents on cream.

### Font Pairing
- **Headlines:** Playfair Display (Google Fonts — serif, editorial, dramatic)
- **Body:** Inter (Google Fonts — clean, readable, modern)
- **Monospace accents:** JetBrains Mono (Google Fonts — labels, numbers, technical elements)

### Google Fonts Import
```
Playfair Display: 400, 700, 900
Inter: 400, 500, 600
JetBrains Mono: 400, 500
```

### Reference Sites
- **rno1.com** — editorial, premium, restrained motion
- **kota.co.uk** — clean London agency, bold typography, strong testimonials
- **beans.agency** — bold editorial, personality-forward

---

## 1. DESIGN SYSTEM

### 1.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#faf9f6` | Page background — warm cream |
| `--bg-elevated` | `#ffffff` | Cards, header, elevated surfaces |
| `--bg-surface` | `#f0effe` | Section backgrounds — light indigo tint |
| `--bg-tint` | `#eef2ff` | Hover states, secondary surfaces |
| `--accent-primary` | `#6366f1` | Primary accent — indigo (CTAs, links, highlights) |
| `--accent-secondary` | `#10b981` | Secondary accent — emerald (checkmarks, success) |
| `--accent-cta` | `#f97316` | CTA buttons — coral-orange (conversion, energy) |
| `--accent-pink` | `#ec4899` | Tertiary accent — pink (badges, decorative) |
| `--text-primary` | `#1e1b4b` | Headlines — near-black indigo |
| `--text-secondary` | `#4a4a4a` | Body text — dark gray |
| `--text-muted` | `#64748b` | Captions, labels, placeholder text |
| `--border` | `rgba(0,0,0,0.08)` | Subtle borders |
| `--border-accent` | `rgba(99,102,241,0.3)` | Indigo-tinted borders on hover |
| `--glass-bg` | `rgba(255,255,255,0.72)` | Glassmorphism card backgrounds |
| `--glass-border` | `rgba(255,255,255,0.5)` | Glassmorphism borders |
| `--color-success` | `#10b981` | Checkmarks, confirmation |
| `--color-error` | `#ef4444` | Form errors |
| `--color-warning` | `#f59e0b` | Alerts |

**Ralph Wiggum description:** The site looks like a premium editorial magazine printed on cream paper. Headlines are deep indigo — almost navy but more alive. CTAs pop in bright coral-orange. The whole thing feels warm, confident, and premium — not cold tech.

---

### 1.2 Typography

#### Type Scale

| Token | Font | Weight | Size | Line Height | Letter Spacing | Usage |
|-------|------|--------|------|------------|---------------|-------|
| `--text-hero` | Playfair Display | 900 | `clamp(48px, 6vw, 88px)` | 1.0 | -0.03em | Hero headline only |
| `--text-h1` | Playfair Display | 700 | `clamp(40px, 5vw, 64px)` | 1.1 | -0.02em | Section H1 |
| `--text-h2` | Playfair Display | 700 | `clamp(32px, 4vw, 48px)` | 1.15 | -0.02em | Section H2 |
| `--text-h3` | Playfair Display | 700 | 28px | 1.2 | -0.01em | Card headlines |
| `--text-h4` | Playfair Display | 700 | 22px | 1.25 | -0.01em | Sub-headlines |
| `--text-body-lg` | Inter | 400 | 20px | 1.6 | 0 | Large body copy |
| `--text-body` | Inter | 400 | 16px | 1.6 | 0 | Standard body |
| `--text-body-sm` | Inter | 400 | 14px | 1.5 | 0 | Small body, captions |
| `--text-label` | Inter | 600 | 13px | 1.4 | 0.05em | ALL CAPS labels |
| `--text-mono` | JetBrains Mono | 500 | 14px | 1.4 | 0 | Numbers, stats, badges |
| `--text-cta` | Inter | 600 | 15px | 1.0 | 0 | Button labels |

#### Type Styles (CSS classes)

```css
.text-hero    { font-family: 'Playfair Display', serif; font-weight: 900; font-size: clamp(48px, 6vw, 88px); line-height: 1.0; letter-spacing: -0.03em; }
.text-h1      { font-family: 'Playfair Display', serif; font-weight: 700; font-size: clamp(40px, 5vw, 64px); line-height: 1.1; letter-spacing: -0.02em; }
.text-h2      { font-family: 'Playfair Display', serif; font-weight: 700; font-size: clamp(32px, 4vw, 48px); line-height: 1.15; letter-spacing: -0.02em; }
.text-h3      { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 28px; line-height: 1.2; letter-spacing: -0.01em; }
.text-h4      { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 22px; line-height: 1.25; letter-spacing: -0.01em; }
.text-body-lg { font-family: 'Inter', sans-serif; font-weight: 400; font-size: 20px; line-height: 1.6; }
.text-body    { font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px; line-height: 1.6; }
.text-body-sm { font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px; line-height: 1.5; }
.text-label   { font-family: 'Inter', sans-serif; font-weight: 600; font-size: 13px; line-height: 1.4; letter-spacing: 0.05em; text-transform: uppercase; }
.text-mono    { font-family: 'JetBrains Mono', monospace; font-weight: 500; font-size: 14px; line-height: 1.4; }
.text-cta    { font-family: 'Inter', sans-serif; font-weight: 600; font-size: 15px; line-height: 1.0; }
```

---

### 1.3 Spacing System

| Token | Value | PX | Usage |
|-------|-------|----|-------|
| `--space-xs` | 0.25 | 4px | Tight gaps, icon padding |
| `--space-sm` | 0.5 | 8px | Small gaps, badge padding |
| `--space-md` | 1 | 16px | Standard gaps, card padding |
| `--space-lg` | 2 | 32px | Section internal spacing |
| `--space-xl` | 4 | 64px | Section external spacing |
| `--space-2xl` | 8 | 128px | Hero/section breathing room |
| `--space-section` | — | 100px | Section vertical padding |
| `--space-section-lg` | — | 128px | Large section vertical padding |

---

### 1.4 Border Radius & Shadows

```css
/* Border Radius */
--radius-sm:   6px;     /* Inputs, small badges */
--radius-md:   12px;    /* Cards, buttons */
--radius-lg:   16px;    /* Large cards, modals */
--radius-xl:   24px;    /* Hero cards, featured elements */
--radius-full: 9999px;  /* Pills, avatars, badges */

/* Shadows */
--shadow-sm:   0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
--shadow-md:   0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
--shadow-lg:   0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06);
--shadow-xl:   0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06);
--shadow-card: 0 8px 32px rgba(99,102,241,0.10);
--shadow-card-hover: 0 20px 60px rgba(99,102,241,0.16);
--shadow-cta:  0 12px 30px rgba(249,115,22,0.30);

/* Glassmorphism */
--glass-bg: rgba(255,255,255,0.72);
--glass-blur: blur(20px);
--glass-border: 1px solid rgba(255,255,255,0.5);
--glass-shadow: 0 8px 32px rgba(0,0,0,0.06);
```

---

### 1.5 Easing Tokens

```css
:root {
  --ease-smooth:   cubic-bezier(0.16, 1, 0.3, 1);       /* Default: fast start, gentle landing */
  --ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* Punch/overshoot: buttons, badges */
  --ease-spring:   cubic-bezier(0.34, 1.2, 0.64, 1);    /* Spring reset: card tilt, magnetic */
  --ease-dramatic: cubic-bezier(0.76, 0, 0.24, 1);     /* Slow start, fast finish: reveals */
  --ease-over:     cubic-bezier(0.34, 1.56, 0.64, 1);   /* Scale punch: hero word landing */
}
```

**Ralph Wiggum easing description:** Fast-start curves feel snappy and modern — like pressing a button and having it respond immediately. Bounce curves feel physical and fun — like something with real weight. Slow-start curves feel dramatic and cinematic — like something important is happening.

---

### 1.6 Responsive Breakpoints

```css
--bp-sm: 640px;   /* Large phones */
--bp-md: 768px;   /* Tablets */
--bp-lg: 1024px;  /* Laptops */
--bp-xl: 1280px;  /* Desktops */
--bp-2xl: 1536px; /* Large screens */
```

---

## 2. SECTION-BY-SECTION SPECIFICATIONS

---

### Section 1: Hero

**Purpose:** Stop the scroll. Communicate positioning. Capture high-intent visitors.

#### Layout
- **Full viewport height** (100vh minimum)
- **Background:** `--bg-primary` (#faf9f6) cream
- **Centered content** with generous top/bottom padding
- **Blob element:** abstract indigo/coral blob, top-right corner, subtle (not distracting)
- **Scroll indicator** at bottom center

#### Content
```
HEADLINE (line 1):    "Your Competitors Have Marketing."
HEADLINE (line 2):    "You Need Obsession."

SUBHEADLINE:          "AI-Powered growth for DTC brands
                       who refuse to be forgettable."

PRIMARY CTA:          "Start a Project"
SECONDARY CTA:        "See Our Work"

AVAILABILITY SIGNAL:  "🟢 Currently Accepting 2 Clients"  (small badge, below CTAs)
```

#### Typography
- Headline: `--text-hero` (Playfair Display 900, clamp 48–88px)
- Subheadline: `--text-body-lg` (Inter 400, 20px)
- CTA: `--text-cta` (Inter 600, 15px)

#### Animation (P0 — MVP)
1. **Word scramble entrance** — each word scrambles with random chars, then resolves. "Obsession." lands in indigo (`--accent-primary`) + scale punch (1.05×). Total: ~1,200ms.
2. **Subheadline fade-up** — opacity 0→1, Y 20px→0, 600ms, starts 200ms after headline completes.
3. **CTA buttons fade-up** — staggered 100ms, 500ms duration.
4. **Blob ambient animation** — slow drift, 8s loop, barely perceptible.
5. **Scroll indicator bounce** — infinite `translateY(0→12px→0)`, 1,800ms, starts 800ms after animation completes.

#### States
- **Mobile:** Headline at 48px, single column, blob hidden/minimized
- **Tablet:** Headline at 64px, full layout
- **Desktop:** Full hero at 88px headline

#### Ralph Wiggum Description
> The page loads and words appear letter by letter like a magic trick — then "Obsession" slams in bold and bright in indigo. Two buttons invite you to either start something or see examples first. A tiny green dot says "we're only taking two more clients."

---

### Section 2: Manifesto Strip

**Purpose:** Brand statement. Emotional punctuation. Shareable moment.

#### Layout
- **Full width** strip
- **Background:** `--accent-primary` (#6366f1) — indigo
- **Text:** `#ffffff` (white on indigo)
- **Padding:** 80px vertical, centered
- **Text alignment:** center

#### Content
```
"We Don't Build Marketing.
 We Build Obsession."
```
(Optionally: "Obsession." in `--accent-cta` coral-orange)

#### Typography
- `--text-h1` (Playfair Display 700, clamp 40–64px), white, centered

#### Animation
1. **Scroll-triggered word reveal** — `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)`, 900ms, `--ease-dramatic`.
2. **Optional:** Period "." pulses scale(1→1.15→1) once revealed, 200ms.

#### States
- **Mobile:** Same, reduced padding (48px vertical)
- **Desktop:** Full display

#### Ralph Wiggum Description
> A bold strip of indigo cuts across the page like a highlighter. White words type themselves in from left to right like a movie title. It feels like a declaration — not a description.

---

### Section 3: Services Bento Grid

**Purpose:** Showcase full-stack capabilities with outcome-first framing and conversion triggers.

#### Layout
- **Asymmetric bento grid** — 6 cards, 3 columns desktop / 2 columns tablet / 1 column mobile
- **Cards alternate** between tall and standard height for visual rhythm
- **Section background:** `--bg-primary` (cream)
- **Section padding:** 100px top/bottom

#### Content

**Section Header:**
```
H2: "We don't do 'digital marketing.'
     We do customer acquisition engineering."

SUB: "Six ways we turn anonymous visitors into obsessed customers."
```

**6 Service Cards:**

| # | Service | Outcome Hook | Metric | Price Range |
|---|---------|-------------|--------|-------------|
| 1 | Brand Strategy | "Turn anonymous into unforgettable" | "64% more conversions" | $8,500/mo |
| 2 | Web & App | "Sites so good they steal attention" | "4× faster load times" | $25,000+ |
| 3 | Growth Marketing | "Revenue, not vanity metrics" | "$47M revenue moved" | $8,500/mo |
| 4 | AI Consulting | "AI tools your competitors aren't using yet" | "3× ROI average" | $15,000+ |
| 5 | ERP Integration | "The invisible infrastructure that doubles your revenue" | "90% efficiency gains" | $30,000+ |
| 6 | Development | "Custom build. Zero compromise." | "99.9% uptime" | $20,000+ |

**Each Card Contains:**
- Glassmorphic card (white bg, `--glass-border`, `backdrop-filter: blur(20px)`)
- Scrambling icon (on hover: characters randomize 400ms then resolve)
- Service name (Playfair Display h3)
- Outcome hook (Inter body)
- Mini metric pill (indigo bg, white text, JetBrains Mono)
- Price range (small, muted)
- "See Work →" text link CTA (underline animates left-to-right on hover)

**Guarantee Strip (below grid):**
```
"Results-guaranteed. If you don't see measurable improvement
in 90 days, we keep working free until you do."
```
— Indigo background strip, white text, full-width

#### Animation
1. **Scroll reveal** — cards stagger in (100ms between), `opacity 0→1`, `translateY(40px→0)`, 600ms each.
2. **3D card tilt** — on mouse hover: `rotateX`/`rotateY` ±8° based on cursor position. Max lift: `translateY(-6px)`. Shadow expands. Duration: real-time (mousemove), reset 500ms `--ease-spring`.
3. **Icon scramble** — on first hover: characters randomize 400ms then resolve.
4. **Ambient float** — cards float gently: `translateY(0→-6px→0)`, 4,000ms cycle, staggered delays.

#### States
- **Default:** Card glassmorphic, subtle shadow
- **Hover:** Card lifts (-8px), shadow grows, border brightens (indigo), icon scrambles
- **Mobile:** No tilt (touch), single column, simpler shadow
- **Touch devices:** Disable tilt via `@media (hover: none)`

#### Ralph Wiggum Description
> Six cards sit in a grid like products in a fancy shop window. Hover over one and it tilts toward you like a 3D object — and the icon scrambles like it's being generated. Each card shows a metric proving the service works ("$47M revenue moved"). A bold indigo strip at the bottom says "We guarantee results for 90 days or we work free."

---

### Section 4: Process Timeline

**Purpose:** Reduce buying anxiety. Show transparency. Build trust.

#### Layout
- **Section background:** `--bg-surface` (#f0effe — light indigo tint)
- **4-phase horizontal timeline** desktop / vertical on mobile
- **Connecting SVG line** (indigo) that draws itself as phases enter

#### Content

**Section Header:**
```
H2: "Here's Exactly How We Work Together"
SUB: "No surprises. No runaround. Just results."
```

**4 Phases:**

| # | Phase | Duration | Headline | What You Get |
|---|-------|----------|----------|-------------|
| 01 | Discovery | 20 min | "A real conversation, not a questionnaire" | "We learn about your brand, goals, challenges." |
| 02 | Strategy | 2 weeks | "Your custom roadmap + creative direction" | "Audit, positioning, channel plan." |
| 03 | Build | 4–8 weeks | "Weekly sprints, you see everything first" | "Weekly demos, no surprises." |
| 04 | Grow | Ongoing | "Weekly reports, we optimize forever" | "Monthly reports, continuous testing." |

**Phase Card Structure:**
```
┌──────────────────────────────┐
│  01  (JetBrains Mono, large)  │
│  Discovery Call              │
│  20 minutes                   │
│                               │
│  [Headline phrase]            │
│                               │
│  ✓ You'll know exactly        │
│    where we stand             │
└──────────────────────────────┘
```

**After Launch (below timeline):**
```
What happens after your site launches?
[Monthly Reports] [Weekly Standups] [Quarterly Reviews] [Dedicated Slack]
```

**Risk Reversal Box:**
```
Our Promise:
"If we're not the right fit after our discovery call,
 we'll tell you and refer you to someone who is."
```

#### Animation
1. **Card stagger reveal** — even cards: `translateX(-24px→0)`, odd cards: `translateX(24px→0)`, 600ms, 120ms stagger.
2. **SVG line draw** — `stroke-dashoffset` animates from 1000→0, 1,000ms total, synced to card stagger.
3. **Phase number count-up** — 00→01, 00→02, etc., 300ms per number.
4. **Hover state** — card lifts (-4px), shadow grows, "What you get" bullets fade in.

#### States
- **Mobile:** Vertical timeline, connecting vertical line
- **Desktop:** Horizontal with cards side-by-side
- **Touch devices:** No hover tilt, simple reveal animation

#### Ralph Wiggum Description
> Four boxes appear in a row connected by a glowing indigo line that draws itself as each box appears. Each box shows a step with how long it takes. One says "We promise to tell you if we're not the right fit." That's unusual honesty.

---

### Section 5: Social Proof

**Purpose:** Build credibility. Convert skeptics. Show specific proof.

#### Layout
- **Section background:** `--bg-primary` (cream)
- **5 parts:** Logo strip → Metrics bar → Featured case study → Testimonials → Authority badges

#### Content

**Part A — Logo Strip:**
```
H6 label: "Trusted by brands who refused to be forgettable"
[LOGO] [LOGO] [LOGO] [LOGO] [LOGO] [LOGO]  (auto-scrolling marquee)
```
Client logos: Baltic Born, Steelbone, Nomad, + 3 more DTC brands.

**Part B — Metrics Bar (4 stats):**
```
$47M+           64%           83%           104%
Revenue         Conversion    Sales         Traffic
Moved           Increase      Increase      Increase
```
Numbers count up from 0 on scroll into view (2,000ms, ease-out, 200ms stagger).

**Part C — Featured Case Study:**
```
┌──────────────────────────────────────────────────────────┐
│  CASE STUDY                                              │
│                                                          │
│  [BEFORE/AFTER IMAGE SLIDER]   Baltic Born              │
│                                DTC Fashion Brand         │
│                                ★★★★★                     │
│                                "64% more conversions     │
│                                 in 6 months."            │
│                                — Sarah Chen, CEO         │
│                                                          │
│  [← See All Case Studies →]                            │
└──────────────────────────────────────────────────────────┘
```
**Before/After Slider:** Draggable vertical divider, "Before" label bottom-left, "After" bottom-right.

**Part D — Testimonial Slider:**
```
What Founders Say

┌──────────────────────────────────────────────────────────┐
│  "They don't just build marketing. They build obsession. │
│   Our competitors can't figure out how we're suddenly     │
│   everywhere."                                            │
│                                                          │
│  [Photo] Marcus Rivera                                   │
│           Founder, Steelbone Fitness                     │
└──────────────────────────────────────────────────────────┘
○ ● ○ ○ ○   [←] [→]
```
3–6 testimonials, auto-rotate every 5s, pause on hover.

**Part E — Authority Badges:**
```
[Google Partner]  [Shopify Plus Expert]  [Meta Certified]
"Certified experts, not self-proclaimed"
```

**"We're Selective" Block:**
```
We're not for everyone.
We work with 5–8 clients at a time.
Currently accepting: 2 new clients  🟢
```

#### Animation
1. **Logo strip marquee** — CSS `marquee 25s linear infinite`
2. **Counter animation** — numbers count up 0→target on viewport entry (2,000ms, ease-out, 200ms stagger)
3. **Before/after slider** — draggable, snaps to nearest 10% on release (500ms `--ease-spring`), arrow hint pulses
4. **Testimonial auto-rotate** — 5s interval, fade transition
5. **Card hover** — subtle lift, shadow

#### States
- **Mobile:** Logos in smaller marquee, metrics stack 2×2, case study image full-width
- **Desktop:** Full layout as described

#### Ralph Wiggum Description
> A strip of brand logos scrolls by. Below it, four numbers — "$47M," "64%," "83%," "104%" — tick up like a slot machine when you scroll to them. A picture shows before/after versions of a client's brand with a draggable slider. Quotes from real founders appear with their faces. A note says they're only taking 2 more clients.

---

### Section 6: Pricing

**Purpose:** Qualify leads. Reduce friction. Capture high-intent visitors.

#### Layout
- **Section background:** `--bg-surface` (#f0effe — light indigo tint)
- **3-tier horizontal card layout** desktop / stacked mobile
- **Cards:** Glassmorphic white with tier differentiation

#### Content

**Section Header:**
```
H2: "Choose Your Engagement"
SUB: "Transparent pricing. No hidden fees. Month-to-month after month 1."
```

**Tier 1 — Starter**
```
LABEL:        "Starter"
PRICE:        "$8,500/month"
ANCHOR:       "$106/hr"
DESCRIPTION:  "For brands ready to get serious about growth."
FEATURES:     ✓ 2 Channels | ✓ Strategy | ✓ Monthly Reports | ✓ Email Support
CTA:          "Start a Project →"
```

**Tier 2 — Growth (FEATURED)**
```
LABEL:        "Growth"    [Most Popular badge — indigo]
PRICE:        "$15,000/month"
ANCHOR:       "$94/hr (vs $125/hr at Starter)"
DESCRIPTION:  "For brands ready to dominate their category."
FEATURES:     ✓ 4 Channels | ✓ Strategy | ✓ Dedicated Strategist
              ✓ Weekly Standups | ✓ Priority Support | ✓ CRM Setup
CTAs:         "Start a Project →" (primary)
              "Book a Call →" (secondary, smaller)
```

**Tier 3 — Scale**
```
LABEL:        "Scale"
PRICE:        "Custom"
DESCRIPTION:  "Full-stack. Web, app, ERP, AI — everything."
FEATURES:     ✓ Everything in Growth | ✓ Web & App Development
              ✓ ERP Integration | ✓ AI Consulting | ✓ Dedicated Team
CTA:          "Book a Call →"
```

**Below Tiers:**
```
RISK REVERSAL: "No hidden costs. Fixed fees. Month-to-month.
                 You can pause or adjust anytime."

SELF-SELECTION: "Not sure which fits? [Take our 2-min project finder →]"

ENTERPRISE:      "Need something beyond these?
                 [Tell us about your project →]"
```

#### Animation
1. **Ambient float** — all 3 cards: `translateY(0→-6px→0)`, 4,000ms cycle, staggered delays (0ms, 1,300ms, 2,600ms).
2. **"Most Popular" badge pop** — `scale(0→1)`, 400ms `--ease-bounce` on section enter, then pulses `scale(1→1.05→1)` every 2,000ms.
3. **Card hover** — `translateY(-8px)`, shadow expands, border brightens.
4. **Growth tier glow** — pulsing indigo border glow on hover.

#### States
- **Default:** Card with glassmorphic treatment
- **Hover:** Card lifts, border brightens to indigo, shadow deepens
- **Mobile:** Cards stack vertically, featured card first
- **Featured (Growth):** Indigo border, slight scale (1.02), "Most Popular" badge

#### Ralph Wiggum Description
> Three white cards float gently, like they're breathing. The middle one has a glowing indigo border and says "Most Popular." Each shows a monthly price with an hourly comparison. A small line says "No hidden costs, month-to-month." Below: "Not sure which? Take our 2-minute project finder."

---

### Section 7: Final CTA

**Purpose:** Re-engage scrollers. Capture not-yet-ready leads via lead magnet.

#### Layout
- **Section background:** `--bg-primary` (cream) with subtle indigo blob accent
- **Centered content**, minimal

#### Content

```
H2: "Curious? Let's Talk."

[Book a Call →]   [Let's Chat →]

─────────────────────────────────────────────────────

"Not ready to talk?"

Get your free "DTC Growth Audit" — 11 checkpoints:

  1. Where you're bleeding revenue
  2. Your channel mix efficiency
  3. The one change that would double your conversion

[Email ____________________] [Send Me the Audit →]

We'll evaluate your current marketing and tell you exactly
what's holding you back. Free. No pitch.

─────────────────────────────────────────────────────

Next available start: May 15, 2026
🟢 Currently accepting 2 new clients
```

#### Animation
1. **Magnetic CTA buttons** — button subtly pulls toward cursor within 120px radius (max 12px offset). Spring reset 500ms on leave.
2. **Ambient glow pulse** — primary CTA button has soft indigo glow, 3,000ms cycle.
3. **Form focus glow** — email input focus: indigo ring (`box-shadow: 0 0 0 3px rgba(99,102,241,0.25)`).
4. **Content fade-in** — on scroll reveal, staggered.

#### States
- **Default:** Two equal CTAs, form below
- **Hover (CTA):** Magnetic pull, glow intensifies
- **Focus (input):** Indigo ring appears
- **Mobile:** CTAs stack, form simplified

#### Ralph Wiggum Description
> The last thing before the footer. Two buttons: "Book a Call" and "Let's Chat." Below, a small form offering a free "DTC Growth Audit" with three preview bullets explaining exactly what you get. It says "Free. No pitch." and mentions the next available start date.

---

### Section 8: Footer

**Purpose:** Navigation utility. Final trust signal. Contact information.

#### Layout
- **Section background:** `--text-primary` (#1e1b4b — dark indigo) — the ONE dark element, anchors the page
- **4-column layout** desktop / stacked mobile

#### Content

**Top Section (4 columns):**
```
COL 1: Services
  - Brand Strategy
  - Web & App
  - Growth Marketing
  - AI Consulting
  - ERP Integration
  - Development

COL 2: Company
  - About
  - Work
  - Blog
  - Careers
  - Contact

COL 3: Connect
  - hello@ejago.com
  - (555) 123-4567
  - US-Based, Remote-First

COL 4: [AI Badge + CTA]
  🤖 Built by AI agents.
     Not just humans. We practice what we preach.

  [Get Our Free AI Audit →]
```

**Trust Micro-Signal:**
```
"Trusted by DTC brands doing $1M–$50M/yr"
```

**Bottom Bar:**
```
© 2026 Ejago. Results-focused. No fluff.
[LinkedIn] [Instagram] [Twitter] [Dribbble]
```

#### Animation
- Minimal — subtle fade-in on scroll
- Social icons: color on hover (indigo)
- AI badge: subtle shimmer animation on hover

#### States
- **Mobile:** 2-column grid, then single column
- **Link hover:** Underline animates left-to-right (indigo)

#### Ralph Wiggum Description
> The footer is dark indigo — the one dark element on an otherwise light cream page, making it feel like an anchor. A badge says "Built by AI agents" with a link to the free audit. Four columns of links. Social icons. A tiny note: "© 2026 Ejago. Results-focused. No fluff."

---

## 3. ANIMATION LIBRARY

### Global CSS Animation Variables

```css
:root {
  --ease-smooth:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring:   cubic-bezier(0.34, 1.2, 0.64, 1);
  --ease-dramatic: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-over:     cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast:      200ms;
  --dur-base:      400ms;
  --dur-slow:      600ms;
  --dur-slower:    800ms;
  --dur-counter:   2000ms;
  --float-distance: 6px;
  --float-duration: 4000ms;
}
```

---

### 3.1 Load Animations

#### LA-1: Word Scramble Hero Entrance
- **Section:** Hero
- **Trigger:** Page load
- **Technique:** JS `requestAnimationFrame` loop (not `setInterval`)
- **Behavior:** Each word scrambles random chars (pool: `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%`) then resolves. Last word "Obsession." lands in `--accent-primary` (#6366f1) with `scale(1.05)` punch, 150ms then settles to 1.0.
- **Timing:**
  - Black hold: 200ms
  - Per-word scramble: 400ms
  - Stagger between words: 100ms
  - Subheadline fade-in: 600ms, starts 200ms after last word settles
  - Total headline animation: ~1,200ms
- **Easing:** Settle: `--ease-over`; Subheadline: `--ease-smooth`
- **Ralph Wiggum test:** ✅ Scrambled letters magically become readable words. Delightful.

#### LA-2: Staggered Fade-Up (Global, all sections)
- **Trigger:** IntersectionObserver (threshold 0.2)
- **CSS class:** `.scroll-reveal`
- **Behavior:** Elements with `.scroll-reveal` animate `opacity 0→1`, `translateY(40px→0)` when entering viewport
- **Timing:** 600ms, `--ease-smooth`
- **Stagger:** Use `.stagger-1` through `.stagger-6` classes (100ms increments)
- **Implementation:** Single IntersectionObserver on document root

#### LA-3: Blob Ambient Animation
- **Section:** Hero (decorative)
- **Technique:** CSS `@keyframes blob`
- **Behavior:** Border radius morphs + subtle scale, creating organic blob movement
- **Timing:** 8s ease-in-out infinite
- **CSS:**
```css
@keyframes blob {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1) rotate(0deg); }
  33% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.05) rotate(5deg); }
  66% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; transform: scale(1.1) rotate(-5deg); }
}
```

---

### 3.2 Scroll Animations

#### SA-1: Manifesto Clip Reveal
- **Section:** Manifesto Strip- **Technique:** CSS `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` (left-to-right wipe)
- **Timing:** 900ms, `--ease-dramatic`
- **Trigger:** IntersectionObserver (threshold 0.3)
- **CSS:**
```css
.clip-reveal {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 900ms cubic-bezier(0.76, 0, 0.24, 1);
}
.clip-reveal.revealed {
  clip-path: inset(0 0% 0 0);
}
```
- **Ralph Wiggum test:** ✅ Words appear as if being typed left to right — cinematic.

#### SA-2: Services 3D Card Tilt
- **Section:** Services Bento Grid
- **Trigger:** `mousemove` on card element
- **Technique:** CSS `rotateX/rotateY` based on cursor position relative to card center. Max ±8°. Perspective 1000px. `translateY(-6px)` on hover.
- **Reset:** On `mouseleave`, 500ms `--ease-spring` back to flat
- **Touch fallback:** `@media (hover: none) { .card { transform: none; } }`
- **Ralph Wiggum test:** ✅ Tilted cards feel 3D — like tilting a physical postcard.

#### SA-3: Process SVG Line Draw
- **Section:** Process Timeline
- **Technique:** SVG `stroke-dasharray: 1000; stroke-dashoffset: 1000` → `stroke-dashoffset: 0`, 1000ms. Cards stagger 120ms apart starting 200ms before line.
- **Ralph Wiggum test:** ✅ The connecting line draws itself — like being built in real-time.

#### SA-4: Metrics Counter Animation
- **Section:** Social Proof — Metrics Bar
- **Technique:** `requestAnimationFrame` counting 0→target over 2000ms, ease-out-cubic. 200ms stagger between 4 counters.
- **Format:** Handles `$47M+`, `64%`, `83%`, `104%`
- **Ralph Wiggum test:** ✅ Numbers tick up like a slot machine — proof feels real.

#### SA-5: Pricing Card Float
- **Section:** Pricing
- **Technique:** CSS `@keyframes float` with `translateY(0→-6px→0)`, 4000ms cycle. Cards staggered: 0ms, 1300ms, 2600ms.
- **Ralph Wiggum test:** ✅ Cards feel like they're breathing — alive but not distracting.

#### SA-6: Before/After Slider
- **Section:** Social Proof — Case Study
- **Technique:** CSS `clip-path` + JS drag handler. Default 50%. Snaps to nearest 10% on release, 500ms `--ease-spring`.
- **Ralph Wiggum test:** ✅ Interactive — you control the reveal. Memorable.

#### SA-7: Testimonial Auto-Rotate
- **Section:** Social Proof — Testimonials
- **Technique:** `setInterval` every 5s, 400ms opacity crossfade. Pause on hover.
- **Ralph Wiggum test:** ✅ Just watching them rotate feels like the page is alive.

### 3.3 Hover Animations

#### HA-1: Magnetic Button
- **Radius:** 120px | **Max displacement:** 12px | **Spring reset:** 500ms `--ease-spring`
- JavaScript `mousemove` within radius, `translate()` toward cursor.

#### HA-2: Link Underline Draw
- CSS `::after` pseudo-element. `width: 0→100%` on hover. 300ms `--ease-smooth`.

#### HA-3: Card Hover Lift
- `translateY(-8px)`, shadow expands. 300ms `--ease-smooth`.

#### HA-4: Icon Text Scramble
- JS `setInterval` 30fps, 400ms resolve. Character pool: `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%`.

### 3.4 Ambient Animations

#### AA-1: Pricing Glow Pulse
```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.2); }
  50% { box-shadow: 0 0 40px rgba(99,102,241,0.4); }
}
.glow-pulse { animation: glow-pulse 3000ms ease-in-out infinite; }
```

#### AA-2: Logo Marquee
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.marquee-track { animation: marquee 25s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }
```

### 3.5 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3.6 Animation Priority Table

| Priority | Animation | Section | Technique |
|----------|-----------|---------|-----------|
| P0 | Word scramble hero | Hero | JS RAF |
| P0 | Scroll reveal stagger | All | CSS + IntersectionObserver |
| P0 | Metrics counter | Social Proof | JS RAF |
| P1 | 3D card tilt | Services | JS + CSS |
| P1 | Manifesto clip reveal | Manifesto | CSS clip-path |
| P1 | Process SVG line draw | Process | SVG stroke-dashoffset |
| P1 | Pricing float | Pricing | CSS @keyframes |
| P1 | Magnetic buttons | CTA, Footer | JS |
| P2 | Before/after slider | Social Proof | CSS clip-path + JS |
| P2 | Testimonial auto-rotate | Social Proof | JS setInterval |
| P2 | Icon scramble | Services | JS setInterval |
| P3 | Blob ambient | Hero | CSS @keyframes |
| P3 | Marquee | Social Proof | CSS animation |
| P3 | Glow pulse | Pricing | CSS @keyframes |

---

## 4. COMPONENT INVENTORY

### 4.1 Buttons

#### Primary Button
```css
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 12px;
  background: var(--accent-cta); color: white;
  font-weight: 600; font-size: 15px; border: none; cursor: pointer;
  box-shadow: 0 12px 30px rgba(249,115,22,0.30);
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 200ms ease;
}
.btn-primary:hover { transform: scale(1.02); box-shadow: 0 16px 40px rgba(249,115,22,0.35); }
.btn-primary:active { transform: scale(0.97); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
```

#### Ghost Button
```css
.btn-ghost {
  padding: 14px 28px; border-radius: 12px;
  background: transparent; color: var(--text-primary);
  border: 2px solid var(--border); cursor: pointer;
  font-weight: 600; font-size: 15px;
  transition: border-color 200ms ease, background 200ms ease, transform 200ms ease;
}
.btn-ghost:hover { border-color: var(--accent-primary); background: var(--bg-tint); transform: scale(1.02); }
```

#### Text Link
```css
.link { position: relative; color: var(--accent-primary); text-decoration: none; font-weight: 500; }
.link::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 0; height: 2px; background: var(--accent-primary);
  transition: width 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.link:hover::after { width: 100%; }
```

---

### 4.2 Cards

#### Service Card (Glassmorphic)
```css
.card-service {
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 16px; padding: 28px;
  box-shadow: 0 8px 32px rgba(99,102,241,0.10);
  transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
}
.card-service:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(99,102,241,0.16);
  border-color: rgba(99,102,241,0.3);
}
```

#### Pricing Card
```css
.card-pricing {
  background: var(--bg-elevated); border: 1px solid var(--border);
  border-radius: 20px; padding: 32px;
  transition: transform 300ms ease, box-shadow 300ms ease;
}
.card-pricing.featured {
  border: 2px solid var(--accent-primary);
  box-shadow: 0 0 20px rgba(99,102,241,0.15);
  transform: scale(1.02);
}
```

#### Testimonial Card
```css
.card-testimonial {
  background: var(--bg-elevated); border-radius: 16px;
  padding: 32px; border: 1px solid var(--border);
}
```

---

### 4.3 Form Elements

#### Text Input
```css
.input {
  width: 100%; padding: 14px 16px;
  background: var(--bg-elevated); border: 1px solid var(--border);
  border-radius: 8px; font-size: 16px; color: var(--text-primary);
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.input::placeholder { color: var(--text-muted); }
.input:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
.input.error { border-color: var(--color-error); box-shadow: 0 0 0 3px rgba(239,68,68,0.15); }
```

#### Badge / Pill
```css
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 9999px;
  font-family: var(--font-mono); font-size: 13px; font-weight: 500;
  background: var(--accent-primary); color: white;
}
.badge.availability {
  background: rgba(16,185,129,0.1); color: var(--accent-secondary);
  border: 1px solid rgba(16,185,129,0.3);
}
```

---

### 4.4 Layout

#### Section Container
```css
.section { padding: 100px 0; }
.section-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
@media (max-width: 768px) { .section { padding: 64px 0; } }
```

#### Grids
```css
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
@media (max-width: 1024px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) { .grid-3, .grid-2 { grid-template-columns: 1fr; } }
```

---

## 5. IMAGE & ASSET LIST

### 5.1 Already Generated (22 assets — all web-ready)

| File | Size | Usage |
|------|------|-------|
| `logo.png` | 290KB | Header logo |
| `hero-blob.png` | 88KB | Hero blob element |
| `hero-abstract-bg.png` | 493KB | Hero background alternative |
| `icon-brand-strategy.png` | 74KB | Services icon |
| `icon-web-app.png` | 68KB | Services icon |
| `icon-growth-marketing.png` | 237KB | Services icon |
| `icon-ai-consulting.png` | 243KB | Services icon |
| `icon-erp-integration.png` | 96KB | Services icon |
| `icon-development.png` | 75KB | Services icon |
| `process-phase-1.png` | 63KB | Process illustration |
| `process-phase-2.png` | 95KB | Process illustration |
| `process-phase-3.png` | 69KB | Process illustration |
| `process-phase-4.png` | 76KB | Process illustration |
| `metrics-visual.png` | 174KB | Social proof visual |
| `testimonial-chat.png` | 67KB | Testimonial visual |
| `case-study-baltic-born.png` | 402KB | Case study image |
| `case-study-steelbone-fitness.png` | 315KB | Case study image |
| `team-collaboration.png` | 431KB | About section |

### 5.2 Still Needed

| Asset | Format |
|-------|--------|
| Client logos (Baltic Born, Steelbone, +1 more) | SVG, white/monochrome |
| Favicon | SVG 32×32 |
| Manifesto BG video | MP4/WebM 10s loop (Kling-generated) |

---

## 6. CONVERSION ELEMENTS

### 6.1 CTA Placement Map

| Location | Copy | Type |
|----------|------|------|
| Nav | "Let's Chat" | Ghost |
| Hero | "Start a Project" | Primary (coral) |
| Hero | "See Our Work" | Ghost |
| Services card | "See Work →" | Text link |
| Pricing (Growth) | "Book a Call" | Primary |
| Pricing (Starter/Scale) | "Start a Project" | Primary |
| Final CTA | "Book a Call" / "Let's Chat" | Primary/Ghost |
| Lead magnet | "Send Me the Audit →" | Submit |
| Footer | "Get Our Free AI Audit →" | Text link |

### 6.2 Trust Signals

**On-page metrics:**
```
$47M+  Revenue Moved    | 64%  Conversion Increase
83%    Sales Increase   | 104% Traffic Increase
```
*(for select clients)*

**Testimonial format:** `"[Quote]" — [Name], [Title], [Company] ★★★★★`

**Availability (exact copy):**
- "Currently accepting 2 new clients" → Hero + Social Proof
- "We're not for everyone. We work with 5–8 clients at a time." → Social Proof
- "Next available start: May 15, 2026" → CTA section

### 6.3 Risk Reversal Stack

1. **90-Day Guarantee** — Services strip: "Results-guaranteed. 90 days or we work free."
2. **No Lock-in** — Pricing: "No hidden costs. Month-to-month."
3. **Honest Fit Promise** — Process: "Not the right fit after discovery? We'll refer you."
4. **Free Audit, No Pitch** — CTA: "Free. No pitch. 24-hour breakdown."

### 6.4 Lead Magnet

**Headline:** "Get Your Free DTC Growth Audit"
**Sub:** "11 checkpoints. We tell you exactly what's holding you back."
**3 preview bullets:** Where you're bleeding revenue · Channel mix efficiency · One change to double conversion
**Form:** Email input + "Send Me the Audit →"
**Reassurance:** "Free. No pitch. Detailed breakdown in 24 hours."

---

## 7. ACCESSIBILITY

- All interactive elements keyboard-accessible
- `:focus-visible` on all inputs/buttons
- `aria-label` on icon-only buttons
- `alt` text on all images
- `prefers-reduced-motion` respected throughout
- WCAG AA contrast (4.5:1 minimum)
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Skip-to-content link in header

---

## 8. PERFORMANCE TARGETS

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Total page weight | < 2MB |
| Largest image | < 500KB |

- `loading="lazy"` on all below-fold images
- `will-change: transform` only on actively animating elements
- CSS animations over JS where possible
- `font-display: swap` on Google Fonts
- Preload Playfair Display 900 for hero

---

*Spec complete. Ready for implementation.*
*Compiled: April 6, 2026 | Phase 1: Zac (animation) + Kim (conversion) | Synthesis: Lee*
