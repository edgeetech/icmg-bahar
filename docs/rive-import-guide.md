# Rive Import Guide

## Goal

Turn the layered Muhammed Emir source package into the first production `.riv` file used by the app.

Source package:

```txt
design/rive-source/muhammed-emir/
```

Expected runtime destination:

```txt
public/rive/muhammed-emir.riv
```

## Recommended setup in Rive

- Artboard name: `MuhammedEmir`
- State machine name: `CharacterStateMachine`

## Import order

Import the layered SVG assets into one artboard in this order:

1. `sparkles.svg`
2. `legs.svg`
3. `shoes.svg`
4. `torso.svg`
5. `arm-left-neutral.svg`
6. `arm-right-neutral.svg`
7. `head.svg`
8. `face.svg`
9. `hair.svg`
10. `eyebrows-neutral.svg`
11. `eyes-open.svg`
12. `eyes-closed.svg`
13. `mouth-neutral.svg`
14. `medal-anchor.svg`

Optional mood / motion replacement layers:

- `eyebrows-happy.svg`
- `mouth-happy.svg`
- `mouth-excited.svg`
- `arm-left-wave.svg`
- `arm-right-wave.svg`

## Suggested grouping

Group the imported layers like this:

- `Character`
  - `LowerBody`
    - `legs`
    - `shoes`
  - `Torso`
  - `Arms`
    - `arm-left-neutral`
    - `arm-right-neutral`
    - `arm-left-wave`
    - `arm-right-wave`
  - `Head`
    - `head`
    - `face`
    - `hair`
    - `eyebrows-neutral`
    - `eyebrows-happy`
    - `eyes-open`
    - `eyes-closed`
    - `mouth-neutral`
    - `mouth-happy`
    - `mouth-excited`
  - `Effects`
    - `medal-anchor`
    - `sparkles`

## Pivot recommendations

Set pivots before animating:

- head: bottom center
- left arm: upper shoulder joint
- right arm: upper shoulder joint
- medal anchor: chest center
- sparkles: center of composition

## Suggested animation setup

### Idle

- slight body bob
- subtle head follow-through

### Blink

- animate visibility or scale between `eyes-open` and `eyes-closed`
- loop internally or expose `blinkTrigger`

### Happy

- show `mouth-happy`
- optionally brighten pose slightly

### Proud

- show confident posture
- lift chest slightly
- present medal area clearly

### Excited

- swap to wave arm layers
- show `mouth-excited`
- stronger bounce

### Medal emphasis

- bind medal visibility/intensity to `medalLevel`
- stronger highlight at `gold`

### Celebrate trigger

- briefly scale body
- pulse sparkles
- add quick wave / bounce

## Required state machine inputs

Create these inputs exactly:

- Number: `moodIndex`
- Number: `medalLevel`
- Boolean: `isSelected`
- Boolean: `isHovered`
- Boolean: `hasNewAchievement`
- Trigger: `blinkTrigger`
- Trigger: `celebrateTrigger`

## Save/export step

After wiring the artboard and state machine:

1. save/export as `muhammed-emir.riv`
2. place the file at:

```txt
public/rive/muhammed-emir.riv
```

3. verify that `src/data/children.ts` still points to:

```txt
/rive/muhammed-emir.riv
```

## App integration status

The React side is already prepared:

- `src/renderers/RiveCharacterRenderer.tsx`
- `src/renderers/riveMappings.ts`

Once the `.riv` file is added to `public/rive/`, Muhammed Emir will automatically move from fallback visuals toward the Rive runtime path.
