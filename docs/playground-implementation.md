# Solar for CRDN: playground implementation

Companion to `DESIGN.md` (repo root). `DESIGN.md` holds the values and the intent; this file maps them onto crdn-playground (Next.js App Router, Tailwind 4 `@theme`, shadcn/ui). Where this file and `DESIGN.md` disagree on a value, `DESIGN.md` wins.

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
| Side Panel (Base, Header, Footer) | `ui/sheet.tsx` | Restyle | Right side, 400 to 480px |
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
- FormField anatomy: red `*` (`text-error-100`) before the `Label` when required (`text-sm text-neutral-700`; Figma's Input component renders the label at regular 400, while the `label-sm` style is 500, confirm with design), optional 16px info icon, then 4px gap (`gap-1`), control, 8px gap (`gap-2`), hint (`text-xs text-neutral-500` with 16px icon; in error: icon `text-error-100`, text `text-error-200`).
- Search: `Input` with a leading `MagnifyingGlassIcon` (16px, `text-neutral-400`, `pl-9`). Job List variant has a "Contains" or "Starts with" dropdown and the placeholder "Search contains…" or "Search starts with…".

#### 10.5.3 Select and dropdown menu

- Trigger: same classes as Input, trailing 16px `ChevronDownIcon` in `text-neutral-500`.
- Content: `rounded-md border border-border bg-white p-2 shadow-md`.
- Item: `h-7 rounded-sm px-2 text-sm focus:bg-neutral-50 data-[state=checked]:bg-accent` (SM, 29px in Figma); MD items `h-10`. Multi-select uses checkbox items. "Clear selection" is always the first item and has no checkbox. Empty typeahead shows a "No results found" row.

#### 10.5.4 Card and section

- Replace `rounded-xl ... ring-1 ring-foreground/10` with `rounded-md border border-border bg-card`. Padding: `[--card-spacing:--spacing(6)]` (24px standard) or `--spacing(4)` (16px compact). No shadow unless the card is a menu or modal.
- Section header: title `text-display-xs font-medium text-neutral-800`, actions right-aligned in `CardAction`.
- Footer: drop `bg-muted/50`; keep a `border-t` only when it separates actions.

#### 10.5.5 Table

- Container: `overflow-hidden rounded-md border border-border bg-white`. The shadcn wrapper only scrolls, so add the border and radius on a parent or in `Table`.
- Head: `h-16 bg-neutral-50 px-6 text-sm font-medium text-neutral-700`. Cell: `px-6 py-3 text-sm text-neutral-700`. Dense rows: `h-7 py-0`.
- Row: `border-b border-border hover:bg-neutral-50 data-[state=selected]:bg-primary-25`.
- Row actions: right-aligned ghost icon buttons (`icon-sm`). Cells hold text, Badge, StatusPill, Avatar or icon plus text.
- Below the table: Pagination with page-size select on the left and "1–25 of 340" with previous and next on the right. Empty body: one sentence plus the primary action.

#### 10.5.6 Badge

- Replace `rounded-4xl h-5 px-2` with `h-6.5 rounded-md px-3 text-xs font-medium` (26px; if the half-step is not available use `h-[26px]` once inside this component only).
- Variants: `default` (tag): `bg-primary-25 text-primary-100`; `info`, `success`, `warning`, `error`: `bg-{x}-50 text-{x}-200`; `neutral`: `bg-neutral-50 text-neutral-700`. Item condition badges (Restorable, Storage only, Non-salvageable) map to `success`, `warning`, `error`.

#### 10.5.7 StatusPill

Dropdown-style pill when the status can change, Badge when it cannot. Built on `DropdownMenu`: trigger `h-9 rounded-md border border-border bg-white px-3 text-sm text-neutral-900 hover:bg-neutral-50` with icon, label, 1px separator and `ChevronDownIcon`. Sizes XS 28px (`h-7`), SM 36px (`h-9`), MD 44px (`h-11`). Loading shows a Spinner and "Loading" at the previous width; disabled uses `bg-neutral-100`.

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
- Add a `size` prop: `confirm` = `sm:max-w-120` (480), `form` = `sm:max-w-160` (640), `content` = `sm:max-w-240` (960). The starter's `sm:max-w-sm` is too narrow.
- Footer: drop `bg-muted/50`; right-aligned, Secondary "Cancel" first, then Primary or Destructive. Confirmation copy states the consequence, no exclamation marks.

#### 10.5.9 Tabs (secondary navigation under the page header)

Use `TabsList variant="line"`. Target: list `h-9 w-full justify-start gap-0 rounded-none border-b border-border bg-transparent p-0`; trigger `h-9 flex-none rounded-none px-4 text-sm font-medium text-neutral-500 hover:text-neutral-700 data-active:text-primary-100 data-active:after:bg-primary-50 data-active:after:opacity-100`, with the underline `after:bottom-0 after:h-0.5`. The starter's `after:bottom-[-5px]` and `p-[3px]` list padding are for the pill style and must not apply to the line variant.

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
| Side panel flow | Table or detail page plus right Sheet (400 to 480px): header with title and close, scrolling body, footer with Secondary and Primary | Sheet, FormField, Button |
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
| Heights of 37px (Navigation/Secondary bar, tab group, search), 33px (underline tab) and 29px (dense rows, menu items, vertical tabs) are not multiples of 4. They are 36, 32 and 28 plus a 1px border in Figma. | Code uses 36px (`h-9`), 32px (`h-8`) and 28px (`h-7`) with the border inside the box. |
| The default button size is not stated. Section 7 CSS defaults to SM (36px); the Figma Button set offers SM and MD. | `sm` is the default for all buttons; `md` only for the status control in a page header (decided 2026-11-17, see DESIGN.md "Buttons > Choosing a size"). |
| Two blues: Primary/100 `#1D4ED8` (buttons, badges) and Info/100 `#004EEB` (icons, alerts, focus ring). | Both kept. Buttons and selected states use `primary-*`; alerts, info icons and the focus ring use `info-*`. |
| Primary scale numbering is not monotonic with the usual convention (25 is light; 50 to 400 get darker). | Token names copied exactly (10.1); use the semantic aliases (`bg-primary`, `bg-accent`, `text-link`) in screens instead of raw numbers where possible. |
| Section 7 CSS tokens duplicate section 10.1. | Section 7 stays as a framework-agnostic reference; the playground uses 10.1 only. |
| Status pill heights (28, 36, 44) vs button heights (36, 44). | Intentional: XS pill (28) is for dense table cells. |

### 11.2 Open decisions (need an owner)

1. **Dark mode.** Solar defines no dark palette, but the starter has a toggle and `.dark` tokens. Assumption: light only; toggle and `.dark` block removed.
2. **Default sizes.** Resolved 2026-11-17: `sm` (36px) for all buttons and inputs; `md` (44px) only for the status control in a page header.
3. **Top nav content per role.** Section 6.8 lists a typical set but not the items for each `Role` variant (HO, PMD, Administrator, Legal, Franchise Development, Finance, OPS and Sales, IT Support, Marketing, Franchise). Needed to build `TopNav` accurately.
4. **CRDN wordmark asset.** `public/assets/images/logo.png` is the Dualboot logo. A CRDN wordmark (white version for the dark bar) and favicon are needed.
5. **Icon source.** This file assumes Heroicons outline (1.5px stroke) because it matches Solar's line icons; the Figma icon set (230 icons) may differ visually. Confirm, or export the set as SVGs into `components/icons/`.
6. **Domain components (9.6).** Rooms, items, photos, assignments and communication feed are not in the repo. Decide which screens come first so they are built once and reused.

### 11.3 Repo issues found while reading crdn-playground

- `CLAUDE.md` imports `.claude/rules/component-reuse.md` and `.claude/rules/git-workflow.md`, and `README.md` references `.claude/skills/new-page` and `from-figma`, but there is no `.claude` folder in the repo. Those rules and skills are not loading.
- To make Claude follow this file automatically, add a short rule (for example `.claude/rules/design-system.md`) that points to this document and states the 0.1 build order, rather than importing the whole file into every session.
- `app/page.tsx`, `Header` and `Sidebar` use `.loop-*` classes and gray/blue utilities; they are replaced by the Solar shell and should be deleted once `TopNav` exists.
- `package.json` requests `tailwindcss ^4.0.14`; confirm the installed version supports `--text-*--letter-spacing` theme keys (Tailwind 4.0 and later do) before relying on the `text-display-*` utilities.
