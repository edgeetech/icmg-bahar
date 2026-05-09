# Muhammed Emir Rive Source Notes

## Layer order

Back to front:

1. `sparkles.svg`
2. `legs.svg`
3. `shoes.svg`
4. `torso.svg`
5. `arm-left-neutral.svg`
6. `arm-right-neutral.svg`
7. `head.svg`
8. `face.svg`
9. `hair.svg`
10. eyebrows
11. eyes
12. mouth
13. `medal-anchor.svg`

## Mood-changing layers

- eyebrows
  - `eyebrows-neutral.svg`
  - `eyebrows-happy.svg`
- mouth
  - `mouth-neutral.svg`
  - `mouth-happy.svg`
  - `mouth-excited.svg`
- arms
  - neutral pair
  - wave pair

## Suggested animated layers

- head
- left arm
- right arm
- eyes-open / eyes-closed swap
- sparkles
- medal anchor / medal group

## Suggested pivots

- head: bottom center
- left arm: top-right shoulder connection
- right arm: top-left shoulder connection
- torso: lower center
- medal anchor: chest center

## Notes

- These SVGs are source layers for Rive authoring, not the final runtime `.riv`
- The runtime integration expects the final binary at `public/rive/muhammed-emir.riv`
- Muhammed Emir is the first premium character prepared for this pipeline
