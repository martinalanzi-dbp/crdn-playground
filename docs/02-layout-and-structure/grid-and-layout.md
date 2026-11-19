---
title: Grid and Layout
cluster: 02-layout-and-structure
topic: grid-and-layout
audience: AI agents composing page and screen layouts
source: Figma "Solar for CRDN" > Foundations > Layout (Grid); page-structure and component docs for context
scope: layout configurations and structural rules. Exact dimensions, column widths, gutters and breakpoints are intentionally excluded (they are specs/tokens).
---

# Grid and Layout

How screens are divided into regions. For the components that fill those regions see `04-component-guidelines/page-structure.md` and `navigation.md`.

> Provenance: the Layout page in Figma is almost entirely visual (labeled grid diagrams, with no written rules). The configurations below are the ones it defines. Statements marked **(Derived)** are conclusions from the diagrams or from other pages, not literal text.

## Defined layout configurations

| Configuration | Regions | Use for |
|---|---|---|
| Desktop: left navigation + content | Left nav, gutter, main content | Standard application screens (lists, job pages, detail pages) |
| Desktop: left navigation + content + right panel | Left nav, gutter, main content, right panel | Screens that need a persistent secondary area next to content, such as a Side Panel (Derived) |
| Landing pages | Centered multi-column grid with margins on both sides, no left nav | Marketing-style or standalone pages outside the app shell (Derived) |
| Mobile | Single content column with side margins, a top safe area and a bottom safe area; underlying 4-column grid | Phone screens |

Notes:

- Desktop configurations are designed on a **1440 px reference width** (named in the Figma headings). Other widths and breakpoints are not defined.
- The left navigation has a fixed region at the left and the content region sits next to it, separated by a gutter. Main content takes the remaining width.
- The landing-page grid is **12 columns**; mobile uses **4 columns**.
- The mobile layout accounts for the **iOS safe area** at top and bottom; keep content and controls out of those zones.

## Rules

1. Place content in the content region only. Navigation lives in the left navigation region (see `04-component-guidelines/navigation.md`).
2. Use the **right panel** configuration when a Side Panel is open next to content **(Derived)**; the content region becomes narrower rather than the page growing.
3. Keep consistent side margins on every layout; do not let content touch the screen edge.
4. Align elements to the column grid of the configuration used.
5. On mobile, use the 4-column grid and respect the safe areas.
6. Use the Header at the top of the content region to give page context, with an optional Alert above it (see `page-structure.md`).

## Structure of a typical application page (Derived)

1. Left navigation (role-based)
2. Content region:
   1. Alert area (optional, only when needed)
   2. Header (page title, or Job Header with key job facts and tabs)
   3. Sections / Table / Lists
   4. Pagination for long lists
3. Right panel or Side Panel (optional)

## Documentation gaps

- Breakpoints and how layouts change between desktop, tablet and mobile (responsive navigation exists for Tablet and Mobile, but no layout rules).
- Tablet grid.
- Maximum content width and behavior on screens wider than the reference width.
- Whether the left navigation collapses at smaller widths in the current design (the legacy side menu supports collapse; see `navigation.md`).
- Gutter and margin usage rules in written form.
- Responsive behavior of tables and cards.

## Source inconsistencies to confirm

- The Layout page uses the term "Left nav" while the navigation page documents role-based top navigation and a legacy side menu. Confirm which one the left region represents today.
