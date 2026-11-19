---
title: How to Use This Documentation
cluster: 00-overview
topic: how-to-use
audience: AI agents (primary) and the people who maintain this documentation
source: Structure of this documentation set; Figma "Solar for CRDN" file organization
scope: navigation of the docs, reading order, conventions and source precedence. No tokens, no component specs.
---

# How to Use This Documentation

This set turns the guidelines written in the Figma file "Solar for CRDN" into reusable markdown. It covers **best practices, usage and guidelines** only. **Tokens** (colors, type scales, spacing values, radius, shadows) and **component specs** (sizes, dimensions, padding) are intentionally excluded: read them from Figma variables or code.

## Map of the documentation

| Folder | Answers | Files |
|---|---|---|
| `00-overview` | What is this and how do I use it? | `principles.md`, `how-to-use.md` |
| `01-content` | How should text sound and read? | `tone-of-voice.md`, `writing-style.md`, `messaging-patterns.md`, `microcopy.md` |
| `02-layout-and-structure` | How do I lay out a screen? | `grid-and-layout.md`, `spacing-and-hierarchy.md` |
| `03-interaction-patterns` | How do components combine into flows? | `forms-and-input.md`, `actions-and-feedback.md`, `selection-and-search.md`, `navigation-and-wayfinding.md`, `data-display.md` |
| `04-component-guidelines` | When and how do I use each component? | `actions.md`, `inputs.md`, `feedback.md`, `navigation.md`, `data-and-content.md`, `page-structure.md` |
| `05-assets-and-brand` | Which icons, images, logos? | `iconography-usage.md`, `illustrations-and-photos.md`, `logo-and-favicon.md` |
| `06-governance` | What is approved and what changed? | `design-status.md`, `changelog.md` |

## Which file to read for a task

| Task | Read |
|---|---|
| Write any UI text | `01-content/*`, starting with `tone-of-voice.md` |
| Compose a screen | `02-layout-and-structure/*`, then `04-component-guidelines/page-structure.md` |
| Build a form | `03-interaction-patterns/forms-and-input.md`, then `04-component-guidelines/inputs.md` |
| Add buttons, confirmations or messages | `03-interaction-patterns/actions-and-feedback.md`, `04-component-guidelines/actions.md`, `feedback.md` |
| Show lists, tables or statuses | `03-interaction-patterns/data-display.md`, `04-component-guidelines/data-and-content.md` |
| Search, filter or select | `03-interaction-patterns/selection-and-search.md` |
| Decide navigation | `03-interaction-patterns/navigation-and-wayfinding.md`, `04-component-guidelines/navigation.md` |
| Use icons, logos or images | `05-assets-and-brand/*` |
| Decide when no rule exists | `00-overview/principles.md` |

## Recommended workflow for an agent

1. **Identify the user goal** and the role (see role-based navigation).
2. **Pick the pattern** in `03-interaction-patterns` to decide which components work together.
3. **Pick each component** with the "Choosing the right component" table in its `04` doc.
4. **Apply the component rules** (states, behaviors, approved copy).
5. **Write the copy** following `01-content` and the approved messages.
6. **Check layout and hierarchy** against `02-layout-and-structure`.
7. **Check state coverage**: loading, empty, no results, error, disabled.
8. **List assumptions**: anything you decided without a documented rule goes into a short "Assumptions" note.

## Conventions used in these documents

- **Front matter** describes title, cluster, components covered, audience, source and scope.
- **Provenance note** at the top of each file explains where rules come from.
- **Derived** marks conclusions inferred from visuals, variant names or several sources; they are not literal statements in Figma. Confirm them before treating them as policy.
- **Choosing the right component** tables map a need to a component.
- **Documentation gaps** lists what the source does not define. **Do not invent rules for these**; apply `principles.md` and flag the choice.
- **Source inconsistencies to confirm** lists conflicts, typos and contradictions found in Figma, with the default applied.
- Template placeholders use double braces, for example `{{entity_name}}`.
- Change history ("Changes:" entries per component) lives in `06-governance/changelog.md`, not in the component docs.

## Source precedence (when sources conflict)

1. Written rules on the specific component page in Figma.
2. "Tone of Voice" pages (Tone Qualities, Writing Style) for all content and copy. They override the legacy "✦ Content" page.
3. Foundations pages (Spacing, Border radius, Elevations, Layout, Logo, Icons).
4. Derived guidance in `03-interaction-patterns` and `00-overview`.

Sections labeled "OLD" in Figma (for example "OLD - Main Navigation") are treated as legacy unless the design team says otherwise.

## What this documentation does not contain

- Tokens and variables, component dimensions and visual specs (colors, sizes, padding, radius, shadows).
- Code, implementation snippets, or Code Connect mappings.
- Training Materials and logo systems for HUB, On-Site and Warehouse (not documented yet).
- Pages hidden or marked as incomplete in the Figma file, except where noted in each document.
- Content approved per feature that is still TBD in the source (many warning and error messages).

## Design status in Figma

Figma pages carry a **Design Status** badge (Approved, Awaiting review, In progress, Not Started) and a designer badge. The status of each page is recorded in `06-governance/design-status.md`. Check it before applying a component's rules: build from Approved pages, and flag Awaiting review and In progress pages as provisional.

## Keeping the documentation up to date

1. When a Figma page changes, update only the affected component doc and add the entry to the changelog.
2. Convert Derived items to firm rules (remove the marker) once confirmed by the design team.
3. Remove items from Documentation gaps when they are defined in Figma.
4. Do not copy values from variables into these files; link to the source of truth.

## Open questions for the design team

- Is the legacy side menu still used anywhere?
- Is the "✦ Content" page fully superseded by "Tone of Voice"?
- Which of the Derived rules should become official policy?
- Should typography and responsive behavior get written guidelines?
