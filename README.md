# Gharis P. Hariyono - Digital Garden

A non-linear exploration of thought, problem, and idea. This is the personal website and digital garden of Gharis Primada Hariyono, built with [Astro](https://astro.build).

## 🌟 Features

- **Mind Engraving Design**: A custom, dark-mode aesthetic focused on typography and subtle animations.
- **Content Collections**: Structured content for [Essays](/src/content/essays) and [Diary](/src/content/diary) entries.
- **Dynamic Open Graph Images**: Automatically generated social media images using `satori` and `@resvg/resvg-js` that match the site's branding.
- **SEO Optimized**: Comprehensive meta tags, sitemap generation, and `robots.txt` configuration.
- **Fast Performance**: Static site generation (SSG) for optimal loading speed.

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Content**: MDX (Markdown + JSX)
- **OG Image Generation**: Satori + Resvg
- **Deployment**: Static (ready for Vercel, Netlify, or similar)

## 🚀 Project Structure

```text
/
├── public/          # Static assets (fonts, favicon, robots.txt)
├── src/
│   ├── components/  # Reusable UI components
│   ├── content/     # MDX content (diary, essays)
│   ├── layouts/     # Page layouts (Layout.astro)
│   ├── pages/       # File-based routing
│   │   ├── diary/   # Diary listing and posts
│   │   ├── essays/  # Essay listing and posts
│   │   └── og/      # Dynamic OG image endpoints
│   └── styles/      # Global styles (Tailwind)
└── astro.config.mjs # Astro configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
