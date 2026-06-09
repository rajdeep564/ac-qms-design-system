# AC-QMS UI Kit

Interactive click-through prototype of the **AC-QMS** product — Aditya
Chemicals' regulated Quality Management System. Built directly from
the design tokens in `colors_and_type.css` and the visual direction in
the root `README.md`.

## What's interactive
- **Dashboard** → KPI tiles + my review queue.
- **Documents** → filterable list with status chips and full-text
  search. Click any row.
- **Document detail** → spec view with parameters table, signatures,
  and audit trail. **Sign & approve** opens a 21 CFR Part 11
  e-signature modal that fires a toast on confirm.
- **OOS row** → opens the document detail with the OOS banner +
  Phase I investigation workspace.
- **Batch records / Deviations** → filtered list variants.
- **Audit trail** → system-wide event log.
- Top bar search and the Users / Settings routes are scaffolded but
  not wired.

## File map
```
index.html              ← entry
app.css                 ← all kit styles
data.js                 ← realistic QMS sample data on window.QMS_DATA
Icons.jsx               ← Lucide subset as React components
Atoms.jsx               ← Button, StatusPill, DepartmentBadge, Field, Input, Avatar
AppShell.jsx            ← top bar + left nav + toast + progress line
Dashboard.jsx           ← landing screen
DocumentsList.jsx       ← filterable list of documents
DocumentDetail.jsx      ← spec / record view with sigs + audit
OOSInvestigation.jsx    ← Phase I investigation workspace (linked from nav)
AuditTrail.jsx          ← system-wide event log
SignatureModal.jsx      ← 21 CFR Part 11 e-signature dialog
App.jsx                 ← top-level router
```

## Constraints honored
- Color is functional only. The teal `--primary` is the only accent;
  it appears on the primary CTA and the active nav. Departments live
  only as badges. OOS red appears only on the OOS row, OOS pill, the
  banner, and destructive buttons.
- No drop shadows on surfaces. Cards = white + 1 px hairline +
  6 px radius.
- One Inter family. Base 14 px. Tabular numerals everywhere numbers
  stack. Mono only for document IDs and timestamps.
- No animation beyond 120 ms color/border transitions, plus a 1 px
  indeterminate progress line under the top bar on route change.

## What was NOT built
A real codebase wasn't provided, so production-only screens were
omitted rather than invented:
- Batch record full body (we surface batches in a list only).
- Specs / methods authoring (we show one read-only spec).
- Users & roles administration (placeholder).
- Reports, exports, integrations.

If a Figma or repo gets shared, swap the JSX components and data
against it and update this README.
