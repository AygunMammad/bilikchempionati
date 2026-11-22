import React from 'react';
import type { BackdropThemeId } from '../data/shop';

interface PlayfulBackdropProps {
  theme?: BackdropThemeId;
  children: React.ReactNode;
}

/**
 * Uşaqlar üçün şən, rəngarəng temalı arxa fonlar:
 * - sky: Günəşli Səma & Yaşıl Təpələr (Susmaya görə)
 * - ocean: Firuzəyi Dəniz Macərası
 * - space: Ulduzlu Kosmos Səyahəti
 */
export const PlayfulBackdrop: React.FC<PlayfulBackdropProps> = ({
  theme = 'sky',
  children,
}) => {
  if (theme === 'space') {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-indigo-950 via-violet-900 to-slate-900 text-slate-900">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden z-0"
        >
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
          <div className="absolute top-24 right-[-6%] w-[26rem] h-[26rem] rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute bottom-16 left-[15%] w-80 h-80 rounded-full bg-amber-400/15 blur-3xl" />

          {/* Saturn-like Planet */}
          <svg
            viewBox="0 0 180 120"
            className="absolute top-12 left-6 sm:left-14 w-32 sm:w-44 opacity-90 animate-gentle-float"
          >
            <circle cx="90" cy="60" r="34" fill="#F59E0B" />
            <ellipse
              cx="90"
              cy="62"
              rx="68"
              ry="16"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="7"
              transform="rotate(-14 90 62)"
            />
          </svg>

          {/* Crescent Moon */}
          <svg
            viewBox="0 0 100 100"
            className="absolute top-16 right-[8%] w-20 sm:w-24 opacity-90"
          >
            <path
              d="M65 18A32 32 0 1 0 82 70A26 26 0 1 1 65 18Z"
              fill="#FDE047"
            />
          </svg>

          {/* Twinkling Stars */}
          {[
            { top: '22%', left: '28%', delay: '0s', size: 'w-6 h-6' },
            { top: '14%', left: '62%', delay: '1.1s', size: 'w-5 h-5' },
            { top: '42%', left: '8%', delay: '0.6s', size: 'w-7 h-7' },
            { top: '52%', right: '7%', delay: '1.8s', size: 'w-6 h-6' },
            { top: '76%', left: '22%', delay: '0.9s', size: 'w-5 h-5' },
          ].map((s, i) => (
            <svg
              key={i}
              viewBox="0 0 40 40"
              style={{
                top: s.top,
                left: s.left,
                right: s.right,
                animationDelay: s.delay,
              }}
              className={`absolute ${s.size} animate-twinkle`}
            >
              <polygon
                points="20,3 25,14 37,15 28,23 31,35 20,29 9,35 12,23 3,15 15,14"
                fill="#FDE68A"
              />
            </svg>
          ))}
        </div>

        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  if (theme === 'ocean') {
    return (
      <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-cyan-200 via-sky-200 to-teal-200 text-slate-900">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden z-0"
        >
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-yellow-300/35 blur-3xl" />
          <div className="absolute top-16 right-[-6%] w-[26rem] h-[26rem] rounded-full bg-teal-300/35 blur-3xl" />

          {/* Sun */}
          <svg
            viewBox="0 0 140 140"
            className="absolute top-6 left-6 w-24 h-24 sm:w-28 sm:h-28 opacity-90"
          >
            <circle cx="70" cy="70" r="34" fill="#FBBF24" />
            <circle cx="70" cy="70" r="46" fill="#FDE68A" fillOpacity="0.45" />
          </svg>

          {/* Clouds */}
          <svg
            viewBox="0 0 220 95"
            className="absolute top-12 right-[7%] w-40 sm:w-52 opacity-90 animate-cloud-drift"
          >
            <path
              d="M45 78h128c16 0 28-11 28-25 0-13-10-23-23-24-4-16-19-27-37-27-16 0-30 9-36 22-5-3-11-5-18-5-17 0-31 12-33 28-11 2-19 11-19 22 0 11 9 19 20 19z"
              fill="#FFFFFF"
              fillOpacity="0.9"
            />
          </svg>

          {/* Rolling Ocean Waves at Bottom */}
          <svg
            viewBox="0 0 1440 240"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-32 sm:h-44"
          >
            <path
              d="M0,120 C180,60 360,170 540,115 C720,60 900,170 1080,115 C1260,60 1360,130 1440,105 L1440,240 L0,240 Z"
              fill="#38BDF8"
              fillOpacity="0.45"
            />
            <path
              d="M0,160 C220,105 440,210 700,155 C960,100 1200,195 1440,145 L1440,240 L0,240 Z"
              fill="#0284C7"
              fillOpacity="0.45"
            />
          </svg>
        </div>

        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-sky-200 via-cyan-100/90 to-amber-100/80 text-slate-900">
      {/* Decorative Storybook Sky & Hills */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      >
        {/* Warm colorful ambient sky glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-300/35 blur-3xl" />
        <div className="absolute top-16 right-[-6%] w-[26rem] h-[26rem] rounded-full bg-pink-300/25 blur-3xl" />
        <div className="absolute bottom-24 left-[10%] w-80 h-80 rounded-full bg-violet-300/25 blur-3xl" />
        <div className="absolute bottom-16 right-[12%] w-96 h-96 rounded-full bg-emerald-300/25 blur-3xl" />

        {/* Cheerful Sun */}
        <svg
          viewBox="0 0 140 140"
          className="absolute top-6 left-4 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 opacity-90"
        >
          <circle cx="70" cy="70" r="34" fill="#FBBF24" />
          <circle cx="70" cy="70" r="46" fill="#FDE68A" fillOpacity="0.45" />
          <g stroke="#F59E0B" strokeWidth="5" strokeLinecap="round">
            <line x1="70" y1="8" x2="70" y2="22" />
            <line x1="70" y1="118" x2="70" y2="132" />
            <line x1="8" y1="70" x2="22" y2="70" />
            <line x1="118" y1="70" x2="132" y2="70" />
            <line x1="26" y1="26" x2="36" y2="36" />
            <line x1="104" y1="104" x2="114" y2="114" />
            <line x1="114" y1="26" x2="104" y2="36" />
            <line x1="36" y1="104" x2="26" y2="114" />
          </g>
        </svg>

        {/* Fluffy Clouds */}
        <svg
          viewBox="0 0 220 95"
          className="absolute top-12 right-[6%] w-40 sm:w-56 opacity-90 animate-cloud-drift"
        >
          <path
            d="M45 78h128c16 0 28-11 28-25 0-13-10-23-23-24-4-16-19-27-37-27-16 0-30 9-36 22-5-3-11-5-18-5-17 0-31 12-33 28-11 2-19 11-19 22 0 11 9 19 20 19z"
            fill="#FFFFFF"
            fillOpacity="0.88"
          />
        </svg>

        <svg
          viewBox="0 0 200 85"
          className="hidden sm:block absolute top-48 left-[3%] w-44 opacity-80 animate-cloud-drift"
          style={{ animationDelay: '2.5s' }}
        >
          <path
            d="M40 70h116c14 0 25-10 25-22 0-11-9-20-21-21-4-14-17-24-33-24-14 0-27 8-32 19-5-3-10-4-16-4-15 0-28 11-30 24-10 2-17 10-17 19 0 10 8 19 18 19z"
            fill="#FFFFFF"
            fillOpacity="0.82"
          />
        </svg>

        {/* Colorful Floating Stars */}
        <svg
          viewBox="0 0 40 40"
          className="absolute top-32 right-[22%] w-8 h-8 animate-twinkle"
        >
          <polygon
            points="20,3 25,14 37,15 28,23 31,35 20,29 9,35 12,23 3,15 15,14"
            fill="#F59E0B"
            fillOpacity="0.85"
          />
        </svg>

        <svg
          viewBox="0 0 40 40"
          className="hidden md:block absolute top-72 left-[6%] w-7 h-7 animate-twinkle"
          style={{ animationDelay: '1.4s' }}
        >
          <polygon
            points="20,3 25,14 37,15 28,23 31,35 20,29 9,35 12,23 3,15 15,14"
            fill="#EC4899"
            fillOpacity="0.7"
          />
        </svg>

        <svg
          viewBox="0 0 40 40"
          className="hidden md:block absolute top-80 right-[5%] w-9 h-9 animate-twinkle"
          style={{ animationDelay: '0.8s' }}
        >
          <polygon
            points="20,3 25,14 37,15 28,23 31,35 20,29 9,35 12,23 3,15 15,14"
            fill="#8B5CF6"
            fillOpacity="0.65"
          />
        </svg>

        {/* Soft Rainbow Arc */}
        <svg
          viewBox="0 0 420 210"
          className="hidden lg:block absolute top-14 left-1/2 -translate-x-1/2 w-[560px] opacity-30"
        >
          <path
            d="M30 200 A180 180 0 0 1 390 200"
            fill="none"
            stroke="#FB7185"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M46 200 A164 164 0 0 1 374 200"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M62 200 A148 148 0 0 1 358 200"
            fill="none"
            stroke="#34D399"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M78 200 A132 132 0 0 1 342 200"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>

        {/* Rolling Mint & Emerald Meadow Hills at Bottom */}
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-28 sm:h-40"
        >
          <path
            d="M0,120 C240,40 480,170 760,110 C1040,50 1260,140 1440,90 L1440,220 L0,220 Z"
            fill="#A7F3D0"
            fillOpacity="0.65"
          />
          <path
            d="M0,155 C320,95 620,200 960,140 C1180,100 1330,150 1440,130 L1440,220 L0,220 Z"
            fill="#6EE7B7"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      {/* Foreground Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
