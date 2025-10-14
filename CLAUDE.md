# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern static website for "Fajný 3D tisk" - a 3D printing service based in Frýdek-Místek, Czech Republic. The site is built with Astro and Tailwind CSS for optimal performance and SEO.

## Project Structure

```
/
├── public/              # Static assets (images, favicons, glightbox)
│   ├── img/            # Gallery and team photos
│   ├── glightbox/      # Lightbox library
│   └── [favicons]      # Various favicon formats
├── src/
│   ├── components/     # Astro components for each section
│   │   ├── Hero.astro
│   │   ├── Team.astro
│   │   ├── Features.astro
│   │   ├── Materials.astro
│   │   ├── Process.astro
│   │   ├── Gallery.astro
│   │   ├── FAQ.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro # Base layout with SEO
│   ├── pages/
│   │   └── index.astro  # Main page
│   └── styles/
│       └── global.css   # Tailwind CSS with custom theme
├── astro.config.mjs     # Astro configuration
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## Technology Stack

- **Astro v5.14** - Static site generator (100% SEO-friendly)
- **Tailwind CSS v4** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Lucide Icons** - Modern icon library
- **GLightbox** - Image gallery lightbox
- **StaticForms API** - Contact form submission

## Architecture

This is a modern static single-page application with:
- Component-based architecture using Astro
- Tailwind CSS with custom theme (brand colors)
- Responsive design optimized for mobile and desktop
- Interactive elements (FAQ accordion, contact form)
- GLightbox for image gallery functionality
- Google Analytics integration
- JSON-LD structured data for SEO

## Key Features

- Modern, clean UI with animations
- Hero section with gradient overlay
- Team cards with hover effects
- Features grid with backdrop blur
- Materials comparison cards
- Process timeline
- Masonry gallery grid
- Interactive FAQ accordion
- Contact form with TypeScript validation
- Multi-column footer

## Development Commands

```bash
npm install           # Install dependencies
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build
```

## Styling

- Tailwind CSS with custom theme defined in `src/styles/global.css`
- Custom color palette:
  - Brand Black: #181818
  - Brand Orange: #ff7a00
  - Brand Red: #cd133b
  - Brand Dark Red: #b11d1d
  - Brand Gray: #f5f5f5
- Font: Montserrat (loaded from Google Fonts)
- Custom animations: fade-in, fade-in-up, slide-in

## Important Notes

- Site uses Czech language content
- Contact form submits to StaticForms API (external service)
- All images and assets are in `public/` directory
- Build output is 100% static HTML/CSS/JS (no server required)
- SEO optimized with proper meta tags and structured data