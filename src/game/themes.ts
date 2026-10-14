export type NeonThemeId =
  | 'cyber-cyan'
  | 'magma-red'
  | 'acid-green'
  | 'neon-purple'
  | 'solar-gold';

export interface NeonTheme {
  id: NeonThemeId;
  name: string;
  badgeColor: string;
  previewBg: string;
  bgGradient: [string, string, string];
  gridColor: string;
  starColor: string;
  spikes: {
    gradStart: string;
    gradEnd: string;
    glow: string;
    tip: string;
  };
  particles: string[];
  player: {
    gradStart: string;
    gradEnd: string;
    glow: string;
    border: string;
  };
  platform: {
    border: string;
    shadow: string;
    bg: string;
  };
  accentColor: string;
}

export const NEON_THEMES: Record<NeonThemeId, NeonTheme> = {
  'cyber-cyan': {
    id: 'cyber-cyan',
    name: 'Turkuaz Siber',
    badgeColor: '#00f3ff',
    previewBg: 'from-cyan-500 to-blue-600',
    bgGradient: ['#090518', '#0d0b26', '#060919'],
    gridColor: 'rgba(99, 102, 241, 0.08)',
    starColor: 'rgba(165, 180, 252, ',
    spikes: {
      gradStart: '#f97316',
      gradEnd: '#dc2626',
      glow: '#ef4444',
      tip: '#fef08a',
    },
    particles: ['#00f3ff', '#67e8f9', '#ffffff', '#38bdf8', '#a855f7'],
    player: {
      gradStart: '#38bdf8',
      gradEnd: '#06b6d4',
      glow: '#00f3ff',
      border: '#ffffff',
    },
    platform: {
      border: '#6366f1',
      shadow: '#4f46e5',
      bg: '#111322',
    },
    accentColor: '#00f3ff',
  },
  'magma-red': {
    id: 'magma-red',
    name: 'Magma Kırmızısı',
    badgeColor: '#ef4444',
    previewBg: 'from-rose-500 to-orange-600',
    bgGradient: ['#180509', '#240a11', '#120407'],
    gridColor: 'rgba(239, 68, 68, 0.1)',
    starColor: 'rgba(254, 205, 211, ',
    spikes: {
      gradStart: '#fde047',
      gradEnd: '#ea580c',
      glow: '#f97316',
      tip: '#ffffff',
    },
    particles: ['#ef4444', '#f97316', '#ffedd5', '#f43f5e', '#fbbf24'],
    player: {
      gradStart: '#fb7185',
      gradEnd: '#e11d48',
      glow: '#f43f5e',
      border: '#fff1f2',
    },
    platform: {
      border: '#b91c1c',
      shadow: '#dc2626',
      bg: '#20090f',
    },
    accentColor: '#ef4444',
  },
  'acid-green': {
    id: 'acid-green',
    name: 'Asit Yeşili',
    badgeColor: '#10b981',
    previewBg: 'from-emerald-500 to-lime-600',
    bgGradient: ['#031409', '#062010', '#020d06'],
    gridColor: 'rgba(34, 197, 94, 0.1)',
    starColor: 'rgba(167, 243, 208, ',
    spikes: {
      gradStart: '#f59e0b',
      gradEnd: '#d97706',
      glow: '#eab308',
      tip: '#fef08a',
    },
    particles: ['#10b981', '#34d399', '#a7f3d0', '#22c55e', '#86efac'],
    player: {
      gradStart: '#4ade80',
      gradEnd: '#16a34a',
      glow: '#22c55e',
      border: '#f0fdf4',
    },
    platform: {
      border: '#059669',
      shadow: '#10b981',
      bg: '#081c10',
    },
    accentColor: '#10b981',
  },
  'neon-purple': {
    id: 'neon-purple',
    name: 'Neon Mor',
    badgeColor: '#c084fc',
    previewBg: 'from-purple-500 to-fuchsia-600',
    bgGradient: ['#12041b', '#1d072b', '#0d0214'],
    gridColor: 'rgba(168, 85, 247, 0.1)',
    starColor: 'rgba(233, 213, 255, ',
    spikes: {
      gradStart: '#fb7185',
      gradEnd: '#be123c',
      glow: '#f43f5e',
      tip: '#fecdd3',
    },
    particles: ['#c084fc', '#e879f9', '#f0abfc', '#a855f7', '#38bdf8'],
    player: {
      gradStart: '#e879f9',
      gradEnd: '#c026d3',
      glow: '#d946ef',
      border: '#fdf4ff',
    },
    platform: {
      border: '#9333ea',
      shadow: '#a855f7',
      bg: '#1a0928',
    },
    accentColor: '#c084fc',
  },
  'solar-gold': {
    id: 'solar-gold',
    name: 'Güneş Altını',
    badgeColor: '#f59e0b',
    previewBg: 'from-amber-400 to-yellow-600',
    bgGradient: ['#140d03', '#201506', '#0f0902'],
    gridColor: 'rgba(234, 179, 8, 0.1)',
    starColor: 'rgba(254, 240, 138, ',
    spikes: {
      gradStart: '#ef4444',
      gradEnd: '#991b1b',
      glow: '#ef4444',
      tip: '#fecaca',
    },
    particles: ['#fbbf24', '#f59e0b', '#fde68a', '#d97706', '#f43f5e'],
    player: {
      gradStart: '#fde047',
      gradEnd: '#ca8a04',
      glow: '#eab308',
      border: '#fefce8',
    },
    platform: {
      border: '#d97706',
      shadow: '#f59e0b',
      bg: '#1e1305',
    },
    accentColor: '#f59e0b',
  },
};
