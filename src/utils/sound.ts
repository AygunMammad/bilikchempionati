let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new Ctx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

function playTone(
  freq: number,
  startOffset: number,
  duration: number,
  type: OscillatorType = 'sine',
  peakGain = 0.14
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + startOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playClickSound(enabled: boolean): void {
  if (!enabled) return;
  try {
    playTone(540, 0, 0.06, 'sine', 0.08);
  } catch {
    // Audio playback optional
  }
}

export function playCorrectSound(enabled: boolean): void {
  if (!enabled) return;
  try {
    playTone(523.25, 0, 0.14, 'triangle', 0.14); // C5
    playTone(659.25, 0.08, 0.16, 'triangle', 0.14); // E5
    playTone(783.99, 0.16, 0.24, 'triangle', 0.15); // G5
  } catch {
    // Audio playback optional
  }
}

export function playWrongSound(enabled: boolean): void {
  if (!enabled) return;
  try {
    playTone(330, 0, 0.16, 'sine', 0.1);
    playTone(261.63, 0.12, 0.22, 'sine', 0.09);
  } catch {
    // Audio playback optional
  }
}

export function playFinishSound(enabled: boolean): void {
  if (!enabled) return;
  try {
    playTone(523.25, 0, 0.15, 'triangle', 0.14);
    playTone(659.25, 0.1, 0.15, 'triangle', 0.14);
    playTone(783.99, 0.2, 0.18, 'triangle', 0.15);
    playTone(1046.5, 0.32, 0.45, 'triangle', 0.16);
  } catch {
    // Audio playback optional
  }
}

export function playPurchaseSound(enabled: boolean): void {
  if (!enabled) return;
  try {
    playTone(659.25, 0, 0.09, 'sine', 0.13);
    playTone(987.77, 0.08, 0.18, 'sine', 0.14);
  } catch {
    // Audio playback optional
  }
}

export function playStageBonusSound(enabled: boolean): void {
  if (!enabled) return;
  try {
    playTone(587.33, 0, 0.11, 'triangle', 0.13);
    playTone(739.99, 0.08, 0.12, 'triangle', 0.13);
    playTone(880, 0.16, 0.22, 'triangle', 0.15);
  } catch {
    // Audio playback optional
  }
}

export function playVideoSceneCue(enabled: boolean, sceneIndex: number): void {
  if (!enabled) return;
  const notes = [523.25, 587.33, 659.25, 783.99];
  const freq = notes[sceneIndex % notes.length];
  try {
    playTone(freq, 0, 0.14, 'sine', 0.07);
    playTone(freq * 1.25, 0.08, 0.18, 'sine', 0.06);
  } catch {
    // Audio playback optional
  }
}

