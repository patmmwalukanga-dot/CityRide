---
name: Midnight Velocity
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5e61'
  on-secondary: '#ffffff'
  secondary-container: '#dfdfe2'
  on-secondary-container: '#616365'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e5'
  secondary-fixed-dim: '#c6c6c9'
  on-secondary-fixed: '#1a1c1e'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  action-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  margin-mobile: 20px
  margin-desktop: 40px
  gutter: 16px
---

## Brand & Style

The brand personality is authoritative, precise, and premium. It targets urban professionals who value efficiency and a high-end experience. The UI evokes a sense of calm reliability through a **Minimalist** aesthetic with subtle **Glassmorphism** for overlay elements. 

The design narrative focuses on "The Smooth Journey"—eliminating visual noise to highlight essential actions. Every interaction should feel instantaneous, with plenty of whitespace to prevent cognitive overload during time-sensitive tasks like booking a ride.

## Colors

The palette is centered around 'Midnight' (#000000), used exclusively for primary actions and high-level branding to command attention. 

- **Primary (Midnight):** Used for the main "Request" call-to-action and active selection states.
- **Secondary (Slate Gray):** Utilized for inactive states, secondary icons, and supporting text.
- **Success:** A vibrant emerald green used specifically for "Driver Arrived" and "Payment Complete" statuses.
- **Surface (Arctic White):** The foundation for bottom sheets and cards, providing a crisp contrast against the slightly tinted 'Ice' background.

## Typography

The typography uses **Inter** for its exceptional readability and neutral, systematic tone. 

Headlines use tighter letter-spacing and heavier weights to feel "grounded." Body text is optimized for quick scanning, while labels are often set in uppercase with slight tracking to differentiate metadata (like license plate numbers or estimated arrival times) from standard prose.

## Layout & Spacing

This design system utilizes a **Fluid Grid** with a 4px baseline rhythm. 

- **Mobile:** Uses a 4-column grid with 20px side margins. The layout is heavily bottom-weighted, placing key interactive elements within the "thumb zone."
- **Desktop/Tablet:** Transitions to a 12-column grid. Maps expand to fill the background while interface panels are anchored to the left or right.
- **Rhythm:** Use `lg` (24px) for spacing between major sections and `md` (16px) for internal card padding.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Ambient Shadows**. 

1. **Base:** The map layer or primary background.
2. **Surface:** Bottom sheets and floating cards use a high-spread, low-opacity shadow (Color: Midnight, Alpha: 0.08, Blur: 20px) to appear as if hovering just above the map.
3. **Overlays:** Modals and tooltips utilize a light backdrop blur (12px) to maintain context of the underlying map while focusing the user's attention.
4. **Action:** The primary action button remains at the highest elevation, using a slight glow effect in the dark mode or a sharp, defined shadow in light mode.

## Shapes

The shape language is **Rounded**, signifying approachability within a professional framework. 

- Standard components (buttons, input fields) use a 0.5rem (8px) radius.
- Container elements like bottom sheets use a 1.5rem (24px) radius on top corners only to create a "drawer" effect.
- Status chips (e.g., "Eco-friendly," "Top Rated") are fully pill-shaped to distinguish them from interactive buttons.

## Components

- **Action Buttons:** High-contrast Midnight background with Arctic White text. Large padding (16px vertical) and bold typography.
- **Bottom Sheets:** Floating Arctic White surfaces with a centered handle-bar. They should snap to predefined heights (30%, 60%, 95%).
- **Vehicle Selection Cards:** Use a subtle Slate Gray border (1px) when unselected, switching to a 2px Midnight border with a light gray fill when active.
- **Input Fields:** Minimalist design with only a bottom border in the default state, transitioning to a full Midnight outline on focus.
- **Success Status:** Emerald green backgrounds with white icons for "Arrival" notifications, using a pulse animation to draw attention.
- **Live Activity Bars:** Slim, high-z-index components for ongoing trip status, using a light blur background and a progress indicator.