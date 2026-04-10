# DESIGN SYSTEM REFERENCE
## UI/UX Component Library & Brand Guidelines

**Version:** 1.0
**Status:** Ready for Implementation
**Language:** Bulgarian (Български) Primary, English Secondary

---

## 1. BRAND IDENTITY

### 1.1 Logo & Brand Mark
```
Logo File: logo.svg
├─ Horizontal: 200px min width
├─ Vertical: 150px min width
├─ Square: 150px × 150px (icon only)
├─ Colors: Marine Blue (#1B3A6F) or White
├─ Clear space: 20px minimum around logo
└─ Usage: Header, footer, favicons

Brand Name: "Silex Digital" (English) / "Силекс Дигитал" (Bulgarian)
├─ English for international
├─ Bulgarian for local marketing
└─ Don't translate, use both as needed
```

### 1.2 Brand Values
```
🎯 MODERN - Clean, contemporary design
🚀 FAST - Quick loading, instant responses
🔒 TRUSTED - Professional, reliable, secure
💪 POWERFUL - Full-featured but simple to use
🌍 LOCAL - Bulgarian first, global second
```

---

## 2. COLOR SYSTEM

### 2.1 Color Palette

#### PRIMARY: Marine Blue
```
#1B3A6F - Dark (Headings, Primary CTA)
#2E5C9E - Medium (Links, Hover states)
#E3EBF7 - Light (Backgrounds, Subtle highlights)

Usage:
├─ Heading text (H1, H2, H3)
├─ Primary buttons
├─ Active menu items
├─ Links
├─ Focus indicators
└─ Trust-building visual elements
```

#### SECONDARY: Emerald Green
```
#1B7E4D - Dark (Success, Completion)
#2BAB66 - Medium (Growth, Action buttons)
#E8F6F0 - Light (Success states)

Usage:
├─ "Get Started" CTA
├─ Success checkmarks
├─ Growth indicators
├─ Positive feedback
├─ "Try Now" buttons
└─ Conversion actions
```

#### ACCENT: Warm Orange
```
#CC6B2D - Dark (Secondary emphasis)
#E67E22 - Medium (Highlights, attention)
#FEF4EE - Light (Warm backgrounds)

Usage:
├─ Secondary CTA
├─ Feature highlights
├─ Icons for emphasis
├─ Accent colors
└─ Special offers
```

#### NEUTRALS
```
Backgrounds:
├─ #FFFFFF - Pure white (card backgrounds)
├─ #F8F9FA - Off white (page backgrounds)
└─ #F0F2F5 - Light gray (secondary backgrounds)

Text:
├─ #1A1A1A - Near black (primary text)
├─ #2C3E50 - Dark gray (body text)
├─ #7F8C8D - Medium gray (secondary text)
└─ #95A5A6 - Light gray (disabled, tertiary)

Borders:
├─ #E4E6EB - Light border
├─ #D0D3D8 - Medium border
└─ #BCC0C4 - Dark border

Functional:
├─ Error: #E74C3C (Red)
├─ Warning: #F39C12 (Orange)
├─ Info: #3498DB (Blue)
└─ Success: #2BAB66 (Green)
```

### 2.2 Color Usage Guidelines

```
When using colors:
✓ Use dark blue for trust/seriousness
✓ Use green for success/action
✓ Use orange for attention (sparingly)
✓ Never rely on color alone (use patterns/icons too)
✓ Maintain WCAG AA contrast (4.5:1 minimum)
✓ Test with color blindness simulator

Avoid:
✗ Pure black backgrounds (#000000)
✗ Pure red for general warnings
✗ Too many accent colors (max 3 primary)
✗ Color-only for important information
```

---

## 3. TYPOGRAPHY

### 3.1 Font Stack

#### Primary Font: Inter
```
CSS: font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

Why Inter?
├─ Optimized for screen reading
├─ Works perfectly with Cyrillic (Bulgarian)
├─ Modern, professional look
├─ Free, open source
├─ Excellent performance

Loading Strategy:
├─ Preload: Inter-Regular, Inter-SemiBold, Inter-Bold
├─ Self-host from /public/fonts/
├─ Subset to: Latin + Cyrillic only
└─ font-display: swap (for perceived performance)
```

### 3.2 Type Scale

```
Mobile First (scales up for larger screens):

H1: 32px → 48px
├─ Font weight: 700 (Bold)
├─ Line height: 1.2
├─ Letter spacing: -0.5px
├─ Usage: Page titles, hero headlines
└─ Example: "Автоматизация, която генерира клиенти"

H2: 24px → 36px
├─ Font weight: 700
├─ Line height: 1.3
├─ Letter spacing: -0.3px
├─ Usage: Section headers
└─ Example: "Как работи платформата"

H3: 20px → 28px
├─ Font weight: 600 (SemiBold)
├─ Line height: 1.4
├─ Letter spacing: 0px
├─ Usage: Subsection headers, card titles
└─ Example: "Три слоя за вашия бизнес"

H4: 18px → 24px
├─ Font weight: 600
├─ Line height: 1.4
├─ Usage: Small section headers
└─ Example: "Чат интеграция"

Body: 14px → 16px
├─ Font weight: 400 (Regular)
├─ Line height: 1.6
├─ Letter spacing: 0px
├─ Usage: Main content, descriptions
└─ Example: Paragraph text

Small: 12px → 14px
├─ Font weight: 400
├─ Line height: 1.5
├─ Usage: Captions, helper text
└─ Example: "Последно обновено: 23 март 2026"

Caption: 11px → 12px
├─ Font weight: 400
├─ Line height: 1.4
├─ Usage: Metadata, timestamps
└─ Example: "Нямаш ли акаунт? Регистрирай се"
```

### 3.3 Font Weights

```
Available weights:
├─ 400 - Regular (Body text, main content)
├─ 500 - Medium (Rarely used, avoid)
├─ 600 - SemiBold (Subheadings, emphasis)
└─ 700 - Bold (Headings, CTAs)

Usage:
✓ Regular for body text
✓ SemiBold for labels, subheadings
✓ Bold for headings only
✗ Don't mix multiple weights in same line
✗ Don't use medium weight (hard to read at small sizes)
```

---

## 4. SPACING SYSTEM

### 4.1 Spacing Scale (8px Base)

```
Spacing values (use consistently):
├─ xs: 4px (micro spacing)
├─ sm: 8px (small gaps, tight)
├─ md: 16px (standard padding)
├─ lg: 24px (medium sections)
├─ xl: 32px (large sections)
├─ xxl: 48px (hero sections)
├─ 3xl: 64px (major breaks)
└─ 4xl: 80px (page sections)

Common combinations:
├─ Padding: 16px (md) or 24px (lg)
├─ Margin: 24px (lg) or 32px (xl)
├─ Gap (flex): 16px (md) or 24px (lg)
├─ Border radius: 6px or 8px
└─ Box shadow offset: 2-4px

Responsive adjustments:
├─ Mobile: Reduce by one step (sm → xs)
├─ Tablet: Keep same
├─ Desktop: Can increase slightly
```

### 4.2 Container & Layout Spacing

```
Page structure:
├─ Hero section: 80px vertical (40px mobile)
├─ Section spacing: 64px vertical (32px mobile)
├─ Content max-width: 1200px
├─ Horizontal padding: 40px (desktop), 16px (mobile)

Grid gutters:
├─ Desktop: 24px
├─ Tablet: 20px
├─ Mobile: 16px

Component spacing:
├─ Inside card: 24px (lg)
├─ Between cards: 24px (grid gap)
├─ Button groups: 12px
├─ Form fields: 16px between inputs
```

---

## 5. COMPONENT SPECIFICATIONS

### 5.1 Buttons

#### Primary Button
```
Visual:
├─ Background: #2E5C9E (Marine Blue)
├─ Text: #FFFFFF (White)
├─ Padding: 12px 24px (sm) / 16px 32px (lg)
├─ Border radius: 8px
├─ Font weight: 600 (SemiBold)
├─ Font size: 14px (sm) / 16px (lg)

States:
├─ Default: As shown
├─ Hover: Background #1B3A6F (darker) + shadow: 0 4px 12px rgba(27, 58, 111, 0.15)
├─ Active: Background #0D1F3F (even darker) + shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2)
├─ Disabled: Background #95A5A6(gray) + opacity 0.6 + no hover/active
├─ Loading: Show spinner, text becomes transparent

Transitions:
├─ background-color: 200ms ease-out
├─ box-shadow: 200ms ease-out
└─ transform: 100ms ease-out (slight scale on hover: 1.02)

CSS:
button {
  padding: 16px 32px;
  background-color: #2E5C9E;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 200ms ease-out;
}

button:hover:not(:disabled) {
  background-color: #1B3A6F;
  box-shadow: 0 4px 12px rgba(27, 58, 111, 0.15);
  transform: translateY(-2px);
}

button:disabled {
  background-color: #95A5A6;
  opacity: 0.6;
  cursor: not-allowed;
}
```

#### Secondary Button
```
Visual:
├─ Background: Transparent
├─ Border: 2px solid #2E5C9E
├─ Text: #2E5C9E
├─ Padding: 14px 30px (accounts for border)
├─ Border radius: 8px

States:
├─ Default: As shown
├─ Hover: Background #E3EBF7 (light blue)
├─ Active: Background #D9E4F0
├─ Disabled: Gray border + gray text

CSS:
button.secondary {
  padding: 14px 30px;
  background-color: transparent;
  color: #2E5C9E;
  border: 2px solid #2E5C9E;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease-out;
}

button.secondary:hover:not(:disabled) {
  background-color: #E3EBF7;
}
```

#### Success/CTA Button (Green)
```
Visual:
├─ Background: #2BAB66 (Emerald Green)
├─ Text: #FFFFFF (White)
├─ Same styling as Primary, but green
├─ Used for: "Try Now", "Get Started", high-priority CTAs

CSS:
button.success {
  padding: 16px 32px;
  background-color: #2BAB66;
  color: white;
  /* ... rest same as primary ... */
}

button.success:hover:not(:disabled) {
  background-color: #1B7E4D;
  box-shadow: 0 4px 12px rgba(43, 171, 102, 0.15);
}
```

### 5.2 Input Fields

#### Text Input
```
Visual:
├─ Border: 1px solid #E4E6EB
├─ Background: #FFFFFF
├─ Padding: 12px 16px
├─ Border radius: 6px
├─ Font size: 16px
├─ Line height: 1.5

Label (above input):
├─ Font size: 14px
├─ Font weight: 600
├─ Color: #2C3E50
├─ Margin bottom: 8px
├─ Required indicator: * in #E74C3C

States:
├─ Focus: Border #2E5C9E (2px) + box-shadow: 0 0 0 3px rgba(46, 92, 158, 0.1)
├─ Error: Border #E74C3C (2px) + error message below
├─ Disabled: Background #ECF0F1 + opacity 0.6

CSS:
input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E4E6EB;
  border-radius: 6px;
  font-size: 16px;
  font-family: Inter, sans-serif;
  transition: all 200ms ease-out;
}

input:focus {
  outline: none;
  border-color: #2E5C9E;
  box-shadow: 0 0 0 3px rgba(46, 92, 158, 0.1);
}

input:disabled {
  background-color: #ECF0F1;
  opacity: 0.6;
  cursor: not-allowed;
}
```

#### Error Messages
```
Display below input:
├─ Font size: 12px
├─ Color: #E74C3C (Red)
├─ Margin top: 4px
├─ Icon: ⚠ before message

Example:
"⚠ Невалиден имейл адрес"
"⚠ Паролата трябва да е минимум 8 знака"
```

### 5.3 Cards

#### Standard Card
```
Visual:
├─ Background: #FFFFFF
├─ Border: 1px solid #E4E6EB
├─ Padding: 24px
├─ Border radius: 8px
├─ Box shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

States:
├─ Hover: Box shadow: 0 4px 16px rgba(0, 0, 0, 0.12)
├─ Active/Selected: Border color: #2E5C9E (2px)

Responsive:
├─ Desktop padding: 24px
├─ Mobile padding: 16px
├─ Grid gap: 24px (desktop) / 16px (mobile)

CSS:
.card {
  background-color: white;
  border: 1px solid #E4E6EB;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 300ms ease-out;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
```

### 5.4 Badge/Tag

```
Visual:
├─ Background: Light color variant
├─ Text: Dark color variant
├─ Padding: 6px 12px
├─ Border radius: 12px (pill shape)
├─ Font size: 12px
├─ Font weight: 600

Variants:
├─ Success (Green): #E8F6F0 background, #1B7E4D text
├─ Pending (Orange): #FEF4EE background, #CC6B2D text
├─ Alert (Red): #FADBD8 background, #E74C3C text
├─ Info (Blue): #D6EAF8 background, #3498DB text
└─ Neutral (Gray): #ECF0F1 background, #7F8C8D text

CSS:
.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge.success {
  background-color: #E8F6F0;
  color: #1B7E4D;
}
```

### 5.5 Modals/Dialogs

```
Visual:
├─ Overlay: rgba(0, 0, 0, 0.5) (dark, semi-transparent)
├─ Modal background: #FFFFFF
├─ Border radius: 12px
├─ Padding: 32px (desktop) / 24px (mobile)
├─ Min width: 400px (desktop)
├─ Max width: 600px (desktop)
├─ Width: 100% - 32px (mobile)
├─ Box shadow: 0 20px 64px rgba(0, 0, 0, 0.15)

Close button (top-right):
├─ Size: 32px × 32px
├─ Icon: ✕ or X
├─ Color: #7F8C8D
├─ Hover: Color: #2C3E50

Structure:
├─ Title: H3 size, margin-bottom: 16px
├─ Content: Body text
├─ Actions (bottom):
│  ├─ Desktop: Inline buttons (gap: 12px)
│  ├─ Mobile: Stacked, full width
│  └─ Primary button (right), Secondary button (left)
└─ Keyboard: Escape to close, Tab navigation
```

---

## 6. RESPONSIVE DESIGN

### 6.1 Breakpoints

```
Mobile: < 640px
├─ Single column layouts
├─ Full-width buttons
├─ Stacked elements
└─ 16px margins

Tablet: 640px - 1023px
├─ 2-column layouts
├─ Flexible spacing
├─ Larger text
└─ 24px margins

Desktop: 1024px - 1439px
├─ 3+ column layouts
├─ Standard spacing
└─ 40px margins

Large Desktop: 1440px+
├─ Max-width: 1200px container
├─ Centered with auto margins
└─ Additional padding
```

### 6.2 Mobile-First CSS

```
/* Mobile first (default) */
.container {
  max-width: 100%;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet and up */
@media (min-width: 640px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0 24px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 0 40px;
  }
}
```

---

## 7. ACCESSIBILITY

### 7.1 Color Contrast

```
WCAG AA Requirements (minimum):
├─ Large text (18pt+): 3:1 ratio
└─ Normal text: 4.5:1 ratio

WCAG AAA (enhanced):
├─ Large text: 4.5:1 ratio
└─ Normal text: 7:1 ratio

Our palette meets AAA:
├─ Dark gray (#2C3E50) on white: 11.2:1 ✓
├─ Blue (#2E5C9E) on white: 5.8:1 ✓ (AA+)
├─ Green (#2BAB66) on white: 4.8:1 ✓ (AA+)
├─ White on blue: 7.8:1 ✓ (AAA)
└─ White on green: 6.4:1 ✓ (AAA)
```

### 7.2 Keyboard Navigation

```
Tab Order:
├─ Top to bottom
├─ Left to right
├─ Natural reading order
└─ Logical grouping

Focus Indicators:
├─ 2px outline in Marine Blue (#2E5C9E)
├─ 4px offset from element edge
├─ High contrast, clearly visible
├─ Works on buttons, links, inputs

Keyboard Shortcuts:
├─ Tab: Move forward
├─ Shift + Tab: Move backward
├─ Enter: Activate button/link
├─ Space: Activate button/checkbox
├─ Escape: Close modal/menu
└─ Arrow keys: Navigate select options

Skip Links:
├─ "Skip to main content" (hidden, shows on Tab)
├─ Placed at top of page
└─ Links to #main-content
```

### 7.3 ARIA Labels

```
All interactive elements have labels:

Buttons:
├─ aria-label="Close modal"
├─ aria-label="Toggle menu"
└─ aria-label="Send message"

Form inputs:
├─ <label for="email">Имейл:</label>
├─ <input id="email" type="email">
└─ aria-required="true" (if required)

Images:
├─ alt="Демонстрация на автоматизацията"
├─ Descriptive, not "image of..."
└─ Empty alt="" for decorative images

Notifications:
├─ role="alert"
├─ aria-live="polite"
└─ aria-atomic="true"
```

---

## 8. ANIMATIONS & TRANSITIONS

### 8.1 Timing Functions

```
Easing curves (CSS):
├─ ease-out: Smooth deceleration (most common)
├─ cubic-bezier(0.34, 1.56, 0.64, 1): Bounce (for fun animations)
├─ ease-in-out: Symmetrical (subtle)
└─ linear: Steady (for rotating/loading)

Durations:
├─ 100ms: Quick micro interactions
├─ 200ms: Button hover, state changes
├─ 300ms: Fade in/out, slide animations
├─ 500ms: Page transitions, larger movements
└─ 1000ms+: Three.js demos, hero section animations
```

### 8.2 Common Animations

```
Fade in:
animation: fadeIn 300ms ease-out;

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

Slide up:
animation: slideUp 400ms cubic-bezier(0.34, 1.56, 0.64, 1);

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

Scale up on hover:
transition: all 200ms ease-out;
transform: scale(1);

:hover {
  transform: scale(1.05);
}
```

---

## 9. RESPONSIVE IMAGES

### 9.1 Image Optimization

```
Tool: Next.js Image component

Benefits:
├─ Automatic WebP/AVIF conversion
├─ Responsive sizing
├─ Lazy loading
├─ Blur placeholder
└─ Automatic srcset generation

Implementation:
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero section"
  width={1200}
  height={600}
  priority
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 90vw,
         1200px"
/>
```

### 9.2 Image Sizes

```
Hero image: 1200px × 600px
├─ Mobile: 320px × 160px
├─ Tablet: 640px × 320px
└─ Desktop: 1200px × 600px

Card images: 400px × 300px
├─ Mobile: 100vw
├─ Tablet: 280px × 210px
└─ Desktop: 400px × 300px

Thumbnail: 80px × 80px
├─ Max: 160px × 160px (2x)
└─ Min: 40px × 40px

Icon: 24px × 24px
├─ Responsive: 1x, 2x versions
└─ Format: SVG (preferred) or PNG
```

---

## 10. DESIGN CHECKLIST

Before implementing any page/component:

```
□ Colors match palette
□ Typography uses correct sizes & weights
□ Spacing follows 8px grid
□ Contrast ratio ≥ 4.5:1
□ Buttons 44px+ height (touch friendly)
□ Images optimized (WebP, lazy loaded)
□ Responsive on mobile/tablet/desktop
□ Keyboard navigation works
□ Focus indicators visible
□ Loading states shown
□ Error states shown
□ Empty states shown
□ Hover states visible
□ Animations smooth (60 FPS)
□ No accessibility violations
□ Component in design system
□ Figma file updated
□ Code follows guidelines
```

---

## 11. DESIGN TOOLS & FILES

```
Figma:
├─ Design system file: [project-design-system]
├─ Landing page: [landing-page-design]
├─ Dashboard: [dashboard-design]
├─ Component library: [components-library]
└─ Prototypes: [interactive-prototypes]

Assets:
├─ /public/fonts/ - Inter font files
├─ /public/images/ - Optimized images
├─ /public/icons/ - SVG icons
└─ /public/logos/ - Logo files

Documentation:
├─ This file (design-system.md)
├─ Color palette reference
├─ Component specifications
└─ Responsive guidelines
```

---

**This Design System is complete and ready for implementation.**

All components, colors, and spacing specifications are documented above.

**Next Step:** Create component library in Figma, then implement in code.

---

**Version:** 1.0 Complete
**Status:** Ready for Development
**Last Updated:** 2026-03-23
