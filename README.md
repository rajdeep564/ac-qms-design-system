# AC-QMS Design System

The internal design system for **AC-QMS** — Aditya Chemicals' Quality
Management System. AC-QMS is the regulated software backbone that
controls how QC (Quality Control) labs and QA (Quality Assurance)
teams author, review, sign, and issue pharma documents (specifications,
methods, batch records, OOS investigations, change controls, deviations).

This is not a marketing site. It is a system-of-record that lives in
audit logs and FDA inspections. The visual language reflects that:
the interface is overwhelmingly white and neutral-gray, color appears
only when it is functional, and every surface is hairline-bordered
and inspection-ready.

> **Aesthetic shorthand:** the restraint of a medical record system
> or a lab instrument readout. Precise, calm, trustworthy.

---

## Surface inventory

| Surface | Format | Role |
| --- | --- | --- |
| AC-QMS web app | Internal SPA | All authoring, review, e-signature, issuance |
| Corporate identity | Aditya Chemicals logo (purple) | Header lock-up only; never an in-product accent |

---

## Sources & provenance

| Source | Where | Access |
| --- | --- | --- |
| Aditya Chemicals corporate logo | `uploads/COM.LOGO.png` → `assets/aditya-chemicals-logo.png` | Provided by user |
| Design tokens (clinical palette, type, spacing) | Pasted in brief; canonical copy in `colors_and_type.css` | Provided by user |
| Figma file | _Not provided_ | — |
| Codebase / repo | _Not provided_ | — |

> ⚠️ No Figma file or production codebase was attached. The UI kit
> in this system is built **directly from the brief's tokens and
> visual-direction text** — it is a faithful interpretation, not
> a recreation from source. When the real product code or Figma is
> shared, the kit should be re-aligned against it.

---

## Brand context

**Aditya Chemicals** is a pharmaceutical / fine-chemical manufacturer.
The corporate mark is a deep purple wordmark with a stylized mountain-A
glyph. The corporate purple is reserved for **corporate identity
surfaces** (letterhead, header lock-up, signage). It does **not**
appear in the AC-QMS product UI as an accent color — the product
operates from a completely separate, restrained clinical palette
(`--primary` muted teal + neutrals + functional status colors).

This separation is intentional: the QMS must read as instrument-grade
software, not branded marketing material.

---

## CONTENT FUNDAMENTALS

The product's copy must read the way a calibrated balance reads:
exactly, briefly, and without affect. There is no marketing voice.

### Voice & tone
- **Neutral, declarative, terse.** State facts; do not narrate them.
- **No persuasion, no encouragement, no exclamation.** A QMS does not
  congratulate the user. There are no "Great job!" or 🎉 confirmations.
- **Imperative for actions** ("Sign document", "Reject batch"),
  **past tense for log entries** ("Submitted for QA review",
  "Signed by R. Patel on 24-May-2026 14:02 IST").
- **Second person only when addressing the user directly in dialogs**
  ("You are about to sign…"). First person ("I", "we") never appears.
- **Sentence case throughout.** No Title Case in buttons, headers,
  menus, or tabs.

### Casing rules
- **UI chrome (buttons, tabs, menus, headers):** Sentence case.
  → "Submit for QA review", not "Submit For QA Review".
- **Status pills, badges, department tags:** ALL CAPS, tracked +0.06em.
  → "DRAFT", "APPROVED", "OOS", "QC", "QA".
- **Document codes / IDs:** As-is, monospace.
  → `SPEC-API-0142 r3`, `OOS-2026-0089`.
- **Dates:** `DD-MMM-YYYY` (`24-May-2026`) plus 24-hour time + timezone
  (`14:02 IST`). Never `5/24/26` — ambiguous to international auditors.

### Numbers & units
- Tabular numerals (`font-variant-numeric: tabular-nums`) everywhere
  numbers stack — tables, audit trails, batch records.
- Always include the unit, with a non-breaking space:
  `99.7 %`, `250 mg`, `12.4 µg/mL`. Never "99.7%" jammed.
- Specifications use `NLT` / `NMT` (Not Less Than / Not More Than)
  abbreviations as is standard in pharma: `NLT 98.0 %`, `NMT 0.10 %`.

### Examples in the wild
| Context | ✅ Write | ❌ Avoid |
| --- | --- | --- |
| Empty state | "No deviations open." | "You're all caught up! 🎉" |
| Submit confirmation | "Submitted to QA. Awaiting review." | "Awesome — sent for review!" |
| Destructive | "Void this batch record? This action is logged and irreversible." | "Are you sure you want to delete this?" |
| OOS banner | "Result outside specification. Investigation required (21 CFR 211.192)." | "Uh oh — value out of range!" |
| Tooltip on signature | "Signing applies your bound e-signature under 21 CFR Part 11." | "Click here to sign your document." |

### Emoji & ornament
- **Emoji: never.** Not in copy, not as status icons, not in empty states.
- **Unicode arrows/dingbats:** never decoratively. `→` is acceptable
  inside breadcrumbs/audit-trail lines only.
- **Exclamation points:** never in product copy. The OOS color is
  loud enough.

---

## VISUAL FOUNDATIONS

### Color
- **Functional only.** Color never decorates. It signals one of three
  things: department (QC green / QA blue), document status, or
  out-of-specification danger (OOS red).
- **The single accent** is `--primary` (deep muted teal `#0F5560`),
  reserved for the primary CTA and the active nav state.
  **Maximum one colored button per view.** Every secondary action is
  neutral outline.
- **Status pills** use the `*-soft` background tints with the solid
  color as text. No fully saturated chips. Status is information,
  not an alarm.
- **Departments** (QC green, QA blue) are the only standing identity
  colors and only ever appear as badges, never as backgrounds, fills,
  or borders on neutral chrome.
- **OOS red (`--oos #B42318`)** is the system's loudest color. It is
  reserved for Out-Of-Specification results and destructive warnings.
  It must not appear anywhere else — not on error toasts unrelated
  to OOS, not on required-field asterisks, never.

### Typography
- **One family: Inter.** No display fonts, no serifs, no script.
- **Base 14 px.** The product runs compact and precise; long type
  ramps are avoided. Most hierarchy is communicated by `font-weight`
  (400 → 500 → 600) and spacing — not by size jumps or color.
- **Tabular numerals** wherever numbers stack.
- **Monospace** (JetBrains Mono fallback to system mono) is used
  only for document IDs, batch numbers, and audit-trail hashes.

### Backgrounds & surface
- **Two neutrals only:** `--bg #FFFFFF` (cards, inputs, modals) sitting
  on `--canvas #FAFBFC` (the page behind cards). That 0.5% delta is
  the entire surface contrast.
- **No imagery, no illustration, no gradients, no texture, no pattern.**
  No hero photos. No abstract product art. No background blur, no
  glass effects, no noise.
- **Separation is by hairline border**, not by elevation. `--border
  #E4E7EC` is the workhorse; `--border-strong #D0D5DD` for input
  borders that need slightly more presence.

### Cards & elevation
- Cards: `background: var(--bg)`, `border: 1px solid var(--border)`,
  `border-radius: 6px`. **No drop shadow** in 95% of cases.
- The only allowed shadows are `--shadow-sm` (`0 1px 2px rgba(16,24,40,0.04)`)
  for the very subtle lift on input focus rings and `--shadow`
  (`0 1px 3px rgba(16,24,40,0.06)`) for popovers and dropdowns.
  **That is the maximum.** No `0 8px 24px` puffy cards.

### Corners
- `--radius 6px` for cards, modals, buttons, large inputs.
- `--radius-sm 4px` for pills, badges, status chips, table cells.
- Tables: outer corner rounded, inner cells square.
- Never fully rounded (`border-radius: 999px`) except the avatar.

### Borders
- **All borders are 1 px solid `--border`.** Never 2 px, never dashed
  (except dropzone hint), never dotted.
- Dividers inside a card are 1 px `--border`, full bleed of the card's
  inner padding box.
- Focus ring: 2 px `--primary` at 25% opacity, outset 0, with the
  border underneath darkening to `--primary`. No glow.

### Spacing
- Strict 4/8 grid via `--s1` through `--s10`. Never use bare px values.
- Default card padding: `--s5` (20 px) on desktop dense, `--s6` (24 px)
  on standard.
- Table row height: 40 px (compact) or 48 px (standard). Never 32 px
  — too tight to read at audit.

### Layout
- **Fixed top app bar (56 px)** with the Aditya Chemicals lock-up at
  left and user / environment indicator at right. The bar is white
  with a single `--border` bottom rule. **No shadow** under it.
- **Fixed left navigation (240 px)** also white-on-white, separated
  by hairline. Active item: `--primary-soft` background, `--primary`
  text, no other treatment.
- Body: max content width 1280 px, gutter `--s6`.
- Page header bar within the canvas: page title left, primary action
  far right, breadcrumb above the title.

### Motion & interaction
- **Almost no animation.** Inspection-ready software does not bounce.
- Allowed transitions: `background-color 120ms ease`, `border-color
  120ms ease`, `color 120ms ease`. That's it.
- **No fade-in on page load**, no slide-up on toasts (toasts simply
  appear, top-right, and dismiss after 6 s or on click).
- Modals: **instant**. No spring, no scale-from-0.96. They are present
  or they are not.
- Loading: a 1 px indeterminate progress line under the top app bar,
  not spinners or skeletons. For long ops, a discrete inline percentage.

### Hover & press states
- **Buttons hover:** `background` shifts to `--primary-hover`
  (primary) or `--canvas` (neutral outline). No lift, no shadow change.
- **Rows hover:** `background: var(--canvas)`. Cursor `pointer` only
  if the entire row is a link target.
- **Press:** no transform, no scale-down. The color shift is enough.
- **Focus visible:** 2 px ring in `--primary` at 25% opacity, always
  on (we serve regulated workflows; keyboard parity matters).
- **Disabled:** `opacity: 0.5`, `cursor: not-allowed`, **no other
  visual treatment**. Disabled buttons keep their structure so users
  can still see what action is unavailable.

### Imagery
- The product itself contains essentially no imagery.
- Where avatars are needed (e-signature attribution), they are
  monogram circles on `--canvas`, dark text, 1 px border. Never
  generated faces, never illustrated.
- The Aditya Chemicals logo is the only raster mark in the product
  and appears only in the top-left app-bar lock-up.

### Transparency, blur, gradients
- **Transparency:** modal backdrop only — `rgba(29, 41, 57, 0.5)`.
- **Blur:** never. There is no `backdrop-filter` anywhere in this system.
- **Gradients:** never. Not on buttons, not on hero, not on charts.
  Charts use flat fills from the palette.

### Tables (the real product surface)
The product is fundamentally a tabular system: lists of documents,
batches, deviations, audit entries. Tables get their own discipline:

- Header row: `--canvas` background, `--text-secondary` text,
  `--text-xs` uppercase + 0.06 em tracking, 1 px bottom border.
- Body rows: white, 1 px `--border` bottom, hover `--canvas`.
- Selected row: `--primary-soft` background, no border change.
- First column (usually a doc ID) is monospace, `--text`, 500 weight.
- Status column always rightmost-but-one, ID column always leftmost.
- Empty state: a single sentence in `--text-secondary`, centered,
  no illustration, no CTA inside the table body.

---

## ICONOGRAPHY

AC-QMS uses **[Lucide](https://lucide.dev)** as its icon system.
Lucide is loaded via CDN and rendered as 16 px line icons with
`stroke-width: 1.75`. The clean, even stroke and lack of fill match
the clinical aesthetic; we deliberately avoid Heroicons-solid,
Material's filled variants, and anything decorative.

### Rules
- **Size:** 16 px in dense chrome (nav, table actions, buttons);
  20 px in page-level affordances; 24 px maximum.
- **Color:** `currentColor`, so the icon inherits its context's
  text color. Never use color on an icon for decoration; an OOS
  warning icon is only red because the surrounding text/state is OOS.
- **Stroke:** 1.75. Never filled, never dual-tone.
- **Pairing:** icons are always paired with a text label in primary
  navigation and buttons (no icon-only nav items). Icon-only is
  acceptable in dense table row actions, with a tooltip.
- **No emoji, ever.** No Unicode pictographs as iconography
  (no ✅, ⚠️, 🟢). Status is conveyed by the pill component, not by
  a glyph.

### Critical icon mappings
| Concept | Lucide name |
| --- | --- |
| Document | `file-text` |
| Batch / lot | `package` |
| OOS / warning | `triangle-alert` |
| Deviation | `circle-alert` |
| Sign / e-signature | `pen-line` |
| Approve | `check` |
| Reject | `x` |
| Search | `search` |
| Filter | `sliding-horizontal` → fallback `filter` |
| User | `user` |
| Audit trail | `history` |
| Settings | `settings` |
| Lock (signed/locked record) | `lock` |

> ⚠️ **Substitution flag:** Lucide is selected as the closest CDN-available
> match to the brief's visual direction (clean, even-stroke, no
> fill, no decoration). The brief did not specify an icon system,
> and no codebase was provided. If AC-QMS already ships an icon
> system in production, replace this and update the table above.

### Logos & visual assets
The Aditya Chemicals corporate logo is the only brand mark in the
system. It is provided as a PNG and lives at:

- `assets/aditya-chemicals-logo.png` — full corporate lock-up
  (mountain glyph + "Aditya Chemicals" wordmark, deep purple).

There are **no illustrations, hero images, background patterns,
abstract product art, or texture files** in this system, and none
should be added. If a future page needs a "hero" surface, solve it
with type and layout, not imagery.

---

## Type substitution note

The brief specifies **Inter** for all type. Inter is loaded from
Google Fonts via the CDN (`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">`).
**JetBrains Mono** is loaded similarly as the monospace fallback for
document IDs and audit hashes. Both are open-source web fonts; no
local `.ttf` files are bundled. If AC-QMS standardizes on different
families in production, swap the `<link>` and update
`--font` / `--font-mono` in `colors_and_type.css`.

---

## Index — what's in this folder

```
README.md                       ← you are here
SKILL.md                        ← Claude Code / Agent SKills entry point
colors_and_type.css             ← canonical tokens (import this)

assets/
  aditya-chemicals-logo.png     ← corporate lock-up

preview/                        ← Design System tab cards
  brand-logo.html
  color-primary.html
  color-departments.html
  color-status.html
  color-neutrals.html
  color-oos.html
  type-family.html
  type-scale.html
  type-numerics.html
  spacing-scale.html
  radius-shadow.html
  borders.html
  buttons.html
  status-pills.html
  badges-departments.html
  inputs.html
  table.html
  nav-shell.html

ui_kits/
  ac_qms/
    README.md
    index.html                  ← interactive click-through prototype
    AppShell.jsx                ← top bar + left nav
    Button.jsx
    StatusPill.jsx
    DepartmentBadge.jsx
    Input.jsx
    Table.jsx
    PageHeader.jsx
    DocumentRow.jsx
    SignaturePanel.jsx
    OOSBanner.jsx
```

---

## Hosting the HTML prototype

The click-through prototype is static HTML — no build step required.

| Item | Detail |
| --- | --- |
| Entry point | `index.html` (sign-in). `Login.html` redirects here. |
| Demo users | `admin`, `qc.exec`, `qc.mgr`, `qa.exec`, `qa.mgr` |
| Local preview | `python -m http.server 8765` then open `http://localhost:8765/` |

**GitHub Pages:** repo → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.

**Netlify / Vercel / Azure Static Web Apps:** connect the repo; publish directory = project root; no build command.

---

## Iteration asks

This system was built from a written brief plus one corporate logo
— no Figma, no codebase. The two highest-leverage things you can
share to make it _perfect_:

1. **The real product code or Figma**, so the UI kit recreations
   become exact (current kit is a faithful interpretation of the
   tokens + visual direction, not a 1:1 of production).
2. **Confirmation of the icon system** in production. Lucide is a
   substitute; if AC-QMS already uses an internal sprite or another
   library, point me at it.
