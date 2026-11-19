---
title: Design Principles
cluster: 00-overview
topic: principles
audience: AI agents making design decisions with the Solar for CRDN design system
source: Synthesized from all documents in clusters 01 to 05; the Figma file has no dedicated principles page
scope: principles that recur across the system. No tokens, no component specs.
---

# Design Principles

> Provenance: the Figma file does not state a list of principles. These are the rules that **repeat across independent pages** (tone, foundations, components), so they are **Derived** by synthesis. Each principle points to where it is grounded. Treat them as tie-breakers when a specific rule is missing.

## 1. One clear focal point

Each view has one main action and one main message. Primary actions are unique per view; supporting actions use lower emphasis; selected and active items are always visibly highlighted.

Grounded in: `04-component-guidelines/actions.md`, `03-interaction-patterns/actions-and-feedback.md`, `02-layout-and-structure/spacing-and-hierarchy.md`.

## 2. Least interruption that still works

Pick the lightest feedback that gets the user what they need: tooltip, then toast, then alert, then modal. Block the page only for irreversible or crucial decisions. Long processes run in the background.

Grounded in: `04-component-guidelines/feedback.md`, `03-interaction-patterns/actions-and-feedback.md`.

## 3. Consistency over invention

Reuse existing components, variants and variables. Spacing, radius, elevation and icons come from the defined sets; new values must follow the system's rules (for example the 4-pixel multiple). Do not create new patterns when one exists.

Grounded in: `02-layout-and-structure/spacing-and-hierarchy.md`, `05-assets-and-brand/iconography-usage.md`.

## 4. Confident, neutral, respectful voice

Copy is confident, efficient, approachable, respectful and neutral. No exclamation marks, emojis or dramatic words. Say what happened and what to do next. Never blame the user.

Grounded in: `01-content/tone-of-voice.md`, `messaging-patterns.md`, `microcopy.md`, `writing-style.md`.

## 5. Show the state of the system

The user always knows what is happening and what exists: loading, success, error, empty and no-results states are designed, not left blank. Counts and labels reflect reality (for example what is actually attached, not a generic "limit reached").

Grounded in: `03-interaction-patterns/data-display.md`, `04-component-guidelines/inputs.md`.

## 6. Protect the user from irreversible mistakes

Destructive actions are confirmed explicitly and use the Destructive style only for irreversible results. Completed data that is reported to external systems becomes read-only. Defaults are set to safe values (for example Quick Add defaults).

Grounded in: `04-component-guidelines/feedback.md`, `data-and-content.md` (Assignments, Quick Add).

## 7. Clarity before decoration

Badges are informational and used sparingly; illustrations carry a message; icons clarify but do not replace labels; shadows indicate layering. Anything ornamental must not carry actions or meaning.

Grounded in: `04-component-guidelines/data-and-content.md`, `05-assets-and-brand/*`.

## 8. Wayfinding at every level

Users always know where they are, where they can go and how to return: layered navigation, active states, job context in the header, breadcrumbs as a secondary aid that never replaces primary navigation.

Grounded in: `04-component-guidelines/navigation.md`, `03-interaction-patterns/navigation-and-wayfinding.md`.

## 9. Role-aware and context-aware

Navigation, fields and options depend on role and context (for example Project Manager lists only active Sales users of the franchise; navigation differs by role). Do not show options the user cannot use.

Grounded in: `04-component-guidelines/navigation.md`, `data-and-content.md`.

## 10. Accessible by default

Keep focus visible, provide alt text for images, ensure message styles contrast with the background, make tooltip triggers keyboard-focusable, and keep touch and safe areas respected on mobile.

Grounded in: `04-component-guidelines/actions.md`, `feedback.md`, `02-layout-and-structure/grid-and-layout.md`. The source gives only partial accessibility guidance, so apply this principle conservatively.

## 11. Do not invent; flag gaps

When the system is silent, use the closest documented rule, mark the choice as assumed and list it for review. Every document in this set ends with a **Documentation gaps** section for this purpose.

## Using the principles

1. Check the specific component or pattern doc first.
2. If silent, apply the principle that matches the situation.
3. If two principles conflict, prefer the one protecting the user from errors (principle 6), then clarity (7), then consistency (3).
4. Record the assumption and flag it.
