import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IllustrationCharacterRenderer } from './IllustrationCharacterRenderer';

const child = {
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

describe('IllustrationCharacterRenderer', () => {
  it('renders the correct SVG src for each mood', () => {
    const { rerender } = render(
      <IllustrationCharacterRenderer
        child={child}
        score={0}
        completedCount={0}
        totalCount={1}
        mood="neutral"
        medal="none"
        selected={false}
        hasNewAchievement={false}
      />,
    );

    expect(screen.getByTestId('character-base-muhammedEmir')).toHaveAttribute('src', '/characters/shared/neutral.png');

    rerender(
      <IllustrationCharacterRenderer
        child={child}
        score={100}
        completedCount={1}
        totalCount={1}
        mood="happy"
        medal="none"
        selected={false}
        hasNewAchievement={false}
      />,
    );
    expect(screen.getByTestId('character-base-muhammedEmir')).toHaveAttribute('src', '/characters/shared/happy.png');

    rerender(
      <IllustrationCharacterRenderer
        child={child}
        score={100}
        completedCount={1}
        totalCount={1}
        mood="proud"
        medal="gold"
        selected
        hasNewAchievement={false}
      />,
    );
    expect(screen.getByTestId('character-base-muhammedEmir')).toHaveAttribute('src', '/characters/shared/withMedal.png');

    rerender(
      <IllustrationCharacterRenderer
        child={child}
        score={100}
        completedCount={1}
        totalCount={1}
        mood="excited"
        medal="gold"
        selected={false}
        hasNewAchievement
      />,
    );
    expect(screen.getByTestId('character-base-muhammedEmir')).toHaveAttribute('src', '/characters/shared/approver.png');
  });

  it('renders medal overlay, sparkles, and selected state when needed', () => {
    render(
      <IllustrationCharacterRenderer
        child={child}
        score={100}
        completedCount={1}
        totalCount={1}
        mood="proud"
        medal="gold"
        selected
        hasNewAchievement={false}
      />,
    );

    const avatar = screen.getByTestId('character-muhammedEmir');
    expect(avatar).toHaveClass('illustration-character--selected');
    expect(avatar).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('character-medal-muhammedEmir')).toHaveAttribute('src', '/characters/shared/medal-gold.svg');
    expect(screen.getByTestId('character-sparkles-muhammedEmir')).toHaveAttribute('src', '/characters/shared/sparkles.svg');
  });

  it('renders sparkles when excited or when there is a new achievement', () => {
    const { rerender } = render(
      <IllustrationCharacterRenderer
        child={child}
        score={100}
        completedCount={1}
        totalCount={1}
        mood="excited"
        medal="gold"
        selected={false}
        hasNewAchievement={false}
      />,
    );

    expect(screen.getByTestId('character-sparkles-muhammedEmir')).toBeInTheDocument();

    rerender(
      <IllustrationCharacterRenderer
        child={child}
        score={100}
        completedCount={1}
        totalCount={1}
        mood="neutral"
        medal="none"
        selected={false}
        hasNewAchievement
      />,
    );

    expect(screen.getByTestId('character-sparkles-muhammedEmir')).toBeInTheDocument();
  });
});
