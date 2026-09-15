# Spec: SVY-20449 — Bootstrap tabpanel/accordion ignore contained form scrollbars=NEVER (TiNG)

## 1. Goal
When a form whose `scrollbars` property is NEVER is shown inside a Bootstrap
**tabpanel** or **accordion** in NG2/TiNG, the host container must not render
scrollbars. Today both components hardcode `overflow: auto` on their content
container, which overrides the contained form's `overflow: hidden` and produces
unwanted scrollbars. This spec mirrors the already-shipped `servoydefault` fix
in the `bootstrapcomponents` repo (branch **2024.3**) for these two components,
so their behavior matches NG1 and the `servoydefault` tabpanel/tablesspanel.

## 2. Background

### 2.1 Root cause (from triage)
When a form's `scrollbars` is NEVER, the server sends the body part with
`overflow-x`/`overflow-y: hidden` in the part's `layout` map. On the client this
arrives as `PartCache.layout`
(`com.servoy.eclipse.ngclient.ui/node/src/ngclient/types.ts:316` `PartCache`).
The host container that displays the contained form hardcodes `overflow: auto`
on its own element, which visually wins over the form's `hidden` overflow.

### 2.2 Prior art — the servoydefault fix (same ticket)
This was already fixed for the `servoydefault`/`servoycore` (TiNG internal app)
side of Servoy under this ticket:

- **servoycore formcontainer** — `getContainerStyle()` reads
  `formCache.parts[0]?.layout` overflow-x/overflow-y and applies
  `overflowX`/`overflowY`
  (`.../src/servoycore/formcontainer/formcontainer.ts:223-231`, commits
  `7e37e4b799`, `60cc8fd890`). Note: this code lives in the internal `src/` app,
  where `getFormCacheByName()` returns the concrete `FormCache` that has a public
  `parts` field.
- **servoydefault tabpanel/tablesspanel** — `BaseTabpanel.applyOverflowFromForm()`
  (`.../projects/servoydefault/src/lib/tabpanel/basetabpanel.ts:80-101`) reads the
  contained form's body-part overflow via
  `formCache.getBodyPartLayout?.()`, sets `overflowX`/`overflowY` on the passed
  `containerStyle`, deletes each axis that is unset, and deletes the hardcoded
  `overflow` when either axis is present. Wired into `tabpanel.ts:38` and
  `tablesspanel.ts:24`. Commits `14e6698c71`, `e086211dd4`.
- To support the above from a library that only sees the public API, this ticket
  added the **optional** method `getBodyPartLayout?(): { [property: string]: string }`
  to `IFormCache` (`.../projects/servoy-public/src/lib/services/servoy_public.service.ts:125`)
  and implemented it on the concrete `FormCache` (`.../src/ngclient/types.ts`).

### 2.3 The Bootstrap gap
The `bootstrapcomponents` (branch 2024.3) components were never touched by those
fixes and still force `overflow: auto`:

- **Bootstrap tabpanel** — `containerStyle = { position: 'relative', minHeight:
  '0px', overflow: 'auto' }`
  (`projects/bootstrapcomponents/src/tabpanel/tabpanel.ts:22`). `getContainerStyle()`
  (`tabpanel.ts:116-153`) computes height/position but never consults the
  contained form's overflow, so `overflow: auto` always wins. Bound via
  `[ngStyle]="getContainerStyle(element)"` in `tabpanel.html:22`.
- **Bootstrap accordion** — the body element hardcodes `overflow: auto` inline:
  `<div ngbAccordionBody #content style="position: relative;overflow: auto;...">`
  (`projects/bootstrapcomponents/src/accordion/accordion.html:9`). `accordion.ts`
  only manages `panelHeight`, never overflow.

(`bootstrapcomponents` **tablesspanel** sets only `position`/`minHeight`, no
`overflow` — `tablesspanel.ts:89-106` — so it is not affected and is out of
scope.)

### 2.4 Version coupling — the critical constraint
`bootstrapcomponents` depends on the **published** `@servoy/public 2024.3.0`
(`package.json:26`), and consumes it through the public API surface, where
`ServoyPublicService.getFormCacheByName(form)` returns **`IFormCache`**
(`servoy_public.service.ts:80`). The published `IFormCache` interface exposes
only `absolute`, `size`, `getComponent()`, and the optional
`getBodyPartLayout?()`. It does **not** expose a `parts` field.

Consequences for the two options the triage laid out:

- **Reading `getFormCacheByName(form).parts[0]?.layout` directly** (the
  `formcontainer.ts` pattern) does **not** type-check against the published
  `IFormCache`, because `parts` is a member of the concrete `FormCache`, not of
  the public `IFormCache` interface. That pattern only compiles inside the
  internal `src/` app. Using it here would require a cast to `any`/`FormCache`.
- **`getBodyPartLayout?()`** was assumed to be declared on the published
  `IFormCache` interface as an optional method. **This assumption proved wrong at
  build time** (see §2.5): the published `@servoy/public` artifacts that the
  branches resolve do **not** declare `getBodyPartLayout` on `IFormCache` at all,
  so a guarded call still fails to type-check (`TS2339`). The method is
  runtime-present on matching runtimes but absent from the published `.d.ts`.

Because neither `parts` nor `getBodyPartLayout` is on the published `IFormCache`
type, the call must be made through a **local structural cast** that declares the
optional method, keeping the runtime optional-chaining guard for graceful
degradation. See §2.5 and Design §3.1.

### 2.5 Correction — published type gap (found at build time)
The premise in §2.4 that the published `IFormCache` `.d.ts` declares
`getBodyPartLayout?()` is **incorrect**. Installing each branch's pinned
`@servoy/public` and grepping its `.d.ts` shows the member is not declared in any
of them (`2024.3.0`, `2025.3.0`, `2025.9.1`, `2026.9.3`). The CI production build
consequently failed with:
```
error TS2339: Property 'getBodyPartLayout' does not exist on type 'IFormCache'.
```
The correct, portable fix is to cast `getFormCacheByName()`'s result to a local
structural type declaring the optional method:
```ts
const formCache = this.servoyPublicService.getFormCacheByName(formName)
    as { getBodyPartLayout?(): { [property: string]: string } };
const layout = formCache?.getBodyPartLayout ? formCache.getBodyPartLayout() : null;
```
This compiles against every published `@servoy/public` and stays a runtime no-op
when the deployed runtime lacks the method. See triage "Post-merge findings" F1.

## 3. Design

### 3.1 Shared overflow helper on `ServoyBootstrapBaseTabPanel`
Both Bootstrap tabpanel and accordion already extend
`ServoyBootstrapBaseTabPanel` (`bts_basetabpanel.ts`), which has access to
`servoyApi` and the selected tab's `containedForm` (via `getForm()` /
`selectedTab.containedForm`). Add a protected helper on the base class,
mirroring `BaseTabpanel.applyOverflowFromForm` from `servoydefault`:

```ts
protected applyOverflowFromForm(containerStyle: { [property: string]: any }) {
    const formName = this.selectedTab ? this.getForm(this.selectedTab) : null;
    if (formName && this.servoyPublicService) {
        const formCache = this.servoyPublicService.getFormCacheByName(formName)
            as { getBodyPartLayout?(): { [property: string]: string } };
        const layout = formCache?.getBodyPartLayout ? formCache.getBodyPartLayout() : null;
        if (layout?.['overflow-x']) {
            containerStyle['overflowX'] = layout['overflow-x'];
        } else {
            delete containerStyle['overflowX'];
        }
        if (layout?.['overflow-y']) {
            containerStyle['overflowY'] = layout['overflow-y'];
        } else {
            delete containerStyle['overflowY'];
        }
        if (layout?.['overflow-x'] || layout?.['overflow-y']) {
            delete containerStyle['overflow'];
        }
    }
}
```

Requirements:
- The base class currently has no `ServoyPublicService`. Inject it into
  `ServoyBootstrapBaseTabPanel`'s constructor (already the pattern in
  `tablesspanel.ts:23`, `formcontainer` and `servoydefault BaseTabpanel:43`), and
  update the subclass constructors (`ServoyBootstrapTabpanel`,
  `ServoyBootstrapAccordion`) to pass it through `super(...)`.
- Cast the `getFormCacheByName()` result to a local structural type declaring
  `getBodyPartLayout?()` (see §2.5): the published `IFormCache` `.d.ts` does not
  declare the member, so a bare guarded call fails `TS2339`. The cast plus the
  optional-chaining guard is type-safe against every published `@servoy/public`
  and runtime-safe if the deployed runtime predates the method (returns
  `undefined` → helper is a no-op, container keeps existing `overflow: auto`).
- Do **not** read `formCache.parts[...]` — it is not on the published
  `IFormCache` either and would likewise require a cast.

The helper resolves the form for the currently visible/selected tab, so switching
tabs re-derives overflow from the newly shown form.

**Guard against no selected tab:** the accordion template binds `getBodyStyle()`
on every change-detection pass — including before any tab is selected. `getForm()`
dereferences `this.selectedTab.containedForm` (`bts_basetabpanel.ts:111`), so the
helper must only call `getForm` when `this.selectedTab` is set; otherwise it leaves
the default `overflow: auto` untouched. Guarding with
`const formName = this.selectedTab ? this.getForm(this.selectedTab) : null;`
prevents the `TypeError: Cannot read properties of undefined (reading 'containedForm')`
that otherwise fires during accordion rendering.

### 3.2 Bootstrap tabpanel
In `ServoyBootstrapTabpanel.getContainerStyle(element)` (`tabpanel.ts:116-153`),
after the existing height/position computations and before `return
this.containerStyle`, call `this.applyOverflowFromForm(this.containerStyle)`.
This sets `overflowX`/`overflowY` from the visible tab's form and deletes the
hardcoded `overflow` when a specific axis is present; when the form does not
constrain overflow, the existing `overflow: 'auto'` (declared at
`tabpanel.ts:22`) is preserved. No template change is needed —
`tabpanel.html:22` already binds `[ngStyle]="getContainerStyle(element)"`.

Note: `getContainerStyle` mutates and returns the shared `this.containerStyle`
object; the helper's `delete`/set operations must therefore also reset the
opposite state on each call (the helper's `else { delete ... }` branches handle
this) so that a form that later re-enables scrollbars restores auto behavior.

### 3.3 Bootstrap accordion
The accordion body's overflow is hardcoded inline in the template
(`accordion.html:9`). Replace the static `overflow: auto` with a bound style:

- Remove `overflow: auto;` from the inline `style="..."` on the
  `ngbAccordionBody` div.
- Add `[ngStyle]="getBodyStyle()"` (or bind `overflowX`/`overflowY`) to that div,
  where `getBodyStyle()` on `ServoyBootstrapAccordion` builds a style object,
  defaults it to `{ overflow: 'auto' }`, then calls
  `this.applyOverflowFromForm(style)` and returns it.

Because the accordion uses `[closeOthers]="true"` and shows one tab's form at a
time, resolving overflow from `getForm(selectedTab)` in the helper is correct for
the visible panel. Keep the remaining inline styles (`position: relative; top/
bottom/left/right: 0px`) and the existing `[style.height.px]="panelHeight"`
binding unchanged.

### 3.4 Git history (carried from triage)
- `servoy-eclipse` `7e37e4b799`, `60cc8fd890` (SVY-20449): first round —
  `formcontainer.ts` reads body-part overflow.
- `servoy-eclipse` `14e6698c71`, `e086211dd4` (SVY-20449): added
  `getBodyPartLayout()` to `IFormCache`/`FormCache` and `applyOverflowFromForm()`
  to `servoydefault` `BaseTabpanel`. `git log -S "getBodyPartLayout"` shows these
  are the only commits adding the method → it is not in published
  `@servoy/public 2024.3.0`.
- `bootstrapcomponents` (2024.3): the hardcoded `overflow: auto` in `tabpanel.ts:22`
  dates to `07c4958` (SVYX-406, 2022); accordion inline `overflow: auto` is
  original markup. No SVY-20449 commit exists in this repo yet.

## 4. Implementation plan
All changes are in `D:\GitSourcesComponents\bootstrapcomponents` on branch
**2024.3**.

1. **`projects/bootstrapcomponents/src/bts_basetabpanel.ts`**
   - Import `ServoyPublicService` from `@servoy/public`.
   - Add `protected servoyPublicService?: ServoyPublicService` to the constructor
     signature (last, optional, to match `servoydefault`) and pass through to
     `super` unchanged (base already extends `ServoyBootstrapBaseComponent`).
   - Add the `protected applyOverflowFromForm(containerStyle)` helper from §3.1,
     using guarded `formCache?.getBodyPartLayout?.()`. Resolve the form name only
     when a tab is selected —
     `const formName = this.selectedTab ? this.getForm(this.selectedTab) : null;` —
     because the accordion template invokes the helper before selection and
     `getForm` dereferences `this.selectedTab.containedForm`.
2. **`projects/bootstrapcomponents/src/tabpanel/tabpanel.ts`**
   - Update `ServoyBootstrapTabpanel` constructor to inject `ServoyPublicService`
     and forward it to `super(...)`.
   - In `getContainerStyle(element)`, call
     `this.applyOverflowFromForm(this.containerStyle)` before `return`.
3. **`projects/bootstrapcomponents/src/accordion/accordion.ts`**
   - Update `ServoyBootstrapAccordion` constructor to inject `ServoyPublicService`
     and forward it to `super(...)`.
   - Add `getBodyStyle()` that returns a style object defaulting to
     `{ overflow: 'auto' }` then applies `applyOverflowFromForm`.
4. **`projects/bootstrapcomponents/src/accordion/accordion.html`**
   - Remove `overflow: auto;` from the inline style on the `ngbAccordionBody` div
     (line 9) and add `[ngStyle]="getBodyStyle()"`.
5. Build the library (`npm run build` / `ng build`) and lint (`npm run lint`) to
   verify no type errors against `@servoy/public 2024.3.0`.
6. Manually verify against the ticket sample (a form with `scrollbars=NEVER`
   larger than its container) placed in a Bootstrap tabpanel and in a Bootstrap
   accordion: no scrollbars in NG2, matching NG1.

## 5. Acceptance criteria
- [ ] A form with `scrollbars=NEVER` shown in a Bootstrap **tabpanel** renders no
      scrollbars in NG2/TiNG (matches NG1).
- [ ] A form with `scrollbars=NEVER` shown in a Bootstrap **accordion** panel
      renders no scrollbars in NG2/TiNG (matches NG1).
- [ ] Forms that allow scrollbars (default/auto) still scroll normally in both
      components (no regression to existing `overflow: auto` behavior).
- [ ] Switching tabs / expanding a different accordion panel re-derives overflow
      from the newly visible form.
- [ ] Overflow is applied per-axis: a form constraining only `overflow-x` or only
      `overflow-y` constrains only that axis.
- [ ] The library builds against the currently pinned `@servoy/public 2024.3.0`
      with no type errors, and `applyOverflowFromForm` degrades to a no-op when the
      deployed public runtime lacks `getBodyPartLayout` (no runtime error).
- [ ] The accordion renders without throwing before a tab is selected (no
      `TypeError: Cannot read properties of undefined (reading 'containedForm')`);
      overflow stays `auto` until a tab is selected.
- [ ] `npm run lint` passes.

## 6. Out of scope
- `bootstrapcomponents` **tablesspanel** (sets no `overflow`; unaffected).
- Any change to `servoydefault`/`servoycore` (already fixed under this ticket).
- Adding/exposing new methods on `@servoy/public` (reuse the existing optional
  `getBodyPartLayout`).
- Bumping the `@servoy/public` dependency version (see Open questions).
- NG1 behavior (already correct).

## 7. Open questions
| Question | Owner | Status |
|----------|-------|--------|
| Should `bootstrapcomponents`' `@servoy/public` dependency be bumped from `2024.3.0` to the build that ships `getBodyPartLayout()`, or is the guarded optional-call + deploy-time runtime alignment acceptable? | Dev/Release | **Resolved (corrected):** No bump. But the guarded optional call alone does **not** compile — the published `IFormCache` `.d.ts` does not declare `getBodyPartLayout` (see §2.5 / triage F1), so `ng build --configuration production` failed with `TS2339`. Fix: cast `getFormCacheByName()` to a local structural type `{ getBodyPartLayout?(): {...} }`, keeping the runtime guard. Type-safe against every published `@servoy/public`, runtime no-op on older runtimes. |
| Confirm the 2024.3 runtime that this component version ships against implements `getBodyPartLayout` on `FormCache`, so the fix is actually active (not a silent no-op). | Release | **Resolved:** In this workspace `servoy-public` is at `2024.3.1` and declares `getBodyPartLayout?()`; the concrete `FormCache` implementation was added under SVY-20449 in the same 2024.3 line. The component is at `2024.3.7`, so a matching 2024.3.x runtime (≥2024.3.1) implements the method — the fix is live, not a silent no-op. |
| Accordion: bind a full `[ngStyle]` object vs. discrete `[style.overflow-x]`/`[style.overflow-y]` bindings. | Dev | **Resolved:** Use the full `[ngStyle]` object, for consistency with tabpanel. |
