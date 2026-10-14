import { GameSaveData, GameSettings } from './types';

const STORAGE_KEY = 'impossible_jump_rage_save_v1';

export const DEFAULT_SETTINGS: GameSettings = {
  sfx: true,
  music: true,
  screenShake: true,
  touchControls: 'auto',
  theme: 'cyber-cyan',
};

export const DEFAULT_SAVE_DATA: GameSaveData = {
  unlockedLevels: [1],
  completedLevels: [],
  currentLevel: 1,
  lastCheckpoint: 1,
  totalDeaths: 0,
  levelDeaths: {},
  bestTimes: {},
  secretUnlocked: false,
  settings: DEFAULT_SETTINGS,
};

export function loadSaveData(): GameSaveData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SAVE_DATA };
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SAVE_DATA,
      ...parsed,
      settings: {
        ...DEFAULT_SETTINGS,
        ...(parsed.settings || {}),
      },
      unlockedLevels: Array.isArray(parsed.unlockedLevels) && parsed.unlockedLevels.length > 0
        ? parsed.unlockedLevels
        : [1],
      completedLevels: Array.isArray(parsed.completedLevels) ? parsed.completedLevels : [],
      levelDeaths: parsed.levelDeaths || {},
      bestTimes: parsed.bestTimes || {},
    };
  } catch {
    return { ...DEFAULT_SAVE_DATA };
  }
}

export function saveGameData(data: GameSaveData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
}

export function resetGameData(): GameSaveData {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
  return { ...DEFAULT_SAVE_DATA };
}
