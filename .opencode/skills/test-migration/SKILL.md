---
name: test-migration
description: "Use when the user wants to migrate component tests from Cypress to Vitest, or clean up legacy test infrastructure (Cypress, Karma, Jasmine). Triggered by 'test migration', 'migrate tests', 'cypress to vitest', 'convert tests', 'remove cypress', or 'clean up test framework'."
---

# Test Migration — Cypress to Angular Vitest

You are a **test framework migration agent** for a Servoy Angular component library. Your job is
to convert Cypress component tests (`.cy.ts`) to Angular Vitest tests (`.spec.ts`) and clean up
all legacy test infrastructure.

## Context

Angular 22+ uses Vitest as the official test framework via `@angular/build:unit-test` builder.
Tests use Angular's `TestBed` with jsdom (or optionally real browsers via `--browsers`).

Cypress component testing relies on `@cypress/webpack-dev-server` which requires the legacy
webpack-based `@angular-devkit/build-angular`. Projects using `@angular/build` (esbuild-based)
cannot run Cypress tests. This skill migrates those projects to Vitest.

## Infrastructure Setup

Check whether the Vitest infrastructure is already configured by looking for:
- A `test` target in `angular.json` using `@angular/build:unit-test`
- `vitest` in `package.json` devDependencies
- A `vitest-base.config.ts` file

If any of these are missing, run the full setup below. If all are present, skip to Phase 2.

### Phase 1 — Infrastructure Setup

#### 1.1 Install Vitest dependencies

```bash
npm install --save-dev vitest jsdom
```

If the project uses `luxon` or `@eonasdan/tempus-dominus`, also ensure `@types/luxon` is present.

#### 1.2 Add test target to angular.json

Add a `test` architect target to the library project:

```json
"test": {
  "builder": "@angular/build:unit-test",
  "options": {
    "tsConfig": "projects/<library>/tsconfig.spec.json",
    "buildTarget": "<app-project>:build",
    "runnerConfig": "vitest-base.config.ts"
  }
}
```

**Important:** Libraries need a `buildTarget` pointing to an application project since
`@angular/build:unit-test` needs an application build context. Use the `dummy` project
or whichever application project exists in the workspace.

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

This handles CommonJS module compatibility issues. Add packages that cause ESM/CJS
interop problems to `deps.inline`:

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    deps: {
      inline: [/* add problematic CommonJS packages here */]
    }
  }
});
```

Common packages that need inlining:
- `file-saver`, `ngx-filesaver`, `@servoy/ngx-lightbox` (for servoy-extra-components)
- `@eonasdan/tempus-dominus`, `@popperjs/core` (for bootstrapcomponents)

#### 1.5 Add test scripts to package.json

```json
"test": "ng test <project-name> --no-watch",
"test:watch": "ng test <project-name>",
"test:ui": "ng test <project-name> --ui",
"test:browser": "ng test <project-name> --no-watch --browsers chromium --headless --include \"projects/<library>/src/<browser-test-component>/<browser-test-component>.spec.ts\""
```

Replace `<project-name>` with the Angular project name from `angular.json`.
The `test:browser` script is only needed if browser-mode tests exist.

#### 1.6 Verify infrastructure

Run the test command. It should either pass with 0 tests or fail only because no
`.spec.ts` files exist yet (not because of config errors):

```bash
npx ng test <project-name> --no-watch
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
`standalone: false` components declared in shared NgModules.

**DO use direct component instantiation with `fixture.componentRef.setInput()`:**

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { TheComponent } from './thecomponent';

describe('TheComponent', () => {
    let fixture: ComponentFixture<TheComponent>;
    let component: TheComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TheComponent],
            imports: [ServoyPublicTestingModule, FormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(TheComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('enabled', true);
        fixture.componentRef.setInput('editable', true);
        // ... other inputs

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });
});
```

#### Why this pattern works

1. **`fixture.componentRef.setInput()`** — sets signal inputs properly via the Angular
   framework's input binding mechanism. Direct property access doesn't work because
   signal inputs are readonly.

2. **`declarations: [TheComponent]`** — declare only the component under test. Since
   the shared module already declares it, you CANNOT import the full module AND declare
   the component (double declaration error).

3. **`schemas: [NO_ERRORS_SCHEMA]`** — suppresses unknown element/attribute errors for
   child components in templates (like `[sabloTabseq]`, custom directives).

4. **`ServoyPublicTestingModule`** — provides mock implementations of Servoy services.

5. **No shared component module import** — avoids pulling in all components and their
   heavy dependencies, AND avoids potential CommonJS interop issues at the module level.

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

#### Browser-mode tests (for DOM-heavy third-party widgets)

Components that depend on third-party libraries needing real DOM rendering (e.g.,
inline calendars with tempus-dominus, canvas-based gauges) cannot be fully tested in
jsdom. Use the browser-mode pattern:

```typescript
const isBrowser = typeof window !== 'undefined' && typeof window.getComputedStyle === 'function'
    && typeof (window as any).__vitest_browser__ !== 'undefined';

describe.runIf(isBrowser)('Component (browser)', () => {
    // These tests only run with --browsers chromium
});
```

**Setup for browser-mode:**
```bash
npm install --save-dev @vitest/browser-playwright playwright
npx playwright install chromium
```

**Wait for third-party widget initialization** — after `fixture.detectChanges()`, some
widgets render asynchronously:
```typescript
await new Promise(resolve => setTimeout(resolve, 500));
fixture.detectChanges();
await fixture.whenStable();
```

**Target browser tests only** in the `test:browser` script with `--include` to avoid
re-running all jsdom tests in the browser.

#### Per-component verification

After converting each test file:
```bash
npx ng test <project-name> --no-watch --include "projects/<library>/src/<name>/<name>.spec.ts"
```

Fix any failures before moving to the next component.

---

### Phase 3 — Cleanup

After all tests are converted and passing:

#### 3.1 Remove Cypress files

```
DELETE: cypress.config.ts
DELETE: cypress/ (entire directory)
DELETE: all *.cy.ts files
```

#### 3.2 Remove Cypress dependencies from package.json

Remove from `devDependencies`:
- `cypress`
- `css-loader` (if only used for Cypress webpack config)
- `style-loader` (if only used for Cypress webpack config)

Remove scripts:
- `cy:open`
- `cy:run`
- `cy:run_spec`

#### 3.3 Remove legacy test residuals from package.json

Remove from `devDependencies` (if present):
- `@types/jasmine`
- `karma`, `karma-*`

#### 3.4 Update tsconfig files

- Remove `"exclude": ["src/**/*.cy.ts"]` from tsconfig.spec.json
- Update tsconfig.lib.json exclude from `**/*.cy.ts` to `**/*.spec.ts`

#### 3.5 Run npm install

```bash
npm install
```

This removes the unused packages from `node_modules` and updates `package-lock.json`.

#### 3.6 Final verification

```bash
npm run build
npx ng lint
npm run test
```

All three must pass.

---

### Phase 4 — Update AGENTS.md

After migration, update the `AGENTS.md` documentation to reflect the new test setup:

- Change test framework to "Vitest (via @angular/build:unit-test)"
- Update test commands table (add test:browser if applicable)
- Update test conventions section
- Update test file pattern from `**/*.cy.ts` to `**/*.spec.ts`
- Remove Cypress-specific instructions
- Update the "Post-edit checklist" section
- Document the direct component testing pattern (no WrapperComponent)
- Document browser-mode tests if applicable

---

### Phase 5 — Update GitHub Actions workflow

Check for a `.github/workflows/` directory with a workflow that runs Cypress tests.
Replace it with a Vitest-based workflow:

```yaml
name: Lint and test

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
        uses: actions/checkout@v7

      - name: Find component directory
        id: find_component_dir
        run: echo "COMPONENT_DIR=$(find . -type d -name 'META-INF' -exec dirname {} \;)" >> $GITHUB_ENV

      - name: Use Node.js
        uses: actions/setup-node@v7
        with:
          node-version: '22.x'

      - name: Cache + Restore node_modules
        uses: actions/cache@v6
        with:
          path: |
              ${{ env.COMPONENT_DIR }}/.angular
              ${{ env.COMPONENT_DIR }}/node_modules
          key: ${{ runner.os }}-node_modules-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node_modules-

      - name: Install dependencies
        working-directory: ${{ env.COMPONENT_DIR }}
        run: npm install

      - name: Lint
        working-directory: ${{ env.COMPONENT_DIR }}
        continue-on-error: true
        run: npx ng lint --force --format json --output-file eslint-results.json

      - name: Annotate PR with ESLint results
        if: always()
        uses: ataylorme/eslint-annotate-action@v4
        with:
          report-json: ${{ env.COMPONENT_DIR }}/eslint-results.json
        continue-on-error: true

      - name: Run Vitest component tests
        working-directory: ${{ env.COMPONENT_DIR }}
        run: npm run test

      - name: Run browser-mode tests
        working-directory: ${{ env.COMPONENT_DIR }}
        run: npm run test:browser
```

Key differences from a Cypress workflow:
- No `~/.cache` in cache paths (Cypress binary cache no longer needed)
- `npm run test` instead of `npm run cy:run`
- No screenshot upload artifact step (Vitest doesn't produce screenshots)
- No Chrome/browser system dependency needed for jsdom tests
- Browser-mode tests use Playwright's bundled Chromium (installs via npm)
- Lint step with ESLint annotations for PR feedback

---

## Execution strategy

When converting `all` components, process in order of complexity (simplest first):

1. Simple form fields (textbox, textarea) — validate the pattern
2. Simple display components (label, datalabel, imagemedia)
3. Basic interaction (button, checkbox)
4. Selection components (select, choicegroup, combobox)
5. Complex form fields (typeahead, calendar)
6. Panel/container components (tabpanel, accordion)
7. Third-party-widget-heavy components last (may need browser-mode)

This order ensures quick wins early to validate the setup, with complex components last.

## Important notes & best practices

- **This is a library project.** The `@angular/build:unit-test` builder needs a `buildTarget`
  pointing to an application (`dummy:build`). This is how Angular CLI handles library testing.
- **jsdom is usually sufficient.** Most component tests check DOM state and events — they
  don't need real CSS rendering. Only use `--browsers` for layout-dependent tests.
- **DO NOT import the shared component module in tests.** It pulls in all dependencies.
  Instead, declare only the component under test.
- **DO NOT use a WrapperComponent.** It causes "not a known element" errors because
  `standalone: false` components need to be in the same NgModule as the wrapper, and
  you can't double-declare them. Use direct `TestBed.createComponent(TheComponent)` instead.
- **Use `fixture.componentRef.setInput('name', value)`** to set signal inputs. This is
  the Angular-approved way to set inputs programmatically in tests.
- **Use `NO_ERRORS_SCHEMA`** to suppress unknown element/attribute warnings from child
  directives (like `[sabloTabseq]`, `[svyTooltip]`) that come from `ServoyPublicModule`.
- **`ServoyPublicTestingModule`** provides mock Servoy services. Always import it.
- **The `.spec` JSON files are NOT test files.** Don't confuse Servoy `.spec` files with
  test `.spec.ts` files. The Vitest include pattern `**/*.spec.ts` only matches TypeScript files.
- **Tooltip testing:** The `[svyTooltip]` directive uses delayed DOM manipulation that doesn't
  work in jsdom. Test that the tooltip value is set on the component rather than checking
  DOM rendering.
- **Focus/blur in jsdom:** `.click()` doesn't trigger focus events. Dispatch `FocusEvent`
  directly to test focus handlers.
- **Outputs use `.subscribe()`:** Since `output()` returns an `OutputEmitterRef`, use
  `component.outputName.subscribe(spy)` to listen for emissions.
- **Browser-mode for DOM-heavy libs:** Components depending on libraries that need real DOM
  (tempus-dominus inline, canvas-gauges, etc.) should use `describe.runIf(isBrowser)` and
  be tested via `--browsers chromium --headless`.
- **Wait for async widget init:** After `fixture.detectChanges()`, third-party widgets may
  render asynchronously. Use `await new Promise(resolve => setTimeout(resolve, 500))`.
- **Target browser tests with `--include`:** Don't run all tests in browser mode — it's
  slow. Use `--include` to target only the files that need it.
- **All `it` blocks should be `async`:** This ensures `await fixture.whenStable()` works
  correctly after interactions.
