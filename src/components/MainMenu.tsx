import React from 'react';
import { Play, Grid, Settings as SettingsIcon, Skull, Trophy, Flame, Sparkles } from 'lucide-react';
import { GameSaveData } from '../game/types';
import { sounds } from '../game/audio';

import { NEON_THEMES } from '../game/themes';

interface MainMenuProps {
  saveData: GameSaveData;
  onPlay: () => void;
  onOpenLevels: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  saveData,
  onPlay,
  onOpenLevels,
  onOpenSettings,
}) => {
  const completedCount = saveData.completedLevels.length;
  const currentLevel = saveData.currentLevel;
  const theme = NEON_THEMES[saveData.settings.theme || 'cyber-cyan'];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-[#070514] select-none overflow-hidden cyber-grid-bg">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blur-[120px] rounded-full pointer-events-none"
        style={{ backgroundColor: `${theme.accentColor}25` }}
      />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-fuchsia-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Container */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center">
        {/* Animated Cute Cyber Cube Mascot */}
        <div className="relative mb-6">
          <div
            className="w-16 h-16 rounded-xl border-2 border-white flex items-center justify-center animate-bounce shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${theme.player.gradStart}, ${theme.player.gradEnd})`,
              boxShadow: `0 10px 25px ${theme.player.glow}60`,
            }}
          >
            {/* Mascot Eyes */}
            <div className="flex gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white -translate-y-0.5" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white -translate-y-0.5" />
              </div>
            </div>
          </div>
          {/* Shadow beneath mascot */}
          <div
            className="w-12 h-2 mx-auto rounded-full blur-sm -mt-1"
            style={{ backgroundColor: `${theme.accentColor}40` }}
          />
        </div>

        {/* Title & Tagline */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            RAGE EDITION
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 drop-shadow-lg tracking-wider">
            İMKÂNSIZ ZIPLAMA
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-medium">
            Öfkeni test edecek 20 zorlu bölüm. Zıpla, kaçın ve asla pes etme!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs mb-8">
          {/* OYNA */}
          <button
            onClick={() => {
              sounds.playClick();
              onPlay();
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-display font-bold text-lg tracking-wider shadow-lg shadow-cyan-500/30 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2 group"
          >
            <Play className="w-5 h-5 fill-current group-hover:scale-110 transition" />
            <span>{completedCount > 0 ? `DEVAM ET (BÖLÜM ${currentLevel})` : 'OYNA'}</span>
          </button>

          {/* BÖLÜMLER */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenLevels();
            }}
            className="w-full py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-display font-semibold text-sm tracking-wider border border-slate-700/80 shadow-md active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Grid className="w-4 h-4 text-cyan-400" />
            <span>BÖLÜMLER ({completedCount}/20)</span>
          </button>

          {/* AYARLAR */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSettings();
            }}
            className="w-full py-3 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white font-display text-xs tracking-wider border border-slate-800 shadow-sm active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <SettingsIcon className="w-4 h-4 text-slate-400" />
            <span>AYARLAR & KONTROLLER</span>
          </button>
        </div>

        {/* Player Stats Summary Bar */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950/60 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800/80">
          {/* Total Deaths */}
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/40">
            <div className="flex items-center gap-1 text-rose-400 text-xs font-semibold">
              <Skull className="w-3.5 h-3.5" />
              <span>Toplam Ölüm</span>
            </div>
            <span className="font-mono text-lg font-bold text-white mt-0.5">
              {saveData.totalDeaths}
            </span>
          </div>

          {/* Completed Levels */}
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/40">
            <div className="flex items-center gap-1 text-cyan-400 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Tamamlanan</span>
            </div>
            <span className="font-mono text-lg font-bold text-white mt-0.5">
              {completedCount} / 20
            </span>
          </div>

          {/* Bonus / Secret status */}
          <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900/40">
            <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gizli Bölüm</span>
            </div>
            <span className="text-xs font-bold text-slate-300 mt-1">
              {saveData.secretUnlocked ? (
                <span className="text-emerald-400">Açık (Bölüm 21)</span>
              ) : (
                <span className="text-slate-500">Kilitli</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
