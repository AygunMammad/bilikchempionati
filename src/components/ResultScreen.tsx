import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  Download,
  FileText,
  Film,
  RotateCcw,
  ShoppingBag,
  Star,
  Trophy,
  XCircle,
} from 'lucide-react';
import { ALL_SUBJECTS, GradeLevel, SUBJECT_META } from '../data/questions';
import type { BackdropThemeId } from '../data/shop';
import {
  evaluateGrade,
  formatAzDate,
  SubjectProgressMap,
} from '../utils/grading';
import {
  downloadDiplomaPdf,
  downloadResultReportPdf,
} from '../utils/pdfExport';
import { PlayfulBackdrop } from './PlayfulBackdrop';

const TROPHY_IMG_PATH = '/src/assets/images/bilik_trophy_hero_1795335397662.jpg';

interface ResultScreenProps {
  studentName: string;
  studentClass: string;
  gradeLevel: GradeLevel;
  score: number;
  correctCount: number;
  wrongCount: number;
  totalQuestions: number;
  subjectStats: SubjectProgressMap;
  theme: BackdropThemeId;
  avatarEmoji: string;
  spendablePoints: number;
  bestStreak: number;
  onOpenShop: () => void;
  onOpenVictoryVideo: () => void;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  studentName,
  studentClass,
  gradeLevel,
  score,
  correctCount,
  wrongCount,
  totalQuestions,
  subjectStats,
  theme,
  avatarEmoji,
  spendablePoints,
  bestStreak,
  onOpenShop,
  onOpenVictoryVideo,
  onRestart,
}) => {
  const [trophyFailed, setTrophyFailed] = useState(false);
  const [downloadingType, setDownloadingType] = useState<
    'diploma' | 'report' | null
  >(null);

  const grade = evaluateGrade(score);
  const dateLabel = formatAzDate(new Date());
  const percentage = Math.round((score / Math.max(1, totalQuestions)) * 100);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return;

    try {
      confetti({
        particleCount: 95,
        spread: 80,
        origin: { y: 0.6 },
      });
      const t = window.setTimeout(() => {
        confetti({
          particleCount: 65,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.65 },
        });
        confetti({
          particleCount: 65,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.65 },
        });
      }, 450);
      return () => window.clearTimeout(t);
    } catch {
      // Ignore confetti issues in restricted environments
    }
  }, []);

  const handleDownloadDiploma = async () => {
    setDownloadingType('diploma');
    try {
      await downloadDiplomaPdf({
        studentName,
        studentClass,
        gradeLevel,
        score,
        correctCount,
        wrongCount,
        gradeTitle: grade.title,
        congratsMessage: grade.congratsMessage,
        dateLabel,
        subjectStats,
        trophyImageUrl: TROPHY_IMG_PATH,
      });
    } finally {
      setDownloadingType(null);
    }
  };

  const handleDownloadReport = async () => {
    setDownloadingType('report');
    try {
      await downloadResultReportPdf({
        studentName,
        studentClass,
        gradeLevel,
        score,
        correctCount,
        wrongCount,
        gradeTitle: grade.title,
        congratsMessage: grade.congratsMessage,
        dateLabel,
        subjectStats,
        trophyImageUrl: TROPHY_IMG_PATH,
      });
    } finally {
      setDownloadingType(null);
    }
  };

  return (
    <PlayfulBackdrop theme={theme}>
      <div className="min-h-screen px-4 py-6 sm:py-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Top Result Summary Hero */}
          <section className="bg-white/95 border-2 border-sky-200/80 rounded-3xl shadow-md p-6 sm:p-8 animate-pop-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Trophy Art */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-amber-300 bg-amber-50 shadow-sm flex items-center justify-center">
                  {!trophyFailed ? (
                    <img
                      src={TROPHY_IMG_PATH}
                      alt="Qızıl Bilik Çempionu Kuboku"
                      referrerPolicy="no-referrer"
                      onError={() => setTrophyFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Trophy className="w-24 h-24 text-amber-500" />
                  )}
                </div>
              </div>

              {/* Score & Congratulations */}
              <div className="lg:col-span-8 space-y-5">
                <div className="space-y-2">
                  <div className="text-sm font-bold text-sky-700">
                    {avatarEmoji} {studentName} · {studentClass} ({gradeLevel}-ci
                    sinif)
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display text-balance">
                    Təbriklər, {studentName}!
                  </h1>
                  <p className="text-base text-slate-700 leading-relaxed">
                    {grade.congratsMessage}
                    {bestStreak >= 3 && (
                      <span className="font-bold text-orange-700">
                        {' '}
                        Ən uzun doğru cavab seriyan: {bestStreak}x!
                      </span>
                    )}
                  </p>
                </div>

                {/* 4 Key Result Numbers */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-sky-50 rounded-2xl p-3.5 border border-sky-100">
                    <div className="text-xs font-semibold text-sky-700">
                      Topladığı xal
                    </div>
                    <div className="text-2xl font-extrabold font-mono-tabular text-sky-950 mt-0.5">
                      {score} / {totalQuestions}
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-100">
                    <div className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1">
                      <CheckCircle2
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                      <span>Düzgün</span>
                    </div>
                    <div className="text-2xl font-extrabold font-mono-tabular text-emerald-900 mt-0.5">
                      {correctCount}
                    </div>
                  </div>

                  <div className="bg-rose-50 rounded-2xl p-3.5 border border-rose-100">
                    <div className="text-xs font-semibold text-rose-700 inline-flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Səhv</span>
                    </div>
                    <div className="text-2xl font-extrabold font-mono-tabular text-rose-900 mt-0.5">
                      {wrongCount}
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200">
                    <div className="text-xs font-semibold text-amber-800 inline-flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Qiymət dərəcəsi</span>
                    </div>
                    <div className="text-lg font-extrabold text-amber-950 mt-1 leading-tight">
                      {grade.title} ({percentage}%)
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    disabled={downloadingType !== null}
                    onClick={handleDownloadDiploma}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-sm sm:text-base font-extrabold shadow-sm transition-transform active:scale-[0.98] cursor-pointer disabled:opacity-60"
                  >
                    <Download className="w-5 h-5" aria-hidden="true" />
                    <span>
                      {downloadingType === 'diploma'
                        ? 'Diplom hazırlanır...'
                        : 'Diplomu PDF kimi yüklə'}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={downloadingType !== null}
                    onClick={handleDownloadReport}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-sm sm:text-base font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <FileText className="w-5 h-5" aria-hidden="true" />
                    <span>
                      {downloadingType === 'report'
                        ? 'Hesabat hazırlanır...'
                        : 'Nəticəni PDF kimi yüklə'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenVictoryVideo}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-extrabold shadow-xs transition-colors cursor-pointer"
                  >
                    <Film className="w-5 h-5" aria-hidden="true" />
                    <span>Qələbə Videosunu İzlə / Yüklə</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenShop}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-amber-300 hover:bg-amber-400 text-amber-950 text-sm sm:text-base font-extrabold transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                    <span>Mağaza · {spendablePoints} xal</span>
                  </button>

                  <button
                    type="button"
                    onClick={onRestart}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm sm:text-base font-bold transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Oyunu yenidən başlat</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Automatic Diploma Preview */}
          <section className="bg-white/95 border-4 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="border-2 border-sky-200 rounded-2xl p-6 sm:p-8 text-center space-y-5 bg-gradient-to-b from-amber-50/40 via-white to-sky-50/40">
              <div className="flex items-center justify-center gap-2 text-amber-500">
                <Star className="w-5 h-5 fill-amber-400" aria-hidden="true" />
                <Trophy className="w-8 h-8 text-amber-500" aria-hidden="true" />
                <Star className="w-5 h-5 fill-amber-400" aria-hidden="true" />
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide text-blue-900 font-display">
                  BİLİK ÇEMPİONU
                </h2>
                <div className="text-sm sm:text-base font-bold text-amber-700 mt-1">
                  FƏXRİ DİPLOM · {gradeLevel}-Cİ SİNİF
                </div>
              </div>

              <div className="h-0.5 w-48 bg-amber-300 mx-auto" />

              <div className="space-y-1">
                <p className="text-sm text-slate-600">
                  Bu fəxri diplom təqdim edilir:
                </p>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {studentName}
                </div>
                <div className="text-sm font-bold text-sky-700">
                  {studentClass} şagirdi
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2 text-center">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-xs text-slate-500 font-semibold">
                    Topladığı xal
                  </div>
                  <div className="text-xl font-extrabold font-mono-tabular text-blue-800">
                    {score} / {totalQuestions}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-xs text-slate-500 font-semibold">
                    Nəticə dərəcəsi
                  </div>
                  <div className="text-xl font-extrabold text-amber-700 font-display">
                    {grade.title}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-xs text-slate-500 font-semibold">
                    Tarix
                  </div>
                  <div className="text-base font-bold text-slate-800 mt-1">
                    {dateLabel}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Subject Breakdown */}
          <section className="bg-white/95 border border-slate-200 rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Fənlər üzrə nəticələr
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_SUBJECTS.map((subj) => {
                const meta = SUBJECT_META[subj];
                const stat = subjectStats[subj] || { correct: 0, total: 20 };
                const pct =
                  stat.total > 0
                    ? Math.round((stat.correct / stat.total) * 100)
                    : 0;
                return (
                  <div
                    key={subj}
                    className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-bold ${meta.accentText}`}>
                        {meta.emoji} {subj}
                      </span>
                      <span className="font-mono-tabular font-extrabold text-slate-800">
                        {stat.correct} / {stat.total} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${meta.barColor}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </PlayfulBackdrop>
  );
};
