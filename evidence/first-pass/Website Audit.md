# Reading Room: audit of existing features

Date: November 4, 2026. Source: current published Reading Room ChatGPT code, commit `c54e60528c1c75435076caf099277fe4b1dc15aa` (published by merge `2821e037624819f1ef6080713402c7aa55135328`).

This is a findings report, not a patch. No application code, user data, or live deployment was changed during the audit. All behavioral tests used isolated local browser contexts and synthetic records.

## Scope and method

Reviewed current book/copy entry, reading status and format, sessions and their editing/deletion, dates, editions, history, queue selection, local persistence, loans, challenge operations, and rendered navigation. Requirements and Later notes were used only to exclude planned work; missing roadmap features and known deferred design work are not findings here.

- 24 targeted browser scenarios, with actual UI actions for the key reproductions and controlled fixtures for the starting data.
- 54 page/tab/appearance/viewport combinations: Dashboard; Library group, My Books, and Discover; Challenges personal, group, battles, and trophies; History. Widths 320, 390, and 1280; light and dark.
- Browser exception collection, persisted-state inspection, and source tracing.
- External book-source requests were mocked or blocked. Live source matching, real multi-user accounts, and device-specific browser behavior were not verified.

## Confirmed findings

### 1. A failed browser save is reported as successful — High

Reproduction: open Edit Reading, change a title, and save while the browser refuses writes to the app’s local storage (tested with a controlled QuotaExceededError). The dialog closes and says “Saved changes to Unsaved Correction.” The in-memory title changes, but the stored title remains “Example Book.” A refresh loses the apparent correction.

Impact: this affects the common save path for reading, notes, settings, and other state, not just titles. Browser storage limits are relevant while the prototype stores uploaded covers locally.

Suggested fix: make save return a success/failure result, surface a persistent warning on failure, and do not claim durable success. This is an error-handling fix for existing persistence, not a proposal for a new backup or hosting feature.

Source: [index.html:1456](/workspace/reading-room-chatgpt/index.html:1456).

### 2. Changing reading format can corrupt the interpretation of old sessions — High

Reproduction: a print reading has a session for pages 0–80, 40 minutes. Edit Reading → change Format to Audiobook, set length 5:00 and current position 1:20, and save. The old session still has 80 stored pages, but Edit Session now presents its range as 0:00–1:20. Change only the session note and save: its credited pages fall from 80 to 0.

Impact: a metadata edit can silently change old page totals and the units of historical positions.

Suggested fix: protect historical session units. Require a deliberate correction flow or a separate reading when format changes after sessions exist; do not reinterpret numeric positions without review.

Source: [index.html:4408](/workspace/reading-room-chatgpt/index.html:4408).

### 3. Current progress can be lost when sessions are deleted or backdated — High

Two confirmed cases:

- Add a reading already at page 80, log pages 80–90, then delete that session. Current Page becomes 0 instead of returning to 80.
- With a current, dated session ending at page 100, add an older session for pages 20–30 three days earlier. The older entry saves successfully and Current Page becomes 30 even though the latest dated session still ends at 100.

Suggested fix: preserve entered starting progress separately from sessions, and use the latest relevant dated session when recalculating position. Do not create invented sessions to preserve the baseline.

Source: [index.html:3495](/workspace/reading-room-chatgpt/index.html:3495). Also see the log-save position assignment at [index.html:4312](/workspace/reading-room-chatgpt/index.html:4312).

### 4. Start Reading loses the selected queued book when nothing else is active — Medium

Reproduction: have a To Read book in Reading Queue, with no Currently Reading or Paused books. Click that book’s Start Reading button. Instead of opening Start Reading for that book, the app opens the generic Start a New Book search. The selected reading ID is ignored by the early empty-active-list return.

Control: when another book is active, opening a specific To Read book from details does open its Start Reading form correctly.

Suggested fix: honor an explicit reading ID before deciding to show the generic search.

Source: [index.html:4056](/workspace/reading-room-chatgpt/index.html:4056).

### 5. A session with no reading can earn a streak and challenge day — Medium

Reproduction: edit a session so Start Page and End Page are both 80, and clear Minutes. Save succeeds with pages=0 and minutes=null. That date is still marked active. In an isolated test with only that session, the streak is 1 and a Reading Days challenge receives 1 day.

Suggested fix: reject a session with zero pages, zero actual minutes, and no positive listening progress. Keep valid minutes-only and genuine listening entries working.

Source: [index.html:3506](/workspace/reading-room-chatgpt/index.html:3506).

### 6. Started On cannot be cleared and accepts future dates — Medium

Reproduction A: clear an existing Started On date in Edit Reading and save. The old date silently returns because blank falls back to the old value.

Reproduction B: enter 2099-01-01 in Started On and save. The date is stored and the dialog closes despite the date input’s max attribute.

Suggested fix: treat blank as an intentional clear and validate dates in the submit handler. Apply the same explicit date rules used in the newer Add a Book flow.

Source: [index.html:4408](/workspace/reading-room-chatgpt/index.html:4408).

### 7. Renaming through Edit Reading leaves other read-throughs inconsistent — Medium

Reproduction: create two readings of the same title. In one reading’s editor, correct the title from Example Book to Corrected Book. The catalog and that reading change, but the other reading still stores Example Book. History can consequently refer to the same underlying book using different names. The reading editor has an equivalent inconsistency for author corrections.

Suggested fix: use the existing shared catalog update behavior consistently for title/author corrections, or route those fields through Edit Book. Keep reading-specific edition labels and dates separate.

Source: [index.html:4410](/workspace/reading-room-chatgpt/index.html:4410).

### 8. Removing a loaned copy leaves an unresolved loan without a copy — Medium

Reproduction: a physical owned copy is on loan to Demo Borrower with a loaned request. In Copies, click Remove. The copy immediately disappears, while its loan request remains status=loaned and references a copy that no longer exists. There is no remaining copy row on which to mark it returned. Undo is available, but there is no warning before removal.

Control: Mark Returned correctly clears the borrower and changes the request to returned when the copy still exists.

Suggested fix: block removal until the loan is resolved, or explicitly warn and handle the outstanding loan in the same action.

Source: [index.html:4684](/workspace/reading-room-chatgpt/index.html:4684).

## Checks that behaved correctly

- Challenge create, duplicate, delete, and Undo preserved the expected records.
- Group challenge join, leave, and Undo restored membership correctly.
- Normal loan return cleared the borrower and resolved the loan request.
- Editing a session to 1,500 minutes was rejected by the daily 24-hour limit.
- A challenge with Count Prior did not count a finish after its end date.
- The 54 rendered page/tab/appearance checks produced no browser exceptions. At 320 px the existing site-wide document width was 339 px; this was recorded in the raw output rather than promoted into a new finding without separately investigating its cause and overlap with known layout decisions.

## Observations deliberately not classified as bugs

Overlapping page ranges may represent deliberately rereading passages; an overlap alone does not prove an error. Logging reading on a paused book resumes it, which is reasonable. A finished status remaining Finished after a session correction does not by itself prove that the status is wrong. A long timer has existing validation and catch-up controls; lack of automatic date spreading is not reported as a missing feature.

## Suggested priority

Address 1–3 first because they risk loss or reinterpretation of reading data. Then 4–6 for everyday correctness, followed by 7–8 for catalog and loan consistency. This report does not authorize or publish fixes.

## Evidence

- [Primary scenario results](results.json)
- [Additional scenario results](additional-results.json)
- Reproduction harnesses in `/workspace/setup/audit-current-site.cjs` and `/workspace/setup/audit-current-site-extra.cjs`.
