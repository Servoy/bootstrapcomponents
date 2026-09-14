# Triage Report — SVY-20449

**Verdict:** PROCEED

## Reported problem
**Symptom:** When a form is larger than its container and has both scrollbars
set to **NEVER**, NG1 correctly shows no scrollbars, but NG2 (TiNG) still
renders scrollbars. Reported on 2024.3.6.3949_LTS with a sample solution and a
video (attachments `scrollbar_never_issue.servoy`, `testscrollbars.servoy`,
`20250801093550.mp4`).

The ticket is a plain bug report — it proposes no solution.

**Reopen trigger:** Comment by Vicky Mamatsopoulou (2026-08-21) narrowed the
first round to "the default tab panel component the customer is using", which
was fixed. Comment by Laurian Vostinar (2026-09-09): *"This is still not
completely fixed, see sample."* Per the user context, the case was reopened
because the **Bootstrap tabpanel and accordion** exhibit the same problem
(repo `D:\GitSourcesComponents\bootstrapcomponents`, branch **2024.3**).

## Root-cause assessment
When a form's `scrollbars` property is NEVER, the server sends the form body
part with `overflow-x` / `overflow-y: hidden` in the part's `layout` map. On the
client this arrives as `PartCache.layout`
(`com.servoy.eclipse.ngclient.ui/node/src/ngclient/form.service.ts:620`,
`.../types.ts:316` `PartCache`). The problem is on the **host container** that
displays the contained form: each container hardcodes `overflow: auto` on its
own container element, which visually overrides the form's own `hidden` overflow
and produces the unwanted scrollbars.

This root cause was already confirmed and fixed for the `servoydefault`
(TiNG) side of Servoy under this same ticket:

- `servoycore` **formcontainer** — `getContainerStyle()` now reads
  `formCache.parts[0].layout` overflow-x/overflow-y and applies it
  (`.../src/servoycore/formcontainer/formcontainer.ts:223-231`, commits
  `7e37e4b799`, `60cc8fd890`).
- `servoydefault` **tabpanel / tablesspanel** — a new `applyOverflowFromForm()`
  helper on `BaseTabpanel` reads the contained form's body-part overflow and
  applies it, deleting the hardcoded `overflow` when a specific axis is set
  (`.../projects/servoydefault/src/lib/tabpanel/basetabpanel.ts:80-101`, wired
  into `tabpanel.ts:38` and `tablesspanel.ts:24`). This required exposing
  `getBodyPartLayout()` on `IFormCache` / `FormCache`
  (`.../projects/servoy-public/src/lib/services/servoy_public.service.ts:125`,
  `.../src/ngclient/types.ts:90-92`). Commits `14e6698c71`, `e086211dd4`.

The **Bootstrap** components in `bootstrapcomponents` (2024.3) were never
touched by those fixes and still force `overflow: auto`, so the exact same
symptom remains:

1. **Bootstrap tabpanel** —
   `projects/bootstrapcomponents/src/tabpanel/tabpanel.ts:22`:
   ```ts
   containerStyle = { position: 'relative', minHeight: '0px', overflow: 'auto' };
   ```
   `getContainerStyle()` (`tabpanel.ts:116-153`) computes height/position but
   never consults the contained form's overflow layout, so `overflow: auto`
   always wins. The panel outlet binds it via
   `[ngStyle]="getContainerStyle(element)"` (`tabpanel.html:22`).

2. **Bootstrap accordion** —
   `projects/bootstrapcomponents/src/accordion/accordion.html:9`:
   ```html
   <div ngbAccordionBody #content style="position: relative;overflow: auto;..." [style.height.px]="panelHeight">
   ```
   The body's `overflow: auto` is hardcoded inline; `accordion.ts` only manages
   `panelHeight` and never adjusts overflow from the contained form's layout.
   Same root cause.

(`bootstrapcomponents` **tablesspanel** — `tablesspanel.ts:89-106` sets only
`position`/`minHeight`, no `overflow`, so it is not part of this symptom and is
outside the reopen scope of tabpanel/accordion.)

## Ticket premise check
The ticket proposes no approach; the only premise is "this is a Servoy NG2 bug,
not user error." That premise holds: it reproduces from an attached sample,
NG1 behaves correctly, and the regression is a concrete, identifiable pattern
(host container forcing `overflow: auto` and ignoring the form's
`scrollbars=NEVER`). The reopen premise — that Bootstrap tabpanel and accordion
share the bug — is confirmed by direct code inspection above.

## Approaches considered
1. **Mirror the `servoydefault` fix in the Bootstrap components** — read the
   contained form's body-part `overflow-x`/`overflow-y` and apply it to the
   container, removing the hardcoded `overflow: auto` when an axis is set. For
   tabpanel this means computing overflow inside `getContainerStyle()` (a helper
   on `bts_basetabpanel` mirroring `applyOverflowFromForm`, since the base class
   already has `servoyApi`/access to per-tab `containedForm`). For accordion it
   means replacing the inline `overflow: auto` in `accordion.html` with an
   `[ngStyle]` binding driven by the same per-tab form-layout lookup.
   — **Pros:** matches the already-shipped `servoydefault` behavior and NG1;
   consistent, minimal per-component change; correct for the reported scenario.
   — **Cons:** version coupling (see below) — the helper depends on
   `IFormCache.getBodyPartLayout()`, which was added to `@servoy/public` *by this
   same ticket* and is not in the published `@servoy/public 2024.3.0` that
   `bootstrapcomponents` currently depends on. The fix must either bump the
   `@servoy/public` dependency to a version that exports `getBodyPartLayout()`,
   or read `getFormCacheByName(form).parts[0].layout` directly (the
   `formcontainer` approach), or cast defensively.

2. **CSS-only override in the Bootstrap components' stylesheets** — target the
   host container so a form with `scrollbars=NEVER` gets `overflow: hidden`.
   — **Pros:** no TS/dependency changes.
   — **Cons:** the container has no reliable class that reflects the contained
   form's scrollbar setting, so CSS cannot conditionally apply hidden vs auto;
   would either break scrolling for forms that *do* want scrollbars or fail to
   target the NEVER case. Not viable.

3. **No code change** — Rejected. This is a real, reproducible regression with a
   known root cause, already accepted and fixed for the sibling `servoydefault`
   components under this ticket; the reopen explicitly identifies the Bootstrap
   tabpanel/accordion gap. There is no client-side property a user can set to
   work around it.

## Recommendation
Proceed with **Approach 1** in `bootstrapcomponents` (branch 2024.3), applied to
both reopened components:

- **Bootstrap tabpanel:** in `getContainerStyle()` (`tabpanel.ts`), look up the
  currently visible tab's `containedForm` via
  `servoyApi`/`ServoyPublicService.getFormCacheByName(...)`, read its body-part
  `overflow-x`/`overflow-y`, set `overflowX`/`overflowY` on `containerStyle`, and
  delete the hardcoded `overflow` when an axis is present — mirroring
  `BaseTabpanel.applyOverflowFromForm` from the `servoydefault` fix. Consider
  placing the helper on `bts_basetabpanel` so accordion can reuse it.
- **Bootstrap accordion:** replace the hardcoded inline `overflow: auto` on the
  `ngbAccordionBody` (`accordion.html:9`) with an `[ngStyle]` binding fed by the
  same per-tab form-layout overflow lookup in `accordion.ts`.

**Resolve the version coupling explicitly:** confirm which shipped
`@servoy/public` version first exports `IFormCache.getBodyPartLayout()`. Options,
in order of preference:
1. Bump `bootstrapcomponents`' `@servoy/public` dependency to that version and
   use `getBodyPartLayout()` (cleanest, matches `servoydefault`).
2. If that version is not yet available for 2024.3, read
   `getFormCacheByName(form).parts[0]?.layout` directly (the exact pattern used
   in `formcontainer.ts:224` under this same ticket), avoiding the new optional
   method entirely. `getFormCacheByName` is already part of the public API and is
   already used by `bootstrapcomponents` (`tablesspanel.ts:97`), so this path
   introduces no new dependency surface.

The spec/implementation phase must pick between (1) and (2) based on the
available `@servoy/public` release for the 2024.3 line.

## Resolution (as implemented)
Approach 1 was implemented on branch `2024.3`. Final decisions and deviations from
the triage sketch above:

- **Version coupling — neither (1) nor (2).** No dependency bump, and `parts[]` was
  *not* read directly. `parts` is not on the published `IFormCache` interface (only
  on the concrete `FormCache`), so option (2) would need an unsafe cast. Instead the
  helper calls the optional, publicly declared `formCache?.getBodyPartLayout?.()`,
  exactly as `servoydefault` does — type-safe against `@servoy/public 2024.3.x` and
  a runtime no-op if the deployed public bundle predates the method.
- **Shared helper.** `applyOverflowFromForm(containerStyle)` lives on
  `bts_basetabpanel.ts`; `ServoyPublicService` is injected as an optional last
  constructor arg and forwarded via `super(...)` from tabpanel and accordion.
- **tabpanel:** `getContainerStyle()` calls the helper before returning.
- **accordion:** inline `overflow: auto` removed from `accordion.html:9`, replaced by
  `[ngStyle]="getBodyStyle()"`, where `getBodyStyle()` seeds `{ overflow: 'auto' }`
  then applies the helper.
- **No-selected-tab guard (follow-up fix after reopen verification).** The accordion
  template evaluates `getBodyStyle()` on every change-detection pass, including
  before a tab is selected. `getForm()` dereferences `this.selectedTab.containedForm`,
  which threw `TypeError: Cannot read properties of undefined (reading 'containedForm')`
  during accordion rendering. Fixed by resolving the form only when a tab is selected:
  `const formName = this.selectedTab ? this.getForm(this.selectedTab) : null;`.

## Git history findings
- `servoy-eclipse` `7e37e4b799`, `60cc8fd890` (SVY-20449): first round — fixed
  `servoycore/formcontainer/formcontainer.ts` to read the form's body-part
  overflow.
- `servoy-eclipse` `14e6698c71`, `e086211dd4` (SVY-20449, Diana Bunaciu,
  2026-08-21): added `getBodyPartLayout()` to `IFormCache`/`FormCache` and
  `applyOverflowFromForm()` to `servoydefault` `BaseTabpanel`, wiring it into
  `tabpanel.ts`/`tablesspanel.ts`. `git log -S "getBodyPartLayout"` on
  `servoy_public.service.ts` shows these are the **only** commits that added the
  method — so it is not in published `@servoy/public 2024.3.0`, confirming the
  version-coupling risk above.
- `bootstrapcomponents` (branch 2024.3): the hardcoded `overflow: auto` in
  `tabpanel.ts:22` dates to `07c4958` (SVYX-406, "Cannot make tab panel 100%
  height in responsive flex layout form", 2022) and predates the SVY-20449 work
  entirely; no SVY-20449 commit exists in this repo. The accordion inline
  `overflow: auto` is original markup, likewise never revisited for scrollbar
  handling.
