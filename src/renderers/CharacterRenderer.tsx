import type { CharacterMood, Child, Medal } from '../domain/types';
import { IllustrationCharacterRenderer } from './IllustrationCharacterRenderer';

export type CharacterRendererProps = {
  child: Child;
  score: number;
  completedCount: number;
  totalCount: number;
  mood: CharacterMood;
  medal: Medal;
  selected?: boolean;
  hasNewAchievement: boolean;
  onSelect?: () => void;
};

export function CharacterRenderer(props: CharacterRendererProps) {
  return <IllustrationCharacterRenderer {...props} />;
}
