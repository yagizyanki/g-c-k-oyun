import { NeonThemeId } from './themes';

export type GameScreen = 'MENU' | 'PLAYING' | 'LEVEL_SELECT' | 'SETTINGS' | 'VICTORY' | 'PAUSED';

export type PlatformType =
  | 'solid'
  | 'crumbly'
  | 'fake'
  | 'moving'
  | 'spring'
  | 'laser'
  | 'disappearing';

export interface Platform {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: PlatformType;
  color?: string;
  // Moving platform properties
  startX?: number;
  startY?: number;
  targetX?: number;
  targetY?: number;
  speed?: number;
  moveProgress?: number;
  moveDir?: number;
  // Crumbly platform properties
  crumblyTimer?: number;
  isCrumbling?: boolean;
  isFallen?: boolean;
  respawnTimer?: number;
  shakeOffsetX?: number;
  // Spring pad properties
  springStrength?: number;
  springActiveTimer?: number;
  // Laser properties
  laserCycle?: number;
  laserOffset?: number;
  laserActiveDuration?: number;
  laserWarnDuration?: number;
  laserState?: 'off' | 'warn' | 'active';
  // Disappearing
  phaseOffset?: number;
  phaseCycle?: number;
  isVisible?: boolean;
}

export type SpikeDirection = 'up' | 'down' | 'left' | 'right';

export interface Spike {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  dir: SpikeDirection;
  // Proximity spike
  isProximity?: boolean;
  triggerRadius?: number;
  triggered?: boolean;
  popProgress?: number; // 0 to 1
  baseY?: number;
  baseX?: number;
  // Moving spike
  isMoving?: boolean;
  startX?: number;
  startY?: number;
  targetX?: number;
  targetY?: number;
  speed?: number;
  moveProgress?: number;
  moveDir?: number;
}

export interface SecretToken {
  x: number;
  y: number;
  size: number;
  collected?: boolean;
}

export interface LevelData {
  id: number;
  name: string;
  subtitle: string;
  isCheckpoint: boolean;
  spawn: { x: number; y: number };
  portal: { x: number; y: number; w: number; h: number };
  platforms: Platform[];
  spikes: Spike[];
  secretToken?: SecretToken;
  tip?: string;
  customGravity?: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  shape?: 'square' | 'circle' | 'spark' | 'confetti';
  rotation?: number;
  rotSpeed?: number;
}

export interface PlayerTrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  grounded: boolean;
  wasGrounded: boolean;
  wallSliding: boolean;
  wallDir: number; // -1 for left wall, 1 for right wall, 0 none
  coyoteTimer: number;
  jumpBufferTimer: number;
  squashX: number;
  squashY: number;
  facing: number; // -1 or 1
  eyeOffsetX: number;
  eyeOffsetY: number;
  blinkTimer: number;
  isDead: boolean;
  deathTimer: number;
  trail: PlayerTrailPoint[];
}

export interface GameSettings {
  sfx: boolean;
  music: boolean;
  screenShake: boolean;
  touchControls: 'auto' | 'always' | 'never';
  theme: NeonThemeId;
}

export interface GameSaveData {
  unlockedLevels: number[];
  completedLevels: number[];
  currentLevel: number;
  lastCheckpoint: number;
  totalDeaths: number;
  levelDeaths: Record<number, number>;
  bestTimes: Record<number, number>; // in seconds
  secretUnlocked: boolean;
  settings: GameSettings;
}

export interface ControlInputs {
  left: boolean;
  right: boolean;
  jump: boolean;
  jumpPressed: boolean; // Just pressed this frame
  jumpReleased: boolean; // Released this frame
  restart: boolean;
  pause: boolean;
}
