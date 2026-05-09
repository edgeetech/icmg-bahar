import type { Achievement, Child } from '../domain/types';
import { useLocale } from '../i18n';
import { CharacterAvatar } from './CharacterAvatar';

export type CharacterRowProps = {
  childrenList: Child[];
  achievements: Achievement[];
  selectedChildId: Child['id'];
  onSelectChild: (childId: Child['id']) => void;
};

export function CharacterRow({ childrenList, achievements, selectedChildId, onSelectChild }: CharacterRowProps) {
  const { t } = useLocale();
  return (
    <section className="character-stage" aria-label={t.characterStageLabel}>
      <div className="character-stage__background" aria-hidden="true" />
      <div className="character-stage__children-row character-row">
        <div className="grid-spacer stage-label">
          <span>{t.classHeroes}</span>
        </div>
        {childrenList.map((child) => (
          <CharacterAvatar
            key={child.id}
            child={child}
            achievements={achievements}
            selected={child.id === selectedChildId}
            onSelect={() => onSelectChild(child.id)}
          />
        ))}
      </div>
      <div className="character-stage__platform" aria-hidden="true" />
    </section>
  );
}
