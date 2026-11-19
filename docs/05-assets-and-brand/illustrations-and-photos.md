---
title: Illustrations and Photos
cluster: 05-assets-and-brand
topic: illustrations-and-photos
audience: AI agents using illustrations (empty states) and photos in UI
source: Figma "Solar for CRDN" > Components > Illustrations, Photos, Rooms, Avatar
scope: usage guidance only. Artwork, dimensions and colors are excluded. Component-level rules live in 04-component-guidelines/data-and-content.md.
---

# Illustrations and Photos

## Illustrations (empty and system-state visuals)

**Purpose.** Illustrations support the **empty state**: a UI with no data or content to display, usually the initial condition before the user acts or before content loads. They show the page is ready to receive information or interaction.

**Available illustrations (by situation):**

| Illustration | Use when |
|---|---|
| No message | There are no messages to show |
| Error | Something failed |
| Success | An action completed and there is nothing more to show |
| Empty state | A collection has no data yet |
| Lost connection | The connection to the system is down |
| Result | A search or query produced a result screen **(Derived)** |
| Notification | There are no notifications, or a notification context |
| Favorite | No favorites yet |

**Best practices (from the source):**

1. Give a clear, **friendly** message that informs users about the lack of content.
2. Use visual elements (icons, illustrations, colors) to highlight the empty state so users identify the situation quickly.
3. Customize the message to the application context or the user when possible, so it is more relevant and useful.

Rules **(Derived)**:

- Always pair an illustration with a short message; never show only the picture.
- Use the illustration that matches the situation; do not reuse "Success" for neutral emptiness.
- Message wording follows `01-content/tone-of-voice.md` (neutral, solution-oriented, no blame).
- Distinguish **No Results** (search matched nothing) from **Empty State** (no data exists); see `03-interaction-patterns/data-display.md`.

## Photos (job photography)

Photos are user-provided evidence tied to jobs, rooms and items. They appear in the Photos tab and in rooms and items.

### Structure
- **Photo Library** (job level) contains **Room folders**; each folder and item has its own photos.
- Room Folder cards are tiles in the Photos tab; items and rooms have **Photo accordions** with Select All and Upload Photo.
- Photo Cards show the photo name, selection and thumbnail pin.

### Behavior rules
- **Thumbnail:** each room has a thumbnail photo. The pin icon marks it; clicking the icon container sets it.
- **Cover and avatars:** a Room Card shows a cover and, when populated, an Avatar group with **at most 5 images**; beyond that it shows `{{+n}}` for the remainder. With no photos beyond the thumbnail, the group is hidden.
- **Badge:** the "Post-Restoration" badge on a photo is optional, used only when the context needs it.
- **Selection and export:** photos can be selected; export as **PDF or ZIP**; exports run in the background; the popup closes and cancels selection if the user leaves the Photos tab.
- **Delete:** triggers a confirmation modal.
- **Upload limit:** there is a maximum number of photos per upload batch. When reached, show the Alert "Photo limit reached" and disable the drop zone. Copy and rules are in `04-component-guidelines/inputs.md`.
- **Uploaded photo details:** Name is required; Description is optional.

### Naming
For photo and file names follow `01-content/writing-style.md`. Success feedback uses the object-first pattern (for example "Photo-02 successfully downloaded").

### Profile images (avatars)
Profile pictures keep a consistent aspect ratio and have meaningful alt text; use Initials when there is no picture (see Avatar in `data-and-content.md`).

## Documentation gaps

- Accepted formats, size limits and quality requirements for photos.
- Cropping rules and aspect ratio for room covers and photo cards.
- Image alt-text guidance beyond profile pictures.
- Maximum number of photos per upload batch (the limit exists but its value is not documented).
- Rules for sensitive photos (privacy) and retention.
- Illustration usage guidance per screen, and copy for each illustration.
- No photography or illustration style guide (tone, subject) exists in the file.

## Source inconsistencies to confirm

- The "Training Materials" page in Foundations is marked with a red indicator and was not documented; confirm whether it contains relevant imagery rules.
- Illustration purpose text describes only the empty state, but the set also includes Error, Success and Lost connection.
