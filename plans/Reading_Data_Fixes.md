# Reading data protections — approved audit fixes 1–3

## Implemented

1. `save()` returns success/failure. A failed main-state write shows a persistent, accessible warning with Try Saving Again. Changes remain in memory, success toasts are suppressed, retry persists the existing state without replaying the action, and leaving the page prompts while changes remain unsaved. The warning follows the active dialog and survives redraws. This handles browser storage failure now; a later remote persistence implementation must provide equivalent confirmed-save behavior.
2. A reading with sessions keeps its recorded format. Its editor disables the format choice and the submit handler also rejects a unit-changing request. Readings without sessions remain editable. The reading editor is titled Edit Reading to distinguish it from the catalog editor.
3. `progressBase` preserves entered progress separately from sessions. Existing records infer a baseline from their earliest available range before editing/deleting sessions. New entered positions are retained directly. Current position follows the latest relevant dated session; backdated entries cannot replace newer progress. Explicit position corrections establish a new baseline, retaining the list of prior sessions so editing them does not undo that correction. No synthetic sessions are created.

Previously lost data cannot be recreated from an absent record. These changes protect subsequent edits and preserve existing data where a baseline can be inferred.

## Verification

Browser checks cover failed writes, suppressed success feedback, retries and reload persistence, session-save retries without duplicates, UI and submit protection for session units, legacy and new baselines, backdated entries, manual corrections, and phone/desktop layouts at 320/390/1280. Existing edition, draft, reread, session logging, and persistence checks also passed.

## Follow-up fixes — completed after James’s approval

1. Copies with loans, holds, or pending requests cannot be removed. Their format also remains protected until those commitments are resolved.
2. The shared Edit My Copy form is available through a quiet Edit link beside Owned by You, the Your Copies section of Edit Book, and the selected copy in Start Reading, Add a Book, Log Reading, or Edit Reading. It edits copy format, optional edition, and sharing. It preserves unsaved parent fields and saved reading-edition snapshots. Selecting a copy for a new reading supplies its edition; editing that copy during setup refreshes that pending value when it has not been independently changed.
3. Empty sessions are rejected in logging and session editing. Status-only starts/finishes remain possible without creating a fake session; genuine minutes-only or listening progress remains valid.
4. Start Reading honors an explicitly selected queued/To Read book even when there are no active books.
5. Started On can be cleared; future/invalid dates and finish-before-start dates are rejected. Finished On is editable for finished readings and can be cleared to Finished, date unknown. Changing those dates does not rewrite session dates.
6. Shared title/author corrections from either editor update the catalog, all read-throughs, and matching activity references consistently. Both editors reject collisions with another book’s title and author. Reading editions and individual progress/history stay independent.

## Editing scope and future persistence

Edit Book handles shared catalog information. Edit Reading handles a personal read-through’s status, edition, progress, and dates. Edit My Copy handles a particular owned copy. Copy edits never rewrite previously saved reading-edition labels.

The confirmed-save, persistent-warning, and retry behavior is also required when storage moves to a server. Its persistence implementation must then await a confirmed server write and handle network/server failures; the current synchronous browser-storage implementation is not a complete future server adapter.

Structured edition selection and the rest of the deferred roadmap remain outside this patch.
