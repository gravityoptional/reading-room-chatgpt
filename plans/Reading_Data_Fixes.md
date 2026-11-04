# Reading data protections — approved audit fixes 1–3

## Implemented

1. `save()` returns success/failure. A failed main-state write shows a persistent, accessible warning with Try Saving Again. Changes remain in memory, success toasts are suppressed, retry persists the existing state without replaying the action, and leaving the page prompts while changes remain unsaved. The warning follows the active dialog and survives redraws. This handles browser storage failure now; a later remote persistence implementation must provide equivalent confirmed-save behavior.
2. A reading with sessions keeps its recorded format. Its editor disables the format choice and the submit handler also rejects a unit-changing request. Readings without sessions remain editable. The reading editor is titled Edit Reading to distinguish it from the catalog editor.
3. `progressBase` preserves entered progress separately from sessions. Existing records infer a baseline from their earliest available range before editing/deleting sessions. New entered positions are retained directly. Current position follows the latest relevant dated session; backdated entries cannot replace newer progress. Explicit position corrections establish a new baseline, retaining the list of prior sessions so editing them does not undo that correction. No synthetic sessions are created.

Previously lost data cannot be recreated from an absent record. These changes protect subsequent edits and preserve existing data where a baseline can be inferred.

## Verification

Browser checks cover failed writes, suppressed success feedback, retries and reload persistence, session-save retries without duplicates, UI and submit protection for session units, legacy and new baselines, backdated entries, manual corrections, and phone/desktop layouts at 320/390/1280. Existing edition, draft, reread, session logging, and persistence checks also passed.

## Remaining priorities — proposals, not implemented

1. Protect outstanding loans when removing a copy (audit 8).
2. Add a discoverable Edit Copy action for owned copies: copy format, edition, and sharing. A clickable Owned by You label may be a secondary shortcut, not the only indication. Edit Book can link to Your Copies without mixing shared catalog changes with copy-specific changes.
3. Reject empty sessions that currently earn reading days/streaks (audit 5).
4. Honor a selected queued book when there are no active readings (audit 4).
5. Correct date editing: allow clearing Started On, reject future dates, and provide an explicit way to correct a finished reading’s finish date (audit 6 plus editor coverage review).
6. Keep title/author corrections consistent across read-throughs and the shared catalog (audit 7).

Edit Book is for shared catalog information. Edit Reading is for a personal reading’s status, edition, progress, and dates. Edit Copy should own changes to a particular owned copy, preserving earlier reading edition snapshots. Structured edition selection remains outside this patch.
