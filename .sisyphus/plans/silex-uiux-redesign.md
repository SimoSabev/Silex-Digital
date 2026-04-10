# Silex Digital — Complete UI/UX Redesign Specification

## Design Philosophy

### The Vision

Transform Silex Digital from a generic dark agency template into a **bold, energetic, unforgettable brand experience** that makes Bulgarian micro business owners feel excitement, not boredom. Every pixel should communicate: _"We're different. We're fast. We'll grow your business."_

### Design Inspiration

- **Gumroad**: Bold colors, oversized typography, asymmetric layouts, personality
- **Linear**: Purposeful animations, refined interactions, premium feel
- **Stripe**: Clean information hierarchy, trust-building design
- **Framer**: Creative layouts that break the grid, scroll-driven storytelling

### Core Principles

1. **Bold over safe** — If it feels comfortable, it's not bold enough
2. **Purposeful motion** — Every animation guides attention or confirms action
3. **Hierarchy through contrast** — Size, weight, and color create clear reading paths
4. **Light first, dark optional** — Light theme default (professional, accessible), dark mode for preference
5. **Every section is unique** — No two sections should look the same

---

## Design System

### Color Palette

#### Light Theme (Default)

| Token                    | Value                            | Usage                                                 |
| ------------------------ | -------------------------------- | ----------------------------------------------------- |
| `--bg-primary`           | `#FAFAF9`                        | Page background — warm white, not sterile             |
| `--bg-secondary`         | `#F5F5F4`                        | Section backgrounds — subtle warmth                   |
| `--bg-elevated`          | `#FFFFFF`                        | Cards, modals — pure white for elevation              |
| `--text-primary`         | `#0A0A0A`                        | Headlines, body — near-black for maximum contrast     |
| `--text-secondary`       | `#57534E`                        | Subtitles, descriptions — warm gray                   |
| `--text-muted`           | `#A8A29E`                        | Labels, placeholders — soft warm gray                 |
| `--accent-primary`       | `#7C3AED`                        | Electric violet — brand color, links, primary actions |
| `--accent-primary-hover` | `#6D28D9`                        | Violet hover state                                    |
| `--accent-cta`           | `#FF4D4D`                        | Hot coral — ONLY for primary CTAs, creates urgency    |
| `--accent-cta-hover`     | `#E63946`                        | Coral hover state                                     |
| `--accent-success`       | `#65A30D`                        | Lime green — success metrics, positive indicators     |
| `--accent-warning`       | `#F59E0B`                        | Amber — warnings, attention without alarm             |
| `--border-light`         | `#E7E5E4`                        | Card borders, dividers                                |
| `--border-hover`         | `#D6D3D1`                        | Hover state borders                                   |
| `--shadow-sm`            | `0 1px 2px rgba(0,0,0,0.05)`     | Subtle elevation                                      |
| `--shadow-md`            | `0 4px 12px rgba(0,0,0,0.08)`    | Card default                                          |
| `--shadow-lg`            | `0 12px 40px rgba(0,0,0,0.12)`   | Card hover, modals                                    |
| `--shadow-glow-violet`   | `0 0 60px rgba(124,58,237,0.15)` | Hero glow effects                                     |
| `--shadow-glow-coral`    | `0 0 40px rgba(255,77,77,0.2)`   | CTA glow effects                                      |

#### Dark Theme

| Token                    | Value     | Usage                                            |
| ------------------------ | --------- | ------------------------------------------------ |
| `--bg-primary`           | `#0A0A0A` | Page background — deep charcoal, not blue-tinted |
| `--bg-secondary`         | `#141414` | Section backgrounds — barely lighter             |
| `--bg-elevated`          | `#1C1C1C` | Cards, modals — subtle elevation                 |
| `--text-primary`         | `#FAFAF9` | Headlines, body — warm white                     |
| `--text-secondary`       | `#A8A29E` | Subtitles, descriptions — warm gray              |
| `--text-muted`           | `#78716C` | Labels, placeholders — muted warm gray           |
| `--accent-primary`       | `#8B5CF6` | Electric violet (brighter for dark bg)           |
| `--accent-primary-hover` | `#A78BFA` | Violet hover state                               |
| `--accent-cta`           | `#FF6B6B` | Hot coral (brighter for dark bg)                 |
| `--accent-cta-hover`     | `#FF8787` | Coral hover state                                |
| `--accent-success`       | `#84CC16` | Lime green (brighter for dark bg)                |
| `--border-light`         | `#292524` | Card borders, dividers                           |
| `--border-hover`         | `#44403C` | Hover state borders                              |

#### Gradient System

| Gradient           | Colors                                         | Usage                                      |
| ------------------ | ---------------------------------------------- | ------------------------------------------ |
| `gradient-hero`    | `#7C3AED → #FF4D4D`                            | Hero headline text, hero background shapes |
| `gradient-metrics` | `#65A30D → #7C3AED`                            | Metric numbers, progress indicators        |
| `gradient-cta`     | `#FF4D4D → #F59E0B`                            | Primary CTA buttons                        |
| `gradient-card`    | `#7C3AED → #8B5CF6`                            | Featured card backgrounds                  |
| `gradient-subtle`  | `rgba(124,58,237,0.05) → rgba(255,77,77,0.05)` | Section background tints                   |

### Typography

#### Font Stack

```css
/* Headlines — Bold, geometric, modern */
--font-display: "Space Grotesk", system-ui, sans-serif;
/* Available via Google Fonts, supports Cyrillic, free */

/* Body — Clean, readable, professional */
--font-body: "Inter", system-ui, sans-serif;
/* Already in use, excellent Cyrillic support */

/* Numbers/Metrics — Technical, tabular */
--font-mono: "JetBrains Mono", monospace;
/* Already in use, great for data display */
```

#### Type Scale (Light Theme)

| Level   | Size    | Weight | Line Height | Letter Spacing | Usage                         |
| ------- | ------- | ------ | ----------- | -------------- | ----------------------------- |
| Hero    | 72-96px | 800    | 1.0         | -0.03em        | Homepage hero headline        |
| H1      | 48-56px | 700    | 1.1         | -0.02em        | Page titles                   |
| H2      | 36-40px | 700    | 1.2         | -0.01em        | Section titles                |
| H3      | 24-28px | 600    | 1.3         | 0              | Card titles, subsections      |
| H4      | 20px    | 600    | 1.4         | 0              | Small titles                  |
| Body LG | 18px    | 400    | 1.7         | 0              | Lead paragraphs, descriptions |
| Body    | 16px    | 400    | 1.6         | 0              | Default body text             |
| Body SM | 14px    | 400    | 1.5         | 0.01em         | Captions, labels              |
| Caption | 12px    | 500    | 1.4         | 0.05em         | Badges, tags, timestamps      |
| Metric  | 48-64px | 700    | 1.0         | -0.02em        | Dashboard numbers, stats      |

**Font: Space Grotesk**

- Why: Geometric, bold, modern — creates instant visual distinction from the body text
- Cyrillic: Full support
- Weight range: 300-700 (use 700 for headlines)
- Character: Slightly quirky, energetic — matches the brand personality

#### Typography Rules

1. **Never use the same font for headlines and body** — the contrast is what creates hierarchy
2. **Headlines should feel almost too big** — if it feels slightly oversized, it's probably right
3. **Use negative letter-spacing on large text** (-0.02em to -0.03em) for tighter, more premium feel
4. **Body text should breathe** — 1.6-1.7 line height, never below 1.5
5. **Numbers should use monospace** — tabular alignment makes metrics scannable

### Spacing System

```css
/* Base unit: 4px */
--space-1: 4px; /* Tight spacing, icon gaps */
--space-2: 8px; /* Small gaps, inline elements */
--space-3: 12px; /* Component internal padding */
--space-4: 16px; /* Standard padding */
--space-5: 20px; /* Medium padding */
--space-6: 24px; /* Card padding */
--space-8: 32px; /* Section internal spacing */
--space-10: 40px; /* Large component gaps */
--space-12: 48px; /* Section gaps (mobile) */
--space-16: 64px; /* Section gaps (tablet) */
--space-20: 80px; /* Section gaps (desktop) */
--space-24: 96px; /* Major section gaps */
--space-32: 128px; /* Hero to first section gap */
```

**Section Spacing Rules:**

- Between major sections: 120-160px (desktop), 80-96px (mobile)
- Within sections: 48-64px between elements
- Card internal padding: 32-40px
- Never use arbitrary spacing values — always snap to the scale

### Layout System

#### Container

```css
--container-max: 1200px; /* Max content width */
--container-padding: 24px; /* Side padding (mobile) */
--container-padding-lg: 40px; /* Side padding (desktop) */
```

#### Grid System

- **Default**: 12-column grid with 24px gaps
- **Asymmetric**: 7/5 or 8/4 splits for visual interest
- **Card grids**: 3 columns (desktop), 2 (tablet), 1 (mobile)
- **Break the grid**: Overlap elements, use negative margins for dynamic layouts

#### Border Radius

```css
--radius-sm: 8px; /* Buttons, inputs, badges */
--radius-md: 12px; /* Small cards */
--radius-lg: 16px; /* Standard cards */
--radius-xl: 24px; /* Feature cards, hero elements */
--radius-2xl: 32px; /* Large containers, modals */
--radius-full: 9999px; /* Pills, avatars */
```

---

## Component Design Specifications

### Buttons

#### Primary CTA (Hot Coral)

```
Background: #FF4D4D
Hover: #E63946 + shadow-glow-coral
Text: White, 600 weight
Padding: 16px 32px (lg), 12px 24px (md), 8px 16px (sm)
Border radius: 12px
Font: Space Grotesk, 600 weight
Transition: All 200ms ease
Hover effect: Scale 1.02, shadow increase, slight upward movement (-2px)
Active effect: Scale 0.98 (press-down feel)
```

**Why coral for CTAs**: Coral is the most attention-grabbing color on a light background. It creates urgency without the aggression of red. Every primary action should use coral — it trains users to recognize "this is what I click."

#### Secondary Button (Violet Outline)

```
Background: Transparent
Border: 2px solid #7C3AED
Text: #7C3AED, 600 weight
Hover: Background #7C3AED, text white
Border radius: 12px
Same padding scale as primary
```

#### Ghost Button

```
Background: Transparent
Text: #57534E, 500 weight
Hover: Background rgba(124,58,237,0.08), text #7C3AED
Border radius: 12px
```

### Cards

#### Standard Card

```
Background: #FFFFFF
Border: 1px solid #E7E5E4
Border radius: 16px
Padding: 32px
Shadow: shadow-md
Hover: Shadow-lg, border-color #D6D3D1, translateY(-4px)
Transition: All 300ms cubic-bezier(0.4, 0, 0.2, 1)
```

#### Featured Card (Elevated)

```
Background: Linear gradient (subtle violet tint)
Border: 2px solid rgba(124,58,237,0.2)
Border radius: 24px
Padding: 40px
Shadow: shadow-lg + shadow-glow-violet
Scale: 1.02 (slightly larger than surrounding cards)
Position: Relative, z-index above surrounding
```

#### Glass Card (Dark Theme Only)

```
Background: rgba(28,28,28,0.8)
Backdrop filter: blur(20px)
Border: 1px solid rgba(255,255,255,0.08)
Border radius: 16px
```

### Forms

#### Input Fields

```
Background: #FFFFFF
Border: 2px solid #E7E5E4
Border radius: 12px
Padding: 14px 16px
Font: Inter, 16px
Focus: Border #7C3AED, shadow 0 0 0 4px rgba(124,58,237,0.1)
Placeholder: #A8A29E
Error: Border #FF4D4D, shadow 0 0 0 4px rgba(255,77,77,0.1)
```

#### Select/Dropdown

```
Same as input + chevron icon on right
Dropdown menu: White background, shadow-lg, 12px radius
Option hover: rgba(124,58,237,0.08) background
```

### Badges & Tags

#### Status Badge

```
Background: rgba(124,58,237,0.08)
Text: #7C3AED
Padding: 4px 12px
Border radius: 9999px
Font: Inter, 12px, 600 weight, uppercase, 0.05em letter-spacing
```

#### Success Badge

```
Background: rgba(101,163,13,0.08)
Text: #65A30D
```

#### Warning Badge

```
Background: rgba(245,158,11,0.08)
Text: #F59E0B
```

### Navigation

#### Desktop Navbar

```
Height: 72px
Background: rgba(250,250,249,0.8) with backdrop-blur(20px)
Border bottom: 1px solid #E7E5E4
Logo: Space Grotesk, 24px, 800 weight
Nav links: Inter, 14px, 500 weight, #57534E
Nav link hover: #0A0A0A, underline animation (bottom border grows)
CTA button: Coral primary, small size
```

#### Mobile Navigation

```
Hamburger menu: Full-screen overlay
Background: #FAFAF9
Nav links: Space Grotesk, 24px, 600 weight
CTA button: Full-width, coral
Close button: Top right, X icon
```

---

## Page-by-Page Redesign

### Homepage

#### Section 1: Hero

**Layout**: Full viewport height (min-h-screen), centered content, asymmetric background

**Visual Structure**:

```
┌─────────────────────────────────────────────────────────────┐
│  [Navbar]                                                   │
│                                                             │
│                                                             │
│         ┌─ Badge: "Автоматизация за български бизнес" ─┐   │
│         │  ● (pulsing violet dot)                       │   │
│         └───────────────────────────────────────────────┘   │
│                                                             │
│    РАБОТИ КАТО ИМАШ                                         │
│    10 ЕКСТРИ СЛУЖИТЕЛИ                                      │
│    ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑                                    │
│    Space Grotesk, 800 weight, gradient text                 │
│    (violet → coral)                                         │
│                                                             │
│    AI агенти и workflow автоматизация за български          │
│    компании. Спести 15+ часа седмично.                      │
│    ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑     │
│    Inter, 20px, #57534E, max-width 640px                    │
│                                                             │
│    [🔥 Започни безплатно]  [▶ Виж демо]                     │
│    ↑ Coral primary      ↑ Violet outline                    │
│                                                             │
│                                                             │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│    │ ⏱ 15+    │  │ 👥 50+   │  │ 📈 40%   │               │
│    │ часа     │  │ бизнеса  │  │ повече   │               │
│    │ седмично │  │            │  │ лийдове  │               │
│    └──────────┘  └──────────┘  └──────────┘               │
│    JetBrains Mono  Space Grotesk  JetBrains Mono           │
│                                                             │
│  [Animated background: floating gradient orbs]              │
│  - Large violet orb (top-right, slow drift)                 │
│  - Small coral orb (bottom-left, gentle pulse)              │
│  - Subtle grid pattern overlay                              │
└─────────────────────────────────────────────────────────────┘
```

**Design Details**:

- **Headline**: Space Grotesk, 800 weight, 72px (desktop), 48px (mobile). Gradient text from violet (#7C3AED) to coral (#FF4D4D). Negative letter-spacing (-0.03em). Line height 1.0.
- **Subtitle**: Inter, 20px, #57534E, max-width 640px, centered. Line height 1.6.
- **CTAs**: Coral primary button (left), violet outline button (right). Both with Space Grotesk 600 weight.
- **Stats**: Three cards with minimal borders, large numbers in JetBrains Mono (48px, 700 weight), labels in Space Grotesk (14px, 600 weight).
- **Background**: Two floating gradient orbs (violet top-right, coral bottom-left) with slow CSS animation (20-30s duration). Subtle dot grid pattern overlay at 3% opacity.

**Animation**:

- Badge: Fade in from top, 0.3s delay
- Headline: Words appear one by one (stagger 0.1s each), fade + slide up
- Subtitle: Fade in after headline completes, 0.6s delay
- CTAs: Fade in + scale from 0.95, 0.8s delay
- Stats: Count up animation (numbers increment from 0 to final value), 1.0s delay
- Background orbs: Continuous slow drift (CSS animation, infinite)

#### Section 2: Social Proof Bar

**Layout**: Full-width band, minimal height

```
┌─────────────────────────────────────────────────────────────┐
│  Доверен от 247+ български бизнеса                          │
│                                                             │
│  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]   │
│  (grayscale, hover → full color)                            │
│                                                             │
│  "Ресторант в София" се присъедини преди 2 часа             │
│  (animated ticker, fades in/out)                            │
└─────────────────────────────────────────────────────────────┘
```

**Design**: Warm gray background (#F5F5F4), logos in grayscale that turn to full color on hover. Live ticker showing recent signups (anonymized).

#### Section 3: Problem → Solution

**Layout**: Asymmetric 60/40 split, overlapping cards

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────────────┐  ┌─────────────────────┐        │
│  │  ПРЕДИ ❌             │  │  СЛЕД АВТОМАТИЗАЦИЯ ✅ │        │
│  │                       │  │                      │        │
│  │  ✕ 3 часа дневно     │  │  ✓ AI отговаря за    │        │
│  │    на имейли         │  │    секунди            │        │
│  │                       │  │                      │        │
│  │  ✕ Изгубени лийдове  │  │  ✓ Незабавни отговори │        │
│  │                       │  │    = повече клиенти   │        │
│  │  ✕ Повтарящи се      │  │                      │        │
│  │    задачи             │  │  ✓ Екипът се фокусира│        │
│  │                       │  │    върху важното      │        │
│  │  ✕ Данни в 5 системи │  │                      │        │
│  │                       │  │  ✓ Всичко свързано   │        │
│  └──────────────────────┘  └─────────────────────┘        │
│  Red tint bg              Green tint bg                     │
│  Overlaps slightly → creates depth                          │
└─────────────────────────────────────────────────────────────┘
```

**Design**: "Преди" card has subtle red tint background (rgba(255,77,77,0.05)), "След" card has green tint (rgba(101,163,13,0.05)). Cards overlap by 20px creating depth. "След" card is slightly elevated (shadow-lg, scale 1.02).

#### Section 4: Services

**Layout**: 4-column grid (desktop), 2-column (tablet), 1-column (mobile)

```
┌─────────────────────────────────────────────────────────────┐
│  УСЛУГИ                                          [Виж всички →]│
│  Какво можем да автоматизираме                                │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  ⚡       │ │  🤖       │ │  💻       │ │  🗄️       │      │
│  │  Workflow │ │  AI       │ │  Уеб      │ │  CMS      │      │
│  │  автомат. │ │  агенти   │ │  разработка│ │  интегр.  │      │
│  │           │ │           │ │           │ │           │      │
│  │  от 500 лв│ │  от 2000 лв│ │  от 3000 лв│ │  от 1500 лв│      │
│  │           │ │           │ │           │ │           │      │
│  │  [→]      │ │  [→]      │ │  [→]      │ │  [→]      │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                             │
│  Hover effect: Card lifts (-8px), shadow increases,         │
│  icon scales 1.2x, arrow slides right                       │
└─────────────────────────────────────────────────────────────┘
```

**Design**: Each service card has a large icon (48px) in a colored circle (violet for workflow, coral for AI, lime for web, amber for CMS). Price shown as a badge. Arrow icon slides right on hover. Cards have white background with subtle border.

#### Section 5: Interactive Demo Preview

**Layout**: 50/50 split, left = text, right = embedded demo

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ИНТЕРАКТИВНА ДЕМОНСТРАЦИЯ     ┌──────────────────────┐    │
│                                │                      │    │
│  Виж как работи                │  [Email Automation   │    │
│  email автоматизацията         │   Demo Component]    │    │
│                                │                      │    │
│  Избери тригър и действия.     │  Trigger: ▼          │    │
│  Натисни "Тествай" и виж       │  Action: ▼           │    │
│  как твоят workflow би         │  [▶ Тествай]         │    │
│  протекъл автоматично.         │                      │    │
│                                │                      │    │
│  ✓ Безплатно за изпробване     │  [Result appears     │    │
│  ✓ Само за 2 минути            │   here with          │    │
│  ✓ Виж резултата веднага       │   animation]         │    │
│                                │                      │    │
│  [Виж всички демонстрации →]   └──────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Design**: Left side has violet badge "ИНТЕРАКТИВНА ДЕМОНСТРАЦИЯ", large headline with gradient text, checkmarks in lime green. Right side is the actual demo component in a card with subtle shadow.

#### Section 6: Testimonials

**Layout**: Horizontal scroll carousel, large quote cards

```
┌─────────────────────────────────────────────────────────────┐
│  КАЗУСИ                                                     │
│  Какво казват нашите клиенти                                │
│                                                             │
│  ← [Card 1] [Card 2] [Card 3] →                            │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │  "След като имплементирахме automation-а,   │           │
│  │   спестихме 20 часа седмично."              │           │
│  │                                             │           │
│  │  ★★★★★                                     │           │
│  │                                             │           │
│  │  Maria Petrova                              │           │
│  │  Управител, TechStore.bg                    │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  Card style: White bg, 24px radius, large shadow,          │
│  quote mark in violet (large, decorative)                   │
└─────────────────────────────────────────────────────────────┘
```

**Design**: Cards are large (min-width 400px), with decorative quotation mark in violet at 80px size. Stars in amber. Author info with avatar (initials in violet circle). Horizontal scroll with snap points, arrow navigation.

#### Section 7: Pricing Teaser

**Layout**: 3 cards, middle one elevated

```
┌─────────────────────────────────────────────────────────────┐
│  ПРОЗРАЧНИ ЦЕНИ                                             │
│  Започни с това което ти трябва                             │
│                                                             │
│  ┌──────────┐ ┌──────────────────┐ ┌──────────┐           │
│  │ Starter  │ │     Professional │ │ Enterprise│           │
│  │          │ │     ⭐ Popular   │ │           │           │
│  │ 500 лв   │ │     2,500 лв     │ │ 10,000+ лв│           │
│  │          │ │                  │ │           │           │
│  │ • 1 авто │ │ • 5 автоматиз.   │ │ • Unlimited│           │
│  │ • Email  │ │ • AI чатбот      │ │ • Dedicated│           │
│  │ • 2 нед. │ │ • CRM настройка  │ │ • Custom   │           │
│  │          │ │ • 1 мес. поддр.  │ │ • 6 мес.   │           │
│  │          │ │                  │ │           │           │
│  │ [Започни]│ │ [Започни]        │ │ [Свържи се]│           │
│  └──────────┘ └──────────────────┘ └──────────┘           │
│                                                             │
│  Middle card: Elevated (+8px), violet border, glow shadow, │
│  "Popular" badge in coral at top                            │
└─────────────────────────────────────────────────────────────┘
```

#### Section 8: Final CTA

**Layout**: Full-width gradient section

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Background: Gradient from violet to coral (diagonal)       │
│  Text: White                                                │
│                                                             │
│  ГОТОВ ДА АВТОМАТИЗИРАШ БИЗНЕСА СИ?                        │
│  ↑ Space Grotesk, 800 weight, 56px                          │
│                                                             │
│  Започни с безплатна 30-минутна консултация.                │
│  Inter, 20px, rgba(255,255,255,0.8)                         │
│                                                             │
│  [Заяви безплатна консултация →]  [Виж интерактивни демота]│
│  ↑ White button on gradient   ↑ White outline button        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Services Page

#### Hero

- Full-width section with large headline: "Какво можем да автоматизираме"
- Subtitle: "От прости имейл автоматизации до комплексни AI агенти"
- Background: Subtle gradient (violet tint at top, fading to white)
- Animated service icons floating in background

#### Service Deep-Dives

- Alternating layout: Image left/text right, then text left/image right
- Each service gets a full section with:
  - Large icon (64px) in colored circle
  - Service name (Space Grotesk, 40px, 700 weight)
  - Description (Inter, 18px)
  - Key features as bullet points with lime checkmarks
  - Starting price badge
  - "Научи повече →" link

#### Process Timeline

- Horizontal timeline (vertical on mobile)
- 4 steps: Discovery → Design → Build → Launch
- Each step has icon, title, description
- Connected by animated line (violet gradient)
- Current step highlighted with coral dot

---

### Pricing Page

#### Hero

- "Прозрачни цени, реални резултати"
- Subtitle: "Избери плана който отговаря на твоите нужди"
- Clean, minimal — let the pricing cards do the work

#### Free Trial Section

- Full-width card with lime green accent border
- "Започни напълно безплатно — 30 дни"
- Visual breakdown of what's included:
  - 5 снимки ✅
  - 1 видео ✅
  - Лек SEO ✅
  - Лек брандинг ✅
- Each item has a lime checkmark icon
- "Започни безплатно" CTA in coral

#### Subscription Tiers

- 3 cards side by side
- Middle card (Professional) elevated with violet border and glow
- "Popular" badge in coral
- Each card: Plan name, price, description, feature list, CTA
- Feature list with checkmarks (lime for included, gray for not included)

#### Comparison Table

- Clean table with alternating row colors
- Features as rows, plans as columns
- Checkmarks and X marks
- Sticky header on scroll

#### FAQ

- Accordion with smooth expand/collapse animation
- Question in Space Grotesk, answer in Inter
- Plus/minus icon rotates on expand
- Border between questions

---

### Demos Page

#### Hero

- "Виж как работят нашите автоматизации"
- Subtitle: "Изпробвай всяка услуга директно тук"
- Background: Subtle animated grid pattern

#### Demo Cards

- Full-width demo containers
- Each demo has:
  - Title with icon
  - Description
  - Interactive demo component
  - "Опитай в безплатния период" CTA below
- "Coming Soon" cards: Dimmed (opacity 0.5), with "Извести ме" email capture

---

### Case Studies Page

#### Hero

- "Реални резултати от реални бизнеси"
- Subtitle: "Виж как автоматизацията промени български компании"

#### Case Study Cards

- Large cards with image at top
- Business name and type
- Before/after metrics (large numbers, lime for improvement)
- Short testimonial quote
- "Прочети повече →" link
- Hover: Card lifts, image zooms slightly

---

### Contact Page

#### Hero

- "Нека поговорим"
- Subtitle: "Имаш въпроси? Искаш консултация? Напиши ни."

#### Layout

- 60/40 split: Form left, contact info right
- Form: Clean, minimal fields (name, email, company, message)
- Contact info cards: Email, phone, location with icons
- Response time card: "Отговаряме в рамките на 2 часа"
- Calendar booking section: "Захарка безплатна 30-минутна консултация"

---

## Animation System

### Scroll-Driven Animations

All scroll animations use `framer-motion`'s `whileInView` with these presets:

```typescript
// Fade up (default for most elements)
fadeUp: {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
}

// Fade in (for subtle elements)
fadeIn: {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

// Scale up (for cards, images)
scaleUp: {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }
}

// Slide from left
slideLeft: {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
}

// Slide from right
slideRight: {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
}

// Stagger children
staggerContainer: {
  whileInView: { transition: { staggerChildren: 0.1 } }
}
```

### Hover Animations

```typescript
// Card hover
cardHover: {
  whileHover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
    transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }
  }
}

// Button hover
buttonHover: {
  whileHover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2 }
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
}

// Icon hover
iconHover: {
  whileHover: {
    scale: 1.2,
    rotate: 5,
    transition: { duration: 0.3, ease: "backOut" }
  }
}
```

### Page Transitions

```typescript
// Page enter
pageEnter: {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }
}
```

### Micro-Interactions

1. **Number counting**: When metrics come into view, numbers count up from 0 to final value over 1.5s with easing
2. **Progress bar fill**: Progress bars animate from 0% to target width over 1s with spring easing
3. **Checkbox bounce**: When checked, checkbox scales to 1.2 then back to 1.0 (spring animation)
4. **Button ripple**: Click creates a subtle ripple effect from click point
5. **Toggle switch**: Smooth slide with spring physics
6. **Accordion expand**: Height animates with spring easing, icon rotates 180°

### Background Animations

1. **Floating orbs**: 2-3 gradient circles that drift slowly (20-30s duration, infinite loop)
2. **Grid pattern**: Subtle dot grid (3% opacity) that shifts slightly on scroll (parallax)
3. **Gradient shift**: Hero gradient slowly shifts between violet-coral and violet-lime (10s duration, infinite)

---

## Dark Theme Specifications

### When to Use Dark Theme

- User preference (toggle in navbar)
- System preference (prefers-color-scheme: dark)
- Default: Light theme

### Dark Theme Adaptations

| Element         | Light Theme  | Dark Theme                   |
| --------------- | ------------ | ---------------------------- |
| Page background | #FAFAF9      | #0A0A0A                      |
| Card background | #FFFFFF      | #1C1C1C                      |
| Primary text    | #0A0A0A      | #FAFAF9                      |
| Secondary text  | #57534E      | #A8A29E                      |
| Border          | #E7E5E4      | #292524                      |
| Violet accent   | #7C3AED      | #8B5CF6 (brighter)           |
| Coral accent    | #FF4D4D      | #FF6B6B (brighter)           |
| Success         | #65A30D      | #84CC16 (brighter)           |
| Shadows         | Dark shadows | Colored glow shadows         |
| Glass effect    | Not used     | Backdrop blur + transparency |

### Dark Theme Specifics

- Cards use subtle borders instead of shadows for depth
- Glow effects replace drop shadows (violet glow on violet elements, coral glow on CTAs)
- Glass morphism effect on navbar and floating elements
- Gradient backgrounds are more saturated
- Text contrast ratios must meet WCAG AA (4.5:1 minimum)

---

## Mobile-First Responsive Design

### Breakpoints

```css
--breakpoint-sm: 640px; /* Large phones */
--breakpoint-md: 768px; /* Tablets */
--breakpoint-lg: 1024px; /* Small laptops */
--breakpoint-xl: 1280px; /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Mobile Adaptations

| Element         | Desktop           | Tablet            | Mobile           |
| --------------- | ----------------- | ----------------- | ---------------- |
| Hero headline   | 72-96px           | 48-56px           | 36-40px          |
| Section spacing | 120-160px         | 80-96px           | 64-80px          |
| Card grid       | 3-4 columns       | 2 columns         | 1 column         |
| Navigation      | Horizontal        | Horizontal        | Hamburger menu   |
| Stats row       | 3 in a row        | 3 in a row        | Stack vertically |
| Split layouts   | 60/40 or 50/50    | 60/40             | Stack vertically |
| CTA buttons     | Side by side      | Side by side      | Stack vertically |
| Testimonials    | Horizontal scroll | Horizontal scroll | Vertical stack   |
| Footer          | 4 columns         | 2 columns         | 1 column         |

### Mobile-Specific Features

- **Bottom navigation bar**: On dashboard pages, replace sidebar with bottom tab bar
- **Swipe gestures**: Testimonial carousel supports swipe
- **Pull to refresh**: Dashboard pages support pull-to-refresh
- **Touch-friendly**: All tap targets minimum 44x44px
- **Thumb zone**: Primary CTAs placed in bottom half of screen
- **Reduced motion**: Respect `prefers-reduced-motion` — disable non-essential animations

---

## Accessibility Considerations

### Color Contrast

- All text meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Violet on white: 4.6:1 ✅
- Coral on white: 3.9:1 ❌ → Use coral only for large text (buttons, badges) or on dark backgrounds
- Lime on white: 3.2:1 ❌ → Use lime only for large text or on dark backgrounds
- Gray (#57534E) on white: 7.1:1 ✅

### Focus States

- All interactive elements have visible focus indicators
- Focus ring: 2px solid violet with 4px offset
- Focus order follows visual order (tab index matches DOM order)

### Screen Reader Support

- All images have descriptive alt text
- Form inputs have associated labels
- ARIA labels on icon-only buttons
- Skip navigation link at top of page
- Semantic HTML structure (header, main, nav, section, footer)

### Reduced Motion

- Respect `prefers-reduced-motion: reduce`
- Disable: floating orbs, scroll animations, number counting
- Keep: hover states, focus states, essential transitions
- Provide toggle to disable animations in user preferences

---

## Implementation Guide

### Files to Modify

1. **`src/styles/globals.css`** — Complete redesign of color tokens, typography, spacing
2. **`src/components/ui/Button.tsx`** — New button variants (coral CTA, violet outline)
3. **`src/components/ui/Card.tsx`** — New card styles (standard, featured, glass)
4. **`src/components/ui/Badge.tsx`** — New badge variants (status, success, warning)
5. **`src/components/ui/Input.tsx`** — Updated input styles
6. **`src/components/ui/AnimatedSection.tsx`** — New animation presets
7. **`src/components/layout/Navbar.tsx`** — Redesigned navigation
8. **`src/components/layout/Footer.tsx`** — Updated footer
9. **`src/app/_components/HomeContent.tsx`** — Complete homepage redesign
10. **`src/app/services/page.tsx`** — Services page redesign
11. **`src/app/pricing/page.tsx`** — Pricing page redesign
12. **`src/app/demos/page.tsx`** — Demos page redesign
13. **`src/app/case-studies/page.tsx`** — Case studies page redesign
14. **`src/app/contact/page.tsx`** — Contact page redesign
15. **`src/app/layout.tsx`** — Add Space Grotesk font, theme provider

### New Dependencies

```json
{
  "dependencies": {
    "@fontsource/space-grotesk": "^5.0.0"
  }
}
```

Or use Google Fonts via `next/font`:

```typescript
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
```

### CSS Custom Properties (globals.css)

```css
@import "tailwindcss";

@theme {
  /* Light Theme (Default) */
  --color-bg-primary: #fafaf9;
  --color-bg-secondary: #f5f5f4;
  --color-bg-elevated: #ffffff;
  --color-text-primary: #0a0a0a;
  --color-text-secondary: #57534e;
  --color-text-muted: #a8a29e;
  --color-accent-violet: #7c3aed;
  --color-accent-violet-hover: #6d28d9;
  --color-accent-coral: #ff4d4d;
  --color-accent-coral-hover: #e63946;
  --color-accent-lime: #65a30d;
  --color-accent-amber: #f59e0b;
  --color-border: #e7e5e4;
  --color-border-hover: #d6d3d1;

  /* Dark Theme */
  --color-bg-primary-dark: #0a0a0a;
  --color-bg-secondary-dark: #141414;
  --color-bg-elevated-dark: #1c1c1c;
  --color-text-primary-dark: #fafaf9;
  --color-text-secondary-dark: #a8a29e;
  --color-text-muted-dark: #78716c;
  --color-accent-violet-dark: #8b5cf6;
  --color-accent-violet-hover-dark: #a78bfa;
  --color-accent-coral-dark: #ff6b6b;
  --color-accent-coral-hover-dark: #ff8787;
  --color-accent-lime-dark: #84cc16;
  --color-border-dark: #292524;
  --color-border-hover-dark: #44403c;

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #7c3aed, #ff4d4d);
  --gradient-metrics: linear-gradient(135deg, #65a30d, #7c3aed);
  --gradient-cta: linear-gradient(135deg, #ff4d4d, #f59e0b);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.12);
  --shadow-glow-violet: 0 0 60px rgba(124, 58, 237, 0.15);
  --shadow-glow-coral: 0 0 40px rgba(255, 77, 77, 0.2);

  /* Typography */
  --font-display: var(--font-display), "Space Grotesk", system-ui, sans-serif;
  --font-body: var(--font-body), "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

### Utility Classes (globals.css)

```css
/* Card styles */
.card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
}

.card-featured {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.05),
    rgba(255, 77, 77, 0.05)
  );
  border: 2px solid rgba(124, 58, 237, 0.2);
  border-radius: 24px;
  padding: 40px;
  box-shadow: var(--shadow-lg), var(--shadow-glow-violet);
  transform: scale(1.02);
}

/* Gradient text */
.text-gradient-hero {
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-metrics {
  background: var(--gradient-metrics);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Button styles */
.btn-primary {
  background: var(--color-accent-coral);
  color: white;
  font-family: var(--font-display);
  font-weight: 600;
  border-radius: 12px;
  padding: 16px 32px;
  transition: all 200ms ease;
}

.btn-primary:hover {
  background: var(--color-accent-coral-hover);
  box-shadow: var(--shadow-glow-coral);
  transform: translateY(-2px) scale(1.02);
}

.btn-primary:active {
  transform: scale(0.98);
}

.btn-secondary {
  background: transparent;
  color: var(--color-accent-violet);
  border: 2px solid var(--color-accent-violet);
  font-family: var(--font-display);
  font-weight: 600;
  border-radius: 12px;
  padding: 16px 32px;
  transition: all 200ms ease;
}

.btn-secondary:hover {
  background: var(--color-accent-violet);
  color: white;
}

/* Section spacing */
.section {
  padding: 120px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 80px 0;
  }
}

/* Background animations */
.bg-grid-pattern {
  background-image: radial-gradient(
    circle,
    var(--color-border) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  opacity: 0.03;
}

/* Floating orb animation */
@keyframes float-slow {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.animate-float-slow {
  animation: float-slow 25s ease-in-out infinite;
}

@keyframes float-fast {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(20px, -20px) scale(1.1);
  }
}

.animate-float-fast {
  animation: float-fast 15s ease-in-out infinite;
}

/* Number counting animation */
@keyframes count-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-count-up {
  animation: count-up 1.5s ease-out forwards;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Design Checklist

### Before Implementation

- [ ] Install Space Grotesk font (via @fontsource or next/font)
- [ ] Update globals.css with new color tokens
- [ ] Update globals.css with new typography variables
- [ ] Update globals.css with new shadow system
- [ ] Update globals.css with new utility classes
- [ ] Update all component files to use new tokens

### During Implementation

- [ ] Homepage: Hero section redesigned
- [ ] Homepage: Social proof bar added
- [ ] Homepage: Problem/Solution section redesigned
- [ ] Homepage: Services section redesigned
- [ ] Homepage: Demo preview section redesigned
- [ ] Homepage: Testimonials carousel redesigned
- [ ] Homepage: Pricing teaser redesigned
- [ ] Homepage: Final CTA section redesigned
- [ ] Services page: Hero and deep-dives redesigned
- [ ] Pricing page: Free trial section and tiers redesigned
- [ ] Demos page: Demo containers redesigned
- [ ] Case studies page: Cards redesigned
- [ ] Contact page: Form and info redesigned
- [ ] Navbar: Redesigned with new styles
- [ ] Footer: Updated with new styles
- [ ] Dark theme: All pages adapt correctly
- [ ] Mobile: All pages responsive

### After Implementation

- [ ] Test all animations (scroll, hover, micro-interactions)
- [ ] Test dark/light theme toggle
- [ ] Test on mobile (375px, 414px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1280px, 1536px)
- [ ] Check color contrast ratios (WCAG AA)
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Test with `prefers-reduced-motion`
- [ ] Performance audit (Lighthouse)

---

## Why This Design Works for Bulgarian Micro Businesses

### 1. **Bold = Memorable**

Micro business owners see hundreds of websites. A bold, energetic design stands out and creates a lasting impression. They'll remember Silex Digital because it looks different from every other agency site.

### 2. **Light Theme = Professional**

Light theme default signals professionalism and trust — important for business-to-business relationships. Dark mode is available for preference, but light is the business-appropriate default.

### 3. **Violet + Coral = Distinctive**

The violet/coral combination is rare in the Bulgarian market. Most agencies use blue/green. This color pairing is energetic, modern, and instantly recognizable.

### 4. **Large Typography = Confidence**

Oversized headlines communicate confidence and clarity. Micro business owners are busy — they need to understand the value proposition in 3 seconds. Large text makes that possible.

### 5. **Purposeful Animations = Quality**

Animations that guide attention (not just decorate) signal technical competence. When a micro business owner sees smooth, purposeful motion, they think: "These people know what they're doing."

### 6. **Clear CTAs = Conversion**

Coral CTAs on a light background are impossible to miss. Every page has a clear next step. Micro business owners don't have time to hunt for the "contact" button.

### 7. **Social Proof = Trust**

Bulgarian businesses trust other Bulgarian businesses. The social proof bar, testimonials, and case studies all reinforce: "Others like you chose us."

### 8. **Mobile-First = Reality**

Most micro business owners browse on their phones. A mobile-first design ensures the experience is excellent on the device they actually use.

---

## Summary

This redesign transforms Silex Digital from a generic dark agency template into a **bold, energetic, conversion-focused platform** that:

- **Stands out** with violet + coral color palette (rare in Bulgarian market)
- **Communicates confidence** through oversized Space Grotesk typography
- **Guides attention** with purposeful animations and clear visual hierarchy
- **Builds trust** with social proof, testimonials, and professional light theme
- **Converts visitors** with impossible-to-miss coral CTAs on every page
- **Works everywhere** with mobile-first responsive design and dark mode support
- **Feels premium** through refined spacing, shadows, and micro-interactions

The result: a platform that makes Bulgarian micro business owners feel excited about automation, not intimidated by it.
