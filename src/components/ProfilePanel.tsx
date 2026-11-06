import { Badge } from '../types';

interface Props {
  badges: Badge[];
  username: string;
}

export default function ProfilePanel({ badges, username }: Props) {
  const completedBadges = badges.filter(b => b.isComplete);
  const farmingBadges = badges.filter(b => b.isFarming);

  return (
    <div className="p-4 border-b border-[#1f2023]">
      <h3 className="text-xs font-semibold text-[#949ba4] uppercase mb-3">Профиль</h3>

      {/* User card */}
      <div className="bg-[#232428] rounded-lg overflow-hidden">
        {/* Banner */}
        <div className="h-15 bg-gradient-to-r from-[#5865f2] via-[#eb459e] to-[#fee75c]" />

        {/* Avatar */}
        <div className="px-4 -mt-8">
          <div className="w-16 h-16 rounded-full bg-[#5865f2] border-4 border-[#232428] flex items-center justify-center text-xl font-bold">
            BF
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pb-3 pt-2 bg-[#232428]">
          <div className="text-lg font-bold text-white">{username}</div>
          <div className="text-sm text-[#949ba4]">badgefarmer</div>

          {/* Badges */}
          <div className="mt-3">
            <div className="text-xs text-[#949ba4] mb-1.5">Значки ({completedBadges.length})</div>
            <div className="flex flex-wrap gap-1">
              {completedBadges.map(badge => (
                <div
                  key={badge.id}
                  className="w-7 h-7 bg-[#1e1f22] rounded flex items-center justify-center text-sm hover:scale-110 transition-transform cursor-pointer"
                  title={badge.name}
                >
                  {badge.emoji}
                </div>
              ))}
              {farmingBadges.map(badge => (
                <div
                  key={badge.id}
                  className="w-7 h-7 bg-[#1e1f22] rounded flex items-center justify-center text-sm opacity-50 animate-pulse"
                  title={`${badge.name} - в процессе`}
                >
                  {badge.emoji}
                </div>
              ))}
              {completedBadges.length === 0 && farmingBadges.length === 0 && (
                <div className="text-xs text-[#949ba4] italic">Пока нет значков...</div>
              )}
            </div>
          </div>

          {/* Member since */}
          <div className="mt-3 pt-3 border-t border-[#3f4147]">
            <div className="text-xs text-[#949ba4]">
              <span className="font-semibold text-[#f2f3f5]">Участник с </span>
              1 янв 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
