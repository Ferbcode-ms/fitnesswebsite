# TECH STACK — Women's Fitness Coaching Website

**Runtime:** Node.js `v22.14.0`, npm `11.5.2`

---

## Production Dependencies

| Package | Installed Version | Purpose |
|---|---|---|
| `next` | `15.5.29` | React framework using App Router, Server Components, `next/font/google`, and image optimization |
| `react` | `19.3.1` | Core UI library |
| `react-dom` | `19.3.1` | DOM renderer for React |
| `framer-motion` | `12.43.0` | Animation library reserved for interactive transitions and scroll-linked motion in Phase 2+ |
| `lucide-react` | `0.487.0` | Lightweight tree-shakeable icon set (used for mobile menu close/chevron icons) |

---

## Development & Build Dependencies

| Package | Installed Version | Purpose |
|---|---|---|
| `typescript` | `5.9.3` | Strict static type checking (`"strict": true`) |
| `tailwindcss` | `4.3.5` | Utility-first styling engine |
| `@tailwindcss/postcss` | `4.3.5` | PostCSS integration for Tailwind CSS v4 |
| `eslint` | `9.39.5` | JavaScript / TypeScript linter |
| `eslint-config-next` | `15.5.29` | Next.js Core Web Vitals & TypeScript ESLint rules |
| `@eslint/eslintrc` | `3.3.0` | Flat config compatibility helper for `eslint.config.mjs` |
| `@types/node` | `22.x` | Node.js TypeScript definitions |
| `@types/react` | `19.x` | React TypeScript definitions |
| `@types/react-dom` | `19.x` | ReactDOM TypeScript definitions |

---

## Font Loading Strategy

Loaded via `next/font/google` in `src/app/layout.tsx` and bound to CSS custom properties in `src/styles/variables.css`:

- **`Lilita One`** (`400`) -> `--font-lilita-one` (`--font-display`)
- **`Sometype Mono`** (`400`, `700`) -> `--font-sometype-mono` (`--font-mono`)
- **`Roboto`** (`400`, `500`, `700`) -> `--font-roboto` (`--font-body`)
- **`La Belle Aurore`** (`400`) -> `--font-la-belle-aurore` (`--font-script`, closest Google Fonts alternative to the CORS-blocked Squarespace `script` font)

