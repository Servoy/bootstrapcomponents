# Project Context — Servoy Bootstrap Components (Angular)

This project is the **Servoy Bootstrap Components** package — a set of Bootstrap-based Angular
UI components for the Servoy NGClient runtime. It is built as an Angular library using
ng-packagr and deployed as a Servoy web package.

## Technology stack

| Aspect | Value |
|--------|-------|
| Angular version | 22.1.0 |
| TypeScript version | 6.0.3 |
| Build system | Angular CLI 22.1.2 + ng-packagr 22.1.1 |
| Test framework | Vitest (via @angular/build:unit-test) |
| Linting | ESLint 10.x with angular-eslint 22.x + typescript-eslint 8.x (flat config) |
| Module system | ES modules (moduleResolution: "bundler") |
| Package name | @servoy/bootstrapcomponents |
| Version | 2026.9.0 |
| CSS framework | Bootstrap 5.3.8 |

## Architecture: Dual-Layer Component Structure

Each component exists in **two layers**:

### Layer 1: Servoy Component Spec (`components/<name>/`)
Top-level directories contain the **Servoy spec definition** and legacy assets:

| File | Purpose |
|------|---------|
| `<name>.spec` | Servoy component specification (JSON) — defines name, model properties, handlers, API methods, types |
| `<name>.js` | Legacy AngularJS client-side code |
| `<name>.html` | Legacy AngularJS template |
| `<name>.css` | Component styles |
| `<name>_server.js` | Server-side scripting (optional) |

### Layer 2: Angular Library (`components/projects/bootstrapcomponents/src/<name>/`)
The modern Angular implementations:

| File | Purpose |
|------|---------|
| `<name>.ts` | Angular component class |
| `<name>.html` | Angular template |
| `<name>.spec.ts` | Vitest component test |

## Angular Component Pattern

Components follow these conventions:
- **Signal-based inputs** (`input<T>()`) and `output<T>()`
- **Additional signal APIs:** `viewChild()`, `contentChild()`, `linkedSignal()`, `computed()`, `signal()`
- **ChangeDetectionStrategy.OnPush**
- **Base class hierarchy:**
  - `ServoyBaseComponent<T>` (`@servoy/public`)
    - `ServoyBootstrapBaseComponent<T>` (`bts_basecomp.ts`)
      - `ServoyBootstrapBaseLabel<T>` (`bts_baselabel.ts`) — Button, Label, Datalabel, ImageMedia
      - `ServoyBootstrapBasefield<T>` (`bts_basefield.ts`) — Textbox, Textarea, Calendar, Combobox, Select, List, etc.
      - `ServoyBootstrapBaseTabPanel<T>` (`bts_basetabpanel.ts`) — Tabpanel, Tablesspanel, Accordion
- `standalone: false` — declared in `ServoyBootstrapComponentsModule`
- Selector prefix: `bootstrapcomponents-` (kebab-case, enforced by ESLint)
- Directive selector prefix: `bootstrapcomponents` (camelCase)

## Key project structure

```
bootstrapcomponents/
├── components/                          # Main working directory
│   ├── angular.json                     # Angular workspace config
│   ├── package.json                     # Dependencies & scripts
│   ├── tsconfig.json                    # Root TypeScript config
│   ├── eslint.config.js                 # ESLint flat config
│   ├── vitest-base.config.ts            # Vitest runner configuration
│   ├── projects/
│   │   ├── bootstrapcomponents/         # Angular library project
│   │   │   ├── ng-package.json
│   │   │   ├── src/
│   │   │   │   ├── public-api.ts        # Library exports
│   │   │   │   ├── servoybootstrap.module.ts # NgModule declarations
│   │   │   │   ├── testingutils.ts      # Test utilities
│   │   │   │   └── <component>/         # Per-component directory
│   │   └── dummy/                       # Dummy app for dev/testing
│   ├── <component>/                     # Servoy spec + legacy files per component
│   ├── cypress/support/                 # Cypress support files
│   ├── lib/                             # Shared JS libraries
│   ├── META-INF/                        # Java/Servoy metadata
│   └── scripts/build.js                 # Release packaging script
├── webpackage.json                      # Servoy package manifest
├── bootstrapComponentsSample/           # Example Servoy solution
└── README.md
```

## Components in this package

**Angular implementation layer (22 components):**
accordion, button, calendar, calendarinline, checkbox, choicegroup, combobox,
datalabel, floatlabelcalendar, floatlabelcombobox, floatlabeltextarea,
floatlabeltextbox, floatlabeltypeahead, imagemedia, label, list, select,
tablesspanel, tabpanel, textarea, textbox, typeahead

**Spec-only (no Angular implementation):** formcomponent, progressbar, table

## Key dependencies

| Package | Purpose |
|---------|---------|
| `@servoy/public` | Servoy framework base classes and utilities |
| `@ng-bootstrap/ng-bootstrap` | Bootstrap widgets for Angular (modals, tooltips, tabs, etc.) |
| `@angular/cdk` | Angular CDK utilities |
| `bootstrap` | Bootstrap 5 CSS framework |
| `@eonasdan/tempus-dominus` | Date/time picker (calendar components) |
| `@popperjs/core` | Tooltip/popover positioning |
| `luxon` | Date/time library (used by tempus-dominus) |

## Build commands

| Command | Action |
|---------|--------|
| `npm run build` | Production build of the library |
| `npm run build_debug` | Build with watch mode |
| `npm run make_release` | Build + package into bootstrapcomponents.zip |

## Testing

- **Framework:** Vitest (via `@angular/build:unit-test`)
- **Commands:** `npm run test` (jsdom) / `npm run test:browser` (headless Chromium)
- **Pattern:** Each component has a `<name>.spec.ts` file alongside its implementation
- **Test utilities:** `testingutils.ts` provides `ServoyPublicTestingModule` and helpers
- Tests use direct `TestBed.createComponent(TheComponent)` pattern with `fixture.componentRef.setInput()`
- DO NOT use WrapperComponent, DO NOT import `ServoyBootstrapComponentsModule`
- Use `NO_ERRORS_SCHEMA` to suppress unknown directive warnings
- Browser-mode tests for DOM-heavy components use `describe.runIf(isBrowser)` pattern

## Linting

- ESLint flat config (`eslint.config.js`) with `angular-eslint`, `typescript-eslint`, `@stylistic/eslint-plugin`
- All rules emit warnings (uses `eslint-plugin-only-warn`)
- Single quotes, max 200 char lines, 1TBS brace style
- Run: `npx ng lint` from the `components/` directory

## TypeScript strictness

- `strictInjectionParameters: true`
- `strictInputAccessModifiers: true`
- `strictTemplates: true` (Angular)
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`

## Code conventions

- Follow existing patterns in neighboring components — consistency over personal preference
- Use the `@servoy/public` base classes and utilities — never reinvent what's already provided
- Component selectors must use the `bootstrapcomponents-` prefix
- No console.log in production code
- Prefer existing utility functions from `@servoy/public`
- Always update `public-api.ts` when adding new exports
- Always update `servoybootstrap.module.ts` when adding new components/directives

## Gotchas

- **The .spec file is NOT a test file.** It's the Servoy component specification (JSON)
  that defines the component's contract — model properties, handlers, API methods, types.
  Changes to the component contract REQUIRE updating this file.

- **Dual-layer sync:** When changing component properties or API, both the `.spec` file
  (Layer 1) and the Angular component (Layer 2) must be updated in sync.

- **ng-packagr secondary entry points:** The library is built with ng-packagr. If adding
  a new component, it must be declared in `servoybootstrap.module.ts` and exported in
  `public-api.ts`.

- **@servoy/public version coupling:** This package is tightly coupled to a specific
  Servoy platform version. The `@servoy/public` version must match the target Servoy
  runtime version.

- **Legacy AngularJS files still exist:** The `.js` and `.html` files in the top-level
  component directories are legacy AngularJS implementations kept for older Servoy
  runtime compatibility. New features should focus on the Angular implementation in
  `projects/bootstrapcomponents/src/`.

- **Signal-based inputs:** Components use Angular's signal-based input/output API
  (`input<T>()`, `output<T>()`, `viewChild()`, `linkedSignal()`, `computed()`).
  Do NOT use the legacy `@Input()` / `@Output()` decorators.

- **OnPush change detection:** All components use `ChangeDetectionStrategy.OnPush`.
  Ensure proper change detection triggering when modifying state.

- **Base class hierarchy:** Components extend specific base classes that provide shared
  behavior. Check `bts_basecomp.ts`, `bts_baselabel.ts`, `bts_basefield.ts`, and
  `bts_basetabpanel.ts` before adding properties that may already be inherited.

- **Angular 22 with TypeScript 6.** The project uses strict mode and strictTemplates.
