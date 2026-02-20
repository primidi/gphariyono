// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  site: 'https://gphariyono.com',
  integrations: [react(), mdx(), sitemap()],
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  }
})
