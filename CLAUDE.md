# CLAUDE.md

## Working style

This project is expected to evolve iteratively. Do not rewrite everything for small changes.

## Important context

The user wants a visually rich, child-focused web page with 10 child characters as table columns. The characters should eventually blink, move, react, receive medals, and support game-like progression.

The current MVP is Rive-first through semantic renderer props, with illustration fallback only to keep development unblocked until `.riv` assets are present.

## Before changing code

Check these files first:

- `src/domain/types.ts`
- `src/domain/achievementRules.ts`
- `src/data/achievements.ts`
- `src/components/CharacterAvatar.tsx`
- `src/renderers/CharacterRenderer.tsx`
- `src/renderers/RiveCharacterRenderer.example.tsx`

## Test expectations

Run:

```bash
npm test
npm run build
```

Add tests for every rule change.
