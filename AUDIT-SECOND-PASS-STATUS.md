# Website Audit — Second Pass: repair status

The original audit numbers and findings remain unchanged. This change addresses **1–4 only**; 5–18 remain separate items.

| Original # | Repair |
| --- | --- |
| 1 | Permanent Undo is available only for the exact untouched record created by Already Read It in this page. Readings with sessions or subsequent edits cannot be removed through it. Previously saved undated readings have no destructive shortcut. |
| 2 | Saves reconcile independent collection changes against the last saved baseline. Competing edits to the same record, deletion versus editing, and incompatible changes block the write. The other tab’s saved data remains intact; the local unsaved state can be downloaded before loading the latest data. |
| 3 | Log Reading saves and detaches its draft identity before search, manual entry, or reading-format setup replaces the form. Pending autosave cannot overwrite that draft with search fields. |
| 4 | Starting another timer opens the existing timer for resolution instead of replacing it. Finishing stops the matching running timer. Logging its remaining time preserves Finished and its date without awarding completion twice. |

Validated with isolated Chromium regression tests, genuine draft autosave, and two pages sharing browser storage. The previously approved copy-editor and ownership workflows also pass. Phone and desktop review screenshots use synthetic data.
