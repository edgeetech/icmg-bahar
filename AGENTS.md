# AGENTS.md

## Project goal

Build a playful, child-focused achievement board. The UI should feel visual and game-like, not like a plain spreadsheet.

## Tech stack

- Vite
- React
- TypeScript
- Vitest
- Testing Library
- Future animation target: Rive

## Rules for agents

1. Keep TypeScript strict.
2. Do not introduce backend or database unless explicitly requested.
3. Keep achievement data editable in source files for now.
4. Tests are mandatory for new domain logic and meaningful UI states.
5. Preserve the renderer abstraction:
   - `CharacterRenderer`
   - `StaticCharacterRenderer`
   - future `RiveCharacterRenderer`
6. Do not hardcode child-specific scoring in UI components; use domain functions.
7. Keep UI child-friendly. Avoid harsh failure language.
8. Prefer `locked` or `not yet` states over negative X marks.

## Current sample data requirement

- First row must be Kimya.
- Kimya date: 2026-05-01.
- Emir must have earned Kimya.
- Next 9 rows are future Friday achievements starting 2026-05-08.
