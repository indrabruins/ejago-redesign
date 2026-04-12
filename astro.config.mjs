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
  }
});
