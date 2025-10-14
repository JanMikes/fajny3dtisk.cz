# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern static website for "Fajný 3D tisk" - a 3D printing service based in Frýdek-Místek, Czech Republic. The site is built with Astro and Tailwind CSS for optimal performance and SEO.

## Project Structure

```
/
├── public/              # Static assets (images, favicons, glightbox)
│   ├── img/            # Gallery and team photos
│   │   ├── gallery/    # Full-size gallery images (16 images)
│   │   └── thumbs/     # Thumbnail images for performance
│   ├── glightbox/      # Lightbox library (CSS + JS)
│   └── [favicons]      # Various favicon formats
├── src/
│   ├── components/     # Minimal reusable components
│   │   ├── Navigation.astro  # Fixed top navigation with mobile menu
│   │   └── Footer.astro      # Footer with contact info and services list
│   ├── layouts/
│   │   └── Layout.astro # Base layout with SEO, meta tags, and structured data
│   ├── pages/
│   │   └── index.astro  # Single-page app with all sections inline
│   └── styles/
│       └── global.css   # Tailwind CSS v4 with custom theme
├── astro.config.mjs     # Astro configuration with Tailwind Vite plugin
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

This is a modern static single-page application with a simplified architecture:
- **Single-page design**: All sections (hero, team, features, materials, process, gallery, FAQ, contact) are defined inline in `index.astro`
- **Minimal components**: Only Navigation and Footer are separate components for reusability
- **Tailwind CSS v4**: Custom theme with brand colors and utility classes
- **Responsive design**: Mobile-first approach with hamburger menu on small screens
- **Interactive elements**: FAQ accordion (native `<details>` elements) and contact form
- **GLightbox**: Loaded from `/public/glightbox/` for image gallery functionality
- **Google Analytics**: Integrated via gtag.js (G-VD0E3LQY17)
- **JSON-LD structured data**: LocalBusiness schema for SEO
- **Lucide Icons**: Used throughout for consistent iconography

## Key Features

### Page Sections (all in `index.astro`)
1. **Navigation** - Fixed top nav with logo, links, and mobile menu
2. **Hero** - Gradient background with animated blobs, logo, heading, and CTA button
3. **Team** (O mně) - Three cards for Michal, Sabina, and Frank with photos
4. **Why Choose Us** (Proč já) - 4-column grid with variability, speed, friendliness, consulting
5. **Materials** (Materiály) - PLA and PETG comparison cards with descriptions
6. **Process** (Proces) - 4-step process: Model/Idea → Calculation → Printing → Delivery
7. **Gallery** (Ukázky) - 16 images in responsive grid with GLightbox lightbox
8. **FAQ** - Native `<details>` accordion with 6 common questions
9. **Contact** (Kontakt) - Form (StaticForms API) + contact info cards
10. **Footer** - 3-column layout: About, Services list, Contact info

### Technical Features
- Smooth scroll navigation with anchor links
- Glass-morphism effect on cards (`glass` and `glass-white` classes)
- Hover animations and transitions
- Custom fade-in and fade-in-up animations
- Gradient backgrounds and text effects
- Mobile-responsive with hamburger menu

## Development Commands

```bash
npm install           # Install dependencies
npm run dev          # Start dev server (localhost:4321)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build
```

## Styling

- **Tailwind CSS v4** with custom theme defined in `src/styles/global.css`
- **Custom color palette**:
  - Brand Black: #181818
  - Brand Orange: #ff7a00
  - Brand Red: #cd133b
  - Brand Dark Red: #b11d1d
  - Brand Gray: #f5f5f5
- **Font**: Inter (loaded from Google Fonts)
- **Custom CSS classes**:
  - `.gradient-bg` - Hero gradient background
  - `.gradient-text` - Gradient text effect
  - `.glass` - Glass-morphism on dark backgrounds
  - `.glass-white` - Glass-morphism on light backgrounds
  - `.hover-lift` - Hover lift animation
  - `.container-custom` - Custom container with padding
  - `.section-padding` - Consistent section spacing
- **Animations**: fade-in, fade-in-up (defined in index.astro)

## Important Notes

- **Language**: Site uses Czech language content exclusively
- **Contact form**: Submits to StaticForms API (access key: sf_m7fcd4fjm9k29127jge1mia0)
- **Images**: All images and assets are in `public/` directory
  - Gallery: 16 images in `/public/img/gallery/` (01.jpg - 16.jpg)
  - Thumbnails: Optimized versions in `/public/img/thumbs/`
  - Team photos: michal.jpg, sabina.jpg, frank.jpg
- **Build output**: 100% static HTML/CSS/JS (no server required, no SSR)
- **SEO**: Optimized with meta tags, Open Graph, Twitter Cards, structured data
- **Analytics**: Google Analytics tracking ID: G-VD0E3LQY17
- **Architecture**: Simplified from component-based to single-page with inline sections for easier maintenance