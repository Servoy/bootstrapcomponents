# Triage Report — SVY-21320

**Verdict:** PROCEED

## Reported problem

When a bootstrapcomponents-choicegroup is set to read-only, the first checkbox/radio
input receives `readonly="readonly"` while all subsequent items receive a `disabled`
attribute. This creates a visual inconsistency: the first item appears enabled (white
background, full opacity) while the rest are greyed out.

## Root-cause assessment

The bug is caused by a conflict between two independent mechanisms for controlling
the readonly/disabled state of inputs:

**Mechanism 1 — Template binding** (`choicegroup.html:11`):
```html
[disabled]="readOnly() || !enabled()"
```
This applies uniformly to ALL items in the `@for` loop via Angular property binding.

**Mechanism 2 — Base class Renderer2 DOM manipulation** (`bts_basefield.ts:72-78`):
```ts
if (changes.editable || changes.readOnly || changes.findmode) {
    if (this._isReadonly()) {
        this.renderer.setAttribute(this.getFocusElement(), 'readonly', 'readonly');
    } else {
        this.renderer.removeAttribute(this.getFocusElement(), 'readonly');
    }
}
```
And in `bts_basecomp.ts:25-30`:
```ts
case 'enabled':
    if (change.currentValue)
        this.renderer.removeAttribute(this.getFocusElement(), 'disabled');
    else
        this.renderer.setAttribute(this.getFocusElement(), 'disabled', 'disabled');
```

Both Renderer2 operations target `getFocusElement()`, which in choicegroup resolves to
the **first** `<input>` only (via `viewChild('input')` which captures only the first
match in the `@for` loop).

**The conflict:** When readOnly is true and enabled is true:
- `bts_basefield` sets `readonly="readonly"` on the first input only
- `bts_basecomp` (when enabled is in changes) removes `disabled` from the first input only
- The template binding sets `disabled` on all inputs

Due to execution timing (Renderer2 operations in svyOnChanges run after Angular's
template binding update), the base class operations "win" for the first element:
the first input gets `readonly` and has `disabled` removed, while all other inputs
retain the `disabled` set by the template binding.

This architecture works fine for single-input components (checkbox, textbox, etc.)
where `getFocusElement()` and the template binding target the same element. It breaks
for multi-element components like choicegroup where `viewChild` only captures the first.

## Ticket premise check

The ticket correctly identifies the symptom and the expected behaviour (all items
should be visually identical). It does not propose a specific implementation approach,
which is appropriate — the fix is purely internal to the component.

## Approaches considered

1. **Override svyOnChanges in choicegroup to skip base class readonly/enabled
   Renderer2 handling** — The choicegroup's `svyOnChanges` currently calls
   `super.svyOnChanges(changes)` unconditionally. It could intercept and remove
   `readOnly`/`enabled`/`editable`/`findmode` from the changes object before passing
   to super, or selectively call only the parent logic it needs (styleClass, variant,
   placeholderText, selectOnEnter). The template binding already handles disabled
   correctly for all items.
   - Pros: Targeted fix, no change to base classes or other components. Template
     remains the single source of truth for disabled/readonly state.
   - Cons: Slightly couples choicegroup to base class implementation details.

2. **Remove `[disabled]` template binding and handle via the ChoiceElementDirective
   using Renderer2 on each element** — Each item's directive already has a reference
   to the element; it could apply `disabled`/`readonly` consistently.
   - Pros: Consistent approach (all via Renderer2), avoids property/attribute conflict.
   - Cons: More complex, duplicates logic already handled by template, goes against
     Angular best practices (prefer template bindings over imperative DOM manipulation).

3. **Use `[disabled]` template binding for all items AND remove `readonly` attribute
   set by base class** — Keep template as-is for disabled, just prevent the base class
   `readonly` Renderer2 call from applying to choicegroup. The `readonly` attribute is
   meaningless on checkboxes/radios anyway (HTML spec does not define readonly for these
   input types).
   - Pros: Simplest fix, `readonly` on checkbox/radio is non-standard anyway.
   - Cons: Technically overrides base class behaviour (same as option 1).

4. **No code change** — Not viable. This is a clear visual bug where the first item
   looks different from the rest.
   - Pros: None.
   - Cons: Bug persists, poor UX.

## Recommendation

**Approach 3** is recommended. The fix involves:

1. In `choicegroup.ts`, override the `svyOnChanges` to prevent base class readonly/enabled
   Renderer2 manipulation from reaching the first input. The template `[disabled]` binding
   already handles all items correctly. The `readonly` attribute is not valid for
   checkbox/radio inputs per the HTML specification, so setting it is incorrect regardless.

2. The template binding `[disabled]="readOnly() || !enabled()"` remains unchanged — it
   already produces the correct uniform behaviour for all items.

The concrete implementation: in `choicegroup.svyOnChanges`, after calling
`super.svyOnChanges(changes)`, undo the `readonly` attribute that the base class set
on the first element. Or better: override the svyOnChanges to skip the readOnly/enabled
Renderer2 handling entirely by filtering those keys before calling super, or by
removing the `readonly` attribute after super completes.

## Git history findings

- `bts_basefield.ts:72-78` (readonly handling): Introduced by `be743c25` (cPecican,
  2023-11-29) for SVY-18673 "All fields should be editable in find mode". Refactored
  in `f1edd5fe` (cPecican, 2026-05-12) for SVY-21007 signal migration.
- `bts_basecomp.ts:25-30` (enabled/disabled handling): Original design from `1fa1cd55`
  (Johan Compagner, 2021-05-07) — the initial Angular port.
- `choicegroup.html:11` (`[disabled]` binding): Added by `ae70cc82` (cPecican,
  2026-01-23) during signal migration (SVY-20819).

The `[disabled]` template binding was added during signal migration without accounting
for the pre-existing Renderer2 manipulation in the base classes. The base class
Renderer2 approach was designed for single-element fields (textbox, textarea, etc.)
and was never adapted for multi-element components like choicegroup.
