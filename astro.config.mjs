// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    react({
      jsx: 'automatic',
      jsxImportSource: 'react',
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  server: {
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com https://js.stripe.com; script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://calendly.com; frame-src https://calendly.com;",
    },
  },
});
