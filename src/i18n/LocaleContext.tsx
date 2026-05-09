import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Locale, Translations } from './translations';
import { translations } from './translations';

const STORAGE_KEY = 'app-locale';
const DEFAULT_LOCALE: Locale = 'en';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => undefined,
  t: translations[DEFAULT_LOCALE],
});

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'tr') return stored;
  } catch {
    // localStorage may be unavailable (e.g. SSR or private browsing)
  }
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translations[locale].pageTitle;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}
