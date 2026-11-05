# Website Audit — Second Pass: repair status

The original audit numbers and findings remain unchanged. This change addresses **1–14**; later audit numbers retain their original references.

| Original # | Repair |
| --- | --- |
| 1 | Permanent Undo is available only for the exact untouched record created by Already Read It in this page. Readings with sessions or subsequent edits cannot be removed through it. Previously saved undated readings have no destructive shortcut. |
| 2 | Saves reconcile independent collection changes against the last saved baseline. Competing edits to the same record, deletion versus editing, and incompatible changes block the write. The other tab’s saved data remains intact; the local unsaved state can be downloaded before loading the latest data. |
| 3 | Log Reading saves and detaches its draft identity before search, manual entry, or reading-format setup replaces the form. Pending autosave cannot overwrite that draft with search fields. |
| 4 | Starting another timer opens the existing timer for resolution instead of replacing it. Finishing stops the matching running timer. Logging its remaining time preserves Finished and its date without awarding completion twice. |
| 5 | Native dialog close, including Esc, moves the unsaved warning to the remaining open dialog or page. |
| 6 | Inline finish-date Save reads its own input and uses the shared date and start/finish ordering validation. |
| 7 | Edit Reading stages Move To with metadata; Save Changes applies everything, and Cancel applies nothing. |
| 8 | Already Read It stores unknown reading format and length instead of inventing print and 300 pages. |
| 9 | Correcting shared page count updates finished reading position to the corrected total without changing sessions. |
| 10 | Copy selection aligns setup format, clears incompatible length units, and rejects mismatched copies in setup, Add Book, and Edit Reading. |
| 11 | My Books format filtering includes personal readings as well as copies; group-library filtering remains copy-based. |
| 12 | Empty genre-restricted rules cannot save; malformed older rules count no books. |
| 13 | New book activity stores stable title IDs. Renaming updates matching IDs only; ambiguous legacy text stays unchanged. |
| 14 | An unchanged failed cover is retained during metadata saves; new failed replacements are still rejected. |

15 remains in mockup review. 16 is deferred to Later. James reports 17 working (PR #19 remains separate). 18 is recorded in SYNC-Audit-Follow-ups.md for Claude to review; no color change is approved.

Validated with isolated Chromium regression tests, genuine draft autosave, and two pages sharing browser storage. Items 5–11 also have targeted regressions for keyboard dismissal, duplicate date controls, staged edits/cancel, unknown metadata, corrected completion, copy-format mismatches, and unowned readings. The previously approved copy-editor and ownership workflows also pass. Phone and desktop review screenshots use synthetic data.
