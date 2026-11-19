---
title: Inputs (Input, Text Area, Search with Filters, Dropdown, Date Picker, File Upload, Selection Controls)
cluster: 04-component-guidelines
family: inputs
components: Input, Text Area, Search with Filters, Dropdown (single, multi-select, typeahead), Date Picker, File Upload (Drag & Drop, Uploads card), Checkbox, Radio Button, Toggle
audience: AI agents choosing and composing form and input components in UI
source: Figma "Solar for CRDN" > Components > Forms, Date Picker, File Upload, Selection Controls
scope: usage guidance only. Tokens, dimensional specs and per-component change history are intentionally excluded (change history belongs in 06-governance/changelog.md).
---

# Inputs

Components that collect information from users. Validation and error wording: `01-content/messaging-patterns.md`. Date and phone display formats: `01-content/writing-style.md`. Buttons that submit forms: `actions.md`.

> Provenance: purposes, states, behaviors and approved copy come directly from the Figma documentation. Lines marked "Derived" are conclusions from those descriptions, not literal source statements.

## Choosing the right component

| Need | Use |
|---|---|
| Short, single-line text, number or other data | Input |
| Longer, multi-line text (notes, comments, pasted emails) | Text Area |
| Search a list by a text match with a selectable filter | Search with Filters |
| Pick one option from a predefined list | Dropdown (single-select) |
| Pick several options from a predefined list | Dropdown (multi-select) |
| Pick one option from a long list by typing to filter | Dropdown (typeahead) |
| Pick one date | Date Picker, single date |
| Pick a start and end date | Date Picker, range |
| Upload one or more files | File Upload (default link or Drag & Drop) |
| Edit info for newly uploaded pictures | Uploads card |
| Select one or more options, multiple allowed | Checkbox |
| Select exactly one option from a few mutually exclusive ones | Radio Button |
| Turn a setting on or off | Toggle |

Derived: for a short list of mutually exclusive options use Radio Buttons; for a long list use a Dropdown.

## General form rules (apply to every input)

- Keep styling and sizing consistent across the design system.
- Label inputs clearly and concisely.
- Validate and give feedback so the entered data is accurate.
- Consider placeholder text or a default option for extra guidance.
- Avoid overuse of fields: include only the fields that are necessary.
- Show errors clearly at the field, with a message in the style defined in `01-content/messaging-patterns.md`.

## Input

Collects user-provided information such as text or numbers within a form or interface.

States: Default, Hover, Focus, Typing, Active, Filled, Disabled, Error. (Source note: the "Filled" definition in the source duplicates "Typing" and appears to be a copy error. Treat Filled as "the field contains a value".)

Sizes and when to use them:

| Size | Use for |
|---|---|
| SM | Concise information (e.g., name, email) |
| MD | Moderate-length entry (e.g., address, phone number) |

Phone number input: shows the country code inside the field, with a chevron because some cases need to choose among multiple phone numbers.

## Text Area

Multiline text entry for longer-form or user-generated content.

Guidance:

- Keep text area dimensions consistent across the interface.
- Provide clear instructions or placeholder text so users understand what is expected.
- Consider expandable text areas for larger content.
- Never make a text area so small that it hinders input.

Behavior:

- **Resizable:** supports vertical resizing through a handle at the bottom-right corner, so users can expand or reduce the visible area without relying only on internal scrolling. Useful for long-form content.
- **Vertical scroll:** when content exceeds the visible height, a scrollbar appears inside the field. Users can scroll, or resize manually if they need more space.
- **Character limit:** visually show the remaining character count and display a warning message when the limit is exceeded.
- A hint text can appear to help the user.

States: Default, Hover, Focus, Typing, Active, Filled, Disabled, Error.

Sizes and when to use them:

| Size | Use for |
|---|---|
| SM | Short notes, brief comments, compact forms with limited space |
| MD | Longer comments, reviews, moderate amounts of user-generated text |
| LG | Side panels or forms in modals needing more vertical space for longer notes |
| XL | Content-heavy cases, such as communications or notes where users paste long emails or detailed messages |

## Search with Filters

Lets users refine a search with predefined filters to find relevant information quickly and accurately. Used for the Job List.

- Predefined filters: **Contains** and **Starts With**.
- Placeholders: "Search contains..." for Contains; "Search starts with..." for Starts With.
- Results update dynamically as the user types, based on the selected filter.
- Default filter is Contains. The filter dropdown offers the *other* filter: it shows "Starts with" while Contains is active, and "Contains" while Starts With is active.

States: Default, Hover, Focus, Filled, Disabled.

## Dropdown

Select from a list of predefined options. Ideal for single-option selection from a list.

Guidance:

- Keep dropdown appearance and behavior uniform.
- Use clear, concise option labels.
- Consider placeholder text or default options to guide users.
- Avoid overly long lists; prioritize relevant options.

States: Default, Hover, Focus, Active, Filled, Disabled, Error.

Sizes and when to use them:

| Size | Use for |
|---|---|
| SM | Short lists or compact option menus |
| MD | Moderate-sized lists or categorized selections |

### Behaviors

| Behavior | Rule |
|---|---|
| Typeahead | Available for active dropdowns: the user types to find a specific option. A selected item has its own styling in the options list. |
| Loading results (with search) | A spinner icon gives feedback while options matching the typed text are searched. Always placed at the bottom of the search. |
| No results | A "No results found" state is shown when nothing matches. |
| Clear selection, multi-select | Provide an option to deselect all chosen items so users can start fresh. Always at the top of the list. Styled as a regular option, with no checkbox. |
| Clear selection, single-select and typeahead | A "Clear Selection" option resets the dropdown to its default state, deselecting the chosen option. Always at the top of the list. Styled as a regular option. |
| Scroll | When options exceed the available space, a scrollbar appears inside the list. Scrollbar is placed to the right of the options. |
| Multiple attributes | When one value (e.g., a product name) maps to several valid options, present a secondary selection (dropdown or expanded list) that includes additional identifying attributes, so users make an informed choice and don't pick the wrong one. |

## Date Picker

Simplifies and streamlines date selection (scheduling, deadlines, time-sensitive tasks).

- The calendar is populated once a date input is selected.
- Calendar days can be: **Current day**, **Selected day**, **Disabled day**.

### Single date selection

Use when only one date is relevant (appointment, deadline, special occasion).

- Click a day to choose it; the selected date is highlighted.
- Clicking a different day changes the selection.
- The date value must update as soon as a day is clicked.
- Source note: "clicking an already selected date may clear the selection, depending on the design". The behavior is not fixed in the source; confirm per use case.

States shown: date not selected, date selected.

### Range date selection

Use for planning events, project timelines, vacations.

- Click a start date, then click an end date to form the range.
- The whole range is highlighted, and each selected date is visibly distinguished.
- Users can change the range by clicking a different start or end date; the highlight updates accordingly.

States shown: date not selected, first date selected, range selected.

## File Upload

Lets users upload their own content. Commonly in forms, but can be a standalone element. Two variants: the **default file uploader** (selection through a link) and the **Drag & Drop** uploader.

### Usage

- Users can upload one or multiple files by selecting them through a link or dragging them into a designated area.
- Progress is shown with visual indicators such as a spinner.

### Drag & Drop states

- **Default, Hover, Disabled.**
- While files are dragged over the drop zone, its border and background change color to show the zone is active and ready.
- **Disabled** reflects a full session (per upload batch), not a lifetime total. The upload entry point (for example an "Upload Photo" link) stays enabled regardless.

### Loading states per file

Each file in progress has three states: **uploading**, **success**, **error**.

### Error

When a specific file cannot be uploaded, show its error state. Error messages must give clear guidance so the user can fix the problem.

### Limit reached

When the maximum number of items is reached:

- Show an **Alert above the drop zone** and switch the drop zone to **Disabled**.
- Customize the Alert's label and description per use case.
- The drop zone's own label must **always reflect what is actually attached** (for example "1 file added", "2 files added"). Never use a generic "limit reached" label there, because it doesn't tell the user what is currently attached.
- Typically pair this component with an Alert instance above it.

Approved copy for the Alert:

| Context | Label | Description |
|---|---|---|
| Manual Uploads (Files) | File limit reached | You've reached the maximum number of files that can be uploaded at once. |
| Rooms, Photos | Photo limit reached | You've reached the maximum number of photos that can be uploaded at once. |
| Items, Photos | Photo limit reached | You've reached the maximum number of photos that can be uploaded at once. |
| Photos (job-level) / Job Photos | Photo limit reached | You've reached the maximum number of photos that can be uploaded at once. |

The uploader commonly appears inside a drawer titled "Upload" with a close control.

### Uploads card (edit uploaded pictures)

Presents and organizes information for newly uploaded pictures, for example in a room. Made of four elements: avatar, icon container, input, text area.

- **Name** field is always required.
- **Description** field is optional.
- The **close** icon is always displayed. Clicking it deletes the card.

## Selection controls

### Checkbox

Select one or more options from a list. Use where multiple selections are allowed or needed.

- Use colors consistent with the design system.
- Differentiate checked and unchecked states with color or shading.
- Keep a standard size across the interface.
- Use clear labels.
- Group checkboxes that share a theme or category.
- Use positive wording.
- Do not show an excessive number of checkboxes on one screen without clear organization.

States: Unselected and Selected, each with Default, Hover, Focus, Disabled. A checkbox with a label has Normal, Hover, Focus, Selected.

### Radio Button

Select exactly one option from a list of mutually exclusive choices.

- Only one radio button in a group can be selected at a time.
- Use clear labels.
- Group radio buttons that share a theme or category.
- Limit options to a reasonable number, especially when space is limited.

States: Unselected and Selected, each with Default, Hover, Focus, Disabled.

### Toggle

Turn a setting or feature on or off. Ideal for binary choices; common in settings, preferences and configuration sections.

- Make sure the toggle represents a clear binary choice.
- Use subtle animation for a smooth transition between on and off.

States: Unselected and Selected, each with Default, Hover, Focus, Disabled.

## Documentation gaps

The source does not define the following. Flag them instead of inventing rules:

- Required-field indicator and optional-label conventions for form fields.
- Inline error placement and exact behavior of the Error state across all inputs (messages exist only as examples in `01-content/messaging-patterns.md`).
- Checkbox indeterminate state.
- Dropdown sizes beyond SM and MD; Input sizes beyond SM and MD.
- When a Date Picker should disable days (rules for the Disabled day).
- Date Picker range additional features (the section exists in Figma without content).
- Form layout (field order, grouping, column count).
