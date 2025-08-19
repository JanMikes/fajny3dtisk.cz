# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Fajný 3D tisk" - a 3D printing service based in Frýdek-Místek, Czech Republic. The site is a single-page application built with vanilla HTML, CSS, and JavaScript.

## Project Structure

- `index.html` - Main HTML file containing all page content
- `styles.css` - Custom CSS styles with CSS variables for theming
- `scripts.js` - JavaScript for form validation and GLightbox gallery initialization
- `img/` - Images directory with gallery photos and team photos
- `glightbox/` - Third-party lightbox library for image gallery
- Static assets: favicons, manifest files, and SEO-related files

## Architecture

This is a static single-page website with:
- Responsive design using Bootstrap 5.3.3 (loaded from CDN)
- Font Awesome icons (loaded from CDN)
- Google Fonts (Montserrat)
- GLightbox for image gallery functionality
- Contact form that submits to StaticForms API
- Google Analytics integration

## Key Features

- Contact form with client-side validation
- Image gallery with lightbox functionality
- Responsive design optimized for mobile and desktop
- SEO optimized with proper meta tags and structured data
- Performance optimized with preloading of critical resources

## Development Notes

- No build process or package management - this is a static site
- External dependencies are loaded from CDNs
- Form submissions go to StaticForms API (external service)
- Site uses Czech language content
- Favicon and app icons are generated for multiple platforms

## File Dependencies

- Bootstrap CSS/JS is loaded from CDN
- Font Awesome icons from CDN  
- Google Fonts from CDN
- GLightbox library is included locally in `glightbox/` directory
- No npm, build tools, or package.json present

## Styling

- CSS variables defined in `:root` for consistent theming
- Color scheme: dark (#181818), orange (#ff7a00), red (#cd133b)
- Custom responsive design built on top of Bootstrap grid
- Critical CSS is inlined in HTML head for performance