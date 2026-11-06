export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  progress: number;
  isFarming: boolean;
  isComplete: boolean;
  duration: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LogEntry {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}
