import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Film,
  Play,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { ALL_SUBJECTS, GradeLevel, SUBJECT_META } from '../data/questions';
import type { BackdropThemeId } from '../data/shop';
import type { VideoTrackId } from '../utils/videoLessons';
import { PlayfulBackdrop } from './PlayfulBackdrop';

const MASCOT_IMG_PATH = '/src/assets/images/bilik_mascot_owl_1795335397958.jpg';

const SECTIONS_BY_GRADE: Record<GradeLevel, string[]> = {
  2: ['2-ci sinif', '2-A', '2-B', '2-C', '2-Ç', '2-D'],
  3: ['3-cü sinif', '3-A', '3-B', '3-C', '3-Ç', '3-D'],
};

interface HomeScreenProps {
  initialName: string;
  initialGrade: GradeLevel;
  initialClass: string;
  hasSavedSession: boolean;
  savedQuestionNumber: number;
  savedScore: number;
  savedGrade: GradeLevel;
  soundEnabled: boolean;
  theme: BackdropThemeId;
  avatarEmoji: string;
  spendablePoints: number;
  onToggleSound: () => void;
  onOpenShop: () => void;
  onOpenVideos: (track?: VideoTrackId) => void;
  onStartNewGame: (
    name: string,
    gradeLevel: GradeLevel,
    studentClass: string
  ) => void;
  onResumeGame: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  initialName,
  initialGrade,
  initialClass,
  hasSavedSession,
  savedQuestionNumber,
  savedScore,
  savedGrade,
  soundEnabled,
  theme,
  avatarEmoji,
  spendablePoints,
  onToggleSound,
  onOpenShop,
  onOpenVideos,
  onStartNewGame,
  onResumeGame,
}) => {
  const [name, setName] = useState(initialName);
  const [gradeLevel, setGradeLevel] = useState<GradeLevel>(initialGrade);
  const [studentClass, setStudentClass] = useState(
    SECTIONS_BY_GRADE[initialGrade].includes(initialClass)
      ? initialClass
      : SECTIONS_BY_GRADE[initialGrade][0]
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const [imgFailed, setImgFailed] = useState(false);

  const handleSelectGrade = (nextGrade: GradeLevel) => {
    setGradeLevel(nextGrade);
    setStudentClass(SECTIONS_BY_GRADE[nextGrade][0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError('Zəhmət olmasa əvvəlcə adını daxil et.');
      return;
    }
    setNameError(null);
    onStartNewGame(trimmed, gradeLevel, studentClass);
  };

  const isSpaceTheme = theme === 'space';

  return (
    <PlayfulBackdrop theme={theme}>
      <div className="min-h-screen px-4 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Top Bar */}
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm text-white shrink-0">
                <Trophy className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h1
                  className={`text-xl sm:text-2xl font-extrabold tracking-tight font-display ${
                    isSpaceTheme ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Bilik Çempionu
                </h1>
                <p
                  className={`text-xs sm:text-sm ${
                    isSpaceTheme ? 'text-violet-200' : 'text-slate-600'
                  }`}
                >
                  2-ci və 3-cü sinif interaktiv təhsil oyunu
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onOpenVideos('Azərbaycan dili – I hissə')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <Film className="w-4 h-4" aria-hidden="true" />
                <span>Video Dərslər</span>
              </button>

              <button
                type="button"
                onClick={onOpenShop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs sm:text-sm font-extrabold shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>Mağaza · {spendablePoints} xal</span>
              </button>

              <button
                type="button"
                onClick={onToggleSound}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-sky-300 text-slate-700 text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {soundEnabled ? (
                  <>
                    <Volume2
                      className="w-4 h-4 text-sky-600"
                      aria-hidden="true"
                    />
                    <span>Səs: Açıq</span>
                  </>
                ) : (
                  <>
                    <VolumeX
                      className="w-4 h-4 text-slate-400"
                      aria-hidden="true"
                    />
                    <span>Səs: Bağlı</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Main Hero & Registration Card */}
          <section className="bg-white/95 border-2 border-sky-200/80 rounded-3xl shadow-md p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Mascot & Visual Brand Column */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden bg-sky-100 border-4 border-amber-200 shadow-sm animate-gentle-float flex items-center justify-center">
                {!imgFailed ? (
                  <img
                    src={MASCOT_IMG_PATH}
                    alt="Bilik Çempionu bayquş personajı"
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-sky-800">
                    <Sparkles className="w-16 h-16 text-amber-500 mb-2" />
                    <span className="font-display font-bold text-lg">
                      Bilik Çempionu
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-sky-700">
                  {avatarEmoji} Salam, gənc bilik səyyahı!
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xs">
                  Hər doğru cavabda fişəng partlasın, xallarla mağazadan
                  hədiyyələr al və öz Fəxri Diplomunu qazan!
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display text-balance">
                  Bilik yarışına hazırsanmı?
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-1.5">
                  Adını və sinfini seçərək 5 fənn üzrə 100 suallıq yarışa başla.
                </p>
              </div>

              {hasSavedSession && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-sm text-amber-950">
                    <span className="font-bold">Yarımçıq oyunun var:</span>{' '}
                    <span className="font-mono-tabular">
                      {savedGrade}-ci sinif · Sual {savedQuestionNumber}/100 ·{' '}
                      {savedScore} xal
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onResumeGame}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Play className="w-4 h-4 fill-white" aria-hidden="true" />
                    <span>Oyuna davam et</span>
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="student-name"
                    className="block text-sm font-bold text-slate-800"
                  >
                    Şagirdin adı və soyadı
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameError) setNameError(null);
                    }}
                    placeholder="Məsələn: Aylin Məmmədova"
                    maxLength={36}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-sky-500 focus:bg-white outline-none text-base font-semibold text-slate-900 transition-colors"
                  />
                  {nameError && (
                    <p className="text-sm font-semibold text-rose-600">
                      {nameError}
                    </p>
                  )}
                </div>

                {/* Grade Level Selector (2-ci sinif vs 3-cü sinif) */}
                <div className="space-y-2">
                  <span className="block text-sm font-bold text-slate-800">
                    Sual səviyyəsi (Sinif)
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {([2, 3] as GradeLevel[]).map((g) => {
                      const active = gradeLevel === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleSelectGrade(g)}
                          className={`px-4 py-3 rounded-2xl text-sm sm:text-base font-extrabold border-2 transition-colors cursor-pointer ${
                            active
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-emerald-300'
                          }`}
                        >
                          {g === 2 ? '2-ci sinif (100 sual)' : '3-cü sinif (100 sual)'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Class Section Selector */}
                <div className="space-y-2">
                  <span className="block text-sm font-bold text-slate-800">
                    Sinif bölməsi
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {SECTIONS_BY_GRADE[gradeLevel].map((cls) => {
                      const active = studentClass === cls;
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setStudentClass(cls)}
                          className={`px-3 py-2.5 rounded-xl text-sm font-bold border-2 transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300'
                          }`}
                        >
                          {cls}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-base sm:text-lg font-extrabold shadow-md transition-transform active:scale-[0.98] cursor-pointer"
                  >
                    {hasSavedSession ? (
                      <>
                        <RotateCcw className="w-5 h-5" aria-hidden="true" />
                        <span>Yeni oyun başlat</span>
                      </>
                    ) : (
                      <>
                        <Play
                          className="w-5 h-5 fill-white"
                          aria-hidden="true"
                        />
                        <span>Oyuna başla</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenVideos('Azərbaycan dili – I hissə')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 text-indigo-800 text-base font-extrabold transition-colors cursor-pointer"
                  >
                    <Film className="w-5 h-5" aria-hidden="true" />
                    <span>Video Dərslərə Bax</span>
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Rules & About Game Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Game Rules */}
            <div className="bg-white/95 border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  className="w-6 h-6 text-emerald-600 shrink-0"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Oyun qaydaları
                </h3>
              </div>
              <ul className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-bold text-sky-600">
                    1.
                  </span>
                  <span>
                    Hər dəfə ekranda yalnız 1 sual və 4 cavab variantı (A, B,
                    C, D) görünür.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-bold text-sky-600">
                    2.
                  </span>
                  <span>
                    Seçilən cavab dərhal yoxlanılır və sonradan dəyişdirilə
                    bilməz.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-bold text-sky-600">
                    3.
                  </span>
                  <span>
                    Hər düzgün cavabda fişəng partlayır,{' '}
                    <strong>5 ardıcıl doğru</strong> cavab +2 bonus xal və hər{' '}
                    <strong>20 suallıq mərhələ</strong> +3 bonus xal qazandırır.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono-tabular font-bold text-sky-600">
                    4.
                  </span>
                  <span>
                    Çətinlik çəkdiyin mövzuda <strong>Video Dərslərə</strong> baxa
                    bilər, sonda isə <strong>PDF Diplom</strong> və{' '}
                    <strong>Qələbə Videosu</strong> əldə edərsən.
                  </span>
                </li>
              </ul>
            </div>

            {/* About the Game & 5 Sections */}
            <div className="bg-white/95 border border-slate-200 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <BookOpen
                  className="w-6 h-6 text-amber-600 shrink-0"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Oyun haqqında ({gradeLevel}-ci sinif)
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Bilik Çempionu həm 2-ci, həm də 3-cü sinif Azərbaycan məktəb
                proqramına uyğun hazırlanıb. Seçilən sinif üzrə{' '}
                <strong>100 sual</strong> 5 fənn bölməsindən qarışıq
                ardıcıllıqla təqdim olunur:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm">
                {ALL_SUBJECTS.map((subj) => {
                  const meta = SUBJECT_META[subj];
                  return (
                    <div
                      key={subj}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                    >
                      <span className={`font-bold ${meta.accentText}`}>
                        {meta.emoji} {subj}
                      </span>
                      <span className="font-mono-tabular text-xs font-bold text-slate-500">
                        20 sual
                      </span>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-800 inline-flex items-center gap-1.5">
                    <Award className="w-4 h-4" aria-hidden="true" />
                    <span>Maksimum xal</span>
                  </span>
                  <span className="font-mono-tabular text-xs font-extrabold text-amber-900">
                    100 xal
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PlayfulBackdrop>
  );
};
