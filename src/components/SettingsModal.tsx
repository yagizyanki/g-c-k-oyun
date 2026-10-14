import React, { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  Trash2,
  Keyboard,
  Palette,
  Check,
  Sparkles,
} from 'lucide-react';
import { GameSaveData } from '../game/types';
import { sounds } from '../game/audio';
import { NEON_THEMES, NeonThemeId } from '../game/themes';

interface SettingsModalProps {
  saveData: GameSaveData;
  onUpdateSettings: (newSettings: GameSaveData['settings']) => void;
  onResetProgress: () => void;
  onBack: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  saveData,
  onUpdateSettings,
  onResetProgress,
  onBack,
}) => {
  const [settings, setSettings] = useState(saveData.settings);
  const [confirmReset, setConfirmReset] = useState(false);

  const toggleSfx = () => {
    sounds.playClick();
    const updated = { ...settings, sfx: !settings.sfx };
    setSettings(updated);
    sounds.setSfxEnabled(updated.sfx);
    onUpdateSettings(updated);
  };

  const toggleMusic = () => {
    sounds.playClick();
    const updated = { ...settings, music: !settings.music };
    setSettings(updated);
    sounds.setMusicEnabled(updated.music);
    onUpdateSettings(updated);
  };

  const toggleShake = () => {
    sounds.playClick();
    const updated = { ...settings, screenShake: !settings.screenShake };
    setSettings(updated);
    onUpdateSettings(updated);
  };

  const handleTouchChange = (mode: 'auto' | 'always' | 'never') => {
    sounds.playClick();
    const updated = { ...settings, touchControls: mode };
    setSettings(updated);
    onUpdateSettings(updated);
  };

  const handleSelectTheme = (themeId: NeonThemeId) => {
    sounds.playClick();
    const updated = { ...settings, theme: themeId };
    setSettings(updated);
    onUpdateSettings(updated);
  };

  const currentTheme = NEON_THEMES[settings.theme || 'cyber-cyan'];

  return (
    <div className="relative w-full h-full flex flex-col p-4 md:p-8 bg-[#070514] select-none overflow-y-auto cyber-grid-bg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 max-w-2xl mx-auto w-full">
        <button
          onClick={() => {
            sounds.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition active:scale-95 cursor-pointer text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Geri</span>
        </button>

        <h2 className="font-display text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
          AYARLAR & KONTROLLER
        </h2>

        <div className="w-16" />
      </div>

      <div className="max-w-2xl mx-auto w-full flex flex-col gap-5 pb-8">
        {/* NEON THEME SELECTOR CARD */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-cyan-400 flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              Neon Renk Teması
            </h3>
            <span
              className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border"
              style={{
                color: currentTheme.badgeColor,
                borderColor: `${currentTheme.badgeColor}60`,
                backgroundColor: `${currentTheme.badgeColor}15`,
              }}
            >
              Aktif: {currentTheme.name}
            </span>
          </div>

          <p className="text-xs text-slate-400 -mt-1">
            Seçilen tema oyunun arka planına, dikenlerine, karakterine ve patlama parçacıklarına yansır.
          </p>

          {/* Theme Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
            {(Object.keys(NEON_THEMES) as NeonThemeId[]).map((themeKey) => {
              const th = NEON_THEMES[themeKey];
              const isSelected = (settings.theme || 'cyber-cyan') === themeKey;

              return (
                <button
                  key={themeKey}
                  type="button"
                  onClick={() => handleSelectTheme(themeKey)}
                  className={`relative flex flex-col p-3 rounded-xl border text-left transition duration-200 active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 bg-slate-900 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400'
                      : 'border-slate-800 bg-slate-900/50 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  {/* Theme Header */}
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-display text-xs font-bold text-white">
                      {th.name}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Visual Preview Swatches */}
                  <div className="flex items-center gap-1.5 w-full mt-1">
                    {/* Background preview */}
                    <div
                      className="w-6 h-6 rounded-md border border-slate-700 flex items-center justify-center text-[10px]"
                      style={{
                        background: `linear-gradient(135deg, ${th.bgGradient[0]}, ${th.bgGradient[1]})`,
                      }}
                      title="Arka Plan Rengi"
                    >
                      <Sparkles className="w-3 h-3 text-slate-400" />
                    </div>

                    {/* Player preview */}
                    <div
                      className="w-6 h-6 rounded-md border flex items-center justify-center shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${th.player.gradStart}, ${th.player.gradEnd})`,
                        borderColor: th.player.border,
                        boxShadow: `0 0 6px ${th.player.glow}60`,
                      }}
                      title="Karakter Rengi"
                    >
                      <div className="w-1 h-1 rounded-full bg-slate-900" />
                    </div>

                    {/* Spike preview */}
                    <div
                      className="w-6 h-6 rounded-md border flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${th.spikes.gradStart}, ${th.spikes.gradEnd})`,
                        borderColor: th.spikes.tip,
                        boxShadow: `0 0 6px ${th.spikes.glow}60`,
                      }}
                      title="Diken Rengi"
                    >
                      <span className="text-[10px] font-bold text-white leading-none">▲</span>
                    </div>

                    {/* Particle Swatch Bar */}
                    <div className="flex-1 flex gap-0.5 h-3 items-center ml-1">
                      {th.particles.slice(0, 3).map((pCol, idx) => (
                        <div
                          key={idx}
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: pCol }}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio & Visual Options */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-display text-base font-bold text-cyan-400 flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Ses ve Titreşim Ayarları
          </h3>

          {/* SFX Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Ses Efektleri (SFX)</span>
              <span className="text-xs text-slate-400">Zıplama, çarpışma ve kazanma sesleri</span>
            </div>
            <button
              onClick={toggleSfx}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                settings.sfx
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {settings.sfx ? 'AÇIK' : 'KAPALI'}
            </button>
          </div>

          {/* Music Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Arka Plan Synth Müziği</span>
              <span className="text-xs text-slate-400">Cyberpunk neon synthesizer melodisi</span>
            </div>
            <button
              onClick={toggleMusic}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                settings.music
                  ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {settings.music ? 'AÇIK' : 'KAPALI'}
            </button>
          </div>

          {/* Screen Shake Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Ekran Titremesi (Screen Shake)</span>
              <span className="text-xs text-slate-400">Çarpışmalarda ekran sarsıntısı efekti</span>
            </div>
            <button
              onClick={toggleShake}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                settings.screenShake
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {settings.screenShake ? 'AÇIK' : 'KAPALI'}
            </button>
          </div>

          {/* Touch Controls Mode */}
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Dokunmatik Ekran Butonları</span>
              <span className="text-xs text-slate-400">Mobil veya tablet kontrolleri</span>
            </div>
            <div className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(['auto', 'always', 'never'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleTouchChange(mode)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer uppercase ${
                    settings.touchControls === mode
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode === 'auto' ? 'Oto' : mode === 'always' ? 'Açık' : 'Kapalı'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls Reference Card */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
          <h3 className="font-display text-base font-bold text-fuchsia-400 flex items-center gap-2">
            <Keyboard className="w-4 h-4" />
            Oyun Kontrolleri
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-slate-400">Sola / Sağa Git:</span>
              <span className="font-mono font-bold text-cyan-300">A / D veya Sol / Sağ Ok</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-slate-400">Zıpla:</span>
              <span className="font-mono font-bold text-cyan-300">BOŞLUK / W / Yukarı Ok</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-slate-400">Hızlı Yeniden Başlat:</span>
              <span className="font-mono font-bold text-rose-300">R Tuşu</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <span className="text-slate-400">Duraklat / Menü:</span>
              <span className="font-mono font-bold text-amber-300">ESC Tuşu</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-900/30 p-2.5 rounded-xl border border-slate-800">
            💡 <strong>İpucu:</strong> Zıplama tuşunu hemen bırakırsan alçak zıplarsın, basılı tutarsan azami yüksekliğe ulaşırsın. Havada duvara yapışıp zıplayarak <em>Wall-Jump</em> yapabilirsin!
          </div>
        </div>

        {/* Reset Progress Section */}
        <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-rose-300 flex items-center gap-1.5">
              <Trash2 className="w-4 h-4 text-rose-400" />
              İlerlemeyi Sıfırla
            </span>
            <span className="text-xs text-rose-400/80">
              Tüm kayıtları, skorları ve tamamlanan bölümleri siler
            </span>
          </div>

          {confirmReset ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer"
              >
                Evet, Sıfırla!
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition cursor-pointer"
              >
                İptal
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition cursor-pointer"
            >
              Sıfırla
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
