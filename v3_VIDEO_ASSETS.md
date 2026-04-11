# V3 Video & Asset Plan — Ejago

Strategic asset planning for Ejago v3 redesign. Covers AI video generation prompts, stock alternatives, CSS animation alternatives, and complete image asset checklist.

---

## Kling Prompts

### 1. Hero Video (5-8s loop)

**Prompt:**
```
Cinematic abstract visualization representing brand obsession and digital dominance. 
Dark moody atmosphere with deep indigo (#1e1b4b) to violet (#4338ca) gradient background.
Geometric shapes — angular polygons and flowing curves — morphing and evolving slowly.
Accent pops of vibrant orange (#f97316) and amber (#fbbf24) emerging from dark shapes.
No text, no faces, no logos, no symbols.
Slow motion fluid transitions, high contrast, dark void foreground.
Loopable seamless animation, 24fps, 4K resolution.
```

**Technical Notes:**
- Duration: 5-8 seconds optimized for loop
- Colors: Indigo (#6366f1 accent), Orange (#f97316) sparks, Dark background (#0a0a0f)
- Motion: Slow morphing shapes, geometric fluidity — NOT chaotic
- Use as: Landing hero background, muted with caption overlay

---

### 2. Services Video (5-8s loop)

**Prompt:**
```
Abstract data visualization of AI-driven marketing intelligence.
Network nodes connecting, neural-style pathways glowing in indigo (#6366f1).
Data points transforming into metrics — numbers rising, charts morphing from line to bar to pie.
Subtle orange (#f97316) highlights marking key data points.
Clean technical aesthetic, minimal void space.
Geometric precision, no hand-drawn elements.
Loopable, clean ending at center frame.
4K, 24fps.
```

**Technical Notes:**
- Focus: AI analytics, marketing data, growth visualization
- Motion: Chart transitions, node networks, data emergence
- Colors: Indigo primary (#6366f1), Orange accents (#f97316), White (#ffffff) data
- Use as: Services section highlight, muted background

---

### 3. Manifesto/CTA Video (5-8s loop)

**Prompt:**
```
Bold brand statement visualization — intensity and focus.
Dark background with single dominant geometric form (hexagon/crystal) pulsing with inner light.
Intense orange (#f97316) energy emanating outward, contrasted with deep indigo (#312e81) shadows.
Sharp angular cuts, decisive motion, no softness.
Text-compatible negative space in center-right.
Building to climax at 5-6s mark.
Cinematic finish, hold on final frame for 2s.
4K, 24fps.
```

**Technical Notes:**
- Purpose: CTA section, brand intensity statement
- Motion: Pulse/emanate energy, sharp decisive movement
- Colors: Orange energy dominant, Indigo depth, high contrast
- Use as: Final CTA section background

---

## Stock Video Alternatives

| Source | URL | Cost | Quality | License | Best For |
|--------|-----|------|---------|---------|----------|
| **Pexels** | pexels.com/videos | Free | ★★★★☆ | Commercial use, no attribution required | Hero backgrounds, abstract loops |
| **Mixkit** | mixkit.co | Free | ★★★★★ | Commercial use, premium also available | High-quality marketing clips |
| **Adobe Stock** | stock.adobe.com | $20-200+/clip | ★★★★★ | Commercial, editorial restrictions apply | Premium agency-quality content |

### Recommendations by Use Case

1. **Hero Background** → Pexels (free, quality adequate, commercial OK)
   - Search terms: "abstract geometric", "dark gradient", "low poly"
2. **Services/Data** → Mixkit (higher curation, professional look)
   - Search terms: "tech", "data", "network"
3. **Premium Needs** → Adobe Stock (guaranteed rights, full commercial)

**Note:** Per the brief — *"NO generic stock footage — brand-specific visuals only"*. Stock video should be abstract/geometric foundation only. If brand-specific is priority, Kling AI generation is preferred over generic stock.

---

## CSS Animation Alternatives

Since autoplay video backgrounds hurt UX/performance (bandwidth, mobile, accessibility), here are 3 CSS-based alternatives that achieve similar visual impact:

### 1. Animated Gradient Background

```css
/* CSS-only animated gradient — no video, no JS */
.hero-gradient {
  background: linear-gradient(
    135deg,
    #0a0a0f 0%,
    #1e1b4b 25%,
    #312e81 50%,
    #1e1b4b 75%,
    #0a0a0f 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Optional: add geometric overlay */
.hero-gradient::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
  animation: orbsFloat 20s ease-in-out infinite;
}
```

**Pros:** Lightweight (~1KB), GPU-accelerated, fully responsive
**Cons:** Less dynamic than video, 2D only

---

### 2. SVG Morphing Shapes (Pure CSS/SVG)

```css
/* Option A: CSS-only geometric morphing using clip-path */
.morph-shape {
  width: 100%;
  height: 100%;
  background: #0a0a0f;
  animation: morphForm 8s ease-in-out infinite alternate;
  clip-path: polygon(
    50% 0%, 100% 25%, 100% 75%, 50% 100%,
    0% 75%, 0% 25%
  );
}

@keyframes morphForm {
  0% {
    clip-path: polygon(
      50% 0%, 100% 25%, 100% 75%, 50% 100%,
      0% 75%, 0% 25%
    );
  }
  100% {
    clip-path: polygon(
      30% 0%, 100% 0%, 100% 70%, 70% 100%,
      0% 100%, 0% 30%
    );
  }
}

/* Option B: SVG with animateSMIL (more organic) */
<!-- Pure SVG embedded directly -->
<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#312e81"/>
    </linearGradient>
  </defs>
  <path d="M400,100 Q600,100 600,300 T400,500 T200,300 T400,100" fill="url(#brandGradient)">
    <animate dur="10s" repeatCount="indefinite"
      d="M400,100 Q600,100 600,300 T400,500 T200,300 T400,100;
         M400,100 Q500,150 550,300 T400,500 T250,300 T400,100"
      values="...path states..."
    />
  </path>
</svg>
```

**Pros:** Fully controllable, vector crispness, small file size
**Cons:** Complex morphs require SVG expertise

---

### 3. Particle/Grid Animation (Canvas or CSS)

```css
/* Option A: CSS Grid dots animation (lightweight) */
.particles-grid {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(15, 1fr);
  gap: 4px;
  width: 100%;
  height: 100%;
}

.particle {
  width: 4px;
  height: 4px;
  background: #6366f1;
  border-radius: 50%;
  opacity: 0;
  animation: particlePulse 3s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.15s);
}

@keyframes particlePulse {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 0.8; transform: scale(1); }
}

/* Option B: Canvas-based particles (more dynamic) */
<!-- HTML -->
<canvas id="heroCanvas" class="canvas-background"></canvas>

<!-- JS (Vanilla, no library) -->
<script>
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = Math.random() > 0.7 ? '#f97316' : '#6366f1';
    this.opacity = 0;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity += (Math.random() - 0.5) * 0.1;
    this.opacity = Math.max(0, Math.min(1, this.opacity));
    
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity * 0.6;
    ctx.fill();
  }
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = Array.from({length: particleCount}, () => new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}

init();
animate();
window.addEventListener('resize', init);
</script>
```

**Pros:** High-end feel, very dynamic, professional polish
**Cons:** Requires JS, slightly more CPU (negligible for 60 particles)

---

### Recommendation by Section

| Section | Recommended Alternative | Priority |
|---------|------------------------|----------|
| Hero | CSS Gradient + Canvas Particles | HIGH |
| Services | SVG Morphing (simple) or CSS Gradient | MEDIUM |
| CTA | Canvas pulse or CSS Gradient pulse | HIGH |
| Mobile (all) | Static gradient only — disable animations | REQUIRED |

---

## Image Asset Checklist

Complete list of images needed for v3. Each item includes recommended source/approach.

### Hero Section

| Asset | Recommended Source | Format | Notes |
|-------|-------------------|--------|-------|
| Hero background | CSS animated gradient (from above) | CSS | No image needed — pure CSS |
| Brand logo | Existing v1/v2 assets | SVG (preferred) | `logo.svg` in assets/ |
| Decorative shapes | CSS ::before/::after | CSS | Geometric overlays |

### Services (6 cards)

| Asset | Recommended Source | Format | Notes |
|-------|-------------------|--------|-------|
| Service icons | Phosphor Icons or Heroicons | SVG | Clean, consistent, free |
| Icons needed: | | | |
| - Brand Strategy | target/swords | SVG | |
| - Web & App | code/monitor | SVG | |
| - Growth Marketing | chart-line-trend-up | SVG | |
| - AI Consulting | brain | SVG | |
| - ERP Integration | cube | SVG | |
| - Development | code-bracket | SVG | |

**Source:** Phosphor Icons (phosphoricons.com) — free, MIT license, SVG available

### Social Proof / Metrics Bar

| Asset | Recommended Source | Format | Notes |
|-------|-------------------|--------|-------|
| Metrics numbers | CSS-generated | Text | Animated via JS on scroll |
| Authority badges | Partner program assets | PNG/SVG | Google Partner, Shopify Plus, Meta Business — verify current status |

### Testimonials (3 cards)

| Asset | Recommended Source | Format | Notes |
|-------|-------------------|--------|-------|
| Person photos | Use initials/avatar instead | CSS | More trustworthy than stock faces |
| Avatar approach: | | | |
| - Style | Colored circle with initials | CSS | No real photos needed |
| - Fallback | ui-avatars.com API | PNG (generated) | `https://ui-avatars.com/api/?name=SC&background=6366f1&color=fff` |

**Decision:** Per brief — use initials/avatars vs. real photos. Recommended: CSS circles with initials, or generated avatars.

### Case Study Snippet (NEW for v3)

| Asset | Recommended Source | Format | Notes |
|-------|-------------------|--------|-------|
| Before/after visualization | CSS charts/graphs | CSS/SVG | Data-driven, not stock photos |
| Brand thumbnails | Placeholder or CSS pattern | CSS | Keep abstract until case studies finalized |

### CTA Section

| Asset | Recommended Source | Format | Notes |
|-------|-------------------|--------|-------|
| Email capture form | Native HTML | — | No image needed |
| Decorative illustration | CSS geometric | CSS | No image needed |

### Footer

| Asset | Recommended Source | Format | Notes |
|-------|-------------------|--------|-------|
| AI badge icon | bot/brain icon | SVG | `assets/ai-badge.svg` |
| Social links | Font brand icons or SVG | SVG | Instagram, LinkedIn, etc. |

---

## Summary Table

| Category | Items | Primary Source | Cost |
|----------|-------|---------------|------|
| Hero visuals | Logo, background | CSS/Existing | $0 |
| Service icons | 6× SVG icons | Phosphor Icons | $0 |
| Testimonials | 3× avatars | Generated/CSS | $0 |
| Authority badges | 3× images | Verify status | $0 |
| Background video | See CSS alternatives | — | $0 |
| Premium video (optional) | Kling custom | TBD | ~$5-15/clip |

---

## Action Items

- [ ] **Verify authority badges** — Check current Google Partner, Shopify Plus, Meta Business status
- [ ] **Download service icons** — Pull Phosphor Icons for all 6 services
- [ ] **Test CSS gradients** — Implement hero gradient first, iterate
- [ ] **Option: Kling generation** — If budget allows, generate custom hero video
- [ ] **Option: Stock fallback** — If no video, default to CSS gradient

---

*Generated for Ejago v3 Redesign — Kit, coordinating*