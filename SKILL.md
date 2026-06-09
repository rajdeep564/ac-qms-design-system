---
name: ac-qms-design
description: Use this skill to generate well-branded interfaces and assets for AC-QMS — Aditya Chemicals' regulated Quality Management System — either for production or throwaway prototypes / mocks. Contains essential design guidelines, tokens, type, fonts, assets, and a UI kit of components for prototyping. The aesthetic is clinical / pharma-regulated: white-on-near-white, hairline borders, no shadows, color used FUNCTIONALLY only (department, status, OOS danger).
user-invocable: true
---

Read the `README.md` file in this skill first — it covers the brand
context, the CONTENT FUNDAMENTALS (voice, tone, casing, numbers),
the VISUAL FOUNDATIONS (color discipline, type, spacing, surface,
motion, tables), and the ICONOGRAPHY rules. Then explore the other
files as needed:

- `colors_and_type.css` — canonical design tokens. Import this and
  use the CSS variables; never invent colors outside this set.
- `assets/` — the Aditya Chemicals corporate logo (the only brand
  raster in the system).
- `preview/` — small specimen cards for tokens and components.
- `ui_kits/ac_qms/` — the high-fidelity click-through UI kit
  (React + Babel inline JSX, no build step). `index.html` is the
  entry point; `App.jsx` routes between screens.

## When generating artifacts (slides, mocks, throwaway prototypes)
Copy the assets you need out of this skill folder into your output
project. Pull `colors_and_type.css` and `ui_kits/ac_qms/app.css`
into your HTML. Lean on the existing components in the UI kit rather
than rebuilding atoms — they already encode the rules (one colored
button per view, soft-tint status pills, hairline cards, etc.).

## When working on production code
Read the rules in `README.md` and adopt the same tokens and patterns.
The single most important constraint to enforce: **color is functional
only.** No decorative color, no gradients, no shadows beyond
`--shadow` / `--shadow-sm`. The OOS red is reserved for
Out-Of-Specification and destructive — never for general errors.

## Defaults if the user gives you no other direction
- Sentence case for all UI chrome; ALL CAPS only for status pills /
  department badges.
- Dates as `DD-MMM-YYYY HH:MM IST` (24-hour, timezone explicit).
- Document IDs in `JetBrains Mono` (or any monospace fallback).
- One primary action per view. Everything else is neutral outline.
- Tables before cards — this is a tabular product.

If invoked without further guidance, ask the user what they want to
build, ask 3–5 clarifying questions about audience and intent, and
then act as an expert designer who outputs HTML artifacts or
production code, depending on the need.
