---
title: Data Display Patterns
cluster: 03-interaction-patterns
pattern: data-display
uses_components: Table, List, Section, Cards (KPI), Badges, Pills - Status, Avatar, Side Panel, Accordion, Illustrations, Spinner
audience: AI agents deciding how to present records and their states
source: Synthesized from 04-component-guidelines/data-and-content.md, page-structure.md, feedback.md
scope: cross-component behavior only. No tokens, no dimensional specs.
---

# Data Display Patterns

How to present collections, single records, statuses and data states.

> Provenance: component facts are from Figma. Items marked **(Derived)** are combinations or inferences.

## 1. Choose the structure

| You have | Use |
|---|---|
| Many records to compare and analyze | Table |
| One selected record's details | Section with lists (date, text, badge) |
| Label/value details of a selected item | List (Item) |
| Search results to open | Card Items |
| Counts or KPIs that act as shortcuts | KPI Cards |
| Photos or rooms as tiles | Room Cards, Photo Cards |
| Detail without leaving the page | Side Panel (View, Edit) |
| Collapsible groups (items, steps) | Accordion |

## 2. Data states every collection must cover

| State | Display |
|---|---|
| Loading | Loading state (Table Content: Loading; Spinner with descriptive text) |
| Populated | Normal content |
| No Results | A search or filter matched nothing (Derived meaning) |
| Empty | No data exists yet. Use an illustration plus a clear, friendly message |
| Error / Lost connection | Illustrations exist for Error and Lost connection |

Empty-state best practices: clear and friendly message, visual element (icon, illustration, color) to identify the situation, and customize the message to context or user when possible.

Card-level empty states exist too: a Room Card is Default (no cover, no items: "No items yet."), Empty (cover, no items) or Populated.

## 3. Showing status

| Meaning | Component |
|---|---|
| Informational, not interactive | Badge (purely ornamental, no actions) |
| Status the user can change or interact with | Status Pill (with dropdown) **(Derived)** |
| Active filter | Filter Pill (removable) |

- Item statuses use Badges: Restorable, Storage Only, Non-Salvageable.
- Entity statuses (Draft, Active, Canceled, Inactive, Closed, Payment Applied) use Pills or Badges depending on the entity; see the Status Comparison in `04-component-guidelines/data-and-content.md`.
- Use badges sparingly to avoid clutter; keep their content scannable and meaningful.
- Follow the color mapping defined per status; do not choose colors ad hoc.

## 4. Table content rules

- Cell types by data: text, text + badge, avatar + link, link, badge, icon, pill, header.
- Link cells navigate or trigger an action; badge cells show status; icon cells show information or actions.
- Selection modes per column: normal, checkbox, radio.
- Use Disabled cells for data that is restricted by conditions.
- Split long lists with Pagination (only above 25 items). See `navigation-and-wayfinding.md`.

## 5. Single record display

- Group related data into one section per topic (Job Details groups: General, Homeowner, Policy Holder, Contractor, Agency, and others).
- Assignment pages are composed of sections: Banner at top, then General, Billing Summary, Taxes, Program Requirements, Delivery, Items, Estimates.
- Values can be copied: links in lists may include a copy button and confirm with a 3-second tooltip.
- Dates are text details; time is optional.
- Records have View and Edit states. Read-only fields stay as text; computed fields (for example Items Reviewed, Cleaned, Stored, Non-Salvage) are calculated on non-cancelled estimates.

## 6. Identity visuals

- Avatar: image, initials (when no picture) or logo. Keep a consistent aspect ratio and give images alt text.
- Avatar group stacks avatars for a group of images. In Room Cards show **up to 5 images**; beyond that show an avatar with the remaining count `{{+n}}`.
- Pair avatar with a link in Card Items and table cells.

## 7. Progressive disclosure

- Accordions (photos per item, program steps) show Closed and Expanded; summarize when closed so users know what is inside.
- Hover states reveal actions (Photo Card overlay) and added interactivity.
- Side Panel shows comprehensive information about a selected item and lets users edit it there.

## 8. Do and Don't

| Do | Don't |
|---|---|
| Use Badge for read-only status | Make a Badge clickable |
| Provide empty, loading and no-results states | Leave a blank area |
| Show counts and what is attached accurately | Use generic labels like "limit reached" for a count |
| Highlight the selected item | Rely on hover alone to show selection |
| Keep status colors per mapping | Invent colors for new statuses |

## Decision checklist

1. Is the right structure chosen (section 1)?
2. Are loading, empty, no results and error states covered?
3. Is each status a Badge or a Pill for a reason?
4. Are read-only vs editable values clear?
5. Is long content paginated or collapsed?

## Documentation gaps

- Table sorting, column alignment, row selection behavior, sticky headers.
- Number, currency and unit formatting in cells.
- Truncation rules for long text.
- Written usage for KPI Cards.
- Illustration-to-situation mapping.
