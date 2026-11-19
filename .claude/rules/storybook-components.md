# Components come from the RestorNet Storybook; usage comes from the Solar guidelines

- **Which components exist:** the RestorNet Storybook
  (https://restornetdevstorybook.bravebeach-59861ec7.eastus.azurecontainerapps.io/).
- **When and how to use them:** the Solar guidelines in `docs/00-overview/` to
  `docs/06-governance/`. Start with `docs/00-overview/how-to-use.md`.
- **The bridge between the two:** `docs/components/README.md`, which maps every
  Storybook component to its guideline section, its playground file and its Figma
  design status.

## Before building or changing a screen

1. **Pick the pattern** in `docs/03-interaction-patterns/` (forms, actions and feedback,
   selection and search, navigation, data display).
2. **Pick each component** with the "Choosing the right component" table of its family
   doc in `docs/04-component-guidelines/`. The result must be a component listed in
   `docs/components/README.md`. If nothing there fits, don't invent one: say so and ask
   which Storybook component to use.
3. **Check its Figma status** (column in the catalog, source `docs/06-governance/design-status.md`).
   Approved → build from it. Awaiting review / In progress → build from it, but tell the
   user it is provisional and name the designer.
4. **Implement it** with the playground file in the catalog. If there is none (`—`),
   build it per `component-reuse.md`, named after the Storybook component, with props and
   variants that mirror its stories, and update its catalog row.
5. **Write the copy** following `docs/01-content/` (tone, capitalization, dates, messages, CTAs).
6. **Cover the states:** loading, empty, no results, error, disabled.
7. **List assumptions.** Anything marked **(Derived)**, `(?)` in the catalog, or listed
   under "Documentation gaps" is not settled policy: apply `docs/00-overview/principles.md`
   and say what you assumed in your reply.

The playground recreates these components with shadcn + project tokens; it does not
import the Storybook library itself.

## Precedence

- Which component exists → Storybook (via the catalog).
- When and how to use it, and its copy → `docs/0*` guidelines.
- Token values (color, type, radius, spacing, shadows) → `DESIGN.md` / `styles/globals.css`.
  The guidelines deliberately contain no values.
- Code recipes → `docs/playground-implementation.md`. Where its Solar → shadcn map (10.3)
  names a component the Storybook doesn't have, the catalog wins.
