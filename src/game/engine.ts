import {
  ControlInputs,
  GameSaveData,
  LevelData,
  Particle,
  Platform,
  Player,
  Spike,
} from './types';
import { sounds } from './audio';
import { LEVELS } from './levels';
import { NEON_THEMES, NeonTheme } from './themes';

export const CANVAS_WIDTH = 960;
export const CANVAS_HEIGHT = 540;

const GRAVITY = 0.44;
const MAX_FALL_SPEED = 11.5;
const MOVE_SPEED = 4.2;
const ACCEL_GROUND = 0.85;
const ACCEL_AIR = 0.55;
const FRICTION_GROUND = 0.78;
const FRICTION_AIR = 0.92;
const JUMP_FORCE = -9.6;
const WALL_JUMP_FORCE_Y = -8.8;
const WALL_JUMP_FORCE_X = 5.8;
const WALL_SLIDE_SPEED = 2.2;
const COYOTE_FRAMES = 7;
const JUMP_BUFFER_FRAMES = 7;

export const RAGE_QUOTES = [
  'Derin nefes al...',
  'Klavye sağlam mı?',
  'O sıçrama kıl payıydı!',
  'Pes etmek yok!',
  'Gözlerini ekrandan ayırma.',
  'Monitörün suçu yok, vurma!',
  'Tuzakları ezberle.',
  'Biraz daha dikkat!',
  'Rage modu devrede! 🔥',
  'İmkânsız değil, sadece zorsun!',
];

export class GameEngine {
  public player: Player;
  public currentLevelData: LevelData;
  public platforms: Platform[] = [];
  public spikes: Spike[] = [];
  public particles: Particle[] = [];
  public stars: Array<{ x: number; y: number; size: number; speed: number; alpha: number }> = [];
  
  public screenShake: number = 0;
  public rageQuote: string = '';
  public rageQuoteTimer: number = 0;
  
  public levelTimer: number = 0;
  public levelAttempts: number = 1;
  public isLevelCompleted: boolean = false;
  public completionAnimationTimer: number = 0;
  public onLevelCompleteCallback?: (levelId: number, time: number, deaths: number) => void;
  public onVictoryCallback?: () => void;
  public onSecretFoundCallback?: () => void;
  
  private frameCount: number = 0;

  constructor(levelId: number, public saveData: GameSaveData) {
    const lvl = LEVELS.find((l) => l.id === levelId) || LEVELS[0];
    this.currentLevelData = lvl;
    this.player = this.createDefaultPlayer(lvl.spawn.x, lvl.spawn.y);
    this.initLevel(lvl);
    this.initStars();
  }

  public getTheme(): NeonTheme {
    const themeId = this.saveData.settings.theme || 'cyber-cyan';
    return NEON_THEMES[themeId] || NEON_THEMES['cyber-cyan'];
  }

  public setSaveData(data: GameSaveData) {
    this.saveData = data;
  }

  private createDefaultPlayer(x: number, y: number): Player {
    return {
      x,
      y,
      vx: 0,
      vy: 0,
      w: 24,
      h: 24,
      grounded: false,
      wasGrounded: false,
      wallSliding: false,
      wallDir: 0,
      coyoteTimer: 0,
      jumpBufferTimer: 0,
      squashX: 1,
      squashY: 1,
      facing: 1,
      eyeOffsetX: 2,
      eyeOffsetY: -1,
      blinkTimer: 0,
      isDead: false,
      deathTimer: 0,
      trail: [],
    };
  }

  private initStars() {
    this.stars = [];
    for (let i = 0; i < 70; i++) {
      this.stars.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }
  }

  public setLevel(levelId: number) {
    const lvl = LEVELS.find((l) => l.id === levelId) || LEVELS[0];
    this.currentLevelData = lvl;
    this.levelTimer = 0;
    this.levelAttempts = 1;
    this.isLevelCompleted = false;
    this.completionAnimationTimer = 0;
    this.initLevel(lvl);
    this.respawnPlayer();
  }

  public initLevel(lvl: LevelData) {
    // Clone platforms and spikes with clean state
    this.platforms = lvl.platforms.map((p) => ({
      ...p,
      moveProgress: 0,
      moveDir: 1,
      isCrumbling: false,
      crumblyTimer: 0,
      isFallen: false,
      respawnTimer: 0,
      shakeOffsetX: 0,
      springActiveTimer: 0,
      laserState: 'off',
    }));

    this.spikes = lvl.spikes.map((s) => ({
      ...s,
      moveProgress: 0,
      moveDir: 1,
      triggered: false,
      popProgress: 0,
      baseY: s.y,
      baseX: s.x,
    }));

    if (lvl.secretToken) {
      lvl.secretToken.collected = false;
    }
  }

  public respawnPlayer() {
    this.player.x = this.currentLevelData.spawn.x;
    this.player.y = this.currentLevelData.spawn.y;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.isDead = false;
    this.player.deathTimer = 0;
    this.player.grounded = false;
    this.player.squashX = 1;
    this.player.squashY = 1;
    this.player.coyoteTimer = 0;
    this.player.jumpBufferTimer = 0;
    this.player.trail = [];

    // Reset crumbly platforms
    for (const p of this.platforms) {
      if (p.type === 'crumbly') {
        p.isCrumbling = false;
        p.crumblyTimer = 0;
        p.isFallen = false;
        p.respawnTimer = 0;
        p.shakeOffsetX = 0;
      }
    }

    // Reset proximity spikes
    for (const s of this.spikes) {
      if (s.isProximity) {
        s.triggered = false;
        s.popProgress = 0;
        if (s.baseY !== undefined) s.y = s.baseY;
      }
    }
  }

  public killPlayer() {
    if (this.player.isDead || this.isLevelCompleted) return;
    this.player.isDead = true;
    this.player.deathTimer = 26; // ~0.43s at 60fps
    sounds.playDeath();

    if (this.saveData.settings.screenShake) {
      this.screenShake = 14;
    }

    this.saveData.totalDeaths++;
    const lvlId = this.currentLevelData.id;
    this.saveData.levelDeaths[lvlId] = (this.saveData.levelDeaths[lvlId] || 0) + 1;
    this.levelAttempts++;

    // Trigger rage quote every 3 deaths on this level
    if (this.levelAttempts % 3 === 0) {
      const quote = RAGE_QUOTES[Math.floor(Math.random() * RAGE_QUOTES.length)];
      this.rageQuote = quote;
      this.rageQuoteTimer = 110;
    }

    // Spawn explosion particles
    const theme = this.getTheme();
    for (let i = 0; i < 32; i++) {
      const angle = (Math.PI * 2 * i) / 32 + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 6 + 2;
      const col = theme.particles[Math.floor(Math.random() * theme.particles.length)];
      this.particles.push({
        x: this.player.x + this.player.w / 2,
        y: this.player.y + this.player.h / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 5 + 3,
        color: col,
        life: 0,
        maxLife: Math.random() * 25 + 20,
        shape: 'square',
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.3,
      });
    }
  }

  public update(inputs: ControlInputs) {
    this.frameCount++;

    // Shake dampening
    if (this.screenShake > 0) {
      this.screenShake *= 0.88;
      if (this.screenShake < 0.2) this.screenShake = 0;
    }

    // Rage quote timer
    if (this.rageQuoteTimer > 0) {
      this.rageQuoteTimer--;
    }

    // Update stars background
    for (const star of this.stars) {
      star.y += star.speed;
      if (star.y > CANVAS_HEIGHT) {
        star.y = 0;
        star.x = Math.random() * CANVAS_WIDTH;
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // Gravity on particles
      if (p.rotation !== undefined && p.rotSpeed !== undefined) {
        p.rotation += p.rotSpeed;
      }
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }

    // If level completion animation is running
    if (this.isLevelCompleted) {
      this.completionAnimationTimer++;
      // Confetti burst
      if (this.completionAnimationTimer % 4 === 0 && this.completionAnimationTimer < 50) {
        this.spawnConfetti(this.currentLevelData.portal.x + 20, this.currentLevelData.portal.y + 25);
      }
      return;
    }

    // Update level timer if alive
    if (!this.player.isDead) {
      this.levelTimer += 1 / 60;
    }

    // Handle dead player timer
    if (this.player.isDead) {
      this.player.deathTimer--;
      if (this.player.deathTimer <= 0) {
        this.respawnPlayer();
      }
      return;
    }

    // Manual quick restart
    if (inputs.restart) {
      this.killPlayer();
      return;
    }

    // Update active level objects (moving platforms, lasers, proximity spikes)
    this.updateLevelObjects();

    // Player Physics & Input
    this.updatePlayerPhysics(inputs);

    // Collision detection
    this.handleCollisions();

    // Check bounds death (falling into void)
    if (this.player.y > CANVAS_HEIGHT + 40 || this.player.x < -60 || this.player.x > CANVAS_WIDTH + 60) {
      this.killPlayer();
      return;
    }

    // Check portal victory
    this.checkPortal();

    // Check secret token
    this.checkSecretToken();
  }

  private updateLevelObjects() {
    // 1. Moving Platforms
    for (const p of this.platforms) {
      if (p.type === 'moving' && p.startX !== undefined && p.targetX !== undefined && p.startY !== undefined && p.targetY !== undefined) {
        const speed = (p.speed || 2) * 0.01;
        p.moveProgress = (p.moveProgress || 0) + speed * (p.moveDir || 1);
        if (p.moveProgress >= 1) {
          p.moveProgress = 1;
          p.moveDir = -1;
        } else if (p.moveProgress <= 0) {
          p.moveProgress = 0;
          p.moveDir = 1;
        }

        // Smooth cosine ease for moving platforms
        const ease = (1 - Math.cos(p.moveProgress * Math.PI)) / 2;
        const newX = p.startX + (p.targetX - p.startX) * ease;
        const newY = p.startY + (p.targetY - p.startY) * ease;
        
        // If player is on top of this moving platform, move player along!
        if (this.player.grounded && this.isPlayerOnPlatform(p)) {
          this.player.x += newX - p.x;
          this.player.y += newY - p.y;
        }

        p.x = newX;
        p.y = newY;
      }

      // 2. Crumbly Platforms
      if (p.type === 'crumbly') {
        if (p.isCrumbling && !p.isFallen) {
          p.crumblyTimer = (p.crumblyTimer || 0) + 1;
          p.shakeOffsetX = (Math.random() - 0.5) * 5;
          if (p.crumblyTimer > 22) {
            // Drop!
            p.isFallen = true;
            p.shakeOffsetX = 0;
            sounds.playCrumble();
          }
        }
        if (p.isFallen) {
          p.respawnTimer = (p.respawnTimer || 0) + 1;
          if (p.respawnTimer > 180) {
            // Respawn after 3 seconds
            p.isFallen = false;
            p.isCrumbling = false;
            p.crumblyTimer = 0;
            p.respawnTimer = 0;
          }
        }
      }

      // 3. Spring pad timer animation
      if (p.type === 'spring' && p.springActiveTimer && p.springActiveTimer > 0) {
        p.springActiveTimer--;
      }

      // 4. Lasers
      if (p.type === 'laser') {
        const cycle = p.laserCycle || 140;
        const offset = p.laserOffset || 0;
        const activeDur = p.laserActiveDuration || 50;
        const warnDur = p.laserWarnDuration || 25;
        const t = (this.frameCount + offset) % cycle;

        if (t < cycle - (activeDur + warnDur)) {
          p.laserState = 'off';
        } else if (t < cycle - activeDur) {
          p.laserState = 'warn';
        } else {
          p.laserState = 'active';
        }

        // Check laser kill
        if (p.laserState === 'active' && this.checkAABB(this.player, p)) {
          this.killPlayer();
        }
      }
    }

    // 5. Spikes (Moving and Proximity)
    for (const s of this.spikes) {
      if (s.isMoving && s.startX !== undefined && s.targetX !== undefined && s.startY !== undefined && s.targetY !== undefined) {
        const speed = (s.speed || 2) * 0.01;
        s.moveProgress = (s.moveProgress || 0) + speed * (s.moveDir || 1);
        if (s.moveProgress >= 1) {
          s.moveProgress = 1;
          s.moveDir = -1;
        } else if (s.moveProgress <= 0) {
          s.moveProgress = 0;
          s.moveDir = 1;
        }
        const ease = (1 - Math.cos(s.moveProgress * Math.PI)) / 2;
        s.x = s.startX + (s.targetX - s.startX) * ease;
        s.y = s.startY + (s.targetY - s.startY) * ease;
      }

      if (s.isProximity) {
        const dist = Math.hypot(
          this.player.x + this.player.w / 2 - (s.x + s.w / 2),
          this.player.y + this.player.h / 2 - (s.y + s.h / 2)
        );
        const radius = s.triggerRadius || 85;
        if (!s.triggered && dist < radius) {
          s.triggered = true;
          sounds.playClick();
        }
        if (s.triggered && (s.popProgress || 0) < 1) {
          s.popProgress = Math.min(1, (s.popProgress || 0) + 0.16);
          if (s.baseY !== undefined && s.dir === 'up') {
            s.y = s.baseY - s.popProgress * (s.h * 0.7);
          }
        }
      }
    }
  }

  private isPlayerOnPlatform(p: Platform): boolean {
    const margin = 2;
    return (
      this.player.x + this.player.w > p.x &&
      this.player.x < p.x + p.w &&
      Math.abs(this.player.y + this.player.h - p.y) <= margin + 1
    );
  }

  private updatePlayerPhysics(inputs: ControlInputs) {
    const pl = this.player;

    // Blink eyes animation
    pl.blinkTimer++;
    if (pl.blinkTimer > 180 + Math.random() * 60) {
      pl.blinkTimer = 0;
    }

    // Squash & Stretch restoration
    pl.squashX += (1 - pl.squashX) * 0.2;
    pl.squashY += (1 - pl.squashY) * 0.2;

    // Trail creation when moving fast
    if (Math.abs(pl.vx) > 1.5 || Math.abs(pl.vy) > 2) {
      pl.trail.push({
        x: pl.x,
        y: pl.y,
        alpha: 0.5,
        size: pl.w,
      });
      if (pl.trail.length > 7) pl.trail.shift();
    }
    for (const t of pl.trail) {
      t.alpha *= 0.82;
    }

    // Horizontal Movement
    const accel = pl.grounded ? ACCEL_GROUND : ACCEL_AIR;
    const friction = pl.grounded ? FRICTION_GROUND : FRICTION_AIR;

    let targetDir = 0;
    if (inputs.left && !inputs.right) targetDir = -1;
    if (inputs.right && !inputs.left) targetDir = 1;

    if (targetDir !== 0) {
      pl.vx += targetDir * accel;
      if (Math.abs(pl.vx) > MOVE_SPEED) {
        pl.vx = Math.sign(pl.vx) * MOVE_SPEED;
      }
      pl.facing = targetDir;
      pl.eyeOffsetX = targetDir * 3;

      // Running dust
      if (pl.grounded && this.frameCount % 5 === 0) {
        this.spawnDust(pl.x + pl.w / 2, pl.y + pl.h, -targetDir * 1.5, -0.8);
      }
    } else {
      pl.vx *= friction;
      if (Math.abs(pl.vx) < 0.1) pl.vx = 0;
      pl.eyeOffsetX += (pl.facing * 2 - pl.eyeOffsetX) * 0.2;
    }

    // Vertical Gravity & Wall slide
    if (pl.wallSliding && pl.vy > 0) {
      pl.vy = Math.min(pl.vy + GRAVITY * 0.4, WALL_SLIDE_SPEED);
      // Wall slide particles
      if (this.frameCount % 4 === 0) {
        const wallX = pl.wallDir === -1 ? pl.x : pl.x + pl.w;
        this.spawnDust(wallX, pl.y + pl.h / 2, -pl.wallDir * 1.2, -1);
      }
    } else {
      pl.vy = Math.min(pl.vy + GRAVITY, MAX_FALL_SPEED);
    }

    // Jump Buffering
    if (inputs.jumpPressed) {
      pl.jumpBufferTimer = JUMP_BUFFER_FRAMES;
    } else if (pl.jumpBufferTimer > 0) {
      pl.jumpBufferTimer--;
    }

    // Coyote Timer
    if (pl.grounded) {
      pl.coyoteTimer = COYOTE_FRAMES;
    } else if (pl.coyoteTimer > 0) {
      pl.coyoteTimer--;
    }

    // Jump Execution
    if (pl.jumpBufferTimer > 0) {
      // Standard or Coyote Jump
      if (pl.coyoteTimer > 0) {
        pl.vy = JUMP_FORCE;
        pl.grounded = false;
        pl.coyoteTimer = 0;
        pl.jumpBufferTimer = 0;
        pl.squashX = 0.7;
        pl.squashY = 1.35;
        sounds.playJump();
        this.spawnDust(pl.x + pl.w / 2, pl.y + pl.h, 0, -1);
      }
      // Wall Jump
      else if (pl.wallSliding && pl.wallDir !== 0) {
        pl.vy = WALL_JUMP_FORCE_Y;
        pl.vx = -pl.wallDir * WALL_JUMP_FORCE_X;
        pl.facing = -pl.wallDir;
        pl.wallSliding = false;
        pl.jumpBufferTimer = 0;
        pl.squashX = 0.75;
        pl.squashY = 1.3;
        sounds.playJump();
        const wallX = pl.wallDir === -1 ? pl.x : pl.x + pl.w;
        this.spawnDust(wallX, pl.y + pl.h / 2, -pl.wallDir * 2, -1.5);
      }
    }

    // Variable Jump Height (cutting jump when button released early)
    if (inputs.jumpReleased && pl.vy < -2.5) {
      pl.vy *= 0.52;
    }
  }

  private handleCollisions() {
    const pl = this.player;
    pl.wasGrounded = pl.grounded;
    pl.grounded = false;
    pl.wallSliding = false;
    pl.wallDir = 0;

    // Move Horizontal First
    pl.x += pl.vx;

    // Check Horizontal Collisions with Solid Platforms
    for (const p of this.platforms) {
      if (p.type === 'fake' || (p.type === 'crumbly' && p.isFallen) || p.type === 'laser') continue;

      if (this.checkAABB(pl, p)) {
        if (pl.vx > 0) {
          pl.x = p.x - pl.w;
          pl.wallDir = 1; // Wall on right
        } else if (pl.vx < 0) {
          pl.x = p.x + p.w;
          pl.wallDir = -1; // Wall on left
        }
        pl.vx = 0;

        // Check if wall sliding
        if (!pl.grounded && pl.vy > 0) {
          pl.wallSliding = true;
        }
      }
    }

    // Move Vertical Second
    pl.y += pl.vy;

    // Check Vertical Collisions with Solid Platforms
    for (const p of this.platforms) {
      if (p.type === 'fake' || (p.type === 'crumbly' && p.isFallen) || p.type === 'laser') continue;

      if (this.checkAABB(pl, p)) {
        if (pl.vy > 0) {
          // Landing on platform
          pl.y = p.y - pl.h;
          pl.vy = 0;
          pl.grounded = true;

          // Sound and squash on fresh landing
          if (!pl.wasGrounded) {
            pl.squashX = 1.35;
            pl.squashY = 0.7;
            sounds.playLand();
            this.spawnDust(pl.x + pl.w / 2, pl.y + pl.h, 0, -0.6);
          }

          // Trigger Crumbly
          if (p.type === 'crumbly' && !p.isCrumbling) {
            p.isCrumbling = true;
            p.crumblyTimer = 0;
            sounds.playCrumble();
          }

          // Trigger Spring
          if (p.type === 'spring') {
            pl.vy = p.springStrength || -14.0;
            pl.grounded = false;
            p.springActiveTimer = 12;
            pl.squashX = 0.6;
            pl.squashY = 1.45;
            sounds.playSpring();
            if (this.saveData.settings.screenShake) {
              this.screenShake = 4;
            }
            this.spawnSpringSparks(p.x + p.w / 2, p.y);
          }
        } else if (pl.vy < 0) {
          // Hitting ceiling
          pl.y = p.y + p.h;
          pl.vy = 0;
          pl.squashX = 1.25;
          pl.squashY = 0.8;
        }
      }
    }

    // Check Spike Collisions (Fair polygonal / inner margin hitbox)
    for (const s of this.spikes) {
      if (this.checkSpikeCollision(pl, s)) {
        this.killPlayer();
        return;
      }
    }
  }

  private checkSpikeCollision(pl: Player, s: Spike): boolean {
    // Inset margins so the collision feels tight, precise, and completely fair
    const inset = 3;
    const spikeBox = {
      x: s.x + inset,
      y: s.y + inset,
      w: Math.max(4, s.w - inset * 2),
      h: Math.max(4, s.h - inset * 2),
    };

    if (!this.checkAABB(pl, spikeBox)) return false;

    // Tip proximity check: player center vs spike tip
    const px = pl.x + pl.w / 2;
    const py = pl.y + pl.h / 2;

    let tipX = s.x + s.w / 2;
    let tipY = s.y;
    if (s.dir === 'down') tipY = s.y + s.h;
    if (s.dir === 'left') {
      tipX = s.x;
      tipY = s.y + s.h / 2;
    }
    if (s.dir === 'right') {
      tipX = s.x + s.w;
      tipY = s.y + s.h / 2;
    }

    const distToTip = Math.hypot(px - tipX, py - tipY);
    return distToTip < Math.max(pl.w, s.w) * 0.85;
  }

  private checkAABB(
    a: { x: number; y: number; w: number; h: number },
    b: { x: number; y: number; w: number; h: number }
  ): boolean {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  private checkPortal() {
    const portal = this.currentLevelData.portal;
    if (this.checkAABB(this.player, portal)) {
      this.isLevelCompleted = true;
      this.completionAnimationTimer = 0;
      sounds.playWin();

      const lvlId = this.currentLevelData.id;

      // Update save data
      if (!this.saveData.completedLevels.includes(lvlId)) {
        this.saveData.completedLevels.push(lvlId);
      }
      const nextId = lvlId + 1;
      if (nextId <= LEVELS.length && !this.saveData.unlockedLevels.includes(nextId)) {
        this.saveData.unlockedLevels.push(nextId);
      }

      // Record best time
      const currBest = this.saveData.bestTimes[lvlId];
      if (currBest === undefined || this.levelTimer < currBest) {
        this.saveData.bestTimes[lvlId] = parseFloat(this.levelTimer.toFixed(2));
      }

      // Checkpoint record
      if (this.currentLevelData.isCheckpoint) {
        this.saveData.lastCheckpoint = lvlId;
        sounds.playCheckpoint();
      }

      // Callback
      if (this.onLevelCompleteCallback) {
        this.onLevelCompleteCallback(lvlId, this.levelTimer, this.levelAttempts);
      }

      // Check if finished final level (Level 20 or Level 21)
      if (lvlId === 20 || lvlId === 21) {
        if (this.onVictoryCallback) {
          setTimeout(() => {
            this.onVictoryCallback?.();
          }, 1200);
        }
      }
    }
  }

  private checkSecretToken() {
    const token = this.currentLevelData.secretToken;
    if (token && !token.collected) {
      const box = {
        x: token.x - token.size / 2,
        y: token.y - token.size / 2,
        w: token.size,
        h: token.size,
      };
      if (this.checkAABB(this.player, box)) {
        token.collected = true;
        this.saveData.secretUnlocked = true;
        sounds.playCheckpoint();
        this.spawnSpringSparks(token.x, token.y);
        if (this.onSecretFoundCallback) {
          this.onSecretFoundCallback();
        }
      }
    }
  }

  private spawnDust(x: number, y: number, vx: number, vy: number) {
    const theme = this.getTheme();
    for (let i = 0; i < 3; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 2,
        vx: vx + (Math.random() - 0.5) * 0.8,
        vy: vy + (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 2,
        color: theme.particles[0] || '#67e8f9',
        life: 0,
        maxLife: 15,
        shape: 'circle',
      });
    }
  }

  private spawnSpringSparks(x: number, y: number) {
    for (let i = 0; i < 16; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      const speed = Math.random() * 5 + 3;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        color: '#10b981',
        life: 0,
        maxLife: 22,
        shape: 'spark',
      });
    }
  }

  private spawnConfetti(x: number, y: number) {
    const colors = ['#00f3ff', '#a855f7', '#ec4899', '#f59e0b', '#10b981'];
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 45,
        shape: 'confetti',
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.25,
      });
    }
  }
}
