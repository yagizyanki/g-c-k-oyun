import React from 'react';
import { ArrowLeft, Lock, CheckCircle2, Shield, Skull, Clock, Sparkles } from 'lucide-react';
import { GameSaveData } from '../game/types';
import { LEVELS } from '../game/levels';
import { sounds } from '../game/audio';

interface LevelSelectProps {
  saveData: GameSaveData;
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  saveData,
  onSelectLevel,
  onBack,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col p-4 md:p-8 bg-[#070514] select-none overflow-y-auto cyber-grid-bg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 max-w-4xl mx-auto w-full">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition active:scale-95 cursor-pointer text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Ana Menü</span>
        </button>

        <h2 className="font-display text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
          BÖLÜM SEÇİMİ
        </h2>

        <div className="text-xs font-mono text-slate-400">
          {saveData.completedLevels.length} / {LEVELS.length} Bitti
        </div>
      </div>

      {/* Levels Grid (4-5 columns) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 max-w-4xl mx-auto w-full pb-8">
        {LEVELS.map((level) => {
          const isSecret = level.id === 21;
          const isUnlocked =
            saveData.unlockedLevels.includes(level.id) ||
            (isSecret && saveData.secretUnlocked);
          const isCompleted = saveData.completedLevels.includes(level.id);
          const isCheckpoint = level.isCheckpoint;
          const deaths = saveData.levelDeaths[level.id] || 0;
          const bestTime = saveData.bestTimes[level.id];

          return (
            <button
              key={level.id}
              disabled={!isUnlocked}
              onClick={() => {
                if (isUnlocked) {
                  sounds.playClick();
                  onSelectLevel(level.id);
                }
              }}
              className={`relative flex flex-col p-3 rounded-2xl border text-left transition duration-150 active:scale-95 cursor-pointer ${
                isUnlocked
                  ? isSecret
                    ? 'bg-amber-950/30 hover:bg-amber-900/40 border-amber-500/50 hover:border-amber-400 shadow-lg shadow-amber-950/30'
                    : isCompleted
                    ? 'bg-indigo-950/40 hover:bg-indigo-900/50 border-cyan-500/40 hover:border-cyan-400 shadow-md'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-700/80 hover:border-slate-600'
                  : 'bg-slate-950/40 border-slate-900 opacity-40 cursor-not-allowed'
              }`}
            >
              {/* Checkpoint / Secret Badge */}
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-display font-black text-lg text-white">
                  {level.id < 10 ? `0${level.id}` : level.id}
                </span>

                {isCheckpoint && (
                  <span
                    className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    title="Kontrol Noktası"
                  >
                    <Shield className="w-3.5 h-3.5" />
                  </span>
                )}

                {isSecret && (
                  <span
                    className="p-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse"
                    title="Gizli Bölüm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                )}

                {isCompleted && (
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                )}

                {!isUnlocked && <Lock className="w-4 h-4 text-slate-600" />}
              </div>

              {/* Level Title */}
              <div className="text-xs font-semibold text-slate-300 truncate w-full mb-2">
                {level.name.split(':')[1]?.trim() || level.name}
              </div>

              {/* Stats: Deaths & Time */}
              {isUnlocked ? (
                <div className="mt-auto flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                  <div className="flex items-center gap-1">
                    <Skull className="w-3 h-3 text-rose-400" />
                    <span>{deaths}</span>
                  </div>
                  {bestTime !== undefined && (
                    <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>{bestTime}s</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-auto text-[10px] text-slate-600 font-mono">
                  Kilitli
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
