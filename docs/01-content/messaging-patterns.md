---
title: Messaging Patterns
cluster: 01-content
applies_to: success messages (toasts), warning messages, error messages, field validation, dynamic confirmation text
audience: AI agents generating or reviewing system feedback copy
source: Figma "Solar for CRDN" > Tone of Voice > Writing Style (Success, Warning, Error Messages); ✦ Content (Confirmation Messages Validation, Error Messages Validation)
status: partially defined. Many action types are still TBD in the source; do not invent copy for them, apply the structure rules and flag the gap.
---

# Messaging Patterns

## Purpose

Structure and wording rules for system feedback. Voice comes from `tone-of-voice.md`; formatting from `writing-style.md`. For which component displays the message (toast, alert, inline), see `04-component-guidelines/feedback.md`.

Universal rules for every message:

- Neutral and professional. No exclamation marks, emojis or dramatic words.
- Solution-oriented: say what happened and, when it helps, what to do next.
- Never blame the user.
- No redundant text.

## Success messages

Structure: **object first, then past-tense verb**.

- Sentence case (first word capitalized only).
- No punctuation unless required for clarity.
- Use past-tense verbs (created, downloaded, updated).
- Put the object first: "Invoice successfully generated".

| Action type | Examples |
|---|---|
| Download | Photo-02 successfully downloaded · Photos ready to be downloaded |
| Update | Basement-01 successfully updated · Changes successfully updated |
| Create / Generate | Invoice successfully generated · Estimate successfully created |
| Deactivate | Contact successfully deactivated |
| File uploads, Form submission, Multi-item actions | TBD in source |

### Dynamic fields in confirmation messages

Confirmation messages (toasts) must include dynamic fields so users know exactly what was affected. In design files, dynamic fields are written with double braces and descriptive text.

Pattern: `{{entity_name}} details {{action_performed}} successfully`

- Apply the same structure to all actions: copying, deleting, saving, updating and others.
- Each message must include the relevant detail (the entity, and the action performed) so the user understands what changed.

## Warning messages

- **Title**: short, in Title Case. Example: `Incomplete Check Amount`.
- **Subtitle**: clear, full-sentence instruction in sentence case. Example: `Please allocate the entire amount before saving the payment`.

| Situation | Examples |
|---|---|
| Payment allocation | Incomplete EFT Amount · Incomplete Check Amount |
| Download, Update, Create/Generate, Deactivate, File uploads, Form submission, Multi-item actions, Missing information | TBD in source |

## Error messages

Use the same two-part structure as warnings:

- **Title**: short, in Title Case.
- **Subtitle**: clear, full-sentence instruction in sentence case.

All action-type examples are TBD in the source (download, update, create/generate, deactivate, file uploads, form submission, multi-item actions, payment allocation, missing information).

Copy patterns from the tone qualities that apply to errors:

| Correct | Incorrect |
|---|---|
| Cannot deactivate contacts with active jobs assigned. | It seems like this contact might still be assigned to something, so deactivation may not work. |
| Upload failed. File type not supported. | There was an issue uploading your file. It looks like the type you selected isn't supported by the system. |
| This field is required. | You forgot to fill this out! |
| Please enter a valid email address to continue. | Oops! That's not a proper email! |

Note: the source's Error Messages page repeats the Warning page's styling text and example ("Incomplete Check Amount"). Treat the Title Case title plus sentence-case subtitle structure as provisional for errors until the design team confirms.

## Field validation messages

Error messages for fields must be clearly indicated at the field. Document each field with its **trigger** and its **message**. Source examples (from a legacy page that is hidden in the file; treat as provisional):

| Field | Trigger | Message |
|---|---|---|
| Any required field | Field left empty | This field is required. |
| Phone number | Contains invalid characters (symbols or spaces not allowed) | Phone number can only include numbers. |

For new fields, define the same pairs: what triggers the error, and the exact message shown.

## Authoring checklist

1. Is the message type known (success, warning, error)? Use that type's structure.
2. Success: object first, past tense, sentence case, no trailing punctuation.
3. Warning/error: Title Case title, sentence-case full-sentence subtitle.
4. Dynamic values use `{{field_name}}` in design specs.
5. If the action type is TBD above, write the message by structure rules and flag it as new copy for review.
