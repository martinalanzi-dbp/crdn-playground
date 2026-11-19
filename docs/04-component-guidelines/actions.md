---
title: Actions (Buttons, Combo Button, Links)
cluster: 04-component-guidelines
family: actions
components: Button, Combo Button, Link
audience: AI agents choosing and composing action components in UI
source: Figma "Solar for CRDN" > Components > Buttons, Links
scope: usage guidance only. Tokens and dimensional specs are intentionally excluded.
---

# Actions

Components that let users trigger something or navigate. Label wording rules live in `01-content/microcopy.md` (CTAs: 1 to 3 words, specific verb, Title Case). Feedback that follows an action (toast, alert) is in `feedback.md` and `01-content/messaging-patterns.md`.

> Provenance: purposes, anatomy, types and states come directly from the Figma documentation. Items under "Rules" and "Guidance" are conclusions derived from those descriptions, not literal statements in the source.

## Choosing the right component

| Need | Use |
|---|---|
| Trigger the single most important action on a view | Button, Primary |
| Offer a supporting action next to a primary one | Button, Secondary |
| Offer a low-emphasis secondary or tertiary action | Button, Ghost |
| Confirm a positive outcome (form submission, completing a transaction) | Button, Success |
| Perform an action with irreversible consequences | Button, Destructive |
| One main action plus related alternative actions | Combo Button |
| Navigate to another page or section, or point to extra context | Link |
| Inline action inside an alert or toast | Link (typed to match the alert) |

## Button

Interactive element that guides user actions. Designed for clarity, consistency and versatility.

### Anatomy

1. **Leading icon** (optional): emphasizes the button's primary purpose and gives a clear, intuitive path to follow.
2. **Label** (required): concise, action-oriented text that communicates the purpose or outcome of clicking.
3. **Trailing icon** (optional): use when the focus is on the text and the icon is complementary or adds context.
4. **Background**: defines the button's visual presence.

Guidance:

- Always include a label. Add an icon only when it clarifies the action.
- Pick leading icon when the icon expresses the purpose of the action; pick trailing icon when the text is the focus.

### Types

| Type | Purpose | Use for |
|---|---|---|
| Primary | Focal point of the view. Distinctive, vibrant styling that draws attention. | Key actions, primary calls to action, crucial interactions, primary navigation. |
| Secondary | Complements Primary. Balanced, subdued, neutral appearance that keeps hierarchy intact. | Secondary actions. |
| Ghost | Subtle: transparent with a bordered outline. Integrates minimally without overpowering the hierarchy. | Secondary or tertiary actions. |
| Success | Signals positive actions and achievements; communicates validation and completion. | Form submission, successful transaction completion. |
| Destructive | Cautionary: warning or danger styling prompts users to proceed carefully. | Actions that may have irreversible consequences. |

Rules:

- Use Primary for the main action only, so it remains the focal point.
- Pair a Primary with a Secondary or Ghost for supporting actions to preserve hierarchy.
- Reserve Destructive for irreversible actions. Do not use it for ordinary cancel or close actions.
- Use Success sparingly, for completion or validation moments, not as a second Primary.

### Sizes

Two sizes exist, **Small** and **Medium**, built to fit different layouts and to emphasize hierarchy. The source does not say which context calls for which size; do not infer a rule. Use one size consistently within a single group of actions.

### States

Every type has: **Default, Hover, Focus, Disabled**.

- Use Disabled for actions that are unavailable at the moment.
- Focus must remain visible for keyboard users.

## Combo Button

A primary action combined with a dropdown of secondary, related options. Use when one button triggers a main action and the user may need alternatives, without adding more buttons to the layout.

### Anatomy

1. **Primary action button**: triggers the main action; usually has a clear, concise label or icon.
2. **Separator** (optional): visually distinguishes sections or categories within the dropdown menu when needed.
3. **Dropdown arrow**: small arrow icon signaling that more options exist and that clicking reveals a menu.
4. **Dropdown menu**: list of secondary options related to the primary action. Each option is selectable and maps to a distinct action.

Rules:

- Every menu option must be an action related to the primary action.
- Use a separator only when the menu has distinct groups.

## Link

Allows users to navigate between pages or sections, and can also supply additional information or context.

### Intended use

Links are made **mainly for alert and toast components**. Their types therefore match the alert themes, and hover adds interactivity themed to the same type.

### Types and states

| Type | Use |
|---|---|
| Default (primary) | General navigation or context links |
| Success | Inside success alerts or toasts |
| Error | Inside error alerts or toasts |
| Warning | Inside warning alerts or toasts |
| Info | Inside informational alerts or toasts |

States: **Default, Hover**. A Disabled state exists for the default type. Sizes available: SM, MD, LG.

Rules:

- Match the link type to the type of the alert or toast that contains it.
- Use a Link, not a Button, for navigation or lightweight context. Use a Button for actions that change data.

### Anatomy

A link is a **label** with an optional **leading icon** and an optional **trailing icon**.

## Documentation gaps

The source does not define the following; flag them instead of inventing rules:

- When to use Small versus Medium buttons.
- Maximum number of buttons per view, and their ordering.
- Explicit do and don't examples for Buttons.
- Loading state for Buttons.
- Link usage outside alerts and toasts.
