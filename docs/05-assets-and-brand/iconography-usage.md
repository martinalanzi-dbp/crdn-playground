---
title: Iconography Usage
cluster: 05-assets-and-brand
topic: iconography-usage
audience: AI agents choosing and placing icons
source: Figma "Solar for CRDN" > Foundations > Icons; component docs (Buttons, Tooltip, Avatar) for usage context
scope: usage guidance and inventory structure. Icon artwork, sizes in pixels and colors are intentionally excluded.
---

# Iconography Usage

> Provenance: the Icons page is an inventory with almost no written rules (its only written line concerns replacing the icon inside a container). Rules below marked **(Derived)** come from how icons are used in other component docs.

## Icon sources

| Set | Contents | Use |
|---|---|---|
| Hero Icons (main library) | About 200 icons in 15 categories, each in **Outline** and **Solid** | Default choice for all UI icons |
| Flags | United States, Canada, United Kingdom | Country or region context (for example phone number country code) |
| File Management | Sheets, Slides, Docs, Folder, Image, Preview | Type of a file or attachment |
| Custom | Room icons, Drag and Drop dots | Domain-specific icons not in the library |
| Warehouse | A table of **Old Icon vs New Icon** | Reference for icon replacements in warehouse flows |
| Chain of Custody | Dedicated icon page | Chain-of-custody flows |

Hero Icons categories: Finance, Development, Maps & Travel, Arrows, Devices, People, Time & Date, Charts, Outdoors, Commerce, Files, Security, Education, Media, Communication, System (the largest group: filter, trash, settings, home, notification and more).

Some icons have variants, such as Currency (Dollar, Yuan, Euro).

## Rules

1. **Search the existing library first.** Prefer a Hero Icon; use a Custom icon only for domain objects that have one (for example Rooms). Do not draw or import new icons ad hoc.
2. **Outline vs Solid:** both exist for every Hero Icon. Use one style consistently within a view; use Solid to signal an active or selected state only if the component defines it **(Derived)**. Example from the file: the status pill's active icon was changed to a Design System icon, so status icons come from the library, not custom art.
3. **Always place icons inside the Icon Container component.** Replacing the icon inside the container updates it with a new library without breaking layouts. The container has several sizes and three types: **Icon**, **Flag**, **File Management**.
4. **Use the container size that matches the surrounding element** (for example the Button, Tab or Table cell it sits in). Do not scale icons freely.
5. **Icons clarify, they do not replace labels.** Buttons always have a label; add a leading or trailing icon only when it clarifies the action (see `04-component-guidelines/actions.md`).
6. **Icon-only controls need a tooltip** naming the function in at most 3 words (see `04-component-guidelines/feedback.md`).
7. Use **Flags** only through the Flag container type, and only for the three countries defined.
8. Use **File Management** icons to represent file types in uploads and photo/document lists.
9. Meaning must be consistent: the same icon for the same concept everywhere (for example a trash icon always means delete) **(Derived)**.

## Where icons appear in components

| Component | Icon usage |
|---|---|
| Button | Optional leading or trailing icon |
| Link | Optional leading and trailing icon |
| Tooltip / icon buttons | Icon with tooltip name |
| Pills - Status | Status icon, consistent across flows |
| Navigation | Icon per menu item; tooltip with section name when collapsed |
| Tree View | Dedicated icon per type (Assignment, Estimate, Folder, Room, Recycle Bin) for easy recognition |
| Table cells | Icon cell type for information or actions |
| Photo Card / Room Card | Icon container actions (set thumbnail, actions on hover) |
| Phone input | Country code with chevron |

## Documentation gaps

- When to use Outline vs Solid in written form.
- Required accessibility labels for icon-only controls beyond tooltips.
- How to request a new icon, and naming conventions.
- Which icon represents which common action (a catalog of meaning).
- Status of the Warehouse "Old vs New" icons (migration complete or pending).
- Icon sizes per component context.

## Source inconsistencies to confirm

- Several library names contain typos (for example "Disscount", "Sparkless", "Contry" in the Flags property), so search by intent rather than exact name.
- Some icon names repeat across categories (for example several "Arrow", "Chart" and "User" entries); confirm the intended one visually.
