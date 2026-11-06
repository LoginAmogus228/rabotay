import { LogEntry } from '../types';

interface Props {
  logs: LogEntry[];
}

const typeColors = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};

export default function LogPanel({ logs }: Props) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="px-4 py-2 border-b border-[#1f2023]">
        <h3 className="text-xs font-semibold text-[#949ba4] uppercase">Лог фарма</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {logs.length === 0 && (
          <div className="text-sm text-[#949ba4] text-center py-4">
            Лог пуст. Нажмите "Фармить всё" чтобы начать!
          </div>
        )}
        {logs.map(log => (
          <div key={log.id} className="text-xs flex gap-2 items-start">
            <span className="text-[#949ba4] flex-shrink-0">[{log.timestamp}]</span>
            <span className={typeColors[log.type]}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
