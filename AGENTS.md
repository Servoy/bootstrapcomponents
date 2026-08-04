# AGENTS.md — Servoy Bootstrap Components

## Project overview

This repository contains the **Servoy Bootstrap Components** package — a set of Bootstrap-based
Angular UI components for the Servoy NGClient runtime. Components are built as an
Angular library and deployed as a Servoy web package (`.zip`).

**Repository:** https://github.com/Servoy/bootstrapcomponents
**Package name:** `@servoy/bootstrapcomponents`
**Current version:** 2026.6.0

## Technology stack

| Aspect | Value |
|--------|-------|
| Angular | 21.2.7 |
| TypeScript | 5.9.3 |
| Build system | Angular CLI 21.2.6 + ng-packagr 21.2.2 |
| Test framework | Cypress 15.x (component testing) |
| Linting | ESLint 9.x (@angular-eslint + @typescript-eslint 8.x) |
| Node package manager | npm |
| Servoy framework | @servoy/public 2025.9.1 |
| CSS framework | Bootstrap 5.3.8 |

## Working directory

All npm/ng commands must be run from the `components/` directory:
```
cd components
```

## Build commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build (`ng build --configuration production @servoy/bootstrapcomponents`) |
| `npm run build_debug` | Build with file watching |
| `npm run build_debug_nowatch` | Build without watch (useful for one-shot verification) |
| `npm run make_release` | Production build + package into `bootstrapcomponents.zip` |

## Lint & typecheck

```bash
npx ng lint
```

This runs ESLint with the Angular and TypeScript plugins. All rules emit warnings
(via `eslint-plugin-only-warn`), but warnings should still be addressed.

The build (`npm run build`) performs full TypeScript type checking via ng-packagr.
A successful build confirms type correctness.

## Testing

| Command | Purpose |
|---------|---------|
| `npm run cy:open` | Open Cypress interactive test runner |
| `npm run cy:run` | Run all Cypress component tests headless (Chrome) |
| `npm run cy:run_spec` | Run a specific Cypress spec (append path) |

Run a specific component's tests:
```bash
npx cypress run --config video=false --component --browser chrome --spec "projects/bootstrapcomponents/src/<component>/<component>.cy.ts"
```

### Test conventions
- Framework: Cypress 15.x (component testing with Angular adapter)
- Config: `cypress.config.ts` (webpack bundler with CSS loaders for Bootstrap/tempus-dominus)
- Pattern: `**/*.cy.ts`
- Each component has a test file alongside its implementation
- Tests use a **WrapperComponent** pattern with signals to drive inputs
- Import `ServoyPublicTestingModule` and `ServoyApiTesting` from `@servoy/public`
- Use `ServoyBootstrapComponentsModule` in the WrapperComponent imports
- There are also 2 legacy `.spec.ts` files (list, tablesspanel) using TestBed + Jasmine
  patterns — these have no runner currently configured

### Pending migration: Cypress → Vitest
This project's tests need to be migrated from Cypress to Vitest (Angular's official
test framework from v19+). Use the `test-migration` skill when ready to perform this.
The project also needs an Angular 21 → 22 upgrade. These are separate tasks from
day-to-day feature work.

## Architecture

### Dual-layer component structure

Each component exists in **two layers** that must stay in sync:

**Layer 1 — Servoy Spec** (`components/<name>/`):
- `<name>.spec` — JSON file defining the Servoy component contract (model properties,
  handlers, API methods, custom types). This is NOT a test file.
- `<name>.js` / `<name>.html` / `<name>.css` — Legacy AngularJS implementation
- `<name>_server.js` — Optional server-side scripting
- Icons (`.png`, `@2x.png` variants)

**Layer 2 — Angular Implementation** (`components/projects/bootstrapcomponents/src/<name>/`):
- `<name>.ts` — Angular component class
- `<name>.html` — Angular template
- `<name>.cy.ts` — Cypress component test

### Components

**Servoy Spec layer (25 directories):**
accordion, button, calendar, calendarinline, checkbox, choicegroup, combobox,
datalabel, floatlabelcalendar, floatlabelcombobox, floatlabeltextarea,
floatlabeltextbox, floatlabeltypeahead, formcomponent, imagemedia, label, list,
progressbar, select, table, tablesspanel, tabpanel, textarea, textbox, typeahead

**Angular implementation layer (22 components):**
accordion, button, calendar, calendarinline, checkbox, choicegroup, combobox,
datalabel, floatlabelcalendar, floatlabelcombobox, floatlabeltextarea,
floatlabeltextbox, floatlabeltypeahead, imagemedia, label, list, select,
tablesspanel, tabpanel, textarea, textbox, typeahead

**Spec-only (no Angular implementation):** formcomponent, progressbar, table

### Angular component conventions

- **Signal-based inputs:** `myProp = input<string>()` — NOT `@Input()`
- **Signal-based outputs:** `onAction = output<Event>()` — NOT `@Output()`
- **Additional signal APIs:** `viewChild()`, `contentChild()`, `linkedSignal()`, `computed()`, `signal()`
- **Change detection:** `ChangeDetectionStrategy.OnPush` on every component
- **Base class hierarchy:**
  - `ServoyBaseComponent<T>` (`@servoy/public`)
    - `ServoyBootstrapBaseComponent<T>` (`bts_basecomp.ts`)
      - `ServoyBootstrapBaseLabel<T>` (`bts_baselabel.ts`) — Button, Label, Datalabel, ImageMedia
      - `ServoyBootstrapBasefield<T>` (`bts_basefield.ts`) — Textbox, Textarea, Calendar, Combobox, Select, List, etc.
      - `ServoyBootstrapBaseTabPanel<T>` (`bts_basetabpanel.ts`) — Tabpanel, Tablesspanel, Accordion
- **Standalone:** `false` — all components declared in `ServoyBootstrapComponentsModule`
- **Selector prefix:** `bootstrapcomponents-` (kebab-case, enforced by ESLint)
- **Directive selector prefix:** `bootstrapcomponents` (camelCase)

### Module registration

When adding a new component:
1. Declare in `servoybootstrap.module.ts`
2. Export in `public-api.ts`
3. Create Servoy `.spec` file in `components/<name>/`

## Code style

- Single quotes (enforced by `@stylistic/ts/quotes`)
- Max line length: 200 characters
- Brace style: 1TBS (`if (x) {`)
- Static readonly properties: UPPER_CASE
- No component class suffix required (`@angular-eslint/component-class-suffix: off`)
- No console.log in production code
- Use `@servoy/public` utilities — don't reinvent

## Key dependencies

| Package | Purpose |
|---------|---------|
| `@servoy/public` | Servoy framework base classes, utilities, API types |
| `@ng-bootstrap/ng-bootstrap` | Bootstrap widgets for Angular (modals, tooltips, tabs, etc.) |
| `@angular/cdk` | Angular CDK utilities |
| `bootstrap` | Bootstrap 5 CSS framework |
| `@eonasdan/tempus-dominus` | Date/time picker (calendar components) |
| `@popperjs/core` | Tooltip/popover positioning |
| `luxon` | Date/time library (used by tempus-dominus) |

## Project structure

```
bootstrapcomponents/
├── AGENTS.md                            # This file
├── README.md                            # Basic setup instructions
├── JIRA.md                              # Jira API instructions
├── opencode.json                        # opencode configuration
├── webpackage.json                      # Servoy package manifest & release history
├── components/                          # Main working directory
│   ├── angular.json                     # Angular workspace config
│   ├── package.json                     # npm dependencies & scripts
│   ├── tsconfig.json                    # Root TypeScript config (strict)
│   ├── .eslintrc.json                   # ESLint config (legacy format)
│   ├── cypress.config.ts                # Cypress component testing config
│   ├── cypress/                         # Cypress support files
│   ├── scripts/build.js                 # Release packaging (creates .zip)
│   ├── projects/
│   │   ├── bootstrapcomponents/         # Angular library
│   │   │   ├── ng-package.json          # ng-packagr config
│   │   │   ├── tsconfig.lib.json        # Library TS config
│   │   │   ├── tsconfig.lib.prod.json   # Production TS config
│   │   │   ├── tsconfig.spec.json       # Test TS config
│   │   │   └── src/
│   │   │       ├── public-api.ts        # Library exports
│   │   │       ├── servoybootstrap.module.ts # NgModule declarations
│   │   │       ├── testingutils.ts      # Test utilities
│   │   │       └── <component>/         # Angular component implementation
│   │   └── dummy/                       # Dummy app (dev/testing scaffold)
│   ├── <component>/                     # Servoy spec + legacy files (per component)
│   ├── lib/                             # Shared JS libraries
│   ├── META-INF/                        # Java/Servoy metadata
│   ├── dist/                            # Build output (gitignored)
│   └── node_modules/                    # Dependencies (gitignored)
├── bootstrapComponentsSample/           # Example Servoy solution
└── .opencode/                           # opencode skills & plugins
    ├── skills/sdd/                      # Spec-Driven Development pipeline
    ├── skills/migration/                # Angular modernization helper
    ├── skills/spec-sync/                # Spec sync checker
    ├── skills/test-migration/           # Cypress → Vitest migration
    └── plugins/commit-lint.ts           # Commit message validation
```

## Workflow

### Post-edit checklist

After making code changes, always verify:
1. `npm run build` — must compile without errors
2. `npx ng lint` — check for lint warnings
3. Run relevant tests: `npm run cy:run` or target a specific component

### Commit message format

```
<JIRA_KEY> <short description> [ai]

- bullet points summarising changes

Co-Authored-By: opencode <noreply@opencode.ai>
```

Example: `SVY-21080 add calendar inline date selection support [ai]`

### Adding a new component

1. Create the Servoy spec directory: `components/<name>/`
   - `<name>.spec` (JSON component contract)
   - `<name>.js`, `<name>.html`, `<name>.css` (legacy implementation)
   - Icon files (`.png`, `@2x.png`)
2. Create Angular implementation: `components/projects/bootstrapcomponents/src/<name>/`
   - `<name>.ts` (component class)
   - `<name>.html` (template)
3. Register in `servoybootstrap.module.ts` (declarations + exports)
4. Export in `public-api.ts`
5. Create Cypress test: `<name>.cy.ts`
6. Build and verify: `npm run build`

### Modifying a component

When changing component properties, handlers, or API:
1. Update the `.spec` file (JSON contract) in `components/<name>/`
2. Update the Angular component in `projects/bootstrapcomponents/src/<name>/`
3. Both layers must stay in sync

## Gotchas

- **`.spec` files are NOT tests.** They're Servoy component specification JSON files.
- **Signal inputs, not decorators.** Use `input<T>()` / `output<T>()`, not `@Input()` / `@Output()`.
- **OnPush everywhere.** All components use `ChangeDetectionStrategy.OnPush`.
- **@servoy/public version coupling.** Must match the target Servoy runtime version.
- **Legacy files still active.** The AngularJS files in top-level dirs are still used by
  older Servoy runtimes. Don't delete them.
- **No standalone components.** All are `standalone: false`, declared in the shared module.
- **Angular 21 (not 22 yet).** This project is on Angular 21.2.x. An upgrade to 22 is pending.
- **Cypress tests (not Vitest yet).** Tests use Cypress component testing. Migration to
  Vitest is planned but not yet done.
- **Base class hierarchy matters.** Components extend specific base classes
  (`ServoyBootstrapBaseLabel`, `ServoyBootstrapBasefield`, `ServoyBootstrapBaseTabPanel`)
  which provide shared behavior. Check the hierarchy before adding properties.
