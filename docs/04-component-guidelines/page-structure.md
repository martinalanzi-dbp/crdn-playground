---
title: Page Structure (Header, Sections, Side Panel, Wizard)
cluster: 04-component-guidelines
family: page-structure
components: Header (Base Header, Job Header), Section (Base, Header, Content), Side Panel (Base, Header, Footer, content variants), Wizard Steps
audience: AI agents composing page layouts and content containers in UI
source: Figma "Solar for CRDN" > Components > Header, Sections, Side Panel, Wizard
scope: usage guidance only. Tokens, dimensional specs and per-component change history are intentionally excluded (change history belongs in 06-governance/changelog.md). Page grids and widths belong in 02-layout-and-structure/grid-and-layout.md.
---

# Page Structure

Components that frame a page and organize its content. Navigation inside the header (breadcrumbs, tabs): `navigation.md`. Actions in headers and footers: `actions.md`. Form fields placed inside sections or panels: `inputs.md`.

> Provenance: purposes, usage and structure come directly from the Figma documentation. Lines marked "Derived" are conclusions from those descriptions, not literal source statements.

## Choosing the right component

| Need | Use |
|---|---|
| Show the context of the current page at the top | Header |
| Show key info of a selected job, plus navigation between its pages | Header, Job Header |
| Present a titled group of details for an item | Section |
| Show, filter or edit information about a selected item without leaving the page | Side Panel |
| Guide users through a multi-step flow and show progress | Wizard Steps |

## Header

Dynamically displays information that helps users understand the context of the current page. In some implementations the header also houses the primary navigation of the whole site or application.

Header types:

| Type | Use | Contents |
|---|---|---|
| Jobs List (Base Header) | Header of the Jobs page | Title, description, and **two CTAs**: perform an item search or create a new job. |
| Selected Job (Job Header) | Appears **once a user clicks a Job** | The most relevant job information: homeowner name, claim number, loss reported date, job status, a dropdown to update the status, and a tab for easier navigation. |
| QMD | Variant of the header | Added for the Repricing and Call & Assignment screens. |

Rules:

- **Breadcrumbs are optional** in the header. They show the user's location in the structure and add clarity on multi-level pages (see `navigation.md`).
- On job pages, always show the Job Header with its key facts so users keep context while moving between job pages.
- An Alert can appear directly above the header area (see `feedback.md`).

## Section

A container that presents the details of a chosen item. It can combine various UI components, such as lists, text areas and icons, to show the item's details in a well-structured format. Layout, styling and displayed information can be customized to the specific item type.

### Anatomy

1. **Header**: title area of the section.
2. **Date list**: list of date fields.
3. **Content**: the section body.
4. **Text list**: list of text fields.
5. **Badge list**: list of badges.
6. **Footer** (optional).

### Use case: Job Details

Job Details is the reference use case. Its section contents are defined for these groups: **General, Homeowner, Policy Holder, Policy Temporary Housing, Contractor, Agency, Insurance / Adjuster Information, Commissions, Pickup Authorization, TPA**. A base (empty) section content also exists for other item types.

Rules:

- Group related data into one section per topic, as in the Job Details groups above.
- Use the lists (date, text, badge) to present fields; add a footer only when the section needs actions.

## Side Panel

Interactive area within the platform where users efficiently consume and edit information.

Usage:

- Displays comprehensive information about selected items.
- Lets users apply and adjust filters to refine displayed data.
- Lets users modify and update item information directly in the panel.
- **Optional footer**: customizable or enabled when specific actions are needed.

Structure: **Base**, **Header** and **Footer**. Content is plugged into the base.

### Content variants defined in the file

| Content | States |
|---|---|
| Job Creation | Default, Populated |
| Job List | Default |
| Selected Job | View, Edit |
| Add Estimate | Default |
| Room | Add Room, Edit Room |
| Room, Edit Images | Empty, Populated |
| Item Search | Default, Empty, Item Details, Item QR |

Derived: use View and Edit states to let users read a record and edit it in the same panel; use Empty states when there is nothing to show yet.

## Wizard Steps

Step indicator for multi-step flows. Each step shows a name and a status.

| Step status | Appearance |
|---|---|
| Current | Highlighted outline with a filled marker. |
| Upcoming | Neutral, empty marker. |
| Completed | Check marker. |

The source documents only the three step visuals, with no written purpose, usage or behavior. The status names above are **Derived** from the visuals; in the file the variants are named "Default", "Variant2" and "Variant3".

## Documentation gaps

The source does not define the following. Flag them instead of inventing rules:

- Wizard: purpose, number of steps, whether steps are clickable, error or disabled step states, and how steps connect.
- Header: when to use the base header on pages other than Jobs List, and the breadcrumb levels shown per page.
- Section: rules for collapsing or reordering sections.
- Side Panel: close behavior, whether it overlays or pushes content, and when to show the footer.
- Which content variants apply to which pages beyond the named ones.

## Source inconsistencies to confirm

| Topic | Inconsistency |
|---|---|
| Side Panel purpose | The Purpose text refers to the platform as "RestorNet", while the file and other pages are named for CRDN. |
| Wizard documentation | The page is titled "Wizard Steps" and has no documentation section, unlike the other components. |
