import React from 'react';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { ControlInputs } from '../game/types';

interface TouchControlsProps {
  inputs: React.MutableRefObject<ControlInputs>;
}

export const TouchControls: React.FC<TouchControlsProps> = ({ inputs }) => {
  // Helper for holding buttons with multi-touch
  const handleLeftDown = (e: React.PointerEvent) => {
    e.preventDefault();
    inputs.current.left = true;
  };
  const handleLeftUp = (e: React.PointerEvent) => {
    e.preventDefault();
    inputs.current.left = false;
  };

  const handleRightDown = (e: React.PointerEvent) => {
    e.preventDefault();
    inputs.current.right = true;
  };
  const handleRightUp = (e: React.PointerEvent) => {
    e.preventDefault();
    inputs.current.right = false;
  };

  const handleJumpDown = (e: React.PointerEvent) => {
    e.preventDefault();
    inputs.current.jump = true;
    inputs.current.jumpPressed = true;
  };
  const handleJumpUp = (e: React.PointerEvent) => {
    e.preventDefault();
    inputs.current.jump = false;
    inputs.current.jumpReleased = true;
  };

  return (
    <div className="absolute inset-x-0 bottom-4 px-6 flex justify-between items-end pointer-events-none select-none z-20">
      {/* Direction D-PAD (Left / Right) */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* LEFT */}
        <button
          type="button"
          onPointerDown={handleLeftDown}
          onPointerUp={handleLeftUp}
          onPointerCancel={handleLeftUp}
          onPointerLeave={handleLeftUp}
          className="w-16 h-16 rounded-2xl bg-slate-900/70 active:bg-cyan-600/40 border-2 border-cyan-500/40 active:border-cyan-400 text-cyan-300 flex items-center justify-center backdrop-blur-md shadow-lg shadow-cyan-950/40 transition active:scale-90 touch-none"
          aria-label="Sola Git"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* RIGHT */}
        <button
          type="button"
          onPointerDown={handleRightDown}
          onPointerUp={handleRightUp}
          onPointerCancel={handleRightUp}
          onPointerLeave={handleRightUp}
          className="w-16 h-16 rounded-2xl bg-slate-900/70 active:bg-cyan-600/40 border-2 border-cyan-500/40 active:border-cyan-400 text-cyan-300 flex items-center justify-center backdrop-blur-md shadow-lg shadow-cyan-950/40 transition active:scale-90 touch-none"
          aria-label="Sağa Git"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* JUMP BUTTON (Large & Responsive) */}
      <div className="pointer-events-auto">
        <button
          type="button"
          onPointerDown={handleJumpDown}
          onPointerUp={handleJumpUp}
          onPointerCancel={handleJumpUp}
          onPointerLeave={handleJumpUp}
          className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-fuchsia-600/60 to-cyan-500/60 active:from-fuchsia-500 active:to-cyan-400 border-2 border-fuchsia-400/60 active:border-cyan-300 text-white flex flex-col items-center justify-center backdrop-blur-md shadow-xl shadow-fuchsia-950/50 transition active:scale-90 touch-none font-display font-black"
          aria-label="Zıpla"
        >
          <ArrowUp className="w-7 h-7 mb-0.5 animate-bounce" />
          <span className="text-[11px] tracking-wider uppercase font-bold">ZIPLA</span>
        </button>
      </div>
    </div>
  );
};
