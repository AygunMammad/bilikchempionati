import { QuestionSubject } from '../data/questions';

export interface GradeEvaluation {
  title: string;
  congratsMessage: string;
  accentColor: string;
  badgeBg: string;
}

export function evaluateGrade(score: number): GradeEvaluation {
  if (score >= 90) {
    return {
      title: 'Bilik Çempionu',
      congratsMessage:
        'Möhtəşəm nəticə! Bütün fənlərdən parlaq bilik göstərdin və əsl Bilik Çempionu adına layiq oldun!',
      accentColor: '#b45309',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    };
  }
  if (score >= 75) {
    return {
      title: 'Əla',
      congratsMessage:
        'Afərin! Çox yüksək nəticə topladın. Bilik Çempionu zirvəsinə cəmi bir addım qalıb!',
      accentColor: '#047857',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    };
  }
  if (score >= 60) {
    return {
      title: 'Çox yaxşı',
      congratsMessage:
        'Təbriklər! Yaxşı hazırlaşmısan və sualların əksəriyyətinə düzgün cavab verdin.',
      accentColor: '#0369a1',
      badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
    };
  }
  if (score >= 40) {
    return {
      title: 'Yaxşı',
      congratsMessage:
        'Yaxşı başlanğıcdır! Bir az da təkrar etsən, növbəti oyunda daha yüksək xal toplayacaqsan.',
      accentColor: '#6d28d9',
      badgeBg: 'bg-violet-100 text-violet-900 border-violet-300',
    };
  }
  return {
    title: 'Yenidən cəhd et',
    congratsMessage:
      'Hər səhv yeni bir öyrənmə fürsətidir! Səhv etdiyin sualları yadda saxla və yenidən oyna!',
    accentColor: '#be123c',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
  };
}

const AZ_MONTHS = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'İyun',
  'İyul',
  'Avqust',
  'Sentyabr',
  'Oktyabr',
  'Noyabr',
  'Dekabr',
];

export function formatAzDate(date: Date = new Date()): string {
  const day = date.getDate();
  const month = AZ_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export type SubjectProgressMap = Record<
  QuestionSubject,
  { correct: number; total: number }
>;

export function createEmptySubjectStats(): SubjectProgressMap {
  return {
    'Azərbaycan dili – I hissə': { correct: 0, total: 0 },
    'Riyaziyyat – I hissə': { correct: 0, total: 0 },
    'Həyat bilgisi': { correct: 0, total: 0 },
    Alqoritm: { correct: 0, total: 0 },
    'İngilis dili': { correct: 0, total: 0 },
  };
}

export const ENCOURAGING_CORRECT_MESSAGES = [
  'Afərin! Tam doğru cavab! +1 xal ⭐',
  'Əla! Sən çox diqqətlisən! +1 xal 🌟',
  'Super! Bilik yolunda irəliləyirsən! +1 xal 🏆',
  'Halal olsun! Doğru cavab verdin! +1 xal ✨',
];

export const MOTIVATING_WRONG_MESSAGES = [
  'Eybi yox, gəl doğru cavabı öyrənək!',
  'Narahat olma! Doğru cavaba baxıb yadda saxlayaq.',
  'Bu dəfə yan keçdi, növbəti sualda mütləq tapacaqsan!',
];

export interface StageRankInfo {
  stageNumber: number;
  title: string;
  emoji: string;
  minQuestion: number;
  maxQuestion: number;
}

export const STAGE_RANKS: StageRankInfo[] = [
  {
    stageNumber: 1,
    title: 'Bilik Kəşfiyyatçısı',
    emoji: '🌱',
    minQuestion: 1,
    maxQuestion: 20,
  },
  {
    stageNumber: 2,
    title: 'Ulduz Toplayan',
    emoji: '⭐',
    minQuestion: 21,
    maxQuestion: 40,
  },
  {
    stageNumber: 3,
    title: 'Sürətli Düşünən',
    emoji: '🚀',
    minQuestion: 41,
    maxQuestion: 60,
  },
  {
    stageNumber: 4,
    title: 'Bilik Ustası',
    emoji: '🦁',
    minQuestion: 61,
    maxQuestion: 80,
  },
  {
    stageNumber: 5,
    title: 'Bilik Çempionu',
    emoji: '👑',
    minQuestion: 81,
    maxQuestion: 100,
  },
];

export function getStageForQuestion(questionNumber: number): StageRankInfo {
  const found = STAGE_RANKS.find(
    (s) => questionNumber >= s.minQuestion && questionNumber <= s.maxQuestion
  );
  return found || STAGE_RANKS[STAGE_RANKS.length - 1];
}

