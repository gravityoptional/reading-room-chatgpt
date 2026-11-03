# Appearance Package

Prepared for James and Claude · November 3, 2026

## Purpose

Make the Color Palette control change the whole reading environment, rather than only buttons and links. Keep the interface calm, readable, and useful on phones and desktop. Offer warm, cool, neutral, soft, and stronger earth-tone choices without assigning palettes to a gender.

This package is implemented in ChatGPT's sandbox copy, `gravityoptional/reading-room-chatgpt`, in `index.html`. Claude can use it as a design and implementation reference for the other prototype. It does not authorize pushing, merging, or publishing any other repository. Follow that repository's own instructions and preserve its own storage names and identity; never copy this sandbox's storage keys into another prototype.

## Palette lineup

| Selection | Description | Distinction |
| --- | --- | --- |
| Default | The original cream-and-green appearance, previously named Sage. | Preserve its existing light and dark colors and existing users' selection. |
| Sage | Soft leafy backgrounds, fresh near-white forms, forest-green text and muted green borders. | Gentle and green throughout, separate from Default's cream. |
| Ocean Blue | Cool blue-gray pages, pale blue-white forms, blue borders and deep blue actions. | Crisp, cool, and clean. |
| Rose | Warm blush pages, almost-white pink forms, rose borders and berry actions. | Warm pink, distinct from Plum's purple undertone. |
| Lavender | Pale lilac pages, near-white violet forms, lavender borders and violet actions. | Cooler and lighter than Plum. |
| Meadow Green and Tan | Parchment and tan surfaces with olive-green actions and natural green accents. | Warm and earthy, compared with Sage's leafy greens and Forest's cooler evergreen. |
| Slate | Cool gray pages, near-white gray forms, blue-gray borders and charcoal-slate actions. | Restrained and neutral. |
| Plum | Muted mauve pages, near-white plum forms, dusty purple borders and deep plum actions. | Richer and warmer than Lavender. |
| Amber | Golden parchment pages, warm ivory forms, honey borders and dark ochre actions. | Golden rather than Espresso's coffee brown. |
| Espresso | Warm stone and parchment pages, ivory forms, coffee text and deep brown actions. | An understated old-library feel, with stronger earth tones. |
| Forest | Cool green-gray pages, off-white forms, charcoal-green text and deep evergreen actions. | Darker, cooler, and crisper than Sage or Meadow. |

## What changes together

Each named palette defines page, card, dialog/menu, alternate/selected surface, primary action, hover, active/selected tint, body text, secondary text, border/divider, progress track, shelf wall/backing, picture placeholder, and default dashboard scene colors. Existing shared CSS variables carry the colors through every page, form, menu, tab, progress display, and focus outline.

Use the same family throughout forms: Log Reading, Add a Book, book editing, goals, challenges, and other dialogs inherit shared surface, text, border, and action variables. Input placeholders use the palette's secondary text instead of the browser's fixed gray. The dashboard's built-in gradient follows the palette. A member's own dashboard photo remains their photo.

Keep book covers and book-spine identities, member avatar colors, the blue ChatGPT tag, warning/error/destructive colors, and achievement artwork independent. Keep the shelves' wood structure and gold bookend artwork; tint the backing to coordinate. Do not recolor these solely to make more things change.

## Light, Dark, and System

Appearance (System / Light / Dark) remains independent from Color Palette. Every new palette has a coordinated dark version: dark surfaces in its own color family, readable light text, and lighter action colors with dark button labels. It is not one navy theme with different buttons.

System follows the operating system immediately, including changes while the page is open. Explicit Light or Dark overrides the operating system. Saving and reloading preserves both choices.

Sage dark is leafy charcoal; Ocean is deep blue; Rose is dark berry; Lavender is violet charcoal; Meadow is olive charcoal; Slate is charcoal blue-gray; Plum is deep aubergine; Amber is dark warm brown; Espresso is coffee charcoal; Forest is deep evergreen. The first three dark directions were previewed; the remaining dark versions complete those same design rules and are implementation choices rather than separate user-reviewed mockups.

## Compatibility and implementation

- Keep the existing `S.settings.palette` and `S.settings.theme` preferences and the existing native Color Palette select. No new dependencies, services, build pipeline, or settings screen.
- Keep the legacy stored key `sage` for **Default**. Missing preferences still select Default; existing `sage` preferences retain their original appearance. Do not silently migrate those users to the new green Sage.
- Store the new **Sage** as `sage-green`. Retain the other existing palette keys. Add `espresso` and `forest`. There are 11 selections total.
- The existing `applyPrefs()` removes `data-palette` for legacy `sage`, so Default continues to use the original root styles. Named palette CSS overrides complete groups of variables.
- `--hero-scene` lives on the root alongside palette variables. The hero consumes it through `--scene`; a member photo still takes precedence through `--user-hero`.
- Support explicit dark selectors and the system-dark media query equally. Default's original dark values remain in the base theme.
- No reading data, privacy settings, forms, navigation, book discovery behavior, or layout changes belong in this package. The previous phone-card experiment was reverted. Challenge starters remain in Later. The sharing-choice proposal is a separate package.

## Acceptance checks

- Select every palette through the real control and reload: preserve the selected option and appearance mode.
- Check body and secondary text and primary button labels for at least 4.5:1 contrast against their actual backgrounds. Check focus indicators, placeholders, selected states, and form validation visually as well.
- Inspect Dashboard, Library/Discover, Log Reading, and Add a Book in light and dark modes; use the shared tokens throughout the other forms.
- Switch the operating-system scheme with System selected. Explicit Light/Dark must continue to override it.
- Inspect phone widths of 320 and 390 px and desktop. Keep all controls usable and avoid horizontal page overflow.
- Verify logging and reloading a reading session still work. Keep storage namespaces and the ChatGPT tag/title intact in this sandbox.
- Screenshots use sample books and block external font/book requests for repeatability; book covers may be generated placeholders. They do not establish live external-service behavior or a complete accessibility audit.

## Review images

Representative screenshots of the actual implementation are in [appearance-screenshots](appearance-screenshots/), including desktop, phone, light/dark forms for new Sage, Espresso, and Forest. These are review assets, not app dependencies. The app still runs directly from `index.html`.


## Exact color reference

The CSS in `index.html` is authoritative. These values record the implemented page, form, text, border, and action choices for handoff.

| Palette | Mode | Page | Form | Text | Secondary text | Border | Primary action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sage | light | #EEF3E9 | #FAFCF6 | #243526 | #536650 | #BBCDB2 | #365F40 |
| Sage | dark | #141D17 | #202D23 | #EDF4E9 | #B4C5AE | #455D47 | #A1CE9E |
| Ocean Blue | light | #EAF1F8 | #F7FAFE | #20364D | #4F6780 | #B4CADD | #245D92 |
| Ocean Blue | dark | #111C28 | #1C2D3F | #EAF3FB | #ADC4D8 | #3E5C76 | #94C9F4 |
| Rose | light | #F8ECEF | #FFF8FA | #442A35 | #795764 | #DBB8C5 | #A2395B |
| Rose | dark | #24171E | #35242D | #FAEDF2 | #D5B7C5 | #715064 | #F0ABC5 |
| Lavender | light | #F0EDF8 | #FCFAFF | #342B48 | #685B7D | #C9BCDD | #6E52B5 |
| Lavender | dark | #1C1828 | #2B253C | #F3EDFC | #C5B9D9 | #625173 | #BFA9F4 |
| Meadow Green and Tan | light | #F4EFDF | #FCF9ED | #343C24 | #626B4D | #CBC6A2 | #56792B |
| Meadow Green and Tan | dark | #202318 | #303625 | #F1F3E5 | #C4CAAF | #66714B | #BDCF8E |
| Slate | light | #EAEDEF | #F8FAFB | #293541 | #586977 | #B9C6D0 | #465668 |
| Slate | dark | #171D23 | #252E37 | #EFF3F7 | #BCC8D3 | #586C7D | #B0C2D4 |
| Plum | light | #F2EAF2 | #FDF8FD | #402B40 | #745971 | #CFB7CD | #7A3B6E |
| Plum | dark | #241925 | #362739 | #F8EEF8 | #D2BBD0 | #755577 | #DDB1D8 |
| Amber | light | #F8EFDE | #FFFAEF | #45351F | #786244 | #DCC59C | #93580B |
| Amber | dark | #261E14 | #382D20 | #FBF1E0 | #D6C2A2 | #796344 | #E8C17F |
| Espresso | light | #EEE8DF | #FBF7F0 | #352A24 | #6C5C50 | #C8B7A3 | #594032 |
| Espresso | dark | #211C18 | #322A24 | #F7EEE5 | #CCBBAA | #74604F | #D7B799 |
| Forest | light | #E8EEEB | #F5F9F6 | #22352D | #50685B | #AEC4B6 | #174E3B |
| Forest | dark | #111F19 | #1C3026 | #E8F4EC | #ABC8B7 | #486B57 | #8DC9AA |

## Validation of this implementation

- Passed all 20 named-palette/light-dark combinations: real select interaction, saved preference after reload, body and secondary text and primary button label contrast at 4.5:1 or better, dialog rendering without browser script errors, and live System switching between light/dark.
- Verified Default still uses the legacy `sage` key and that the control contains 11 options; ChatGPT identity remains present.
- Passed the existing local smoke workflow at 320, 390, and 1280 px: HTTP startup, rendering, saving a reading session, and preserving it across reload.
- Checked palette layouts at 320 and 390 px against baseline. A pre-existing header issue makes the page about 339 px wide at a 320 px viewport, clipping part of the account control. Confirmed against the original commit; not introduced or fixed by this appearance package. Do not describe narrow-phone layout as overflow-free.
- No build step exists or was added. Live external book and font requests were blocked during these deterministic browser checks. This is not a complete accessibility audit.

Representative actual screenshots:

| Palette | Desktop light | Form light | Desktop dark | Form dark | Phone 320 | Phone 390 |
| --- | --- | --- | --- | --- | --- | --- |
| Sage | [View](appearance-screenshots/sage-green-light-desktop.png) | [View](appearance-screenshots/sage-green-light-form.png) | [View](appearance-screenshots/sage-green-dark-desktop.png) | [View](appearance-screenshots/sage-green-dark-form.png) | [View](appearance-screenshots/sage-green-320.png) | [View](appearance-screenshots/sage-green-390.png) |
| Espresso | [View](appearance-screenshots/espresso-light-desktop.png) | [View](appearance-screenshots/espresso-light-form.png) | [View](appearance-screenshots/espresso-dark-desktop.png) | [View](appearance-screenshots/espresso-dark-form.png) | [View](appearance-screenshots/espresso-320.png) | [View](appearance-screenshots/espresso-390.png) |
| Forest | [View](appearance-screenshots/forest-light-desktop.png) | [View](appearance-screenshots/forest-light-form.png) | [View](appearance-screenshots/forest-dark-desktop.png) | [View](appearance-screenshots/forest-dark-form.png) | [View](appearance-screenshots/forest-320.png) | [View](appearance-screenshots/forest-390.png) |
