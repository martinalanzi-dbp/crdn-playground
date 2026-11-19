---
title: Navigation (Main Navigation, Horizontal Tabs, Vertical Tabs / Side-nav, Inline Menu, Tabs, Breadcrumbs, Pagination)
cluster: 04-component-guidelines
family: navigation
components: Navigation (role-based top nav, responsive), Main Navigation menu (legacy side menu), Horizontal Tabs, Vertical Tabs (side-nav), Inline Menu, Tabs (underline, segmented control, pill), Breadcrumbs, Pagination
audience: AI agents choosing and composing navigation components in UI
source: Figma "Solar for CRDN" > Components > Navigation, Breadcrumbs, Tabs, Pagination
scope: usage guidance only. Tokens, dimensional specs, code snippets and per-component change history are intentionally excluded (change history belongs in 06-governance/changelog.md). The page Header lives in page-structure.md.
---

# Navigation

Components that help users move between pages, sections and content. Cross-component wayfinding rules will live in `03-interaction-patterns/navigation-and-wayfinding.md`. Link styling: `actions.md`.

> Provenance: purposes, usage and states come directly from the Figma documentation. Lines marked "Derived" are conclusions from those descriptions, not literal source statements.

## Navigation hierarchy

| Level | Component | Role |
|---|---|---|
| Primary | Main navigation (role-based Navigation; legacy side Menu) | Moves between the platform's main sections. |
| Secondary | Horizontal Tabs; Breadcrumbs | Moves within a job (tabs) or shows where the user is and navigates back (breadcrumbs). |
| Tertiary | Vertical Tabs / side-nav | In-page navigation under the header, next to the content. |
| Quick access | Inline Menu | Fast access to frequent sections or actions, in context. |
| Content splitting | Pagination | Moves between pages of a long list. |

Rules:

- Breadcrumbs are always secondary and must never entirely replace the primary navigation.
- Use Tabs to switch between sections of content within a single view.

## Choosing the right component

| Need | Use |
|---|---|
| Move between the platform's main sections | Navigation (main) |
| Move between pages of one job | Horizontal Tabs |
| Show hierarchy and let users go back up levels | Breadcrumbs |
| Navigate sections of a page, next to the content | Vertical Tabs (side-nav) |
| Quick access to frequent sections or features, grouping related options in a dropdown | Inline Menu |
| Switch between a few options in one view | Tabs, segmented control |
| Switch between sections with a simple highlighted indicator | Tabs, underline |
| Split a long list into pages | Pagination |

## Navigation (main)

### Role-based navigation

The current Navigation is designed per **role**. Each menu item has a variant for each role, and the links may change as role-specific screens are finalized (the source states some role screens were not yet created).

Roles with a defined navigation: Franchise, PMD, Administrator, Legal, Franchise Development, Finance, OPS and Sales, IT Support, Marketing. A Head Office (HO) variant exists but is hidden.

Menu link states: **Default, Pressed, Active**.

Responsive: a Responsive Navigation exists for **Tablet** and **Mobile**, each in **Open** and **Closed** states.

The source gives no written usage rules for the role-based navigation; the above is what the file defines.

### Main Navigation menu (legacy side menu)

Section is labeled **"OLD - Main Navigation"** in Figma. Treat it as legacy unless the design team says otherwise.

Purpose: a structured, reusable way to present primary navigation options on the platform.

- Shows a hierarchy of links to navigate between sections or pages.
- Users can toggle between **expanded** and **collapsed** views.

**Collapsed menu**

- Hovering the avatar reveals an arrow button; clicking it expands the menu.
- Hovering a menu icon shows a tooltip with the section name.
- Selecting an icon marks it as active by changing its background color.

**Expanded menu**

- Logout is available in the expanded menu.
- The expanded menu closes with the close icon.
- Selecting an item marks it active by changing its background color.

Other behaviors: menu item states are default, hover, selected, selected-hover. The menu adapts to different screen heights. Non-production environments (UAT, QA, Dev) have environment badge examples.

## Horizontal Tabs

Secondary navigation. The central hub for overall job navigation: a quick, reliable way to reach the different pages of a job within the larger job listing, and to move efficiently between job detail pages.

- Use a tabbed interface so users can switch between sections of the job information.
- Keeps all job-related content under one navigation structure for a cohesive experience.
- States: **Active** (where the user currently is), **Inactive**, **Hover** (shows the tab can be selected).

## Vertical Tabs (side-nav)

Tertiary navigation. Sits below the header, next to the page content.

- Can be fixed-width or flexible.
- **Only one level of nested items** is allowed.
- Both links and category lists can be used inside it.
- States: **Active**, **Inactive**.

## Inline Menu

Provides quick access to frequently used sections or features.

- Use for quick navigation.
- Shows relevant actions or options based on the current context or user interaction.
- Uses dropdown functionality to group related options and save screen space.
- Made of two elements: an icon container and a dropdown. Has collapsed and expanded states.

## Tabs

Navigation element for switching between sections of content within a single view. Supports multiple styles.

### Types

| Type | Description | Best for |
|---|---|---|
| Tab underline | A line beneath the text highlights the active tab. Simple and clear. | Switching between content sections. |
| Segmented control | Alternate buttons; the selected tab is shown through a change in color or emphasis. | Shorter lists of options. |

Pill tabs (Active, Inactive, Tertiary; sizes SM and MD) are used in the Vertical Tabs side-nav.

### Usage rules

- Keep styling uniform across tabs for visual coherence and easier navigation.
- Restrict the number of tabs and keep labels concise and relevant, to avoid overwhelming users.
- Tabs must accurately represent the content they lead to.
- Tabs must adapt to different screen sizes to remain usable on all devices.
- If a page uses tabs and a side-nav together, see the inconsistency note below.
- Use subtle animation for the active-indicator transition.

## Breadcrumbs

Secondary navigation pattern that shows the hierarchy among levels and lets users navigate back through them.

- Always secondary; never entirely replace the primary navigation.
- Keep each page link short and clearly reflecting the location or entity it links to.
- Start with the highest-level parent page and go deeper into the information architecture as the trail progresses.

## Pagination

Splits content or data into several pages, with controls to move to the next or previous page.

- Use **only for lists with more than 25 items**.
- Place it at the bottom of a long list that has been split into pages.
- **Previous** decrements the current page by one. **Next** increments it by one.
- Item states: **Default, Hover, Focus, Selected, Disabled**. Disabled applies to controls that cannot be used (for example Previous on the first page; Derived).
- Item types: label (Previous, Next, with or without icon), page number, and ellipsis for skipped ranges.

## Documentation gaps

The source does not define the following. Flag them instead of inventing rules:

- Written usage rules for the role-based Navigation, including how roles map to items.
- Maximum number of tabs or breadcrumb levels.
- Breadcrumb behavior on mobile, and truncation of long trails.
- Page size options, and page-number display rules for large page counts in Pagination.
- Whether the legacy side menu is still in use anywhere.

## Source inconsistencies to confirm

| Topic | Inconsistency | Default applied here |
|---|---|---|
| Tabs vs side-nav hierarchy | Horizontal Tabs are called **secondary** and the side-nav **tertiary**, but the Horizontal Tabs usage says that when tabs and a side-nav appear together "the tabs are secondary in hierarchy to the side-nav". | Hierarchy as in the table above: tabs secondary, side-nav tertiary. |
| Legacy menu | The side menu section is titled "OLD - Main Navigation", but it holds the only written documentation for primary navigation. | Documented as legacy; role-based Navigation treated as current. |
