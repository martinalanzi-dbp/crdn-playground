---
title: Data and Content Components
cluster: 04-component-guidelines
family: data-and-content
components: [Table, List, Cards, Items, Avatar, Badges, Pills - Filter, Pills - Status, Rooms, Assignments, Communication, Photos, Illustrations]
audience: AI agents
source: Figma "Solar for CRDN" - component pages
scope: Best practices and usage guidance only. No tokens, no component specs (sizes, spacing, colors, CSS).
---

# Data and Content Components

Components that display, summarize or organize information: tabular data, lists, status indicators, identity visuals, and the domain-specific content blocks used in Jobs (Rooms, Assignments, Communication, Photos).

## Provenance

Content comes from the Purpose / Usage / Best practices text on each Figma page. Statements marked **(Derived)** are inferred from variant names or layout, not written in the source. Changelog entries ("Changes:") are intentionally excluded and belong in `06-governance/changelog.md`.

## Choosing the right component

| Need | Use | Notes |
|---|---|---|
| Compare/analyze many records in rows and columns | Table | Cell types: Header, Text, Text + Badge, Avatar + Link, Link, Badge, Icon, Pill |
| Show details of one selected record as label/value rows | List (Item) | Types: Text, Date, Badge, Pill, Link |
| Show a result of a search that opens an item's detail | Items - Card Item | Avatar + Link |
| Show a KPI/count that filters or navigates | Cards - KPI Card | Has Default and Pressed states |
| Switch between assignments, estimates, folders, rooms | Items - Tree View | Navigation inside a job |
| Add line items quickly to a table | Items - Quick Add | Differs for Xactimate vs Symbility |
| Indicate a non-interactive attribute or status | Badge | Purely ornamental |
| Indicate a job/entity status that can be interacted with | Pill - Status | Can open a status dropdown |
| Show/remove active filters | Pill - Filter | Optional remove "x" |
| Represent a user or entity visually | Avatar | Image, Initials, Logo; Avatar group |
| Show there is nothing to display | Illustration (empty state) | With a friendly message |

---

## Table

**Purpose.** Cells systematically organize and present varied datasets in a structured format so data is easy to read, compare and analyze.

**Structure.** A table is made of Table Base, Table Header, Table Filters and Table Content, assembled from columns of Table Cells.

### Table Cell
- A cell is the basic unit at the intersection of a row and a column and holds one data point.
- **Use cases:**
  - **Normal** – basic data representation.
  - **Checkbox** – lets users select or toggle items in the table.
  - **Radio button** – lets users select a single item from a set.
- **Cell types:** Header (labels a column), Text, Text + Badge (text with extra information), Avatar + Link (avatar with text), Link (clickable, for navigation or action), Badge (attribute or status), Icon (information or action), Pill.
- **States:** Default (initial appearance), Active (currently engaged/focused), Disabled (inactive or unselectable due to restrictions or conditions; no interaction).

### Table Header
- Variants exist for the Job List. Header buttons: Default (job status), Date, Search, Filters, each with Default and Hover states.

### Table Filters
- Two states: Base (no filters applied) and Populated (applied filters shown as Filter Pills).

### Table Content
- Documented content states for the Job List: **Base, Populated, Loading, No Results, Empty State**.
- Use **No Results** when a search/filter returns nothing, and **Empty State** when there is no data at all **(Derived)**.

---

## List (Item)

**Purpose.** Displays detailed information about what has been selected. Flexible across contexts (job details, product information, any specific item within a larger dataset).

**Item types and when to use them:**

| Type | Use |
|---|---|
| Text | Show text details |
| Date | Text area used to display a date. Time is optional |
| Badge | Display statuses |
| Pill | Interactive status/label value **(Derived)** |
| Link | Reveals additional details within the current page or navigates to a different but related page |
| Link + copy button | A copy button next to the item's details; clicking copies the information to the user's clipboard |

---

## Cards (KPI Card)

- Used for KPI summaries that act as shortcuts. Each card has **Default** and **Pressed** states.
- Documented groups by name: **TIP** (Urgent, Soon, Past Due Date, Upcoming), **QMD** (XACT Requests, Cotality Requests), **C&A** (XACT Assignments, Cotality Assignments, Job Assignments, Call Assignments).
- **(Derived)** A pressed card indicates the currently applied KPI filter.
- No written best practices exist in the source for this page.

---

## Items

### Card Item
- **Purpose.** Composed of an avatar and a link. Displayed in a list as the result of a search. Clicking navigates to that item's details.
- **Anatomy.** Avatar + Link.
- **States.** Default and Hover; hover adds interactivity according to the component's theme.
- Can be shown as a single item or as a list of items.

### Quick Add
- **Purpose.** Add items to a table quickly. Required information varies depending on whether the job uses **Xactimate** or **Symbility**.
- **Best practices:**
  - Quantity is always defaulted to **1**.
  - Status is always defaulted to **Restorable**.
  - Unit of Measure is **not editable**, but is shown once Product/Categories are selected.
- **Variants:** Symbility; Xactimate with "Add item by" **Product** or **Category and Selector**; each in Not Filled and Filled status.
- **Item Notes.** Optional notes on an item, Default and Expanded states.

### Tree View
- **Purpose.** Navigation to switch between assignments, estimates, folders, rooms and the recycle bin within the job.
- **Best practices:**
  - Each type has a dedicated icon for easy recognition.
  - The "paid" badge is only for highlighting paid features, when applicable.
  - When a folder/assignment/estimate/room is selected, it must be highlighted.
- **Item types:** Assignment, Estimate, Folder, Room, Recycle Bin.
- **States:** Closed, Current, Opened, Hover.
- **Structure varies by assignment type:** Contents, Textiles, or Textiles + Contents.

---

## Avatar

**Purpose.** Visual representation of a user or entity: profile pictures, initials or other visual identifiers.

**Best practices:**
- Use Avatar consistently across the application.
- Keep a consistent aspect ratio for profile pictures.
- Provide meaningful alt text for profile pictures (accessibility).

**Types:**
- **Basic (Image)** – simplest form; users or entities with profile pictures.
- **Initials** – when a profile picture is not available, show the user's initials.
- **Logo** – for entities **(Derived)**.
- **Avatar group** – stacks multiple avatars to represent a group of images. Created for the main cards in the Rooms section.

---

## Badges

**Purpose.** Highlight or indicate attributes, status or characteristics of an item or user.

**Best practices:**
- Keep content easily scannable for quick comprehension.
- Convey clear, meaningful information.
- Badges are **purely ornamental**: no associated actions or functionality.
- Avoid overcrowding; use sparingly to prevent visual clutter.

**Badge types (semantic):** Primary, Default, Success, Error, Warning, Info. Used to convey semantic meaning such as states.

**Style:** Accent. Filled badges are **not used** in the designs.

**Item status.** Items carry a specific badge for their status. Documented item statuses: **Restorable, Storage Only, Non-Salvageable**. Follow the color mapping defined for each case in Figma.

---

## Pills

### Pills - Filter
- **Purpose.** Represent filters (and status) in a clean, visually appealing way.
- **Usage in Table Filters:**
  - Pills contain text that represents a tag or label.
  - Pills may feature an "x" button so users can remove tags dynamically.
  - Pills act as filter options, letting users select and remove filters easily.

### Pills - Status
- **Types (statuses):** Draft, Active, Canceled, Inactive, Closed, Payment Applied.
- **States:** Default, Hover, Focus, Disable, Loading.
- **Pill Dropdown.** Status pills open a dropdown to switch status.
- **Loading state.** Shown in the dropdown while switching actions. Its width must match the original action button so the layout stays consistent.
- **Pill vs Badge by entity.** Status Comparison shows, per entity, whether status is rendered as an interactive Pill or a static Badge:
  - Entities compared: Jobs, Assignments, Estimates, Programs, Companies, Contacts.
  - Pills are used where status can be changed (e.g., Programs: Draft, Inactive; Estimates: Payment Applied; Jobs/Assignments/Estimates: Active; Canceled/Closed in several entities). Badges are used for the remaining read-only cases.
  - Item statuses (Restorable, Storage Only, Non-Salvageable) always use Badges.
- **(Derived)** Use a Pill when the user can act on the status; use a Badge when it is informational only.
- Sizes available: XS, SM, MD (XS is not available for every state, e.g., a subset of Filter/Hover combinations).

---

## Rooms

### Room Card
- **Purpose.** Present and organize multiple rooms within the "Rooms" section.
- **Anatomy (four elements):** Avatar, Icon container, Avatar group, Ghost button. The **Ghost button (3) is optional**.
- **Usage: States.** Default (default when creating a new room) and Hover (focus action when hovering the card creation).
- **Usage: Stages** (phases of content):
  - **Default** – no cover and no items yet. The Avatar group is not displayed. Default description: "No items yet."
  - **Empty** – no items yet, but a cover is already added. If the room has no images or just a thumbnail, the Avatar group is not displayed.
  - **Populated** – cover, items and pictures added. Display a **maximum of 5 images** in the card. If there are more than 5, show the Avatar variant with initials replaced by the text `{{+n}}`, where `n` is the number of additional images.

### Photos Preview (Picture Card)
- **Purpose.** Display pictures within the room.
- **Anatomy.** Badge and Icon container.
- **Usage:**
  - The "Post-Restoration" badge is optional, depending on context.
  - The icon container is interactive: clicking it sets the image as the **thumbnail**.
  - Pin icon indicates pinned (thumbnail) or not.
- **States.** Default (shows image, name, sometimes the badge) and Hover (an overlay shows the actions available for the image).

---

## Assignments

Assignment detail is composed of sections. Each section has a documented purpose; some have Default and Edit variants.

| Section | Purpose | Notes |
|---|---|---|
| Banner | Concise overview of an assignment: name, status, type | Place at the **top of the page** for immediate context |
| General | Essential info and key attributes; central hub for context | Default and Edit |
| Billing Summary | Financial overview: billing information and costs | Default |
| Taxes (and Discounts) | Tax implications and requirements | Default and Edit |
| Program Requirements | Steps, tasks or deliverables needed to finish the assignment | See rules below |
| Delivery | Delivery of the assignment or its items | Default and Edit |
| Items | Breakdown of items: status, quantity, salvage/restoration | Restorable and Non Salvage summaries |
| Estimates | Overview of all estimates; financial projections and planning | Default |

**General section field rules:**
- **Type** – assignment type.
- **Status** – Active, Canceled or Closed.
- **ID** – auto-generated by the system, **not editable**.
- **Carrier Assignment #** – editable; optional, may not always appear.
- **Program** – to be added Post-MVP; the hyperlink should open a side panel with program details. Until then, show as normal text.
- **Project Manager** – when editing, the dropdown lists **active users with a Sales role** for the franchise associated with the job.
- **Assignment Received** – on or after the job's "Loss Reported" date.
- **First Pickup** – on or after the assignment Received date.

**Items section statuses (all calculated on non-cancelled Estimates):**
- **Items Reviewed** – sum of quantity of Restorable items marked Reviewed.
- **Items Cleaned** – sum of quantity of Restorable items marked Cleaned.
- **Items Stored** – sum of quantity of Restorable items marked Stored.
- **Non-Salvage** – sum of the NS amount (quantity x unit price).

**Program Requirements rules:**
- Steps: 1 Customer Contact, 2 Site Inspection, 3 Rush Delivery (or No Rush), 4 Invoice, 5 Final Invoice, 6 Job Complete.
- Step status: Future, Next, Completed. Each step is an accordion (Closed/Expanded) with Empty or Filled content.
- **Only the Next step is editable.** Completed and future steps are **read-only**.
- Rationale: once a TIP step is completed it is not changed, because many of these entries are also reported to Xact/Symbility.

---

## Communication

- **Activity Header.**
  - Purpose: central place to **search, filter and create** communications related to a Job.
  - Placement: top of the page, for a consistent interface.
  - Composed of: **Search Input** (search communication records), **Filter Options** (dropdown/select by criteria such as date, type, sender, recipient), **New Communication** (button that opens the option to add a new communication).
  - Variants: Single Button with Search as Icon or Expanded.
- **Single Note.**
  - Purpose: details of one communication: sender, recipient, relation and description.
  - Variants: New and Room Note.
  - Built from a Tailwind base component.
- **Log Sections.**
  - Purpose: display detailed information about communication types such as emails, phone calls and notes, in a structured way.
  - Sections: Internal Notes, Communication, Adjuster Communication, All. Each has Filled and Empty variants.

---

## Photos

- **Room Folder Card.**
  - Purpose: visual container to organize and display photos of a specific room within a job.
  - Usage: primarily in the **Photos tab**, as a card/tile per room.
  - States: Default, Hover, Selected.
- **Library Header.**
  - Purpose: central place to interact with the library or room being viewed: name, export, search bar, filters.
  - Placement: top of the page.
  - **Export:** PDF or ZIP. The export runs **in the background** so users can keep using the platform.
  - Header types: Photo Library and Folder.
- **Photo Export Popup (Photos Selected).**
  - Purpose: review and manage selected photos before export.
  - Placement: bottom of the page, visible while the user stays in the Photos tab. **Leaving the tab closes the popup and cancels the current selection.**
  - Features: photo count; Delete button (opens the deletion confirmation modal); Export as PDF; Export as ZIP; Close icon (closes without exporting).
- **Room Accordion (Photos Accordion).**
  - Purpose: collapsible section per item showing its photos; lets users view and manage photos at item level.
  - States: Collapsed, Expanded (with Filled or Empty details).
- **Item Header (Section Divider).**
  - Purpose: interact with individual items in a room.
  - Features: **Select/Deselect All** photos; **Upload Photo** to the item/section. Variants: Room Name, Select All, Select All + disabled Upload Photo.
- **Photo Card.**
  - Purpose: display individual photos in a room or item; select, set as thumbnail, view details.
  - Features: Photo Name; Selection checkbox (selected for export/deletion); Pin icon (set as thumbnail).
  - States: Default, Hover.

---

## Illustrations (Empty states)

**Purpose.** An empty state is when the UI has no data or content to display, usually the initial condition before the user acts or before content loads. It signals the page is ready to receive information or interaction.

**Best practices:**
- Provide messages that clearly and in a friendly way inform users about the lack of content.
- Use visual elements (icons, illustrations, colors) to highlight the empty state so users identify the situation quickly.
- When possible, customize the message to the application context or the user so it is more relevant and useful.

**Available illustrations (by situation):** No message, Error, Success, Empty state, Lost connection, Result, Notification, Favorite.

---

## Documentation gaps

- Cards (KPI): no written purpose or usage.
- Table: no written guidance on when to use each cell type, column alignment, sorting, or row selection behavior.
- Pills: no written rule on Pill vs Badge; the distinction above is **(Derived)** from the Status Comparison table.
- Communication Log Sections and Single Note: no states or behavior written beyond purpose.
- Illustrations: no mapping of each illustration to a specific message or screen.
- Avatar: no guidance on when to use Logo vs Initials.
- Assignments: Taxes, Delivery, Estimates, Billing Summary have a purpose only, no field rules.

## Source inconsistencies to confirm

- Photo Export Popup and Library Header use the term "Placement", while other pages use "Usage".
- Room Card "Usage: States" purpose text says "creating a new room", while the states shown are Default/Hover of the card.
- Avatar group description in Figma contains a typo ("images s by stacking").
- Badge usage text is missing a verb ("Are purely ornamental...").
- Tree View labels "Art" for the Textiles example, probably meaning Textiles.
- Table filter variant name "Type=Bas" appears truncated (likely "Base").
