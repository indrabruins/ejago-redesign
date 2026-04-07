# Kling AI Video Prompts — Hero & Section Backgrounds (Revised)
**Compiled:** April 6, 2026 | **Research:** Web + Kling AI best practices
**Theme:** Light, premium, cream base | **Style:** Playfair Display editorial feel

---

## Research Findings

### Kling Loop Best Practices (from web research)
1. **Use identical start/end frames** — generate an abstract image first, use it as both start frame and end frame in Kling's Frames tab → ensures seamless infinite loop
2. **Duration:** 5s for testing, 8-10s for production
3. **Prompt terms:** "seamless and loopable," "subtle motion," "drifting parallax," "gentle loop"
4. **Avoid:** aggressive camera moves, big changes, distortion
5. **Negative prompts:** "no camera move, no distortion, stable composition"
6. **FPS:** 24-30fps, standard quality
7. **Aspect ratio:** 16:9 for hero, 9:16 for vertical manifesto

### Parallax Best Practices (2025-2026)
1. Multiple layers at different scroll speeds: background at 0.3x, mid at 0.5x, foreground at 1x
2. Dark overlay (20-40% opacity) over video for text contrast
3. Use CSS `transform: translateY()` not scroll events (GPU-accelerated)
4. Keep videos 720p, 24-30fps, <5MB, WebM/MP4
5. Fallback: poster image on mobile/low-end devices
6. Respect `prefers-reduced-motion`

---

## VIDEO 1 — Hero Background (PRIMARY) ⭐
**Duration:** 8s | **Aspect:** 16:9 | **Loop:** Yes (start/end frame method)
**Style:** Warm cream, soft light rays, floating geometric shapes, subtle parallax

### Image Generation (to use as start/end frame)
Generate first via nano-banana or your preferred tool:
```
"A premium abstract hero background for a digital agency website.
Warm cream (#faf9f6) base with soft ivory light rays radiating from center.
Floating geometric shapes: thin gold (#fbbf24) lines, translucent white circles,
and soft indigo (#6366f1) rectangles at varying depths (z-layering for parallax).
Center: a glowing lime-green (#c8f526) orb, subtle pulsing, creating a warm gradient.
The composition is centered and balanced — nothing chaotic.
Isometric perspective, overhead angle, subtle 3D depth.
Cinematic, aspirational, clean. No text. No faces.
Dark warm tones with light accents. Commercial quality, photorealistic."
Output: hero-loop-base.png (this becomes your start AND end frame in Kling)
```

### Kling Motion Prompt (use with identical start/end frame above)
```
Gentle abstract background animation: warm cream and ivory light rays slowly
radiating outward from a glowing lime-green center orb. Floating geometric
shapes — thin gold lines, translucent white circles, soft indigo rectangles —
drifting slowly in 3D space at different depths creating a parallax effect.
Subtle parallax: shapes at back move slowest, shapes at front move fastest.
The lime-green center pulses softly (opacity 0.7 to 1.0, 4-second cycle).
Slow, smooth, seamless loop. No camera movement. No cuts. No distortion.
Professional premium agency aesthetic. Soft natural lighting.
Negative prompt: no people, no text, no aggressive motion, no camera shake,
no harsh colors, no distortion.
Duration: 8 seconds. Aspect ratio: 16:9. FPS: 30.
```

**CSS Parallax Layer Setup:**
```css
.hero-bg-video {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.hero-bg-video video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%) scale(1.1); /* slight zoom to prevent edge gaps */
  object-fit: cover;
}
/* Dark gradient overlay for text contrast */
.hero-bg-video::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(250,249,246,0.3) 0%,
    rgba(250,249,246,0.1) 40%,
    rgba(250,249,246,0.4) 80%,
    rgba(250,249,246,0.7) 100%
  );
}
/* Parallax on scroll */
@media (hover: hover) {
  .hero-bg-video {
    will-change: transform;
  }
  .hero-bg-video { transform: translateY(calc(var(--scroll-y, 0) * 0.3px)); }
}
```

---

## VIDEO 2 — Hero Parallax Layer: Floating Shapes (MID LAYER)
**Duration:** 10s | **Aspect:** 16:9 | **Loop:** Yes
**Purpose:** Layered mid-depth shapes moving at 0.5x scroll speed
**Style:** Same palette but with sharper geometric focus

### Generate image first:
```
"Abstract floating geometric composition for web parallax background.
Sharp thin gold (#fbbf24) lines forming loose grid intersections.
Translucent white circles of varying sizes (10-80px diameter) scattered at mid-depth.
Soft indigo (#6366f1) rectangles tilted at various angles.
All elements floating against a warm cream (#faf9f6) background.
High contrast between gold/indigo and cream for visual pop.
Flat design, minimal, no gradients on shapes themselves.
Background: pure warm cream (#faf9f6).
Isometric grid perspective. Commercial vector art style.
No text. No faces. Wide 16:9 aspect ratio."
Output: hero-parallax-mid.png (use as start AND end frame)
```

### Kling Prompt:
```
Subtle floating geometric animation: thin sharp gold lines drifting slowly,
forming and dissolving loose grid intersections. Translucent white circles
floating at medium speed in different directions. Soft indigo rectangles
rotating gently (5-15 degrees, 6-second cycle). All elements move at
medium parallax speed — faster than a background, slower than foreground.
Seamless loop. No camera movement. Stable composition.
No distortion. No people. No text.
Duration: 10 seconds. Aspect ratio: 16:9. FPS: 30.
```

---

## VIDEO 3 — Manifesto Strip Vertical (9:16)
**Duration:** 5s | **Aspect:** 9:16 | **Loop:** No (plays once on scroll entry)
**Style:** Bold, dramatic, word assembly effect

### Image (start frame):
```
"A single bold text composition. Large serif font word 'OBSESSION' in
deep charcoal (#1e1b4b) centered on a white background. The word is
surrounded by floating lime-green (#c8f526) light particles.
Background: pure white with a subtle warm gradient at edges.
Bold, dramatic, cinematic. Editorial typography style.
High contrast. Clean. No additional text."
Output: manifesto-frame.png
```

### End frame:
```
"Same composition as the start frame — the word 'OBSESSION' fully assembled
and centered in deep charcoal (#1e1b4b) with lime-green particles
gently pulsing around it.
Background: pure white.
This is the END frame — identical to start frame for seamless loop if needed.
Bold, complete, confident."
Output: manifesto-end.png
```

### Kling Prompt:
```
Dramatic word assembly animation: floating fragments — individual letters
and geometric shards in deep charcoal (#1e1b4b) — slowly assembling from
random positions to form the word 'OBSESSION' centered on white background.
As each letter snaps into place, a pulse of lime-green light (#c8f526)
bursts outward from that letter. When the full word appears, the lime-green
light pulses one final time, illuminating all particles simultaneously.
After pulse, word settles and holds. Then the animation plays in reverse —
word fragments into particles and fades. Seamless loop.
Dramatic, cinematic reveal. High contrast. Editorial typography feel.
No people. No text other than OBSESSION. No camera movement.
Duration: 5 seconds. Aspect ratio: 9:16 (vertical). FPS: 30.
```

---

## VIDEO 4 — Services Bento Background (Ambient Particles)
**Duration:** 10s | **Aspect:** 16:9 | **Loop:** Yes
**Style:** Calm, blueprint-like, premium

### Image:
```
"Abstract premium background for a services section.
Warm cream (#faf9f6) background with faint blueprint-style grid lines
in very light indigo (#e0e7ff), barely visible — 5% opacity.
Floating particles: tiny glowing dots in gold (#fbbf24), lime (#c8f526),
and coral (#f97316) rising slowly upward like dust motes in sunlight.
Some particles cluster and disperse. No defined pattern — organic randomness.
Wide composition, centered. Overhead isometric angle.
Clean, minimal, calm. Professional. No faces. No text."
Output: services-bg-loop.png
```

### Kling Prompt:
```
Calm particle system animation: tiny glowing dots in gold, lime-green,
and coral-orange colors rising slowly upward through a warm cream
background from bottom to top. Particles vary in size (2-8px), speed,
and opacity (0.3-0.9). Some particles cluster briefly then disperse.
Occasionally a small group forms a loose geometric shape (triangle, line)
then dissolves back into individual particles. Background has very faint
indigo grid lines barely visible — like an architect's blueprint.
Seamless loop — particles at the top fade out and new ones appear at
the bottom continuously. No camera movement. No jarring changes.
Calm, meditative, professional. Subtle and non-distracting.
Negative prompt: no people, no text, no fast motion, no harsh colors,
no camera movement, no distortion.
Duration: 10 seconds. Aspect ratio: 16:9. FPS: 24.
```

---

## VIDEO 5 — Social Proof / Metrics Bar Background
**Duration:** 8s | **Aspect:** 16:9 | **Loop:** Yes
**Style:** Data visualization aesthetic, floating charts

### Image:
```
"Abstract data visualization background for a metrics/proof section.
Dark indigo (#1e1b4b) base — high contrast against cream site theme.
Floating mini bar charts and line graphs in lime-green (#c8f526) and
coral (#f97316) colors. Charts appear as abstract shapes — no real data,
just the visual language of growth metrics. Subtle grid pattern in
background at 10% opacity. Shapes float and rotate slowly.
Ethereal, data-driven aesthetic. Futuristic but warm.
Wide composition. No text. No faces."
Output: metrics-bg.png
```

### Kling Prompt:
```
Abstract data visualization animation: floating bar charts and rising
line graphs in vibrant lime-green (#c8f526) and coral-orange (#f97316)
colors rising and growing against a deep indigo (#1e1b4b) background.
Bars grow upward from a baseline then reset and grow again in a
staggered rhythm. A smooth line graph curves upward diagonally
across the frame repeatedly. Subtle grid lines visible in background.
All motion is slow and deliberate — a 4-second growth cycle, then reset.
Seamless loop. No camera movement. Clean data-visualization aesthetic.
Premium, modern, aspirational.
Negative prompt: no people, no text, no camera movement, no distortion.
Duration: 8 seconds. Aspect ratio: 16:9. FPS: 30.
```

---

## VIDEO 6 — Pricing / CTA Ambient Glow
**Duration:** 12s | **Aspect:** 16:9 | **Loop:** Yes
**Style:** Warm, inviting, premium SaaS

### Image:
```
"Abstract warm ambient background for a pricing CTA section.
Warm cream (#faf9f6) base. Three glowing orbs: one in indigo (#6366f1),
one in coral (#f97316), one in lime (#c8f526), all with very soft
edges — like light from frosted glass. Orbs are positioned left-center,
center, and right-center, overlapping slightly with soft blending.
Gentle radial gradient halos around each orb. Background is pure warm cream.
Dreamy, premium, soft. No hard edges. No faces. No text.
Wide composition. Centered focus."
Output: pricing-glow-bg.png
```

### Kling Prompt:
```
Slow ambient light animation: three glowing orbs — indigo (#6366f1),
coral-orange (#f97316), and lime-green (#c8f526) — slowly drifting
and breathing in a warm cream background. Each orb has a very soft
radial glow with feathered edges. Orbs drift within their own zones,
occasionally overlapping slightly and creating soft color blends.
Breathing rhythm: orbs gently expand and contract (10% size variation,
8-second cycle), offset by 4 seconds from each other.
Seamless infinite loop. No camera movement. Hypnotic but calm.
Premium SaaS aesthetic — aspirational without being distracting.
Negative prompt: no people, no text, no camera movement,
no fast motion, no hard edges, no distortion.
Duration: 12 seconds. Aspect ratio: 16:9. FPS: 24.
```

---

## VIDEO 7 — Process Timeline Abstract
**Duration:** 10s | **Aspect:** 16:9 | **Loop:** Yes
**Style:** Connected nodes, clean flow

### Image:
```
"Abstract connected node network for a process/timeline section.
Four nodes connected by thin glowing lines on a warm cream (#faf9f6) background.
Nodes are circular, each a different accent color: indigo, coral, lime, gold.
Connecting lines are thin (2px) in light indigo (#818cf8) with dashed pattern.
Each node has a small inner glow. Background: pure warm cream.
Minimal, clean, diagram-like but artistic. No text. No faces.
Isometric flat layout with slight depth. Wide 16:9 format."
Output: process-nodes.png
```

### Kling Prompt:
```
Abstract connected node network animation: four circular nodes connected
by thin glowing dashed lines. Each node pulses gently — one by one in
sequence left to right — with a lime-green (#c8f526) light pulse
traveling along the connecting line to the next node. When the pulse
reaches a node, the node glows brighter for a moment. Sequence:
Node 1 pulses → pulse travels to Node 2 → Node 2 pulses → etc.
The cycle repeats seamlessly. Between pulses, all nodes have a subtle
ambient glow. Warm cream background. Clean premium diagram aesthetic.
Seamless loop. No camera movement. Professional and clear.
Negative prompt: no people, no text, no camera movement, no distortion.
Duration: 10 seconds. Aspect ratio: 16:9. FPS: 30.
```

---

## CSS Parallax Implementation Guide

### Hero Video with Multi-Layer Parallax

```css
/* ── Hero Container ── */
.hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

/* ── Video Layer (background) ── */
.hero-video-layer {
  position: absolute;
  inset: -20%; /* extra space for parallax movement */
  z-index: 0;
  will-change: transform;
  /* Parallax: moves at 30% of scroll speed */
  transform: translateY(calc(var(--scroll, 0) * 0.3px));
}
.hero-video-layer video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── Gradient Overlay (text contrast) ── */
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(250,249,246,0.4) 0%,
    rgba(250,249,246,0.15) 50%,
    rgba(250,249,246,0.5) 100%
  );
  pointer-events: none;
}

/* ── Content Layer ── */
.hero-content {
  position: relative;
  z-index: 2;
}

/* ── Parallax: Floating shapes layer (mid, moves at 50% scroll) ── */
.hero-shapes-layer {
  position: absolute;
  inset: -30%;
  z-index: 1;
  will-change: transform;
  transform: translateY(calc(var(--scroll, 0) * 0.5px));
  pointer-events: none;
}
.hero-shapes-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

/* ── Scroll JS ── */
<script>
  const hero = document.querySelector('.hero');
  if (hero) {
    const shapesLayer = document.querySelector('.hero-shapes-layer');
    const videoLayer = document.querySelector('.hero-video-layer');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY - hero.offsetTop;
      if (scrollY > -window.innerHeight && scrollY < window.innerHeight) {
        if (videoLayer) videoLayer.style.setProperty('--scroll', scrollY);
        if (shapesLayer) shapesLayer.style.setProperty('--scroll', scrollY);
      }
    }, { passive: true });
  }
</script>

/* ── Mobile: disable parallax, show static poster ── */
@media (max-width: 768px) {
  .hero-video-layer,
  .hero-shapes-layer {
    transform: none !important;
    will-change: auto;
  }
  .hero-video-layer video {
    /* Show poster image instead on mobile */
    object-position: center;
  }
}

/* ── Reduced motion: no parallax ── */
@media (prefers-reduced-motion: reduce) {
  .hero-video-layer,
  .hero-shapes-layer {
    transform: none !important;
  }
}
```

---

## Quick Reference: All 7 Videos

| # | Video | Duration | Aspect | Loop | Key Palette | Priority |
|---|-------|----------|--------|------|------------|---------|
| 1 | Hero BG (primary) | 8s | 16:9 | ✅ | Cream + lime + gold | ⭐ P0 |
| 2 | Hero Parallax Mid | 10s | 16:9 | ✅ | Gold + indigo + white | P1 |
| 3 | Manifesto Reveal | 5s | 9:16 | 🔄 | Charcoal + lime | P1 |
| 4 | Services Particles | 10s | 16:9 | ✅ | Gold + lime + coral | P2 |
| 5 | Metrics/Social Proof | 8s | 16:9 | ✅ | Indigo + lime + coral | P2 |
| 6 | Pricing/CTA Glow | 12s | 16:9 | ✅ | Indigo + coral + lime | P2 |
| 7 | Process Nodes | 10s | 16:9 | ✅ | Indigo + gold | P3 |

---

## Technical Notes

**Fallback images:** Generate a static poster image for each video (same composition, no motion) for mobile and `prefers-reduced-motion`

**File format:** MP4 (broad support) + WebM (modern browsers, ~40% smaller)
**Compression:** Handbrake → WebM: `handbrake -i input.mp4 -o output.webm -e webm -q 5`
**Target size:** <3MB per video

**Start/End Frame Method (critical for seamless loops):**
1. Generate your base image
2. In Kling → Frames tab → upload same image as "Start Frame" AND "End Frame"
3. This guarantees the video ends exactly where it began
4. Post-process in CapCut: duplicate clip, set clip 2 to 1.5x speed, snap to end → seamless loop

---

*Compiled by Lee — Ejago Website Pipeline Phase 4*
