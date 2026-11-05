# Reading Room sync package

Prepared November 5, 2026 for James and Claude.

## Start here

Read this file, **Website Audit.md**, **Website Audit - Second Pass.md**, **AUDIT-SECOND-PASS-STATUS.md**, and **SYNC-Audit-Follow-ups.md**. Both audit reports are included as readable Markdown, not screenshots. Their findings are historical snapshots; the status document records the repairs. Keep the first audit's numbers separate from the second audit's numbers. Do not renumber either report.

## Published source

Repository: gravityoptional/reading-room-chatgpt
Website: https://gravityoptional.github.io/reading-room-chatgpt/
Main commit: `f82f61a56c7947fd4d999ced37eb7c9c0efeacb0`

`index.html` is the complete current application, byte-verified against both Main and the live site. It uses vanilla HTML/CSS/JavaScript with no build step. External fonts and Open Library still require network access. Browser user data is not included.

## What is complete

The first audit's eight confirmed findings were addressed across data protections, copy editing, and reading-session fixes. The second audit's **1–15 and 17** are implemented and published. See AUDIT-SECOND-PASS-STATUS.md for the individual repairs. Latest merges include PR #19 (17: compact aligned fields), PR #20 (12–14: genre challenge validation, activity identity, unchanged covers), and PR #21 (15: compact phone/two-row tablet headers).

Owned copies are edited inline in Edit Book with its existing Save Changes button. Start a New Book includes ownership during setup, preserves the existing clickable book results, and does not add a Choose button. New-copy ownership is committed with the reading entry. Copy edition changes preserve prior reading edition snapshots. Legitimate additional copies remain allowed, and committed loans/holds/requests protect copy removal and format changes.

The header uses compact phone controls below 360px, existing mobile bottom navigation through 720px, and a second navigation row from 721px through 1024px. Wider desktop headers stay on one row. Paired fields align, and page-count fields are compact.

## Follow-ups and James's decisions

- **Second Pass 16 — Later:** reassess account-menu scrolling after Prototype Tools are removed. James can scroll the entire page to reach the menu bottom on his Pixel 10 Pro. No menu scrolling change is approved.
- **Second Pass 18 — Claude to check:** James thinks the unread notification count looks fine. Review the small white count against its orange background in light/dark and high-contrast palettes. Audit measurements were approximately 2.8:1 light and 2.26:1 dark against 4.5:1 for small text. No badge recoloring is approved in this package.
- **Edition's future use — add to Later in the receiving Requirements:** consider structured edition identity for language/correct cover, page count/audio length, publisher/year/ISBN, and edition-specific reading/copy matching. Keep owned-copy metadata separate from the edition actually read for each read-through. Current edition text is collected now; earlier readings retain snapshots. Do not implement a new edition system as part of this sync.
- User reports item **17 working**. All approved merges above are complete; do not reapply them to this ChatGPT copy.

## Safe integration into Claude's copy

The full HTML is a reference snapshot of the ChatGPT repository. It includes that repository's identity/tag, storage namespaces (`rr-chatgpt-*` and `rr_chatgpt_*`), and prototype/sample data. Preserve the receiving project's own identity, storage keys, current requirements, and newer work. Port selected changes after comparing versions; do not blindly replace a newer Claude file or migrate browser data. This package does not authorize publishing another repository.

`changes-since-first-audit.patch` is an optional review aid based on the first audit's source commit, not a universal apply script. It includes ChatGPT-specific context. Check the base and hunks before applying. The complete HTML remains the authoritative snapshot.

`Appearance Package.md` is historical reference, included for continuity. It is not an instruction to reapply an older appearance package. LATER.md is the source repository's historical backlog; use the explicit decisions above for this handoff.

## Evidence and validation

The top-level audit copies preserve findings and numbering, with local evidence links adjusted to the included evidence folders. Unmodified originals and their JSON/screenshots are also preserved under evidence/first-pass and evidence/second-pass. Original audit screenshots show earlier defects and do not imply those defects remain live. Historical source links retain their original commit context.

Repair regression coverage used isolated synthetic Chromium browser data: real draft autosave; two tabs sharing storage; failed saves; copy save/cancel and edition snapshots; loans; timers; date controls; staged status edits; unknown metadata; genre rules; same-title/different-author activity; failed unchanged/replacement covers; owned/unowned format filters. Header validation loaded real DM Sans and checked 13 widths across four main pages; paired fields were checked at 320px, 390px, and desktop. These checks are not a full Safari/Firefox or assistive-technology certification.

Review screenshots of the completed changes are under review-screenshots. Evidence JSON files are test records, not user backups. SHA256SUMS covers every packaged file except itself.
