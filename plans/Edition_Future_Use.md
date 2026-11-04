# Sync handoff for Claude: edition support

James approved keeping the optional Edition field on November 4, 2026, so readers can record the information now. Include this note in the next sync package and add the future-use item below to the **Later** section of **Reading Room — Requirements.md**. Future structured edition support is not part of this release.

## Current behavior

- Each owned copy can have an optional free-text `edition` label, such as Illustrated, Revised, or 25th Anniversary.
- Both Add a Book (search or Add It Yourself) and Book → Copies collect it, and the copy list displays it.
- It is separate from reading format and copy format. Two copies of the same format are legitimate: the warning offers View Existing Copies or Add Another Copy.
- Edition text currently does not select a cover or change page counts, ISBN, language, publisher, or reading history.
- Legacy copy `where` values remain intact; the new forms collect Edition instead of Location.

## Add to Requirements → Later

**Structured editions and copy matching.** Extend the optional copy edition label into a selectable edition record connected to ISBN/source edition ID, language, publisher, publication date, appropriate cover, and edition-specific page count or audio length. Prefer an exact ISBN/edition match when available. Keep the underlying book/work separate from its editions and individual owned copies. Different family members may own different editions of the same book.

Preserve all edition text collected now, including through backup, restore, and future imports. Offer suggested matches for existing labels and let readers review them; never silently replace a label, cover, or reading history based on a guess. Readers should not have to re-enter their labels when structured editions arrive. Edition-aware matching should also help review possible duplicate book records while allowing legitimate extra copies. Keep cover selection in Edit Book unless James requests a different location.
