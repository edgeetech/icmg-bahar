import type { Achievement, CharacterMood, CharacterState, Child, Medal } from './types';

const _d = new Date();
export const TODAY = `${_d.getFullYear()}-${String(_d.getMonth() + 1).padStart(2, '0')}-${String(_d.getDate()).padStart(2, '0')}`;

export const isAchievementAvailable = (achievementDate: string, today = TODAY): boolean => {
  return achievementDate <= today;
};

export const calculateCompletedCount = (
  childId: Child['id'],
  achievements: Achievement[],
  today = TODAY,
): number => {
  return achievements.filter(
    (achievement) => isAchievementAvailable(achievement.date, today) && achievement.results[childId] === 'earned',
  ).length;
};

export const calculateAvailableCount = (achievements: Achievement[], today = TODAY): number => {
  return achievements.filter((achievement) => isAchievementAvailable(achievement.date, today)).length;
};

export const resolveMedal = (completedCount: number, totalAvailableCount: number): Medal => {
  if (totalAvailableCount === 0 || completedCount === 0) return 'none';

  const ratio = completedCount / totalAvailableCount;

  if (ratio >= 0.9) return 'gold';
  if (ratio >= 0.6) return 'silver';
  return 'bronze';
};

export const resolveMood = (medal: Medal, hasNewAchievement: boolean): CharacterMood => {
  if (hasNewAchievement) return 'excited';
  if (medal === 'gold') return 'proud';
  if (medal === 'silver' || medal === 'bronze') return 'happy';
  return 'neutral';
};

export const hasRecentAchievement = (
  childId: Child['id'],
  achievements: Achievement[],
  today = TODAY,
): boolean => {
  return achievements.some(
    (achievement) => achievement.date === today && achievement.results[childId] === 'earned',
  );
};

export const buildCharacterState = (
  child: Child,
  achievements: Achievement[],
  today = TODAY,
): CharacterState => {
  const completedCount = calculateCompletedCount(child.id, achievements, today);
  const totalAvailableCount = calculateAvailableCount(achievements, today);
  const medal = resolveMedal(completedCount, totalAvailableCount);
  const hasNewAchievement = hasRecentAchievement(child.id, achievements, today);

  return {
    score: completedCount * 100,
    completedCount,
    totalAvailableCount,
    medal,
    mood: resolveMood(medal, hasNewAchievement),
    hasNewAchievement,
  };
};
