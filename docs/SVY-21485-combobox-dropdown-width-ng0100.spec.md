# Spec: SVY-21485 — Servoy IDE 2026.09 throws Angular error related to component

## 1. Goal

Eliminate the `NG0100: ExpressionChangedAfterItHasBeenCheckedError` that the
`ServoyBootstrapCombobox` (and its subclass `ServoyFloatLabelBootstrapCombobox`) throws in the
Servoy IDE 2026.09 developer runtime. The error is caused by the dropdown menu binding
`[style.width.px]="getDropDownWidth()"` reading a live DOM measurement (`clientWidth`) during
change detection, which can shift by one pixel (e.g. 136 → 137) between the first and the
verification change-detection pass. The fix removes the live-DOM read from the template binding
by computing the width imperatively and storing it in a signal, so the template binds a value
that is stable within a change-detection cycle. This cleans up the console noise developers see
in the IDE while keeping the dropdown menu sized to match the toggle button — including the
`appendToBody` scenario, which is why the width was measured in pixels in the first place.

## 2. Background

Both combobox variants render an `ngbDropdownMenu` whose width is pinned to the toggle button's
rendered width so the menu lines up with the control:

- `combobox.html:27` → `[style.width.px]="getDropDownWidth()"`
- `floatlabelcombobox.html:20` → `[style.width.px]="getDropDownWidth()"` (subclass, shares the method)

`getDropDownWidth()` (`combobox.ts:145`) returns `this.input()?.nativeElement?.clientWidth` — a
rounded integer read straight from the rendered DOM every change-detection pass. This is the
classic `NG0100` anti-pattern:

- The binding is evaluated during change detection and its result depends on the current
  rendered layout.
- Applying a width can itself nudge layout (scrollbar appearance, sub-pixel rounding), so the
  value read on the verification pass can differ from the first read.
- `clientWidth` rounds to an integer, so a sub-pixel difference surfaces as a 1px jump — exactly
  the 136 → 137 pair in the reported error.

In dev mode (the IDE / developer runtime) Angular runs the extra verification pass and throws
`NG0100`; in production the check is skipped, which is why it typically only surfaces in the IDE.

Relevant architecture:
- Both components are `OnPush`, signal-based (`input()`, `viewChild()`, `signal()`).
- `ServoyFloatLabelBootstrapCombobox` extends `ServoyBootstrapCombobox` and inherits
  `getDropDownWidth()` and `openChange()` — a fix in the base combobox covers both.
- `openChange(state: boolean)` (`combobox.ts:190`) already runs whenever the dropdown opens or
  closes (wired to `(openChange)` on the `ngbDropdown` in both templates). It sets the
  `openState` signal and is the natural place to capture the toggle width when the menu opens.
- `appendToBody()` moves the `ngbDropdownMenu` to `document.body`; there it loses its container's
  width context, which is the original reason the width was measured and applied in pixels. The
  fix must keep this working.

## 3. Design

### 3.1 Replace the live-DOM binding with a signal

Introduce a writable signal on `ServoyBootstrapCombobox` that holds the last measured toggle
width, and bind the template to it:

```typescript
dropDownWidth = signal<number | undefined>(undefined);
```

Template (both `combobox.html` and `floatlabelcombobox.html`):

```html
[style.width.px]="dropDownWidth()"
```

Reading a signal in the binding is stable within a change-detection cycle — the value only
changes when we explicitly `set()` it outside the verification pass — so `NG0100` cannot fire
from this binding.

### 3.2 Measure imperatively when the dropdown opens

The width only needs to be correct while the menu is visible. `openChange()` already fires on
open/close, so capture the width there when opening:

- In `openChange(state)`, when `state === true`, read `this.input()?.nativeElement?.clientWidth`
  and write it into `dropDownWidth`.
- The read happens inside an event-driven callback (dropdown open), not inside a template
  binding evaluated during change detection, so it does not trip the verification pass.
- Keep `getDropDownWidth()` as the single measurement helper (still returning `clientWidth`) and
  have `openChange()` call it, so the measurement logic stays in one place and both variants share
  it. Only the *template binding* stops calling it directly.

If measuring synchronously at the start of `openChange(true)` proves to be a frame too early
(menu/toggle not yet laid out for the open state), defer the read to after the current render
using `afterNextRender` (imported from `@angular/core`) or a microtask/`setTimeout(0)`, then
`set()` the signal. `openChange()` already uses a `setTimeout` for focusing the active item, so a
deferred read is consistent with the existing pattern. Pick the simplest option that measures the
same width the current code produces.

### 3.3 Preserve the `appendToBody` behaviour (mandatory validation)

The pixel width exists specifically so the menu still matches the toggle when `appendToBody()` is
true and the menu is relocated to `<body>` (losing container-relative sizing). The imperative
measurement reads the toggle button's `clientWidth`, which is unaffected by where the menu is
appended — so the same pixel value is applied in both the inline and append-to-body cases. This
must be verified manually in the IDE / dummy app with `appendToBody = true`: the open menu's width
must still equal the toggle's width, as it does today.

### 3.4 Scope of change

- `combobox.ts` — add `dropDownWidth` signal; set it from `openChange()` (via `getDropDownWidth()`).
- `combobox.html` — change the binding to `dropDownWidth()`.
- `floatlabelcombobox.html` — change the binding to `dropDownWidth()`.
- No `.spec` (Servoy contract) change: this is an internal rendering fix, no model property,
  handler, or API method changes. The dual-layer spec/Angular alignment is unaffected.

## 4. Implementation plan

1. In `combobox.ts`, add a writable signal `dropDownWidth = signal<number | undefined>(undefined);`.
2. In `openChange(state)`, when `state === true`, measure the toggle width (via
   `getDropDownWidth()`) and `this.dropDownWidth.set(...)`. Defer the read with `afterNextRender`
   or a `setTimeout(0)` only if a synchronous read measures too early.
3. Keep `getDropDownWidth()` as the shared measurement helper; stop calling it from the template.
4. Change `combobox.html:27` binding from `[style.width.px]="getDropDownWidth()"` to
   `[style.width.px]="dropDownWidth()"`.
5. Change `floatlabelcombobox.html:20` binding the same way.
6. Confirm `ServoyFloatLabelBootstrapCombobox` needs no additional change (inherits the signal and
   `openChange()`).
7. Build (`npm run build`) and lint (`npx ng lint`) from `components/`.
8. Run combobox tests: `npx ng test @servoy/bootstrapcomponents --no-watch --include "projects/bootstrapcomponents/src/combobox/combobox.spec.ts"` and the floatlabelcombobox spec if present.
9. Manually validate in the IDE / dummy app: open both comboboxes with `appendToBody` false and
   true; confirm the menu width matches the toggle and no `NG0100` appears in the console.

## 5. Acceptance criteria

- [ ] Opening the combobox in the Servoy IDE 2026.09 no longer logs
      `NG0100: ExpressionChangedAfterItHasBeenCheckedError` for `'width'` from
      `ServoyBootstrapCombobox`.
- [ ] The dropdown menu width still visually matches the toggle button width (inline case).
- [ ] With `appendToBody = true`, the dropdown menu (relocated to `<body>`) still matches the
      toggle button width.
- [ ] The same fix resolves the error for `floatlabelcombobox` (verified by inspection/behaviour,
      since it shares `getDropDownWidth()` / `openChange()`).
- [ ] `npm run build` compiles without errors and `npx ng lint` introduces no new warnings.
- [ ] Existing combobox tests pass; a regression test asserts the width binding no longer reads
      live DOM during change detection (e.g. the template reads `dropDownWidth()` and the signal
      is populated on open).

## 6. Out of scope

- The legacy AngularJS combobox (`components/combobox/combobox.html` / `.js`) — it is a separate
  implementation not subject to Angular change detection and is unaffected.
- Approach 2 (pure CSS `width: 100%` sizing) — noted in triage as a possible simpler alternative,
  but not adopted here because it risks changing the `appendToBody` behaviour; it may be revisited
  separately if CSS-only sizing is later proven correct for the append-to-body case.
- Any change to the Servoy `.spec` contract, model properties, handlers, or API methods.
- Behavioural or styling changes to the dropdown beyond removing the `NG0100` cause.

## 7. Open questions

| Question | Owner | Status |
|----------|-------|--------|
| Is a synchronous width read in `openChange(true)` accurate, or must it be deferred (`afterNextRender` / `setTimeout(0)`) to measure the toggle after the open-state layout? | Implementer (verify in IDE/dummy app) | open |
| Should the width be refreshed while the menu is open if the control is resized (e.g. via `ResizeObserver`), or is measuring once on open sufficient (matching current behaviour, which measured every CD pass but only mattered while open)? | Implementer / reviewer | open |
