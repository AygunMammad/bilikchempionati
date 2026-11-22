import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Film,
  Flame,
  Lightbulb,
  RotateCcw,
  ShoppingBag,
  Star,
  Trophy,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import { DeckQuestion, GradeLevel, SUBJECT_META } from '../data/questions';
import type { BackdropThemeId } from '../data/shop';
import {
  ENCOURAGING_CORRECT_MESSAGES,
  getStageForQuestion,
  MOTIVATING_WRONG_MESSAGES,
} from '../utils/grading';
import type { VideoTrackId } from '../utils/videoLessons';
import { PlayfulBackdrop } from './PlayfulBackdrop';

interface QuizStageProps {
  studentName: string;
  studentClass: string;
  gradeLevel: GradeLevel;
  question: DeckQuestion;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  correctCount: number;
  wrongCount: number;
  selectedOption: string | null;
  eliminatedOptions: string[];
  soundEnabled: boolean;
  theme: BackdropThemeId;
  avatarEmoji: string;
  spendablePoints: number;
  hintTokens: number;
  streak: number;
  bonusNotice: string | null;
  onToggleSound: () => void;
  onOpenShop: () => void;
  onOpenVideos: (track: VideoTrackId) => void;
  onUseHint: () => void;
  onSelectAnswer: (option: string) => void;
  onNextQuestion: () => void;
  onRestartGame: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const QuizStage: React.FC<QuizStageProps> = ({
  studentName,
  studentClass,
  gradeLevel,
  question,
  questionIndex,
  totalQuestions,
  score,
  correctCount,
  wrongCount,
  selectedOption,
  eliminatedOptions,
  soundEnabled,
  theme,
  avatarEmoji,
  spendablePoints,
  hintTokens,
  streak,
  bonusNotice,
  onToggleSound,
  onOpenShop,
  onOpenVideos,
  onUseHint,
  onSelectAnswer,
  onNextQuestion,
  onRestartGame,
}) => {
  const [confirmRestart, setConfirmRestart] = useState(false);

  const isAnswered = selectedOption !== null;
  const isCorrect =
    isAnswered && selectedOption === question.correctAnswer;
  const isLastQuestion = questionIndex + 1 >= totalQuestions;
  const hintAlreadyUsed = eliminatedOptions.length > 0;

  const subjectMeta = SUBJECT_META[question.subject];
  const stageRank = getStageForQuestion(questionIndex + 1);
  const progressPercent = Math.round(
    ((questionIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100
  );

  const feedbackMessage = useMemo(() => {
    if (!isAnswered) return '';
    if (isCorrect) {
      return ENCOURAGING_CORRECT_MESSAGES[
        questionIndex % ENCOURAGING_CORRECT_MESSAGES.length
      ];
    }
    return MOTIVATING_WRONG_MESSAGES[
      questionIndex % MOTIVATING_WRONG_MESSAGES.length
    ];
  }, [isAnswered, isCorrect, questionIndex]);

  return (
    <PlayfulBackdrop theme={theme}>
      <div className="min-h-screen px-4 py-5 sm:py-7 flex flex-col">
        <div className="max-w-4xl w-full mx-auto space-y-5 flex-1 flex flex-col">
          {/* Top Navigation & Controls */}
          <header className="flex flex-wrap items-center justify-between gap-3 bg-white/95 border-2 border-sky-200/80 rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-white flex items-center justify-center shrink-0 text-xl">
                {avatarEmoji || <Trophy className="w-5 h-5" aria-hidden="true" />}
              </div>
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-extrabold text-slate-900 font-display truncate">
                  Bilik Çempionu · {gradeLevel}-ci sinif
                </div>
                <div className="text-xs text-slate-600 truncate">
                  {studentName} · {studentClass}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onOpenVideos(question.subject)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold transition-colors cursor-pointer whitespace-nowrap"
              >
                <Film className="w-4 h-4" aria-hidden="true" />
                <span>Mövzu Videosu</span>
              </button>

              <button
                type="button"
                onClick={onOpenShop}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs sm:text-sm font-extrabold transition-colors cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>Mağaza · {spendablePoints}</span>
              </button>

              <button
                type="button"
                onClick={onToggleSound}
                aria-label={soundEnabled ? 'Səsi söndür' : 'Səsi aç'}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                {soundEnabled ? (
                  <>
                    <Volume2
                      className="w-4 h-4 text-sky-600"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:inline">Səs Açıq</span>
                  </>
                ) : (
                  <>
                    <VolumeX
                      className="w-4 h-4 text-slate-500"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:inline">Səs Bağlı</span>
                  </>
                )}
              </button>

              {!confirmRestart ? (
                <button
                  type="button"
                  onClick={() => setConfirmRestart(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Yenidən başla</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-full px-3 py-1">
                  <span className="text-xs font-bold text-rose-800">
                    Əminsən?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmRestart(false);
                      onRestartGame();
                    }}
                    className="px-2.5 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Bəli
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmRestart(false)}
                    className="px-2.5 py-1 rounded-full bg-white text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Xeyr
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Live Progress & Score Strip */}
          <section className="bg-white/95 border-2 border-sky-200/80 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
              <div className="bg-sky-50 rounded-xl px-3.5 py-2.5">
                <div className="text-xs font-semibold text-sky-700">
                  Cari sual
                </div>
                <div className="text-lg sm:text-xl font-extrabold font-mono-tabular text-sky-950">
                  {questionIndex + 1} / {totalQuestions}
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl px-3.5 py-2.5">
                <div className="text-xs font-semibold text-amber-700">
                  Toplanan xal
                </div>
                <div className="text-lg sm:text-xl font-extrabold font-mono-tabular text-amber-900 inline-flex items-center gap-1">
                  <Star
                    className="w-4 h-4 text-amber-500 fill-amber-500"
                    aria-hidden="true"
                  />
                  <span>{score}</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl px-3.5 py-2.5">
                <div className="text-xs font-semibold text-emerald-700">
                  Düzgün cavablar
                </div>
                <div className="text-lg sm:text-xl font-extrabold font-mono-tabular text-emerald-900">
                  {correctCount}
                </div>
              </div>

              <div className="bg-rose-50 rounded-xl px-3.5 py-2.5">
                <div className="text-xs font-semibold text-rose-700">
                  Səhv cavablar
                </div>
                <div className="text-lg sm:text-xl font-extrabold font-mono-tabular text-rose-900">
                  {wrongCount}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                <span className="font-bold text-indigo-800">
                  {stageRank.emoji} Mərhələ {stageRank.stageNumber}/5 ·{' '}
                  {stageRank.title}
                </span>
                <div className="flex items-center gap-3">
                  {streak >= 2 && (
                    <span className="inline-flex items-center gap-1 font-extrabold text-orange-600">
                      <Flame className="w-3.5 h-3.5 fill-orange-500" aria-hidden="true" />
                      <span>{streak}x Seriya</span>
                    </span>
                  )}
                  <span className="font-mono-tabular">
                    İrəliləyiş: {progressPercent}%
                  </span>
                </div>
              </div>
              <div
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/70"
              >
                <div
                  className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {bonusNotice && (
                <div className="bg-amber-100 border border-amber-300 text-amber-950 text-xs sm:text-sm font-extrabold rounded-xl px-3.5 py-2 animate-pop-in">
                  {bonusNotice}
                </div>
              )}
            </div>
          </section>

          {/* Single Active Question Card */}
          <main
            key={question.id}
            className="bg-white/95 border-2 border-sky-200/90 rounded-3xl p-5 sm:p-8 shadow-md space-y-6 animate-pop-in"
          >
            {/* Quiet unboxed subject metadata + 50/50 Hint button */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className={`font-bold ${subjectMeta.accentText}`}>
                {question.emoji} {question.subject}
              </span>

              <div className="flex items-center gap-3">
                {!isAnswered && hintTokens > 0 && !hintAlreadyUsed && (
                  <button
                    type="button"
                    onClick={onUseHint}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 hover:bg-violet-200 border border-violet-300 text-violet-900 text-xs font-extrabold cursor-pointer transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>50/50 İpucu ({hintTokens})</span>
                  </button>
                )}
                <span className="text-slate-500 font-semibold font-mono-tabular">
                  Sual #{questionIndex + 1} · {totalQuestions} sualdan
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug font-display">
              {question.question}
            </h2>

            {/* 4 Rounded Answer Options (A, B, C, D) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {question.shuffledOptions.map((option, idx) => {
                const isPicked = selectedOption === option;
                const isRight = option === question.correctAnswer;
                const isEliminated =
                  !isAnswered && eliminatedOptions.includes(option);

                let buttonClasses =
                  'bg-slate-50 hover:bg-sky-50 border-slate-200 hover:border-sky-400 text-slate-900';
                let letterClasses =
                  'bg-white border-slate-300 text-slate-700';

                if (isEliminated) {
                  buttonClasses =
                    'bg-slate-100/70 border-slate-200 text-slate-300 line-through opacity-50';
                  letterClasses =
                    'bg-slate-100 border-slate-200 text-slate-300';
                } else if (isAnswered) {
                  if (isRight) {
                    buttonClasses =
                      'bg-emerald-50 border-emerald-500 text-emerald-950 animate-pop-in';
                    letterClasses =
                      'bg-emerald-600 border-emerald-600 text-white';
                  } else if (isPicked) {
                    buttonClasses =
                      'bg-rose-50 border-rose-400 text-rose-950 animate-soft-shake';
                    letterClasses = 'bg-rose-600 border-rose-600 text-white';
                  } else {
                    buttonClasses =
                      'bg-slate-50/60 border-slate-200 text-slate-400';
                    letterClasses =
                      'bg-slate-100 border-slate-200 text-slate-400';
                  }
                }

                return (
                  <button
                    key={`${question.id}_${idx}`}
                    type="button"
                    disabled={isAnswered || isEliminated}
                    onClick={() => onSelectAnswer(option)}
                    className={`min-h-[62px] px-4 py-3.5 rounded-2xl border-2 text-left text-base sm:text-lg font-bold transition-all flex items-center justify-between gap-3 ${buttonClasses} ${
                      !isAnswered && !isEliminated
                        ? 'cursor-pointer active:scale-[0.99]'
                        : 'cursor-default'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-9 h-9 rounded-full border flex items-center justify-center text-sm font-mono-tabular font-extrabold shrink-0 ${letterClasses}`}
                      >
                        {OPTION_LETTERS[idx]}
                      </span>
                      <span className="leading-snug break-words">{option}</span>
                    </div>

                    {isAnswered && isRight && (
                      <CheckCircle2
                        className="w-6 h-6 text-emerald-600 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    {isAnswered && isPicked && !isRight && (
                      <XCircle
                        className="w-6 h-6 text-rose-600 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            {isAnswered && (
              <div
                className={`rounded-2xl p-4 sm:p-5 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pop-in ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-base font-extrabold">
                    {feedbackMessage}
                  </div>
                  {!isCorrect && (
                    <div className="text-sm font-semibold text-emerald-800">
                      Düzgün cavab:{' '}
                      <span className="font-extrabold underline">
                        {question.correctAnswer}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {!isCorrect && (
                    <button
                      type="button"
                      onClick={() => onOpenVideos(question.subject)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-extrabold shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Film className="w-4 h-4" aria-hidden="true" />
                      <span>Video İzah</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onNextQuestion}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-base font-extrabold shadow-sm transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    <span>
                      {isLastQuestion ? 'Nəticəyə bax' : 'Növbəti sual'}
                    </span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </PlayfulBackdrop>
  );
};
