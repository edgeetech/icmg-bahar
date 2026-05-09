# CODEX.md

## Task orientation

When Codex works on this repository, prioritize small safe increments.

## Commands

```bash
npm install
npm test
npm run build
npm run dev
```

## Guardrails

- Keep sample data in `src/data`.
- Keep business/domain logic in `src/domain`.
- Keep presentational rendering in `src/components` and `src/renderers`.
- Never bypass `buildCharacterState` for score/medal/mood calculations.
- Keep `CharacterRenderer` semantic and Rive-first; renderer swaps should not require table or app changes.
- Keep runtime Rive assets under `public/rive` and source vector layers under `design/rive-source`.
- Do not remove `RiveCharacterRenderer.example.tsx`; it documents the future integration path.

## Good next tasks

1. Add actual Rive renderer when the first `.riv` file exists.
2. Add a detail panel when a child is selected.
3. Add achievement unlock animation.
4. Add responsive mobile child selector.
