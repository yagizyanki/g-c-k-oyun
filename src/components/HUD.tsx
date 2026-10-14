import React from 'react';
import { RotateCcw, Pause, Volume2, VolumeX, Shield, Flag, Skull, Clock, Target } from 'lucide-react';
import { GameEngine } from '../game/engine';
import { GameSaveData } from '../game/types';
import { LEVELS } from '../game/levels';
import { sounds } from '../game/audio';

interface HUDProps {
  engine: GameEngine;
  saveData: GameSaveData;
  onPause: () => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
  onRestart: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  engine,
  saveData,
  onPause,
  onToggleSound,
  soundEnabled,
  onRestart,
}) => {
  const currentLevel = engine.currentLevelData;
  const isCheckpoint = currentLevel.isCheckpoint;
  const totalLevels = 20;
  const currentLevelNum = Math.min(currentLevel.id, totalLevels);
  const progressPct = ((currentLevelNum - 1) / (totalLevels - 1)) * 100;
  const bestTime = saveData.bestTimes[currentLevel.id];

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 md:p-5 select-none">
      {/* Top Header: Progress Bar & Level Stats */}
      <div className="w-full flex flex-col gap-2 pointer-events-auto">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-3 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-xl border border-indigo-500/20 shadow-lg">
          {/* Level Info & Checkpoint Badge */}
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-lg md:text-xl text-cyan-400 tracking-wider">
              BÖLÜM {currentLevel.id}
              {currentLevel.id === 21 && ' (BONUS)'}
            </span>

            {isCheckpoint && (
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold uppercase tracking-wider animate-pulse">
                <Shield className="w-3 h-3" />
                Kontrol Noktası
              </span>
            )}
          </div>

          {/* Quick Level Stats */}
          <div className="hidden sm:flex items-center gap-5 text-xs md:text-sm font-semibold text-slate-300">
            {/* Current Level Attempt */}
            <div className="flex items-center gap-1.5" title="Mevcut bölümdeki deneme sayısı">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Deneme: <strong className="text-white font-mono">{engine.levelAttempts}</strong></span>
            </div>

            {/* Total Deaths */}
            <div className="flex items-center gap-1.5" title="Toplam ölüm sayısı">
              <Skull className="w-4 h-4 text-rose-400" />
              <span>Ölüm: <strong className="text-white font-mono">{saveData.totalDeaths}</strong></span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1.5" title="Bölüm süresi">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-white">{engine.levelTimer.toFixed(1)}s</span>
            </div>

            {/* Best Time */}
            {bestTime !== undefined && (
              <div className="flex items-center gap-1 text-emerald-400" title="En iyi süre">
                <span>En İyi: <strong className="font-mono">{bestTime}s</strong></span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Quick Restart (R) */}
            <button
              onClick={() => {
                sounds.playClick();
                onRestart();
              }}
              className="p-1.5 md:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition active:scale-95 cursor-pointer flex items-center gap-1 text-xs"
              title="Yeniden Başlat (R)"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline font-mono text-[11px] text-slate-400">[R]</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                onToggleSound();
              }}
              className="p-1.5 md:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition active:scale-95 cursor-pointer"
              title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-rose-400" />
              )}
            </button>

            {/* Pause Menu (ESC) */}
            <button
              onClick={() => {
                sounds.playClick();
                onPause();
              }}
              className="p-1.5 md:p-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 hover:text-white border border-indigo-500/40 transition active:scale-95 cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Duraklat (ESC)"
            >
              <Pause className="w-4 h-4 text-indigo-400" />
              <span className="hidden md:inline font-mono text-[11px] text-indigo-300">[ESC]</span>
            </button>
          </div>
        </div>

        {/* Global Level Progress Bar with Checkpoint Pins */}
        <div className="relative w-full h-2 bg-slate-900/80 rounded-full overflow-hidden border border-slate-800 backdrop-blur-sm">
          {/* Fill */}
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Checkpoint Indicators across progress bar */}
        <div className="relative w-full px-1 flex justify-between text-[10px] text-slate-400 font-mono select-none">
          <span className="text-cyan-400">1</span>
          <span className="flex items-center gap-0.5 text-emerald-400 font-bold">
            <Flag className="w-2.5 h-2.5" /> 5
          </span>
          <span className="flex items-center gap-0.5 text-emerald-400 font-bold">
            <Flag className="w-2.5 h-2.5" /> 10
          </span>
          <span className="flex items-center gap-0.5 text-emerald-400 font-bold">
            <Flag className="w-2.5 h-2.5" /> 15
          </span>
          <span className="text-fuchsia-400 font-bold">20 🏆</span>
        </div>
      </div>

      {/* Subtitle / Tip Banner (fades out or stays subtle at bottom center) */}
      {currentLevel.tip && (
        <div className="self-center bg-slate-950/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800 text-xs text-slate-300 font-medium tracking-wide shadow-md flex items-center gap-2">
          <span className="text-cyan-400 font-bold">İPUCU:</span>
          <span>{currentLevel.tip}</span>
        </div>
      )}
    </div>
  );
};
