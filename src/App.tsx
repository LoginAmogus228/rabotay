import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import BadgePanel from './components/BadgePanel';
import ProfilePanel from './components/ProfilePanel';
import LogPanel from './components/LogPanel';
import { Badge, LogEntry } from './types';

const initialBadges: Badge[] = [
  { id: 'early_supporter', name: 'Early Supporter', emoji: '💎', description: 'Поддержка Discord на ранних этапах', progress: 0, isFarming: false, isComplete: false, duration: 8000, rarity: 'rare' },
  { id: 'bug_hunter_1', name: 'Bug Hunter Level 1', emoji: '🐛', description: 'Нахождение багов в Discord', progress: 0, isFarming: false, isComplete: false, duration: 12000, rarity: 'epic' },
  { id: 'bug_hunter_2', name: 'Bug Hunter Level 2', emoji: '🦟', description: 'Продвинутый охотник за багами', progress: 0, isFarming: false, isComplete: false, duration: 20000, rarity: 'legendary' },
  { id: 'hypesquad_bravery', name: 'HypeSquad Bravery', emoji: '🟠', description: 'Дом Храбрости', progress: 0, isFarming: false, isComplete: false, duration: 5000, rarity: 'common' },
  { id: 'hypesquad_brilliance', name: 'HypeSquad Brilliance', emoji: '🔴', description: 'Дом Блестящих', progress: 0, isFarming: false, isComplete: false, duration: 5000, rarity: 'common' },
  { id: 'hypesquad_balance', name: 'HypeSquad Balance', emoji: '🔵', description: 'Дом Баланса', progress: 0, isFarming: false, isComplete: false, duration: 5000, rarity: 'common' },
  { id: 'nitro', name: 'Nitro', emoji: '🚀', description: 'Discord Nitro подписка', progress: 0, isFarming: false, isComplete: false, duration: 15000, rarity: 'epic' },
  { id: 'boost_1', name: 'Server Booster Lv.1', emoji: '💜', description: 'Бустер сервера уровень 1', progress: 0, isFarming: false, isComplete: false, duration: 10000, rarity: 'rare' },
  { id: 'boost_2', name: 'Server Booster Lv.2', emoji: '💖', description: 'Бустер сервера уровень 2', progress: 0, isFarming: false, isComplete: false, duration: 18000, rarity: 'epic' },
  { id: 'active_dev', name: 'Active Developer', emoji: '👨‍💻', description: 'Активный разработчик ботов', progress: 0, isFarming: false, isComplete: false, duration: 25000, rarity: 'legendary' },
  { id: 'verified_bot', name: 'Verified Bot', emoji: '✅', description: 'Верифицированный бот', progress: 0, isFarming: false, isComplete: false, duration: 30000, rarity: 'legendary' },
  { id: 'partner', name: 'Discord Partner', emoji: '🌟', description: 'Партнёрская программа Discord', progress: 0, isFarming: false, isComplete: false, duration: 35000, rarity: 'legendary' },
];

function App() {
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [username] = useState('BadgeFarmer#1337');
  const [totalFarmed, setTotalFarmed] = useState(0);

  const addLog = useCallback((message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const entry: LogEntry = {
      id: Date.now() + Math.random(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    };
    setLogs(prev => [entry, ...prev].slice(0, 50));
  }, []);

  const farmBadge = useCallback((badgeId: string) => {
    setBadges(prev => prev.map(b => {
      if (b.id === badgeId && !b.isFarming && !b.isComplete) {
        addLog(`🔄 Начинаем фармить: ${b.name}`, 'info');
        return { ...b, isFarming: true, progress: 0 };
      }
      return b;
    }));
  }, [addLog]);

  const farmAll = useCallback(() => {
    setIsRunning(true);
    addLog('🚀 Запускаем массовый фарм всех значков!', 'success');
    setBadges(prev => prev.map(b => {
      if (!b.isComplete) {
        return { ...b, isFarming: true, progress: 0 };
      }
      return b;
    }));
  }, [addLog]);

  const stopAll = useCallback(() => {
    setIsRunning(false);
    addLog('⛔ Фарм остановлен', 'warning');
    setBadges(prev => prev.map(b => ({ ...b, isFarming: false, progress: 0 })));
  }, [addLog]);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBadges(prev => prev.map(badge => {
        if (!badge.isFarming) return badge;

        const increment = (100 / (badge.duration / 100));
        const newProgress = Math.min(badge.progress + increment, 100);

        if (newProgress >= 100) {
          addLog(`✅ Получен значок: ${badge.name}!`, 'success');
          setTotalFarmed(t => t + 1);
          return { ...badge, progress: 100, isFarming: false, isComplete: true };
        }

        // Random events
        if (Math.random() < 0.005) {
          const events = [
            `⚡ Ускорение фарма ${badge.name}...`,
            `🔍 Проверяем статус ${badge.name}...`,
            `📡 Подключение к серверам Discord...`,
            `🔐 Авторизация для ${badge.name}...`,
          ];
          addLog(events[Math.floor(Math.random() * events.length)], 'info');
        }

        return { ...badge, progress: newProgress };
      }));
    }, 100);

    return () => clearInterval(interval);
  }, [addLog]);

  const completedCount = badges.filter(b => b.isComplete).length;
  const farmingCount = badges.filter(b => b.isFarming).length;

  return (
    <div className="flex h-screen bg-[#313338] text-gray-100 overflow-hidden">
      {/* Server sidebar */}
      <Sidebar />

      {/* Channel sidebar */}
      <div className="w-60 bg-[#2b2d31] flex flex-col flex-shrink-0">
        <div className="h-12 px-4 flex items-center shadow-md border-b border-[#1f2023]">
          <h2 className="font-bold text-white truncate">Badge Farmer</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-xs font-semibold text-[#949ba4] uppercase px-2 py-1.5">
            Управление
          </div>
          <div className="space-y-0.5">
            <button
              onClick={farmAll}
              disabled={isRunning}
              className="w-full text-left px-2 py-1.5 rounded text-sm text-[#949ba4] hover:bg-[#35373c] hover:text-white transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <span>🚀</span> Фармить всё
            </button>
            <button
              onClick={stopAll}
              disabled={!isRunning && farmingCount === 0}
              className="w-full text-left px-2 py-1.5 rounded text-sm text-[#949ba4] hover:bg-[#35373c] hover:text-white transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <span>⛔</span> Остановить
            </button>
          </div>

          <div className="text-xs font-semibold text-[#949ba4] uppercase px-2 py-1.5 mt-4">
            Статистика
          </div>
          <div className="px-2 space-y-1 text-sm text-[#949ba4]">
            <div className="flex justify-between">
              <span>Получено:</span>
              <span className="text-green-400 font-bold">{completedCount}/{badges.length}</span>
            </div>
            <div className="flex justify-between">
              <span>В процессе:</span>
              <span className="text-yellow-400 font-bold">{farmingCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Всего фарм:</span>
              <span className="text-blue-400 font-bold">{totalFarmed}</span>
            </div>
          </div>

          <div className="text-xs font-semibold text-[#949ba4] uppercase px-2 py-1.5 mt-4">
            Каналы
          </div>
          <div className="space-y-0.5">
            <div className="px-2 py-1.5 rounded text-sm text-white bg-[#404249] flex items-center gap-2">
              <span>#</span> фарм-значков
            </div>
            <div className="px-2 py-1.5 rounded text-sm text-[#949ba4] hover:bg-[#35373c] hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
              <span>#</span> лог-фарма
            </div>
            <div className="px-2 py-1.5 rounded text-sm text-[#949ba4] hover:bg-[#35373c] hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
              <span>#</span> профиль
            </div>
          </div>
        </div>

        {/* User panel */}
        <div className="h-14 bg-[#232428] px-2 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-sm font-bold">
            BF
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{username}</div>
            <div className="text-xs text-[#949ba4]">Фармит значки...</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-12 px-4 flex items-center shadow-md border-b border-[#1f2023] bg-[#313338] gap-2 flex-shrink-0">
          <span className="text-[#949ba4]">#</span>
          <h3 className="font-bold text-white">фарм-значков</h3>
          <div className="ml-4 text-sm text-[#949ba4]">
            Симулятор фарма значков Discord
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden flex">
          {/* Badge grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <BadgePanel badges={badges} onFarm={farmBadge} />
          </div>

          {/* Right panels */}
          <div className="w-80 flex flex-col border-l border-[#1f2023] flex-shrink-0">
            <ProfilePanel badges={badges} username={username} />
            <LogPanel logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
