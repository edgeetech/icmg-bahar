import { describe, expect, it } from 'vitest';
import { achievements } from '../data/achievements';
import { children } from '../data/children';
import {
  buildCharacterState,
  calculateAvailableCount,
  calculateCompletedCount,
  isAchievementAvailable,
  resolveMedal,
} from './achievementRules';

describe('achievement rules', () => {
  it('keeps Kimya available on 3 May 2026 and later rows locked', () => {
    expect(isAchievementAvailable('2026-05-01', '2026-05-03')).toBe(true);
    expect(isAchievementAvailable('2026-05-08', '2026-05-03')).toBe(false);
  });

  it('keeps Kimya as the first achievement on 1 May 2026', () => {
    expect(achievements[0]?.title).toBe('Kimya');
    expect(achievements[0]?.date).toBe('2026-05-01');
  });

  it('schedules the next 9 achievements on weekly Fridays starting 8 May 2026', () => {
    const futureDates = achievements.slice(1).map((achievement) => achievement.date);

    expect(futureDates).toHaveLength(9);
    expect(futureDates[0]).toBe('2026-05-08');

    futureDates.forEach((date, index) => {
      const parsed = new Date(`${date}T00:00:00Z`);
      expect(parsed.getUTCDay()).toBe(5);

      if (index > 0) {
        const previous = new Date(`${futureDates[index - 1]}T00:00:00Z`);
        const diffDays = (parsed.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);
        expect(diffDays).toBe(7);
      }
    });
  });

  it('counts only available achievements', () => {
    expect(calculateAvailableCount(achievements, '2026-05-03')).toBe(1);
  });

  it('gives the first male character the Kimya achievement', () => {
    const firstMaleChild = children.find((child) => child.gender === 'boy');

    expect(firstMaleChild?.name).toBe('Yusuf Eymen');
    expect(firstMaleChild && calculateCompletedCount(firstMaleChild.id, achievements, '2026-05-03')).toBe(1);
    expect(achievements[0]?.results.yusufEymen).toBe('earned');
  });

  it('resolves medal from available completion ratio', () => {
    expect(resolveMedal(0, 1)).toBe('none');
    expect(resolveMedal(1, 1)).toBe('gold');
  });

  it('builds character state for the first boy character', () => {
    const firstChild = children[0]!;
    const state = buildCharacterState(firstChild, achievements, '2026-05-03');

    expect(firstChild.gender).toBe('boy');
    expect(state.completedCount).toBe(1);
    expect(state.totalAvailableCount).toBe(1);
    expect(state.medal).toBe('gold');
    expect(state.mood).toBe('proud');
  });

  it('keeps children without completed achievements in a neutral waiting state', () => {
    const waitingChild = children.find((child) => child.id === 'alican')!;
    const state = buildCharacterState(waitingChild, achievements, '2026-05-03');

    expect(state.completedCount).toBe(0);
    expect(state.medal).toBe('none');
    expect(state.mood).toBe('neutral');
  });
});
