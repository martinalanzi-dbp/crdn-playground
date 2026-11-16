# Solar Design System — CRDN / RestorNet (v2.1)

Reference for generating screens, components and prototypes that match the Solar design system used by CRDN's RestorNet platform (HUB, ON-SITE, WAREHOUSE). Extracted from the Figma file "Solar for CRDN" (file key `cTaHUBjUqP4Qxd630YA0Vs`).

This file serves two build targets:

- **Playground (code):** the `crdn-playground` repo (Next.js 16, React 19, Tailwind 4, shadcn/ui). Start at **section 0**, then use **section 10** for tokens, component mapping and class recipes.
- **Figma:** screens assembled from the "Solar for CRDN" library. Use **section 9** for component keys and variants.

Sections 1 to 8 are the design spec and apply to both targets. When something is not covered here, default to the closest documented pattern rather than inventing a new one.

**Verified against Figma (Nov 16, 2026):** colors, typography, elevations, buttons, status pills, badges, tabs, modals and side panels were checked against the live "Solar for CRDN" file; see section 11.4 for what matched, what was corrected and what is still unverified.

**Changes from v2.0:** added section 0 (agent rules), section 10 (playground implementation), section 11 (known inconsistencies and open decisions); noted the framework-agnostic status of section 7; added playground items to the section 8 checklist. Sections 1 to 6 and 9 are unchanged except where marked `[v2.1]`.

---

## 0. How to use this file (read first)

### 0.1 Build order for any new screen

1. Pick the page skeleton in section 5.4 and the matching template in section 10.7.
2. Assemble every element from existing components. In code, that means the Solar-restyled shadcn components in `components/ui/` (section 10.3). In Figma, it means the library components in section 9.
3. Use only the tokens in section 10.1. Do not write hex values, arbitrary Tailwind values (`w-[37px]`, `text-[#123]`) or one-off radii in screens.
4. Write copy following the tone rules in section 2.
5. Run the checklist in section 8 before saying a screen is done.

### 0.2 When a new component is allowed

Create a new component only when no component in section 10.3 (code) or section 9 (Figma) covers the need and no composition of existing ones does. When you do:

- Say so explicitly in your reply and name the component.
- Put it in `components/shared/` (project-specific) and give it typed props.
- Build it from the same tokens and states (default, hover, focus, disabled, error where relevant).
- List it in section 10.4 so it is reused next time.

### 0.3 Stack facts the playground assumes

- No backend. Hardcode realistic RestorNet data (jobs, assignments, contacts, estimates) in local fixtures or in the component.
- Icons: `@heroicons/react/24/outline` (1.5px stroke, matches section 6.14). Do not mix in Lucide icons on screens, even though shadcn files import them internally.
- Typeface: Open Sans only.
- Light theme only unless section 11.2 is resolved otherwise. Solar defines no dark palette.
- Desktop first at 1440px; mobile 390px is secondary.

---

## 1. Product context

- **Product:** RestorNet, an internal operations platform for CRDN (textile restoration franchise network). Users are franchise staff, home-office staff, warehouse and on-site technicians.
- **Primary surface:** desktop web app, 1440px reference width. Mobile (390px) is secondary, mainly for ON-SITE and WAREHOUSE flows.
- **Visual character:** light, dense, information-first. White content cards on a pale slate background, dark-blue top navigation, 4px corner radius everywhere, minimal shadows. Nothing playful or decorative. Think "well-built enterprise tool," not "marketing site."
- **Typeface:** Open Sans only.

---

## 2. Tone of voice (for all UI copy)

| Quality | Attributes | How it reads | Do | Don't |
|---|---|---|---|---|
| Confident | Expert, Grounded, Direct | Knows the workflow, no hedging | "Cannot deactivate contacts with active jobs assigned." | "It seems like this contact might still be assigned to something, so deactivation may not work." |
| Efficient | Clear, Concise | Every word counts; users are busy | "Upload failed. File type not supported." | "There was an issue uploading your file. It looks like the type you selected isn't supported by the system." |
| Approachable | Friendly, Calm, Human | Warm, not casual; helpful teammate, not a script | "Your contact list is empty. Add a new one below." | "This dataset currently contains zero records. Initiate creation of a new contact to begin population." |
| Respectful | Professional | Never assumes the user is confused | "This field is required." | "You forgot to fill this out!" |
| Neutral | Informational, Balanced, Impartial | Calm in errors, success and alerts; no drama | "Please enter a valid email address to continue." | "Oops! That's not a proper email!" |

Rules:
- No exclamation marks in system messages, errors or alerts.
- Use sentence case for labels, buttons, headings and table headers ("Payment applied", not "Payment Applied") unless it's a proper noun or product name (TIP, HUB, CRDN).
- Button labels are verbs: "Save", "Add contact", "Export to Excel".
- Error messages state what happened and, when useful, what to do. One sentence each.
- Empty states: one line describing the situation plus the primary action.

---

## 3. Color

All values are hex. Alpha colors are white or `#121926` at the stated opacity.

### 3.1 Neutrals (slate)

| Token | Hex | Typical use |
|---|---|---|
| Neutral/25 | `#FFFFFF` | Card and input backgrounds |
| Neutral/50 | `#F1F5F9` | Page background, table header rows, hover on secondary buttons |
| Neutral/100 | `#E2E8F0` | Borders on cards/secondary buttons, disabled backgrounds, dividers |
| Neutral/200 | `#CBD5E1` | Input borders, disabled borders, nav link text on dark bg |
| Neutral/300 | `#94A3B8` | Input hover border, tertiary icons |
| Neutral/400 | `#64748B` | Secondary text, placeholder icons, disabled text |
| Neutral/500 | `#475569` | Placeholder text, hint text, secondary icons |
| Neutral/600 | `#334155` | Body text (secondary) |
| Neutral/700 | `#1E293B` | Labels, ghost button text, body text |
| Neutral/800 | `#0F172A` | Headings |
| Neutral/900 | `#020617` | Primary text, filled input text, secondary button text |

### 3.2 Primary (blue)

| Token | Hex | Typical use |
|---|---|---|
| Primary/25 | `#EFF4FF` | Selected row/item background, badge backgrounds |
| Primary/50 | `#2563EB` | Links, active tab underline, active nav item |
| Primary/100 | `#1D4ED8` | Primary button background, active input border, badge text |
| Primary/200 | `#1E40AF` | Primary button hover |
| Primary/300 | `#1E3A8A` | Top navigation bar background |
| Primary/400 | `#122668` | Deepest brand blue (rare) |

### 3.3 Semantic

| Role | 50 (bg) | 100 (base) | 200 (strong) | 300 (hover/strongest) |
|---|---|---|---|---|
| Info | `#EFF4FF` | `#004EEB` | `#00359E` | — |
| Success | `#ECFDF5` | `#10B981` | `#059669` | `#04855D` |
| Warning | `#FFFBEB` | `#F59E0B` | `#D97706` | — |
| Error | `#FEF2F2` | `#EF4444` | `#DC2626` | `#C62020` |

Usage convention: `50` for tinted backgrounds, `100` for icons and borders, `200` for filled buttons and text on light backgrounds, `300` for hover of filled buttons.

### 3.4 Alpha

| Token | Value |
|---|---|
| Alpha Light 50 / 100 / 200 / 300 / 400 / 500 | `#FFFFFF` at 2% / 4% / 8% / 16% / 24% / 50% |
| Alpha Dark 50 / 100 / 200 / 300 / 400 / 500 | `#121926` at 2% / 4% / 8% / 16% / 24% / 80% |

Alpha Dark 500 (80%) is the modal overlay. Alpha Light 200 (8%) is nav-item hover on the dark bar. Alpha Dark 50 (2%) is ghost-button hover.

### 3.5 Focus ring

All interactive elements share one focus treatment: `0 0 0 2px #FFFFFF, 0 0 0 4px rgba(0, 78, 235, 0.5)` (white gap then 50% Info blue). Inputs use the tighter `0 0 0 2px rgba(0, 78, 235, 0.5)` plus the resting shadow. Error inputs use `0 0 0 2px rgba(239, 68, 68, 0.2)`.

---

## 4. Typography

Font family: **Open Sans** (fallback: `"Segoe UI", Helvetica, Arial, sans-serif`). Weights used: Regular 400, Medium 500, Semibold 600.

| Style | Size | Line height | Letter spacing | Weight |
|---|---|---|---|---|
| Display XL | 56px | 120% | -3% | Semibold |
| Display LG | 44px | 120% | -2% | Medium |
| Display MD | 32px | 115% | -1% | Medium |
| Display SM | 24px | 115% | -1% | Medium |
| Display XS | 18px | 115% | -1% | Medium |
| Subtitle LG | 18px | 160% | 0 | Medium |
| Subtitle MD | 16px | 160% | 0 | Medium |
| Subtitle SM | 14px | 150% | 0 | Medium |
| Label MD | 16px | 150% | 0 | Medium |
| Label SM | 14px | 150% | 0 | Medium |
| Label XS | 12px | 150% | 0 | Medium |
| Body LG | 18px | 160% | 0 | Regular |
| Body MD | 16px | 150% | 0 | Regular |
| Body SM | 14px | 150% | 0 | Regular |
| Button LG | 22px | 120% | 1% | Medium |
| Button MD | 18px | 120% | 1% | Medium |
| Button SM | 16px | 120% | 1% | Medium |
| Button XS | 14px | 120% | 1% | Medium |
| Link LG / MD / SM | 18 / 16 / 14px | 150% | 0 | Medium |
| Eyebrow MD / SM / XS | 16 / 14 / 12px | 160 / 150 / 140% | 10% | Medium, uppercase |
| Caption MD | 12px | 120% | 10% | Regular |
| Caption SM | 10px | 120% | 10% | Regular |

Practical defaults for app screens:
- Page title: Display SM (24px) in Neutral/800.
- Section/card title: Display XS (18px) or Subtitle MD.
- Body and table cells: Body SM (14px) in Neutral/700.
- Form labels: Label SM (14px) in Neutral/700. Required marker: red asterisk `#EF4444`.
- Hints and captions: Caption MD (12px) in Neutral/500.
- Links: Primary/50, Medium, no underline at rest.

---

## 5. Spacing, radius, elevation, layout

### 5.1 Spacing
- Base unit is **4px**. Every margin, padding and gap is a multiple of 4.
- Tokens in use: 0, 4, 8, 12, 16, 20, 24, 32, 48.
- Common applications: 8px gap between inline icon and text; 12px horizontal input padding; 16px card inner padding (compact) or 24px (standard); 24px table cell horizontal padding; 24px gutter between layout columns; 48px section padding on documentation-style pages.

### 5.2 Border radius
- **4px** is the default on buttons, inputs, dropdowns, cards, badges, table containers and modals.
- Larger radii (8px, 12px) follow the same 4px increment and are reserved for large containers or image thumbnails. Pills and avatars are fully rounded.

### 5.3 Elevation (box-shadow)

As labeled in the Figma file (labels run opposite to visual intensity; use by value, not by name). `[v2.1]` The playground names them by intensity: xs, md, lg, xl (see 10.1).

| Label in Figma | Shadow | Use |
|---|---|---|
| XL (playground: `shadow-xs`) | `0 1px 2px 0 rgba(75,85,101,0.05)` | Resting shadow on secondary buttons, inputs |
| LG (playground: `shadow-md`) | `0 2px 4px -2px rgba(75,85,101,0.06), 0 4px 8px -2px rgba(75,85,101,0.10)` | Cards, dropdown menus |
| MD (playground: `shadow-lg`) | `0 8px 8px -4px rgba(75,85,101,0.03), 0 20px 24px -4px rgba(75,85,101,0.08)` | Popovers, side panels |
| SM (playground: `shadow-xl`) | `0 24px 44px 0 rgba(75,85,101,0.14)` | Modals |

Most surfaces rely on a 1px Neutral/100 border rather than shadow. Cards on the Neutral/50 page background are white with a 1px `#E2E8F0` border and no shadow unless elevated (menus, modals).

### 5.4 Layout grids (1440px desktop)

- **Top navigation:** full-width bar, 64px tall, Primary/300 background. Content area starts below it.
- **Standard page:** 1440px wide. Content column is centered with 24px side padding. Historical variant with left nav: 240px nav + 24px gutter + 1152px content + 24px right gutter.
- **Content + right panel:** 936px content + 240px right panel (plus gutters).
- **Landing/marketing pages:** 12-column grid, ~82px columns, 20px gutters, 120px outer margins.
- **Mobile (390px):** 4-column grid, 16px outer margin, 20px gutters. iOS safe areas: 47px top, 83px bottom.

Page skeleton for a new RestorNet screen:
```
[Top navigation 64px, #1E3A8A]
[Page header: breadcrumb (optional) + Display SM title + primary actions right-aligned, 24px padding]
[Optional horizontal tabs (Tab Underline), 37px tall, Neutral/100 bottom border]
[Content: white cards/sections on #F1F5F9 background, 24px gutters, 16–24px inner padding]
```

---

## 6. Components

### 6.1 Buttons

Sizes: **SM** 36px tall, 16px horizontal padding, Button SM text. **MD** 44px tall, 24px horizontal padding, Button MD text. Radius 4px. Icon-only variants are square (36 or 44). Icons 16px (SM) or 20px (MD), 8px gap to label. Leading and trailing icon slots.

| Type | Default | Hover | Focus | Disabled |
|---|---|---|---|---|
| Primary | bg `#1D4ED8`, text white | bg `#1E40AF` | default + focus ring | bg `#E2E8F0`, border `#CBD5E1`, text `#64748B` |
| Secondary | bg white, border 1px `#E2E8F0`, text `#020617`, icon `#475569`, shadow XL | bg `#F1F5F9` | default + focus ring | same as Primary disabled |
| Ghost | transparent, text `#1E293B`, icon `#475569` | bg `rgba(18,25,38,0.02)`, text `#020617` | bg white + focus ring | text/icon `#64748B` |
| Success | bg `#059669`, text white | bg `#04855D` | default + focus ring | same as Primary disabled |
| Destructive | bg `#DC2626`, text white | bg `#C62020` | default + focus ring | same as Primary disabled |

Loading state: spinner replaces the leading icon, label stays, width is preserved.

**Combo button:** primary action + separator + chevron that opens a dropdown of secondary actions. Available in Primary and Secondary White, SM/MD.

Hierarchy per view: one Primary button max. Secondary for everything else. Ghost for inline/tertiary actions and icon buttons in tables. Destructive only for irreversible actions, usually behind a confirmation modal.

### 6.2 Inputs

Anatomy: label (Label SM, `#1E293B`, optional red `*`, optional info icon 16px) → 4px → field → 4px → hint (Caption MD, icon 16px `#64748B`, text `#475569`).

Field sizes: **SM** 36px tall, **MD** 44px tall. Padding 12px horizontal. Radius 4px. Body SM/MD text.

| State | Border | Background | Text | Extra |
|---|---|---|---|---|
| Default | `#CBD5E1` | white | placeholder `#475569` | shadow XL |
| Hover | `#94A3B8` | white | | |
| Focus / Typing / Active | `#1D4ED8` | white | `#020617` | focus ring (2px, 50% info blue) |
| Filled | `#CBD5E1` | white | `#020617` | |
| Disabled | `#CBD5E1` | `#E2E8F0` | `#475569` | |
| Error | `#EF4444` | white | | error ring; hint icon `#EF4444`, hint text `#DC2626` |

Variants: text, number, phone (country code shown inside the field, chevron when multiple numbers), date picker, search.

**Search:** 37px tall, leading search icon, same border rules. Job List search has a filter dropdown with "Contains" / "Starts with"; placeholder reads "Search contains…" or "Search starts with…".

**Text area:** same states as inputs. Default height 120px, vertically resizable via bottom-right handle, vertical scrollbar inside when content overflows. Character counter bottom-right ("994/4000") with a hairline above it; counter turns error red when over limit. Sizes SM 220px, MD 264px, LG 468px, XL 762px wide.

### 6.3 Dropdowns / selects

Trigger looks like an input with a trailing chevron (16px). Optional leading icon or prefix. Sizes SM/MD match inputs. Same states as inputs plus **Active** (menu open).

Menu: white, 1px `#E2E8F0` border, radius 4px, shadow LG, 8px padding. Items 29px (SM) or 40px (MD) tall, Body SM, 8px horizontal padding; hover bg `#F1F5F9`; selected bg `#EFF4FF` with check icon or checkbox. Item types: List, Checkbox (multi-select), Icon.

Documented behaviors:
- Typeahead: search field at top of the open menu; spinner row while loading; "No results found" row when empty.
- "Clear selection" always first item, styled as a normal option (no checkbox).
- Scrollbar on the right when options exceed available height.
- Multi-attribute options: columns for name + codes (e.g., category, selection) with a header row, used when one name maps to several valid records.

### 6.4 Selection controls
Checkbox and radio: 16px, 1px `#CBD5E1` border, radius 4px (checkbox) / full (radio). Checked: `#1D4ED8` fill, white check. Toggle: 36×20, off `#CBD5E1`, on `#1D4ED8`. Labels Body SM to the right with 8px gap.

### 6.5 Status pills (job/entity status)

A dropdown-style pill: white background, 1px `#E2E8F0` border, radius 4px, status icon left, label, separator, chevron right. Sizes XS 28px, SM 36px, MD 44px. States default, hover (`#F1F5F9`), focus (ring), loading ("Loading" with spinner, keeps the width of the previous action), disabled (`#E2E8F0` bg, grey icon).

| Status | Icon | Icon color |
|---|---|---|
| Draft | pencil | `#F59E0B` warning |
| Active | check circle | `#10B981` success |
| Canceled | x circle | `#EF4444` error |
| Inactive | minus/stop circle | `#EF4444` error |
| Closed | check circle | `#2563EB` primary |
| Payment applied | dollar circle | `#F59E0B` warning |

Applies to Jobs, Assignments, Estimates, Programs, Companies, Contacts. Where a status is not changeable, use the Badge version instead of the pill.

`[v2.1, from the Figma "Status Comparison" section]` Which statuses are changeable pills and which are read-only badges depends on the entity:

| Entity | Draft | Active | Payment applied | Inactive | Canceled | Closed |
|---|---|---|---|---|---|---|
| Jobs | Badge | Pill | Badge | Badge | Pill | Pill |
| Assignments | Badge | Pill | Badge | Badge | Pill | Pill |
| Estimates | Badge | Pill | Pill | Badge | Pill | Pill |
| Programs | Pill | Pill | Badge | Pill | Badge | Badge |
| Companies | Badge | Pill | Badge | Pill | Badge | Pill |
| Contacts | Badge | Pill | Badge | Pill | Pill | Pill |

Pill sizes are XS 28px, SM 36px, MD 44px. Loading keeps the width of the action button it replaces.

### 6.6 Badges
Small read-only labels: `[v2.1]` SM 26px / MD 29px tall (types Neutral, Primary, Success, Error, Warning, Info; the Filled style was removed on 07/14/2024, only Accent exists), 12px horizontal padding, radius 4px, Label XS/Caption text. Default tint is Primary/25 background with Primary/100 text (used for attributes/tags). Semantic variants use the 50 background + 200 text of the matching color. Item condition badges: Restorable, Storage only, Non-salvageable.

### 6.7 Filter pills
Rounded (full radius) chips used above tables for active filters: Neutral/50 background, 1px Neutral/100 border, Body SM text, optional trailing "x" to remove. Selected: Primary/25 background, Primary/100 text and border.

### 6.8 Navigation

**Top navigation bar (current pattern):** 1440×64, background `#1E3A8A` (Primary/300). Left: CRDN wordmark in a 136px block separated by a 1px lighter divider. Links in Body SM, color `#CBD5E1`, 24–32px apart; items with sub-menus show a 16px chevron. Hover: background `rgba(255,255,255,0.08)`. Active/pressed: white text, optionally `#2563EB` background block. Right: notification bell button and user name with chevron (profile menu), each in a divided block. Menu items vary by role (Franchise, PMD, Administrator, Legal, Franchise Development, Finance, OPS and Sales, IT Support, Marketing). Typical set: TIP, Jobs, Management ▾, Users, Warehouse ▾ / Operations ▾, Reports, Finance, Legal.

Tablet/mobile: same bar, links collapse behind a hamburger; 834px (tablet) and 430px (mobile) variants exist.

**In Figma, always use the `Desktop Navigation` component** (section 9.1) and pick the `Role` variant that matches the screen's user; never rebuild the bar by hand.

**Legacy left sidebar (marked OLD, do not use for new screens):** 308px expanded / 88px collapsed, dark blue, with tooltips when collapsed.

**Horizontal tabs (secondary navigation):** `[v2.1, verified in Figma]` Tab Underline is 33px tall (Tab SM 29px, Tab MD 32px); the segmented Tab Group is 37px tall. Body SM, 16px horizontal padding. The active underline animates with `transition: width 0.3s ease-in-out`. Active: `#1D4ED8` text with 2px `#2563EB` bottom border. Inactive: `#475569`. Hover: `#1E293B`. Sits under the page header; secondary to the top nav. Used for job detail sub-pages.

**Vertical tabs / tab pills (tertiary):** `[v2.1]` Tab Pill is 29px (SM) or 32px (MD) tall, full-width rows in a 236–260px column. Active: `#EFF4FF` background, `#1D4ED8` text. Inactive: `#1E293B` text. One level of nesting max.

**Inline menu:** icon button (24px) that opens a small dropdown for context actions; used inside cards and table rows.

**Breadcrumbs:** Body SM, `#475569`, chevron separators, last item `#1E293B`.

### 6.9 Tables
- Container: white, 1px `#E2E8F0` border, radius 4px.
- Header row: 64px tall, `#F1F5F9` background, Label SM/Subtitle SM in `#1E293B`, optional sort icon 16px.
- Body rows: 29px (dense) to 64px tall depending on content; 24px horizontal cell padding; 1px `#E2E8F0` row dividers; Body SM text `#1E293B`.
- Hover row: `#F1F5F9`. Selected row: `#EFF4FF`.
- Cells can hold text, badges, status pills, avatars, icon+text lines, or ghost icon buttons for actions (right-aligned).
- Above the table: title + Secondary buttons (Export, Filters, Columns) right-aligned; search and filter pills on a second row.
- Below: pagination (page size dropdown left, "1–25 of 340" and prev/next right).
- Empty state inside the table body: one sentence + primary action.

### 6.10 Cards and sections
- **Section/Base:** white container, 1px `#E2E8F0` border, radius 4px, 16–24px padding, optional Section/Header with title (Display XS) and right-aligned actions.
- **KPI card:** label (Caption/Label SM, `#475569`), value (Display MD), optional delta badge. Grid of 3–4 per row.
- **Card/Room, Card/Items, Card/Pictures, Card/Pin:** domain cards for on-site and warehouse work; 432px wide at 3-up in a 1320px content area, 12px gutters.
- **Side panel:** `[v2.1, verified in Figma]` 500px wide, 16px inner padding (changed from 24px on 08/15/2024), slides in from the right, header with title + close icon, body scroll, footer with Secondary + Primary buttons.

### 6.11 Modals
Overlay `rgba(18,25,38,0.8)`. Dialog: white, radius 4px, shadow SM (per Figma label), 24px padding. Header: Display XS title + close icon button. Footer: right-aligned Secondary ("Cancel") then Primary/Destructive. `[v2.1, verified in Figma]` Modal is 650px wide in all three types: Default (480px tall), Destructive and Success (244px tall). Domain modals are wider (Room preview/edit 829px, Job 869px). The v2.0 widths of 480/640/960 are not in the Figma file. Confirmation copy follows the tone rules: state the consequence, no exclamation.

### 6.12 Alerts and toasts
Inline alert: 50-tint background, 1px 100 border, 16px icon in 100 color, Body SM text `#1E293B`, radius 4px, optional close. Toast: same styling, bottom-right, auto-dismiss, max one line of text plus optional action link.

### 6.13 Other components available in the library
Avatar (with initials fallback), Date picker, File upload (dropzone + file rows with progress), Pagination, Spinner, Tooltip (dark `#1E293B` bg, white Caption text), Wizard/stepper, Communication (activity/notes feed), Assignments, Photos, Rooms, Items, Illustrations (empty states), Logos for HUB / ON-SITE / WAREHOUSE.

### 6.14 Icons
Line icons, 1.5px stroke, sizes 16px (inline, inputs, table), 20px (buttons MD, list lines), 24px (standalone icon buttons). Color follows the text they sit next to; default `#475569`. Status icons are filled circles in semantic colors. `[v2.1]` In the playground use `@heroicons/react/24/outline` (1.5px stroke) and the solid set for status icons only (see 10.5.7).

---

## 7. CSS tokens (framework-agnostic reference)

`[v2.1]` Use this block for plain HTML/CSS artifacts only. In the playground, use the Tailwind 4 `@theme` tokens in section 10.1 instead; do not paste this block into `styles/globals.css`.

```css
:root {
  --font-sans: "Open Sans", "Segoe UI", Helvetica, Arial, sans-serif;

  --neutral-25:#FFFFFF; --neutral-50:#F1F5F9; --neutral-100:#E2E8F0; --neutral-200:#CBD5E1;
  --neutral-300:#94A3B8; --neutral-400:#64748B; --neutral-500:#475569; --neutral-600:#334155;
  --neutral-700:#1E293B; --neutral-800:#0F172A; --neutral-900:#020617;

  --primary-25:#EFF4FF; --primary-50:#2563EB; --primary-100:#1D4ED8; --primary-200:#1E40AF;
  --primary-300:#1E3A8A; --primary-400:#122668;

  --info-50:#EFF4FF; --info-100:#004EEB; --info-200:#00359E;
  --success-50:#ECFDF5; --success-100:#10B981; --success-200:#059669; --success-300:#04855D;
  --warning-50:#FFFBEB; --warning-100:#F59E0B; --warning-200:#D97706;
  --error-50:#FEF2F2; --error-100:#EF4444; --error-200:#DC2626; --error-300:#C62020;

  --overlay: rgba(18,25,38,0.8);

  --radius: 4px;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-5:20px;
  --space-6:24px; --space-8:32px; --space-12:48px;

  --shadow-xs: 0 1px 2px 0 rgba(75,85,101,0.05);
  --shadow-card: 0 2px 4px -2px rgba(75,85,101,0.06), 0 4px 8px -2px rgba(75,85,101,0.10);
  --shadow-popover: 0 8px 8px -4px rgba(75,85,101,0.03), 0 20px 24px -4px rgba(75,85,101,0.08);
  --shadow-modal: 0 24px 44px 0 rgba(75,85,101,0.14);

  --focus-ring: 0 0 0 2px #FFFFFF, 0 0 0 4px rgba(0,78,235,0.5);
  --focus-ring-input: 0 0 0 2px rgba(0,78,235,0.5), var(--shadow-xs);
  --error-ring: 0 0 0 2px rgba(239,68,68,0.2), var(--shadow-xs);

  /* semantic */
  --bg-page: var(--neutral-50);
  --bg-surface: var(--neutral-25);
  --border-default: var(--neutral-100);
  --border-input: var(--neutral-200);
  --text-primary: var(--neutral-900);
  --text-body: var(--neutral-700);
  --text-secondary: var(--neutral-500);
  --text-disabled: var(--neutral-400);
  --nav-bg: var(--primary-300);
  --nav-text: var(--neutral-200);
}

body { font-family: var(--font-sans); font-size: 14px; line-height: 1.5; color: var(--text-body); background: var(--bg-page); }
h1 { font-size: 24px; line-height: 1.15; font-weight: 500; letter-spacing: -0.01em; color: var(--neutral-800); }
h2 { font-size: 18px; line-height: 1.15; font-weight: 500; letter-spacing: -0.01em; color: var(--neutral-800); }
label { font-size: 14px; line-height: 1.5; font-weight: 500; color: var(--neutral-700); }
.caption { font-size: 12px; line-height: 1.2; color: var(--neutral-500); }
.eyebrow { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--neutral-500); }

.btn { height: 36px; padding: 0 16px; border-radius: var(--radius); font-size: 16px; font-weight: 500; letter-spacing: 0.01em; display: inline-flex; align-items: center; gap: 8px; border: 1px solid transparent; }
.btn-md { height: 44px; padding: 0 24px; font-size: 18px; }
.btn-primary { background: var(--primary-100); color: #fff; border-color: var(--primary-100); }
.btn-primary:hover { background: var(--primary-200); border-color: var(--primary-200); }
.btn-secondary { background: #fff; color: var(--neutral-900); border-color: var(--neutral-100); box-shadow: var(--shadow-xs); }
.btn-secondary:hover { background: var(--neutral-50); }
.btn-ghost { background: transparent; color: var(--neutral-700); }
.btn-ghost:hover { background: rgba(18,25,38,0.02); color: var(--neutral-900); }
.btn-destructive { background: var(--error-200); color: #fff; border-color: var(--error-200); }
.btn-destructive:hover { background: var(--error-300); }
.btn:disabled { background: var(--neutral-100); border-color: var(--neutral-200); color: var(--neutral-400); box-shadow: none; }
.btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }

.input { height: 36px; padding: 0 12px; border: 1px solid var(--border-input); border-radius: var(--radius); background: #fff; font-size: 14px; color: var(--neutral-900); box-shadow: var(--shadow-xs); }
.input::placeholder { color: var(--neutral-500); }
.input:hover { border-color: var(--neutral-300); }
.input:focus { outline: none; border-color: var(--primary-100); box-shadow: var(--focus-ring-input); }
.input:disabled { background: var(--neutral-100); color: var(--neutral-500); }
.input.is-error { border-color: var(--error-100); box-shadow: var(--error-ring); }

.card { background: #fff; border: 1px solid var(--border-default); border-radius: var(--radius); padding: 24px; }
.table { width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid var(--border-default); border-radius: var(--radius); overflow: hidden; background: #fff; }
.table th { height: 64px; padding: 0 24px; text-align: left; background: var(--neutral-50); font-weight: 500; color: var(--neutral-700); }
.table td { padding: 12px 24px; border-top: 1px solid var(--border-default); color: var(--neutral-700); }
.table tr:hover td { background: var(--neutral-50); }

.topnav { height: 64px; background: var(--nav-bg); color: var(--nav-text); display: flex; align-items: center; }
.topnav a { color: var(--nav-text); font-size: 14px; padding: 0 16px; height: 100%; display: inline-flex; align-items: center; }
.topnav a:hover { background: rgba(255,255,255,0.08); }
.topnav a.active { color: #fff; }

.badge { display: inline-flex; align-items: center; height: 26px; padding: 0 12px; border-radius: var(--radius); font-size: 12px; font-weight: 500; background: var(--primary-25); color: var(--primary-100); }
.pill-status { display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 12px; border: 1px solid var(--neutral-100); border-radius: var(--radius); background: #fff; font-size: 14px; color: var(--neutral-900); }
```

---

## 8. Checklist before shipping a new design

- Top nav is the dark blue 64px bar, not a left sidebar.
- Page background `#F1F5F9`; content lives in white bordered cards; 4px radius everywhere.
- Open Sans only; 14px body; 24px page title.
- One Primary button per view; destructive actions confirmed in a modal.
- Inputs: label above, hint below, red asterisk for required, blue border on focus, red border + red hint on error.
- Tables: grey 64px header, 24px cell padding, hover row tint, actions as ghost icon buttons on the right.
- Statuses use the status-pill icon/color mapping in 6.5; tags use blue badges.
- Copy: short, calm, sentence case, no exclamation marks.
- All spacing is a multiple of 4.
- Every UI element is an instance of a section 9 component; any new local component is listed and justified.
- Top nav is a `Desktop Navigation` instance with the correct `Role`.
- No instance has its border, shadow or focus ring clipped: turn off "Clip content" on instances and on their containers.

Playground (code) additions `[v2.1]`:

- Shell is `TopNav` plus the centered 1440px column; no `Sidebar`, no `.loop-*` classes.
- No hex values or arbitrary Tailwind values in screens; only tokens from 10.1.
- Built from `components/ui/*` and `components/shared/*`; any new component is named in the reply and listed in 10.4.
- Icons from Heroicons only; Open Sans loaded through `next/font`.
- Every interactive element has hover, focus, disabled and error states where relevant.
- Mock data looks like RestorNet data; no backend, auth or data layer added.


---

## 9. Component library — Solar for CRDN (Figma)

Source file: `Solar for CRDN`, file key `cTaHUBjUqP4Qxd630YA0Vs`. Components below are published; import them by key (`importComponentSetByKeyAsync` for sets, `importComponentByKeyAsync` for single components). Keys were read from the file on Nov 5, 2026.

`[v2.1]` This section is the Figma target. For code, see the component map in 10.3.

Note: the generic **Solar** library is also attached to some CRDN files and has components with the same names but **different keys**. Use the Solar for CRDN keys below.

### 9.1 App shell and navigation

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Desktop Navigation | set | `c7889a25ebf209f19c3547fe33afc76c6e1155be` | Role = HO, PMD, Administrator, Legal, Franchise Development, Finance, OPS and Sales, IT Support, Marketing, Franchise | — (1440×64) |
| Responsive Navigation | set | `8f6f03634c0fcb21e7b7a0e934e2d65caa8736c0` | Status = Open/Closed; Device = Mobile/Tablet | — |
| Menu Link | set | `569f5cdae5620a8c1b280b56d78b4294b5aee7a5` | Status = Default/Pressed/Active | Link Name, Icon |
| Breadcrumbs | comp | `de628a966686f2e352dc838f66949c58f3791037` | — | Link 1–7 (booleans) |
| Base Header | set | `f67058f9794a04dd1dbb760b982a312396826f23` | Type = Jobs List/Selected Job/QMD | Header, Description, Show Primary/Secondary Button, Show Status, Show Avatar |
| Job Header | set | `4b6a75709b77f0dae9ad639a43e2effe0679c2d2` | Type = Jobs | Show Breadcrumbs, Show Tabs |
| Tab Underline | set | `1b838ebeb3ebbf9704f76644b75f937b691279f5` | Selection = #1–#10 | — |
| Tab | set | `198e5d1d6c409c0186ce4ac66bbf6b6fdde4da04` | Active = No/Yes; Size = SM/MD | Text, Show Badge |
| Tab Pill | set | `878b3f6efca8e1dba49334c16ab89e6acc618edb` | Status = Inactive/Active/Tertiary; Size = SM/MD | Text |
| Tab Group | set | `ce2a5f74d12691d4c303b5f85e53a641697c9a9d` | # = 1–6 | — |
| Menu Inline | set | `37c76d2f04658aadf0ab8ec8dc8c89ff98e62b28` | Collapsed = False/True | — |
| Navigation/Tertiary | comp | `821db44cbb1b158168dc548264dfe53d3825531f` | — | — |
| Menu sidebar (legacy) | set | `2aac9b93743a9fa05b5d49fb663f59b26b7c2941` | Type = Collapsed/Default/Collapsed with arrow | Do not use for new screens |

### 9.2 Actions

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Button | set | `3300550b0d6e6c7fad3e9e09f502401d7d4c4403` | Type = Primary/Secondary/Destructive/Success/Ghost; Size = SM/MD; Status = Default/Hover/Focus/Disable/Loading; Icon = Trailing + Leading / Trailing <- / Leading -> / Icon Button / None | Label Text, Show Label |
| Combo Button | set | `90ee98883b4734c26dc4a2776cafc2178fdc904d` | Status = Default/Hover/Open/Focus/Disable; Size = SM/MD; Type = Primary/Secondary White | Label Text, Left Icon, Right Icon |
| Links | set | `c12bf8e573ad528a51188815c3c8cabb5aaeb75f` | Type = Default/Success/Error/Warning/Info; State = Default/Hover/Disabled; Size = SM/MD/LG | Link text, Left/Right Icon |

A second, older `Button` set exists (`af5a88fb3d4aa97a9014f233e00d4297874dc866`, State only). Do not use it.

### 9.3 Forms and selection

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Input | set | `6fd0a0dd7fd3036dab70318a5401eb2a060cd556` | Size = SM/MD; Status = Default/Hover/Active/Filled/Focus/Disable/Error/Typing | Label Text, Value Text, Hint Text, Hint Icon, Hint Content, Required, Left/Right Icon, Show value, Show Tooltip |
| Dropdown | set | `3b23bfc3babbd04816e64edc7617f1486acf7248` | Size = SM/MD; Status = Default/Hover/Active/Filled/Focus/Error/Disabled; Type = Base/Prefix | Label Text, Value Text, Hint Text, Required, Left/Right Icon, Clear Icon, Phone Extension |
| Dropdown Menu | set | `1ca43b7e97d7e630b05a332d04207cb9cf0fea5b` | Type = List/Checkbox/Icon; Size = SM/MD | Item 1–10 (booleans) |
| Dropdown Item | set | `c7d41f024656b3ca77d592108d0f12e0657c02da` | Type = Default/List/Checkbox/Icon; Size = SM/MD; Status = Default/Hover/Selected | Label Text, Left/Right Icon |
| Search | set | `fc5309e1485a67839622471f7901da4bbf2406b2` | State = Default/Focused/Filled/Disabled/Hovered | Show Closer Icon |
| Text Area | set | `1161985f84a89e77ecfd7a50d1837be8b2db49d9` | Status = 8 states; Size = SM/MD/LG/XL | Label Text, Placeholder Text, Character Count (+Text), Hint, Required |
| Controls | set | `1ad7eef4179a6081c67ad0bdd89cd991591024c4` | Type = Toggle/Radio Button/Checkbox; State = Unselected/Selected; Status = Default/Hover/Focus/Disabled | — |
| Checkbox with label | set | `c07101f618483c84a574a81bffe3bc6977a0deef` | State = Normal/Hover/Focus/Selected | Label, Description, Show Description |
| Radio Button with label | set | `c85576c48cb1ab6ce18ff45cea75179c870e87be` | State = Normal/Hover/Focus/Selected | Label, Description, Show Description |
| Date Picker | set | `f6bdf0aac83b4fb188057872426eef09e74a342d` | Type = Simple/Double | Show Input |
| Day | set | `ae22fe67926506639976de67e9ab20d72b50e4e5` | Position, Type (Enabled/Range/Disabled/Selected/Not Available) | Label text |
| Drag & Drop | set | `f0fb923750d09435fbd7e61599c527ff86fb8d13` | State = Default/Disabled/Hover | Show max files |
| File upload | set | `b8f8c82079be2192760e6a015e7698c8fcaa0c98` | Error; State = Uploading/Error/Success; Mode | File name text |
| Uploads | set | `a1d1d8eac058554437756740d5f21cc3ca1ffe68` | State = Default/Limit Reached | Show uploads 1–4 |

A second `Radio Button with label` set exists (`2faa242c821f94da34a8ebafb5434e8e3d5aaca2`); prefer the first.

### 9.4 Status, labels and feedback

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Badge | set | `fa1986d36edcff69111e23a0588ff731d6611203` | Style = Accent; Size = SM/MD; Type = Neutral/Error/Info/Primary/Success/Warning | Text, Left/Right Icon |
| Filter Pills | set | `1f7537b075f2e4771071d6cb97f1ddc8d77c218f` | Size = SM/MD | Text, Left/Right Icon |
| Status Pills | set | `589fa1223722ad31fa9bf168a67a55f7f92cb6a9` | Status = Default/Focus/Hover/Loading/Disable; Size = MD/SM/XS; Type = Active/Canceled/Closed/Payment Applied/Draft/Inactive | Show Chevron |
| Pill Dropdown | comp | `279d178a04fd5f2d7f7d7980996d7eef9026fe4b` | — | Show Active/Payment/Closed/Canceled/Draft/Inactive |
| Alerts | set | `70315feb3a5238b82dbaf62f60a068dabf8f69d0` | Type = Alert/Toast; State = Error/Info/Neutral/Success/Warning | Change label, Change description, Show description, Icon, Border, Close Button, Primary/Secondary Button, Actions |
| Tooltip | set | `0fa8da6e3c2e9b29f7a00fe5dee3df43cc94c373` | Size = SM/XS | Label, Show Learn more link |
| Spinner | set | `a09383b78b1fba3fcf098afda12df173dd762915` | Variant = 4 rotations; Size = 16/20/24/32/40px | — |
| Empty state | set | `652130874932342b01e24907de7c7f950c8d33c8` | Empty = Empty state/Error/Favorite/Lost connection/No message/Notification/Result/Success | Text, Show Primary Button |
| Avatar | set | `48dfc3ca678be6386aacb3d1e3687a9f38b4b186` | Type = Initials/Image/Logo; Size = 24–64; Placeholder icon | — |
| Avatar group | set | `f07be44b5645a1e6a02af7ffc9547ad0bce0c9c5` | — | — |

### 9.5 Containers, overlays and data

| Component | Type | Key | Variants | Main properties |
|---|---|---|---|---|
| Section/Header | comp | `c04831d9686c7f81e4394fc34b09faaca21cfda7` | — | Header, Show Button 1, Show Button 2 |
| Section/Base | comp | `bbeb6d00a748af7961f925e2c32ede00d1adad83` | — | — |
| Section/Content | set | `585a41f516154e6e90c19bd4bcdb15502edf1f3f` | Type = Job Details/Base; State = many job sections | — |
| Modal | set | `70c883992aa0e49b205928a2382509d5d2f7302b` | Type = Default/Destructive/Success | Show Secondary Button |
| Modal Content | set | `7a08e41af18543be3441ef94e96366f92af618de` | Property 1 = Base/Content | Title, Subtitle, Description 1/2 (+ text), Items List |
| Side Panel/Base | set | `3fa8220075716b0cb61f63cffcd5e5769b254370` | Type = Based | Show Footer, Show Tabs |
| SidePanel/Header | set | `fa705b34e737085c1b37dc947646d1fc589b1d1d` | Type = Default | Header, Show Icon, Show Avatar |
| SidePanel/Footer | set | `2f0ccad2e52165b5d0f10fc27ef4639204f627d2` | Type = Default | Show Primary Button, Show Ghost Button |
| Table Cell | set | `753ceccf4918aab5314e130fa221cca27ad96cfd` | Place = Header/Content; Action = None/Checkbox/Radio button; State = Default/Disabled/Active; Type = Default/Text/Link/Avatar+Link/Badge/Icon/Text+Badge/Pill | Text, Change text header, Icon, Link, Avatar |
| Table/Base | set | `553aca94b574755ec44c773f95df1c2ed8b737c7` | Type = Empty | Show Header, Show Pagination, Show Filters |
| Table/Header | set | `665aacd03cae781df23df60f8feeca96b1c81cba` | Job List = Default; State = Default/Base | — |
| Table/Header/Buttons | set | `0abd6cce130c3493919e89a0aa49cab802503293` | State = Default/Hover; Job Status = Default/Date/Search/Filters | — |
| Table/Filters | set | `3c97de6d974b22e8ba51f5dd1d46e0a03a1e90a8` | Type = Populated/Bas | Filter 1–8 |
| Table/Content | set | `6445dc51020251578739ae5b8f54c0ec2e5b6001` | Type = Job List; State = Populated/Loading/No Results/Base/Empty State | — |
| Pagination | set | `02a94443e00acb845bc702b6e0f85083aa38b9f5` | Type = Button group | — |
| Pagination/Items | set | `b8de116f8b9ae2199ff2cd9930bccba29214549f` | State; Type; Orientation | Change text |
| Item (list row) | set | `cd4ee365d2a9b4bdac86d28ecd76145eca655f9c` | Type = Badge/Link/Text/Date/Pill | Text, Label, Show Button |
| KPI Card | set | `904c85bad9f6c77c9da86ed28573fa7ba717359f` | Status (11); Type = Default/Pressed; Name = TIP/QMD/C&A | Text |
| Step (wizard) | set | `0f553d5721ce6e06b5525833f9bc006802355505` | Property 1 = Default/Variant2/Variant3 | Step Name |

### 9.6 Domain components (RestorNet-specific)

Use these when the screen covers the matching domain area instead of rebuilding them.

- **Assignments:** Assignment Section – Banner `9479a7dd4a313cfc1cd17fc1e8f892cefd8a6833`, – General `d313fe73412f0dfdb707771a6937f8c31e8eedc8`, – Taxes and Discounts `9fab411d4eac7dd9545f1352b6ba02ddaee76902`, – Item Summary `7e15bd33eafba3d0938f6f1364a80a9f2f9392c7`, – Estimates `6a1d07703ad370a335e9f0832a995c2f141950b0`, – Delivery `e5ffb5fbcc19d85b4a0dd28a50c2fa1cecaef553`, – Billing Summary `610a14bb223ae4a1565b31ed094629482a9fee95`, Program Requirements Steps `cc5b856858feaeff8c447eac4f599821c409da6c`.
- **Communication:** Activity Header `2b3c896076c98093c0ed23f9f663fd4ec6d78fb1`, Note `959bdd8ebed51feb87fe0fa3a33f6abd90cc0d04`, Log Sections `eae100a61666403bcf306a6260e027a5ec6a48c0`.
- **Items:** Add Item `c1c923593f36dd1470d49c411df9eccdb6d92b64`, Item Notes `be68f88ea41af88718ab36ca6c0da730bbf63913`, Folder `27c6e95a40371a34a3e9e848ea1202857ee28ab3`, Folders Menu `faa73189b1148e8406cdda1399a3c53bab227d45`, Card/Items `d0ed040bddd94a419836b6c7f264808cb06d1b95`.
- **Rooms and photos:** Card/Room `9b547d9a26a9b5727f3659781383581d00122b6e`, Card/Pictures `f781e663d14a323c17ed3e57e8bd045cdc636072`, Card/Pin `63a3392021ed74d1eaff59d9266126388ae34970`, Photos Header `37fe34a3c96eef6581c870e05334168b51225cf0`, Photos Accordion `8cd879d8da9994db2110cf6b6ba4949405fe5c58`, Photos Selected `f404f04c1655f11b97a952705a09e0584c39840a`, Photo `16e4ba481d325ce0a2cd7d2f945d80fd34830840`, Photo Folder `39cb3bf1b9b200bb5497b50c17760381fecfba7e`, Section Divider `3b0178d385f4a09a5c38502e7f72752b669017a6`.
- **Side panel content:** Job Creation `e1d54bc598d4b0d40d855f2432738c6220fe0baa`, Job List `3b643e0543dbc8335f6b955d32946c0596ff0498`, Add Estimate `31849ec03325b2e5cc40a431919dc74307f9823c`, Room `6a2bb20929daf7aabd58559252c6972c0a12382c`, Room/Edit Images `39987a9bbae00c6e13cee455b44bdd3290055622`, Selected Job `853632ca81dfdc0ac90dd7aa8e91e7d86bc6df41`, Item Search `b7bfa49e86691e8e2500fc3218fa7b6ff0098c06`.
- **Uploads:** Card/Upload/Edit `901186cc35c6e8147e33c856cc18a6b23e056d70`.
- **Brand:** Logo `a3a45c164568d177978fd96853ae76ad2fbba94b` (Style = White/Black/Brand; Size = SM/MD/LG/XL), Isotype `76347ad6bb8e6af2b945aa3a2197722852b09717`.

### 9.7 Icons

The `Icons` page has 230 icon components named `Category / Name` (Arrows, Charts, Development, Devices, Finance, Maps & Travel, People, Time & Date, and more). Search the library by name (for example "Arrows / Chevron-double", "Time & Date / Calendar") and place the instance; only import a raw SVG when no icon in the set fits.

### 9.8 Gaps found so far (local components were needed)

For the Advanced find & export screens these needs had no library match and were built locally on the CRDN ‒ Franchises "Aixle" page:
- Query field box (condition field/operator/value select with Area prefix, Default/Error/Disabled).
- Column chip (draggable selected column, Default/Missing).
- Saved query list item (Default/Selected, optional tag).

Check `Dropdown` (Type=Prefix), `Dropdown Item` and `Item` before building similar elements again.

---

## 10. Playground implementation (crdn-playground)

Stack as found in the repo: Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui (`radix-nova` style, components in `components/ui/`), `class-variance-authority`, `@heroicons/react`, `sonner`. Brand tokens live in `styles/globals.css`.

The repo ships a generic Dualboot starter skin (Inter, gray/blue scale, 6 to 16px radii, `.loop-*` classes, left sidebar, dark mode). Solar differs on every one of those. This section is the translation layer: apply 10.1 and 10.2 once, then build screens from 10.3 onward.

### 10.1 Tokens: what to put in `styles/globals.css`

Replace the starter palette, typography, radius and shadow tokens inside `@theme` with the block below. Keep the `@import` lines, `@custom-variant` and the `@theme inline` alias block as they are.

```css
@theme {
  --color-white: #ffffff;

  /* Neutrals (slate) */
  --color-neutral-25: #ffffff;
  --color-neutral-50: #f1f5f9;
  --color-neutral-100: #e2e8f0;
  --color-neutral-200: #cbd5e1;
  --color-neutral-300: #94a3b8;
  --color-neutral-400: #64748b;
  --color-neutral-500: #475569;
  --color-neutral-600: #334155;
  --color-neutral-700: #1e293b;
  --color-neutral-800: #0f172a;
  --color-neutral-900: #020617;

  /* Primary (note: 25 is the lightest, 50 to 400 get darker; 50 is the link blue) */
  --color-primary-25: #eff4ff;
  --color-primary-50: #2563eb;
  --color-primary-100: #1d4ed8;
  --color-primary-200: #1e40af;
  --color-primary-300: #1e3a8a;
  --color-primary-400: #122668;

  /* Semantic: 50 tint bg, 100 icon/border, 200 text/filled, 300 hover */
  --color-info-50: #eff4ff;
  --color-info-100: #004eeb;
  --color-info-200: #00359e;
  --color-success-50: #ecfdf5;
  --color-success-100: #10b981;
  --color-success-200: #059669;
  --color-success-300: #04855d;
  --color-warning-50: #fffbeb;
  --color-warning-100: #f59e0b;
  --color-warning-200: #d97706;
  --color-error-50: #fef2f2;
  --color-error-100: #ef4444;
  --color-error-200: #dc2626;
  --color-error-300: #c62020;

  /* Alpha */
  --color-alpha-dark-50: rgb(18 25 38 / 0.02);
  --color-alpha-dark-500: rgb(18 25 38 / 0.8); /* modal overlay */
  --color-alpha-light-200: rgb(255 255 255 / 0.08); /* nav hover */

  --color-link: var(--color-primary-50);

  /* Radius: 4px everywhere; 2xl+ reserved for large containers and thumbnails */
  --radius-sm: 4px;
  --radius-md: 4px;
  --radius-lg: 4px;
  --radius-xl: 4px;
  --radius-2xl: 8px;
  --radius-3xl: 12px;

  /* Shadows, named by intensity (Figma labels run backwards, see 5.3) */
  --shadow-xs: 0 1px 2px 0 rgb(75 85 101 / 0.05); /* inputs, secondary buttons */
  --shadow-md:
    0 2px 4px -2px rgb(75 85 101 / 0.06), 0 4px 8px -2px rgb(75 85 101 / 0.1); /* cards, menus */
  --shadow-lg:
    0 8px 8px -4px rgb(75 85 101 / 0.03), 0 20px 24px -4px rgb(75 85 101 / 0.08); /* popovers, side panels */
  --shadow-xl: 0 24px 44px 0 rgb(75 85 101 / 0.14); /* modals */

  /* Type */
  --font-sans: var(--font-open-sans), "Segoe UI", Helvetica, Arial, sans-serif;
  --tracking-button: 0.01em;

  --text-display-sm: 1.5rem; /* page title */
  --text-display-sm--line-height: 1.15;
  --text-display-sm--letter-spacing: -0.01em;
  --text-display-xs: 1.125rem; /* card/section title */
  --text-display-xs--line-height: 1.15;
  --text-display-xs--letter-spacing: -0.01em;
  --text-display-md: 2rem; /* KPI value */
  --text-display-md--line-height: 1.15;
  --text-display-md--letter-spacing: -0.01em;
}
```

Notes on the block:

- Spacing: Tailwind's default scale is already 4px-based (`p-1` = 4px, `p-6` = 24px). Do not redefine `--space-*`, and remove the starter's `--space-*` and `--font-size-*` tokens.
- `--text-display-*` utilities (`text-display-sm`, `text-display-xs`, `text-display-md`) set size, line height and letter spacing. Pair them with `font-medium`. Body and table text use Tailwind's `text-sm`; captions use `text-xs`.
- Delete the starter's `.loop-*` and `.tech-card` classes, the `h1` to `h4` and `p` base rules, the `a` hover underline rule, the scrollbar rules and every `@variant dark` block. They set Inter, semibold headings and gray/blue colors that fight Solar.

Then replace the `:root` alias block so every shadcn component renders in Solar with no per-component color overrides:

```css
:root {
  --background: var(--color-neutral-50);   /* page */
  --foreground: var(--color-neutral-900);
  --card: var(--color-white);
  --card-foreground: var(--color-neutral-900);
  --popover: var(--color-white);
  --popover-foreground: var(--color-neutral-900);
  --primary: var(--color-primary-100);     /* Solar Primary/100 = main blue */
  --primary-foreground: var(--color-white);
  --secondary: var(--color-neutral-50);
  --secondary-foreground: var(--color-neutral-900);
  --muted: var(--color-neutral-50);
  --muted-foreground: var(--color-neutral-500);
  --accent: var(--color-primary-25);       /* selected / hover-selected */
  --accent-foreground: var(--color-primary-100);
  --destructive: var(--color-error-200);
  --border: var(--color-neutral-100);      /* cards, dividers, secondary buttons */
  --input: var(--color-neutral-200);       /* input borders */
  --ring: var(--color-info-100);           /* used at 50% opacity */
  --radius: var(--radius-md);
  --sidebar: var(--color-primary-300);
  --sidebar-foreground: var(--color-neutral-200);
  --sidebar-primary: var(--color-primary-50);
  --sidebar-primary-foreground: var(--color-white);
  --sidebar-accent: var(--color-alpha-light-200);
  --sidebar-accent-foreground: var(--color-white);
  --sidebar-border: var(--color-primary-200);
  --sidebar-ring: var(--color-info-100);
}
```

The `.dark` block can be deleted until section 11.2 is decided. Also set the body defaults in `@layer base`:

```css
body {
  @apply bg-background font-sans text-sm text-neutral-700 antialiased;
  line-height: 1.5;
  letter-spacing: 0;
}
```

### 10.2 Font and root layout

Load Open Sans with `next/font` in `app/layout.tsx` and apply the variable on `<html>` (weights 400, 500, 600):

```tsx
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans"
});

// <html lang="en" className={openSans.variable}>
```

Also in `app/layout.tsx`: remove the dark-mode inline script, the `Header`, the `Sidebar` and the `bg-gray-*` wrapper. The shell becomes the `TopNav` (10.4) above a centered content column:

```tsx
<body className="min-h-screen bg-background">
  <Providers>
    <TopNav role="Franchise" />
    <main className="mx-auto w-full max-w-360 px-6 py-6">{children}</main>
    <Toaster />
  </Providers>
</body>
```

`max-w-360` is 1440px. Pages that use a right panel use a 936px content column plus a 240px panel (section 5.4).

### 10.3 Solar to shadcn component map

Status key: **Restyle** = file exists in `components/ui/`, edit the class strings as shown. **Extend** = restyle and add variants or props. **Add** = install with `pnpm dlx shadcn@latest add <name>`, then restyle. **Build** = does not exist; create in `components/shared/` (see 10.4).

| Solar component | Playground component | Status | Notes |
|---|---|---|---|
| Button (Primary, Secondary, Ghost, Destructive, Success) | `ui/button.tsx` | Extend | Map `default`=Primary, `outline`=Secondary, `ghost`=Ghost, `destructive`=Destructive (solid). Add `success`. Sizes `sm`=36px, `md`=44px. Recipe 10.5.1 |
| Combo Button | `Button` + `ui/dropdown-menu.tsx` | Build | Primary action, 1px separator, chevron trigger |
| Links | `shared/Link` | Restyle | `text-link font-medium`, no underline at rest |
| Input, Search | `ui/input.tsx` | Extend | Add `size` and an optional label/hint wrapper. Recipe 10.5.2 |
| Text Area | `ui/textarea.tsx` | Extend | Add character counter |
| Dropdown, Dropdown Menu, Dropdown Item | `ui/select.tsx`, `ui/dropdown-menu.tsx` | Restyle | Recipe 10.5.3. Typeahead variant: `ui/popover.tsx` plus `command` (Add) |
| Controls, Checkbox/Radio with label | `ui/checkbox.tsx`, `ui/radio-group.tsx`, `ui/switch.tsx`, `ui/label.tsx` | Restyle | 16px controls, toggle 36x20 |
| Date Picker | `calendar` (Add) + `ui/popover.tsx` | Add | Simple and Double (range) |
| Status Pills | `shared/StatusPill` | Build | Recipe 10.5.7 |
| Badge | `ui/badge.tsx` | Extend | Recipe 10.5.6 |
| Filter Pills | `shared/FilterPill` | Build | Full radius chip, optional remove |
| Alerts (Alert, Toast) | `ui/alert.tsx`, `ui/sonner.tsx` | Extend | Add `info`, `success`, `warning`, `error`, `neutral` variants |
| Tooltip | `ui/tooltip.tsx` | Restyle | `bg-neutral-700 text-white text-xs` |
| Spinner | `shared/Spinner` | Build | `ArrowPathIcon` with `animate-spin`, sizes 16/20/24/32/40 |
| Empty state | `shared/EmptyState` | Build | One sentence plus primary action |
| Avatar, Avatar group | `ui/avatar.tsx` | Restyle | Initials fallback |
| Section/Base, Section/Header, KPI Card | `ui/card.tsx`, `shared/KpiCard` | Restyle, Build | Recipe 10.5.4 |
| Modal, Modal Content | `ui/dialog.tsx`, `ui/alert-dialog.tsx` | Extend | Recipe 10.5.8. Destructive confirmations use `alert-dialog` |
| Side Panel (Base, Header, Footer) | `ui/sheet.tsx` | Restyle | Right side, 500px wide, 16px padding |
| Table (Base, Header, Cell, Filters, Content) | `ui/table.tsx` + `shared/DataTableToolbar` | Restyle, Build | Recipe 10.5.5 |
| Pagination | `pagination` (Add) + `ui/select.tsx` | Add | Page size dropdown left, range and prev/next right |
| Tab Underline, Tab, Tab Group | `ui/tabs.tsx` (`variant="line"`) | Extend | Recipe 10.5.9 |
| Tab Pill (vertical) | `ui/tabs.tsx` (`orientation="vertical"`) | Extend | 29px rows, active `bg-accent text-accent-foreground` |
| Breadcrumbs | `breadcrumb` (Add) | Add | Body SM, `text-neutral-500`, last item `text-neutral-700` |
| Desktop Navigation, Responsive Navigation, Menu Link | `shared/TopNav` | Build | Spec 6.8. Replaces `components/Header` and `components/Sidebar` |
| Base Header, Job Header | `shared/PageHeader` | Build | Breadcrumb, Display SM title, status, actions right-aligned |
| File upload, Drag & Drop, Uploads | `shared/FileDropzone` | Build | When a screen needs it |
| Step (wizard) | `shared/Stepper` | Build | When a screen needs it |
| Domain components (9.6) | `components/domain/*` | Build | Only when a screen covers that domain area; reuse across screens |
| Icons | `@heroicons/react/24/outline` | Reuse | 16px inline, 20px in buttons, 24px standalone; solid variants only for status icons |

### 10.4 Components to build (new, local)

None of these exist in the repo yet. When you build one, keep it in `components/shared/` with typed props and add it to the index.

- **TopNav:** 64px, `bg-primary-300`, CRDN wordmark block (136px) with a 1px lighter divider, links `text-sm text-neutral-200` with `hover:bg-alpha-light-200`, active `text-white` (optional `bg-primary-50` block), chevron on items with sub-menus, bell button and user menu on the right. Prop `role` selects the item set. Typical set: TIP, Jobs, Management, Users, Warehouse or Operations, Reports, Finance, Legal. Per-role sets are not documented (section 11.2).
- **PageHeader:** optional breadcrumb, `text-display-sm font-medium text-neutral-800` title, optional StatusPill, actions right-aligned (one Primary at most). Optional tab row below.
- **StatusPill:** see 10.5.7.
- **FilterPill:** `rounded-full border border-border bg-neutral-50 px-3 text-sm`; selected `bg-primary-25 border-primary-100 text-primary-100`; optional trailing `XMarkIcon`.
- **KpiCard:** label (`text-xs text-neutral-500`), value (`text-display-md font-medium`), optional delta Badge; 3 to 4 per row.
- **DataTableToolbar:** title and Secondary buttons (Export, Filters, Columns) right-aligned on the first row; search and FilterPills on the second row.
- **EmptyState, Spinner, FormField (label, control, hint), SearchInput, ComboButton.**

### 10.5 Recipes

Class strings below are the target state. Edit the existing `components/ui/*.tsx` files; keep their structure, `data-slot` attributes and Radix wiring. Focus treatment everywhere is `focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white` on buttons and links, and `focus-visible:ring-2 focus-visible:ring-ring/50` on inputs.

#### 10.5.1 Button

- Base: `rounded-md border border-transparent font-medium tracking-button transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:opacity-100`. Remove `active:translate-y-px` and the starter's `ring-3`.
- Sizes: `sm: "h-9 gap-2 px-4 text-base [&_svg:not([class*='size-'])]:size-4"`, `md: "h-11 gap-2 px-6 text-lg [&_svg:not([class*='size-'])]:size-5"`, icon-only `icon-sm: "size-9"`, `icon-md: "size-11"`. Default size is `sm` (see 11.2).
- Variants:
  - `default` (Primary): `bg-primary text-primary-foreground hover:bg-primary-200`
  - `outline` (Secondary): `border-border bg-white text-neutral-900 shadow-xs hover:bg-neutral-50 [&_svg]:text-neutral-500`
  - `ghost`: `text-neutral-700 hover:bg-alpha-dark-50 hover:text-neutral-900 disabled:bg-transparent disabled:border-transparent`
  - `destructive`: `bg-error-200 text-white hover:bg-error-300` (solid, not the starter's tinted style)
  - `success` (new): `bg-success-200 text-white hover:bg-success-300`
- Loading: replace the leading icon with `Spinner`, keep the label, keep the width.
- One Primary per view. Destructive only behind a confirmation modal.

#### 10.5.2 Input and form field

- Field: `h-9 w-full min-w-0 rounded-md border border-input bg-white px-3 text-sm text-neutral-900 shadow-xs placeholder:text-neutral-500 hover:border-neutral-300 focus-visible:border-primary-100 focus-visible:ring-2 focus-visible:ring-ring/50 disabled:bg-neutral-100 disabled:text-neutral-500 disabled:opacity-100 aria-invalid:border-error-100 aria-invalid:ring-2 aria-invalid:ring-error-100/20`. Add a `size` prop (`sm` = `h-9`, `md` = `h-11`) via `cva`; do not use the native `size` attribute.
- FormField anatomy: `Label` (`text-sm font-medium text-neutral-700`, red `*` in `text-error-100` when required, optional 16px info icon) then 4px gap (`gap-1`), control, 4px gap, hint (`text-xs text-neutral-500` with 16px icon; in error: icon `text-error-100`, text `text-error-200`).
- Search: `Input` at 37px (`h-9.25`, per Figma) with a leading `MagnifyingGlassIcon` (16px, `text-neutral-400`, `pl-9`). Job List variant has a "Contains" or "Starts with" dropdown and the placeholder "Search contains…" or "Search starts with…".

#### 10.5.3 Select and dropdown menu

- Trigger: same classes as Input, trailing 16px `ChevronDownIcon` in `text-neutral-500`.
- Content: `rounded-md border border-border bg-white p-2 shadow-md`.
- Item: `h-7.25 rounded-sm px-2 text-sm focus:bg-neutral-50 data-[state=checked]:bg-accent` (SM, 29px in Figma); MD items `h-10`. Multi-select uses checkbox items. "Clear selection" is always the first item and has no checkbox. Empty typeahead shows a "No results found" row.

#### 10.5.4 Card and section

- Replace `rounded-xl ... ring-1 ring-foreground/10` with `rounded-md border border-border bg-card`. Padding: `[--card-spacing:--spacing(6)]` (24px standard) or `--spacing(4)` (16px compact). No shadow unless the card is a menu or modal.
- Section header: title `text-display-xs font-medium text-neutral-800`, actions right-aligned in `CardAction`.
- Footer: drop `bg-muted/50`; keep a `border-t` only when it separates actions.

#### 10.5.5 Table

- Container: `overflow-hidden rounded-md border border-border bg-white`. The shadcn wrapper only scrolls, so add the border and radius on a parent or in `Table`.
- Head: `h-16 bg-neutral-50 px-6 text-sm font-medium text-neutral-700`. Cell: `px-6 py-3 text-sm text-neutral-700`. Dense rows: `h-7.25 py-0` (29px).
- Row: `border-b border-border hover:bg-neutral-50 data-[state=selected]:bg-primary-25`.
- Row actions: right-aligned ghost icon buttons (`icon-sm`). Cells hold text, Badge, StatusPill, Avatar or icon plus text.
- Below the table: Pagination with page-size select on the left and "1–25 of 340" with previous and next on the right. Empty body: one sentence plus the primary action.

#### 10.5.6 Badge

- Replace `rounded-4xl h-5 px-2` with sizes `sm: h-6.5` (26px) and `md: h-7.25` (29px), both `rounded-md px-3 text-xs font-medium`. Default size is `sm`.
- Variants: `default` (tag): `bg-primary-25 text-primary-100`; `info`, `success`, `warning`, `error`: `bg-{x}-50 text-{x}-200`; `neutral`: `bg-neutral-50 text-neutral-700`. Item condition badges (Restorable, Storage only, Non-salvageable) map to `success`, `warning`, `error`.

#### 10.5.7 StatusPill

Dropdown-style pill when the status can change, Badge when it cannot. Built on `DropdownMenu`: trigger `h-9 rounded-md border border-border bg-white px-3 text-sm text-neutral-900 hover:bg-neutral-50` with icon, label, 1px separator and `ChevronDownIcon`. Sizes XS 28px (`h-7`), SM 36px (`h-9`), MD 44px (`h-11`). Use the pill-versus-badge matrix in section 6.5 to decide, per entity and status, whether to render a StatusPill or a Badge. Loading shows a Spinner and "Loading" at the previous width; disabled uses `bg-neutral-100`.

| Status | Heroicons (solid, 20px) | Class |
|---|---|---|
| Draft | `PencilSquareIcon` | `text-warning-100` |
| Active | `CheckCircleIcon` | `text-success-100` |
| Canceled | `XCircleIcon` | `text-error-100` |
| Inactive | `MinusCircleIcon` | `text-error-100` |
| Closed | `CheckCircleIcon` | `text-primary-50` |
| Payment applied | `CurrencyDollarIcon` | `text-warning-100` |

#### 10.5.8 Dialog

- Overlay: `bg-alpha-dark-500` (80%). Content: `rounded-md border-0 bg-white p-6 shadow-xl ring-0`. Header: `text-display-xs font-medium` title plus close icon button.
- Width: Default, Destructive and Success modals are 650px (`sm:max-w-162.5`). Add a `wide` size for domain modals (Room 829px, Job 869px; `sm:max-w-207` to `sm:max-w-217`, confirm per screen). The starter's `sm:max-w-sm` is too narrow. Types map to Default, Destructive and Success; Success and Destructive are short (244px tall) with an icon, title, one sentence and two buttons.
- Footer: drop `bg-muted/50`; right-aligned, Secondary "Cancel" first, then Primary or Destructive. Confirmation copy states the consequence, no exclamation marks.

#### 10.5.9 Tabs (secondary navigation under the page header)

Use `TabsList variant="line"`. Target (33px per Figma): list `h-8.25 w-full justify-start gap-0 rounded-none border-b border-border bg-transparent p-0`; trigger `h-8.25 flex-none rounded-none px-4 text-sm font-medium text-neutral-500 hover:text-neutral-700 data-active:text-primary-100 data-active:after:bg-primary-50 data-active:after:opacity-100`, with the underline `after:bottom-0 after:h-0.5 after:transition-[width] after:duration-300 after:ease-in-out`. The segmented Tab Group is a separate style: 37px tall (`variant="default"`, `h-9.25`). The starter's `after:bottom-[-5px]` and `p-[3px]` list padding are for the pill style and must not apply to the line variant.

### 10.6 Interaction and copy rules that code must honor

- Hover, focus, disabled and error states are required on every interactive element; never ship only the default state.
- Inputs: label above, hint below, required marker, blue border on focus, red border plus red hint on error.
- Destructive actions open a Modal first. Success and error feedback uses a Toast (bottom-right, one line, optional action link).
- Copy: sentence case, verbs on buttons, no exclamation marks, one-sentence errors, empty states with one line plus the primary action (section 2).
- Realistic fixtures: job numbers, franchise names, item conditions and statuses should look like RestorNet data, not lorem ipsum.

### 10.7 Screen templates

Every template lives inside the shell from 10.2 (`TopNav` plus the centered 1440px column, 24px gutters, `bg-background`).

| Screen | Structure | Components |
|---|---|---|
| List (for example Jobs) | `PageHeader` (title, one Primary), DataTableToolbar (search, FilterPills, Export, Columns), Table in a bordered container, Pagination | PageHeader, Input, FilterPill, Button, Table, StatusPill, Badge, Pagination, EmptyState |
| Detail (for example a Job) | `PageHeader` with breadcrumb and StatusPill, Tabs (line), white Card sections on the grey page | PageHeader, Breadcrumb, Tabs, Card, FormField, Badge, Table |
| Form | `PageHeader`, Card with a 2-column grid of FormFields, footer with Secondary "Cancel" and Primary "Save" | Card, FormField, Input, Select, Textarea, Checkbox, Button |
| Side panel flow | Table or detail page plus right Sheet (500px): header with title and close, scrolling body, footer with Secondary and Primary | Sheet, FormField, Button |
| Confirmation | Dialog (`confirm` size), consequence sentence, Cancel and Primary or Destructive | Dialog or AlertDialog, Button |
| Dashboard | `PageHeader`, 3 to 4 KpiCards per row, Cards with tables below | KpiCard, Card, Table |

Minimal list-page skeleton:

```tsx
<>
  <PageHeader
    title="Jobs"
    actions={<Button>Add job</Button>}
  />
  <Card>
    <DataTableToolbar searchPlaceholder="Search contains…" filters={filters} />
    <Table>{/* TableHeader, TableBody with StatusPill and Badge cells */}</Table>
    <Pagination />
  </Card>
</>
```

---

## 11. Known inconsistencies and open decisions

### 11.1 Inconsistencies in v2.0 and how this file resolves them

| Issue | Resolution used in the playground |
|---|---|
| Shadow labels in Figma run opposite to intensity (the "XL" label is the lightest). | Tokens are named by intensity: `shadow-xs`, `shadow-md`, `shadow-lg`, `shadow-xl` (10.1). Use by value. |
| Heights of 37px (search, segmented Tab Group), 33px (Tab Underline) and 29px (dense rows, menu items, Tab SM, Tab Pill SM) are not multiples of 4. Figma confirms these exact values. | Code uses the exact Figma values inside the component definitions only (`h-9.25`, `h-8.25`, `h-7.25`); no arbitrary pixel values on screens. |
| The default button size is not stated. Section 7 CSS defaults to SM (36px); the Figma Button set offers SM and MD. | `sm` is the default; `md` for page-level primary actions and mobile (confirm in 11.2). |
| Two blues: Primary/100 `#1D4ED8` (buttons, badges) and Info/100 `#004EEB` (icons, alerts, focus ring). | Both kept. Buttons and selected states use `primary-*`; alerts, info icons and the focus ring use `info-*`. |
| Primary scale numbering is not monotonic with the usual convention (25 is light; 50 to 400 get darker). | Token names copied exactly (10.1); use the semantic aliases (`bg-primary`, `bg-accent`, `text-link`) in screens instead of raw numbers where possible. |
| Section 7 CSS tokens duplicate section 10.1. | Section 7 stays as a framework-agnostic reference; the playground uses 10.1 only. |
| Status pill heights (28, 36, 44) vs button heights (36, 44). | Intentional: XS pill (28) is for dense table cells. |
| Caption MD/SM line height is 120% in v2.0, but the Figma typography table shows 0%. | Code uses 120% (`leading-tight` is 1.25; set `leading-[1.2]` once in a `text-caption` utility if needed). Confirm with design. |
| v2.0 said tabs are 37px, modals 480/640/960px and side panels 400–480px. | Corrected from the Figma file: Tab Underline 33px, Modal 650px, Side panel 500px (6.8, 6.10, 6.11). |

### 11.2 Open decisions (need an owner)

1. **Dark mode.** Solar defines no dark palette, but the starter has a toggle and `.dark` tokens. Assumption: light only; toggle and `.dark` block removed.
2. **Default sizes.** Confirm `sm` (36px) as the default for buttons and inputs, and `md` (44px) for page-level actions.
3. **Top nav content per role.** Section 6.8 lists a typical set but not the items for each `Role` variant (HO, PMD, Administrator, Legal, Franchise Development, Finance, OPS and Sales, IT Support, Marketing, Franchise). Needed to build `TopNav` accurately.
4. **CRDN wordmark asset.** `public/assets/images/logo.png` is the Dualboot logo. A CRDN wordmark (white version for the dark bar) and favicon are needed.
5. **Icon source.** This file assumes Heroicons outline (1.5px stroke) because it matches Solar's line icons; the Figma icon set (230 icons) may differ visually. Confirm, or export the set as SVGs into `components/icons/`.
6. **Domain components (9.6).** Rooms, items, photos, assignments and communication feed are not in the repo. Decide which screens come first so they are built once and reused.

### 11.3 Repo issues found while reading crdn-playground

- `CLAUDE.md` imports `.claude/rules/component-reuse.md` and `.claude/rules/git-workflow.md`, and `README.md` references `.claude/skills/new-page` and `from-figma`, but there is no `.claude` folder in the repo. Those rules and skills are not loading.
- To make Claude follow this file automatically, add a short rule (for example `.claude/rules/design-system.md`) that points to this document and states the 0.1 build order, rather than importing the whole file into every session.
- `app/page.tsx`, `Header` and `Sidebar` use `.loop-*` classes and gray/blue utilities; they are replaced by the Solar shell and should be deleted once `TopNav` exists.
- Installed Tailwind is 4.2.2 (from `pnpm-lock.yaml`), so the `--text-*--line-height` and `--text-*--letter-spacing` theme keys and decimal spacing utilities such as `h-6.5` used in section 10 are supported.

### 11.4 Verification against the Figma file (Nov 16, 2026)

Checked directly in `Solar for CRDN` (file key `cTaHUBjUqP4Qxd630YA0Vs`):

| Area | Result |
|---|---|
| Colors (neutral, primary, info, warning, error, success, alpha light and dark) | All hex values and alpha percentages match section 3. |
| Typography (Display, Subtitle, Label, Body, Button, Link, Eyebrow, Caption) | Sizes, letter spacing, weights and fonts match section 4. Caption line height differs (11.1). |
| Elevations | All four shadow values match section 5.3. |
| Spacing and radius | The 4px grid is confirmed; values live in a local "Spacing" variable collection shared with radius. The variable values themselves were shown only as an image, so they are not independently confirmed. |
| Button | Types Primary, Secondary, Destructive, Success, Ghost; sizes SM 36 and MD 44; icon buttons square; states Default, Hover, Focus, Disable, Loading; icon positions. All match. Combo Button also matches (Primary, Secondary White; SM, MD). |
| Status pills | XS 28, SM 36, MD 44; six types; states match. New: the pill-versus-badge matrix per entity (6.5). |
| Badges | SM 26 and MD 29, six types. New: MD size and the removal of the Filled style. |
| Tabs | Corrected: Tab Underline 33, Tab SM 29 and MD 32, segmented Tab Group 37. |
| Modals | Corrected: 650px wide, three types. |
| Side panel | Corrected: 500px wide, 16px padding. |
| Text area widths (220, 264, 468, 760) and dropdown item heights (29, 40), Search height (37) | Match. |

Not yet verified against Figma: input field heights, table dimensions, top navigation details, alerts and toasts, selection controls, cards and section layouts, pagination, date picker, file upload, wizard, and the domain components in 9.6. Treat those values in sections 6 and 10 as taken from v2.0.

Note: variable searches on this file returned no published CRDN color variables, only swatches in the Foundations page. Token names in this file are therefore the documentation names (Neutral/700 and so on), not confirmed Figma variable names.
