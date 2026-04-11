#!/bin/bash
set -e
cd /Users/botbruins/work/Ejago\ FInal\ Site

claude --permission-mode bypassPermissions --print 'Fix the contact form email delivery.

Read these files first:
- src/pages/api/contact.ts
- src/pages/contact.astro

SITUATION: The contact form in contact.astro submits via JS fetch to /api/contact. But /api/contact.ts just console.logs — it does not send email. Also, the site deploys to GitHub Pages which does NOT support server-side code, so /api/contact.ts will never work in production.

TASK:
1. Update src/pages/contact.astro script section to submit directly to Formspree instead of /api/contact:
   - Use Formspree AJAX approach (https://formspree.io)
   - Replace the fetch URL with: https://formspree.io/f/YOUR_FORM_ID
   - Add a clear TODO comment: "// TODO: Replace YOUR_FORM_ID with your actual Formspree form ID from https://formspree.io"

2. Update src/pages/api/contact.ts to document that it is deprecated for GitHub Pages:
   - Add a comment at the top noting it only works with SSR hosting
   - Keep the current implementation as-is for local dev

3. Also check if src/pages/index.astro needs any BudgetCalculator component added.

4. After making changes, run: npm run build && echo "BUILD SUCCESS"
   If build fails, show the error and fix it.

5. Commit with message: "fix(contact): replace /api/contact with Formspree AJAX (YOUR_FORM_ID placeholder)"
'
