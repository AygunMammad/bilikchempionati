import React from 'react';
import { Check, ShoppingBag, Sparkles, Star, X } from 'lucide-react';
import {
  BackdropThemeId,
  SHOP_ITEMS,
  ShopItem,
} from '../data/shop';

export interface PlayerInventory {
  spendablePoints: number;
  ownedItemIds: string[];
  equippedAvatarId: string | null;
  equippedTheme: BackdropThemeId;
  superFireworkEnabled: boolean;
  hintTokens: number;
}

interface ShopModalProps {
  isOpen: boolean;
  inventory: PlayerInventory;
  onClose: () => void;
  onBuyItem: (item: ShopItem) => void;
  onEquipAvatar: (avatarId: string | null) => void;
  onEquipTheme: (theme: BackdropThemeId) => void;
  onToggleSuperFirework: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  inventory,
  onClose,
  onBuyItem,
  onEquipAvatar,
  onEquipTheme,
  onToggleSuperFirework,
}) => {
  if (!isOpen) return null;

  const isOwned = (id: string) => inventory.ownedItemIds.includes(id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xal Mağazası"
      className="fixed inset-0 z-50 bg-slate-900/55 flex items-center justify-center p-4"
    >
      <div className="bg-white border-2 border-amber-200 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[88vh] flex flex-col overflow-hidden animate-pop-in">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 border-b border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-white flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                Mükafat Mağazası
              </h2>
              <p className="text-xs text-slate-600">
                Topladığın xallarla avatar, oyun fonu, ipucu və super fişəng al!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-mono-tabular text-sm font-extrabold inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" aria-hidden="true" />
              <span>{inventory.spendablePoints} xal</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Mağazanı bağla"
              className="p-2 rounded-full hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Shop Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Default Free Options Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="font-semibold text-slate-700">
              Standart seçimlərə qayıt:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onEquipAvatar(null)}
                className={`px-3 py-1.5 rounded-full font-bold border transition-colors cursor-pointer ${
                  inventory.equippedAvatarId === null
                    ? 'bg-sky-600 border-sky-600 text-white'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-sky-400'
                }`}
              >
                🦉 Bayquş (Standart)
              </button>
              <button
                type="button"
                onClick={() => onEquipTheme('sky')}
                className={`px-3 py-1.5 rounded-full font-bold border transition-colors cursor-pointer ${
                  inventory.equippedTheme === 'sky'
                    ? 'bg-sky-600 border-sky-600 text-white'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-sky-400'
                }`}
              >
                ☀️ Günəşli Səma (Standart)
              </button>
            </div>
          </div>

          {/* Shop Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SHOP_ITEMS.map((item) => {
              const owned = isOwned(item.id);
              const canAfford = inventory.spendablePoints >= item.price;

              const isEquipped =
                (item.category === 'avatar' &&
                  inventory.equippedAvatarId === item.id) ||
                (item.category === 'theme' &&
                  item.themeValue &&
                  inventory.equippedTheme === item.themeValue) ||
                (item.category === 'effect' &&
                  inventory.superFireworkEnabled &&
                  owned);

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border-2 p-4 flex flex-col justify-between gap-3 transition-colors ${
                    isEquipped
                      ? 'bg-sky-50 border-sky-400'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-3xl" aria-hidden="true">
                        {item.emoji}
                      </span>
                      {item.category === 'powerup' ? (
                        <span className="text-xs font-mono-tabular font-bold text-sky-700">
                          Səndə: {inventory.hintTokens} ədəd
                        </span>
                      ) : owned ? (
                        <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Alınıb</span>
                        </span>
                      ) : (
                        <span className="text-xs font-mono-tabular font-extrabold text-amber-700">
                          {item.price} xal
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-extrabold text-slate-900 font-display">
                      {item.name}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  {item.category === 'powerup' ? (
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => onBuyItem(item)}
                      className={`w-full py-2.5 px-3 rounded-full text-xs font-extrabold transition-colors ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford
                        ? `Al · ${item.price} xal`
                        : `Lazımdır: ${item.price} xal`}
                    </button>
                  ) : owned ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (item.category === 'avatar') {
                          onEquipAvatar(item.id);
                        } else if (item.category === 'theme' && item.themeValue) {
                          onEquipTheme(item.themeValue);
                        } else if (item.category === 'effect') {
                          onToggleSuperFirework();
                        }
                      }}
                      className={`w-full py-2.5 px-3 rounded-full text-xs font-extrabold transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                        isEquipped
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-sky-600 hover:bg-sky-700 text-white'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>
                            {item.category === 'effect' ? 'Aktivdir (Söndür)' : 'Seçilib'}
                          </span>
                        </>
                      ) : (
                        <span>İstifadə et</span>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => onBuyItem(item)}
                      className={`w-full py-2.5 px-3 rounded-full text-xs font-extrabold transition-colors ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford
                        ? `Al · ${item.price} xal`
                        : `Lazımdır: ${item.price} xal`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
