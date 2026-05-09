import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CharacterRenderer } from './CharacterRenderer';

vi.mock('./IllustrationCharacterRenderer', () => ({
  IllustrationCharacterRenderer: ({ child }: { child: { id: string } }) => (
    <div data-renderer="illustration" data-testid={`character-${child.id}`} />
  ),
}));

const baseChild = {
  id: 'idris' as const,
  name: 'Idris',
  avatarAlt: 'Illustrated boy character named Idris',
  gender: 'boy' as const,
  assets: {
    neutral: '/characters/shared/neutral.png',
    happy: '/characters/shared/happy.png',
    proud: '/characters/shared/withMedal.png',
    excited: '/characters/shared/approver.png',
  },
  badgeColor: '#6fa9ff',
  badgeTextColor: '#ffffff',
};

describe('CharacterRenderer', () => {
  it('uses the illustration renderer', () => {
    render(
      <CharacterRenderer
        child={baseChild}
        score={100}
        completedCount={1}
        totalCount={1}
        mood="happy"
        medal="none"
        selected={false}
        hasNewAchievement={false}
      />,
    );

    expect(screen.getByTestId('character-muhammedEmir')).toHaveAttribute('data-renderer', 'illustration');
  });
});
