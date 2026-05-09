import type { CSSProperties } from 'react';
import type { Achievement, Child } from '../domain/types';
import { buildCharacterState } from '../domain/achievementRules';
import { CharacterRenderer } from '../renderers/CharacterRenderer';

export type CharacterAvatarProps = {
  child: Child;
  achievements: Achievement[];
  selected?: boolean;
  onSelect?: () => void;
};

export function CharacterAvatar({
  child,
  achievements,
  selected = false,
  onSelect,
}: CharacterAvatarProps) {
  const state = buildCharacterState(child, achievements);
  const badgeStyle = {
    '--child-badge-color': child.badgeColor,
    '--child-badge-text-color': child.badgeTextColor,
  } as CSSProperties;

  return (
    <article className="character-column" data-testid={`character-column-${child.id}`} style={badgeStyle}>
      <CharacterRenderer
        child={child}
        score={state.score}
        completedCount={state.completedCount}
        totalCount={state.totalAvailableCount}
        mood={state.mood}
        medal={state.medal}
        selected={selected}
        hasNewAchievement={state.hasNewAchievement}
        onSelect={onSelect}
      />
      <span className="character-name-tag">{child.name}</span>
    </article>
  );
}
