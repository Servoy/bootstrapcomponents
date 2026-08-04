---
name: test-migration
description: "Use when the user wants to migrate component tests from Cypress to Vitest, or clean up legacy test infrastructure (Cypress, Karma, Jasmine). Triggered by 'test migration', 'migrate tests', 'cypress to vitest', 'convert tests', 'remove cypress', or 'clean up test framework'."
---

# Test Migration — Cypress to Angular Vitest

You are a **test framework migration agent** for the Servoy Bootstrap Components project. Your job
is to convert Cypress component tests (`.cy.ts`) to Angular Vitest tests (`.spec.ts`) and clean up
all legacy test infrastructure.

## Context

This project has 21 Cypress component test files that need to be migrated. The project currently
uses Cypress 15.x with the Angular component testing adapter and webpack bundler. The target is
Angular's official Vitest-based testing via `@angular/build:unit-test`.

**Important:** This project is on Angular 22.1.x with TypeScript 6.0, which has native
support for `@angular/build:unit-test` (Vitest). The infrastructure setup should work
without issues.

Additionally, there are 2 legacy `.spec.ts` files (list.spec.ts, tablesspanel.spec.ts) using
TestBed + Jasmine patterns that have no configured runner — these should be converted to the
new Vitest pattern as well.

## Infrastructure Setup

Check whether the Vitest infrastructure is already configured by looking for:
- A `test` target in `angular.json` using `@angular/build:unit-test`
- `vitest` in `package.json` devDependencies
- A `vitest-base.config.ts` file

If any of these are missing, run the full setup below. If all are present, skip to Phase 2.

### Phase 1 — Infrastructure Setup

#### 1.1 Install Vitest dependencies

```bash
npm install --save-dev vitest jsdom @types/luxon
```

`@types/luxon` is required by `@servoy/public` and `@eonasdan/tempus-dominus` type definitions.

#### 1.2 Add test target to angular.json

Add a `test` architect target to the library project:

```json
"test": {
  "builder": "@angular/build:unit-test",
  "options": {
    "tsConfig": "projects/bootstrapcomponents/tsconfig.spec.json",
    "buildTarget": "dummy:build",
    "runnerConfig": "vitest-base.config.ts"
  }
}
```

**Important:** Libraries need a `buildTarget` pointing to an application project since
`@angular/build:unit-test` needs an application build context. Use the `dummy` project.

#### 1.3 Create or update tsconfig.spec.json

The tsconfig for tests should extend the root tsconfig and include `.spec.ts` files:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/spec",
    "types": []
  },
  "files": [],
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.ts",
    "src/**/*.d.ts"
  ],
  "exclude": [
    "src/**/*.cy.ts"
  ]
}
```

The `exclude` for `*.cy.ts` is only needed while old Cypress files still exist.

#### 1.4 Create vitest-base.config.ts

This handles CommonJS module compatibility issues. Bootstrap and tempus-dominus may have
ESM/CJS interop issues:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    deps: {
      inline: ['@eonasdan/tempus-dominus', '@popperjs/core']
    }
  }
});
```

Add any other problematic CommonJS packages to `deps.inline` as you encounter them.

#### 1.5 Add test scripts to package.json

```json
"test": "ng test @servoy/bootstrapcomponents --no-watch",
"test:watch": "ng test @servoy/bootstrapcomponents",
"test:ui": "ng test @servoy/bootstrapcomponents --ui"
```

#### 1.6 Verify infrastructure

Run the test command. It should either pass with 0 tests or fail only because no
`.spec.ts` files exist yet (not because of config errors):

```bash
npx ng test @servoy/bootstrapcomponents --no-watch
```

## Input

The user provides:
- A specific component name (e.g., `textbox`, `calendar`) OR `all` to migrate everything
- Optionally `setup` to only configure the infrastructure without converting tests
- Optionally `cleanup` to only remove Cypress/Karma/Jasmine remnants

## Process

### Phase 2 — Convert Test Files

For each `.cy.ts` file, create a corresponding `.spec.ts` file with equivalent test coverage.

#### CRITICAL: Proven working pattern (Direct Component Testing)

**DO NOT use a WrapperComponent pattern.** It causes module resolution issues with
`standalone: false` components in the `ServoyBootstrapComponentsModule`.

**DO use direct component instantiation with `fixture.componentRef.setInput()`:**

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapTextbox } from './textbox';

describe('ServoyBootstrapTextbox', () => {
    let fixture: ComponentFixture<ServoyBootstrapTextbox>;
    let component: ServoyBootstrapTextbox;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServoyBootstrapTextbox],
            imports: [ServoyPublicTestingModule, FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapTextbox);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('enabled', true);
        fixture.componentRef.setInput('editable', true);
        // ... other inputs

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
```

#### Why this pattern works

1. **`fixture.componentRef.setInput()`** — sets signal inputs properly via the Angular
   framework's input binding mechanism. Direct property access doesn't work because
   signal inputs are readonly.

2. **`declarations: [TheComponent]`** — declare only the component under test. Since
   `ServoyBootstrapComponentsModule` already declares it, you CANNOT import the full module
   AND declare the component (double declaration error).

3. **`schemas: [NO_ERRORS_SCHEMA]`** — suppresses unknown element/attribute errors for
   child components in templates (like `[sabloTabseq]`, custom directives from ServoyPublicModule).

4. **`ServoyPublicTestingModule`** — provides mock implementations of Servoy services
   (`ServoyApi`, `FormattingService`, etc.).

5. **No `ServoyBootstrapComponentsModule` import** — avoids pulling in all 22 components and
   their heavy dependencies (tempus-dominus, ng-bootstrap, etc.), AND avoids potential
   CommonJS interop issues at the module import level.

#### Conversion mapping

| Cypress | Vitest + TestBed |
|---------|-----------------|
| `import { MountConfig } from 'cypress/angular'` | `import { TestBed, ComponentFixture } from '@angular/core/testing'` |
| `cy.mount(Wrapper, { declarations: [Comp], imports: [...] })` | `TestBed.configureTestingModule({ declarations: [Comp], imports: [...], schemas: [NO_ERRORS_SCHEMA] })` |
| `cy.mount(...).then(wrapper => { ... })` | Sequential async code after `TestBed.createComponent()` |
| Setting wrapper signals: `wrapper.component.prop.set(val)` | `fixture.componentRef.setInput('prop', val)` |
| Handler stubs: `defaultValues.onAction = cy.stub()` | `fixture.componentRef.setInput('onActionMethodID', vi.fn())` |
| `cy.get('selector')` | `fixture.nativeElement.querySelector('selector')` |
| `cy.get('selector').should('exist')` | `expect(el).not.toBeNull()` |
| `cy.get('selector').should('have.value', x)` | `expect((el as HTMLInputElement).value).toBe(x)` |
| `cy.get('selector').should('have.class', x)` | `expect(el.classList.contains(x)).toBe(true)` |
| `cy.get('selector').should('have.attr', a, v)` | `expect(el.getAttribute(a)).toBe(v)` |
| `cy.get('selector').should('not.have.class', x)` | `expect(el.classList.contains(x)).toBe(false)` |
| `cy.get('selector').should('contain', text)` | `expect(el.textContent).toContain(text)` |
| `cy.get('selector').click()` | `el.click(); fixture.detectChanges(); await fixture.whenStable()` |
| `cy.get('selector').rightclick()` | `el.dispatchEvent(new MouseEvent('contextmenu', {bubbles: true})); fixture.detectChanges()` |
| `cy.get('selector').blur()` | `el.dispatchEvent(new FocusEvent('blur', {bubbles: true})); fixture.detectChanges()` |
| `cy.get('selector').trigger('keydown', {which: 38})` | `el.dispatchEvent(new KeyboardEvent('keydown', {which: 38, bubbles: true})); fixture.detectChanges()` |
| `cy.get('selector').trigger('pointerenter')` | `el.dispatchEvent(new PointerEvent('pointerenter', {bubbles: true})); fixture.detectChanges()` |
| `cy.get('selector').trigger('focus')` | `el.dispatchEvent(new FocusEvent('focus', {bubbles: true})); fixture.detectChanges()` |
| `cy.stub()` | `vi.fn()` |
| `cy.wrap(stub).should('be.called')` | `expect(spy).toHaveBeenCalled()` |
| `cy.wrap(stub).should('have.been.calledWith', x)` | `expect(spy).toHaveBeenCalledWith(x)` |
| `cy.wrap(stub).should('not.have.been.called')` | `expect(spy).not.toHaveBeenCalled()` |
| `expect(stub).to.have.been.called` | `expect(spy).toHaveBeenCalled()` |
| `.then(() => { ... })` | Sequential code (Vitest is synchronous/async, not chained) |

#### Handler and output testing

**Handlers (input functions):** Set via `setInput` and check with `expect`:
```typescript
fixture.componentRef.setInput('onActionMethodID', vi.fn());
// ... trigger action ...
expect(component.onActionMethodID()).toHaveBeenCalled();
```

**Outputs (EventEmitter/output):** Subscribe to the output:
```typescript
const changeSpy = vi.fn();
component.dataProviderIDChange.subscribe(changeSpy);
// ... trigger change ...
expect(changeSpy).toHaveBeenCalledWith(expectedValue);
```

#### Tooltip testing

Tooltips in Servoy use a custom `[svyTooltip]` directive that renders on pointer events with
delays. In jsdom this doesn't fully work. Instead, verify the tooltip value is set:
```typescript
expect(component.toolTipText()).toBe('Expected tooltip');
```

#### Focus events in jsdom

jsdom doesn't fully simulate focus/blur via `.click()`. To test focus handlers,
dispatch the focus event directly:
```typescript
el.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
```

#### Per-component verification

After converting each test file:
```bash
npx ng test @servoy/bootstrapcomponents --no-watch --include "projects/bootstrapcomponents/src/<name>/<name>.spec.ts"
```

Fix any failures before moving to the next component.

---

### Phase 3 — Cleanup

After all tests are converted and passing:

#### 3.1 Remove Cypress files

```
DELETE: cypress.config.ts
DELETE: cypress/ (entire directory)
DELETE: all *.cy.ts files (21 files)
```

#### 3.2 Remove Cypress dependencies from package.json

Remove from `devDependencies`:
- `cypress`
- `css-loader` (only needed for Cypress webpack config)
- `style-loader` (only needed for Cypress webpack config)

Remove scripts:
- `cy:open`
- `cy:run`
- `cy:run_spec`

#### 3.3 Remove legacy test residuals

Remove the 2 legacy `.spec.ts` files if they've been superseded:
- `list/list.spec.ts` (old Jasmine-style)
- `tablesspanel/tablesspanel.spec.ts` (old Jasmine-style)

#### 3.4 Update tsconfig.spec.json

Remove the `"exclude": ["src/**/*.cy.ts"]` entry (no longer needed after .cy.ts files are deleted).

#### 3.5 Run npm install

```bash
npm install
```

This removes the unused packages from `node_modules` and updates `package-lock.json`.

#### 3.6 Final verification

```bash
npm run build
npx ng lint
npx ng test @servoy/bootstrapcomponents --no-watch
```

All three must pass.

---

### Phase 4 — Update AGENTS.md

After migration, update the `AGENTS.md` documentation to reflect the new test setup:

- Change test framework from "Cypress 15.x" to "Vitest (via @angular/build:unit-test)"
- Update test commands table
- Update test conventions section
- Update test file pattern from `**/*.cy.ts` to `**/*.spec.ts`
- Remove Cypress-specific instructions
- Update the "Post-edit checklist" section
- Document the direct component testing pattern (no WrapperComponent)
- Remove the "Pending migration" note

---

### Phase 5 — Update GitHub Actions workflow

Check for a `.github/workflows/` directory with a workflow that runs Cypress tests.
Replace it with a Vitest-based workflow:

```yaml
name: Run the vitest component tests

on:
  push:
    branches:
      - master
      - 20**
      - v20**
  workflow_dispatch:
  workflow_call:

jobs:
  build:

      runs-on: ubuntu-latest

      steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Find component directory
        id: find_component_dir
        run: echo "COMPONENT_DIR=$(find . -type d -name 'META-INF' -exec dirname {} \;)" >> $GITHUB_ENV

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22.x'

      - name: Cache + Restore node_modules
        uses: actions/cache@v4
        with:
          path: |
              ${{ env.COMPONENT_DIR }}/.angular
              ${{ env.COMPONENT_DIR }}/node_modules
          key: ${{ runner.os }}-node_modules-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node_modules-

      - name: Install and run the vitest component tests
        working-directory: ${{ env.COMPONENT_DIR }}
        run: |
          npm install
          npm run test
```

Key differences from the old Cypress workflow:
- No `~/.cache` in cache paths (Cypress binary cache no longer needed)
- `npm run test` instead of `npm run cy:run`
- No screenshot upload artifact step (Vitest doesn't produce screenshots)
- No Chrome/browser dependency needed (tests run in jsdom on Node.js)

---

## Execution strategy

When converting `all` components, process them in this order (simplest first):

1. `textbox` — simple form field, good to validate the setup
2. `textarea` — similar to textbox
3. `label` — simple display component
4. `datalabel` — simple display component
5. `button` — basic interaction
6. `imagemedia` — simple display
7. `checkbox` — form field with toggle
8. `select` — dropdown field
9. `choicegroup` — radio/checkbox group
10. `combobox` — more complex dropdown
11. `list` — list component (also has legacy .spec.ts to supersede)
12. `typeahead` — autocomplete field
13. `calendar` — tempus-dominus integration (may need special mocking)
14. `calendarinline` — inline calendar variant
15. `floatlabeltextbox` — float label variant
16. `floatlabeltextarea` — float label variant
17. `floatlabelcombobox` — float label variant
18. `floatlabelcalendar` — float label variant
19. `floatlabeltypeahead` — float label variant
20. `tabpanel` — tab container
21. `tablesspanel` — tabless panel (also has legacy .spec.ts to supersede)
22. `accordion` — most complex panel component

This order ensures quick wins early to validate the setup, with complex components last.

## Important notes & lessons learned

- **This is a library project.** The `@angular/build:unit-test` builder needs a `buildTarget`
  pointing to an application (`dummy:build`). This is how Angular CLI handles library testing.
- **jsdom is usually sufficient.** Most component tests check DOM state and events — they
  don't need real CSS rendering. Only use `--browsers` for layout-dependent tests.
- **DO NOT import `ServoyBootstrapComponentsModule` in tests.** It pulls in all dependencies
  including ng-bootstrap, tempus-dominus, etc. Instead, declare only the component under test.
- **DO NOT use a WrapperComponent.** It causes "not a known element" errors because
  `standalone: false` components need to be in the same NgModule as the wrapper, and
  you can't double-declare them. Use direct `TestBed.createComponent(TheComponent)` instead.
- **Use `fixture.componentRef.setInput('name', value)`** to set signal inputs. This is
  the Angular-approved way to set inputs programmatically in tests.
- **Use `NO_ERRORS_SCHEMA`** to suppress unknown element/attribute warnings from child
  directives (like `[sabloTabseq]`, `[svyTooltip]`) that come from `ServoyPublicModule`.
- **`ServoyPublicTestingModule`** provides mock Servoy services. Always import it.
- **tempus-dominus / @popperjs/core CommonJS issues:** These calendar dependencies may have
  ESM/CJS interop issues. The `vitest-base.config.ts` `deps.inline` setting handles this.
- **The `.spec` JSON files are NOT test files.** Don't confuse Servoy `.spec` files with
  test `.spec.ts` files. The Vitest include pattern `**/*.spec.ts` only matches TypeScript files.
- **Tooltip testing:** The `[svyTooltip]` directive uses delayed DOM manipulation that doesn't
  work in jsdom. Test that the tooltip value is set on the component rather than checking
  DOM rendering.
- **Focus/blur in jsdom:** `.click()` doesn't trigger focus events. Dispatch `FocusEvent`
  directly to test focus handlers.
- **Outputs use `.subscribe()`:** Since `output()` returns an `OutputEmitterRef`, use
  `component.outputName.subscribe(spy)` to listen for emissions.
- **Angular 22 is ready.** The `@angular/build:unit-test` builder works natively on
  Angular 22+. No version upgrade prerequisite needed.
