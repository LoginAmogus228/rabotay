import { Badge } from '../types';

interface Props {
  badges: Badge[];
  onFarm: (id: string) => void;
}

const rarityColors = {
  common: { bg: 'bg-gray-600/20', border: 'border-gray-500/30', text: 'text-gray-400', glow: '' },
  rare: { bg: 'bg-blue-600/20', border: 'border-blue-500/30', text: 'text-blue-400', glow: '' },
  epic: { bg: 'bg-purple-600/20', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  legendary: { bg: 'bg-yellow-600/20', border: 'border-yellow-500/30', text: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
};

const rarityLabels = {
  common: 'Обычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
};

export default function BadgePanel({ badges, onFarm }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          🏆 Значки Discord
        </h2>
        <div className="text-sm text-[#949ba4]">
          Нажмите на значок чтобы начать фарм
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {badges.map(badge => {
          const colors = rarityColors[badge.rarity];
          return (
            <div
              key={badge.id}
              className={`relative rounded-lg border ${colors.border} ${colors.bg} p-4 transition-all duration-300 ${
                badge.isFarming ? `shadow-lg ${colors.glow} scale-[1.02]` : ''
              } ${badge.isComplete ? 'ring-2 ring-green-500/50' : ''}`}
            >
              {/* Status indicator */}
              {badge.isComplete && (
                <div className="absolute top-2 right-2 text-green-400 text-lg">✓</div>
              )}
              {badge.isFarming && (
                <div className="absolute top-2 right-2">
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Badge content */}
              <div className="flex items-start gap-3">
                <div className={`text-3xl ${badge.isFarming ? 'animate-bounce' : ''}`}>
                  {badge.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm truncate">{badge.name}</h3>
                  <p className="text-xs text-[#949ba4] mt-0.5">{badge.description}</p>
                  <div className={`text-xs mt-1 ${colors.text}`}>
                    {rarityLabels[badge.rarity]}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              {(badge.isFarming || badge.progress > 0) && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-[#949ba4] mb-1">
                    <span>{badge.isComplete ? 'Готово!' : badge.isFarming ? 'Фарм...' : 'Ожидание...'}</span>
                    <span>{Math.round(badge.progress)}%</span>
                  </div>
                  <div className="h-2 bg-[#1e1f22] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-100 ${
                        badge.isComplete
                          ? 'bg-green-500'
                          : badge.rarity === 'legendary'
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : badge.rarity === 'epic'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : badge.rarity === 'rare'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          : 'bg-gradient-to-r from-gray-400 to-gray-300'
                      }`}
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Farm button */}
              {!badge.isComplete && !badge.isFarming && (
                <button
                  onClick={() => onFarm(badge.id)}
                  className="mt-3 w-full py-1.5 rounded bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm font-medium transition-colors"
                >
                  Фармить
                </button>
              )}

              {badge.isComplete && (
                <div className="mt-3 w-full py-1.5 rounded bg-green-600/20 text-green-400 text-sm font-medium text-center">
                  ✅ Получен
                </div>
              )}

              {badge.isFarming && (
                <div className="mt-3 w-full py-1.5 rounded bg-yellow-600/20 text-yellow-400 text-sm font-medium text-center">
                  ⏳ Фармится...
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
