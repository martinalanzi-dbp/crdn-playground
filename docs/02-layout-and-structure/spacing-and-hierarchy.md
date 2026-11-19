---
title: Spacing and Hierarchy
cluster: 02-layout-and-structure
topic: spacing-and-hierarchy
audience: AI agents deciding spacing, shape, depth and emphasis
source: Figma "Solar for CRDN" > Foundations > Spacing, Border radius, Elevations; component docs for emphasis rules
scope: rules and principles only. Spacing values, radius values, shadow values and type scales are tokens and are intentionally excluded.
---

# Spacing and Hierarchy

How consistent spacing, shape and depth create order, and how emphasis is assigned.

> Provenance: Spacing, Border radius and Elevations come from written Foundation pages. Emphasis rules in the last section are **(Derived)** from component docs.

## Spacing

- Every design element and screen aligns to a **4-pixel spacing grid**. This keeps a harmonious, predictable relationship among elements.
- Follow the grid **meticulously across all components and screens** (the source states this emphasis explicitly).
- Use only values from the spacing variables; do not introduce ad hoc distances.

### Creating a new spacing value

- Any new spacing variant must be a **multiple of 4 pixels**.
- Record it in the **"Spacing" variable collection** (local variables) so it remains reusable and consistent across screen sizes and resolutions.

## Border radius

- Radius follows a **4-pixel increment pattern** across all components, for a uniform and predictable look.
- Radius and spacing share one unified grid to avoid confusion between them.
- Do not use a radius outside the defined variables. Follow the same rule as spacing for new values: multiples of 4, documented in the variable collection.

## Elevation

- Elevation adds depth and **hierarchy** through shadow and light so elements are visually distinct.
- Four levels exist: SM, MD, LG, XL. Use the lowest level that creates the needed separation, and use higher levels only for layers that sit above content such as overlays **(Derived)**.
- Use the predefined elevation styles; do not write custom shadows.

## Visual hierarchy (Derived from component docs)

| Level of emphasis | How the system expresses it |
|---|---|
| Single focal action per view | Primary Button; supporting actions use Secondary or Ghost |
| Critical, urgent message | Alert at top right |
| Routine confirmation | Toast at bottom right (less intrusive) |
| Blocking focus | Modal (blocks the page) |
| Page context | Header at the top; Job Header on job pages |
| Navigation levels | Primary, secondary, tertiary (see `04-component-guidelines/navigation.md`) |
| Status | Badge for informational, Pill for interactive status |
| Selected item | Always highlighted (Tree View, tabs, menu) |

Rules:

1. One focal point per view; avoid competing Primary actions.
2. Use badges sparingly to prevent visual clutter.
3. Group related information in a Section so structure communicates relationship.
4. Use depth (elevation) only to indicate layering, not decoration.
5. Typography: the Foundations page documents type specimens only, with no written usage rules; use the typography styles defined in Figma and do not set arbitrary sizes.

## Decision checklist

1. Is every gap and size a multiple of 4 and taken from the Spacing variables?
2. Is every radius from the variables?
3. Does elevation reflect real layering?
4. Is there exactly one focal action?
5. Are selected and active items visibly distinguished?

## Documentation gaps

- Which spacing step to use for which relationship (inside a component, between components, between sections).
- Typography usage rules (heading levels, body size per context, line length).
- When to use each elevation level.
- Density rules (compact vs comfortable) for tables and lists.

## Source inconsistencies to confirm

- The Border radius page tells readers to document radius variables in the "Spacing" collection, while the title of that block says "Border radius variables". Confirm whether a separate Radius collection exists.
- Elevation levels are listed XL first with the lightest shadow and SM last with the heaviest, which reverses the usual size-to-depth logic. Confirm the intended order before relying on names.
