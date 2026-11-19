---
title: Forms and Input Patterns
cluster: 03-interaction-patterns
pattern: forms-and-input
uses_components: Input, Text Area, Dropdown, Date Picker, File Upload, Checkbox, Radio Button, Toggle, Button, Alert, Side Panel, Modal
audience: AI agents composing forms and data-entry flows
source: Synthesized from 04-component-guidelines/inputs.md, actions.md, feedback.md, page-structure.md and 01-content/*
scope: cross-component behavior only. Per-component rules stay in 04. No tokens, no dimensional specs.
---

# Forms and Input Patterns

How to combine input components into a complete data-entry experience.

> Provenance: every rule here is traceable to a component or content doc. Rules marked **(Derived)** combine several sources or extend them and are not literal statements in Figma. No dedicated "pattern" page exists in the design file for forms, so confirm Derived items with the design team.

## 1. Pick the control by the kind of answer

| The user must give | Control |
|---|---|
| Short text or number | Input |
| Long or pasted text | Text Area |
| One of a few mutually exclusive options | Radio Button |
| One of many options | Dropdown (typeahead if the list is long) |
| Several options | Checkbox group, or multi-select Dropdown |
| On/off setting | Toggle |
| One date / a date range | Date Picker single / range |
| Files or photos | File Upload |

**(Derived)** Few options visible at once: Radio. Many options: Dropdown. Do not mix controls for the same question type within a form.

## 2. Form-wide rules

- Include only the fields that are necessary; avoid overuse of fields.
- Label every field clearly and concisely; use placeholder text or a default option only as extra guidance, never as the label **(Derived)**.
- Keep styling and sizing consistent across the form.
- Validate input and give feedback so the data is accurate.
- Group checkboxes or radios that share a theme or category.
- Use positive wording for checkbox labels.
- Use consistent formats for display of dates and phone numbers (see `01-content/writing-style.md`).
- Defaults that are fixed by product rules must be pre-filled (example: Quick Add defaults Quantity to 1 and Status to Restorable; Unit of Measure is shown but not editable). See `04-component-guidelines/data-and-content.md`.

## 3. Field states in a form

| State | Meaning in a form |
|---|---|
| Default | Waiting for input |
| Hover / Focus | Interaction feedback; Focus must stay visible for keyboard users |
| Typing / Active | The user is entering a value |
| Filled | The field contains a value |
| Disabled | Not editable now. For read-only data, show it as text rather than a disabled field **(Derived)** |
| Error | Value rejected; show message at the field |

## 4. Validation and errors

1. Show the error **at the field**, not only in a global message.
2. Write each message as a **trigger + message** pair (what causes it, exact text). Example: empty required field -> "This field is required."; invalid phone characters -> "Phone number can only include numbers."
3. Messages are neutral, solution-oriented and never blame the user. See `01-content/messaging-patterns.md` and `tone-of-voice.md`.
4. Character-limited text areas show remaining characters and warn when the limit is exceeded.
5. Chained constraints between fields are stated in the rules for the entity (example: Assignment Received must be on or after the job's Loss Reported date; First Pickup on or after Assignment Received). When a later field depends on an earlier one, enforce it when the user picks the value **(Derived)**.

## 5. Submitting

- One **Primary** button for the form's main action; **Secondary** or **Ghost** for supporting actions such as cancel. Never two Primary buttons.
- Use the Success button type only for the completion moment of a submission, sparingly.
- Disable actions that are currently unavailable (for example while required data is missing) **(Derived)**.
- After submitting, confirm with a **Toast** using the pattern `{{entity_name}} details {{action_performed}} successfully`. See `actions-and-feedback.md`.
- While saving, show a Spinner with a text that describes the state ("Submitting", "Processing").

## 6. Where forms live

| Container | Use for |
|---|---|
| Section (Edit variant) | Editing a group of fields for a record in the page (for example Assignment General, Taxes, Delivery) |
| Side Panel (Edit / Add states) | Create or edit without leaving the page (Job Creation, Room, Add Estimate) |
| Modal | Focused task or confirmation that blocks the page |

Edit-in-place pattern: records have a **View** (Default) state and an **Edit** state. Users read in View and switch to Edit to change values **(Derived from Default/Edit variants)**.

## 7. Special input patterns

### Dependent options
When one value maps to several valid options (for example a product with several attributes), show a secondary selection with the identifying attributes so the user does not pick the wrong one.

### Dropdowns with search
Typeahead filters while typing, shows a spinner at the bottom while searching, shows "No results found" when empty, and always offers **Clear Selection** at the top of the list.

### Uploads
- Allow one or many files via link or drag and drop; show per-file uploading, success and error.
- On limit reached: Alert above the drop zone, drop zone disabled, and the drop zone label keeps showing what is attached (for example "2 files added"), never a generic "limit reached".
- After upload of pictures, an Uploads card collects **Name (required)** and **Description (optional)**; the close icon deletes the card.

### Sequential edit rules
In flows with program steps, only the **next** step is editable. Completed and future steps are read-only because completed data may already be reported to external systems (Xact/Symbility).

## Decision checklist

1. Is every field necessary? Remove the rest.
2. Does each question use the right control (section 1)?
3. Are defaults, read-only fields and dependencies defined?
4. Does each field have a trigger + message pair for errors?
5. One Primary action; confirmation toast and loading state defined?

## Documentation gaps

- Required-field and optional-label markers.
- Field order, grouping and column layout.
- Unsaved-changes handling when leaving a form or panel.
- Whether validation runs on blur, on typing or on submit.
- Inline help placement beyond the hint text for Text Area.
