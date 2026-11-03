# Sweet16Palettes

Prepared for James and Claude · November 3, 2026

## Contents

- `index.html`: complete updated ChatGPT-copy application.
- `Sweet16Palettes.patch`: the palette-only change against our Main immediately before this package.
- `palette-values.json`: exact light/dark values for the five additions.
- `screenshots/`: actual implementation screenshots at desktop, 320 px, and 390 px, plus light/dark forms.
- `SHA256SUMS`: file integrity checksums.

## Scope

Adds five palettes to the existing eleven, giving sixteen total. No build step, libraries, services, or changes to reading/sharing behavior. Retains Default's legacy `sage` key and colors. The separate leafy Sage keeps `sage-green`.

1. Default
2. Sage
3. Ocean Blue
4. Rose
5. Lavender
6. Meadow Green and Tan
7. Slate
8. Plum
9. Amber
10. Espresso
11. Forest
12. Terracotta
13. Teal
14. Paper and Ink
15. Ivory and Ink
16. Blueprint

## Design descriptions

**Terracotta** (`terracotta`): warm sand pages, clay-toned forms, burnt orange primary `#A4472A`, and a deep brick dark mode. Distinct from pink Rose, gold Amber, and brown Espresso.

**Teal** (`teal`): pale sea-glass pages, deep teal primary `#1F6F6B`, and dark petrol surfaces. Blue-green rather than Ocean's true blue or Forest's evergreen.

**Paper and Ink** (`paper-ink`): white pages and forms, nearly black text/actions, strong gray borders. Dark mode uses true black pages/forms and off-white text/actions. Body text contrast is approximately 18.9:1 light and 20.1:1 dark. True black may reduce OLED power consumption; savings depend on the device and content.

**Ivory and Ink** (`ivory-ink`): warm ivory pages/forms, near-black text/actions, strong charcoal-brown borders. Dark mode uses warm near-black surfaces and ivory text/actions. Body text contrast is approximately 15.9:1 light and 16.5:1 dark.

**Blueprint** (`blueprint`): pale drafting-paper blue pages, blue-white forms, strong ink-blue text/actions and blue borders. Dark mode uses deep navy with pale blue text/actions. Body text contrast is approximately 13.0:1 light and 16.5:1 dark. Stronger control lines distinguish it from Ocean.

The three ink/Blueprint palettes use 2 px borders on shared inputs, secondary buttons, and Discover cards, plus 3 px focus-visible outlines. All named palettes use coordinated page/form/card surfaces, text, borders, controls, progress, and default hero gradients. Member photos, book covers, member colors, ChatGPT identity, warning/destructive colors, and achievement artwork retain their identities. High contrast is not a claim of full accessibility conformance.

## Safe handoff to Claude

This complete HTML belongs to `gravityoptional/reading-room-chatgpt` and contains that copy's blue ChatGPT tag and isolated `rr-chatgpt-*` / `rr_chatgpt_*` storage keys. Do not copy those identity/storage choices into another prototype.

For the other prototype, port the palette-only patch or the labeled `Sweet16Palettes` CSS block and the five appended PALETTES entries. Preserve that target's current application logic, identity, and storage keys. Review patch context before applying it; do not replace a newer target app blindly with this full HTML. Do not reapply the previous Appearance Package or sharing changes.

The five new stored palette identifiers are additive. Appearance mode remains independent: System follows OS changes, explicit Light/Dark overrides it, and selections survive reload. No migration of existing palette selections is needed.

Use a branch, test, and follow James's approval/publishing process for the target repository. This package does not authorize publishing any other repository.

## Validation and limits

Browser checks cover light/dark palette selection and persistence, body/secondary/button text contrast, form rendering, live System changes, identity, phone baseline widths, saving/reloading reading sessions, keyboard tabs, and first-copy privacy/solo behavior. See validation results below for completed checks.

External font/book requests are blocked during deterministic screenshots, so covers may be placeholders. Existing 320 px header overflow (approximately 19 px) is not changed by this palette package. Stronger borders do not constitute a full accessibility audit; inspect validation states, charts, disabled controls, zoom, keyboard use, and assistive technology separately.

Completed checks: all 32 palette/mode combinations passed selection persistence, body/secondary/button text contrast at least 4.5:1, form rendering, System switching, and baseline phone-width checks. Default legacy key, 16 options, and ChatGPT identity passed. Rendering and saving/reloading sessions passed at 320, 390, and 1280 px. Sharing prompts, preference persistence, solo privacy, keyboard tab focus, and storage isolation passed at those sizes.
