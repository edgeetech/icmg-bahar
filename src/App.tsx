import type { CSSProperties } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { buildCharacterState, isAchievementAvailable, TODAY } from './domain/achievementRules';
import type { ChildId } from './domain/types';
import { AchievementTable } from './components/AchievementTable';
import { CharacterRow } from './components/CharacterRow';
import { LanguageSelector } from './components/LanguageSelector';
import { achievements } from './data/achievements';
import { children } from './data/children';
import { LocaleProvider, useLocale } from './i18n';
import './styles/app.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 760px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

function AppContent() {
  const { t } = useLocale();
  const isMobile = useIsMobile();
  const firstRewardedChild = children.find((child) => buildCharacterState(child, achievements).completedCount > 0) ?? children[0];
  const [selectedChildId, setSelectedChildId] = useState(firstRewardedChild.id);
  const selectedChild = children.find((child) => child.id === selectedChildId) ?? children[0];
  const selectedState = buildCharacterState(selectedChild, achievements);
  const boardStyle = { '--child-count': children.length.toString() } as CSSProperties;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const latestCompleted = [...achievements]
    .filter((a) => isAchievementAvailable(a.date, TODAY))
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  const latestActivityName = latestCompleted
    ? (t.achievementTitles[latestCompleted.id] ?? latestCompleted.title)
    : '';
  const latestActivityDate = latestCompleted
    ? new Intl.DateTimeFormat(t.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
        new Date(`${latestCompleted.date}T00:00:00`),
      )
    : '';

  const startAutoAdvance = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSelectedChildId((currentId) => {
        const currentIndex = children.findIndex((c) => c.id === currentId);
        const nextIndex = (currentIndex + 1) % children.length;
        return children[nextIndex].id;
      });
    }, 7500);
  }, []);

  useEffect(() => {
    startAutoAdvance();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoAdvance]);

  const handleSelectChild = useCallback((id: ChildId) => {
    setSelectedChildId(id);
    startAutoAdvance();
  }, [startAutoAdvance]);

  return (
    <main className="app-shell">
      <div className="page-grid">
        <div className="hero-column">
          <div className="hero-side-card" aria-label={t.selectedChildSummaryLabel}>
            <div key={selectedChildId} className="hero-side-card__content">
              <img
                className="summary-kicker-avatar"
                src={selectedChild.assets[selectedState.mood] ?? selectedChild.assets.neutral}
                alt=""
                aria-hidden="true"
                draggable={false}
              />
              <p className="summary-kicker">{t.todayHero}</p>
              <strong>{selectedChild.name}</strong>
              <span className={`summary-medal medal-${selectedState.medal}`}>
                {selectedState.medal === 'none' ? t.awaitingBadge : t.medalLabel(selectedState.medal)}
              </span>
              <p>
                {t.completedSummary(selectedState.completedCount, selectedState.totalAvailableCount)}
              </p>
              <div className="earned-icons" aria-label="Completed activities">
                {achievements
                  .filter((a) => isAchievementAvailable(a.date, TODAY) && a.results[selectedChild.id] === 'earned')
                  .map((a) => (
                    <span key={a.id} className="earned-icon" title={t.achievementTitles[a.id] ?? a.title} aria-label={t.achievementTitles[a.id] ?? a.title}>
                      {a.icon}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="hero-copy-block">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.pageTitle}</h1>
            <p className="hero-copy">{t.heroCopy(latestActivityName, latestActivityDate)}</p>
            <div className="hero-tags" aria-label={t.dashboardHighlightsLabel}>
              <span>{t.tagBigCharacterScene}</span>
              <span>{t.tagLiveMedalStatus}</span>
              <span>{t.tagSoftLockedRows}</span>
            </div>
          </div>
        </div>

        <section className="board-panel" style={boardStyle}>
          <div className="board-ribbon">{t.achievementBoard}</div>
          <div className="board-panel-copy">
            <p>{t.boardCopy}</p>
          </div>
          <div className="board-scroll">
            <CharacterRow
              childrenList={children}
              achievements={achievements}
              selectedChildId={selectedChildId}
              onSelectChild={handleSelectChild}
            />
            <AchievementTable
              childrenList={children}
              achievements={achievements}
              activeChildId={isMobile ? selectedChildId : undefined}
            />
          </div>
        </section>
      </div>
      <footer className="app-footer">
        <LanguageSelector />
      </footer>
    </main>
  );
}

export function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  );
}
