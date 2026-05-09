import type { Locale } from '../i18n';
import { useLocale } from '../i18n';

export function LanguageSelector() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="lang-selector" aria-label={t.langSelector}>
      <button
        className={`lang-selector__btn${locale === 'en' ? ' lang-selector__btn--active' : ''}`}
        onClick={() => setLocale('en' as Locale)}
        aria-pressed={locale === 'en'}
        title={t.langEn}
      >
        🇬🇧 <span>{t.langEn}</span>
      </button>
      <button
        className={`lang-selector__btn${locale === 'tr' ? ' lang-selector__btn--active' : ''}`}
        onClick={() => setLocale('tr' as Locale)}
        aria-pressed={locale === 'tr'}
        title={t.langTr}
      >
        🇹🇷 <span>{t.langTr}</span>
      </button>
    </div>
  );
}
