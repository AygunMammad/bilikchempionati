import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Download,
  Film,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { playClickSound, playVideoSceneCue } from '../utils/sound';
import {
  getTrackTotalDuration,
  getVideoTrack,
  recordCanvasVideoToWebm,
  renderVideoFrame,
  VIDEO_TRACKS,
  VideoTrackId,
  VictoryVideoMeta,
} from '../utils/videoLessons';

interface VideoStudioModalProps {
  isOpen: boolean;
  initialTrack: VideoTrackId;
  soundEnabled: boolean;
  victoryMeta: VictoryVideoMeta;
  onToggleSound: () => void;
  onClose: () => void;
}

function formatSec(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${mins}:${String(rem).padStart(2, '0')}`;
}

export const VideoStudioModal: React.FC<VideoStudioModalProps> = ({
  isOpen,
  initialTrack,
  soundEnabled,
  victoryMeta,
  onToggleSound,
  onClose,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<VideoTrackId>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [exportProgress, setExportProgress] = useState<number | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastFrameTsRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastSceneIdxRef = useRef(-1);

  useEffect(() => {
    if (isOpen) {
      setSelectedTrack(initialTrack);
      timeRef.current = 0;
      setCurrentTime(0);
      setIsPlaying(true);
      lastSceneIdxRef.current = -1;
      setExportError(null);
    }
  }, [isOpen, initialTrack]);

  const track = useMemo(() => getVideoTrack(selectedTrack), [selectedTrack]);
  const totalDuration = useMemo(() => getTrackTotalDuration(track), [track]);

  const sceneOffsets = useMemo(() => {
    let acc = 0;
    return track.scenes.map((scene) => {
      const start = acc;
      acc += scene.durationSec;
      return { start, end: acc, scene };
    });
  }, [track]);

  const activeSceneIndex = useMemo(() => {
    const idx = sceneOffsets.findIndex(
      (o) => currentTime >= o.start && currentTime < o.end
    );
    return idx >= 0 ? idx : sceneOffsets.length - 1;
  }, [sceneOffsets, currentTime]);

  useEffect(() => {
    if (!isOpen) return;
    if (isPlaying && activeSceneIndex !== lastSceneIdxRef.current) {
      lastSceneIdxRef.current = activeSceneIndex;
      playVideoSceneCue(soundEnabled, activeSceneIndex);
    }
  }, [isOpen, isPlaying, activeSceneIndex, soundEnabled]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    lastFrameTsRef.current = performance.now();

    const drawLoop = (now: number) => {
      const prevTs = lastFrameTsRef.current ?? now;
      const dt = Math.min(0.1, (now - prevTs) / 1000);
      lastFrameTsRef.current = now;

      if (isPlaying) {
        let nextTime = timeRef.current + dt;
        if (nextTime >= totalDuration) {
          nextTime = totalDuration;
          timeRef.current = nextTime;
          setCurrentTime(nextTime);
          setIsPlaying(false);
        } else {
          timeRef.current = nextTime;
          setCurrentTime(nextTime);
        }
      }

      renderVideoFrame(
        ctx,
        canvas.width,
        canvas.height,
        selectedTrack,
        timeRef.current,
        victoryMeta
      );

      rafId = requestAnimationFrame(drawLoop);
    };

    rafId = requestAnimationFrame(drawLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isOpen, isPlaying, selectedTrack, totalDuration, victoryMeta]);

  if (!isOpen) return null;

  const handleSelectTrack = (id: VideoTrackId) => {
    playClickSound(soundEnabled);
    setSelectedTrack(id);
    timeRef.current = 0;
    setCurrentTime(0);
    setIsPlaying(true);
    lastSceneIdxRef.current = -1;
    setExportError(null);
  };

  const handleTogglePlay = () => {
    playClickSound(soundEnabled);
    if (!isPlaying && timeRef.current >= totalDuration - 0.05) {
      timeRef.current = 0;
      setCurrentTime(0);
      lastSceneIdxRef.current = -1;
    }
    setIsPlaying((prev) => !prev);
  };

  const handleRestart = () => {
    playClickSound(soundEnabled);
    timeRef.current = 0;
    setCurrentTime(0);
    lastSceneIdxRef.current = -1;
    setIsPlaying(true);
  };

  const handleSeek = (sec: number) => {
    const clamped = Math.max(0, Math.min(totalDuration - 0.01, sec));
    timeRef.current = clamped;
    setCurrentTime(clamped);
  };

  const handleDownloadVideo = async () => {
    if (exportProgress !== null) return;
    setExportError(null);
    setExportProgress(1);
    try {
      const blob = await recordCanvasVideoToWebm(
        selectedTrack,
        victoryMeta,
        (pct) => setExportProgress(pct)
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const slug =
        selectedTrack === 'victory'
          ? 'Bilik_Cempionu_Qelebe_Klipi'
          : `Bilik_Cempionu_${track.label.replace(/\s+/g, '_')}`;
      a.href = url;
      a.download = `${slug}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (err) {
      setExportError(
        err instanceof Error
          ? err.message
          : 'Video faylı yaradıla bilmədi.'
      );
    } finally {
      setExportProgress(null);
    }
  };

  const progressPct = Math.min(
    100,
    Math.round((currentTime / Math.max(0.1, totalDuration)) * 100)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video Dərslər və Qələbə Klipi"
      className="fixed inset-0 z-50 bg-slate-900/65 flex items-center justify-center p-3 sm:p-4"
    >
      <div className="bg-white border-2 border-sky-200 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-pop-in">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-sky-50 via-indigo-50 to-amber-50 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0">
              <Film className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display truncate">
                Video Dərslər və Qələbə Klipi
              </h2>
              <p className="text-xs text-slate-600 truncate">
                Fənlər üzrə animasiyalı mini-dərsləri izlə və ya qələbə videonu yüklə!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onToggleSound}
              aria-label={soundEnabled ? 'Səsi söndür' : 'Səsi aç'}
              className="min-h-[44px] px-3.5 rounded-full bg-white border border-slate-200 hover:border-sky-300 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-sky-600" aria-hidden="true" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" aria-hidden="true" />
              )}
              <span className="hidden sm:inline">
                {soundEnabled ? 'Səs Açıq' : 'Səs Bağlı'}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Video pəncərəsini bağla"
              className="w-11 h-11 rounded-full hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Subject & Victory Selector */}
          <div className="flex flex-wrap gap-2">
            {VIDEO_TRACKS.map((t) => {
              const active = t.id === selectedTrack;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTrack(t.id)}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold border-2 transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                    active
                      ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300'
                  }`}
                >
                  <span>{t.emoji}</span>
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* 16:9 Canvas Video Stage */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-950 shadow-sm">
            <canvas
              ref={canvasRef}
              width={720}
              height={405}
              onClick={handleTogglePlay}
              className="w-full aspect-video block cursor-pointer"
            />

            {!isPlaying && (
              <button
                type="button"
                onClick={handleTogglePlay}
                aria-label="Videonu oynat"
                className="absolute inset-0 flex items-center justify-center bg-slate-900/35 hover:bg-slate-900/25 transition-colors cursor-pointer"
              >
                <span className="w-16 h-16 rounded-full bg-white text-sky-600 shadow-lg flex items-center justify-center">
                  <Play className="w-8 h-8 fill-sky-600 ml-1" />
                </span>
              </button>
            )}
          </div>

          {/* Player Controls & Download */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleTogglePlay}
                className="min-h-[44px] px-4 rounded-full bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-extrabold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" aria-hidden="true" />
                    <span>Dayandır</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" aria-hidden="true" />
                    <span>Oynat</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleRestart}
                aria-label="Əvvəldən oynat"
                className="min-h-[44px] px-3.5 rounded-full bg-white border border-slate-300 hover:border-sky-400 text-slate-700 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Yenidən</span>
              </button>

              {/* Scrubber */}
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <input
                  type="range"
                  min={0}
                  max={totalDuration}
                  step={0.05}
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  aria-label="Video vaxtı"
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <span className="text-xs font-mono-tabular font-bold text-slate-600 shrink-0">
                  {formatSec(currentTime)} / {formatSec(totalDuration)}
                </span>
              </div>

              <button
                type="button"
                disabled={exportProgress !== null}
                onClick={handleDownloadVideo}
                className="min-h-[44px] px-4 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-extrabold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-70 shrink-0"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>
                  {exportProgress !== null
                    ? `Hazırlanır ${exportProgress}%`
                    : 'Videonu yüklə'}
                </span>
              </button>
            </div>

            {/* Subtle Timeline Bar */}
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 transition-all duration-100"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {exportError && (
              <p className="text-xs font-bold text-rose-600">{exportError}</p>
            )}
          </div>

          {/* Scene Chapter Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sceneOffsets.map(({ start, scene }, idx) => {
              const isCurrent = idx === activeSceneIndex;
              return (
                <button
                  key={scene.title}
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    handleSeek(start + 0.02);
                    setIsPlaying(true);
                  }}
                  className={`text-left p-3.5 rounded-2xl border-2 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-sky-50 border-sky-400'
                      : 'bg-white border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 font-display">
                    {scene.title}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {scene.caption}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
