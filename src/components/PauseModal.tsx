import React from 'react';
import { Play, RotateCcw, Grid, Home, Volume2, VolumeX, Skull, Clock } from 'lucide-react';
import { sounds } from '../game/audio';
import { GameEngine } from '../game/engine';

interface PauseModalProps {
  engine: GameEngine;
  onResume: () => void;
  onRestart: () => void;
  onOpenLevels: () => void;
  onMainMenu: () => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  engine,
  onResume,
  onRestart,
  onOpenLevels,
  onMainMenu,
  onToggleSound,
  soundEnabled,
}) => {
  return (
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-30 flex items-center justify-center p-4 select-none">
      <div className="max-w-sm w-full bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="font-display text-2xl font-black text-cyan-400 tracking-wider mb-1">
          OYUN DURAKLATILDI
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          {engine.currentLevelData.name}
        </p>

        {/* Current Level Quick Stats */}
        <div className="w-full grid grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 mb-5">
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              Süre
            </span>
            <span className="font-mono text-white font-bold text-sm">
              {engine.levelTimer.toFixed(1)}s
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Skull className="w-3 h-3 text-rose-400" />
              Bu Bölüm Deneme
            </span>
            <span className="font-mono text-white font-bold text-sm">
              {engine.levelAttempts}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          {/* DEVAM ET */}
          <button
            onClick={() => {
              sounds.playClick();
              onResume();
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-display font-bold text-sm tracking-wider shadow-lg shadow-cyan-500/20 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>DEVAM ET</span>
          </button>

          {/* BÖLÜMÜ YENİDEN BAŞLAT */}
          <button
            onClick={() => {
              sounds.playClick();
              onRestart();
            }}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-display text-xs font-semibold tracking-wider border border-slate-700 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>BÖLÜMÜ YENİDEN BAŞLAT [R]</span>
          </button>

          {/* BÖLÜM SEÇİMİ */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenLevels();
            }}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-display text-xs font-semibold tracking-wider border border-slate-700 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Grid className="w-4 h-4 text-indigo-400" />
            <span>BÖLÜMLER</span>
          </button>

          {/* SES AÇ / KAPAT */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-display text-xs tracking-wider border border-slate-800 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>SESLERİ KAPAT</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span>SESLERİ AÇ</span>
              </>
            )}
          </button>

          {/* ANA MENÜ */}
          <button
            onClick={() => {
              sounds.playClick();
              onMainMenu();
            }}
            className="w-full py-2.5 rounded-xl bg-transparent hover:bg-slate-900 text-slate-400 hover:text-slate-200 font-display text-xs tracking-wider active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>ANA MENÜYE DÖN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
