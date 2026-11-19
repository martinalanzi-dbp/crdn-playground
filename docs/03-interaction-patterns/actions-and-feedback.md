---
title: Actions and Feedback Patterns
cluster: 03-interaction-patterns
pattern: actions-and-feedback
uses_components: Button, Combo Button, Link, Alert, Toast, Modal, Spinner, Tooltip, Illustration (empty states)
audience: AI agents designing what happens when a user acts and how the system responds
source: Synthesized from 04-component-guidelines/actions.md, feedback.md, inputs.md, data-and-content.md and 01-content/messaging-patterns.md, microcopy.md
scope: cross-component behavior only. No tokens, no dimensional specs.
---

# Actions and Feedback Patterns

The loop: **user triggers an action -> system acknowledges -> system reports outcome**.

> Provenance: component facts (positions, durations, variants) are from Figma. Sequencing rules marked **(Derived)** combine those facts and are not literal Figma statements.

## 1. Choose the action component by impact

| Impact of the action | Component |
|---|---|
| The one main thing on the view | Button, Primary |
| Supporting action | Button, Secondary or Ghost |
| Completion or validation moment | Button, Success (sparingly) |
| Irreversible (delete, permanent settings) | Button, Destructive, behind a Destructive Modal |
| Main action plus related alternatives | Combo Button |
| Navigate or point to context | Link (not a Button) |

- Labels are 1 to 3 words, start with a specific verb and use Title Case (see `01-content/microcopy.md`).
- Icon buttons without labels get a Tooltip of at most 3 words naming the function.
- Disable actions that are unavailable; keep keyboard focus visible.

## 2. Choose the feedback by urgency and interruption

| Situation | Feedback |
|---|---|
| Needs attention or a response, may pause interaction | Alert (top right) |
| Informational or confirmation, no action required | Toast (bottom right) |
| Must confirm before an irreversible action | Destructive Modal |
| Completed action with option to continue | Success Modal |
| Process running | Spinner with descriptive text |
| Nothing to show yet | Empty state illustration with message |
| Extra context on hover/focus | Tooltip |

**(Derived)** Prefer the least interruptive option that still gets the user what they need. Modal is the heaviest because it blocks the page.

## 3. Standard flows

### Routine action (save, update, create)
1. User clicks the action. Show a Spinner or loading state if it takes time, with text such as "Submitting" or "Processing".
2. On success: Toast of type Success with `{{entity_name}} details {{action_performed}} successfully`. Closes after **5 seconds**.
3. On failure: error message (Toast or Alert depending on urgency; field errors stay at the field). Closes after **10 seconds**.

### Destructive action
1. User clicks a trigger (a regular action, not the Destructive button itself) **(Derived)**.
2. Destructive Modal highlights consequences and requires explicit confirmation using a Destructive button.
3. After completion, confirm with a Success Toast (or a Success Modal if the user may continue with related actions).

### Action that needs follow-up
Alerts or toasts that ask the user to do something close after **10 seconds** and may include a Link typed to match (Success, Error, Warning, Info).

### Copy to clipboard
Show a Tooltip confirming the copy; it stays for **3 seconds**.

### Background processes
Long jobs (for example photo export) run **in the background** so the user can keep working; tell the user when the result is ready (for example "Photos ready to be downloaded").

### Limits reached
Show an Alert in context (above the affected control), disable the control and keep its label factual. Wording per context is in `04-component-guidelines/inputs.md`.

## 4. Message anatomy by type

| Type | Structure |
|---|---|
| Success | Object first, past-tense verb, sentence case, no trailing punctuation |
| Warning | Title Case title + sentence-case full-sentence subtitle |
| Error | Same as warning (provisional) |
| Tooltip | Relevant, specific, never essential instructions |

Universal: neutral and professional; no exclamation marks, emojis or dramatic words; solution-oriented; never blame the user. Full rules: `01-content/messaging-patterns.md`.

## 5. Choose the type to match the meaning

Alert and Toast types: Neutral, Success, Error, Warning, Info. Links inside them match the type. Use an accessible style that contrasts with the background.

## 6. Do and Don't

| Do | Don't |
|---|---|
| One Primary button per view | Two Primary buttons competing |
| Destructive style only for irreversible actions | Use Destructive for ordinary cancel/close |
| Toast for routine confirmations | Modal for routine confirmations |
| Keep messages short and specific | Put essential instructions in a tooltip |
| Describe the loading state in text | Show an unlabeled spinner for long waits |
| Let the user dismiss alerts/toasts with the X | Rely only on auto-close |

## Documentation gaps

- Stacking and ordering of multiple alerts/toasts.
- When an alert must stay until dismissed.
- Modal dismissal (backdrop, Esc) and button order.
- Undo patterns.
- Error copy for most action types (TBD in source).
- Loading state for Buttons.
