# Project memory

## Product intent & audience

- Nyaya AI: mobile-friendly web app for girls in India to learn legal rights and get emergency help.
- Bilingual Hindi-English throughout (toggle/strings present on every screen).
- Core features: AI legal-rights chatbot, informational cards, emergency SOS resources.
- No real backend; all state stored on-device (profile, chat history, bookmarks, emergency contacts).

## Brand personality & voice

- Friendly, reassuring, respectful; uses "Namaste" greeting, conversational tone.
- Hindi mixed into English copy (e.g., "Version 2 aur 3", "ye dal lo") — informal, accessible phrasing.
- Trust-building microcopy emphasizing privacy ("stays on your phone only — no account needed").

## Visual design & UX direction

- Mobile-first, production-quality, "beautiful, not cookie cutter" (per global prompt).
- Purple as primary theme color (login screen is a purple welcome screen).
- lucide-react icons for UI/logos; Tailwind utility styling; JSX + React hooks only.
- Top header pattern with action buttons (e.g., logout) and language toggle.
- Login screen: name + phone capture with inline validation (empty fields, invalid phone format), privacy note.
- Personalized greeting on Home using stored name (e.g., "Namaste, Priya") in both languages.
- Persistence via localStorage so revisits skip login; logout clears session but preserves user data.

## Decisions, constraints & rationale

- No backend / no accounts: lowers barrier and privacy concerns for target audience; profile, chats, bookmarks, contacts persist locally.
- Gating app behind login ensures personalized greeting and consistent UX entry point.
- Logout is lightweight — returns to login, keeps on-device data intact.
- Versions 2 and 3 include the login/personalization layer; iterative versioning is part of the workflow.
- UI packages limited to defaults (Tailwind, lucide-react); no extra theme/icon deps unless explicitly requested.
- Import via `@/` alias to `src/`; avoid deep relative paths.

## Open questions & assumptions

- Hindi/English toggle is present; translation coverage assumed complete but not audited.
- Phone validation rule assumed basic (format check only); no OTP or real verification.
- localStorage assumed sufficient for all persistence (no quota handling surfaced yet).
- SOS/emergency contacts behavior on logout not explicitly specified; assumed preserved.
- No accessibility (screen-reader/contrast) requirements stated yet.