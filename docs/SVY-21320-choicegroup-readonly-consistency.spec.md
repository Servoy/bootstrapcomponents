# SVY-21320 — Choicegroup readonly: consistent attribute treatment for all items

## Status

| Field | Value |
|-------|-------|
| Jira | SVY-21320 |
| Type | Bug fix |
| Priority | Major |
| Component | `bootstrapcomponents-choicegroup` |

## Goal

When a choicegroup is set to read-only or disabled, ALL checkbox/radio inputs must
receive identical attribute treatment and appear visually identical. Currently the
first item looks different from the rest.

## Background

The choicegroup renders multiple `<input type="checkbox|radio">` elements in an
`@for` loop. Two independent mechanisms control their interactive state:

1. **Template binding** (`choicegroup.html:11`): `[disabled]="readOnly() || !enabled()"`
   — applies uniformly to every item via Angular property binding.

2. **Base class Renderer2 manipulation** (`bts_basefield.ts:72-78` and
   `bts_basecomp.ts:25-29`): sets `readonly`/`disabled` attributes imperatively on
   `getFocusElement()`, which resolves to only the **first** `<input>` (via
   `viewChild('input')` capturing the first match).

Because Renderer2 operations execute after template binding updates, the base class
"wins" for the first element: it gets `readonly="readonly"` set and `disabled`
removed, while all other inputs retain the template-applied `disabled`.

This architecture works for single-input fields (textbox, textarea) but breaks for
multi-element components like choicegroup.

Additionally, the `readonly` attribute is **not valid** on checkbox/radio inputs per
the HTML specification — it has no effect on user interaction for these input types.

## Design

### Approach

Override `svyOnChanges` in the choicegroup component to prevent the base class
readonly/enabled Renderer2 manipulation from affecting the first input. The template
`[disabled]` binding already handles all items correctly.

### Implementation detail

In `choicegroup.ts`, modify the existing `svyOnChanges` method to filter out the
`readOnly`, `enabled`, `editable`, and `findmode` change keys before calling
`super.svyOnChanges(changes)`. This prevents:

- `ServoyBootstrapBasefield.svyOnChanges` from setting `readonly="readonly"` on the
  first input (line 72-78 of `bts_basefield.ts`)
- `ServoyBootstrapBaseComponent.svyOnChanges` from setting/removing `disabled` on the
  first input (line 25-29 of `bts_basecomp.ts`)

The filtered changes object should still pass through `variant`, `styleClass`,
`placeholderText`, `selectOnEnter`, and all other keys so that non-readonly/enabled
base class behaviour is preserved.

### What stays unchanged

- The template binding `[disabled]="readOnly() || !enabled()"` — already correct for
  all items.
- The `_isReadonly` computed signal — still available for any logic that needs to check
  readonly state.
- The `itemClicked` guard `if (!this.readOnly() && this.enabled())` — already prevents
  interaction correctly.

## File changes

| File | Change |
|------|--------|
| `projects/bootstrapcomponents/src/choicegroup/choicegroup.ts` | Modify `svyOnChanges`: filter `readOnly`, `enabled`, `editable`, `findmode` from the changes object before calling `super.svyOnChanges()` |

## Acceptance criteria

1. When `readOnly = true` and `enabled = true`: all items display with `disabled`
   attribute, none have `readonly` attribute. All items appear visually identical
   (greyed out).

2. When `enabled = false`: all items display with `disabled` attribute. All items
   appear visually identical.

3. When `readOnly = false` and `enabled = true`: no items have `disabled` or `readonly`
   attributes. All items are interactive.

4. When `findmode = true`: regardless of readOnly/editable state, items should be
   interactive (the template binding evaluates `readOnly() || !enabled()`, findmode
   does not affect this — existing behaviour is acceptable since findmode interaction
   is guarded in `itemClicked`).

5. `variant` and `styleClass` changes continue to work (base class behaviour preserved
   for these keys).

6. No visual regression in normal (editable, enabled) state.

## Testing

Add/update test cases in `choicegroup.spec.ts`:

- **Test: all items disabled when readOnly is true** — set `readOnly` input to `true`,
  verify all rendered `<input>` elements have `disabled` property set to `true` and
  none have a `readonly` attribute.

- **Test: all items disabled when enabled is false** — set `enabled` input to `false`,
  verify all rendered `<input>` elements have `disabled` property set to `true`.

- **Test: no items disabled when readOnly is false and enabled is true** — verify all
  rendered `<input>` elements do NOT have `disabled` property set.

- **Test: styleClass changes still applied** — set `styleClass`, verify the base class
  still processes the class change correctly.

## Risks

- **Coupling to base class internals**: The fix relies on knowledge of which change
  keys trigger Renderer2 DOM manipulation in the base classes. If base class behaviour
  changes, this override may need updating. This is an acceptable trade-off given
  the alternative (modifying base classes that work correctly for all other components).

- **findmode interaction**: The choicegroup's findmode behaviour is not affected by this
  change since the template binding does not reference `findmode` — items remain
  interactive in findmode regardless. The `itemClicked` method already handles findmode
  logic correctly.
