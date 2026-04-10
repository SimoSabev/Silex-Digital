# Images Directory

This directory contains static images for the Silex Digital website.

## Recommended Structure

```
public/images/
├── og-image.png          # Default Open Graph image (1200x630)
├── favicon.png           # Favicon (512x512)
├── logo.svg              # Main logo
├── logo-dark.svg         # Dark mode logo
├── hero/                 # Hero section images
├── services/             # Service icons and images
├── portfolio/            # Portfolio project images
├── blog/                 # Blog post thumbnails
└── demo/                 # Demo page images
```

## Image Specifications

### Open Graph Image
- **Size**: 1200x630 pixels
- **Format**: PNG or JPG
- **Purpose**: Social media sharing preview
- **File**: `og-image.png`

### Favicon
- **Size**: 512x512 pixels (will be resized automatically)
- **Format**: PNG or SVG
- **Purpose**: Browser tab icon
- **File**: `favicon.png` (also place in `public/` root)

### Logo
- **Format**: SVG (preferred) or PNG
- **Purpose**: Site branding
- **Files**: `logo.svg`, `logo-dark.svg` (for dark mode)

## Current Setup

The project currently uses Unsplash images for most content. To use custom images:

1. Add your images to the appropriate subdirectories
2. Update image paths in your components
3. For Open Graph image, update in `src/app/layout.tsx` or individual pages

## Notes

- Images in this directory are served statically
- Use Next.js Image component for optimization
- Large images should be optimized (WebP format recommended)
- Consider using a CDN for production
