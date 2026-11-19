---
title: Selection and Search Patterns
cluster: 03-interaction-patterns
pattern: selection-and-search
uses_components: Search with Filters, Dropdown, Pills - Filter, Table Cell (Checkbox / Radio), Checkbox, Radio Button, Activity Header, Library Header, Item Header, Photo Card, Photo Export Popup, Card Item
audience: AI agents designing how users find, filter and select items
source: Synthesized from 04-component-guidelines/inputs.md, data-and-content.md, navigation.md
scope: cross-component behavior only. No tokens, no dimensional specs.
---

# Selection and Search Patterns

How users find items (search, filter) and choose them (single, multiple, bulk).

> Provenance: component behaviors are from Figma. Items marked **(Derived)** are combinations or inferences.

## 1. Finding: search and filter

### Search with Filters
- Used for the Job List. Predefined filters: **Contains** (default) and **Starts With**.
- Results update dynamically as the user types.
- The filter dropdown offers the *other* filter than the active one.

### Activity and library headers
Headers that sit at the top of a page give a consistent place to **search, filter and create**:

| Header | Offers |
|---|---|
| Table Header (Job List) | Job status, Date, Search, Filters |
| Activity Header (Communication) | Search input, Filter options (date, type, sender, recipient...), New Communication |
| Library Header (Photos) | Library/room name, Export, Search, Filters |

Search can be collapsed to an icon and expanded when used.

### Applied filters
- Show applied filters as **Filter Pills** under the header (Table Filters: Base = none applied, Populated = filters shown).
- Each pill has an optional "x" so users can remove a filter dynamically.

### Search results
- Results of a search can render as **Card Items** (avatar + link). Clicking opens the item's details.
- States to design for: Loading, Populated, **No Results** (search/filter matched nothing), **Empty State** (no data exists) **(Derived distinction)**.
- Dropdown typeahead mirrors this: spinner while searching, "No results found" when empty.

## 2. Choosing a value from a list

| Case | Control and behavior |
|---|---|
| One option, short list | Radio Button |
| One option, long list | Dropdown; typeahead for long lists |
| Several options | Checkbox group or multi-select Dropdown |
| Reset selection | "Clear Selection" at the top of single/typeahead lists; "deselect all" at the top of multi-select lists, styled as a regular option |
| Ambiguous values | Secondary selection with identifying attributes |

Keep lists short and relevant; scroll inside the list when options exceed the space.

## 3. Selecting rows and items

- Table cells support three modes: **Normal**, **Checkbox** (select or toggle items) and **Radio button** (select one).
- Use Checkbox for multiple, Radio for one.
- Selected state is visible: Active cell state, selected folder highlighted in Tree View, Selected state for Room Folder cards **(Derived for the common rule: always show what is selected)**.
- Currently selected navigation items (folder, assignment, estimate, room) **must be highlighted**.

## 4. Bulk selection (Photos)

1. Each Photo Card has a selection checkbox; hovering shows available actions.
2. Item headers provide **Select/Deselect All** for the photos of that item.
3. When photos are selected, the **Photo Export Popup** appears at the bottom with the photo count, Delete, Export as PDF, Export as ZIP and a Close icon.
4. Delete opens the deletion confirmation modal (see `actions-and-feedback.md`).
5. The popup stays while the user remains in the Photos tab. **Leaving the tab closes it and cancels the selection.**

A pin icon on a photo marks it as the **thumbnail** for the room; clicking the icon container sets it **(single choice per room, Derived)**.

## 5. Selecting dates

Single date: click a day, selection highlights, clicking another changes it. Range: click start then end, the range highlights, clicking a different start/end changes it. The value updates as soon as a day is clicked.

## Decision checklist

1. Can the user find the item: search, filter and applied-filter pills available?
2. Are Loading, No Results and Empty states designed?
3. Single vs multiple selection matches Radio vs Checkbox?
4. Is the selected item always visibly highlighted?
5. For bulk actions: count, actions and what cancels the selection defined?

## Documentation gaps

- Whether search is by button or live for every context (only Job List search is specified as dynamic).
- Filter combination logic (AND/OR) and how many filters can be active.
- Persisting selections across pagination.
- Sort behavior in tables.
- Keyboard selection (shift/ctrl multi-select).
