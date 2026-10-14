import React, { useEffect, useRef } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH, GameEngine } from '../game/engine';
import { NeonTheme } from '../game/themes';

interface GameCanvasProps {
  engine: GameEngine;
  onNextLevel: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ engine, onNextLevel }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const theme = engine.getTheme();

      // 1. Clear & Background Gradient from Theme
      ctx.save();

      // Apply screen shake
      if (engine.screenShake > 0) {
        const shakeX = (Math.random() - 0.5) * engine.screenShake;
        const shakeY = (Math.random() - 0.5) * engine.screenShake;
        ctx.translate(shakeX, shakeY);
      }

      // Space gradient based on theme
      const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      bgGrad.addColorStop(0, theme.bgGradient[0]);
      bgGrad.addColorStop(0.5, theme.bgGradient[1]);
      bgGrad.addColorStop(1, theme.bgGradient[2]);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Cyber Grid based on theme
      ctx.strokeStyle = theme.gridColor;
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < CANVAS_WIDTH; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < CANVAS_HEIGHT; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }

      // Parallax drifting stars / dust with theme star color
      for (const s of engine.stars) {
        ctx.fillStyle = `${theme.starColor}${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Platforms
      for (const p of engine.platforms) {
        if (p.type === 'laser') {
          renderLaser(ctx, p, theme);
          continue;
        }

        if (p.type === 'crumbly' && p.isFallen) {
          continue; // Don't draw fallen blocks
        }

        ctx.save();
        const renderX = p.x + (p.shakeOffsetX || 0);
        const renderY = p.y;

        if (p.type === 'fake') {
          // Subtle shimmer for fake blocks
          ctx.fillStyle = '#141328';
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
        } else if (p.type === 'crumbly') {
          // Crumbly blocks turn reddish/orange when stepped on
          ctx.fillStyle = p.isCrumbling ? '#3f1822' : '#1e1430';
          ctx.strokeStyle = p.isCrumbling ? '#ef4444' : '#f97316';
          ctx.lineWidth = 2;
          ctx.shadowColor = p.isCrumbling ? '#ef4444' : '#f97316';
          ctx.shadowBlur = p.isCrumbling ? 10 : 4;
        } else if (p.type === 'spring') {
          // Neon Spring pad
          ctx.fillStyle = '#064e3b';
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 8;
        } else if (p.type === 'moving') {
          // Moving platform with glowing theme accent
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = theme.accentColor;
          ctx.lineWidth = 2;
          ctx.shadowColor = theme.accentColor;
          ctx.shadowBlur = 8;
        } else {
          // Standard solid neon platform using active theme!
          ctx.fillStyle = theme.platform.bg;
          ctx.strokeStyle = theme.platform.border;
          ctx.lineWidth = 2;
          ctx.shadowColor = theme.platform.shadow;
          ctx.shadowBlur = 6;
        }

        // Fill & Stroke Platform Box
        ctx.beginPath();
        roundRect(ctx, renderX, renderY, p.w, p.h, 4);
        ctx.fill();
        ctx.stroke();

        // Inner platform details
        if (p.type === 'spring') {
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2;
          ctx.beginPath();
          const cx = renderX + p.w / 2;
          const springH = p.springActiveTimer && p.springActiveTimer > 0 ? 5 : 10;
          ctx.moveTo(cx - 10, renderY + p.h - 3);
          ctx.lineTo(cx, renderY + p.h - 3 - springH);
          ctx.lineTo(cx + 10, renderY + p.h - 3);
          ctx.stroke();
        } else if (p.type === 'moving') {
          ctx.fillStyle = theme.accentColor;
          ctx.beginPath();
          ctx.arc(renderX + 8, renderY + p.h / 2, 2.5, 0, Math.PI * 2);
          ctx.arc(renderX + p.w - 8, renderY + p.h / 2, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'crumbly' && p.isCrumbling) {
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(renderX + p.w * 0.3, renderY + 2);
          ctx.lineTo(renderX + p.w * 0.45, renderY + p.h - 2);
          ctx.moveTo(renderX + p.w * 0.7, renderY + 4);
          ctx.lineTo(renderX + p.w * 0.6, renderY + p.h - 3);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 3. Draw Spikes using active Theme
      for (const s of engine.spikes) {
        renderSpike(ctx, s, theme);
      }

      // 4. Draw Secret Token if present
      if (engine.currentLevelData.secretToken && !engine.currentLevelData.secretToken.collected) {
        const token = engine.currentLevelData.secretToken;
        ctx.save();
        ctx.translate(token.x, token.y);
        const rot = Date.now() * 0.003;
        ctx.rotate(rot);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.rotate(Math.PI / 2);
          ctx.lineTo(token.size / 2, 0);
          ctx.lineTo(token.size / 6, token.size / 6);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 5. Draw Finish Portal
      const portal = engine.currentLevelData.portal;
      renderPortal(ctx, portal.x + portal.w / 2, portal.y + portal.h / 2, theme);

      // 6. Draw Player Trails using theme glow
      for (const t of engine.player.trail) {
        ctx.fillStyle = `${theme.player.glow}33`; // 20% opacity
        ctx.beginPath();
        roundRect(ctx, t.x, t.y, t.size, t.size, 3);
        ctx.fill();
      }

      // 7. Draw Player with Theme Colors (if alive)
      if (!engine.player.isDead) {
        renderPlayer(ctx, engine.player, theme);
      }

      // 8. Draw Particles
      for (const p of engine.particles) {
        ctx.save();
        ctx.fillStyle = p.color;
        const alpha = 1 - p.life / p.maxLife;
        ctx.globalAlpha = Math.max(0, alpha);

        if (p.shape === 'confetti') {
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) ctx.rotate(p.rotation);
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'spark') {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) ctx.rotate(p.rotation);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
      }

      // 9. Rage Quote Toast on Screen
      if (engine.rageQuoteTimer > 0 && engine.rageQuote) {
        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = 'bold 18px "Rajdhani", sans-serif';
        const alpha = Math.min(1, engine.rageQuoteTimer / 30);
        ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.fillText(`“${engine.rageQuote}”`, CANVAS_WIDTH / 2, 90);
        ctx.restore();
      }

      // 10. Level Completion Overlay & Banner
      if (engine.isLevelCompleted) {
        renderVictoryBanner(ctx, engine, onNextLevel);
      }

      ctx.restore(); // Restore shake
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [engine, onNextLevel]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#070514]">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="max-w-full max-h-full rounded-xl shadow-2xl border border-indigo-900/40 object-contain aspect-video"
      />
    </div>
  );
};

// Helper: Rounded Rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Render Player Cube with Expressive Eyes & Squash/Stretch using active Theme
function renderPlayer(
  ctx: CanvasRenderingContext2D,
  pl: GameEngine['player'],
  theme: NeonTheme
) {
  ctx.save();
  const centerX = pl.x + pl.w / 2;
  const centerY = pl.y + pl.h / 2;

  ctx.translate(centerX, centerY);
  ctx.scale(pl.squashX, pl.squashY);

  // Outer Neon Glow from theme
  ctx.shadowColor = theme.player.glow;
  ctx.shadowBlur = 14;

  // Body gradient from theme
  const grad = ctx.createLinearGradient(-pl.w / 2, -pl.h / 2, pl.w / 2, pl.h / 2);
  grad.addColorStop(0, theme.player.gradStart);
  grad.addColorStop(1, theme.player.gradEnd);
  ctx.fillStyle = grad;

  // Draw cube body
  roundRect(ctx, -pl.w / 2, -pl.h / 2, pl.w, pl.h, 4);
  ctx.fill();

  // Shiny inner border
  ctx.strokeStyle = theme.player.border;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Expressive Eyes
  const isBlinking = pl.blinkTimer < 8;
  const eyeY = -3 + pl.eyeOffsetY;
  const eyeX = pl.eyeOffsetX;

  if (isBlinking) {
    ctx.strokeStyle = '#082f49';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-6 + eyeX, eyeY);
    ctx.lineTo(-2 + eyeX, eyeY);
    ctx.moveTo(2 + eyeX, eyeY);
    ctx.lineTo(6 + eyeX, eyeY);
    ctx.stroke();
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(-4 + eyeX, eyeY, 3, 0, Math.PI * 2);
    ctx.arc(4 + eyeX, eyeY, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#082f49';
    const pupilOffset = pl.facing * 1.2;
    ctx.beginPath();
    ctx.arc(-4 + eyeX + pupilOffset, eyeY, 1.6, 0, Math.PI * 2);
    ctx.arc(4 + eyeX + pupilOffset, eyeY, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// Render Spikes with Neon Bloom & Sharp Angles using active Theme
function renderSpike(
  ctx: CanvasRenderingContext2D,
  s: GameEngine['spikes'][0],
  theme: NeonTheme
) {
  ctx.save();
  ctx.shadowColor = theme.spikes.glow;
  ctx.shadowBlur = 8;

  // Spike gradient from theme
  const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.h);
  grad.addColorStop(0, theme.spikes.gradStart);
  grad.addColorStop(1, theme.spikes.gradEnd);
  ctx.fillStyle = grad;

  ctx.beginPath();
  if (s.dir === 'up') {
    ctx.moveTo(s.x, s.y + s.h);
    ctx.lineTo(s.x + s.w / 2, s.y);
    ctx.lineTo(s.x + s.w, s.y + s.h);
  } else if (s.dir === 'down') {
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.w / 2, s.y + s.h);
    ctx.lineTo(s.x + s.w, s.y);
  } else if (s.dir === 'left') {
    ctx.moveTo(s.x + s.w, s.y);
    ctx.lineTo(s.x, s.y + s.h / 2);
    ctx.lineTo(s.x + s.w, s.y + s.h);
  } else if (s.dir === 'right') {
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x, s.y + s.h / 2);
    ctx.lineTo(s.x, s.y + s.h);
  }
  ctx.closePath();
  ctx.fill();

  // Spike tip highlight from theme
  ctx.strokeStyle = theme.spikes.tip;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
}

// Render Laser Emitters & Deadly Beams
function renderLaser(
  ctx: CanvasRenderingContext2D,
  p: GameEngine['platforms'][0],
  theme: NeonTheme
) {
  ctx.save();
  ctx.fillStyle = '#1e1b4b';
  ctx.strokeStyle = theme.platform.border;
  ctx.lineWidth = 1.5;
  ctx.fillRect(p.x, p.y, p.w, 14);
  ctx.fillRect(p.x, p.y + p.h - 14, p.w, 14);

  if (p.laserState === 'warn') {
    ctx.fillStyle = 'rgba(249, 115, 22, 0.25)';
    ctx.fillRect(p.x + p.w * 0.4, p.y + 14, p.w * 0.2, p.h - 28);
    ctx.fillStyle = '#f97316';
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(p.x + p.w / 2, p.y + 14 + (Date.now() % 40), 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.laserState === 'active') {
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 16;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
    ctx.fillRect(p.x + 2, p.y + 14, p.w - 4, p.h - 28);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(p.x + p.w / 2 - 2, p.y + 14, 4, p.h - 28);
  }

  ctx.restore();
}

// Render Hypnotic Swirling Portal
function renderPortal(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  theme: NeonTheme
) {
  ctx.save();
  ctx.translate(cx, cy);
  const time = Date.now() * 0.004;

  ctx.shadowColor = theme.accentColor;
  ctx.shadowBlur = 20;

  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.rotate(time * (i % 2 === 0 ? 1 : -1) + i * 1.5);
    ctx.strokeStyle = i === 0 ? theme.accentColor : i === 1 ? '#a855f7' : '#ec4899';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 16 - i * 3, 26 - i * 4, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// Render Victory Banner
function renderVictoryBanner(
  ctx: CanvasRenderingContext2D,
  engine: GameEngine,
  onNextLevel: () => void
) {
  ctx.save();
  ctx.fillStyle = 'rgba(7, 5, 20, 0.65)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.textAlign = 'center';
  ctx.font = '900 36px "Orbitron", sans-serif';
  ctx.fillStyle = '#00f3ff';
  ctx.shadowColor = '#00f3ff';
  ctx.shadowBlur = 18;
  ctx.fillText('BÖLÜM TAMAMLANDI!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 35);

  ctx.font = '600 20px "Rajdhani", sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.shadowBlur = 8;
  ctx.fillText(
    `Süre: ${engine.levelTimer.toFixed(2)}s  |  Deneme: ${engine.levelAttempts}`,
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2 + 10
  );

  ctx.font = 'bold 16px "Orbitron", sans-serif';
  ctx.fillStyle = '#a855f7';
  ctx.fillText('SONRAKİ BÖLÜM YÜKLENİYOR...', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);

  ctx.restore();
}
