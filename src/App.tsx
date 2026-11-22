import { useEffect, useState } from 'react';
import {
  createShuffledDeck,
  DeckQuestion,
  GradeLevel,
  QUESTION_BANK,
  shuffleArray,
} from './data/questions';
import {
  BackdropThemeId,
  getAvatarEmoji,
  ShopItem,
} from './data/shop';
import { launchAnswerFireworks } from './utils/fireworks';
import {
  createEmptySubjectStats,
  evaluateGrade,
  SubjectProgressMap,
} from './utils/grading';
import {
  playClickSound,
  playCorrectSound,
  playFinishSound,
  playPurchaseSound,
  playStageBonusSound,
  playWrongSound,
} from './utils/sound';
import type { VideoTrackId } from './utils/videoLessons';
import { HomeScreen } from './components/HomeScreen';
import { QuizStage } from './components/QuizStage';
import { ResultScreen } from './components/ResultScreen';
import { PlayerInventory, ShopModal } from './components/ShopModal';
import { VideoStudioModal } from './components/VideoStudioModal';

type GameScreen = 'HOME' | 'PLAYING' | 'RESULT';

interface PersistedGameState {
  screen: GameScreen;
  studentName: string;
  gradeLevel: GradeLevel;
  studentClass: string;
  deck: DeckQuestion[];
  currentIndex: number;
  selectedOption: string | null;
  eliminatedOptions: string[];
  score: number;
  correctCount: number;
  wrongCount: number;
  streak: number;
  bestStreak: number;
  subjectStats: SubjectProgressMap;
  soundEnabled: boolean;
  inventory: PlayerInventory;
}

const STORAGE_KEY = 'bilik_cempionu_state_v2';

function createInitialInventory(): PlayerInventory {
  return {
    spendablePoints: 0,
    ownedItemIds: [],
    equippedAvatarId: null,
    equippedTheme: 'sky',
    superFireworkEnabled: false,
    hintTokens: 0,
  };
}

function createInitialState(): PersistedGameState {
  return {
    screen: 'HOME',
    studentName: '',
    gradeLevel: 2,
    studentClass: '2-ci sinif',
    deck: [],
    currentIndex: 0,
    selectedOption: null,
    eliminatedOptions: [],
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    streak: 0,
    bestStreak: 0,
    subjectStats: createEmptySubjectStats(),
    soundEnabled: true,
    inventory: createInitialInventory(),
  };
}

function loadGameState(): PersistedGameState {
  const fallback = createInitialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PersistedGameState>;
    const validDeck =
      Array.isArray(parsed.deck) && parsed.deck.length === QUESTION_BANK.length
        ? parsed.deck
        : [];
    const safeIndex =
      typeof parsed.currentIndex === 'number' &&
      parsed.currentIndex >= 0 &&
      parsed.currentIndex < validDeck.length
        ? parsed.currentIndex
        : 0;

    let safeScreen: GameScreen = 'HOME';
    if (parsed.screen === 'PLAYING' && validDeck.length > 0) {
      safeScreen = 'PLAYING';
    } else if (parsed.screen === 'RESULT' && validDeck.length > 0) {
      safeScreen = 'RESULT';
    }

    const safeGrade: GradeLevel = parsed.gradeLevel === 3 ? 3 : 2;
    const baseInv = createInitialInventory();
    const inv = parsed.inventory
      ? {
          spendablePoints:
            typeof parsed.inventory.spendablePoints === 'number'
              ? parsed.inventory.spendablePoints
              : 0,
          ownedItemIds: Array.isArray(parsed.inventory.ownedItemIds)
            ? parsed.inventory.ownedItemIds
            : [],
          equippedAvatarId:
            typeof parsed.inventory.equippedAvatarId === 'string'
              ? parsed.inventory.equippedAvatarId
              : null,
          equippedTheme:
            parsed.inventory.equippedTheme === 'ocean' ||
            parsed.inventory.equippedTheme === 'space'
              ? parsed.inventory.equippedTheme
              : ('sky' as BackdropThemeId),
          superFireworkEnabled: Boolean(parsed.inventory.superFireworkEnabled),
          hintTokens:
            typeof parsed.inventory.hintTokens === 'number'
              ? parsed.inventory.hintTokens
              : 0,
        }
      : baseInv;

    return {
      screen: safeScreen,
      studentName:
        typeof parsed.studentName === 'string' ? parsed.studentName : '',
      gradeLevel: safeGrade,
      studentClass:
        typeof parsed.studentClass === 'string' && parsed.studentClass
          ? parsed.studentClass
          : safeGrade === 3
            ? '3-cü sinif'
            : '2-ci sinif',
      deck: validDeck,
      currentIndex: safeIndex,
      selectedOption:
        typeof parsed.selectedOption === 'string'
          ? parsed.selectedOption
          : null,
      eliminatedOptions: Array.isArray(parsed.eliminatedOptions)
        ? parsed.eliminatedOptions
        : [],
      score: typeof parsed.score === 'number' ? parsed.score : 0,
      correctCount:
        typeof parsed.correctCount === 'number' ? parsed.correctCount : 0,
      wrongCount:
        typeof parsed.wrongCount === 'number' ? parsed.wrongCount : 0,
      streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
      bestStreak:
        typeof parsed.bestStreak === 'number' ? parsed.bestStreak : 0,
      subjectStats: parsed.subjectStats || createEmptySubjectStats(),
      soundEnabled:
        typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
      inventory: inv,
    };
  } catch {
    return fallback;
  }
}

function saveGameState(state: PersistedGameState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
}

export default function App() {
  const [game, setGame] = useState<PersistedGameState>(() => loadGameState());
  const [shopOpen, setShopOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideoTrack, setActiveVideoTrack] =
    useState<VideoTrackId>('Azərbaycan dili – I hissə');
  const [bonusNotice, setBonusNotice] = useState<string | null>(null);

  useEffect(() => {
    saveGameState(game);
  }, [game]);

  const handleOpenVideos = (track?: VideoTrackId) => {
    playClickSound(game.soundEnabled);
    setActiveVideoTrack(track || 'Azərbaycan dili – I hissə');
    setVideoOpen(true);
  };

  const handleToggleSound = () => {
    setGame((prev) => {
      const nextSound = !prev.soundEnabled;
      if (nextSound) playClickSound(true);
      return { ...prev, soundEnabled: nextSound };
    });
  };

  const handleStartNewGame = (
    name: string,
    gradeLevel: GradeLevel,
    studentClass: string
  ) => {
    playClickSound(game.soundEnabled);
    setBonusNotice(null);
    const freshDeck = createShuffledDeck(gradeLevel);
    setGame((prev) => ({
      ...prev,
      screen: 'PLAYING',
      studentName: name,
      gradeLevel,
      studentClass,
      deck: freshDeck,
      currentIndex: 0,
      selectedOption: null,
      eliminatedOptions: [],
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      streak: 0,
      bestStreak: 0,
      subjectStats: createEmptySubjectStats(),
    }));
  };

  const handleResumeGame = () => {
    playClickSound(game.soundEnabled);
    setGame((prev) =>
      prev.deck.length === QUESTION_BANK.length
        ? { ...prev, screen: 'PLAYING' }
        : prev
    );
  };

  const handleSelectAnswer = (option: string) => {
    const currentQ = game.deck[game.currentIndex];
    if (
      game.screen !== 'PLAYING' ||
      game.selectedOption !== null ||
      !currentQ
    ) {
      return;
    }

    const isCorrect = option === currentQ.correctAnswer;
    const nextStreakPreview = isCorrect ? game.streak + 1 : 0;
    const isStreakBonus = isCorrect && nextStreakPreview > 0 && nextStreakPreview % 5 === 0;

    if (isCorrect) {
      if (isStreakBonus) {
        playStageBonusSound(game.soundEnabled);
        launchAnswerFireworks(true);
        setBonusNotice(
          `🔥 ${nextStreakPreview}x Ardıcıl Doğru Cavab Seriyası! Mağaza üçün +2 Bonus xal qazandın!`
        );
      } else {
        playCorrectSound(game.soundEnabled);
        launchAnswerFireworks(game.inventory.superFireworkEnabled);
        setBonusNotice(null);
      }
    } else {
      playWrongSound(game.soundEnabled);
      setBonusNotice(null);
    }

    setGame((prev) => {
      if (prev.screen !== 'PLAYING' || prev.selectedOption !== null) {
        return prev;
      }
      const q = prev.deck[prev.currentIndex];
      if (!q) return prev;

      const right = option === q.correctAnswer;
      const nextStreak = right ? prev.streak + 1 : 0;
      const streakBonusPoints =
        right && nextStreak > 0 && nextStreak % 5 === 0 ? 2 : 0;

      const prevSubj = prev.subjectStats[q.subject] || {
        correct: 0,
        total: 0,
      };
      const nextSubjectStats: SubjectProgressMap = {
        ...prev.subjectStats,
        [q.subject]: {
          correct: prevSubj.correct + (right ? 1 : 0),
          total: prevSubj.total + 1,
        },
      };

      return {
        ...prev,
        selectedOption: option,
        score: prev.score + (right ? 1 : 0),
        correctCount: prev.correctCount + (right ? 1 : 0),
        wrongCount: prev.wrongCount + (right ? 0 : 1),
        streak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
        subjectStats: nextSubjectStats,
        inventory: {
          ...prev.inventory,
          spendablePoints:
            prev.inventory.spendablePoints +
            (right ? 1 : 0) +
            streakBonusPoints,
        },
      };
    });
  };

  const handleUseHint = () => {
    setGame((prev) => {
      const q = prev.deck[prev.currentIndex];
      if (
        !q ||
        prev.selectedOption !== null ||
        prev.eliminatedOptions.length > 0 ||
        prev.inventory.hintTokens <= 0
      ) {
        return prev;
      }
      playClickSound(prev.soundEnabled);
      const wrongChoices = shuffleArray(
        q.shuffledOptions.filter((opt) => opt !== q.correctAnswer)
      );
      return {
        ...prev,
        eliminatedOptions: wrongChoices.slice(0, 2),
        inventory: {
          ...prev.inventory,
          hintTokens: prev.inventory.hintTokens - 1,
        },
      };
    });
  };

  const handleNextQuestion = () => {
    const completedCount = game.currentIndex + 1;
    const isStageMilestone =
      completedCount < game.deck.length && completedCount % 20 === 0;

    if (isStageMilestone) {
      playStageBonusSound(game.soundEnabled);
      launchAnswerFireworks(true);
      setBonusNotice(
        `🎉 Mərhələ ${completedCount / 20} tamamlandı! Yeni rütbəyə keçdin və +3 Bonus xal qazandın!`
      );
    } else {
      setBonusNotice(null);
    }

    setGame((prev) => {
      if (prev.selectedOption === null) return prev;
      const nextIdx = prev.currentIndex + 1;
      if (nextIdx >= prev.deck.length) {
        playFinishSound(prev.soundEnabled);
        return {
          ...prev,
          screen: 'RESULT',
          selectedOption: null,
          eliminatedOptions: [],
        };
      }
      if (!isStageMilestone) {
        playClickSound(prev.soundEnabled);
      }
      return {
        ...prev,
        currentIndex: nextIdx,
        selectedOption: null,
        eliminatedOptions: [],
        inventory: {
          ...prev.inventory,
          spendablePoints:
            prev.inventory.spendablePoints + (isStageMilestone ? 3 : 0),
        },
      };
    });
  };

  const handleRestartToHome = () => {
    playClickSound(game.soundEnabled);
    setBonusNotice(null);
    setGame((prev) => ({
      ...prev,
      screen: 'HOME',
      deck: [],
      currentIndex: 0,
      selectedOption: null,
      eliminatedOptions: [],
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      streak: 0,
      bestStreak: 0,
      subjectStats: createEmptySubjectStats(),
    }));
  };

  const handleBuyItem = (item: ShopItem) => {
    setGame((prev) => {
      if (prev.inventory.spendablePoints < item.price) return prev;
      if (
        item.category !== 'powerup' &&
        prev.inventory.ownedItemIds.includes(item.id)
      ) {
        return prev;
      }

      playPurchaseSound(prev.soundEnabled);
      const nextPoints = prev.inventory.spendablePoints - item.price;

      if (item.category === 'powerup') {
        return {
          ...prev,
          inventory: {
            ...prev.inventory,
            spendablePoints: nextPoints,
            hintTokens: prev.inventory.hintTokens + 1,
          },
        };
      }

      const nextOwned = [...prev.inventory.ownedItemIds, item.id];
      return {
        ...prev,
        inventory: {
          ...prev.inventory,
          spendablePoints: nextPoints,
          ownedItemIds: nextOwned,
          equippedAvatarId:
            item.category === 'avatar'
              ? item.id
              : prev.inventory.equippedAvatarId,
          equippedTheme:
            item.category === 'theme' && item.themeValue
              ? item.themeValue
              : prev.inventory.equippedTheme,
          superFireworkEnabled:
            item.category === 'effect'
              ? true
              : prev.inventory.superFireworkEnabled,
        },
      };
    });
  };

  const handleEquipAvatar = (avatarId: string | null) => {
    playClickSound(game.soundEnabled);
    setGame((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        equippedAvatarId: avatarId,
      },
    }));
  };

  const handleEquipTheme = (theme: BackdropThemeId) => {
    playClickSound(game.soundEnabled);
    setGame((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        equippedTheme: theme,
      },
    }));
  };

  const handleToggleSuperFirework = () => {
    playClickSound(game.soundEnabled);
    setGame((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        superFireworkEnabled: !prev.inventory.superFireworkEnabled,
      },
    }));
  };

  const avatarEmoji = getAvatarEmoji(game.inventory.equippedAvatarId);
  const hasSavedSession =
    game.deck.length === QUESTION_BANK.length &&
    (game.currentIndex > 0 || game.selectedOption !== null);
  const gradeEval = evaluateGrade(game.score);

  return (
    <>
      {game.screen === 'PLAYING' && game.deck[game.currentIndex] ? (
        <QuizStage
          studentName={game.studentName || 'Şagird'}
          studentClass={game.studentClass}
          gradeLevel={game.gradeLevel}
          question={game.deck[game.currentIndex]}
          questionIndex={game.currentIndex}
          totalQuestions={game.deck.length}
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          selectedOption={game.selectedOption}
          eliminatedOptions={game.eliminatedOptions}
          soundEnabled={game.soundEnabled}
          theme={game.inventory.equippedTheme}
          avatarEmoji={avatarEmoji}
          spendablePoints={game.inventory.spendablePoints}
          hintTokens={game.inventory.hintTokens}
          streak={game.streak}
          bonusNotice={bonusNotice}
          onToggleSound={handleToggleSound}
          onOpenShop={() => setShopOpen(true)}
          onOpenVideos={(track) => handleOpenVideos(track)}
          onUseHint={handleUseHint}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
          onRestartGame={handleRestartToHome}
        />
      ) : game.screen === 'RESULT' ? (
        <ResultScreen
          studentName={game.studentName || 'Şagird'}
          studentClass={game.studentClass}
          gradeLevel={game.gradeLevel}
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalQuestions={game.deck.length || QUESTION_BANK.length}
          subjectStats={game.subjectStats}
          theme={game.inventory.equippedTheme}
          avatarEmoji={avatarEmoji}
          spendablePoints={game.inventory.spendablePoints}
          bestStreak={game.bestStreak}
          onOpenShop={() => setShopOpen(true)}
          onOpenVictoryVideo={() => handleOpenVideos('victory')}
          onRestart={handleRestartToHome}
        />
      ) : (
        <HomeScreen
          initialName={game.studentName}
          initialGrade={game.gradeLevel}
          initialClass={game.studentClass}
          hasSavedSession={hasSavedSession}
          savedQuestionNumber={game.currentIndex + 1}
          savedScore={game.score}
          savedGrade={game.gradeLevel}
          soundEnabled={game.soundEnabled}
          theme={game.inventory.equippedTheme}
          avatarEmoji={avatarEmoji}
          spendablePoints={game.inventory.spendablePoints}
          onToggleSound={handleToggleSound}
          onOpenShop={() => setShopOpen(true)}
          onOpenVideos={(track) => handleOpenVideos(track)}
          onStartNewGame={handleStartNewGame}
          onResumeGame={handleResumeGame}
        />
      )}

      <ShopModal
        isOpen={shopOpen}
        inventory={game.inventory}
        onClose={() => setShopOpen(false)}
        onBuyItem={handleBuyItem}
        onEquipAvatar={handleEquipAvatar}
        onEquipTheme={handleEquipTheme}
        onToggleSuperFirework={handleToggleSuperFirework}
      />

      <VideoStudioModal
        isOpen={videoOpen}
        initialTrack={activeVideoTrack}
        soundEnabled={game.soundEnabled}
        victoryMeta={{
          studentName: game.studentName || 'Gənc Çempion',
          studentClass: `${game.studentClass} (${game.gradeLevel}-ci sinif)`,
          score: game.score,
          totalQuestions: game.deck.length || QUESTION_BANK.length,
          gradeTitle: gradeEval.title,
          avatarEmoji,
        }}
        onToggleSound={handleToggleSound}
        onClose={() => setVideoOpen(false)}
      />
    </>
  );
}
