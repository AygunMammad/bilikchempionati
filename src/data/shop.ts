export type BackdropThemeId = 'sky' | 'ocean' | 'space';

export type ShopCategory = 'avatar' | 'theme' | 'effect' | 'powerup';

export interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  price: number;
  category: ShopCategory;
  themeValue?: BackdropThemeId;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'hint_50_50',
    name: '50/50 İpucu',
    emoji: '💡',
    description: 'Çətin sualda 2 səhv cavab variantını silmək üçün köməkçi.',
    price: 4,
    category: 'powerup',
  },
  {
    id: 'avatar_cat',
    name: 'Şən Pişik',
    emoji: '🐱',
    description: 'Profilinin yanında görünən mehriban dost.',
    price: 3,
    category: 'avatar',
  },
  {
    id: 'avatar_fox',
    name: 'Ağıllı Tülkü',
    emoji: '🦊',
    description: 'Sürətli düşünən bilik yoldaşı avatarı.',
    price: 5,
    category: 'avatar',
  },
  {
    id: 'avatar_lion',
    name: 'Cəsur Aslan',
    emoji: '🦁',
    description: 'Qəhrəman şagirdlər üçün aslan nişanı.',
    price: 10,
    category: 'avatar',
  },
  {
    id: 'avatar_rocket',
    name: 'Kosmik Raket',
    emoji: '🚀',
    description: 'Ulduzlara uçan bilik raketi avatarı.',
    price: 15,
    category: 'avatar',
  },
  {
    id: 'avatar_crown',
    name: 'Çempion Tacı',
    emoji: '👑',
    description: 'Əsl Bilik Çempionu üçün qızıl tac.',
    price: 25,
    category: 'avatar',
  },
  {
    id: 'theme_ocean',
    name: 'Dəniz Macərası Fonu',
    emoji: '🌊',
    description: 'Oyunun arxa fonunu firuzəyi dəniz dalğalarına çevirir.',
    price: 8,
    category: 'theme',
    themeValue: 'ocean',
  },
  {
    id: 'theme_space',
    name: 'Kosmos Səyahəti Fonu',
    emoji: '🌌',
    description: 'Ulduzlu gecə səması və planetlərlə sehrli kosmos fonu.',
    price: 15,
    category: 'theme',
    themeValue: 'space',
  },
  {
    id: 'effect_super_firework',
    name: 'Super Göy Qurşağı Fişəngi',
    emoji: '🎆',
    description: 'Hər doğru cavabda daha böyük ulduzlu fişəng şousu açır.',
    price: 12,
    category: 'effect',
  },
];

export function getAvatarEmoji(avatarId: string | null): string {
  if (!avatarId) return '🦉';
  const item = SHOP_ITEMS.find((i) => i.id === avatarId);
  return item?.emoji || '🦉';
}
