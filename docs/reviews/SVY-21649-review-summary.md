# Review Summary — SVY-21649: Tabpanel ignores configured height after 2026.9 upgrade

**Risk: MODERATE.** The code change is small and no concrete regression was found. The rating comes from the Fix Version mismatch below and from the fact that the layout result was never seen on a running client.

Reviewed: `bootstrapcomponents` commit `8c4c9d9` (master, in tag v2026.9.1).

## Release-target check: MISMATCH

- Jira Fix Version is `2026.9.0`.
- Tag `v2026.9.0` (2026-09-03) predates the commit (2026-10-26).
- The package Bundle-Version at the commit was 2026.9.1, and the fix first appears in tag `v2026.9.1` (2026-11-03).
- The Fix Version may name the platform release rather than this package's version. No Jira comment names a package version, so this is open.

## Manual test plan

Verifying the fix
1. Absolute, CSS-position form with a bootstrap tabpanel, cssPosition "7,0,5,0,100%,50%", height 240. Run it in the NG client with this package (2026.9.1 or later).
2. The tab content fills the whole component box below the tab bar, with no empty space and no cut-off content.
3. Resize the browser window. The content area follows the box.

Regression checks
4. Same form with height="100%". It looks identical to step 2.
5. Absolute form that uses anchoring instead of CSS position. Check the tabpanel sizing and compare with 2026.6 if possible.
6. Responsive form with a tabpanel and height 240. It keeps `min-height: 240px`.
7. Tablesspanel and Accordion in an absolute form (untouched, smoke test).
8. Switch tabs and add or remove a tab. The container height stays correct after the tab bar height changes.

Automated (from `components/`): `npx ng test @servoy/bootstrapcomponents --no-watch --include "projects/bootstrapcomponents/src/tabpanel/tabpanel.spec.ts"` (7 of 7 passed during review), plus `npm run build` and `npx ng lint` (not run).

## Possible improvements / follow-ups

- Confirm whether anchored (non-CSS-position) absolute forms set `isInAbsoluteLayout()`. If they do, they now take the `calc(100% - tab bar)` branch instead of `min-height`. servoydefault already behaves this way.
- Check the fix against the SERVOY-301 form, with its 2026.6 screenshots as reference.
- Which release is this meant for, the platform release or this package's 2026.9.1?
- AGENTS.md says components are `standalone:false` and module-declared, but commit `e0c1cee` converted them to standalone. The doc is stale.
- A 2022 comment in `tabpanel.ts` ("should we set this to absolute ? it cannot be relative") is a leftover and not part of this change.
