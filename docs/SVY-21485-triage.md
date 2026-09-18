# Triage Report — SVY-21485

**Verdict:** PROCEED

## Reported problem

In Servoy IDE 2026.09, an Angular error is thrown that is related to a component. The
attached console log shows:

```
ERROR org.sablo.BrowserConsole - : NG0100: ExpressionChangedAfterItHasBeenCheckedError:
Expression has changed after it was checked. Previous value for 'width': '136'. Current value: '137'.
Expression location: _ServoyBootstrapCombobox component.
    at checkStylingProperty ...
    at ??styleProp ...
    at ServoyBootstrapCombobox_Template ...
```

The symptom is Angular's `NG0100` (`ExpressionChangedAfterItHasBeenCheckedError`) firing
from the combobox component's template, specifically on a `width` style binding whose value
shifts by one pixel (136 → 137) between change-detection passes.

The ticket describes only the symptom (the console error). It proposes no solution.

## Root-cause assessment

The error is deterministic and points to a single location. The combobox template binds the
dropdown menu width to a method that reads a live DOM measurement:

`components/projects/bootstrapcomponents/src/combobox/combobox.html:27`
```html
[style.width.px]="getDropDownWidth()"
```

`components/projects/bootstrapcomponents/src/combobox/combobox.ts:145`
```typescript
getDropDownWidth() {
    return this.input()?.nativeElement?.clientWidth;
}
```

`getDropDownWidth()` returns `input.nativeElement.clientWidth` — a rounded integer read
straight from the rendered DOM. This is exactly the anti-pattern that triggers `NG0100`:

- The binding is evaluated during change detection, and its result depends on the current
  rendered layout.
- Applying the width can itself nudge layout (scrollbar appearance, sub-pixel rounding),
  so the value read on the verification pass differs from the value read on the first pass.
- `clientWidth` rounds to an integer, so a sub-pixel layout difference surfaces as a 1px
  jump (136 → 137), which is precisely the value pair in the reported error.

In dev mode (the Servoy IDE / developer runtime) Angular runs a second "changes were already
checked" verification pass and throws `NG0100` when the two reads disagree. In production the
check is skipped, which is why this typically only surfaces in the IDE.

The same anti-pattern exists in the float-label variant and will have the same defect:

`components/projects/bootstrapcomponents/src/floatlabelcombobox/floatlabelcombobox.html:20`
```html
[style.width.px]="getDropDownWidth()"
```
(`floatlabelcombobox` extends the combobox, sharing `getDropDownWidth()`.)

Note: the older AngularJS combobox (`components/combobox/combobox.html`) is a separate legacy
implementation and is not affected by Angular change detection; this is purely an Angular-layer
issue.

## Ticket premise check

The ticket proposes no solution — it only reports the console error. The premise ("this is an
Angular error related to a component") holds: it is a genuine Angular change-detection error
originating in the Servoy `ServoyBootstrapCombobox` template binding, not user misconfiguration
and not a third-party bug. `NG0100` is by design a developer-facing signal that the template is
reading layout during change detection; the framework is behaving correctly. The fix belongs in
the combobox component.

## Approaches considered

1. **Compute the width imperatively and store it in a signal, then bind to the signal.**
   Read `clientWidth` in a lifecycle hook / event (e.g. on dropdown open, or via a
   `ResizeObserver` / `afterNextRender`) and write it into a signal the template binds to. The
   template no longer reads live DOM during change detection.
   - Pros: removes the root cause cleanly; keeps `OnPush`/signal conventions; the value is
     stable within a change-detection cycle. Fixes both combobox and floatlabelcombobox via the
     shared method.
   - Cons: slightly more code; need to pick the right trigger point so the width is set before
     the menu is shown and refreshed if the control resizes.

2. **Bind the dropdown menu width to `width: 100%` / CSS instead of a measured pixel value.**
   Let the menu inherit the toggle button's width through CSS (`min-width`/`width: 100%` on the
   dropdown menu relative to its container) rather than a JS-measured px value.
   - Pros: no JS measurement at all, no `NG0100` possible, simplest long-term.
   - Cons: risk of behavioural change when `appendToBody` is used (the menu is moved to `body`
     and loses the container's width context) — that is the very reason the pixel width was
     introduced. Needs verification that the append-to-body case still sizes correctly.

3. **No code change.**
   - Pros: none of substance. In production the error is suppressed.
   - Cons: the error is real and visible to developers in the IDE for 2026.09 (the fix version),
     is confusing, pollutes the console, and the underlying "read layout during CD" pattern is
     fragile. Not acceptable to ship as-is for the release it's targeted at.

## Recommendation

**PROCEED** with **Approach 1** (compute the width imperatively into a signal, bind the template
to that signal). It directly removes the `NG0100` cause while staying within the project's
signal + `OnPush` conventions, and it fixes both `combobox` and `floatlabelcombobox` through the
shared `getDropDownWidth()`.

Consider Approach 2 (pure CSS) as a simpler alternative if verification shows the CSS approach
sizes correctly in the `appendToBody` case — that would be the cleanest outcome. Approach 3
(no change) is rejected: the error is a genuine defect surfacing in the targeted release.

Whichever approach is chosen, the fix must be validated against the `appendToBody` path, since
that scenario (menu moved to `body`) is why the width was measured in pixels originally.

## Git history findings

- The `[style.width.px]="getDropDownWidth()"` binding in `combobox.html:27` was introduced by
  commit `f1edd5fe` (cPecican, 2026-05-12, "SVY-21007 Improve the signals implementation").
- The current `getDropDownWidth()` body (`return this.input()?.nativeElement?.clientWidth;`)
  dates to commit `ae70cc82` (cPecican, 2026-01-23, "SVY-20819 use signals instead of @input").
- The pattern predates these commits conceptually (returning the toggle's `clientWidth`); the
  signals migration preserved the live-DOM read in the template binding, which is what now
  trips `NG0100`. The fix does not revert an intentional design decision — the intent was
  "size the menu to match the toggle", which any of the approaches above still satisfies.
