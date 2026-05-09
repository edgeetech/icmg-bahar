import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { LocaleProvider, useLocale } from './LocaleContext';
import { LanguageSelector } from '../components/LanguageSelector';

// Helper component that exposes locale state for testing
function LocaleDisplay() {
  const { locale, t } = useLocale();
  return (
    <div>
      <span data-testid="current-locale">{locale}</span>
      <span data-testid="board-label">{t.achievementBoard}</span>
      <span data-testid="today-hero">{t.todayHero}</span>
      <span data-testid="not-yet-open">{t.notYetOpen}</span>
      <span data-testid="summary-label">{t.selectedChildSummaryLabel}</span>
    </div>
  );
}

function TestApp() {
  return (
    <LocaleProvider>
      <LanguageSelector />
      <LocaleDisplay />
    </LocaleProvider>
  );
}

describe('locale switching', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to English (en) on first load', () => {
    render(<TestApp />);

    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
    expect(screen.getByTestId('board-label')).toHaveTextContent('Achievement Board');
    expect(screen.getByTestId('today-hero')).toHaveTextContent("Today's shining hero");
    expect(screen.getByTestId('not-yet-open')).toHaveTextContent('Not yet open');
    expect(screen.getByTestId('summary-label')).toHaveTextContent('Selected child summary');
  });

  it('switches to Turkish when Turkish option is selected', () => {
    render(<TestApp />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'tr' } });

    expect(screen.getByTestId('current-locale')).toHaveTextContent('tr');
    expect(screen.getByTestId('board-label')).toHaveTextContent('Kazanim Tablosu');
    expect(screen.getByTestId('today-hero')).toHaveTextContent('Bugunun parlayan kahramani');
    expect(screen.getByTestId('not-yet-open')).toHaveTextContent('Henuz acilmadi');
    expect(screen.getByTestId('summary-label')).toHaveTextContent('Secili cocuk ozeti');
  });

  it('switches back to English from Turkish', () => {
    render(<TestApp />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'tr' } });
    fireEvent.change(select, { target: { value: 'en' } });

    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
    expect(screen.getByTestId('board-label')).toHaveTextContent('Achievement Board');
  });

  it('persists selected locale to localStorage', () => {
    render(<TestApp />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'tr' } });

    expect(localStorage.getItem('app-locale')).toBe('tr');
  });

  it('restores locale from localStorage on mount', () => {
    localStorage.setItem('app-locale', 'tr');
    render(<TestApp />);

    expect(screen.getByTestId('current-locale')).toHaveTextContent('tr');
    expect(screen.getByTestId('board-label')).toHaveTextContent('Kazanim Tablosu');
  });

  it('falls back to English for unknown localStorage value', () => {
    localStorage.setItem('app-locale', 'de');
    render(<TestApp />);

    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
  });
});

describe('LanguageSelector', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders English and Turkish options', () => {
    render(
      <LocaleProvider>
        <LanguageSelector />
      </LocaleProvider>,
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('English');
    expect(options[1]).toHaveTextContent('Turkish');
  });

  it('shows the current locale as selected value', () => {
    render(
      <LocaleProvider>
        <LanguageSelector />
      </LocaleProvider>,
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('en');
  });

  it('updates selector label when locale is Turkish', () => {
    render(
      <LocaleProvider>
        <LanguageSelector />
        <LocaleDisplay />
      </LocaleProvider>,
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'tr' } });

    // In Turkish, the options display the Turkish language names
    expect(screen.getAllByRole('option')[0]).toHaveTextContent('İngilizce');
    expect(screen.getAllByRole('option')[1]).toHaveTextContent('Türkçe');
  });
});
