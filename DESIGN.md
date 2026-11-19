---
# ── Repo metadata ────────────────────────────────────────────────
title: "Design System Reference — Solar for CRDN (RestorNet)"
layer: design
owner: ""
last_updated: "2026-11-16"
relates_to:
  - brand.md
  - components.md
sources:
  - "Figma: Solar for CRDN — https://www.figma.com/design/cTaHUBjUqP4Qxd630YA0Vs/Solar-for-CRDN"
status: needs_review

# ── DESIGN.md token block (google-labs-code/design.md, spec: alpha) ──
# Intentionally short. Light mode only. Values resolved from Figma
# variables and styles on 2026-11-16. For anything not listed here,
# read Figma (see "Source of truth" below) — do not extrapolate.
version: alpha
name: "Solar for CRDN (light)"
colors:
  primary: "#1D4ED8"          # Foundations/Primary/100 — primary actions
  primary-hover: "#1E40AF"    # Foundations/Primary/200
  link: "#2563EB"             # Foundations/Primary/50 — links only
  primary-subtle: "#EFF4FF"   # Foundations/Primary/25
  surface: "#FFFFFF"          # Foundations/Neutral/25
  surface-subtle: "#F1F5F9"   # Foundations/Neutral/50 — table headers, secondary hover
  border: "#E2E8F0"           # Foundations/Neutral/100
  border-strong: "#CBD5E1"    # Foundations/Neutral/200 — form fields
  on-surface: "#020617"       # Foundations/Neutral/900 — input values, secondary button text
  text: "#1E293B"             # Foundations/Neutral/700 — labels, ghost button text
  text-secondary: "#334155"   # Foundations/Neutral/600 — table cells
  icon: "#475569"             # Foundations/Neutral/500
  text-disabled: "#64748B"    # Foundations/Neutral/400
  error: "#DC2626"            # Foundations/Error/200
  error-subtle: "#FEF2F2"
  success: "#059669"          # Foundations/Success/200
  success-subtle: "#ECFDF5"
  warning: "#D97706"          # Foundations/Warning/200
  warning-subtle: "#FFFBEB"
  info: "#366CD9"             # Foundations/Info/100
  info-subtle: "#E5EEFF"
typography:
  display-xl: { fontFamily: "Open Sans", fontSize: 56px, fontWeight: 600, lineHeight: 1.2, letterSpacing: -0.03em }
  display-lg: { fontFamily: "Open Sans", fontSize: 44px, fontWeight: 400, lineHeight: 1.2, letterSpacing: -0.02em }
  display-md: { fontFamily: "Open Sans", fontSize: 32px, fontWeight: 400, lineHeight: 1.15, letterSpacing: -0.01em }
  display-sm: { fontFamily: "Open Sans", fontSize: 24px, fontWeight: 400, lineHeight: 1.15, letterSpacing: -0.01em }
  body-lg:    { fontFamily: "Open Sans", fontSize: 18px, fontWeight: 400, lineHeight: 1.6 }
  body-md:    { fontFamily: "Open Sans", fontSize: 16px, fontWeight: 400, lineHeight: 1.5 }
  body-sm:    { fontFamily: "Open Sans", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
  label-sm:   { fontFamily: "Open Sans", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
  button-md:  { fontFamily: "Open Sans", fontSize: 18px, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0.01em }
  button-sm:  { fontFamily: "Open Sans", fontSize: 16px, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0.01em }
  caption-md: { fontFamily: "Open Sans", fontSize: 12px, fontWeight: 400, lineHeight: 1.2 }
rounded:
  sm: 4px                     # buttons (documented on the Buttons page)
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.sm}"
    height: 36px
    padding: 0 16px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  # MD is only for the status control in a page header (see "Buttons > Choosing a size").
  button-primary-md:
    typography: "{typography.button-md}"
    height: 44px
    padding: 0 24px
  button-disabled:
    backgroundColor: "{colors.border}"
    textColor: "{colors.text-disabled}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
  button-secondary-hover:
    backgroundColor: "{colors.surface-subtle}"
  button-ghost:
    textColor: "{colors.text}"
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "{colors.surface}"
  button-destructive-hover:
    backgroundColor: "#C62020"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
---

# Design System Reference — Solar for CRDN

## How to read this file

This file describes **intent**: what RestorNet should feel like, which color plays which role, and the rules that no token file holds. It carries a deliberately short token block (above) so an agent can produce on-brand UI quickly.

It is **not** the source of truth for exact values, component APIs, or every state. When you are building inside the shipped product and need a value or variant that is not in the token block, read it from Figma. If this file and Figma disagree, **Figma wins**, and the disagreement should be logged in [Known gaps and discrepancies](#known-gaps-and-discrepancies).

| Resource | Where |
| --- | --- |
| Design system (single file) | [Solar for CRDN](https://www.figma.com/design/cTaHUBjUqP4Qxd630YA0Vs/Solar-for-CRDN) — file key `cTaHUBjUqP4Qxd630YA0Vs` |
| Foundations | Pages under **Foundations**: Colors, Typography, Elevations, Spacing, Border radius, Layout, Icons, Logo, Favicon |
| Voice and content | Pages under **Tone of Voice**: Tone Qualities, Writing Style |
| Components | Pages under **Components** (inventory below) |
| Extraction | Values resolved from Figma variables and styles via the Figma MCP on **2026-11-16**. Newest library update seen: Tooltip and Table components, 2026-03-17. |

**Modes:** light mode only. Figma has an `Alpha Light` ramp, but no dark theme is documented. Do not invent dark values.

---

## Overview

RestorNet is an operations platform for internal franchise teams: field technicians, adjusters, general managers, and administrators. These are people who know the business well and use the tool to move work forward quickly and correctly. It is a dense, task-oriented, desktop-first product (left navigation, tables, forms, side panels, wizards), with a mobile layout for field use.

The UI should feel like **a well-built professional tool**: calm, clear, and confident. That means a neutral slate canvas and a single saturated blue for action. Status colors appear only when something has a status. Decoration is minimal and elevation is soft, so the content and the next action stay obvious.

Solar is Dualboot's base system; "Solar for CRDN" is the client fork. Treat CRDN as the authority whenever it diverges from base Solar.

---

## Colors

### Roles

| Role | Token / Figma source | Value | Use for | Never use for |
| --- | --- | --- | --- | --- |
| Primary action | `Foundations/Primary/100` | `#1D4ED8` | Primary button background, selected states | Body text, decoration |
| Primary hover | `Foundations/Primary/200` | `#1E40AF` | Hover/pressed of primary | — |
| Link | `Link/Primary/default/text` → `Primary/50` | `#2563EB` | Inline links and text buttons | Button backgrounds |
| Canvas / surface | `Neutral/25` | `#FFFFFF` | Page and card background | — |
| Subtle surface | `Neutral/50` | `#F1F5F9` | Table header, secondary button hover | Primary content blocks |
| Divider / quiet border | `Neutral/100` | `#E2E8F0` | Table borders, secondary button border, disabled fill | Form field borders |
| Field border | `Form/base/border` → `Neutral/200` | `#CBD5E1` | Inputs, disabled button border | — |
| Strongest text | `Neutral/900` | `#020617` | Entered values, secondary button label | — |
| Default text | `Neutral/700` | `#1E293B` | Labels, headings, ghost button label | — |
| Secondary text | `Neutral/600` | `#334155` | Table cells, supporting copy | — |
| Icons | `Neutral/500` | `#475569` | Default icon color | — |
| Disabled | `Neutral/400` | `#64748B` | Disabled text and icons only | Placeholder text that must be readable |
| Error | `Error/200` (hover `Error/300`) | `#DC2626` / `#C62020` | Destructive buttons, error text and borders | Warnings |
| Success | `Success/200` (hover `Success/300`) | `#059669` / `#04855D` | Success buttons and confirmations | Generic "go" actions |
| Warning | `Warning/200` | `#D97706` | Warning icons, borders | Body text on white (low contrast) |
| Info | `Info/100` | `#366CD9` | Informational alerts and hints | Primary actions |

Each status color has a `50` tint for subtle backgrounds (`#FEF2F2`, `#ECFDF5`, `#FFFBEB`, `#E5EEFF`).

### How the palette is built

There are three layers in Figma:

1. **Foundations** (primitives): `Foundations/{Neutral, Primary, Info, Warning, Error, Success, Alpha Light, Alpha Dark}/{step}`.
2. **Palette** (component tokens): `Buttons/…`, `Form/…`, `Card/…`, `Toast/…`, `Alert/…`, `Navigation/…`, `Tab/…`, `Search/…`, `Table/…`, `Link/…`, `Text/{Primary, Secondary}`. These alias the Foundations.
3. Effect styles for elevation and focus (see [Elevation and depth](#elevation-and-depth)).

There is **no general semantic layer** between primitives and components (apart from `Text/Primary` and `Text/Secondary`). Components bind straight to component tokens. In practice:

- In code, use the component token (`buttons-primary-default-background`), not the primitive (`foundations-primary-100`), so a later re-mapping in Figma reaches the code.
- For new UI with no component token yet, use the role table above, and flag the missing token rather than hard-coding a hex.

### Ramp naming quirk

The Primary ramp does not follow a light-to-dark 50–900 convention: `25` is a pale tint (`#EFF4FF`) and `50` is already the saturated brand blue (`#2563EB`), followed by `100`–`400` getting darker. Neutrals go `25` (white) → `900`. Do not assume that the same step number means the same lightness across ramps.

---

## Typography

**One family: Open Sans**, set by the `Typeface/family/*` variables, with sizes in `Typeface/size/*`. Load weights 400 and 600. Fallback stack: `"Open Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

The table below comes from the **Figma text styles**, which are the source of truth. The documentation table on the Typography page differs in places; see [Known gaps](#known-gaps-and-discrepancies).

| Style | Size | Weight | Line height | Letter spacing (code) |
| --- | --- | --- | --- | --- |
| Display/XL | 56 | 600 | 1.2 | -0.03em |
| Display/LG | 44 | 400 | 1.2 | -0.02em |
| Display/MD | 32 | 400 | 1.15 | -0.01em |
| Display/SM | 24 | 400 | 1.15 | -0.01em |
| Display/XS | 18 | 400 | 1.15 | -0.01em |
| Subtitle/LG | 18 | 400 | 1.6 | 0 |
| Subtitle/MD | 16 | 400 | 1.5 | 0 |
| Body/LG | 18 | 400 | 1.6 | 0 |
| Body/MD | 16 | 400 | 1.5 | 0 |
| Body/SM | 14 | 400 | 1.5 | 0 |
| Label/MD | 18 | 400 | 1.5 | 0 |
| Label/SM | 14 | 400 | 1.5 | 0 |
| Label/XS | 12 | 400 | 1.5 | 0 |
| Button/LG | 22 | 400 | 1.2 | 0.01em |
| Button/MD | 18 | 400 | 1.2 | 0.01em |
| Button/SM | 16 | 400 | 1.2 | 0.01em |
| Eyebrow/MD | 16 | 400 | 1.5 | 0.1em |
| Eyebrow/SM | 14 | 400 | 1.5 | 0.1em |
| Eyebrow/XS | 12 | 400 | 1.4 | 0.1em |
| Caption/MD | 12 | 400 | 1.2 | 0 |
| Caption/SM | 10 | 400 | 1.2 | 0 |

Conversion rules: Figma letter spacing in % becomes `em` divided by 100 (−3% → `-0.03em`). Line heights are unitless multipliers.

Link styles (LG/MD/SM at 18/16/14) exist on the Typography page; read their exact style from Figma.

---

## Layout

### Spacing

All spacing and sizing follows a **4px grid**. The `Spacing` collection holds literal names (`0px`, `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px`, `44px`, `48px`). Any new value must be a multiple of 4. The token block maps the most common steps to `xs`–`2xl`.

### Grids

| Context | Structure |
| --- | --- |
| Desktop app, 1440 + left nav | Left nav 240 · gap 24 · fluid content (1152 at 1440) · right margin 24 |
| Desktop app with right panel | Left nav 240 · gap 24 · content (936 at 1440) · right panel 240 |
| Landing pages, 1440 | 12 columns, 120 outer margins, 20 gutters |
| Mobile, 390 | iOS safe area: 47 top, 83 bottom. Content margins 24. 4-column grid with 16 margins and 20 gutters |

The product is desktop-first. Primary workflows (tables, forms, wizards) are designed at 1440 with left navigation.

---

## Elevation and depth

Elevation is soft and cool-toned. Every shadow uses `rgba(75, 85, 101, α)`. Use the **effect styles**, not the labels on the Elevations page, which are inverted (see gaps).

| Style | CSS |
| --- | --- |
| Elevation/SM | `0 1px 2px rgba(75,85,101,0.05)` |
| Elevation/MD | `0 2px 4px -2px rgba(75,85,101,0.06), 0 4px 8px -2px rgba(75,85,101,0.10)` |
| Elevation/LG | `0 8px 8px -4px rgba(75,85,101,0.03), 0 20px 24px -4px rgba(75,85,101,0.08)` |
| Elevation/XL | `0 24px 44px 0 rgba(75,85,101,0.14)` |

The secondary button also uses its own resting shadow: `0 1px 2px rgba(18,25,38,0.05)`.

**Focus ring** (all buttons): a 2px white inner ring plus a 4px blue outer ring at 50% opacity.
`box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px rgba(0,78,235,0.5)`. Keep it on every keyboard-focusable control.

---

## Shapes

- Buttons: **4px** radius (documented on the Buttons page).
- The Border radius page says radius follows the same 4px-increment grid as spacing. The `Border` collection holds `border SM/MD/LG`, and `8-B` / `16-B` (8 and 16) variables exist. Their mapping to specific components is not documented, so read radius per component from Figma.

---

## Components

The full catalog and per-component specs belong in `components.md`. This section gives the rules an agent needs most often.

### Buttons

| Type | Use for | Default | Hover |
| --- | --- | --- | --- |
| Primary | The single most important action in a view | `#1D4ED8` bg, white text | `#1E40AF` |
| Secondary | Supporting actions next to a primary | White bg, `#E2E8F0` border, `#020617` text, `#475569` icon, resting shadow | `#F1F5F9` bg |
| Ghost | Tertiary or low-emphasis actions, toolbars | No fill, `#1E293B` text, `#475569` icon | `rgba(18,25,38,0.02)` bg, `#020617` text |
| Destructive | Irreversible actions (delete, deactivate) | `#DC2626` bg, white text | `#C62020` |
| Success | Confirming completion (submit, finalize) | `#059669` bg, white text | `#04855D` |

All types share the same disabled look: `#E2E8F0` background, `#CBD5E1` border, `#64748B` text and icon.

| Size | Height | Horizontal padding | Label style | Radius |
| --- | --- | --- | --- | --- |
| SM | 36 | 16 | Button/SM (16px) | 4 |
| MD | 44 | 24 | Button/MD (18px) | 4 |

**Choosing a size**
- **SM (36) is the default for every button and input**, including page-header actions (Update, Copy, Add), section-header actions, table toolbars, dialogs and empty states.
- **MD (44) is only for the status control in a page header** (`StatusDropdown` / `StatusPill` with `size="md"`, for example Draft or Active on a job or program).
- Do not use MD for anything else. If a screen seems to need a larger button, check Figma and flag it here rather than choosing MD.
- Icon-only buttons follow the same rule: 36×36 by default.

Variant axes in Figma: `Type` (Primary, Secondary, Destructive, Success, Ghost) × `Size` (SM, MD) × `Status` (Default, Hover, Focus, Disable, Loading) × `Icon` (None, Leading, Trailing, Trailing + Leading, Icon Button). Icon-only buttons are square (36×36 / 44×44).

Related: **Combo Button** (primary action plus dropdown of secondary actions; types Primary and Secondary White; adds an `Open` status).

### Form fields

Base input tokens: background `#FFFFFF`, border `#CBD5E1`, label `#1E293B`, value `#020617`. Tokens also exist for `hover border`, `active border`, `hint text`, and the `error` and `disabled` states (`Form/{base, error, disabled}/…`). Read their values from Figma. Inputs, Text Area, Search and Dropdowns each have a "How to use" frame and a Changes Log in Figma.

### Selection and open state (Radix vs Base UI)

`components/ui/*` comes from shadcn, whose newer templates style state with Base UI attributes (`data-checked:`, `data-unchecked:`, `data-open:`, `data-closed:`, `data-active:`). This project's primitives come from **Radix**, which sets `data-state="checked" | "unchecked" | "open" | "closed" | "active"` instead. A mismatch means the selected style silently never applies: a checked Checkbox, Radio or Switch looks empty, a selected Tab has no highlight, and open/close animations do not run. The component state is correct, only the pixels are wrong, so it is easy to miss.

- `styles/globals.css` defines `@custom-variant data-checked`, `data-unchecked`, `data-open`, `data-closed` and `data-active` so each one matches **both** spellings. Do not remove them.
- After adding or regenerating any shadcn component with the CLI, check that its selected / open state is visible (open the Checkbox, Radio, Switch, Tabs, Select and Dropdown once) before building on it.
- In new code, prefer the Radix spelling (`data-[state=checked]:`). For any other Base UI attribute that appears (for example `data-popup-open`, `data-pressed`, `data-selected`), add an alias in `globals.css` in the same way instead of editing every component.
- Verify selected states visually, not only through behaviour: a filter can apply correctly while its checkbox looks unchecked.

### Inventory (Figma pages)

Alerts & Toast · Assignments · Avatar · Badges · Breadcrumbs · Buttons · Cards · Communication · Date Picker · File Upload · Forms · Header · Illustrations · Items · Links · List · Modals · Navigation · Pagination · Photos · Pills (Filter) · Pills (Status) · Rooms · Sections · Selection Controls · Side Panel · Spinner · Table · Tabs · Tooltip · Wizard.

Several pages (Assignments, Rooms, Items, Communication, Photos) are **domain components** specific to RestorNet. Reuse them before composing new patterns from primitives.

### Naming: Figma to code

Tokens: lowercase the Figma name and replace every `/` and space with `-`.

| Figma | Code |
| --- | --- |
| `Foundations/Neutral/700` | `foundations-neutral-700` |
| `Buttons/Primary/hovered/background` | `buttons-primary-hovered-background` |
| `Form/base/hint text` | `form-base-hint-text` |
| `Elevation/MD` | `elevation-md` |

State vocabulary differs between layers. Component variants use `Default / Hover / Focus / Disable / Loading`; tokens use `default / hovered / focused / disabled`. Map them explicitly in code rather than string-matching.

---

## Content and voice

The full guide lives on the Tone of Voice pages in Figma. The essentials:

**Voice.** A knowledgeable colleague who knows the system deeply, communicates clearly, and makes the job easier. Users are experienced professionals: don't hand-hold them, but do prevent mistakes. Five qualities: **Confident, Efficient, Approachable, Respectful, Neutral**.

**Capitalization.**
- Headings, page titles, section headers, card headers: **Title Case**, ideally under 6 words ("Invoice Details").
- Body text: sentence case, standard punctuation, short paragraphs.
- CTAs: specific verbs, 1–3 words, Title Case ("Assign Users", "Save Changes"). Never "Click here" or casual phrases like "Let's go".

**System messages.**
- Success: sentence case, no trailing punctuation, past tense, object first ("Invoice successfully generated").
- Warning and error: a short Title Case title ("Incomplete Check Amount") plus a full-sentence instruction in sentence case ("Please allocate the entire amount before saving the payment").

**Formats.**
- Dates: `Apr. 13, 2025`. Three-letter month with a period, comma before the year, never all-numeric.
- Phone numbers: `+1 (555) 555-5555`. Always include the country code; extensions as `ext. 123`.

---

## Do's and Don'ts

**Visual**
- Do use one Primary button per view. Pair it with Secondary or Ghost.
- Do use SM (36px) buttons everywhere. Don't use MD (44px) except for the status control in a page header.
- Do reserve blue `#1D4ED8` for actions and selection. Links use `#2563EB`.
- Do use Destructive only for irreversible actions, and Success only for completion. A save action is Primary, not Success.
- Do keep surfaces white with slate borders, and use elevation sparingly.
- Don't use status colors decoratively or as section accents.
- Don't use `Warning/100` (`#F59E0B`) or `Success/100` (`#10B981`) as text on white: they fall below 3:1 contrast.
- Don't hard-code hex values in components. Bind to a component token, or flag the missing one.
- Don't add dark-mode styles; the system is light-only.

**Content**
- Do write solution-oriented errors that say what to do next.
- Don't use emojis, exclamation marks, or blame ("Oops!", "You did this wrong").
- Don't write long paragraphs or redundant guidance.

---

## Accessibility

No accessibility page exists in the Figma file, so the target level is **not yet decided**. Until it is, treat WCAG 2.2 AA as the working baseline. Measured from the current values:

| Pair | Ratio | Result (AA, normal text) |
| --- | --- | --- |
| White on Primary `#1D4ED8` | 6.70 | Pass |
| Link `#2563EB` on white | 5.17 | Pass |
| White on Destructive `#DC2626` | 4.83 | Pass |
| White on Success `#059669` | 3.77 | **Fail** at 16–18px regular |
| `#64748B` on white | 4.76 | Pass |

The Success button default fails AA for its label size. Raise this with design before shipping it in critical flows.

---

## Known gaps and discrepancies

Do **not** silently resolve these. Use Figma styles and variables as truth, and ask the design owner about the rest.

1. **Info swatches are stale.** The Colors page shows `#EFF4FF / #004EEB / #00359E`, but the variables are `#E5EEFF / #366CD9 / #264D99`.
2. **The focus ring color is not a variable.** It uses `#004EEB`, the old Info value, hard-coded in effect styles.
3. **Elevation labels are inverted on the documentation page.** The page lists the smallest shadow as "XL"; the effect styles are correct (SM smallest, XL largest).
4. **The Typography documentation table disagrees with the styles.**
   - The table lists Medium weight for Display (LG–XS), Subtitle, Label, Button, Link and Eyebrow; the styles are Regular (400).
   - Label/MD is 16px in the table but 18px in the style.
   - Eyebrow/MD line height is 160% in the table but 1.5 in the style.
   - The Caption row has its letter-spacing and line-height values swapped or garbled.
5. **Ghost button.** The usage text says "bordered outline", but the tokens define no border for Ghost.
6. **Mobile margins.** The safe-area layout uses 24px side margins; the 4-column mobile grid uses 16px.
7. **Radius.** There is no documented mapping from the `Border` collection (`border SM/MD/LG`) and `8-B` / `16-B` to components.
8. **The Spacing variable list is shown as an image** on the Spacing and Border radius pages, so it can drift from the live collection.
9. **Content gaps.** Warning and Error message examples are mostly "TBD". The Training Materials page is flagged 🔴.
10. **Token name typos and spaces:** `Navigation/Sidebar/Links/selected/boder`, `Form/base/hint text`.
11. **No motion tokens and no dark mode.**
12. **No accessibility standard defined.**
13. **TIP "Within 4 hours" badge uses hard-coded hex** (`#FFF6EB` background, `#FF8C00` text) with no Foundations variable. Code maps them to `orange-50` / `orange-200` in `styles/globals.css` until Figma gets a token. The TIP KPI labels also use `Success/100` and `Warning/100` as text on white, which gap-list rules say fall below 3:1.

---

## Changelog

| Date | Change |
| --- | --- |
| 2026-11-16 | First version, extracted from Figma via MCP (variables, text and effect styles, documentation pages, Tone of Voice). |
| 2026-11-17 | Documented the Radix vs Base UI state attribute mismatch (checked / open / active styles never applied) and added the aliases in `globals.css`. |
| 2026-11-17 | Button sizing rule: SM (36px) everywhere, MD (44px) only for the page-header status control. Token block now treats SM as the base `button-primary`. |
