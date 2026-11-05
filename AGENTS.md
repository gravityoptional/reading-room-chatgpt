# Working in this repository

This is **ChatGPT's copy** of the Reading Room "next" prototype, made Nov 3, 2026. It's a sandbox for James
(the owner) to try ideas with ChatGPT. *Reading Room* is a placeholder name.

- It started as an exact copy of the `next` branch of `gravityoptional/reading-room`, except for its storage
  names and the blue **ChatGPT** tag beside the site name.
- Nothing here flows back to `gravityoptional/reading-room` automatically. If James likes something, he brings
  it over himself. Don't try to push, merge, or open pull requests anywhere else.
- Published with GitHub Pages at https://gravityoptional.github.io/reading-room-chatgpt/ from the `main` branch.

## Rules

1. **Keep the storage names.** Every repository on `gravityoptional.github.io` shares one browser origin, so this
   copy can read and overwrite the testers' data in the other prototypes. Only ever use the `rr-chatgpt-*` /
   `rr_chatgpt_*` names already in `index.html` (`KEY`, `HERO_KEY`, `DISC_KEY`, `DRAFT_KEY`). Never use
   `rr-editorial-proto-v1`, `rr_editorial_hero_v1`, `rr_drafts_v1`, `rr-disc-v1`, or any `rr-next` / `rr_next`
   name. Any new storage must also start with `rr-chatgpt-`.
2. **Keep the ChatGPT tag** in the top bar and "Reading Room ChatGPT" in the tab title, so James can always tell
   the copies apart.
3. **Work on a branch and open a pull request** into `main` for each change, with phone and desktop screenshots.
   James approves before anything is merged, because merging publishes the site.
4. **No paid services, no build step, no new dependencies.** The app is one file, `index.html` (vanilla JS,
   HTML, and CSS). Fonts come from Google Fonts. Open Library is the only outside data source; keep requests to
   about one per second.
5. **Ask James** about anything he would have to agree to: new features, removed features, wording he hasn't
   seen, or anything that costs money.

## Sync default

James prefers converged test beds after a sync. Keep application behavior, forms, and styling aligned with Claude’s approved version unless there is a concrete reason to differ. Preserve this copy’s ChatGPT identity, existing storage keys, and isolated startup behavior. Document necessary shared corrections for return to Claude rather than leaving unexplained permanent differences.

## Product principles (from the requirements doc)

- *Reading makes you want to read.* A reading tracker that rewards reading, not list-making.
- Every screen removes friction rather than adding it; options stay visible instead of hidden behind menus.
- Mobile-first. Test at 320 px and 390 px wide, and on desktop.
- Personal by default, shared by choice. Estimates are always labeled. Encourage, don't rank; never show
  deficit messages ("3 books behind").
- Capitalization: title case for short labels (headings, tabs, buttons), sentence case for anything that reads as
  a sentence. Book titles stay as published.

## How `index.html` works

- **State:** one global object `S`, saved to browser storage by `save()`; `prepState()` fills in missing data
  on load (and after Prototype Tools reset the sample data).
- **Rendering:** `render()` redraws the current page from template strings; `renderBD()` redraws the book
  details window. Always escape user text with `esc()`.
- **Actions:** clicks are handled in one delegated listener with a big `switch` on `data-act`; navigation uses
  `data-go`. The address keeps the current page and tab (hash routing: `ROUTES`, `readRoute()`, `syncRoute()`).
- **Feedback:** `toast(message, undoFn)` shows a message with Undo; `snapshot()` / `restoreTo()` support it.
- **Drafts:** Log Reading, calendar notes, and Edit Session keep unsaved typing (`draftAttach` and friends).
- **Tour:** stops point at `data-tour` markers, never at button text. Keep markers when changing layouts.
- **Open Library:** `olSearch`, the background `coverFill()` lookup, and the Discover rules (More by This
  Author, free-to-read and borrow availability).
- **Prototype Tools** in the account menu add sample members' activity and borrow requests, since there are no
  real accounts yet.
- `LATER.md` lists known issues carried over from the next prototype. `tools/tapcount.js` counts taps for core
  tasks (`node tools/tapcount.js old.html index.html`).
