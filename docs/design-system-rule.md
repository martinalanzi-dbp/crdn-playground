# Design system rule

The CRDN design system ("Solar for CRDN") is documented in `DESIGN.md` at the repo root. Read it before building or restyling any screen.

- Values come from the YAML front matter of `DESIGN.md`. Do not hard-code hex values, radii or spacing; use the tokens in `styles/globals.css`, which mirror it.
- Light theme only. Do not add dark values.
- Build order: existing shadcn component, then a Solar variant of it, then a new component only when nothing fits. Say so when creating a new one.
- Recipes and the component map are in `docs/playground-implementation.md`. Figma component keys are in `docs/figma-library.md`.
- If `DESIGN.md` and Figma disagree, Figma wins; tell the user and propose the fix to `DESIGN.md`.
