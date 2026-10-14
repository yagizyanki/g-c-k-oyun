import React, { useEffect } from 'react';
import { Trophy, RotateCcw, Home, Skull, Clock, Sparkles, Award } from 'lucide-react';
import { GameSaveData } from '../game/types';
import { sounds } from '../game/audio';

interface VictoryModalProps {
  saveData: GameSaveData;
  onPlayAgain: () => void;
  onPlaySecretLevel: () => void;
  onMainMenu: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  saveData,
  onPlayAgain,
  onPlaySecretLevel,
  onMainMenu,
}) => {
  useEffect(() => {
    sounds.playWin();
  }, []);

  const totalDeaths = saveData.totalDeaths;
  
  // Calculate player rating
  let rank = 'S';
  let rankTitle = 'RAGE TANRISI';
  let rankColor = 'text-amber-400';
  if (totalDeaths > 100) {
    rank = 'C';
    rankTitle = 'SABIR ABİDESİ';
    rankColor = 'text-cyan-400';
  } else if (totalDeaths > 50) {
    rank = 'B';
    rankTitle = 'ÇELİK İRADELİ';
    rankColor = 'text-emerald-400';
  } else if (totalDeaths > 20) {
    rank = 'A';
    rankTitle = 'PLATFORM ŞAMPİYONU';
    rankColor = 'text-fuchsia-400';
  }

  // Calculate sum of best times
  const totalBestTime = Object.values(saveData.bestTimes).reduce((acc, t) => acc + t, 0);

  return (
    <div className="absolute inset-0 bg-[#070514]/90 backdrop-blur-lg z-40 flex items-center justify-center p-4 select-none cyber-grid-bg overflow-y-auto">
      <div className="max-w-md w-full bg-slate-900/90 border-2 border-cyan-400/50 rounded-3xl p-6 md:p-8 shadow-2xl shadow-cyan-950/60 flex flex-col items-center text-center">
        {/* Glowing Trophy */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-yellow-200 flex items-center justify-center shadow-xl shadow-amber-500/40 animate-pulse">
            <Trophy className="w-10 h-10 text-slate-950" />
          </div>
          <Sparkles className="w-6 h-6 text-amber-300 absolute -top-2 -right-2 animate-bounce" />
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-fuchsia-400">
          TEBRİKLER!
        </h1>
        <p className="text-sm font-semibold text-cyan-300 mt-1">
          İMKÂNSIZ ZIPLAMA: RAGE EDITION TAMAMLANDI!
        </p>

        {/* Rank Card */}
        <div className="w-full my-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-around">
          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Rage Derecesi
            </span>
            <span className={`font-display font-black text-4xl ${rankColor}`}>
              {rank}
            </span>
            <span className="text-[11px] font-bold text-slate-300 mt-0.5">
              {rankTitle}
            </span>
          </div>

          <div className="h-12 w-[1px] bg-slate-800" />

          {/* Stats */}
          <div className="flex flex-col gap-1.5 text-left text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Skull className="w-3.5 h-3.5 text-rose-400" />
              <span>Toplam Ölüm: <strong className="text-white">{totalDeaths}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Toplam Süre: <strong className="text-white">{totalBestTime.toFixed(1)}s</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>20 / 20 Bölüm</span>
            </div>
          </div>
        </div>

        {/* Secret Level Promo */}
        <div className="w-full mb-6 p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 flex flex-col gap-2">
          <div className="flex items-center justify-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>GİZLİ BÖLÜM 21 AÇILDI!</span>
          </div>
          <p className="text-[11px] text-amber-300/80">
            En zorlu meydan okumaya hazırsan "Rage Cehennemi" seni bekliyor.
          </p>
          <button
            onClick={() => {
              sounds.playClick();
              onPlaySecretLevel();
            }}
            className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-black text-xs tracking-wider transition cursor-pointer active:scale-95 shadow-md shadow-amber-500/30"
          >
            GİZLİ BÖLÜMÜ OYNA
          </button>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={() => {
              sounds.playClick();
              onPlayAgain();
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-display font-bold text-sm tracking-wider shadow-lg shadow-cyan-500/30 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>YENİDEN BAŞTAN OYNA (SPEEDRUN)</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onMainMenu();
            }}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-display text-xs font-semibold tracking-wider border border-slate-700 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>ANA MENÜ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
