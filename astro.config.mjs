// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  server: {
    host: true,
    allowedHosts: ['uninfluenced-ariyah-invalidly.ngrok-free.dev', 'localhost', '127.0.0.1'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});