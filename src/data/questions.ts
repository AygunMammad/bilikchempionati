import { GRADE_3_QUESTIONS } from './questionsGrade3';

export type GradeLevel = 2 | 3;

export type QuestionSubject =
  | 'Azərbaycan dili – I hissə'
  | 'Riyaziyyat – I hissə'
  | 'Həyat bilgisi'
  | 'Alqoritm'
  | 'İngilis dili';

export interface QuizQuestion {
  id: number;
  subject: QuestionSubject;
  emoji: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
}

export interface DeckQuestion extends QuizQuestion {
  shuffledOptions: [string, string, string, string];
}

export const ALL_SUBJECTS: QuestionSubject[] = [
  'Azərbaycan dili – I hissə',
  'Riyaziyyat – I hissə',
  'Həyat bilgisi',
  'Alqoritm',
  'İngilis dili',
];

export const SUBJECT_META: Record<
  QuestionSubject,
  { emoji: string; accentText: string; barColor: string }
> = {
  'Azərbaycan dili – I hissə': {
    emoji: '📖',
    accentText: 'text-sky-700',
    barColor: 'bg-sky-500',
  },
  'Riyaziyyat – I hissə': {
    emoji: '🔢',
    accentText: 'text-amber-700',
    barColor: 'bg-amber-500',
  },
  'Həyat bilgisi': {
    emoji: '🌳',
    accentText: 'text-emerald-700',
    barColor: 'bg-emerald-500',
  },
  Alqoritm: {
    emoji: '🤖',
    accentText: 'text-violet-700',
    barColor: 'bg-violet-500',
  },
  'İngilis dili': {
    emoji: '🇬🇧',
    accentText: 'text-rose-700',
    barColor: 'bg-rose-500',
  },
};

/**
 * 2-ci sinif şagirdləri üçün 5 bölmə üzrə 100 unikal sual:
 * - Azərbaycan dili – I hissə: 20 sual (1–20)
 * - Riyaziyyat – I hissə: 20 sual (21–40)
 * - Həyat bilgisi: 20 sual (41–60)
 * - Alqoritm: 20 sual (61–80)
 * - İngilis dili: 20 sual (81–100)
 */
export const QUESTION_BANK: QuizQuestion[] = [
  // =========================================================
  // 📖 AZƏRBAYCAN DİLİ – I HİSSƏ (1 - 20)
  // =========================================================
  {
    id: 1,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Azərbaycan əlifbasında neçə hərf var?',
    options: ['32', '28', '30', '34'],
    correctAnswer: '32',
  },
  {
    id: 2,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Azərbaycan dilində neçə sait səs var?',
    options: ['9', '7', '11', '23'],
    correctAnswer: '9',
  },
  {
    id: 3,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: '"Məktəb" sözündə neçə heca var?',
    options: ['2', '3', '1', '4'],
    correctAnswer: '2',
  },
  {
    id: 4,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: '"Böyük" sözünün əks mənası hansıdır?',
    options: ['Kiçik', 'Uca', 'Geniş', 'Ağır'],
    correctAnswer: 'Kiçik',
  },
  {
    id: 5,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Hansı söz sait səslə başlayır?',
    options: ['Alma', 'Kitab', 'Dəftər', 'Qələm'],
    correctAnswer: 'Alma',
  },
  {
    id: 6,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: '"Gözəl" sözünə yaxınmənalı söz hansıdır?',
    options: ['Qəşəng', 'Çirkin', 'Soyuq', 'Uzun'],
    correctAnswer: 'Qəşəng',
  },
  {
    id: 7,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Sual cümləsinin sonunda hansı durğu işarəsi qoyulur?',
    options: ['Sual işarəsi (?)', 'Nöqtə (.)', 'Vergül (,)', 'Nida işarəsi (!)'],
    correctAnswer: 'Sual işarəsi (?)',
  },
  {
    id: 8,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Hansı söz hərəkət bildirir ("Nə edir?")?',
    options: ['Oxuyur', 'Mavi', 'Lövhə', 'Şirin'],
    correctAnswer: 'Oxuyur',
  },
  {
    id: 9,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: '"Kəpənək" sözündə neçə heca var?',
    options: ['3', '2', '4', '1'],
    correctAnswer: '3',
  },
  {
    id: 10,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: '"Ağ" sözünün əks mənası hansıdır?',
    options: ['Qara', 'Sarı', 'Təmiz', 'İşıqlı'],
    correctAnswer: 'Qara',
  },
  {
    id: 11,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Hansı söz "Kim?" sualına cavab verir?',
    options: ['Müəllim', 'Qələm', 'Masa', 'Ağac'],
    correctAnswer: 'Müəllim',
  },
  {
    id: 12,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: '"Vətən" sözündə neçə hərf var?',
    options: ['5', '4', '6', '3'],
    correctAnswer: '5',
  },
  {
    id: 13,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Əlifba sırası ilə hansı söz birinci gələr?',
    options: ['Armud', 'Banan', 'Gilas', 'Nar'],
    correctAnswer: 'Armud',
  },
  {
    id: 14,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Hansı söz əlamət bildirir ("Necə?")?',
    options: ['Şirin', 'Çanta', 'Yazır', 'Bakı'],
    correctAnswer: 'Şirin',
  },
  {
    id: 15,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: '"Sürətli" sözünün əks mənası hansıdır?',
    options: ['Yavaş', 'Tez', 'Cəld', 'Uzaq'],
    correctAnswer: 'Yavaş',
  },
  {
    id: 16,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Hansı söz həmişə böyük hərflə yazılır?',
    options: ['Azərbaycan', 'dəniz', 'bulud', 'çiçək'],
    correctAnswer: 'Azərbaycan',
  },
  {
    id: 17,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Hansı sözün yazılışı doğrudur?',
    options: ['Limonad', 'Limonat', 'Lemanad', 'Lımonad'],
    correctAnswer: 'Limonad',
  },
  {
    id: 18,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: '"Dost" sözünə yaxınmənalı söz hansıdır?',
    options: ['Yoldaş', 'Düşmən', 'Yad', 'Qonşu'],
    correctAnswer: 'Yoldaş',
  },
  {
    id: 19,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Hansı sözdə qalın saitlər işlənmişdir?',
    options: ['Qarğa', 'Dəniz', 'Çiçək', 'Günəş'],
    correctAnswer: 'Qarğa',
  },
  {
    id: 20,
    subject: 'Azərbaycan dili – I hissə',
    emoji: '📖',
    question: 'Sevinc və həyəcan bildirən cümlənin sonunda hansı işarə qoyulur?',
    options: ['Nida işarəsi (!)', 'Sual işarəsi (?)', 'Vergül (,)', 'Tire (–)'],
    correctAnswer: 'Nida işarəsi (!)',
  },

  // =========================================================
  // 🔢 RİYAZİYYAT – I HİSSƏ (21 - 40)
  // =========================================================
  {
    id: 21,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '24 + 15 neçə edir?',
    options: ['39', '38', '40', '29'],
    correctAnswer: '39',
  },
  {
    id: 22,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '50 - 18 neçə edir?',
    options: ['32', '42', '28', '38'],
    correctAnswer: '32',
  },
  {
    id: 23,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '4 × 5 neçə edir?',
    options: ['20', '16', '25', '15'],
    correctAnswer: '20',
  },
  {
    id: 24,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '18 : 3 neçə edir?',
    options: ['6', '5', '7', '9'],
    correctAnswer: '6',
  },
  {
    id: 25,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: 'Kvadratın neçə bərabər tərəfi var?',
    options: ['4', '3', '5', '6'],
    correctAnswer: '4',
  },
  {
    id: 26,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '1 metr neçə santimetrdir?',
    options: ['100 sm', '10 sm', '50 sm', '1000 sm'],
    correctAnswer: '100 sm',
  },
  {
    id: 27,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: 'Bir saat neçə dəqiqədir?',
    options: ['60 dəqiqə', '30 dəqiqə', '100 dəqiqə', '24 dəqiqə'],
    correctAnswer: '60 dəqiqə',
  },
  {
    id: 28,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '36 + 27 neçə edir?',
    options: ['63', '53', '64', '59'],
    correctAnswer: '63',
  },
  {
    id: 29,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: 'Səbətdə 45 alma var idi. 17-sini yedilər. Neçə alma qaldı?',
    options: ['28', '32', '27', '38'],
    correctAnswer: '28',
  },
  {
    id: 30,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: 'Hansı ədəd cüt ədəddir?',
    options: ['48', '35', '71', '19'],
    correctAnswer: '48',
  },
  {
    id: 31,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: 'Üçbucağın neçə təpəsi var?',
    options: ['3', '4', '2', '5'],
    correctAnswer: '3',
  },
  {
    id: 32,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '42 + 38 neçə edir?',
    options: ['80', '70', '82', '78'],
    correctAnswer: '80',
  },
  {
    id: 33,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '20 : 4 neçə edir?',
    options: ['5', '4', '6', '8'],
    correctAnswer: '5',
  },
  {
    id: 34,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: 'Ən kiçik ikirəqəmli ədəd hansıdır?',
    options: ['10', '11', '9', '99'],
    correctAnswer: '10',
  },
  {
    id: 35,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '3 × 5 + 5 neçə edir?',
    options: ['20', '15', '25', '18'],
    correctAnswer: '20',
  },
  {
    id: 36,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: 'Ən böyük ikirəqəmli ədəd hansıdır?',
    options: ['99', '90', '100', '98'],
    correctAnswer: '99',
  },
  {
    id: 37,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: 'Tərəfi 5 sm olan kvadratın perimetri neçə sm-dir?',
    options: ['20 sm', '15 sm', '25 sm', '10 sm'],
    correctAnswer: '20 sm',
  },
  {
    id: 38,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '100 - 37 neçə edir?',
    options: ['63', '73', '67', '53'],
    correctAnswer: '63',
  },
  {
    id: 39,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: 'Hər qutuda 6 karandaş varsa, 3 qutuda cəmi neçə karandaş olar?',
    options: ['18', '15', '12', '21'],
    correctAnswer: '18',
  },
  {
    id: 40,
    subject: 'Riyaziyyat – I hissə',
    emoji: '🔢',
    question: '6 onluq və 4 təklikdən ibarət ədəd hansıdır?',
    options: ['64', '46', '60', '10'],
    correctAnswer: '64',
  },

  // =========================================================
  // 🌳 HƏYAT BİLGİSİ (41 - 60)
  // =========================================================
  {
    id: 41,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Bir ildə neçə fəsil var?',
    options: ['4', '2', '6', '12'],
    correctAnswer: '4',
  },
  {
    id: 42,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'İşıqforun hansı işığı yandıqda yolu keçmək olar?',
    options: ['Yaşıl', 'Qırmızı', 'Sarı', 'Mavi'],
    correctAnswer: 'Yaşıl',
  },
  {
    id: 43,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Azərbaycan bayrağında neçə rəng var?',
    options: ['3', '2', '4', '5'],
    correctAnswer: '3',
  },
  {
    id: 44,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Hansı fəsildə ağacların yarpaqları saralıb tökülür?',
    options: ['Payız', 'Yaz', 'Yay', 'Qış'],
    correctAnswer: 'Payız',
  },
  {
    id: 45,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Günəş səhər hansı tərəfdən çıxır?',
    options: ['Şərq', 'Qərb', 'Şimal', 'Cənub'],
    correctAnswer: 'Şərq',
  },
  {
    id: 46,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Aşağıdakılardan hansı canlı təbiətə aiddir?',
    options: ['Ağac', 'Daş', 'Bulud', 'Qum'],
    correctAnswer: 'Ağac',
  },
  {
    id: 47,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Dişlərimizi gündə neçə dəfə fırçalamalıyıq?',
    options: ['2 dəfə', 'Həftədə 1 dəfə', 'Ayda 1 dəfə', 'Heç vaxt'],
    correctAnswer: '2 dəfə',
  },
  {
    id: 48,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Azərbaycanın paytaxtı hansı şəhərdir?',
    options: ['Bakı', 'Gəncə', 'Sumqayıt', 'Şəki'],
    correctAnswer: 'Bakı',
  },
  {
    id: 49,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Suyun donmuş halı nə adlanır?',
    options: ['Buz', 'Buxar', 'Yağış', 'Şeh'],
    correctAnswer: 'Buz',
  },
  {
    id: 50,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Hansı quş qışda isti ölkələrə uçub gedir?',
    options: ['Qaranquş', 'Sərçə', 'Qarğa', 'Göyərçin'],
    correctAnswer: 'Qaranquş',
  },
  {
    id: 51,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Bitkilərin torpaqdan su çəkən hissəsi hansıdır?',
    options: ['Kök', 'Yarpaq', 'Çiçək', 'Meyvə'],
    correctAnswer: 'Kök',
  },
  {
    id: 52,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Yanğın baş verdikdə hansı nömrəyə zəng etmək lazımdır?',
    options: ['101', '103', '104', '102'],
    correctAnswer: '101',
  },
  {
    id: 53,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Hansı heyvan həm suda, həm də quruda yaşaya bilir?',
    options: ['Qurbağa', 'Dəvə', 'Zürafə', 'Qartal'],
    correctAnswer: 'Qurbağa',
  },
  {
    id: 54,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Kompasın əqrəbi hansı istiqamətləri göstərir?',
    options: ['Şimal və Cənub', 'Şərq və Qərb', 'Yuxarı və Aşağı', 'Sağ və Sol'],
    correctAnswer: 'Şimal və Cənub',
  },
  {
    id: 55,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'İnsan orqanizmində qanı bütün bədənə vuran orqan hansıdır?',
    options: ['Ürək', 'Mədə', 'Qulaq', 'Dəri'],
    correctAnswer: 'Ürək',
  },
  {
    id: 56,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Hansı nəqliyyat növü su üzərində hərəkət edir?',
    options: ['Gəmi', 'Qatar', 'Təyyarə', 'Avtobus'],
    correctAnswer: 'Gəmi',
  },
  {
    id: 57,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Piyadalar yolu haradan keçməlidir?',
    options: [
      'Piyada keçidindən',
      'Yolun ortasından',
      'Qırmızı işıqda',
      'Körpünün altından',
    ],
    correctAnswer: 'Piyada keçidindən',
  },
  {
    id: 58,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Novruz bayramı hansı fəsildə qeyd olunur?',
    options: ['Yaz', 'Qış', 'Payız', 'Yay'],
    correctAnswer: 'Yaz',
  },
  {
    id: 59,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Xəzər dənizi dünyanın ən böyük nəyi sayılır?',
    options: ['Gölü', 'Çayı', 'Şəlaləsi', 'Buzlağı'],
    correctAnswer: 'Gölü',
  },
  {
    id: 60,
    subject: 'Həyat bilgisi',
    emoji: '🌳',
    question: 'Sağlam olmaq üçün hansı qidanı daha çox yeməliyik?',
    options: ['Meyvə və tərəvəz', 'Qazlı içkilər', 'Şəkər tozu', 'Çipslər'],
    correctAnswer: 'Meyvə və tərəvəz',
  },

  // =========================================================
  // 🤖 ALQORİTM (61 - 80)
  // =========================================================
  {
    id: 61,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Alqoritm nədir?',
    options: [
      'Məqsədə çatmaq üçün addımların ardıcıllığı',
      'Kompüterin ekranı',
      'Yalnız riyazi rəqəm',
      'Oyun pultunun adı',
    ],
    correctAnswer: 'Məqsədə çatmaq üçün addımların ardıcıllığı',
  },
  {
    id: 62,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Əl yumaq alqoritmində ilk addım hansıdır?',
    options: [
      'Kranı açıb əlləri islatmaq',
      'Dəsmal ilə qurulamaq',
      'Kranı bağlamaq',
      'Sabunu yerinə qoymaq',
    ],
    correctAnswer: 'Kranı açıb əlləri islatmaq',
  },
  {
    id: 63,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Ardıcıllığı tamamla: 2, 4, 6, 8, ...',
    options: ['10', '9', '11', '12'],
    correctAnswer: '10',
  },
  {
    id: 64,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Kompüterdə mətn yazmaq üçün hansı qurğudan istifadə olunur?',
    options: ['Klaviatura', 'Səsucaldan', 'Monitor', 'Printer'],
    correctAnswer: 'Klaviatura',
  },
  {
    id: 65,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Ardıcıllığı tap: 🔺, 🟦, 🔺, 🟦, 🔺, ...',
    options: ['🟦', '🔺', '🟢', '⭐'],
    correctAnswer: '🟦',
  },
  {
    id: 66,
    subject: 'Alqoritm',
    emoji: '🤖',
    question:
      'Robot "3 addım irəli get, sonra sağa dön" əmrini alıbsa, nə etməlidir?',
    options: [
      'Əvvəl 3 addım irəli gedib sonra sağa dönməli',
      'Əvvəl sağa dönüb sonra geri getməli',
      'Yalnız yerində fırlanmalı',
      'Dayanıb gözləməli',
    ],
    correctAnswer: 'Əvvəl 3 addım irəli gedib sonra sağa dönməli',
  },
  {
    id: 67,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Eyni hərəkəti bir neçə dəfə təkrarlamağa alqoritmdə nə deyilir?',
    options: ['Dövr (Təkrar)', 'Xəta', 'Şifrə', 'Fayl'],
    correctAnswer: 'Dövr (Təkrar)',
  },
  {
    id: 68,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: '"Əgər yağış yağırsa, çətir götür" hansı alqoritm növünə aiddir?',
    options: ['Şərtli (Budaqlanan)', 'Təkrarsız xətti', 'Musiqili', 'Təsadüfi'],
    correctAnswer: 'Şərtli (Budaqlanan)',
  },
  {
    id: 69,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Ardıcıllığı tamamla: 5, 10, 15, 20, ...',
    options: ['25', '21', '30', '22'],
    correctAnswer: '25',
  },
  {
    id: 70,
    subject: 'Alqoritm',
    emoji: '🤖',
    question:
      'Robot əvvəl 2 xana yuxarı, sonra 3 xana sağa getsə, cəmi neçə addım atmış olar?',
    options: ['5', '2', '3', '6'],
    correctAnswer: '5',
  },
  {
    id: 71,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Təsviri kağız üzərinə çap edən qurğu hansıdır?',
    options: ['Printer', 'Siçan (Mouse)', 'Mikrofon', 'Kamera'],
    correctAnswer: 'Printer',
  },
  {
    id: 72,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Çay dəmləmək üçün düzgün ardıcıllıq hansıdır?',
    options: [
      'Su qaynatmaq → Çay dəmləmək → Süzmək',
      'Süzmək → Çay dəmləmək → Su qaynatmaq',
      'Çay dəmləmək → Su qaynatmaq → İçmək',
      'Fincanı yumaq → Şəkər qoymaq → Su qaynatmaq',
    ],
    correctAnswer: 'Su qaynatmaq → Çay dəmləmək → Süzmək',
  },
  {
    id: 73,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Ardıcıllığı tap: 20, 18, 16, 14, ...',
    options: ['12', '13', '10', '15'],
    correctAnswer: '12',
  },
  {
    id: 74,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Alqoritmdə buraxılan səhv nə adlanır?',
    options: ['Xəta (Bug)', 'Qovluq', 'Ekran', 'İkonka'],
    correctAnswer: 'Xəta (Bug)',
  },
  {
    id: 75,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Robot "4 dəfə [1 addım at]" əmrini icra etsə, neçə addım atar?',
    options: ['4', '1', '8', '2'],
    correctAnswer: '4',
  },
  {
    id: 76,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'İnternetdə şəxsi parolu (şifrəni) kimə demək olar?',
    options: [
      'Yalnız valideynlərə',
      'Tanımadığın şəxslərə',
      'Bütün sinfə',
      'Oyun çatında hamıya',
    ],
    correctAnswer: 'Yalnız valideynlərə',
  },
  {
    id: 77,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Səs yazmaq üçün kompüterə hansı qurğu qoşulur?',
    options: ['Mikrofon', 'Monitor', 'Klaviatura', 'Sərt disk'],
    correctAnswer: 'Mikrofon',
  },
  {
    id: 78,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Ardıcıllığı tamamla: A, B, A, B, A, ...',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 'B',
  },
  {
    id: 79,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Aşağıdakılardan hansı robot üçün əmr ola bilər?',
    options: ['İrəli get', 'Pəncərəni sil', 'Çanta yığ', 'Dəftəri cır'],
    correctAnswer: 'İrəli get',
  },
  {
    id: 80,
    subject: 'Alqoritm',
    emoji: '🤖',
    question: 'Ardıcıllığı tap: 1, 3, 5, 7, ...',
    options: ['9', '8', '10', '6'],
    correctAnswer: '9',
  },

  // =========================================================
  // 🇬🇧 İNGİLİS DİLİ (81 - 100)
  // =========================================================
  {
    id: 81,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Book" sözünün tərcüməsi nədir?',
    options: ['Kitab', 'Qələm', 'Çanta', 'Dəftər'],
    correctAnswer: 'Kitab',
  },
  {
    id: 82,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: 'İngiliscə "Mavi" rəng hansıdır?',
    options: ['Blue', 'Red', 'Green', 'Yellow'],
    correctAnswer: 'Blue',
  },
  {
    id: 83,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Seven" hansı rəqəmdir?',
    options: ['7', '6', '8', '5'],
    correctAnswer: '7',
  },
  {
    id: 84,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Pen" nə deməkdir?',
    options: ['Qələm', 'Kitab', 'Masa', 'Lövhə'],
    correctAnswer: 'Qələm',
  },
  {
    id: 85,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: 'İngiliscə "Ana" sözü necə deyilir?',
    options: ['Mother', 'Father', 'Sister', 'Brother'],
    correctAnswer: 'Mother',
  },
  {
    id: 86,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Cat" hansı heyvandır?',
    options: ['Pişik', 'İt', 'Quş', 'Balıq'],
    correctAnswer: 'Pişik',
  },
  {
    id: 87,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: 'Səhər görüşəndə ingiliscə nə deyilir?',
    options: ['Good morning', 'Good night', 'Goodbye', 'Thank you'],
    correctAnswer: 'Good morning',
  },
  {
    id: 88,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Apple" sözünün mənası nədir?',
    options: ['Alma', 'Armud', 'Banan', 'Portağal'],
    correctAnswer: 'Alma',
  },
  {
    id: 89,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: 'İngiliscə "Günəş" necə yazılır?',
    options: ['Sun', 'Moon', 'Sky', 'Star'],
    correctAnswer: 'Sun',
  },
  {
    id: 90,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Ten" hansı ədəddir?',
    options: ['10', '12', '8', '5'],
    correctAnswer: '10',
  },
  {
    id: 91,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: 'İngiliscə "Qırmızı" hansı rəngdir?',
    options: ['Red', 'Black', 'White', 'Orange'],
    correctAnswer: 'Red',
  },
  {
    id: 92,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Dog" sözünün mənası nədir?',
    options: ['İt', 'At', 'Ayı', 'Tülkü'],
    correctAnswer: 'İt',
  },
  {
    id: 93,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Thank you" ifadəsi nə deməkdir?',
    options: ['Təşəkkür edirəm', 'Bağışlayın', 'Salam', 'Sağ olun'],
    correctAnswer: 'Təşəkkür edirəm',
  },
  {
    id: 94,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Fish" hansı canlıdır?',
    options: ['Balıq', 'Quş', 'Dovşan', 'Kəpənək'],
    correctAnswer: 'Balıq',
  },
  {
    id: 95,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: 'İngiliscə "Ata" sözü hansıdır?',
    options: ['Father', 'Mother', 'Uncle', 'Brother'],
    correctAnswer: 'Father',
  },
  {
    id: 96,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"School" nə deməkdir?',
    options: ['Məktəb', 'Ev', 'Bağça', 'Park'],
    correctAnswer: 'Məktəb',
  },
  {
    id: 97,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: 'İngiliscə "Yaşıl" hansıdır?',
    options: ['Green', 'Yellow', 'Purple', 'Brown'],
    correctAnswer: 'Green',
  },
  {
    id: 98,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"Water" sözünün mənası nədir?',
    options: ['Su', 'Çay', 'Süd', 'Şirə'],
    correctAnswer: 'Su',
  },
  {
    id: 99,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"One, Two, Three, ..." ardıcıllığının davamı hansıdır?',
    options: ['Four', 'Five', 'Six', 'Ten'],
    correctAnswer: 'Four',
  },
  {
    id: 100,
    subject: 'İngilis dili',
    emoji: '🇬🇧',
    question: '"I like my school" cümləsi nə deməkdir?',
    options: [
      'Mən məktəbimi bəyənirəm',
      'Mən evə gedirəm',
      'Bu böyük kitabdır',
      'Hava çox soyuqdur',
    ],
    correctAnswer: 'Mən məktəbimi bəyənirəm',
  },
];

export function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getQuestionBankForGrade(grade: GradeLevel): QuizQuestion[] {
  return grade === 3 ? GRADE_3_QUESTIONS : QUESTION_BANK;
}

export function createShuffledDeck(grade: GradeLevel = 2): DeckQuestion[] {
  const bank = getQuestionBankForGrade(grade);
  return shuffleArray(bank).map((q) => {
    const opts = shuffleArray(q.options) as [string, string, string, string];
    return {
      ...q,
      shuffledOptions: opts,
    };
  });
}

export { GRADE_3_QUESTIONS };
