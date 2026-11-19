---
title: Design status
section: 06-governance
audience: AI agents
source: Solar for CRDN (Figma), "Design key" on each page, read on 2026-11-19
status: snapshot; Figma is the source of truth and changes over time
---

# Design status

Review status and assigned designer for every Figma page, as shown by the **Design key** (Design Status badge + "ASSIGNED TO" designer badges) at the top of each page.

This is a **snapshot taken on 2026-11-19**. Re-read the Design key in Figma before relying on it for a decision that matters.

## How to use this file

1. **Check the status of the component before applying its guidance.** Find the component's row below, then act on the rule for its status.
2. **Treat Approved as safe to build from.** Guidance in the other docs for Approved pages can be used as written.
3. **Treat Awaiting review and In progress as provisional.** Use the guidance, but tell the user it may change and name the assigned designer.
4. **Ask the assigned designer when the status is missing.** Figma's own rule: if a component has no indicator, contact its designer.
5. **Do not infer status from documentation completeness.** A page can be well documented and still be In progress.

## Status definitions

Wording is the Figma definition, lightly condensed.

| Status | Meaning | Agent behavior |
|---|---|---|
| Approved | Design review completed and ready for the development phase. | Build from it. |
| Awaiting review | Pending design review; changes may still occur. | Build from it, flag as provisional. |
| In progress | Screen or component still in progress. | Do not treat as final; confirm with the designer. |
| Not started | Screen or component pending start. | No design exists; do not invent one. No page currently has this status. |

## Summary

Of 40 pages with a badge: 33 Approved, 6 Awaiting review, 1 In progress, 0 Not started. Five pages carry no badge (see "Pages without a status badge").

## Components

| Page | Status | Designer(s) |
|---|---|---|
| Alerts & Toast | Approved | Juliana Raimondi |
| Assignments | **Awaiting review** | Sofía Laborda |
| Avatar | Approved | Juliana Raimondi |
| Badges | Approved | Juliana Raimondi |
| Breadcrumbs | Approved | Sofía Laborda |
| Buttons | Approved | Juliana Raimondi |
| Cards | Approved | Miranda Logioia |
| Communication | **Awaiting review** | Sofía Laborda |
| Date Picker | Approved | Andrea Silva |
| File Upload | Approved | Andrea Silva |
| Forms | **In progress** | none shown |
| Header | Approved | Juliana Raimondi, Sofía Laborda |
| Illustrations | Approved | Juliana Raimondi, Sofía Laborda |
| Items | Approved | Juliana Raimondi, Sofía Laborda |
| Links | Approved | Juliana Raimondi |
| List | Approved | Sofía Laborda |
| Modals | **Awaiting review** | Sofía Laborda |
| Navigation | Approved | Sofía Laborda, Teresita Ambrosio |
| Pagination | Approved | none shown |
| Photos | **Awaiting review** | Sofía Laborda |
| Pills - Filter | Approved | Sofía Laborda |
| Pills - Status | Approved | Sofía Laborda |
| Rooms | **Awaiting review** | none shown |
| Sections | Approved | Juliana Raimondi |
| Selection Controls | **Awaiting review** | none shown |
| Side Panel | Approved | Juliana Raimondi |
| Spinner | Approved | Juliana Raimondi |
| Table | Approved | none shown |
| Tabs | Approved | Juliana Raimondi, Sofía Laborda |
| Tooltip | Approved | Sofía Laborda |
| Wizard | Approved | Sofía Laborda |

## Foundations

| Page | Status | Designer(s) |
|---|---|---|
| Colors | Approved | Juliana Raimondi, Sofía Laborda |
| Typography | Approved | Andrea Silva |
| Elevations | Approved | none shown |
| Spacing | Approved | none shown |
| Border radius | Approved | none shown |
| Layout | Approved | Andrea Silva |
| Icons | Approved | Andrea Silva |
| Logo | Approved | Sofía Laborda |
| Favicon | Approved | Sofía Laborda |

## Pages without a status badge

No Design key was found on these pages. Do not read the absence as Approved.

| Page | Note |
|---|---|
| Tone Qualities | Content page (Tone of Voice). Treated as the authority for tone in `01-content/`. |
| Writing Style | Content page (Tone of Voice). Same. |
| Training Materials | Page name carries a red marker. Not documented in this set. |
| Logos Systems (HUB, ON-SITE & WAREHOUSE) | Not documented in this set. |
| Documentation, ✦ Content, ✦ Figma | Meta pages. "✦ Content" is treated as legacy. |

## Designers

| Designer | Role shown in Figma | Pages assigned (as sole or co-designer) |
|---|---|---|
| Juliana Raimondi | Product Designer | Alerts & Toast, Avatar, Badges, Buttons, Colors, Header, Illustrations, Items, Links, Sections, Side Panel, Spinner, Tabs |
| Sofía Laborda | Product Designer | Assignments, Breadcrumbs, Colors, Communication, Favicon, Header, Illustrations, Items, List, Logo, Modals, Navigation, Photos, Pills - Filter, Pills - Status, Tabs, Tooltip, Wizard |
| Andrea Silva | not stated in the badge copy read | Date Picker, File Upload, Icons, Layout, Typography |
| Teresita Ambrosio | Design Lead | Navigation |
| Miranda Logioia | not stated in the badge copy read | Cards |
| Nacho Domínguez | not stated in the badge copy read | A badge exists, but no page uses it |

Changelog authors also include these names. See `changelog.md`.

## Provisional guidance in this doc set

Docs that rely on non-Approved pages. Flag these to the user when they apply.

| Page | Status | Where it is documented |
|---|---|---|
| Forms | In progress | `04-component-guidelines/inputs.md`, `03-interaction-patterns/forms-and-input.md` |
| Selection Controls | Awaiting review | `04-component-guidelines/inputs.md` |
| Modals | Awaiting review | `04-component-guidelines/feedback.md` |
| Assignments | Awaiting review | `04-component-guidelines/data-and-content.md` |
| Communication | Awaiting review | `04-component-guidelines/data-and-content.md` |
| Rooms | Awaiting review | `04-component-guidelines/data-and-content.md` |
| Photos | Awaiting review | `04-component-guidelines/data-and-content.md`, `05-assets-and-brand/illustrations-and-photos.md` |

Locations come from where each page is named in the docs. Cross-cutting docs in `03-interaction-patterns/` may also draw on them.

## Source inconsistencies to confirm

- **Forms is In progress with no designer.** It is a high-use page, and it has the most change entries in `changelog.md`. Confirm who owns it.
- **Rooms and Selection Controls are Awaiting review with no designer.** Nobody is named to ask.
- **Approved pages without a designer** (Pagination, Table, Elevations, Spacing, Border radius): the badges may be hidden rather than empty.
- **Training Materials** has a red marker in its page name but no status badge. The meaning of the marker is not documented.
- **Tone of Voice pages have no status**, yet they are the source of truth for tone.
