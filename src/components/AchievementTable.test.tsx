import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { achievements } from '../data/achievements';
import { children } from '../data/children';
import { LocaleProvider } from '../i18n';
import { AchievementTable } from './AchievementTable';

// AchievementTable uses useLocale() which defaults to 'en' when no LocaleProvider is present.

describe('AchievementTable', () => {
  it('renders Chemistry first with the rewarded first child in a completed state', () => {
    render(<AchievementTable childrenList={children} achievements={achievements} />);

    expect(screen.getByText('Chemistry')).toBeInTheDocument();
    expect(screen.getByLabelText('Emir completed Chemistry')).toHaveTextContent('Done');
    expect(screen.getByTitle('Emir completed Chemistry')).toBeInTheDocument();
  });

  it('renders future achievements as locked and not yet available', () => {
    render(<AchievementTable childrenList={children} achievements={achievements} />);

    expect(screen.getByText('8 May 2026')).toBeInTheDocument();
    expect(screen.getAllByText('Not yet open')).toHaveLength(9);
    expect(screen.getByLabelText('Emir: Quantum Physics is locked until 8 May 2026')).toHaveTextContent('Locked');
  });

  it('renders waiting state for children who have not completed Chemistry', () => {
    render(<AchievementTable childrenList={children} achievements={achievements} />);

    // Alican has 'missed' status for Chemistry (the only available achievement)
    expect(screen.getByLabelText('Alican has not earned Chemistry yet')).toHaveTextContent('Missed');
    expect(screen.getByText('8 May 2026')).toBeInTheDocument();
  });

  it('renders all child columns and all achievement rows', () => {
    render(<AchievementTable childrenList={children} achievements={achievements} />);

    children.forEach((child) => {
      expect(screen.getByText(child.name)).toBeInTheDocument();
    });

    expect(screen.getAllByRole('row')).toHaveLength(achievements.length + 1);
  });

  it('translates achievement labels when rendered in Turkish', () => {
    localStorage.setItem('app-locale', 'tr');

    render(
      <LocaleProvider>
        <AchievementTable childrenList={children} achievements={achievements} />
      </LocaleProvider>,
    );

    expect(screen.getByText('Kimya')).toBeInTheDocument();
    expect(screen.getByText('Kuantum Fizigi')).toBeInTheDocument();
    expect(screen.getByLabelText('Emir: Kuantum Fizigi kilitli, tarih: 8 Mayıs 2026')).toHaveTextContent(
      'Kilitli',
    );
  });
});
