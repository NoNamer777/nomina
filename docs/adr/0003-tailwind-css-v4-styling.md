# ADR 0003: Tailwind CSS v4 for UI styling

**Status**: Accepted

## Context

The frontend had no CSS framework — only an empty SCSS global stylesheet. The UI needs a consistent styling approach before components are built.

## Decision

Use Tailwind CSS v4 with pure utility classes. No external component library. A home-grown Angular component library will be built on top of raw Tailwind utilities.

## Reasons

- Pure utilities eliminate the split between template and stylesheet for new components.
- Tailwind v4's CSS-first configuration (`@import 'tailwindcss'`) fits naturally into Angular's PostCSS pipeline.
- No component library import avoids fighting pre-designed components in a custom two-panel desktop layout.

## Consequences

- The global stylesheet is `styles.css` (plain CSS). Tailwind v4's `@import` directive must be processed by PostCSS — running it through Dart Sass produces a deprecation warning. The project uses plain CSS throughout (`inlineStyleLanguage: css`).
- Angular schematics are configured with `style: "none"` — generated components have no stylesheet file by default.
- Dark mode follows OS preference via CSS `prefers-color-scheme` (Tailwind `media` strategy, the v4 default). No user toggle exists yet.
- The accent colour is `--color-accent: var(--color-green-800)` — forest green (~6.4:1 on white, WCAG AA compliant for text). `green-700` was rejected for falling just below 4.5:1. If a semantic success colour is ever needed, reach for `emerald-600` — distinct enough in vibrancy from the muted `green` scale to avoid confusion with interaction states.
- `@apply` is intentionally avoided; it is discouraged in Tailwind v4 and incompatible with the pure-utilities model.
