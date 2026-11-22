import { jsPDF } from 'jspdf';
import { ALL_SUBJECTS } from '../data/questions';
import { SubjectProgressMap } from './grading';

export interface PdfExportPayload {
  studentName: string;
  studentClass: string;
  gradeLevel: 2 | 3;
  score: number;
  correctCount: number;
  wrongCount: number;
  gradeTitle: string;
  congratsMessage: string;
  dateLabel: string;
  subjectStats: SubjectProgressMap;
  trophyImageUrl?: string;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawVectorTrophy(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale = 1
): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // Outer golden glow halo
  ctx.fillStyle = '#fef3c7';
  ctx.beginPath();
  ctx.arc(0, 0, 82, 0, Math.PI * 2);
  ctx.fill();

  // Handles
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(-48, -14, 24, Math.PI * 0.5, Math.PI * 1.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(48, -14, 24, -Math.PI * 0.5, Math.PI * 0.5);
  ctx.stroke();

  // Cup body
  const grad = ctx.createLinearGradient(-45, -50, 45, 30);
  grad.addColorStop(0, '#fde047');
  grad.addColorStop(0.5, '#f59e0b');
  grad.addColorStop(1, '#d97706');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(-48, -48);
  ctx.lineTo(48, -48);
  ctx.quadraticCurveTo(44, 22, 0, 34);
  ctx.quadraticCurveTo(-44, 22, -48, -48);
  ctx.closePath();
  ctx.fill();

  // Rim
  ctx.fillStyle = '#facc15';
  ctx.fillRect(-54, -56, 108, 12);

  // Stem & Base
  ctx.fillStyle = '#d97706';
  ctx.fillRect(-10, 32, 20, 26);
  ctx.fillStyle = '#92400e';
  ctx.fillRect(-36, 58, 72, 16);

  // Star emblem
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 34px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('★', 0, -12);

  ctx.restore();
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

export async function downloadDiplomaPdf(
  payload: PdfExportPayload
): Promise<void> {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const width = 1754;
  const height = 1240;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Warm parchment background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#fffdf5');
  bgGrad.addColorStop(0.5, '#ffffff');
  bgGrad.addColorStop(1, '#f0f7ff');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer cobalt border
  ctx.strokeStyle = '#1d4ed8';
  ctx.lineWidth = 18;
  ctx.strokeRect(38, 38, width - 76, height - 76);

  // Inner gold border
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 6;
  ctx.strokeRect(64, 64, width - 128, height - 128);

  // Hairline inner accent frame
  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 2;
  ctx.strokeRect(82, 82, width - 164, height - 164);

  // Corner stars
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 34px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const [sx, sy] of [
    [118, 118],
    [width - 118, 118],
    [118, height - 118],
    [width - 118, height - 118],
  ]) {
    ctx.fillText('★', sx, sy);
  }

  // Trophy Image or Vector Trophy
  const trophyImg = payload.trophyImageUrl
    ? await loadImage(payload.trophyImageUrl)
    : null;
  if (trophyImg) {
    const imgSize = 190;
    ctx.save();
    ctx.beginPath();
    ctx.arc(width / 2, 205, imgSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(
      trophyImg,
      width / 2 - imgSize / 2,
      205 - imgSize / 2,
      imgSize,
      imgSize
    );
    ctx.restore();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(width / 2, 205, imgSize / 2, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    drawVectorTrophy(ctx, width / 2, 205, 1.05);
  }

  // Main Diploma Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#1e3a8a';
  ctx.font = '800 72px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillText('BİLİK ÇEMPİONU', width / 2, 365);

  ctx.fillStyle = '#b45309';
  ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('FƏXRİ DİPLOM', width / 2, 420);

  // Divider line
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 280, 448);
  ctx.lineTo(width / 2 + 280, 448);
  ctx.stroke();

  // Award text
  ctx.fillStyle = '#475569';
  ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Bu fəxri diplom təqdim edilir:', width / 2, 505);

  // Student Name
  ctx.fillStyle = '#0f172a';
  ctx.font = '800 66px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(payload.studentName, width / 2, 588);

  // Class subtitle
  ctx.fillStyle = '#0369a1';
  ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`${payload.studentClass} şagirdi`, width / 2, 638);

  // Description
  ctx.fillStyle = '#334155';
  ctx.font = '500 26px "Plus Jakarta Sans", sans-serif';
  wrapCanvasText(
    ctx,
    `${payload.gradeLevel}-ci sinif proqramı üzrə 5 fəndən ibarət 100 suallıq Bilik Çempionu yarışmasını uğurla tamamladığına görə təltif olunur.`,
    width / 2,
    702,
    1180,
    38
  );

  // Metrics Box
  const boxX = 270;
  const boxY = 795;
  const boxW = width - 540;
  const boxH = 165;
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(boxX, boxY, boxW, boxH, 24);
  ctx.fill();
  ctx.stroke();

  const col1 = boxX + boxW * 0.22;
  const col2 = boxX + boxW * 0.55;
  const col3 = boxX + boxW * 0.84;

  ctx.fillStyle = '#64748b';
  ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('TOPLADIĞI XAL', col1, boxY + 48);
  ctx.fillText('NƏTİCƏ DƏRƏCƏSİ', col2, boxY + 48);
  ctx.fillText('DÜZGÜN / SƏHV', col3, boxY + 48);

  ctx.fillStyle = '#1d4ed8';
  ctx.font = '800 46px "JetBrains Mono", monospace';
  ctx.fillText(`${payload.score} / 100`, col1, boxY + 112);

  ctx.fillStyle = '#b45309';
  ctx.font = '800 38px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(payload.gradeTitle, col2, boxY + 112);

  ctx.fillStyle = '#047857';
  ctx.font = '700 38px "JetBrains Mono", monospace';
  ctx.fillText(
    `${payload.correctCount} ✓ / ${payload.wrongCount} ✕`,
    col3,
    boxY + 112
  );

  // Footer: Date & Official Stamp
  ctx.textAlign = 'left';
  ctx.fillStyle = '#475569';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Tarix: ${payload.dateLabel}`, 140, 1085);

  // Official Gold Seal on right
  const sealX = width - 250;
  const sealY = 1065;
  ctx.fillStyle = '#fef3c7';
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(sealX, sealY, 64, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#92400e';
  ctx.font = '800 18px "Outfit", sans-serif';
  ctx.fillText('BİLİK', sealX, sealY - 12);
  ctx.fillText('ÇEMPİONU', sealX, sealY + 12);
  ctx.font = '700 16px sans-serif';
  ctx.fillText('★ 100 ★', sealX, sealY + 36);

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });
  pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
  const safeName = payload.studentName
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_\u00C0-\u024F\u0400-\u04FF]/g, '');
  pdf.save(`Bilik_Cempionu_Diplom_${safeName || 'Sagird'}.pdf`);
}

export async function downloadResultReportPdf(
  payload: PdfExportPayload
): Promise<void> {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const width = 1240;
  const height = 1754;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Header Banner
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(0, 0, width, 240);

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.font = '800 54px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillText('BİLİK ÇEMPİONU', 80, 105);

  ctx.fillStyle = '#bfdbfe';
  ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    `${payload.gradeLevel}-ci Sinif Yekun Nəticə Hesabatı`,
    80,
    160
  );

  ctx.textAlign = 'right';
  ctx.fillStyle = '#fde68a';
  ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(payload.dateLabel, width - 80, 158);

  // Student Info Card
  ctx.textAlign = 'left';
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(80, 290, width - 160, 230, 20);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Şagird:', 120, 352);
  ctx.fillText('Sinif:', 120, 412);
  ctx.fillText('Qiymət dərəcəsi:', 120, 472);

  ctx.fillStyle = '#0f172a';
  ctx.font = '800 32px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(payload.studentName, 360, 352);
  ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(payload.studentClass, 360, 412);
  ctx.fillStyle = '#b45309';
  ctx.font = '800 32px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(payload.gradeTitle, 360, 472);

  // Score highlight box inside right side
  ctx.fillStyle = '#eff6ff';
  ctx.strokeStyle = '#93c5fd';
  ctx.beginPath();
  ctx.roundRect(width - 400, 325, 280, 160, 18);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#1e40af';
  ctx.font = '700 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ÜMUMİ XAL', width - 260, 372);
  ctx.font = '800 56px "JetBrains Mono", monospace';
  ctx.fillText(`${payload.score}/100`, width - 260, 444);

  // Correct vs Wrong Summary
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ecfdf5';
  ctx.strokeStyle = '#6ee7b7';
  ctx.beginPath();
  ctx.roundRect(80, 560, 515, 130, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fff1f2';
  ctx.strokeStyle = '#fda4af';
  ctx.beginPath();
  ctx.roundRect(645, 560, 515, 130, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#065f46';
  ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Düzgün cavablar', 120, 612);
  ctx.font = '800 44px "JetBrains Mono", monospace';
  ctx.fillText(`${payload.correctCount} sual`, 120, 665);

  ctx.fillStyle = '#9f1239';
  ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Səhv cavablar', 685, 612);
  ctx.font = '800 44px "JetBrains Mono", monospace';
  ctx.fillText(`${payload.wrongCount} sual`, 685, 665);

  // Subject Breakdown
  ctx.fillStyle = '#0f172a';
  ctx.font = '800 34px "Outfit", "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Fənlər üzrə nəticə', 80, 775);

  let rowY = 820;
  for (const subject of ALL_SUBJECTS) {
    const stat = payload.subjectStats[subject] || { correct: 0, total: 20 };
    const ratio = stat.total > 0 ? stat.correct / stat.total : 0;

    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, rowY, width - 160, 108, 16);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(subject, 115, rowY + 46);

    // Progress bar track
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.roundRect(115, rowY + 68, 760, 18, 9);
    ctx.fill();

    // Progress bar fill
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.roundRect(115, rowY + 68, Math.max(12, 760 * ratio), 18, 9);
    ctx.fill();

    ctx.textAlign = 'right';
    ctx.fillStyle = '#1e3a8a';
    ctx.font = '800 32px "JetBrains Mono", monospace';
    ctx.fillText(`${stat.correct} / ${stat.total}`, width - 115, rowY + 66);

    rowY += 130;
  }

  // Message footer
  ctx.textAlign = 'left';
  ctx.fillStyle = '#f0f9ff';
  ctx.strokeStyle = '#bae6fd';
  ctx.beginPath();
  ctx.roundRect(80, 1500, width - 160, 150, 18);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0c4a6e';
  ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
  wrapCanvasText(
    ctx,
    payload.congratsMessage,
    115,
    1555,
    width - 230,
    38
  );

  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  const safeName = payload.studentName
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_\u00C0-\u024F\u0400-\u04FF]/g, '');
  pdf.save(`Bilik_Cempionu_Netice_${safeName || 'Sagird'}.pdf`);
}
