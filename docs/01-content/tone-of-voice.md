---
title: Tone of Voice
cluster: 01-content
applies_to: all user-facing text (labels, messages, empty states, tooltips, alerts, toasts)
audience: AI agents generating or reviewing UI copy
source: Figma "Solar for CRDN" > Tone of Voice > Tone Overview, Tone Qualities, Do's and Dont's
---

# Tone of Voice

## Purpose

Use this document to decide **how** UI text should sound. For **how text must be formatted** (capitalization, dates, phone numbers, file names), see `writing-style.md`. For message-specific rules (success, warning, error), see `messaging-patterns.md`.

## Product and audience context

- The platform supports the day-to-day operations of internal franchise teams: field technicians, adjusters, general managers and administrators.
- Users are experienced professionals who know the business. They do not need hand-holding, but they value clarity and efficiency, especially when preventing mistakes, navigating workflows or understanding system feedback.
- Target voice: a **knowledgeable colleague** who knows the system deeply, communicates clearly and always makes the job easier, not more complicated.

## Core tone qualities

Apply all five qualities together. Each one has a focus and a correct/incorrect pattern.

| Quality | Attributes | What it means | Focus | Correct | Incorrect |
|---|---|---|---|---|---|
| Confident | Expert, Grounded, Direct | The product knows the workflows inside out and communicates with clarity and assurance to build trust. | Give users just enough direction to act quickly, without hesitation. | Cannot deactivate contacts with active jobs assigned. | It seems like this contact might still be assigned to something, so deactivation may not work. |
| Efficient | Clear, Concise | Every word counts. Users are busy and rely on speed. Avoid redundant guidance. | Reduce friction. Minimize wordiness. Let structure and labels carry meaning where possible. | Upload failed. File type not supported. | There was an issue uploading your file. It looks like the type you selected isn't supported by the system. |
| Approachable | Friendly, Calm, Human | Warm without being casual. Welcoming to all users regardless of technical level or job role. | Use everyday language. Write like a helpful teammate, not a script. | Your contact list is empty. Add a new one below. | This dataset currently contains zero records. Initiate creation of a new contact to begin population. |
| Respectful | Professional | Never assume users are confused or uninformed. Provide help when needed, but never overstep or condescend. | Support users across roles and experience levels, especially when something goes wrong or input is missing. | This field is required. | You forgot to fill this out! |
| Neutral | Informational, Balanced, Impartial | Calm and neutral, especially in system messages. Do not dramatize or sound emotional. | Keep a consistent tone in errors, success messages and alerts. No exclamation marks or dramatic copy. | Please enter a valid email address to continue. | Oops! That's not a proper email! |

## Rules

### MUST

- Use clear language that respects the user's time and experience.
- Keep a solution-oriented tone, especially in error and warning messages.
- Write consistently and follow the punctuation and capitalization rules in `writing-style.md`.
- Use full sentences when needed, but keep them concise.
- Stay neutral and professional, even when delivering bad news or blocking an action.

### MUST NOT

- Use emojis or multiple exclamation marks.
- Make the user feel at fault. Avoid words like "Oops!" or "You did this wrong."
- Overload with text. Avoid long paragraphs and redundant phrases.
- Assume too much. Keep accessibility in mind for all roles and experience levels.

## Quick self-check before outputting copy

1. Could a word be removed without losing meaning? Remove it. (Efficient)
2. Does it state what happened and what to do, with no blame? (Respectful, Neutral)
3. Is it free of emojis, "Oops", and exclamation marks? (Neutral)
4. Would a busy colleague understand it in one read? (Confident, Approachable)
