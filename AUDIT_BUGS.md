# Ejago.com — Critical Bugs Quick Reference
**For: Dev who needs to fix fast**

---

## Bug 1 — TypeScript in Browser Script
**File:** `src/components/SocialProof.astro`
**Line:** ~436
**Fix:** Change `<script>` → `<script lang="ts">`

---

## Bug 2 — Duplicate Cursor
**File:** `src/components/Hero.astro`
**Lines:** 403–431 (entire IIFE block)
**Fix:** Delete the block. Layout.astro handles cursor globally.

---

## Bug 3 — Duplicate Magnetic Init
**File:** `src/components/Hero.astro`
**Lines:** 433–442
**Fix:** Delete. Layout.astro handles this globally.

---

## Bug 4 — Dead Formspree URL
**File:** `src/pages/contact.astro`
**Line:** ~120
**Fix:** Replace `YOUR_FORM_ID` with real Web3Forms key or strip and use mailto only.

---

## Bug 5 — Lead API Does Nothing
**File:** `src/pages/api/lead.ts`
**Fix:** Wire Resend API key to actually send emails to info@ejago.com.

---

## Bug 6 — Font Mismatch
**File:** `src/styles/global.css`
**Line:** ~20
**Fix:** `--font-display: "Syne", sans-serif` → `--font-display: "Playfair Display", Georgia, serif`

---

## Bug 7 — Work Page Placeholders
**File:** `src/pages/work/index.astro`
**Line:** ~46
**Fix:** Replace `<span class="case-icon">{study.image[0].toUpperCase()}</span>` with actual `<img src="/assets/case-study-*.png" />` tags.

---

*Hermes | April 11, 2026*
