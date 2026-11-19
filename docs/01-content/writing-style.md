---
title: Writing Style
cluster: 01-content
applies_to: capitalization, headings, body text, dates, phone numbers, file names
audience: AI agents generating or reviewing UI copy
source: Figma "Solar for CRDN" > Tone of Voice > Writing Style (Headings, Body Text, Date Formats, Phone Numbers, Files); ✦ Content > Writing Style (legacy)
---

# Writing Style

## Purpose

Formatting rules for text. For voice and attitude, see `tone-of-voice.md`. For message structure, see `messaging-patterns.md`. For CTAs and tooltips, see `microcopy.md`.

The goal is consistency, usability and accessibility across all digital interfaces, for anyone writing text: designers, developers, product managers.

## Source precedence

The Figma file has two places with writing rules. When they conflict, **follow the "Tone of Voice > Writing Style" pages** and treat "✦ Content" as legacy. Conflicts are listed in [Open conflicts](#open-conflicts).

## Capitalization by text type

| Text type | Style | Example |
|---|---|---|
| Headings (page title, section header, card/UI header) | Title Case | Program Overview |
| Body text | Sentence case | only the first word and proper nouns capitalized |
| Success messages | Sentence case | Invoice successfully generated |
| Warning / error message title | Title Case | Incomplete Check Amount |
| Warning / error message subtitle | Sentence case, full sentence | Please allocate the entire amount before saving the payment |
| CTAs (button labels) | Title Case | Save Changes |

Additional rules:

- Proper nouns (names of people, places, products) always take initial capitals.
- Do not use all-caps text.

## Headings

Headings must be clear and easy to scan.

- Use Title Case: capitalize the first letter of each major word (nouns, verbs, adjectives, adverbs).
- Do not capitalize articles (a, an, the), conjunctions (and, but, or) or short prepositions (in, on, at), unless they start the heading.
- Keep headings concise, ideally under 6 words.
- Keep verbs and terminology consistent across the platform.

| Heading type | Example | Usage |
|---|---|---|
| Page Title | Program Overview | Top-level screen or page title |
| Section Header | Invoice Details | Main sections within a page |
| Card/Header UI | Attachments | Component-level grouping headers |

## Body text

- Use sentence case (only the first word and proper nouns capitalized).
- Use standard punctuation and grammar.
- Keep paragraphs concise and focused.

## Simple words and sentences

- Use simple verbs and tenses. Keep sentences concise, simple and friendly.
- Focus on the user's context and make content relevant.
- Avoid verb constructions with have, has, had, been, should, would and will. (Legacy rule from ✦ Content; still consistent with the simple-language goal.)

## Date formats

Preferred format: **Apr. 13, 2025**

Why: concise and unambiguous across English-speaking regions (US, UK, Canada) where numeric order varies (DD/MM/YYYY vs MM/DD/YYYY).

- Always abbreviate the month to its first three letters followed by a period (Jan., Feb., Mar.).
- Include the comma before the year.
- Never use all-numeric dates.

| Correct | Incorrect |
|---|---|
| Scheduled for Apr. 14, 2025 | 04/13/2025 |
| Date of Loss: Oct. 20, 2024 | 01/05/24 |

Exception: file names use `MMDDYY` with no separators (see [File names](#file-names)).

## Phone numbers

Preferred format: **+1 (555) 555-5555**

- Use the international dialing code preceded by a plus sign (+).
- Include the country code even for domestic numbers, to serve users across borders.
- Use parentheses for the area code and a hyphen between the local number blocks.
- If an extension is needed: `+1 (555) 555-5555 ext. 123`.

| Country | Example | Note |
|---|---|---|
| USA | +1 (212) 555-7890 | Standard format with country code |
| Canada | +1 (416) 555-1234 | Same format as U.S. |
| UK | +44 (20) 7946-0958 | Replace leading 0 with +44 |

## File names

Use these patterns so users can identify, sort and reference files without opening them. Capitalize the homeowner's last name properly; no spaces or special characters.

| File | Pattern | Examples |
|---|---|---|
| Invoice | `[LastName]_INV_[MMDDYY].[extension]` | Schumacher_INV_021825.pdf, Patel_INV_010125.pdf, Lopez_INV_062324.pdf |
| Temporary file (ZIP or PDF) | `[LastName]_[FileType]_[MMDDYY].[extension]` | Schumacher_ZIP_022025.zip, Lopez_ZIP_061824.zip, Hamilton_PDF_112423.pdf |

- `INV` stands for Invoice.
- File type indicator is `ZIP` or `PDF`; the extension is `.zip` or `.pdf` to match.
- Date uses `MMDDYY` (U.S. numeric, no separators).

## Open conflicts

Flag these to the design team instead of guessing; defaults below are what to apply until resolved.

| Topic | Tone of Voice pages | ✦ Content (legacy) | Default to apply |
|---|---|---|---|
| Heading capitalization | Title Case | "Capitalize the initial letter of the first word... all other words lowercase", but its own Do example is Title Case | Title Case |
| Date display | Apr. 13, 2025 | MM/DD/YY (e.g., 01/05/24 as Do, January 5, 2024 as Don't) | Apr. 13, 2025 |
