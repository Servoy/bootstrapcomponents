# AGENTS.md — Servoy Bootstrap Components

## Project overview

This repository contains the **Servoy Bootstrap Components** package — a set of Bootstrap-based
Angular UI components for the Servoy NGClient runtime. Components are built as an
Angular library and deployed as a Servoy web package (`.zip`).

**Repository:** https://github.com/Servoy/bootstrapcomponents
**Package name:** `@servoy/bootstrapcomponents`
**Current version:** 2026.9.0

## Technology stack

| Aspect | Value |
|--------|-------|
| Angular | 22.1.0 |
| TypeScript | 6.0.3 |
| Build system | Angular CLI 22.1.2 + ng-packagr 22.1.1 |
| Test framework | Vitest (via @angular/build:unit-test) |
| Linting | ESLint 10.x (@angular-eslint 22.x + @typescript-eslint 8.x) |
| Node package manager | npm |
| Servoy framework | @servoy/public 2026.9.0 |
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
| `npm run test` | Run all Vitest component tests (single run, jsdom) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Open Vitest UI for interactive test execution |
| `npm run test:browser` | Run browser-mode tests (headless Chromium via Playwright) |

Run a specific component's tests:
```bash
npx ng test @servoy/bootstrapcomponents --no-watch --include "projects/bootstrapcomponents/src/<component>/<component>.spec.ts"
```

### Test conventions
- Framework: Vitest (via `@angular/build:unit-test`)
- Config: `angular.json` test target + `vitest-base.config.ts`
- Pattern: `**/*.spec.ts`
- Each component has a test file alongside its implementation
- Tests use direct `TestBed.createComponent(TheComponent)` pattern
- Use `fixture.componentRef.setInput('name', value)` for signal inputs
- Use `NO_ERRORS_SCHEMA` to suppress unknown directive warnings
- Import `ServoyPublicTestingModule` from `@servoy/public`
- DO NOT import `ServoyBootstrapComponentsModule` in tests (causes dependency issues)

### Critical: Global Mocking Rules

- **NEVER** use `vi.stubGlobal('document', ...)` or `vi.stubGlobal('window', ...)` — this replaces the entire jsdom DOM and breaks ALL subsequent tests in the same fork/thread. The error manifests as `this.doc.querySelector is not a function` in Angular's renderer.
- Instead, mock individual methods and restore them:
  ```typescript
  let originalMethod: typeof document.elementFromPoint;
  beforeEach(() => {
    originalMethod = document.elementFromPoint;
    document.elementFromPoint = vi.fn() as any;
  });
  afterEach(() => {
    document.elementFromPoint = originalMethod;
  });
  ```
- Similarly, never replace `window.location`, `window.navigator` etc. via `stubGlobal` — use `vi.spyOn` or direct property assignment with restore.

### Debugging: Log First, Fix Later

When facing unclear test failures (locally or on CI), **do NOT spend multiple rounds guessing root causes**. Instead:

1. **Add diagnostic logging immediately** — log the state of the failing object (e.g. `typeof`, `constructor.name`, `Object.keys()`, `JSON.stringify`) at the point of failure
2. **Run (or push and let CI run)** — get real data from the actual environment
3. **Fix based on evidence** — one log statement that shows actual state is worth more than three speculative fixes

### Browser-mode tests
Components that depend on third-party libraries needing real DOM rendering (e.g.,
`calendarinline` with tempus-dominus) use `describe.runIf(isBrowser)` to skip in jsdom
and only run with `--browsers chromium`. These are tested via `npm run test:browser`.

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
- `<name>.spec.ts` — Vitest component test

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
│   ├── eslint.config.js                 # ESLint flat config
│   ├── vitest-base.config.ts            # Vitest runner configuration
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
3. Run relevant tests: `npm run test` or target a specific component

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
5. Create Vitest test: `<name>.spec.ts`
6. Build and verify: `npm run build`

### Modifying a component

When changing component properties, handlers, or API:
1. Update the `.spec` file (JSON contract) in `components/<name>/`
2. Update the Angular component in `projects/bootstrapcomponents/src/<name>/`
3. Both layers must stay in sync

### Spec property tags: `serveronly`

- If a spec property is handled **only on the server** (not sent to the client, no `@Input` in Angular), add `"tags": { "serveronly": true }` to its definition.
- The `serveronly` tag prevents the property from being generated in the Angular template AND from being sent over the websocket.
- **Every spec model property MUST have a corresponding `@Input` (signal input) in the Angular component, unless it is tagged `serveronly`.**
- When adding or modifying spec properties, always verify this alignment.

## Gotchas

- **`.spec` files are NOT tests.** They're Servoy component specification JSON files.
- **Signal inputs, not decorators.** Use `input<T>()` / `output<T>()`, not `@Input()` / `@Output()`.
- **Signal inputs with defaults:** Servoy form templates bind ALL model properties (`[prop]="model.prop"`). If the server never sends a value, the expression evaluates to `undefined`, overriding `input(30)`. Use a transform to preserve defaults:
  ```typescript
  readonly pane1MinSize = input(30, { transform: (v: any) => v ?? 30 });
  ```
- **OnPush everywhere.** All components use `ChangeDetectionStrategy.OnPush`.
- **@servoy/public version coupling.** Must match the target Servoy runtime version.
- **Legacy files still active.** The AngularJS files in top-level dirs are still used by
  older Servoy runtimes. Don't delete them.
- **No standalone components.** All are `standalone: false`, declared in the shared module.
- **Angular 22.** This project is on Angular 22.1.x with TypeScript 6.0.
- **Vitest for testing.** Tests use Vitest via `@angular/build:unit-test`. Use direct
  `TestBed.createComponent()` pattern, not WrapperComponent.
- **Base class hierarchy matters.** Components extend specific base classes
  (`ServoyBootstrapBaseLabel`, `ServoyBootstrapBasefield`, `ServoyBootstrapBaseTabPanel`)
  which provide shared behavior. Check the hierarchy before adding properties.

## Cross-Session Knowledge

At the start of a new session, list stored memory keys (`memory_listMemories`) to discover reusable migration patterns, conventions, and lessons learned from previous sessions on Servoy Angular projects.
