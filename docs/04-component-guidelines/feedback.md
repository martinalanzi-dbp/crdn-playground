---
title: Feedback (Alerts, Toasts, Modals, Spinner, Tooltip)
cluster: 04-component-guidelines
family: feedback
components: Alert, Toast, Modal (Default, Destructive, Success), Spinner, Tooltip
audience: AI agents choosing and composing system-feedback components in UI
source: Figma "Solar for CRDN" > Components > Alerts & Toast, Modals, Spinner, Tooltip
scope: usage guidance only. Tokens, dimensional specs, code snippets and per-component change history are intentionally excluded (change history belongs in 06-governance/changelog.md).
---

# Feedback

Components that tell users what the system is doing or what just happened. Message wording and structure: `01-content/messaging-patterns.md` (success, warning, error) and `01-content/microcopy.md` (tooltips). Tone: `01-content/tone-of-voice.md`.

> Provenance: purposes, usage, timings and states come directly from the Figma documentation. Lines marked "Derived" are conclusions from those descriptions, not literal source statements.

## Choosing the right component

| Situation | Use |
|---|---|
| Critical or urgent information that needs prompt attention or a response | Alert |
| Non-critical, transient confirmation or update; no action required | Toast |
| The user must confirm a potentially irreversible action | Modal, Destructive |
| Confirm that an action completed, with a chance to continue or close | Modal, Success |
| Focus the user on crucial information, or collect input or confirmation for a task | Modal, Default |
| A process is running and the user must wait | Spinner |
| Extra, nonessential context on hover or focus; or naming an icon button | Tooltip |
| Brief confirmation that something was copied | Tooltip |

Derived: if the message needs no action and doesn't interrupt, prefer a Toast; use an Alert only when attention or a response is needed. A Modal is the heaviest option because it blocks the page.

## Types (Alert and Toast)

Both Alert and Toast come in five types: **Neutral, Success, Error, Warning, Info**. Choose the type that matches the meaning of the message. Pick an accessible style that contrasts with the background.

## Alert

Immediate notification for critical or urgent information that demands prompt attention. It conveys messages or actions that may affect the user's current session and require acknowledgement or an immediate response.

- Reserved for critical information or urgent actions.
- Displayed in the **top right** corner.
- May contain actionable buttons that require user input.
- Grabs immediate attention and can pause user interaction.
- Messages must be clear, concise and informative.

## Toast

Non-critical, transient notification: brief information that does not interrupt the workflow, or an update or confirmation that needs no immediate action.

- Appears briefly and then disappears.
- Displayed in the **bottom right** corner.
- Minimal or no user interaction.
- Use for non-critical, informational messages.
- Messages must be clear, concise and informative.

## Closing time (Alert and Toast)

Both close automatically after a set time, unless the user closes them first with the "X" icon.

| Message kind | Closes after | Why |
|---|---|---|
| Success | 5 seconds | Usually positive and needs no input, so it can be dismissed quickly. |
| Warning / Error | 10 seconds | Stays slightly longer so users can read and understand it. |
| Action-oriented (prompts the user to do something) | 10 seconds | Gives the user time to respond. |

Alerts and toasts can include a Link styled to match their type (see `actions.md`).

## Modal

Temporary window on top of the current page that grabs the user's focus to present crucial information or require confirmation for an action.

- Can show text, lists and images.
- Usually includes buttons to complete a task, confirm an action or close the modal.
- **Blocks interaction with the underlying page** until the modal is closed or confirmed.

### Variants

| Variant | Use |
|---|---|
| Default | General modal for information or tasks. Covers messages that inform users about important information, system updates, or success and error notifications (the "Info" modal in the documentation). |
| Success | Informs that an action completed successfully. Shows a confirmation message and may offer to close or to continue with related actions. |
| Destructive | Confirms potentially irreversible actions, such as deleting data or changing permanent settings. Highlights the consequences and **requires explicit user confirmation** before proceeding. |

Derived: pair Destructive modals with a Destructive button for the confirming action (see `actions.md`).

### Content-specific modals

The file also defines modals whose content is tied to a business object: **Job** (default), and **Room** (Preview and Edit). Use them only for those objects; their content structure is specific to each.

## Spinner

Animation that communicates a loading state: something is happening in the background. It manages expectations during loading or processing.

- Show it when starting a process that can take time, such as fetching data or complex calculations, to signal the system is working on the request.
- Tell users their request was received and the action will soon complete.
- Describe the state accurately in the accompanying text, for example "Loading", "Submitting", "Processing".
- Use subtle animation.
- Several sizes exist. Match the size to the surrounding element. The source does not state which size fits which context.

Spinner is also the loading indicator inside Dropdown search and File Upload (see `inputs.md`).

## Tooltip

Shows additional information on **hover or focus** that is contextual, helpful and nonessential, giving clarity to the user.

Use a tooltip to:

- Reveal the names of icon buttons that have no visual label.
- Add context or explanation to an element that needs it.
- Confirm that an item was copied. This tooltip stays visible for **3 seconds**.

Content rules (from `01-content/microcopy.md`): keep it relevant and specific; never put essential task instructions in a tooltip because it is not persistent; icon-button tooltips use no more than 3 words describing the button's function.

Details:

- Two sizes exist: XS and SM.
- A tooltip can optionally show a **"Learn more" link** pointing to a configured URL. When the property is off, the tooltip is unchanged.

Derived: because tooltips appear on hover or focus, make sure the trigger is keyboard-focusable.

## Documentation gaps

The source does not define the following. Flag them instead of inventing rules:

- Whether alerts and toasts stack, and how multiple simultaneous messages are ordered.
- When an alert should be persistent instead of auto-closing.
- Modal close behavior (backdrop click, Esc key) and button order inside modals.
- Which spinner size applies to which context.
- Tooltip placement rules relative to the trigger.

## Source inconsistencies to confirm

| Topic | Inconsistency |
|---|---|
| Alert vs Toast position | The Toast purpose says it appears "at the top or bottom of the screen", but its usage says bottom right. This document follows the usage (bottom right). |
| Closing-time text | The same paragraph is used for both components and starts "Alerts should automatically close...". It is applied here to both Alerts and Toasts. |
| Alert criticality | Alerts are "reserved for critical information", yet Success and Info alert types exist. |
| Info modal | The documentation has an "Info Modals" section, but the only variants in the file are Default, Destructive and Success. Info is treated here as the Default modal. |
