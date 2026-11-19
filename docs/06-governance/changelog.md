---
title: Changelog
section: 06-governance
audience: AI agents
source: Solar for CRDN (Figma), "Changes:" blocks on component pages
status: derived from Figma; not authoritative for current behavior
---

# Changelog

Change history that lives in the **"Changes:" blocks of each Figma component page**. It is kept here, not in the component docs, so the component docs in `04-component-guidelines/` describe the current rules only.

## How to use this file

- **Current rules live elsewhere.** If an entry here conflicts with a component doc, trust the component doc and flag the conflict.
- **Use it for context, not instruction.** It explains why a component looks or behaves as it does (e.g. why a variant was removed).
- **Specs are intentionally omitted.** Entries that originally quoted sizes or spacing values are rephrased without them (marked *rephrased*).
- **Newest first** within each component. Dates are MM/DD/YYYY as written in Figma. Author is the name shown in Figma.
- **Legacy.** Navigation entries come from the Figma section "OLD - Main Navigation" and describe a legacy side menu. See `04-component-guidelines/navigation.md`.

## Components

### Avatar
| Date | Author | Change |
|---|---|---|
| 07/03/2024 | Andrea Silva | Avatar group added, for use in the main cards of the Rooms section. |

### Badges
| Date | Author | Change |
|---|---|---|
| 07/14/2024 | Sofia Laborda | Filled badges removed; the team decided not to use them in designs. |

### Date Picker
| Date | Author | Change |
|---|---|---|
| 07/26/2024 | Sofia Laborda | Styling adjusted to match the Storybook component. |

### File Upload
| Date | Author | Change |
|---|---|---|
| 08/20/2024 | Sofia Laborda | Accepted-extension details removed from the component. |

### Forms
| Date | Author | Change |
|---|---|---|
| 09/18/2025 | Juliana Raimondi | Text Area: line added above the character counter. |
| 10/01/2024 | Sofia Laborda | Dropdown: styling added for a selected option; typeahead loading and item-select states added, including the view when searching for a specific option; documentation added for these cases. |
| 09/30/2024 | Sofia Laborda | Dropdown: clearing a selection added, with documentation. |
| 09/09/2024 | Sofia Laborda | Dropdown: typeahead option added for active dropdowns. |
| 08/29/2024 | Sofia Laborda | Phone Number input: country code now shown inside the field container instead of the dropdown; chevron added because some cases need a dropdown of several phone numbers; spacing adjusted to fit both changes. |
| 08/20/2024 | Sofia Laborda | Border color updated to match the Secondary Button. |

### Header
| Date | Author | Change |
|---|---|---|
| 10/30/2024 | Juliana Raimondi | Image made smaller; spacing between title and subtitle next to the image reduced. *(rephrased)* |
| 2/6/2024 | Miranda Logioia | QMD variant added to the header; it affects the Repricing and Call & Assignment screens. |

### Items (Quick Add)
| Date | Author | Change |
|---|---|---|
| 10/30/2025 | Juliana Raimondi | Layout changed to horizontal: "Add items by" now sits to the right of "Quick Add". |
| 04/21/2025 | Sofía Laborda | "Include Notes" option and its variables added. |

### Logo
| Date | Author | Change |
|---|---|---|
| 07/12/2024 | Andrea Silva | "Brand" variant added. |

### Navigation (legacy side menu and related)
Source section: "OLD - Main Navigation".

| Date | Author | Change |
|---|---|---|
| 09/05/2024 | Sofia Laborda | Sizes of icons, menu items and menu container adjusted so the menu fits across several screen sizes. *(rephrased)* |
| 08/10/2024 | Sofia Laborda | Environment badge examples added. |
| 07/12/2024 | Andrea Silva | Side Menu: franchise switching removed after client feedback. Menu Inline: component and documentation added. |
| 07/04/2024 | Andrea Silva | Side Menu: franchise switching and logout added; gradient background replaced by a solid primary color; documentation updated. Horizontal Tabs and Vertical Tabs: documentation added. |

### Pills - Status
| Date | Author | Change |
|---|---|---|
| 09/22/2025 | Juliana Raimondi | Loading state added to the status dropdown to cover waiting time when switching actions. Its width must match the original action button so layout stays stable. |
| 07/14/2025 | Sofia Laborda | XS variant added. |
| 06/19/2025 | Sofia Laborda | Colors and icons adjusted for consistency across all flows. |
| 05/14/2025 | Sofia Laborda | Border color and size matched to Button Secondary for visual consistency when shown side by side; font sizes adjusted. |
| 07/10/2024 | Sofia Laborda | Hover, focus and default styling added for pills; status dropdown created; documentation updated. |
| 06/28/2024 | Sofia Laborda | Active icon changed; custom icons replaced with Design System icons and published to the high-fidelity designs. |

### Side Panel
| Date | Author | Change |
|---|---|---|
| 08/15/2024 | Sofia Laborda | Internal padding reduced. Reason: some content did not fit; shortening it keeps the panel width consistent. *(rephrased)* |

### Tabs
| Date | Author | Change |
|---|---|---|
| 08/26/2024 | Sofia Laborda | Colors of the pill tabs adjusted; matching colors added to the file's local variables. |

### Tooltip
| Date | Author | Change |
|---|---|---|
| 03/17/2024 | Juliana Raimondi | New property "Show Learn More Link": when on, the tooltip shows a Learn more link with a configurable destination URL; when off, behavior and layout are unchanged. *(see inconsistency below)* |
| 07/12/2024 | Andrea Silva | Tooltip component and its documentation added. |

## Components with no change entries

Alerts & Toast, Assignments, Breadcrumbs, Buttons, Cards, Communication, Illustrations, Links, List, Modals, Pagination, Photos, Pills - Filter, Rooms, Sections, Selection Controls, Spinner, Table, Wizard. No "Changes:" block was found on these pages. Absence of an entry does not mean the component never changed.

Foundations pages (Typography, Icons and others) also have no entries.

## Patterns visible in the history

Derived from the entries above; use as context only.

- **Alignment with Secondary Button.** Forms (border color) and Pills - Status (border color and size) were both changed to match Button Secondary. When a control sits next to a button, match the Secondary Button.
- **Removed on purpose.** Filled badges (decided against), side-menu franchise switching (client feedback), accepted-extension details in File Upload. Do not reintroduce these without confirmation.
- **Sizing for fit.** The Header image and Side Panel padding were reduced, and the navigation menu was resized, so content fits. Fit across content and screen sizes has driven size changes.
- **Loading states.** Pills - Status dropdown gained a Loading state that keeps the action button's width; follow the same rule for other action-switching controls.

## Source inconsistencies to confirm

- **Tooltip date order.** The "Learn more" entry is dated 03/17/2024, earlier than the component's creation entry (07/12/2024). One date is probably wrong.
- **Header date format.** The QMD entry reads `2/6/2024` (no zero padding, unlike every other entry). It could be February 6 or June 2, and the QMD variant is listed below a 10/30/2024 entry. Confirm the date.
- **Navigation is legacy.** All Navigation entries come from "OLD - Main Navigation". No change history exists for the current Navigation section (role-based desktop and responsive navigation).
- **Design Status is not here.** Review status per page (Approved, Awaiting review, and so on) belongs in `design-status.md`.
