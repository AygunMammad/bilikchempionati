import type { QuestionSubject } from '../data/questions';

export type VideoTrackId = QuestionSubject | 'victory';

export interface VideoScene {
  title: string;
  caption: string;
  durationSec: number;
}

export interface VideoLessonTrack {
  id: VideoTrackId;
  label: string;
  emoji: string;
  accentHex: string;
  bgTop: string;
  bgBottom: string;
  scenes: VideoScene[];
}

export interface VictoryVideoMeta {
  studentName: string;
  studentClass: string;
  score: number;
  totalQuestions: number;
  gradeTitle: string;
  avatarEmoji: string;
}

export const VIDEO_TRACKS: VideoLessonTrack[] = [
  {
    id: 'Azərbaycan dili – I hissə',
    label: 'Azərbaycan dili',
    emoji: '📘',
    accentHex: '#0284c7',
    bgTop: '#e0f2fe',
    bgBottom: '#bae6fd',
    scenes: [
      {
        title: '1. Qalın və İncə Saitlər',
        caption: 'Qalın saitlər: a, ı, o, u · İncə saitlər: e, ə, i, ö, ü.',
        durationSec: 4,
      },
      {
        title: '2. Hecalara Bölmə',
        caption: 'Sözdə neçə sait varsa, o qədər heca var: ki-tab (2), mək-təb (2).',
        durationSec: 4,
      },
      {
        title: '3. Durğu İşarələri',
        caption: 'Nəqli cümlədə nöqtə (.), sualda (?), hissdə nida (!) qoyulur.',
        durationSec: 4,
      },
      {
        title: '4. Yaxınmənalı və Əksmənalı Sözlər',
        caption: 'Böyük — Kiçik (əks), Gözəl — Göyçək (yaxınmənalı) sözlərdir.',
        durationSec: 4,
      },
    ],
  },
  {
    id: 'Riyaziyyat – I hissə',
    label: 'Riyaziyyat',
    emoji: '🔢',
    accentHex: '#059669',
    bgTop: '#d1fae5',
    bgBottom: '#a7f3d0',
    scenes: [
      {
        title: '1. Vurma Cədvəli Məntiqi',
        caption: '3 qrupda 4 alma varsa: 4 + 4 + 4 = 3 × 4 = 12 alma!',
        durationSec: 4,
      },
      {
        title: '2. Ədəd Oxunda İrəli və Geri',
        caption: 'Toplamada sağa irəliləyirik (+), çıxmada sola qayıdırıq (−).',
        durationSec: 4,
      },
      {
        title: '3. Həndəsi Fiqurlar',
        caption: 'Üçbucağın 3 tərəfi, kvadratın isə 4 bərabər tərəfi var.',
        durationSec: 4,
      },
      {
        title: '4. Zaman və Ölçü Vahidləri',
        caption: '1 saat = 60 dəqiqə · 1 metr = 100 santimetrdir.',
        durationSec: 4,
      },
    ],
  },
  {
    id: 'Həyat bilgisi',
    label: 'Həyat bilgisi',
    emoji: '🌍',
    accentHex: '#d97706',
    bgTop: '#fef3c7',
    bgBottom: '#fde68a',
    scenes: [
      {
        title: '1. Yer və Günəş Sistemi',
        caption: 'Yer kürəsi öz oxu ətrafında 24 saata, Günəş ətrafında 1 ilə fırlanır.',
        durationSec: 4,
      },
      {
        title: '2. Svetofor Qaydaları',
        caption: 'Qırmızı — Dayan! Sarı — Hazırlaş! Yaşıl — Yolu keç!',
        durationSec: 4,
      },
      {
        title: '3. Təbiəti Qoruyaq',
        caption: 'Ağaclar havamızı təmizləyir, suya və meşəyə qayğı göstərək.',
        durationSec: 4,
      },
      {
        title: '4. Sağlam Həyat Tərzi',
        caption: 'Hər gün meyvə-tərəvəz ye, dişlərini fırçala və idman et!',
        durationSec: 4,
      },
    ],
  },
  {
    id: 'Alqoritm',
    label: 'Alqoritm',
    emoji: '🤖',
    accentHex: '#7c3aed',
    bgTop: '#ede9fe',
    bgBottom: '#ddd6fe',
    scenes: [
      {
        title: '1. Ardıcıl Addımlar',
        caption: 'Alqoritm məqsədə çatmaq üçün düzgün ardıcıl addımlar planıdır.',
        durationSec: 4,
      },
      {
        title: '2. Robot Labirintdə',
        caption: 'İrəli → İrəli → Sağa dön → Ulduzu götür! Hər addım dəqiq olmalıdır.',
        durationSec: 4,
      },
      {
        title: '3. Şərt Bloku (ƏGƏR)',
        caption: 'ƏGƏR yağış yağırsa → Çətir aç, YOXSA → Günəş eynəyi tax!',
        durationSec: 4,
      },
      {
        title: '4. Dövr və Ardıcıllıq',
        caption: '2, 4, 6, 8, ... Hər addımda +2 artan nümunəni davam etdir!',
        durationSec: 4,
      },
    ],
  },
  {
    id: 'İngilis dili',
    label: 'İngilis dili',
    emoji: '🇬🇧',
    accentHex: '#e11d48',
    bgTop: '#ffe4e6',
    bgBottom: '#fecdd3',
    scenes: [
      {
        title: '1. Salamlaşma Sözləri',
        caption: 'Hello! (Salam) · Good morning! (Sabahın xeyir!) · Bye! (Sağ ol!)',
        durationSec: 4,
      },
      {
        title: '2. Rənglər (Colors)',
        caption: 'Red (Qırmızı) · Blue (Mavi) · Yellow (Sarı) · Green (Yaşıl).',
        durationSec: 4,
      },
      {
        title: '3. Heyvanlar (Animals)',
        caption: 'Cat (Pişik 🐱) · Dog (İt 🐶) · Bird (Quş 🐦) · Owl (Bayquş 🦉).',
        durationSec: 4,
      },
      {
        title: '4. Rəqəmlər (Numbers)',
        caption: 'One (1) · Two (2) · Three (3) · Four (4) · Five (5)!',
        durationSec: 4,
      },
    ],
  },
  {
    id: 'victory',
    label: 'Qələbə Klipi',
    emoji: '🏆',
    accentHex: '#b45309',
    bgTop: '#1e1b4b',
    bgBottom: '#312e81',
    scenes: [
      {
        title: '1. Parlaq Ulduzların Uçuşu',
        caption: 'Sən bilik yolunda bütün çətinlikləri aşdın!',
        durationSec: 4,
      },
      {
        title: '2. Qızıl Kubok Mərasimi',
        caption: 'Bilik Çempionu kuboku sənin əzmkarlığını alqışlayır!',
        durationSec: 4,
      },
      {
        title: '3. Fişəng Şousu',
        caption: 'Göy üzü sənin qələbən üçün rəngarəng işıqlarla dolur!',
        durationSec: 4,
      },
    ],
  },
];

export function getVideoTrack(trackId: VideoTrackId): VideoLessonTrack {
  return (
    VIDEO_TRACKS.find((t) => t.id === trackId) || VIDEO_TRACKS[0]
  );
}

export function getTrackTotalDuration(track: VideoLessonTrack): number {
  return track.scenes.reduce((sum, s) => sum + s.durationSec, 0);
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.closePath();
}

function drawCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  stroke?: string
) {
  drawRoundedRect(ctx, x, y, w, h, 20);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

export function renderVideoFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  trackId: VideoTrackId,
  elapsedSec: number,
  victoryMeta: VictoryVideoMeta
): void {
  const track = getVideoTrack(trackId);
  const totalDur = getTrackTotalDuration(track);
  const clamped = Math.max(0, Math.min(elapsedSec, totalDur - 0.001));

  // Locate current scene
  let acc = 0;
  let sceneIndex = 0;
  let sceneTime = 0;
  for (let i = 0; i < track.scenes.length; i++) {
    const dur = track.scenes[i].durationSec;
    if (clamped < acc + dur || i === track.scenes.length - 1) {
      sceneIndex = i;
      sceneTime = Math.max(0, Math.min(1, (clamped - acc) / dur));
      break;
    }
    acc += dur;
  }
  const activeScene = track.scenes[sceneIndex];

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, track.bgTop);
  grad.addColorStop(1, track.bgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Soft background bubbles
  const isVictory = trackId === 'victory';
  for (let i = 0; i < 7; i++) {
    const bx = ((i * 127 + elapsedSec * 18) % (width + 80)) - 40;
    const by = 60 + ((i * 63) % (height - 140)) + Math.sin(elapsedSec * 2 + i) * 10;
    ctx.beginPath();
    ctx.arc(bx, by, 14 + (i % 3) * 10, 0, Math.PI * 2);
    ctx.fillStyle = isVictory
      ? 'rgba(253, 224, 71, 0.14)'
      : 'rgba(255, 255, 255, 0.35)';
    ctx.fill();
  }

  // Top Pill-free Header Strip
  ctx.fillStyle = isVictory ? 'rgba(15, 23, 42, 0.55)' : 'rgba(255, 255, 255, 0.88)';
  ctx.fillRect(0, 0, width, 54);
  ctx.fillStyle = isVictory ? '#fde047' : track.accentHex;
  ctx.font = 'bold 20px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${track.emoji} ${track.label}`, 24, 27);

  ctx.fillStyle = isVictory ? '#e2e8f0' : '#334155';
  ctx.font = 'bold 16px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(activeScene.title, width - 24, 27);

  // Scene Canvas Body (between y=64 and y=330)
  const midX = width / 2;
  const midY = 198;

  if (trackId === 'Azərbaycan dili – I hissə') {
    if (sceneIndex === 0) {
      // Qalın vs İncə saitlər
      drawCard(ctx, 56, 86, 284, 210, '#ffffff', '#0284c7');
      drawCard(ctx, 380, 86, 284, 210, '#ffffff', '#db2777');
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0369a1';
      ctx.font = 'bold 22px "Outfit", sans-serif';
      ctx.fillText('Qalın Saitlər', 198, 124);
      ctx.fillStyle = '#be185d';
      ctx.fillText('İncə Saitlər', 522, 124);

      const thick = ['A', 'I', 'O', 'U'];
      const thin = ['E', 'Ə', 'İ', 'Ö', 'Ü'];
      thick.forEach((ch, idx) => {
        const bounce = Math.sin(elapsedSec * 4 + idx) * 6;
        const cx = 104 + idx * 62;
        const cy = 200 + bounce;
        ctx.beginPath();
        ctx.arc(cx, cy, 24, 0, Math.PI * 2);
        ctx.fillStyle = '#e0f2fe';
        ctx.fill();
        ctx.fillStyle = '#0c4a6e';
        ctx.font = 'bold 24px "Outfit", sans-serif';
        ctx.fillText(ch, cx, cy + 2);
      });
      thin.forEach((ch, idx) => {
        const bounce = Math.cos(elapsedSec * 4 + idx) * 6;
        const cx = 420 + idx * 51;
        const cy = 200 + bounce;
        ctx.beginPath();
        ctx.arc(cx, cy, 22, 0, Math.PI * 2);
        ctx.fillStyle = '#fce7f3';
        ctx.fill();
        ctx.fillStyle = '#831843';
        ctx.font = 'bold 22px "Outfit", sans-serif';
        ctx.fillText(ch, cx, cy + 2);
      });
    } else if (sceneIndex === 1) {
      // Heca split animation
      const splitGap = Math.min(1, sceneTime * 1.6) * 34;
      drawCard(ctx, midX - 240 - splitGap / 2, 118, 200, 130, '#ffffff', '#0284c7');
      drawCard(ctx, midX + 40 + splitGap / 2, 118, 200, 130, '#ffffff', '#10b981');
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0369a1';
      ctx.font = 'bold 46px "Outfit", sans-serif';
      ctx.fillText('Kİ', midX - 140 - splitGap / 2, 178);
      ctx.fillStyle = '#047857';
      ctx.fillText('TAB', midX + 140 + splitGap / 2, 178);
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('2 sait (i, a) = 2 heca', midX, 286);
    } else if (sceneIndex === 2) {
      // Durğu işarələri
      const items = [
        { sym: '.', name: 'Nöqtə', color: '#0284c7' },
        { sym: '?', name: 'Sual', color: '#d97706' },
        { sym: '!', name: 'Nida', color: '#e11d48' },
      ];
      items.forEach((it, idx) => {
        const scale = 1 + Math.sin(elapsedSec * 5 + idx * 1.4) * 0.08;
        const cx = 160 + idx * 200;
        drawCard(ctx, cx - 72, 102, 144, 170, '#ffffff', it.color);
        ctx.save();
        ctx.translate(cx, 174);
        ctx.scale(scale, scale);
        ctx.textAlign = 'center';
        ctx.fillStyle = it.color;
        ctx.font = 'bold 72px "Outfit", sans-serif';
        ctx.fillText(it.sym, 0, 0);
        ctx.restore();
        ctx.textAlign = 'center';
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 20px "Outfit", sans-serif';
        ctx.fillText(it.name, cx, 244);
      });
    } else {
      // Əksmənalı sözlər
      const floatY = Math.sin(elapsedSec * 3.5) * 6;
      drawCard(ctx, 88, 114 + floatY, 220, 148, '#ffffff', '#0284c7');
      drawCard(ctx, 412, 114 - floatY, 220, 148, '#ffffff', '#f59e0b');
      ctx.textAlign = 'center';
      ctx.fillStyle = '#0369a1';
      ctx.font = 'bold 34px "Outfit", sans-serif';
      ctx.fillText('🐘 Böyük', 198, 188 + floatY);
      ctx.fillStyle = '#b45309';
      ctx.fillText('🐜 Kiçik', 522, 188 - floatY);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 34px "Outfit", sans-serif';
      ctx.fillText('⇄', midX, 188);
    }
  } else if (trackId === 'Riyaziyyat – I hissə') {
    if (sceneIndex === 0) {
      // 3 x 4 apples
      drawCard(ctx, 48, 86, width - 96, 212, 'rgba(255,255,255,0.92)', '#059669');
      const visibleGroups = Math.min(3, Math.floor(sceneTime * 3.4) + 1);
      for (let g = 0; g < 3; g++) {
        const gx = 100 + g * 195;
        ctx.globalAlpha = g < visibleGroups ? 1 : 0.2;
        drawRoundedRect(ctx, gx, 108, 145, 118, 16);
        ctx.fillStyle = '#ecfdf5';
        ctx.fill();
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🍎 🍎', gx + 72, 148);
        ctx.fillText('🍎 🍎', gx + 72, 192);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 30px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('3 × 4 = 12', midX, 266);
    } else if (sceneIndex === 1) {
      // Number line jump
      drawCard(ctx, 48, 96, width - 96, 194, '#ffffff', '#059669');
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(96, 216);
      ctx.lineTo(width - 96, 216);
      ctx.stroke();
      for (let n = 0; n <= 8; n++) {
        const nx = 110 + n * 62;
        ctx.beginPath();
        ctx.moveTo(nx, 204);
        ctx.lineTo(nx, 228);
        ctx.stroke();
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 18px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(n), nx, 254);
      }
      const jumpX = 110 + Math.min(6, sceneTime * 6.5) * 62;
      const arcH = Math.abs(Math.sin(sceneTime * Math.PI * 3)) * 52;
      ctx.beginPath();
      ctx.arc(jumpX, 190 - arcH, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 24px "Outfit", sans-serif';
      ctx.fillText('2 + 4 = 6', midX, 134);
    } else if (sceneIndex === 2) {
      // Geometric shapes
      const angle = elapsedSec * 0.9;
      // Triangle
      drawCard(ctx, 64, 96, 180, 192, '#ffffff', '#059669');
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(154, 124);
      ctx.lineTo(104, 214);
      ctx.lineTo(204, 214);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 18px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Üçbucaq (3)', 154, 256);

      // Square rotating subtly
      drawCard(ctx, 270, 96, 180, 192, '#ffffff', '#059669');
      ctx.save();
      ctx.translate(360, 174);
      ctx.rotate(Math.sin(angle) * 0.15);
      ctx.fillStyle = '#0ea5e9';
      ctx.fillRect(-38, -38, 76, 76);
      ctx.restore();
      ctx.fillStyle = '#1e293b';
      ctx.fillText('Kvadrat (4)', 360, 256);

      // Circle
      drawCard(ctx, 476, 96, 180, 192, '#ffffff', '#059669');
      ctx.beginPath();
      ctx.arc(566, 174, 42 + Math.sin(elapsedSec * 3) * 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ec4899';
      ctx.fill();
      ctx.fillStyle = '#1e293b';
      ctx.fillText('Dairə', 566, 256);
    } else {
      // Clock & Meter
      drawCard(ctx, 84, 98, 250, 192, '#ffffff', '#059669');
      drawCard(ctx, 386, 98, 250, 192, '#ffffff', '#0284c7');
      ctx.beginPath();
      ctx.arc(209, 172, 46, 0, Math.PI * 2);
      ctx.fillStyle = '#ecfdf5';
      ctx.fill();
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 4;
      ctx.stroke();
      const handAngle = elapsedSec * 3;
      ctx.beginPath();
      ctx.moveTo(209, 172);
      ctx.lineTo(209 + Math.cos(handAngle) * 32, 172 + Math.sin(handAngle) * 32);
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 20px "Outfit", sans-serif';
      ctx.fillText('1 saat = 60 dəq', 209, 254);

      ctx.fillStyle = '#0369a1';
      ctx.font = 'bold 34px "JetBrains Mono", monospace';
      ctx.fillText('📏 1 m', 511, 166);
      ctx.font = 'bold 22px "Outfit", sans-serif';
      ctx.fillText('= 100 sm', 511, 224);
    }
  } else if (trackId === 'Həyat bilgisi') {
    if (sceneIndex === 0) {
      // Sun & Earth Orbit
      drawCard(ctx, 56, 86, width - 112, 212, '#0f172a', '#f59e0b');
      ctx.beginPath();
      ctx.arc(midX, midY, 36, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(midX, midY, 175, 68, 0, 0, Math.PI * 2);
      ctx.stroke();
      const orbitA = elapsedSec * 1.8;
      const ex = midX + Math.cos(orbitA) * 175;
      const ey = midY + Math.sin(orbitA) * 68;
      ctx.beginPath();
      ctx.arc(ex, ey, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex - 4, ey - 3, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#22c55e';
      ctx.fill();
    } else if (sceneIndex === 1) {
      // Traffic Light
      drawCard(ctx, midX - 65, 86, 130, 218, '#1e293b', '#f59e0b');
      const lightPhase = Math.floor(sceneTime * 3) % 3;
      const lights = [
        { y: 126, color: '#ef4444', label: 'DAYAN' },
        { y: 194, color: '#facc15', label: 'HAZIRLAŞ' },
        { y: 262, color: '#22c55e', label: 'KEÇ' },
      ];
      lights.forEach((l, idx) => {
        ctx.beginPath();
        ctx.arc(midX, l.y, 24, 0, Math.PI * 2);
        ctx.fillStyle = idx === lightPhase ? l.color : '#334155';
        ctx.fill();
      });
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 28px "Outfit", sans-serif';
      ctx.fillText(lights[lightPhase].label, midX + 95, lights[lightPhase].y);
    } else if (sceneIndex === 2) {
      // Growing Tree
      drawCard(ctx, 84, 88, width - 168, 210, '#ffffff', '#10b981');
      const treeScale = 0.55 + sceneTime * 0.55;
      ctx.save();
      ctx.translate(midX, 274);
      ctx.scale(treeScale, treeScale);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(-14, -90, 28, 90);
      ctx.beginPath();
      ctx.arc(0, -110, 56, 0, Math.PI * 2);
      ctx.fillStyle = '#16a34a';
      ctx.fill();
      ctx.restore();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 18px "Outfit", sans-serif';
      ctx.fillText('🌿 Təbiəti sevək və qoruyaq!', midX, 118);
    } else {
      // Healthy food icons
      const icons = ['🍎', '🥕', '🥛', '🪥', '🏃'];
      icons.forEach((ic, idx) => {
        const y = 186 + Math.sin(elapsedSec * 4 + idx) * 14;
        const x = 140 + idx * 110;
        ctx.beginPath();
        ctx.arc(x, y, 36, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.font = '38px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ic, x, y + 3);
      });
    }
  } else if (trackId === 'Alqoritm') {
    if (sceneIndex === 0 || sceneIndex === 1) {
      // Robot moving across grid toward star
      drawCard(ctx, 110, 88, 500, 206, '#ffffff', '#7c3aed');
      for (let c = 0; c < 4; c++) {
        const cx = 145 + c * 112;
        drawRoundedRect(ctx, cx, 128, 92, 92, 16);
        ctx.fillStyle = c === 3 ? '#fef3c7' : '#f5f3ff';
        ctx.fill();
        ctx.strokeStyle = '#c4b5fd';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.font = '42px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⭐', 145 + 3 * 112 + 46, 176);
      const stepPos = Math.min(3, sceneTime * 3.4);
      const rx = 145 + stepPos * 112 + 46;
      ctx.fillText('🤖', rx, 176);
      ctx.fillStyle = '#5b21b6';
      ctx.font = 'bold 18px "JetBrains Mono", monospace';
      ctx.fillText('Addım 1 → Addım 2 → Addım 3 → Ulduz!', midX, 260);
    } else if (sceneIndex === 2) {
      // Conditional branch
      drawCard(ctx, midX - 180, 86, 360, 62, '#ede9fe', '#7c3aed');
      ctx.textAlign = 'center';
      ctx.fillStyle = '#4c1d95';
      ctx.font = 'bold 20px "Outfit", sans-serif';
      ctx.fillText('ƏGƏR yağış yağırsa?', midX, 117);

      const leftActive = Math.floor(elapsedSec) % 2 === 0;
      drawCard(ctx, 96, 184, 240, 100, leftActive ? '#dbeafe' : '#ffffff', '#0284c7');
      drawCard(ctx, 384, 184, 240, 100, !leftActive ? '#fef3c7' : '#ffffff', '#d97706');
      ctx.fillStyle = '#0369a1';
      ctx.fillText('🌧️ Bəli: Çətir aç!', 216, 234);
      ctx.fillStyle = '#b45309';
      ctx.fillText('☀️ Xeyr: Eynək tax!', 504, 234);
    } else {
      // Pattern 2, 4, 6, 8
      const nums = ['2', '4', '6', '8', '?'];
      nums.forEach((n, idx) => {
        const active = idx === Math.floor(sceneTime * 5);
        const x = 136 + idx * 112;
        drawCard(
          ctx,
          x - 42,
          136,
          84,
          104,
          active ? '#7c3aed' : '#ffffff',
          '#7c3aed'
        );
        ctx.textAlign = 'center';
        ctx.fillStyle = active ? '#ffffff' : '#4c1d95';
        ctx.font = 'bold 34px "JetBrains Mono", monospace';
        ctx.fillText(n === '?' && sceneTime > 0.7 ? '10' : n, x, 188);
      });
    }
  } else if (trackId === 'İngilis dili') {
    const decks = [
      [
        { top: 'Hello!', sub: 'Salam', icon: '👋' },
        { top: 'Good morning!', sub: 'Sabahın xeyir!', icon: '🌅' },
      ],
      [
        { top: 'Red', sub: 'Qırmızı', icon: '🍎' },
        { top: 'Blue', sub: 'Mavi', icon: '💙' },
        { top: 'Green', sub: 'Yaşıl', icon: '🍏' },
      ],
      [
        { top: 'Cat', sub: 'Pişik', icon: '🐱' },
        { top: 'Dog', sub: 'İt', icon: '🐶' },
        { top: 'Owl', sub: 'Bayquş', icon: '🦉' },
      ],
      [
        { top: 'One · 1', sub: 'Bir', icon: '1️⃣' },
        { top: 'Two · 2', sub: 'İki', icon: '2️⃣' },
        { top: 'Three · 3', sub: 'Üç', icon: '3️⃣' },
      ],
    ];
    const cards = decks[sceneIndex] || decks[0];
    const cardW = cards.length === 2 ? 250 : 185;
    const gap = 24;
    const totalW = cards.length * cardW + (cards.length - 1) * gap;
    const startX = (width - totalW) / 2;

    cards.forEach((c, idx) => {
      const bounce = Math.sin(elapsedSec * 4 + idx) * 6;
      const x = startX + idx * (cardW + gap);
      drawCard(ctx, x, 96 + bounce, cardW, 192, '#ffffff', '#e11d48');
      ctx.textAlign = 'center';
      ctx.font = '46px sans-serif';
      ctx.fillText(c.icon, x + cardW / 2, 152 + bounce);
      ctx.fillStyle = '#be123c';
      ctx.font = 'bold 24px "Outfit", sans-serif';
      ctx.fillText(c.top, x + cardW / 2, 212 + bounce);
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 17px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(c.sub, x + cardW / 2, 248 + bounce);
    });
  } else {
    // VICTORY CELEBRATION VIDEO
    // Animated fireworks bursts
    const bursts = [
      { cx: 145, cy: 135, color: '#f43f5e', offset: 0 },
      { cx: 575, cy: 125, color: '#38bdf8', offset: 0.45 },
      { cx: 210, cy: 235, color: '#34d399', offset: 0.9 },
      { cx: 515, cy: 245, color: '#facc15', offset: 1.3 },
    ];
    bursts.forEach((b) => {
      const localT = (elapsedSec + b.offset) % 1.8;
      const radius = localT * 46;
      const alpha = Math.max(0, 1 - localT / 1.8);
      ctx.save();
      ctx.globalAlpha = alpha;
      for (let p = 0; p < 10; p++) {
        const a = (Math.PI * 2 * p) / 10;
        ctx.beginPath();
        ctx.arc(b.cx + Math.cos(a) * radius, b.cy + Math.sin(a) * radius, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      }
      ctx.restore();
    });

    // Central Champion Banner Card
    const cardScale = 0.96 + Math.sin(elapsedSec * 3) * 0.025;
    ctx.save();
    ctx.translate(midX, 192);
    ctx.scale(cardScale, cardScale);
    drawCard(ctx, -205, -106, 410, 212, 'rgba(255,255,255,0.96)', '#fbbf24');
    ctx.textAlign = 'center';
    ctx.font = '46px sans-serif';
    ctx.fillText(`${victoryMeta.avatarEmoji} 🏆`, 0, -52);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 26px "Outfit", sans-serif';
    ctx.fillText(victoryMeta.studentName || 'Bilik Çempionu', 0, -2);
    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(victoryMeta.studentClass, 0, 28);
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillText(
      `${victoryMeta.score} / ${victoryMeta.totalQuestions} · ${victoryMeta.gradeTitle}`,
      0,
      66
    );
    ctx.restore();
  }

  // Bottom Subtitle Bar
  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.fillRect(0, height - 66, width, 66);
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 17px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(activeScene.caption, midX, height - 33);
}

export async function recordCanvasVideoToWebm(
  trackId: VideoTrackId,
  victoryMeta: VictoryVideoMeta,
  onProgress: (percent: number) => void
): Promise<Blob> {
  if (
    typeof MediaRecorder === 'undefined' ||
    typeof HTMLCanvasElement.prototype.captureStream !== 'function'
  ) {
    throw new Error('Brauzeriniz video qeydini dəstəkləmir.');
  }

  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 405;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas konteksti açıla bilmədi.');
  }

  const track = getVideoTrack(trackId);
  const totalDur = getTrackTotalDuration(track);

  const mimeCandidates = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ];
  const supportedMime =
    mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || '';

  const stream = canvas.captureStream(30);
  const recorder = supportedMime
    ? new MediaRecorder(stream, { mimeType: supportedMime, videoBitsPerSecond: 2_500_000 })
    : new MediaRecorder(stream);

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (ev) => {
    if (ev.data && ev.data.size > 0) chunks.push(ev.data);
  };

  return new Promise<Blob>((resolve, reject) => {
    let rafId = 0;
    const startedAt = performance.now();

    recorder.onerror = () => {
      cancelAnimationFrame(rafId);
      reject(new Error('Video faylı hazırlanarkən xəta baş verdi.'));
    };

    recorder.onstop = () => {
      cancelAnimationFrame(rafId);
      onProgress(100);
      resolve(new Blob(chunks, { type: supportedMime || 'video/webm' }));
    };

    recorder.start(200);

    const step = (now: number) => {
      const elapsedSec = (now - startedAt) / 1000;
      renderVideoFrame(ctx, canvas.width, canvas.height, trackId, elapsedSec, victoryMeta);
      onProgress(Math.min(99, Math.round((elapsedSec / totalDur) * 100)));

      if (elapsedSec >= totalDur) {
        if (recorder.state !== 'inactive') {
          recorder.stop();
        }
        return;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
  });
}
