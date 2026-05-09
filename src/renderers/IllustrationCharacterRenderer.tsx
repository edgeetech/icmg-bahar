import type { CharacterRendererProps } from './CharacterRenderer';
import { useLocale } from '../i18n';
import './illustrationCharacterRenderer.css';

const base = import.meta.env.BASE_URL;

const medalAssets = {
  bronze: `${base}characters/shared/medal-bronze.svg`,
  silver: `${base}characters/shared/medal-silver.svg`,
  gold: `${base}characters/shared/medal-gold.svg`,
} as const;

const sparklesAsset = `${base}characters/shared/sparkles.svg`;
const confettiAsset = `${base}characters/shared/confetti.svg`;

type IllustrationCharacterVisualProps = Pick<
  CharacterRendererProps,
  'child' | 'completedCount' | 'totalCount' | 'mood' | 'medal' | 'hasNewAchievement'
>;

export function IllustrationCharacterVisual({
  child,
  completedCount,
  totalCount,
  mood,
  medal,
  hasNewAchievement,
}: IllustrationCharacterVisualProps) {
  const characterImage = child.assets[mood] ?? child.assets.neutral;
  const sparklesVisible = mood === 'proud' || mood === 'excited' || hasNewAchievement;
  const confettiVisible = mood === 'excited' || hasNewAchievement;
  const medalAsset = medal === 'none' ? null : medalAssets[medal];

  return (
    <>
      <span className="illustration-character__glow" aria-hidden="true" />
      {confettiVisible && (
        <img
          className="illustration-character__confetti"
          src={confettiAsset}
          alt=""
          draggable={false}
          data-testid={`character-confetti-${child.id}`}
        />
      )}
      {sparklesVisible && (
        <img
          className="illustration-character__sparkles"
          src={sparklesAsset}
          alt=""
          draggable={false}
          data-testid={`character-sparkles-${child.id}`}
        />
      )}
      <img
        className="illustration-character__base"
        src={characterImage}
        alt=""
        draggable={false}
        data-testid={`character-base-${child.id}`}
      />
      {medalAsset && (
        <img
          className="illustration-character__medal"
          src={medalAsset}
          alt=""
          draggable={false}
          data-testid={`character-medal-${child.id}`}
        />
      )}
      <span className="illustration-character__status" aria-hidden="true">
        {completedCount}/{totalCount}
      </span>
    </>
  );
}

export function IllustrationCharacterRenderer({
  child,
  completedCount,
  totalCount,
  mood,
  medal,
  selected = false,
  hasNewAchievement,
  onSelect,
}: CharacterRendererProps) {
  const { t } = useLocale();

  return (
    <button
      type="button"
      className={[
        'illustration-character',
        `illustration-character--${mood}`,
        selected ? 'illustration-character--selected' : '',
        hasNewAchievement ? 'illustration-character--new-achievement' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={t.characterButtonLabel(child.name, t.characterMoodLabel(mood), medal)}
      aria-pressed={selected}
      data-testid={`character-${child.id}`}
      data-renderer="illustration"
      data-mood={mood}
      data-medal={medal}
      data-selected={selected ? 'true' : 'false'}
      onClick={onSelect}
    >
      <IllustrationCharacterVisual
        child={child}
        completedCount={completedCount}
        totalCount={totalCount}
        mood={mood}
        medal={medal}
        hasNewAchievement={hasNewAchievement}
      />
    </button>
  );
}
