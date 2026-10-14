import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameEngine } from './game/engine';
import { ControlInputs, GameSaveData, GameScreen } from './game/types';
import { loadSaveData, saveGameData, resetGameData } from './game/storage';
import { sounds } from './game/audio';
import { LEVELS } from './game/levels';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { TouchControls } from './components/TouchControls';
import { MainMenu } from './components/MainMenu';
import { LevelSelect } from './components/LevelSelect';
import { SettingsModal } from './components/SettingsModal';
import { PauseModal } from './components/PauseModal';
import { VictoryModal } from './components/VictoryModal';

export default function App() {
  const [saveData, setSaveData] = useState<GameSaveData>(() => loadSaveData());
  const [screen, setScreen] = useState<GameScreen>('MENU');
  const [currentLevelId, setCurrentLevelId] = useState<number>(() => {
    const saved = loadSaveData();
    return saved.currentLevel || 1;
  });

  // Engine ref
  const engineRef = useRef<GameEngine | null>(null);
  const [, setTick] = useState(0); // Trigger React re-render when needed

  // Input states
  const inputsRef = useRef<ControlInputs>({
    left: false,
    right: false,
    jump: false,
    jumpPressed: false,
    jumpReleased: false,
    restart: false,
    pause: false,
  });

  // Sound settings initialization
  const [soundEnabled, setSoundEnabled] = useState(saveData.settings.sfx);

  // Initialize or re-initialize engine
  const getOrCreateEngine = useCallback((lvlId: number, data: GameSaveData) => {
    if (!engineRef.current) {
      const eng = new GameEngine(lvlId, data);
      engineRef.current = eng;
    } else {
      engineRef.current.setLevel(lvlId);
    }
    return engineRef.current;
  }, []);

  // Update save data helper
  const updateSaveData = useCallback((updater: (prev: GameSaveData) => GameSaveData) => {
    setSaveData((prev) => {
      const next = updater(prev);
      saveGameData(next);
      return next;
    });
  }, []);

  // Setup Engine callbacks
  useEffect(() => {
    const engine = getOrCreateEngine(currentLevelId, saveData);

    engine.onLevelCompleteCallback = (lvlId, time, attempts) => {
      updateSaveData((prev) => {
        const completed = prev.completedLevels.includes(lvlId)
          ? prev.completedLevels
          : [...prev.completedLevels, lvlId];
        const nextId = lvlId + 1;
        const unlocked =
          nextId <= LEVELS.length && !prev.unlockedLevels.includes(nextId)
            ? [...prev.unlockedLevels, nextId]
            : prev.unlockedLevels;

        const best = prev.bestTimes[lvlId];
        const newBestTimes = {
          ...prev.bestTimes,
          [lvlId]: best !== undefined ? Math.min(best, parseFloat(time.toFixed(2))) : parseFloat(time.toFixed(2)),
        };

        const newDeaths = {
          ...prev.levelDeaths,
          [lvlId]: (prev.levelDeaths[lvlId] || 0) + (attempts - 1),
        };

        return {
          ...prev,
          completedLevels: completed,
          unlockedLevels: unlocked,
          bestTimes: newBestTimes,
          levelDeaths: newDeaths,
          currentLevel: nextId <= 20 ? nextId : prev.currentLevel,
        };
      });

      // Smooth delay before loading next level
      setTimeout(() => {
        if (lvlId < 20) {
          const nextLvl = lvlId + 1;
          setCurrentLevelId(nextLvl);
          engine.setLevel(nextLvl);
        } else if (lvlId === 20) {
          setScreen('VICTORY');
        } else if (lvlId === 21) {
          setScreen('VICTORY');
        }
      }, 1000);
    };

    engine.onVictoryCallback = () => {
      setScreen('VICTORY');
    };

    engine.onSecretFoundCallback = () => {
      updateSaveData((prev) => ({
        ...prev,
        secretUnlocked: true,
        unlockedLevels: prev.unlockedLevels.includes(21)
          ? prev.unlockedLevels
          : [...prev.unlockedLevels, 21],
      }));
    };
  }, [currentLevelId, getOrCreateEngine, updateSaveData, saveData]);

  // Audio setup on start
  useEffect(() => {
    sounds.setSfxEnabled(saveData.settings.sfx);
    sounds.setMusicEnabled(saveData.settings.music);
  }, [saveData.settings]);

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      const key = e.key.toLowerCase();

      // Avoid default browser scrolling with Space or Arrow keys
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) {
        e.preventDefault();
      }

      if (code === 'KeyA' || code === 'ArrowLeft') {
        inputsRef.current.left = true;
      }
      if (code === 'KeyD' || code === 'ArrowRight') {
        inputsRef.current.right = true;
      }
      if (code === 'Space' || code === 'KeyW' || code === 'ArrowUp') {
        if (!inputsRef.current.jump) {
          inputsRef.current.jumpPressed = true;
        }
        inputsRef.current.jump = true;
      }
      if (key === 'r') {
        inputsRef.current.restart = true;
      }
      if (code === 'Escape') {
        if (screen === 'PLAYING') {
          setScreen('PAUSED');
        } else if (screen === 'PAUSED') {
          setScreen('PLAYING');
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code;
      const key = e.key.toLowerCase();

      if (code === 'KeyA' || code === 'ArrowLeft') {
        inputsRef.current.left = false;
      }
      if (code === 'KeyD' || code === 'ArrowRight') {
        inputsRef.current.right = false;
      }
      if (code === 'Space' || code === 'KeyW' || code === 'ArrowUp') {
        inputsRef.current.jump = false;
        inputsRef.current.jumpReleased = true;
      }
      if (key === 'r') {
        inputsRef.current.restart = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [screen]);

  // Fixed 60Hz Physics Game Loop
  useEffect(() => {
    if (screen !== 'PLAYING') return;

    const intervalId = window.setInterval(() => {
      if (engineRef.current && screen === 'PLAYING') {
        engineRef.current.update(inputsRef.current);
        // Reset single-frame triggers
        inputsRef.current.jumpPressed = false;
        inputsRef.current.jumpReleased = false;
      }
    }, 1000 / 60);

    return () => clearInterval(intervalId);
  }, [screen]);

  // Actions
  const handleStartGame = () => {
    sounds.playClick();
    const lvlId = saveData.currentLevel || 1;
    setCurrentLevelId(lvlId);
    if (engineRef.current) {
      engineRef.current.setLevel(lvlId);
    }
    setScreen('PLAYING');
  };

  const handleSelectLevel = (levelId: number) => {
    sounds.playClick();
    setCurrentLevelId(levelId);
    updateSaveData((prev) => ({ ...prev, currentLevel: levelId }));
    if (engineRef.current) {
      engineRef.current.setLevel(levelId);
    }
    setScreen('PLAYING');
  };

  const handleRestart = () => {
    if (engineRef.current) {
      engineRef.current.respawnPlayer();
    }
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sounds.setSfxEnabled(nextVal);
    updateSaveData((prev) => ({
      ...prev,
      settings: { ...prev.settings, sfx: nextVal },
    }));
  };

  const handleUpdateSettings = (newSettings: GameSaveData['settings']) => {
    updateSaveData((prev) => {
      const next = {
        ...prev,
        settings: newSettings,
      };
      if (engineRef.current) {
        engineRef.current.setSaveData(next);
      }
      return next;
    });
    setSoundEnabled(newSettings.sfx);
  };

  const handleResetProgress = () => {
    const fresh = resetGameData();
    setSaveData(fresh);
    setCurrentLevelId(1);
    if (engineRef.current) {
      engineRef.current.setLevel(1);
    }
  };

  const handlePlayAgain = () => {
    setCurrentLevelId(1);
    updateSaveData((prev) => ({ ...prev, currentLevel: 1 }));
    if (engineRef.current) {
      engineRef.current.setLevel(1);
    }
    setScreen('PLAYING');
  };

  const handlePlaySecretLevel = () => {
    setCurrentLevelId(21);
    updateSaveData((prev) => ({ ...prev, currentLevel: 21 }));
    if (engineRef.current) {
      engineRef.current.setLevel(21);
    }
    setScreen('PLAYING');
  };

  // Determine if touch controls should be shown
  const isTouchDevice =
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0);

  const showTouchControls =
    saveData.settings.touchControls === 'always' ||
    (saveData.settings.touchControls === 'auto' && isTouchDevice);

  const engine = getOrCreateEngine(currentLevelId, saveData);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070514] text-white flex items-center justify-center font-sans select-none">
      {/* MAIN MENU SCREEN */}
      {screen === 'MENU' && (
        <MainMenu
          saveData={saveData}
          onPlay={handleStartGame}
          onOpenLevels={() => setScreen('LEVEL_SELECT')}
          onOpenSettings={() => setScreen('SETTINGS')}
        />
      )}

      {/* LEVEL SELECT SCREEN */}
      {screen === 'LEVEL_SELECT' && (
        <LevelSelect
          saveData={saveData}
          onSelectLevel={handleSelectLevel}
          onBack={() => setScreen('MENU')}
        />
      )}

      {/* SETTINGS SCREEN */}
      {screen === 'SETTINGS' && (
        <SettingsModal
          saveData={saveData}
          onUpdateSettings={handleUpdateSettings}
          onResetProgress={handleResetProgress}
          onBack={() => setScreen('MENU')}
        />
      )}

      {/* ACTIVE GAME PLAYING */}
      {(screen === 'PLAYING' || screen === 'PAUSED') && (
        <div className="relative w-full h-full flex items-center justify-center">
          <GameCanvas
            engine={engine}
            onNextLevel={() => {
              if (currentLevelId < 20) {
                const nxt = currentLevelId + 1;
                setCurrentLevelId(nxt);
                engine.setLevel(nxt);
              }
            }}
          />

          {/* In-Game Heads-Up Display */}
          <HUD
            engine={engine}
            saveData={saveData}
            onPause={() => setScreen('PAUSED')}
            onToggleSound={handleToggleSound}
            soundEnabled={soundEnabled}
            onRestart={handleRestart}
          />

          {/* Touch Controls for Mobile/Tablet */}
          {showTouchControls && <TouchControls inputs={inputsRef} />}

          {/* PAUSE MODAL OVERLAY */}
          {screen === 'PAUSED' && (
            <PauseModal
              engine={engine}
              onResume={() => setScreen('PLAYING')}
              onRestart={() => {
                handleRestart();
                setScreen('PLAYING');
              }}
              onOpenLevels={() => setScreen('LEVEL_SELECT')}
              onMainMenu={() => setScreen('MENU')}
              onToggleSound={handleToggleSound}
              soundEnabled={soundEnabled}
            />
          )}
        </div>
      )}

      {/* VICTORY MODAL OVERLAY */}
      {screen === 'VICTORY' && (
        <VictoryModal
          saveData={saveData}
          onPlayAgain={handlePlayAgain}
          onPlaySecretLevel={handlePlaySecretLevel}
          onMainMenu={() => setScreen('MENU')}
        />
      )}
    </div>
  );
}
