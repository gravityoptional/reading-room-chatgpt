# Website Audit — Second Pass

November 4, 2026. **Review only: no application code or live-site changes made.**

## Version and scope

The audit target was the latest merged code: `d3088097d4637e57c5282c985d0c535348bb3bd6` (published main merge `66d159e2a80b39080afbf66d204e4bfcb3771012`). At the beginning and end of the review, GitHub’s publishing retry was still queued and the live HTML matched the older `90ace9560a3f8a31a76319e241d9db157b2a0b40` release. The new copy editor therefore was not yet visible on the live site. Findings are against the merged code, so already-fixed issues were not counted simply because publishing is behind. Many older handlers responsible for these findings also exist in the live release, as noted below.

Only existing features and gaps within their current flows were reviewed. Deferred roadmap items, planned service migrations, and closed design explorations were excluded.

## Immediate testing precautions

- Avoid the permanent Undo next to **Marked as read, date unknown** on saved reading history.
- Use one editing tab until stale-tab saves are protected.
- Do not replace an existing timer by starting another book’s timer without first resolving the old one.

These precautions follow confirmed reproductions below; destructive tests used only isolated synthetic data.

## Findings at a glance

| # | Priority | Finding |
| --- | --- | --- |
| 1 | High | Undated-reading Undo can delete real reading history |
| 2 | High | A second tab can overwrite a confirmed save |
| 3 | High | Start a New Book can erase an automatically saved reading draft |
| 4 | High | Timer changes can lose elapsed time or reopen a finished book |
| 5 | Medium | Esc can hide the failed-save warning while changes remain unsaved |
| 6 | Medium | Inline Add Date has both a broken save path and inconsistent validation |
| 7 | Medium | Move To discards other unsaved edits and commits before Save Changes |
| 8 | Medium | Already Read It still invents Print format and 300 pages |
| 9 | Medium | Correcting page count can make a Finished book show 67% complete |
| 10 | Medium | An audiobook copy can be saved as a print reading |
| 11 | Medium | My Books format filters hide unowned readings |
| 12 | Medium | A genre-restricted challenge can save without a genre |
| 13 | Medium | Renaming a book can rename another author’s activity |
| 14 | Medium | An unchanged cover failing to load blocks unrelated metadata edits |
| 15 | Medium | The header overflows on narrow phones and tablets |
| 16 | Medium | The account menu exceeds screen bounds and cannot scroll internally |
| 17 | Low | Paired inputs have visibly different heights and baselines |
| 18 | Medium | Unread counts fail text contrast even in high-contrast palettes |

## 1. Undated-reading Undo can delete real reading history

**Priority: High.**

Open a finished reading that has sessions, clear Finished On in Edit Reading, save, then open its details. Click Undo beside “Marked as read, date unknown.” The reading is deleted while its sessions remain, orphaned. With two undated read-throughs of the same title, one click removes both. The permanent filter is based on a generic date-unknown flag, not the particular action being undone.

**Evidence:** a single real reading was removed with one associated session still present. In the multiple-reading case the count fell from two to zero. This is not the normal toast Undo.

**Fix direction:** scope quick-action Undo to the specific record just created. Never treat “finish date unknown” as permission to delete saved read-throughs, ratings, editions, or sessions. The same broad deletion handler exists in the currently live source. The new finish-date editor makes the session-orphaning path especially easy to reach.

Source: [index.html:4676](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L4676).

[Evidence screenshot](unknown-date-undo.png)

## 2. A second tab can overwrite a confirmed save

**Priority: High.**

Open the app in two tabs of the same browser. Save a new session in the first. Correct a title in the second tab without reloading it. Both actions appear successful, but the second tab writes its older full state over the first tab’s save.

**Evidence:** stored sessions went from one to two after the first save, then back to one after the second; the new saved session note disappeared. This was tested in two pages sharing one isolated browser context, not two different devices.

**Fix direction:** detect stale state before writing and preserve unsaved work while resolving it. Do not blindly replace the whole saved collection from an older tab. This is a current browser-storage correctness issue, separate from the deferred server/account work.

Source: [index.html:1466](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L1466).

## 3. Start a New Book can erase an automatically saved reading draft

**Priority: High.**

In Log Reading, type a note and wait until the draft has saved. In the book selector choose Start a New Book, then close that search window and reopen the original reading. The note is blank.

**Evidence:** a second test waited for the genuine timed autosave to contain the note before switching. The old draft was subsequently overwritten with an empty field object. The search form reuses the old reading draft identity after replacing its fields.

**Fix direction:** save the old entry before switching modes, then detach its draft identity while showing search/manual selection. Search fields must not overwrite a reading-entry draft.

Source: [index.html:4304](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L4304).

## 4. Timer changes can lose elapsed time or reopen a finished book

**Priority: High.**

Two confirmed flows:

- Run an 11-minute timer for Book A. Select Book B in Currently Reading and click its Start Timer button. Book A’s timer is replaced by a near-zero timer for B without logging, confirmation, or Undo.
- Mark a book Finished while its timer is running. The timer continues. Stop and Log then opens with Currently Reading selected; saving the time changes the book back to Currently Reading while retaining its finish date.

**Fix direction:** protect an existing running/stopped timer before replacing it. Coordinate finishing with reviewing/logging the timer, and preserve an explicitly finished status when logging remaining time.

Source: [index.html:1665](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L1665).

Also see [index.html:4821](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L4821).

## 5. Esc can hide the failed-save warning while changes remain unsaved

**Priority: Medium.**

Force a failed save while editing Book Notes on the Dashboard, or in Edit My Copy. The warning appears inside the dialog. Press Esc. The dialog closes but its warning stays inside the closed dialog, so no warning is visible on the page.

**Evidence:** the save-failure flag remained true, but the visible-warning count was zero. The unload guard still exists, and another click/redraw can bring the warning back; the issue is loss of persistent visible feedback, not a false successful retry.

**Fix direction:** reattach the warning after every dialog close/cancel, including keyboard/native dismissal, rather than only click-driven actions. The Book Notes version also applies to the older live release.

Source: [index.html:1460](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L1460).

## 6. Inline Add Date has both a broken save path and inconsistent validation

**Priority: Medium.**

Two confirmed flows:

- Open an undated finished book from Library → My Books → Finished, then use Add Date in its My Reading details. Both the background shelf and the dialog render an input with the same ID. Save reads the empty background input instead of the date entered in the dialog, and silently does nothing.
- Open the same control where there is only one input. It accepts a finish date of January 1 even when Started On is October 20. The new Edit Reading form rejects this contradiction, but the shortcut bypasses that rule.

**Evidence:** two inputs existed, with values blank and 2026-10-30 respectively; the reading’s finish date remained unset after Save. A separate run saved 2026-01-01 before a 2026-10-20 start.

**Fix direction:** use unique/context-specific IDs and read the input associated with the clicked action. Reuse date validation across all finish-date entry points.

Source: [index.html:4678](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L4678).

Inline input template: [index.html:2581](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L2581).

## 7. Move To discards other unsaved edits and commits before Save Changes

**Priority: Medium.**

In Edit Reading, type an edition or title correction, then choose Paused under Move To. The editor closes immediately and commits the status; the other typed changes are discarded.

**Evidence:** status changed to Paused while the original title remained and the newly entered edition was absent.

**Fix direction:** stage the status change with the other fields and apply everything through Save Changes, or explicitly preserve/resolve pending edits before performing an immediate action. The current selected-button presentation looks like part of the form.

Source: [index.html:4525](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L4525).

## 8. Already Read It still invents Print format and 300 pages

**Priority: Medium.**

Open an unowned book with no known page count and choose Already Read It. Unlike Add a Book’s optional/unknown fields, this shortcut creates a print reading with total and position both set to 300.

**Evidence:** catalog pages were absent, but the new reading stored format=print, total=300, and pos=300.

**Fix direction:** apply the same unknown-data policy across entry points. Do not invent a reading format or page count when the reader has not supplied them.

Source: [index.html:4675](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L4675).

## 9. Correcting page count can make a Finished book show 67% complete

**Priority: Medium.**

With a book finished at 200 of 200 pages, change Number of Pages to 300 in Edit Book. All print reading totals are updated, but the finished position is left at 200.

**Evidence:** the record remained Finished, with total=300, pos=200, and a displayed completion percentage of 67%.

**Fix direction:** reconcile completion display/progress when correcting shared page count. Keep finished status and known/unknown length consistent without inventing reading sessions. This does not require building the deferred structured-edition system.

Source: [index.html:3225](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L3225).

[Evidence screenshot](finished-67-percent.png)

## 10. An audiobook copy can be saved as a print reading

**Priority: Medium.**

Start a To Read book whose owned copy is an audiobook. Select that copy under Copy for This Reading. Its edition fills in, but Reading Format remains Book or Ebook and the work’s page count remains in the length field. Continue saves a print reading linked to an audio copy.

**Evidence:** selected copy format=audio; saved reading format=print, total=150.

**Fix direction:** align or explicitly validate the selected copy against the reading format during new-reading setup. Never automatically reinterpret old sessions to resolve a mismatch.

Source: [index.html:2977](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L2977).

[Evidence screenshot](audio-copy-print-default.png)

## 11. My Books format filters hide unowned readings

**Priority: Medium.**

Have a currently-reading audiobook with no recorded owned/group copy. In My Books → Currently Reading, apply the Audiobook format filter. That reading disappears even though its reading format is audio.

**Evidence:** the unfiltered list contained Example Book; the filtered list was empty. Filtering only examines copies.

**Fix direction:** use reading format on reading shelves, or clearly distinguish copy-format filtering from reading-format filtering and handle unknown formats. This is filter consistency, not a request for the deferred format-breakdown charts.

Source: [index.html:2221](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L2221).

## 12. A genre-restricted challenge can save without a genre

**Priority: Medium.**

With no genres assigned in the catalog, create a Books challenge and select Only Books in a Genre. The genre selector has zero options, but Create Challenge succeeds. Unclassified finished books then count toward it.

**Evidence:** the saved rule was genre with an empty value, and its automatic progress was one unclassified book.

**Fix direction:** require a real genre selection or explain why this rule is unavailable. Do not silently interpret an empty genre as the set of all unclassified books.

Source: [index.html:3950](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L3950).

## 13. Renaming a book can rename another author’s activity

**Priority: Medium.**

Have two different books with the same title and different authors. Start/log reading for the second through the actual UI. Correct the first book’s title. The second book retains its correct catalog title, but its newly created session activity is renamed to the first book’s new title.

**Evidence:** the same activity ID changed from Example Book to Corrected First Book even though it had been created while logging the other author’s reading.

**Fix direction:** link activity to a stable book/title ID and update matching references only. Preserve ambiguous older text rather than guessing. The old shared-catalog editor also matched activity by title text alone.

Source: [index.html:3019](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L3019).

## 14. An unchanged cover failing to load blocks unrelated metadata edits

**Priority: Medium.**

Open Edit Book when its existing cover cannot load, then correct only the title. Saving is blocked with “The cover image didn’t load” even though the cover was not changed.

**Evidence:** coverChanged=false, dialog stayed open, and the title remained unchanged. This was a controlled image-request failure, not a claim that the particular cover URL is permanently invalid.

**Fix direction:** validate new cover replacements strictly, but allow unrelated edits to retain an unchanged existing cover while showing a separate load warning.

Source: [index.html:3217](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L3217).

## 15. The header overflows on narrow phones and tablets

**Priority: Medium.**

With DM Sans loaded, the header is wider than the viewport at both 320 px and 768 px. The account/avatar control is partly off screen, and the whole document gains horizontal overflow across Dashboard, Library, Challenges, and History.

**Evidence:** about 350 px of document width at a 320 px viewport; about 811–812 px at 768 px. The right edge of the account button exceeded the viewport. The issue persists with real DM Sans font files loaded.

**Fix direction:** adjust header sizing and navigation breakpoints so branding, group access, notifications, and account controls fit. Preserve the required ChatGPT identity marker.

Source: [index.html:820](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L820).

[Evidence screenshot](dashboard-768.png)

## 16. The account menu exceeds screen bounds and cannot scroll internally

**Priority: Medium.**

At 320 px, the account menu remains 340 px wide and starts 12 px from the left. At a 390×640 viewport it extends from y=60 to about y=862. Lower controls are off screen, and setting/scrolling the menu’s scroll position has no effect because it has visible overflow rather than an internal scroll area.

**Fix direction:** clamp menu width to the viewport and give it a viewport-based maximum height and internal scrolling. This concerns access to existing controls; it is not a proposal for more menu features.

Source: [index.html:825](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L825).

[Evidence screenshot](account-menu-390x640.png)

## 17. Paired inputs have visibly different heights and baselines

**Priority: Low.**

In Add It Yourself, the Number of Pages input is stretched by the extra helper text in the adjacent Genre field. Similar mismatches appear in Edit Book’s Pages/ISBN and Series/Book Number rows when labels wrap.

**Evidence at 390 px with DM Sans loaded:** Pages was about 64 px high versus Genre’s 44 px, and started about 39 px lower. In Edit Book, one paired input was about 44 px high while the other was 54 px high.

**Fix direction:** align label/control/helper rows explicitly, or stack affected field pairs on narrow screens. Helper text should not stretch a neighboring input.

Source: [index.html:272](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L272).

[Evidence screenshot](manual-fields-390.png)

## 18. Unread counts fail text contrast even in high-contrast palettes

**Priority: Medium.**

The unread badge uses 10 px white text on orange. Tested Default, Paper and Ink, and Blueprint in light and dark modes.

**Evidence:** contrast was approximately 2.80:1 in light mode and 2.26:1 in dark mode in all three palettes. Small bold text still requires 4.5:1; this is not large text.

**Fix direction:** choose badge text/background combinations that meet contrast in each theme, including the high-contrast palettes. Keep the unread indicator visually distinct without relying on a hard-coded white-on-orange combination.

Source: [index.html:66](https://github.com/gravityoptional/reading-room-chatgpt/blob/d3088097d4637e57c5282c985d0c535348bb3bd6/index.html#L66).

[Evidence screenshot](unread-count-contrast.png)

## Coverage and evidence

- **180 main-page combinations:** 108 checks with small/empty synthetic collections across six widths (320, 360, 390, 768, 1024, 1440), two themes, and nine pages/tabs; plus 72 checks with populated, anonymized sample layouts across four widths and two themes.
- **Dialogs and long content:** manual/catalog fields, long book and edition labels, reading dialogs, populated challenge/battle details, award forms, and account-menu bounds.
- **Behavior:** targeted UI reproductions, actual timed draft autosave, two tabs sharing one browser context, controlled save failures, controlled image-load failure, and source tracing. Raw files retain an initial Finish probe that targeted a hidden duplicate button; the corrected visible-button reproduction in `more.json` is the evidence used here.
- **Typography and contrast:** DM Sans downloaded through the permitted font service and loaded locally for the layout measurements; badge contrast calculated from computed browser colors in six palette/theme combinations.
- No JavaScript page exceptions occurred in the page/layout scans. Absence of render exceptions does not prove that all workflows are correct.
- Existing copy-edition snapshot behavior passed: changing a copy’s edition left the saved reading edition unchanged. Calendar-note drafts restored normally, helping isolate the reading-draft failure to the new-book transition. Long book/edition text fit the tested book and logging dialogs. Populated challenge, battle, and award dialogs fit 320/390/1280 widths.

### Raw evidence

- [Behavior probes](behavior.json)
- [Additional workflows](more.json)
- [Concurrency, challenges, and warning dismissal](boundaries.json)
- [Critical reproductions using genuine autosave and a single saved reading](critical-confirmation.json)
- [Layout metrics](layout.json)
- [Populated page/dialog metrics](rich.json)
- [Computed badge contrast](contrast.json)

Harnesses are in `/workspace/setup/audit2-*.cjs`. Browser data was isolated from the user’s real browser. Search results were mocked; other book-source requests were blocked, apart from fonts downloaded separately. The unchanged-cover test deliberately blocked its image. This was a Chromium audit, not full Safari/Firefox or screen-reader certification.

## Items deliberately not promoted to confirmed bugs

- Multiple active read-throughs of the same title need an explicit product rule before calling their coexistence incorrect.
- A trophy’s earned date differing from a corrected finish date could be intentional; it was recorded as an observation rather than counted as a defect.
- Logging another book while a timer runs did not overwrite that timer; explicitly starting a second timer did.
- A completed book remaining Finished after an individual historical session is corrected does not, by itself, prove that the book’s status should change.
- Known deferred layout/design decisions were not reopened.

## Suggested repair order

**First: 1–4**, because they can remove or misrepresent reading data or elapsed time. Then **5–7** for trustworthy saving and editing, followed by **8–14** for metadata, rules, and filtering consistency. **15–18** are the concrete layout/accessibility pass; header/menu access deserve attention ahead of cosmetic field alignment.

No fixes were applied by this audit.
