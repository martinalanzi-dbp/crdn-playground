---
title: Navigation and Wayfinding Patterns
cluster: 03-interaction-patterns
pattern: navigation-and-wayfinding
uses_components: Navigation, Horizontal Tabs, Vertical Tabs, Breadcrumbs, Inline Menu, Tabs, Pagination, Tree View, Header, Job Header, Link
audience: AI agents deciding how users know where they are and move between places
source: Synthesized from 04-component-guidelines/navigation.md, page-structure.md, data-and-content.md, actions.md
scope: cross-component behavior only. No tokens, no dimensional specs.
---

# Navigation and Wayfinding Patterns

Answers three questions for the user: **Where am I? Where can I go? How do I get back?**

> Provenance: hierarchy and component rules are from Figma. Items marked **(Derived)** are combinations or inferences. The source has an unresolved inconsistency about tab vs side-nav hierarchy (see end).

## 1. Navigation layers

| Layer | Component | Answers |
|---|---|---|
| Primary | Role-based Navigation (legacy: side Menu) | Where can I go in the platform? |
| Context | Header (Jobs List, Job Header) | What am I looking at? |
| Secondary | Horizontal Tabs (job pages); Breadcrumbs | Where am I in the job, and how do I go up? |
| Tertiary | Vertical Tabs / side-nav | What are the sections of this page? |
| In-job structure | Tree View | Which assignment, estimate, folder or room? |
| Quick access | Inline Menu | Shortcuts in context |
| Paging | Pagination | Which page of the list? |

Rules:
- Breadcrumbs are secondary; never replace primary navigation.
- Tabs switch sections of content within a single view.
- Vertical Tabs allow only **one level** of nested items.

## 2. The job context pattern

1. From the Jobs list, the user clicks a job.
2. The **Job Header** appears with homeowner name, claim number, loss reported date, job status, a status dropdown and tabs.
3. **Horizontal Tabs** move between the pages of the job; the active tab shows where the user is.
4. Inside job content, **Tree View** switches among assignments, estimates, folders, rooms and the recycle bin. The selected item is highlighted.
5. Always keep the Job Header visible on job pages so users keep context.

Tree View structure changes with the assignment type (Contents, Textiles, Textiles + Contents).

## 3. Showing location

- Active state is always distinct: tabs (Active/Inactive/Hover), menu links (Default/Pressed/Active), Tree View (Current/Opened/Closed).
- Breadcrumbs are optional in the header; use them on multi-level pages. Start from the highest-level parent and go deeper; keep labels short and tied to the entity.
- The page Header gives the title and description for the current page.

## 4. Choosing a navigation component

| Situation | Use |
|---|---|
| Different main sections of the platform | Main navigation (per role) |
| Pages of one job | Horizontal Tabs |
| Sections within one page, next to content | Vertical Tabs |
| A few views of the same content | Tabs (underline or segmented control) |
| Climb back up levels | Breadcrumbs |
| Frequent actions/sections grouped in a dropdown | Inline Menu |
| Switch folder/assignment/estimate/room | Tree View |
| Long list | Pagination (only for lists over 25 items) |

## 5. Role-based visibility

Navigation items differ by role (Franchise, PMD, Administrator, Legal, Franchise Development, Finance, OPS and Sales, IT Support, Marketing). Show a user only the items defined for their role. Role-specific screens may still change.

## 6. Responsive

Navigation has Tablet and Mobile versions, each Open and Closed. Tabs must adapt to different screen sizes.

## 7. Link vs Button for navigation

Use a **Link** for navigation or extra context; use a **Button** for actions that change data. Links that open details can reveal information in the same page (for example a side panel) or navigate to a related page. Program links open a side panel with program details (Post-MVP; show plain text until then).

## 8. Leaving and cancelling

- Leaving the Photos tab closes the export popup and cancels its selection.
- Only one pattern for returning up levels is defined: Breadcrumbs. No explicit "Back" button pattern exists in the source.

## 9. Pagination

Bottom of a long list; Previous decreases the page by one, Next increases by one; disabled when not usable (for example Previous on page one, Derived); ellipsis for skipped ranges.

## Decision checklist

1. Does the user see the page title/context (Header)?
2. Is the active location visibly marked?
3. Is the way back available (breadcrumbs or tabs)?
4. Are items filtered by role?
5. Is only one level nested in side-nav?

## Documentation gaps

- Maximum tabs or breadcrumb levels, mobile breadcrumb truncation.
- "Back" button pattern.
- Whether the legacy side menu is still used.
- Deep-link and URL behavior.
- Guidance for dead ends (permission denied, not found).

## Source inconsistencies to confirm

- Horizontal Tabs are "secondary" and the side-nav "tertiary", yet the Tabs usage says tabs are secondary in hierarchy to the side-nav when both appear. Hierarchy above follows the labeled levels.
