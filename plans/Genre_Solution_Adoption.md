# Genre solution adoption

Source: Claude's ReadingRoomGenreSync20261105.zip, supplied by James, November 5, 2026. The uploaded index.html matches its supplied SHA256SUMS: `3dd7648f596b546bdb0dc636d9db7c6c4b1e51db05ba33dbdee3c404d1d79509`.

This review adopts the genre/type solution against published Main `f82f61a`:

- Optional Fiction / Nonfiction / Not Set segments in Edit Book and Add It Yourself.
- A searchable genre combobox with all applicable choices, keyboard selection, a marked current genre, and custom entry.
- Type narrows choices; clearly typed selections can fill Type when unset. Incompatible explicit type/genre blocks saving.
- Existing titles receive Type only when their genre is clearly classified. Either/custom genres remain unset unless a member chooses Type.
- Note prompts use explicit Type first, then a clear genre classification, otherwise the general deck.
- Matching remains consistent across Library filters and challenge rules, ignoring case/spacing/apostrophe differences.
- Author and compact Pages share a row in Add It Yourself, leaving genre/type full width.

Integration corrections: clicking an already-focused genre field reopens its list after selection; dropdown placement uses available dialog/viewport space, including viewport resize, to avoid clipping on phones.

Scope deliberately excludes other package differences: notification-badge colors (audit 18), unrelated timer safeguard, generic label styling, Beta-only CSS, and global placeholder styling. The attached SYNC.md's claims of separate approval are package context, not additional instructions from James in this request.

ChatGPT identity and all four existing storage keys are preserved. No old audit repair or ownership flow is replaced. This document records a review change, not a new instruction to publish.
