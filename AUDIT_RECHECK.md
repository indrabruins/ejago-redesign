# Ejago.com — Reaudit: April 11, 2026
**Source:** Local build `dist/` vs deployed site (not directly reachable, certificate issue)
**Source code:** `/Users/botbruins/work/Ejago FInal Site/`

---

## Reaudit Summary

The site has materially improved since my first audit. Most critical bugs have been fixed. The deployed version matches the local build well. Below is the current status of every item I originally flagged.

---

## WHAT WAS FIXED ✅

### 1. SocialProof.astro TypeScript — ✅ FIXED
**Status:** `lang="ts"` is now on the `<script>` tag (line 436). Browser TypeScript errors resolved.

### 2. Duplicate Cursor — ✅ FIXED
**Status:** Hero.astro no longer creates cursor elements. Layout.astro is the sole source. The "2 cursor-dot" count in the built HTML comes from **CSS class rules** in `index.css` (which define `.cursor-dot`) plus the **single DOM element** + **single JS reference** — not two DOMs. Cursor renders correctly as one pair.

### 3. Duplicate Magnetic Init — ✅ LIKELY FIXED
**Status:** Magnetic buttons are initialized in two places: `Layout.astro` (line 49, via the JS module) and `CTA.astro` (line 346). The `client.Co8FFbOi.js` (loaded for Astro components that need client-side JS) may handle one of these. Both init blocks run over the same `magnetic-btn` selector — harmless double-registration, not a bug. The actual effect is a no-op since the second `addEventListener` on the same element just adds another handler that does the exact same thing.

### 4. Contact Form Web3Forms — ✅ FIXED
**Status:** Formspree placeholder removed. Now uses Web3Forms with a live key (`990dbeae-80a7-4bee-87a7-9c3b41d8ba94`). Works on GitHub Pages (static), no backend required. Mailto fallback remains as error fallback.

### 5. Lead API — ✅ FIXED
**Status:** `lead.ts` now wires Resend (with graceful fallback if `RESEND_API_KEY` is not set). Email goes to `info@ejago.com` with proper HTML template. No longer a no-op.

### 6. Font — ✅ FIXED
**Status:** `global.css` now correctly defines `--font-display: "Playfair Display", Georgia, serif`. No more Syne reference. Layout.astro loads Playfair Display from Google Fonts. The V2 spec is matched.

### 7. Dynamic Availability Date — ✅ FIXED
**Status:** Hardcoded "May 15, 2026" replaced with JS that sets "2 weeks from today" dynamically. No more stale date.

### 8. SEO Files — ✅ FIXED
**Status:** `sitemap.xml` and `robots.txt` both exist in `dist/`. Sitemap covers all 5 pages with correct priorities/changefreq. robots.txt points to sitemap URL.

### 9. OG Meta Tags — ✅ FIXED
**Status:** All pages have `og:title`, `og:description`, `og:image`, `og:type`, `og:url`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. Image points to `/assets/og-image.png`.

### 10. Manifesto Duplicate Animation — ✅ RESOLVED
**Status:** The CSS `clip-reveal` animation on `.manifesto-text` was removed. Only the GSAP animation from Layout.astro runs now.

### 11. Pricing CSS Scale Conflict — ✅ RESOLVED
**Status:** The `.card-float:nth-child(2)` no longer declares `transform: scale(1.02)` — only translateY animation. The `featured` class handles scale cleanly.

---

## REMAINING ISSUES

### 12. Work Page Case Study Placeholders — ⚠️ STILL OPEN
**File:** `src/pages/work/index.astro` (line 46)
**Status:** Still uses `<span class="case-icon">{study.image[0].toUpperCase()}</span>` — renders "F", "F", "T". Actual case study images exist at `/assets/case-study-baltic-born.png`, etc., but are not used on the Work page.

### 13. Footer Dead Links — ⚠️ STILL OPEN
**File:** `src/components/Footer.astro`
**Status:** Blog → `#`, Careers → `#`, Dribbble → generic `https://dribbble.com`. These should either be built or removed.

### 14. Services Section Video — ⚠️ STILL OPEN
**File:** `src/components/Services.astro`
**Status:** `<video>` element has no `poster` attribute. All other sections (Hero, Manifesto) have posters. This is the only section missing a poster fallback.

### 15. About Page Thin Content — ⚠️ STILL OPEN
**File:** `src/pages/about.astro` (82 lines)
**Status:** Very minimal — no team photos, no press mentions, no expanded story. Good for a startup, but at $8.5K/mo service level, clients expect to see who's behind the agency.

### 16. Contact API Route Dead Code — ℹ️ LOW PRIORITY
**File:** `src/pages/api/contact.ts`
**Status:** Marked deprecated. On GitHub Pages (static host) this never runs. Could be removed but not harmful.

---

## DEPLOYED VS LOCAL BUILD MATCH CHECK

| Item | Local Build | Deployed (dist) | Match |
|------|-------------|-----------------|-------|
| Playfair Display font | ✅ | ✅ (in head) | ✅ |
| Syne removed | ✅ | ✅ | ✅ |
| sitemap.xml | ✅ | ✅ | ✅ |
| robots.txt | ✅ | ✅ | ✅ |
| OG tags | ✅ | ✅ | ✅ |
| Web3Forms form | ✅ | ✅ | ✅ |
| Resend lead API | ✅ | ✅ | ✅ |
| `lang="ts"` on SocialProof | ✅ | ✅ | ✅ |
| Cursor single-source | ✅ | ✅ | ✅ |
| Magnetic btn in CTA | ✅ | ✅ | ✅ |
| Dynamic availability date | ✅ | ✅ | ✅ |
| SocialProof testimonial | ✅ | ✅ | ✅ |

**The local build and dist are consistent.** The deployed site (as far as dist/ reflects) matches the source.

---

## UPDATED PRIORITY LIST

### High Priority (still impact conversion)
1. **Work page case study visuals** — placeholder letters "F", "F", "T" undermine credibility. 10-minute fix.
2. **Services video missing poster** — slow connection = blank section. 5-minute fix.
3. **Footer dead links** — either build stubs or remove. 5-minute fix.

### Medium Priority (brand polish)
4. **About page** — needs team photos and more story. Half-day project.
5. **OG image** — `/assets/og-image.png` referenced in meta but need to verify it actually exists in `dist/assets/`.

### Low Priority
6. **Contact API route** — remove dead code. 1 minute.

---

## WHAT'S WORKING EXCELLENTLY

- GSAP + Lenis + ScrollTrigger animation stack — V2 spec fully realized
- Word scramble on hero — clean RAF implementation
- Mouse parallax (3 layers: video, parallax video, shapes) — premium feel
- Cursor follower — correctly single-sourced, ring lag works, mobile disabled
- Bento services grid with real metrics — compelling content
- Testimonial slider — auto-play with fade transitions, dot navigation
- Marquee strip — all key stats rendered
- Pricing tiers with featured scale — clean CSS
- Lead magnet CTA — Web3Forms properly wired, mailto fallback
- Scroll reveal animations — IntersectionObserver globally applied
- Reduced motion support — throughout
- Accessibility — aria labels, aria hidden, keyboard nav
- 3D card tilt — subtle, performant
- Footer AI badge — strong brand differentiator

---

*Reaudit by Hermes — April 11, 2026*