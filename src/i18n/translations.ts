export type Locale = 'en' | 'tr';

export type Translations = {
  // App hero section
  eyebrow: string;
  heroHeading: string;
  heroCopy: (activityName: string, date: string) => string;
  dashboardHighlightsLabel: string;
  tagBigCharacterScene: string;
  tagLiveMedalStatus: string;
  tagSoftLockedRows: string;
  // App summary card
  todayHero: string;
  selectedChildSummaryLabel: string;
  awaitingBadge: string;
  medalLabel: (medal: string) => string;
  completedSummary: (completed: number, total: number) => string;
  moodIntro: string;
  legendLabel: string;
  legendCompleted: string;
  legendLocked: string;
  legendMedal: string;
  // Board panel
  achievementBoard: string;
  boardCopy: string;
  // CharacterRow
  classHeroes: string;
  characterStageLabel: string;
  // CharacterAvatar
  outOf: (count: number) => string;
  scoreLabel: (childName: string, completed: number, total: number) => string;
  characterMoodLabel: (mood: string) => string;
  characterButtonLabel: (childName: string, mood: string, medal: string) => string;
  // AchievementTable
  achievementTableHeader: string;
  achievementTableLabel: string;
  notYetOpen: string;
  cellCompleted: string;
  cellNotCompleted: string;
  cellLocked: string;
  ariaLockedUntil: (childName: string, achievementTitle: string, date: string) => string;
  ariaCompleted: (childName: string, achievementTitle: string) => string;
  ariaNotCompleted: (childName: string, achievementTitle: string) => string;
  titleLockedUntil: (achievementTitle: string, date: string) => string;
  titleCompleted: (childName: string, achievementTitle: string) => string;
  titleNotCompleted: (childName: string, achievementTitle: string) => string;
  // Achievement titles keyed by achievement id
  achievementTitles: Record<string, string>;
  // Date formatting locale string for Intl.DateTimeFormat
  dateLocale: string;
  // LanguageSelector
  langSelector: string;
  langEn: string;
  langTr: string;
  // Page title
  pageTitle: string;
};

export const translations: Record<Locale, Translations> = {
  en: {
    eyebrow: 'ICMG',
    heroHeading: 'Every achievement transforms into a worthy play scene',
    heroCopy: (activityName, date) =>
      `Our children are in activities, and achievements are progressing on the board below. The "${activityName}" activity was completed on ${date}.`,
    dashboardHighlightsLabel: 'Board highlights',
    tagBigCharacterScene: 'Identity Development',
    tagLiveMedalStatus: 'Art, Technology, Science Workshops',
    tagSoftLockedRows: 'Conversations & Competitions',
    todayHero: "Today's shining hero",
    selectedChildSummaryLabel: 'Selected child summary',
    awaitingBadge: 'Awaiting badge',
    medalLabel: (medal) => `${medal} medal`,
    completedSummary: (completed, total) =>
      `Completed ${completed} of ${total} activities.`,
    moodIntro: 'Mood:',
    legendLabel: 'Legend',
    legendCompleted: '✓ Completed',
    legendLocked: '⏳ Not yet open',
    legendMedal: '★ Medal',
    achievementBoard: 'Spring Learning Camp',
    boardCopy: 'Select one of the children on stage to highlight their progress.',
    classHeroes: 'Heroes',
    characterStageLabel: 'Children achievement avatars',
    outOf: (count) => `/ ${count}`,
    scoreLabel: (childName, completed, total) =>
      `${childName} score ${completed} out of ${total}`,
    characterMoodLabel: (mood) => mood,
    characterButtonLabel: (childName, mood, medal) =>
      `${childName} character, ${mood} mood${medal !== 'none' ? `, ${medal} medal` : ''}`,
    achievementTableHeader: 'Achievement Board',
    achievementTableLabel: 'Achievement table',
    notYetOpen: 'Not yet open',
    cellCompleted: 'Done',
    cellNotCompleted: 'Missed',
    cellLocked: 'Locked',
    ariaLockedUntil: (childName, achievementTitle, date) =>
      `${childName}: ${achievementTitle} is locked until ${date}`,
    ariaCompleted: (childName, achievementTitle) =>
      `${childName} completed ${achievementTitle}`,
    ariaNotCompleted: (childName, achievementTitle) =>
      `${childName} has not earned ${achievementTitle} yet`,
    titleLockedUntil: (achievementTitle, date) => `${achievementTitle} is locked until ${date}`,
    titleCompleted: (childName, achievementTitle) => `${childName} completed ${achievementTitle}`,
    titleNotCompleted: (childName, achievementTitle) =>
      `${childName} has not earned ${achievementTitle} yet`,
    achievementTitles: {
      'chemistry-2026-05-01': 'Chemistry',
      'quantum-2026-05-08': 'Quantum Physics',
      'music-2026-05-15': 'Music',
      'art-2026-05-22': 'Art',
      'math-2026-05-29': 'Mathematics',
      'reading-2026-06-05': 'Reading',
      'nature-2026-06-12': 'Nature',
      'coding-2026-06-19': 'Coding',
      'teamwork-2026-06-26': 'Teamwork',
      'presentation-2026-07-03': 'Presentation',
    },
    dateLocale: 'en-GB',
    langSelector: 'Language',
    langEn: 'English',
    langTr: 'Turkish',
    pageTitle: 'Spring Learning Camp - ICMG',
  },
  tr: {
    eyebrow: 'ICMG',
    heroHeading: 'Her kazanım kutlamaya deger bir oyun sahnesine donusuyor',
    heroCopy: (activityName, date) =>
      `Çocuklarımız aktivitelerde, kazanımlar ise aşağıdaki panoda ilerliyor. "${activityName}" etkinliği ${date} tarihinde tamamlandı.`,
    dashboardHighlightsLabel: 'Pano ozetleri',
    tagBigCharacterScene: 'Kimlik Geliştirme',
    tagLiveMedalStatus: 'Sanat, Teknoloji, Bilim Atölyeleri',
    tagSoftLockedRows: 'Sohbet ve Yarışmalar',
    todayHero: 'Bugünün parlayan kahramanı',
    selectedChildSummaryLabel: 'Secili cocuk ozeti',
    awaitingBadge: 'Rozet bekliyor',
    medalLabel: (medal) => {
      const tr: Record<string, string> = { gold: 'Altın', silver: 'Gümüş', bronze: 'Bronz' };
      return `${tr[medal] ?? medal} Madalya`;
    },
    completedSummary: (completed, total) => `${completed} / ${total} etkinliğe katıldı.`,
    moodIntro: 'Ruh hali:',
    legendLabel: 'Aciklama',
    legendCompleted: '✓ Tamamlandi',
    legendLocked: '⏳ Henuz acilmadi',
    legendMedal: '★ Madalya',
    achievementBoard: 'Bahar Okulu',
    boardCopy: 'Sahnedeki cocuklardan birini secerek ilerlemesini vurgulayabilirsin.',
    classHeroes: 'Kahramanlar',
    characterStageLabel: 'Cocuklarin kazanim avatarleri',
    outOf: (count) => `/ ${count}`,
    scoreLabel: (childName, completed, total) =>
      `${childName} puani ${completed} / ${total} kazanım`,
    characterMoodLabel: (mood) => {
      const moodMap: Record<string, string> = {
        neutral: 'sakin',
        happy: 'mutlu',
        proud: 'gururlu',
        excited: 'heyecanli',
      };
      return moodMap[mood] ?? mood;
    },
    characterButtonLabel: (childName, mood, medal) =>
      `${childName} karakteri, ${mood} ruh hali${medal !== 'none' ? `, ${medal} madalya` : ''}`,
    achievementTableHeader: 'Kazanim Panosu',
    achievementTableLabel: 'Kazanim tablosu',
    notYetOpen: 'Henuz acilmadi',
    cellCompleted: 'Tamam',
    cellNotCompleted: 'Katılmadı',
    cellLocked: 'Kilitli',
    ariaLockedUntil: (childName, achievementTitle, date) =>
      `${childName}: ${achievementTitle} kilitli, tarih: ${date}`,
    ariaCompleted: (childName, achievementTitle) =>
      `${childName} ${achievementTitle} tamamladi`,
    ariaNotCompleted: (childName, achievementTitle) =>
      `${childName} ${achievementTitle} henuz kazanmadi`,
    titleLockedUntil: (achievementTitle, date) => `${achievementTitle} kilitli, tarih: ${date}`,
    titleCompleted: (childName, achievementTitle) =>
      `${childName} ${achievementTitle} tamamladi`,
    titleNotCompleted: (childName, achievementTitle) =>
      `${childName} ${achievementTitle} henuz kazanmadi`,
    achievementTitles: {
      'chemistry-2026-05-01': 'Kimya',
      'quantum-2026-05-08': 'Kuantum Fizigi',
      'music-2026-05-15': 'Müzik',
      'art-2026-05-22': 'Resim',
      'math-2026-05-29': 'Matematik',
      'reading-2026-06-05': 'Kitap Okuma',
      'nature-2026-06-12': 'Doğa',
      'coding-2026-06-19': 'Kodlama',
      'teamwork-2026-06-26': 'Takım Çalışması',
      'presentation-2026-07-03': 'Sunum',
    },
    dateLocale: 'tr-TR',
    langSelector: 'Dil',
    langEn: 'İngilizce',
    langTr: 'Türkçe',
    pageTitle: 'BAHAR OKULU - ICMG',
  },
};
