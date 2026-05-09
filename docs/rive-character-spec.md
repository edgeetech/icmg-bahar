# Rive Character Spec

## Scope

This project is now Rive-first for character rendering.

Primary React entry point:

```txt
src/renderers/RiveCharacterRenderer.tsx
```

Primary planned runtime asset path:

```txt
public/rive/muhammed-emir.riv
```

Current status:

- React integration is implemented
- semantic prop mapping is implemented
- fallback renderer is implemented
- Muhammed Emir layered vector source package is prepared under `design/rive-source/muhammed-emir`
- the final `.riv` binary still requires manual authoring/import in the Rive editor

## Recommended artboard

- Artboard name: `MuhammedEmir`
- State machine name: `CharacterStateMachine`

## Required state machine inputs

### Number inputs

- `moodIndex`
  - `0` = neutral
  - `1` = happy
  - `2` = proud
  - `3` = excited

- `medalLevel`
  - `0` = none
  - `1` = bronze
  - `2` = silver
  - `3` = gold

### Boolean inputs

- `isSelected`
- `isHovered`
- `hasNewAchievement`

### Trigger inputs

- `blinkTrigger`
- `celebrateTrigger`

## Animation expectations

### Core states

- `idle`
  - default resting animation
  - subtle breathing / bobbing

- `blink`
  - short eyelid animation
  - may be time-driven internally or externally triggerable

- `happy`
  - slightly brighter stance
  - larger smile

- `proud`
  - taller / more confident posture
  - good medal presentation

- `excited`
  - more energetic bounce
  - wave or cheer emphasis

### Supporting behaviors

- `medal emphasis`
  - visual response when `medalLevel > 0`
  - strongest response for `gold`

- `selected emphasis`
  - lift or scale reaction when `isSelected = true`

- `achievement celebration`
  - short reward reaction when `celebrateTrigger` fires
  - may use sparkles, bounce, or pose accent

## React prop mapping

Source-of-truth mapping lives in:

```txt
src/renderers/riveMappings.ts
```

Mappings:

```ts
moodToRiveIndex = {
  neutral: 0,
  happy: 1,
  proud: 2,
  excited: 3,
}

medalToRiveLevel = {
  none: 0,
  bronze: 1,
  silver: 2,
  gold: 3,
}
```

## React integration behavior

`RiveCharacterRenderer` updates these inputs when props change:

- `mood` -> `moodIndex`
- `medal` -> `medalLevel`
- `selected` -> `isSelected`
- `hasNewAchievement` -> `hasNewAchievement`

The renderer also fires `celebrateTrigger` when:

- mood changes into `excited`
- `hasNewAchievement` transitions from `false` to `true`

## Fallback behavior

If the `.riv` asset is absent or not yet loaded:

- the Rive-first renderer still mounts
- the UI falls back visually to the illustration renderer content
- this keeps the dashboard functional while Rive authoring is in progress

This fallback is temporary. The intended long-term direction is a real `.riv` asset at:

```txt
public/rive/muhammed-emir.riv
```
