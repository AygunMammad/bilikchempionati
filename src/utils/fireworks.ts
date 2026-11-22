import confetti from 'canvas-confetti';

/**
 * Hər doğru cavabda ekranda canlı fişəng partlayışı yaradır.
 * "Super Fişəng" mağaza effekti aktivdirsə, əlavə ulduzlu dalğalar da atılır.
 */
export function launchAnswerFireworks(superMode = false): void {
  if (typeof window === 'undefined') return;
  const prefersReduced = window.matchMedia?.(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReduced) return;

  try {
    const colors = superMode
      ? ['#fbbf24', '#ec4899', '#38bdf8', '#34d399', '#a855f7', '#fb7185']
      : ['#fbbf24', '#38bdf8', '#34d399', '#f43f5e'];

    // Center-left upward firework shell
    confetti({
      particleCount: superMode ? 65 : 42,
      angle: 68,
      spread: 58,
      startVelocity: 46,
      gravity: 0.9,
      ticks: 130,
      origin: { x: 0.25, y: 0.72 },
      colors,
      shapes: superMode ? ['star', 'circle'] : ['circle'],
      scalar: superMode ? 1.15 : 1.0,
    });

    // Center-right upward firework shell
    confetti({
      particleCount: superMode ? 65 : 42,
      angle: 112,
      spread: 58,
      startVelocity: 46,
      gravity: 0.9,
      ticks: 130,
      origin: { x: 0.75, y: 0.72 },
      colors,
      shapes: superMode ? ['star', 'circle'] : ['circle'],
      scalar: superMode ? 1.15 : 1.0,
    });

    // High sky starburst
    window.setTimeout(() => {
      confetti({
        particleCount: superMode ? 70 : 40,
        spread: 360,
        startVelocity: superMode ? 32 : 24,
        gravity: 0.75,
        ticks: 110,
        origin: { x: 0.5, y: 0.28 },
        colors,
        shapes: ['star', 'circle'],
        scalar: superMode ? 1.2 : 0.95,
      });
    }, 160);
  } catch {
    // Ignore confetti errors in restricted environments
  }
}
