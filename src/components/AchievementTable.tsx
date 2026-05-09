import { isAchievementAvailable, TODAY } from '../domain/achievementRules';
import type { Achievement, Child } from '../domain/types';
import { useLocale } from '../i18n';

export type AchievementTableProps = {
  childrenList: Child[];
  achievements: Achievement[];
  activeChildId?: string;
};

const resolveCellState = (status: string, available: boolean) => {
  if (!available || status === 'locked') return 'locked';
  if (status === 'earned') return 'completed';
  return 'waiting';
};

export function AchievementTable({ childrenList, achievements, activeChildId }: AchievementTableProps) {
  const { t } = useLocale();

  const visibleChildren = activeChildId
    ? childrenList.filter((c) => c.id === activeChildId)
    : childrenList;

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(t.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(`${date}T00:00:00`),
    );

  return (
    <section className="table-card" aria-label={t.achievementTableLabel}>
      <div className="achievement-grid table-header" role="row">
        <span>{t.achievementTableHeader}</span>
        {visibleChildren.map((child) => (
          <span key={child.id}>{child.name}</span>
        ))}
      </div>

      {achievements.map((achievement) => {
        const available = isAchievementAvailable(achievement.date, TODAY);
        const dateLabel = formatDate(achievement.date);
        const title = t.achievementTitles[achievement.id] ?? achievement.title;
        return (
          <div className={`achievement-grid table-row ${available ? 'available' : 'locked'}`} key={achievement.id} role="row">
            <span className="achievement-name">
              <span className="achievement-icon" aria-hidden>
                {achievement.icon}
              </span>
              <span>
                {title}
                <small>{dateLabel}</small>
              </span>
            </span>
            {visibleChildren.map((child) => (
              <span
                className={`achievement-cell state-${resolveCellState(achievement.results[child.id], available)}`}
                key={child.id}
                aria-label={
                  !available
                    ? t.ariaLockedUntil(child.name, title, dateLabel)
                    : achievement.results[child.id] === 'earned'
                      ? t.ariaCompleted(child.name, title)
                      : t.ariaNotCompleted(child.name, title)
                }
                title={
                  !available
                    ? t.titleLockedUntil(title, dateLabel)
                    : achievement.results[child.id] === 'earned'
                      ? t.titleCompleted(child.name, title)
                      : t.titleNotCompleted(child.name, title)
                }
              >
                {resolveCellState(achievement.results[child.id], available) === 'completed' && (
                  <>
                    <span className="cell-icon completed-icon" aria-hidden>
                      ✓
                    </span>
                    <span className="cell-copy">{t.cellCompleted}</span>
                  </>
                )}
                {resolveCellState(achievement.results[child.id], available) === 'waiting' && (
                  <>
                    <span className="cell-icon waiting-icon" aria-hidden>
                      ☆
                    </span>
                    <span className="cell-copy">{t.cellNotCompleted}</span>
                  </>
                )}
                {resolveCellState(achievement.results[child.id], available) === 'locked' && (
                  <>
                    <span className="cell-icon locked-icon" aria-hidden>
                      ⏳
                    </span>
                    <span className="cell-copy">{t.cellLocked}</span>
                  </>
                )}
              </span>
            ))}
          </div>
        );
      })}
    </section>
  );
}
