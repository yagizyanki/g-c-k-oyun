import { LevelData } from './types';

export const LEVELS: LevelData[] = [
  // ----------------------------------------------------
  // LEVEL 1: İlk Adım (Tutorial)
  // ----------------------------------------------------
  {
    id: 1,
    name: 'Bölüm 1: İlk Adım',
    subtitle: 'Zıplamayı hisset. Basılı tutarsan daha yükseğe çıkarsın!',
    isCheckpoint: false,
    spawn: { x: 80, y: 440 },
    portal: { x: 870, y: 420, w: 40, h: 50 },
    tip: 'Sağ / Sol hareket et, BOŞLUK / W / YUKARI ile zıpla.',
    platforms: [
      // Base platforms
      { id: 'l1-p1', x: 40, y: 470, w: 260, h: 40, type: 'solid' },
      { id: 'l1-p2', x: 380, y: 470, w: 220, h: 40, type: 'solid' },
      { id: 'l1-p3', x: 680, y: 470, w: 240, h: 40, type: 'solid' },
      // Stepping stones
      { id: 'l1-p4', x: 320, y: 390, w: 50, h: 20, type: 'solid' },
      { id: 'l1-p5', x: 615, y: 380, w: 55, h: 20, type: 'solid' },
    ],
    spikes: [
      { id: 'l1-s1', x: 300, y: 490, w: 80, h: 20, dir: 'up' },
      { id: 'l1-s2', x: 600, y: 490, w: 80, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 2: Çift Sıçrama
  // ----------------------------------------------------
  {
    id: 2,
    name: 'Bölüm 2: Havadaki Adımlar',
    subtitle: 'Havadaki mesafeyi doğru kestir!',
    isCheckpoint: false,
    spawn: { x: 70, y: 430 },
    portal: { x: 880, y: 220, w: 40, h: 50 },
    tip: 'Zıplama tuşuna basılı tutarsan azami yüksekliğe ulaşırsın.',
    platforms: [
      { id: 'l2-p1', x: 40, y: 460, w: 160, h: 40, type: 'solid' },
      { id: 'l2-p2', x: 260, y: 420, w: 100, h: 25, type: 'solid' },
      { id: 'l2-p3', x: 430, y: 370, w: 100, h: 25, type: 'solid' },
      { id: 'l2-p4', x: 600, y: 320, w: 110, h: 25, type: 'solid' },
      { id: 'l2-p5', x: 780, y: 270, w: 150, h: 30, type: 'solid' },
      // Floor pit
      { id: 'l2-floor', x: 40, y: 520, w: 880, h: 20, type: 'solid' },
    ],
    spikes: [
      { id: 'l2-s1', x: 200, y: 500, w: 580, h: 20, dir: 'up' },
      { id: 'l2-s2', x: 460, y: 350, w: 30, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 3: Çürük Zemin
  // ----------------------------------------------------
  {
    id: 3,
    name: 'Bölüm 3: Düşen Taşlar',
    subtitle: 'Ayak bastığın taşlar titrer ve çöker! Duraklama!',
    isCheckpoint: false,
    spawn: { x: 60, y: 430 },
    portal: { x: 880, y: 430, w: 40, h: 50 },
    tip: 'Kırmızıya dönen platformlar hemen aşağı düşer!',
    platforms: [
      { id: 'l3-p1', x: 40, y: 470, w: 150, h: 40, type: 'solid' },
      // Crumbly bridges
      { id: 'l3-c1', x: 250, y: 460, w: 80, h: 20, type: 'crumbly' },
      { id: 'l3-c2', x: 380, y: 440, w: 80, h: 20, type: 'crumbly' },
      { id: 'l3-c3', x: 510, y: 420, w: 80, h: 20, type: 'crumbly' },
      { id: 'l3-c4', x: 640, y: 440, w: 80, h: 20, type: 'crumbly' },
      { id: 'l3-p2', x: 780, y: 470, w: 150, h: 40, type: 'solid' },
    ],
    spikes: [
      { id: 'l3-s1', x: 190, y: 520, w: 590, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 4: Alçak Tavan
  // ----------------------------------------------------
  {
    id: 4,
    name: 'Bölüm 4: Alçak Tavan',
    subtitle: 'Kafanı tavana vurma! Kısa dokunuşlarla zıpla.',
    isCheckpoint: false,
    spawn: { x: 60, y: 440 },
    portal: { x: 880, y: 440, w: 40, h: 50 },
    tip: 'Zıplama tuşunu hemen bırakırsan alçak zıplarsın.',
    platforms: [
      { id: 'l4-p1', x: 30, y: 480, w: 180, h: 30, type: 'solid' },
      // Low ceiling
      { id: 'l4-ceil1', x: 210, y: 280, w: 540, h: 30, type: 'solid' },
      // Ground corridor
      { id: 'l4-g1', x: 240, y: 480, w: 100, h: 30, type: 'solid' },
      { id: 'l4-g2', x: 420, y: 480, w: 100, h: 30, type: 'solid' },
      { id: 'l4-g3', x: 600, y: 480, w: 100, h: 30, type: 'solid' },
      { id: 'l4-p2', x: 760, y: 480, w: 170, h: 30, type: 'solid' },
    ],
    spikes: [
      // Spikes hanging from ceiling
      { id: 'l4-sc1', x: 260, y: 310, w: 120, h: 20, dir: 'down' },
      { id: 'l4-sc2', x: 440, y: 310, w: 120, h: 20, dir: 'down' },
      { id: 'l4-sc3', x: 620, y: 310, w: 100, h: 20, dir: 'down' },
      // Ground pits
      { id: 'l4-sg1', x: 340, y: 500, w: 80, h: 20, dir: 'up' },
      { id: 'l4-sg2', x: 520, y: 500, w: 80, h: 20, dir: 'up' },
      { id: 'l4-sg3', x: 700, y: 500, w: 60, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 5: CHECKPOINT 1: Gezgin Taşlar
  // ----------------------------------------------------
  {
    id: 5,
    name: 'Bölüm 5: KONTROL NOKTASI 1',
    subtitle: 'İlk büyük aşama! Hareket eden adalara alış.',
    isCheckpoint: true,
    spawn: { x: 70, y: 430 },
    portal: { x: 880, y: 430, w: 40, h: 50 },
    tip: 'Kontrol noktası kaydedildi! Buradan sonra ölsen de ilerlemen korunur.',
    platforms: [
      { id: 'l5-p1', x: 40, y: 470, w: 140, h: 40, type: 'solid' },
      // Moving platform 1 (horizontal)
      {
        id: 'l5-m1',
        x: 230,
        y: 450,
        w: 90,
        h: 22,
        type: 'moving',
        startX: 210,
        startY: 450,
        targetX: 380,
        targetY: 450,
        speed: 1.6,
      },
      // Middle resting island
      { id: 'l5-p2', x: 460, y: 420, w: 80, h: 25, type: 'solid' },
      // Moving platform 2 (vertical)
      {
        id: 'l5-m2',
        x: 600,
        y: 440,
        w: 90,
        h: 22,
        type: 'moving',
        startX: 600,
        startY: 460,
        targetX: 600,
        targetY: 330,
        speed: 1.8,
      },
      { id: 'l5-p3', x: 760, y: 470, w: 170, h: 40, type: 'solid' },
    ],
    spikes: [
      { id: 'l5-s1', x: 180, y: 520, w: 580, h: 20, dir: 'up' },
      { id: 'l5-s2', x: 485, y: 400, w: 30, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 6: Sahte Güven (Fake Platforms)
  // ----------------------------------------------------
  {
    id: 6,
    name: 'Bölüm 6: Sahte Güven',
    subtitle: 'Gözlerin seni yanıltabilir. Bazı taşlar birer illüzyon!',
    isCheckpoint: false,
    spawn: { x: 70, y: 430 },
    portal: { x: 870, y: 430, w: 40, h: 50 },
    tip: 'Sahte blokların içinden direkt düşersin!',
    platforms: [
      { id: 'l6-p1', x: 40, y: 470, w: 140, h: 40, type: 'solid' },
      // Lure platform (FAKE!)
      { id: 'l6-fake1', x: 240, y: 470, w: 110, h: 30, type: 'fake' },
      // Real path above
      { id: 'l6-p2', x: 260, y: 370, w: 90, h: 22, type: 'solid' },
      // Crumbly step
      { id: 'l6-c1', x: 410, y: 340, w: 80, h: 22, type: 'crumbly' },
      // Lure platform 2 (FAKE!)
      { id: 'l6-fake2', x: 550, y: 420, w: 100, h: 25, type: 'fake' },
      // Real step
      { id: 'l6-p3', x: 570, y: 310, w: 80, h: 22, type: 'solid' },
      { id: 'l6-p4', x: 710, y: 380, w: 80, h: 25, type: 'solid' },
      { id: 'l6-p5', x: 820, y: 470, w: 120, h: 40, type: 'solid' },
    ],
    spikes: [
      { id: 'l6-s1', x: 180, y: 520, w: 640, h: 20, dir: 'up' },
      { id: 'l6-s2', x: 240, y: 510, w: 110, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 7: Hızlı Asansör
  // ----------------------------------------------------
  {
    id: 7,
    name: 'Bölüm 7: Hızlı Asansör',
    subtitle: 'Zamanında atla, yoksa tavandaki dikenlere ezilirsin!',
    isCheckpoint: false,
    spawn: { x: 60, y: 440 },
    portal: { x: 870, y: 190, w: 40, h: 50 },
    tip: 'Asansör yukarı hızlanırken tam tepede fırla!',
    platforms: [
      { id: 'l7-p1', x: 30, y: 480, w: 150, h: 30, type: 'solid' },
      // Fast vertical elevator
      {
        id: 'l7-elev',
        x: 240,
        y: 470,
        w: 90,
        h: 22,
        type: 'moving',
        startX: 240,
        startY: 470,
        targetX: 240,
        targetY: 180,
        speed: 2.8,
      },
      // Intermediate high platform
      { id: 'l7-p2', x: 390, y: 220, w: 120, h: 24, type: 'solid' },
      // Horizontal moving platform
      {
        id: 'l7-m2',
        x: 570,
        y: 220,
        w: 90,
        h: 22,
        type: 'moving',
        startX: 560,
        startY: 220,
        targetX: 720,
        targetY: 220,
        speed: 2.2,
      },
      { id: 'l7-p3', x: 810, y: 230, w: 120, h: 30, type: 'solid' },
      // Trap ceiling
      { id: 'l7-c', x: 200, y: 110, w: 180, h: 25, type: 'solid' },
    ],
    spikes: [
      { id: 'l7-sc', x: 220, y: 135, w: 140, h: 20, dir: 'down' },
      { id: 'l7-sg', x: 180, y: 520, w: 750, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 8: Lazer Dansı (Timed Lasers)
  // ----------------------------------------------------
  {
    id: 8,
    name: 'Bölüm 8: Lazer Dansı',
    subtitle: 'Lazerlerin uyarı ışığını izle. Ateşlendiğinde değme!',
    isCheckpoint: false,
    spawn: { x: 70, y: 440 },
    portal: { x: 880, y: 440, w: 40, h: 50 },
    tip: 'Lazer turuncu parladığında uyarır, kırmızıda ölümcüldür!',
    platforms: [
      { id: 'l8-p1', x: 40, y: 480, w: 140, h: 30, type: 'solid' },
      { id: 'l8-p2', x: 260, y: 480, w: 110, h: 30, type: 'solid' },
      { id: 'l8-p3', x: 450, y: 480, w: 110, h: 30, type: 'solid' },
      { id: 'l8-p4', x: 640, y: 480, w: 110, h: 30, type: 'solid' },
      { id: 'l8-p5', x: 820, y: 480, w: 120, h: 30, type: 'solid' },
      // Laser emitters (platform type 'laser')
      {
        id: 'l8-las1',
        x: 200,
        y: 280,
        w: 24,
        h: 200,
        type: 'laser',
        laserCycle: 160,
        laserOffset: 0,
        laserActiveDuration: 60,
        laserWarnDuration: 30,
      },
      {
        id: 'l8-las2',
        x: 395,
        y: 280,
        w: 24,
        h: 200,
        type: 'laser',
        laserCycle: 160,
        laserOffset: 50,
        laserActiveDuration: 60,
        laserWarnDuration: 30,
      },
      {
        id: 'l8-las3',
        x: 585,
        y: 280,
        w: 24,
        h: 200,
        type: 'laser',
        laserCycle: 160,
        laserOffset: 100,
        laserActiveDuration: 60,
        laserWarnDuration: 30,
      },
      {
        id: 'l8-las4',
        x: 775,
        y: 280,
        w: 24,
        h: 200,
        type: 'laser',
        laserCycle: 160,
        laserOffset: 30,
        laserActiveDuration: 60,
        laserWarnDuration: 30,
      },
    ],
    spikes: [
      { id: 'l8-s1', x: 180, y: 520, w: 640, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 9: Dikenli Koridor (Wall Jumps)
  // ----------------------------------------------------
  {
    id: 9,
    name: 'Bölüm 9: Dikenli Koridor',
    subtitle: 'Duvara yapış ve zıpla! Duvar kayması hayat kurtarır.',
    isCheckpoint: false,
    spawn: { x: 70, y: 440 },
    portal: { x: 870, y: 150, w: 40, h: 50 },
    tip: 'Havada duvara doğru yön tuşuna basılı tutarsan kayarsın.',
    platforms: [
      { id: 'l9-p1', x: 40, y: 480, w: 150, h: 30, type: 'solid' },
      // Wall jump shaft 1
      { id: 'l9-w1', x: 260, y: 220, w: 30, h: 260, type: 'solid' },
      { id: 'l9-w2', x: 380, y: 160, w: 30, h: 260, type: 'solid' },
      // Intermediate ledge
      { id: 'l9-p2', x: 480, y: 280, w: 90, h: 22, type: 'crumbly' },
      // Wall jump shaft 2
      { id: 'l9-w3', x: 620, y: 120, w: 30, h: 280, type: 'solid' },
      { id: 'l9-w4', x: 740, y: 100, w: 30, h: 260, type: 'solid' },
      { id: 'l9-p3', x: 830, y: 200, w: 100, h: 30, type: 'solid' },
    ],
    spikes: [
      { id: 'l9-s1', x: 190, y: 520, w: 650, h: 20, dir: 'up' },
      // Spike on wall 1 left side
      { id: 'l9-sw1', x: 235, y: 320, w: 25, h: 60, dir: 'left' },
      // Spike on wall 2 right side
      { id: 'l9-sw2', x: 410, y: 260, w: 25, h: 60, dir: 'right' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 10: CHECKPOINT 2: Dönen Devriye
  // ----------------------------------------------------
  {
    id: 10,
    name: 'Bölüm 10: KONTROL NOKTASI 2',
    subtitle: 'Yolun yarısı tamamlandı! Hareketli diken devriyeleri.',
    isCheckpoint: true,
    spawn: { x: 70, y: 430 },
    portal: { x: 880, y: 430, w: 40, h: 50 },
    tip: 'Devriye gezen dikenlerin hareketini gözlemle ve boşlukta atla!',
    platforms: [
      { id: 'l10-p1', x: 40, y: 470, w: 140, h: 40, type: 'solid' },
      { id: 'l10-p2', x: 240, y: 450, w: 150, h: 24, type: 'solid' },
      { id: 'l10-p3', x: 460, y: 420, w: 140, h: 24, type: 'solid' },
      { id: 'l10-p4', x: 670, y: 450, w: 120, h: 24, type: 'solid' },
      { id: 'l10-p5', x: 830, y: 470, w: 110, h: 40, type: 'solid' },
    ],
    spikes: [
      { id: 'l10-sg', x: 180, y: 520, w: 650, h: 20, dir: 'up' },
      // Moving patrol spike 1
      {
        id: 'l10-ms1',
        x: 260,
        y: 425,
        w: 30,
        h: 25,
        dir: 'up',
        isMoving: true,
        startX: 245,
        startY: 425,
        targetX: 360,
        targetY: 425,
        speed: 2.2,
      },
      // Moving patrol spike 2
      {
        id: 'l10-ms2',
        x: 550,
        y: 395,
        w: 30,
        h: 25,
        dir: 'up',
        isMoving: true,
        startX: 470,
        startY: 395,
        targetX: 570,
        targetY: 395,
        speed: 2.4,
      },
      // Moving vertical spike
      {
        id: 'l10-ms3',
        x: 625,
        y: 330,
        w: 25,
        h: 30,
        dir: 'down',
        isMoving: true,
        startX: 625,
        startY: 240,
        targetX: 625,
        targetY: 390,
        speed: 2.0,
      },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 11: Sıçrama Pisti (Spring Pads)
  // ----------------------------------------------------
  {
    id: 11,
    name: 'Bölüm 11: Yay Tahtası',
    subtitle: 'Yeşil yay blokları seni roket gibi fırlatır!',
    isCheckpoint: false,
    spawn: { x: 60, y: 440 },
    portal: { x: 870, y: 150, w: 40, h: 50 },
    tip: 'Yayın üzerine in ve havadayken sağa doğru süzül.',
    platforms: [
      { id: 'l11-p1', x: 40, y: 480, w: 140, h: 30, type: 'solid' },
      // Spring 1
      { id: 'l11-sp1', x: 230, y: 480, w: 50, h: 20, type: 'spring', springStrength: -13.5 },
      // High floating platform
      { id: 'l11-p2', x: 380, y: 260, w: 100, h: 22, type: 'solid' },
      // Spring 2
      { id: 'l11-sp2', x: 550, y: 380, w: 50, h: 20, type: 'spring', springStrength: -14.0 },
      // Intermediate crumbling step
      { id: 'l11-c1', x: 690, y: 220, w: 70, h: 20, type: 'crumbly' },
      { id: 'l11-p3', x: 820, y: 190, w: 120, h: 30, type: 'solid' },
    ],
    spikes: [
      { id: 'l11-s1', x: 180, y: 520, w: 650, h: 20, dir: 'up' },
      { id: 'l11-s2', x: 415, y: 235, w: 30, h: 25, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 12: Sinsi Dikenler (Proximity Spikes)
  // ----------------------------------------------------
  {
    id: 12,
    name: 'Bölüm 12: Tetikli Tuzaklar',
    subtitle: 'Yaklaştığında topraktan aniden fırlayan tuzaklar!',
    isCheckpoint: false,
    spawn: { x: 70, y: 440 },
    portal: { x: 880, y: 440, w: 40, h: 50 },
    tip: 'Tuzak yükselmeden önce reflekslerinle üstünden zıpla!',
    platforms: [
      { id: 'l12-p1', x: 40, y: 480, w: 150, h: 30, type: 'solid' },
      { id: 'l12-p2', x: 240, y: 480, w: 150, h: 30, type: 'solid' },
      { id: 'l12-p3', x: 440, y: 450, w: 140, h: 30, type: 'solid' },
      { id: 'l12-p4', x: 630, y: 480, w: 140, h: 30, type: 'solid' },
      { id: 'l12-p5', x: 820, y: 480, w: 120, h: 30, type: 'solid' },
    ],
    spikes: [
      { id: 'l12-sg', x: 190, y: 520, w: 630, h: 20, dir: 'up' },
      // Proximity spike 1
      {
        id: 'l12-prox1',
        x: 310,
        y: 455,
        w: 30,
        h: 25,
        dir: 'up',
        isProximity: true,
        triggerRadius: 90,
      },
      // Proximity spike 2
      {
        id: 'l12-prox2',
        x: 500,
        y: 425,
        w: 30,
        h: 25,
        dir: 'up',
        isProximity: true,
        triggerRadius: 95,
      },
      // Proximity spike 3
      {
        id: 'l12-prox3',
        x: 700,
        y: 455,
        w: 30,
        h: 25,
        dir: 'up',
        isProximity: true,
        triggerRadius: 85,
      },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 13: Hassas İniş (Shaft Descent)
  // ----------------------------------------------------
  {
    id: 13,
    name: 'Bölüm 13: Hassas İniş',
    subtitle: 'Derin kuyuya inerken dikenlerden kıl payı sıyrıl!',
    isCheckpoint: false,
    spawn: { x: 70, y: 120 },
    portal: { x: 870, y: 460, w: 40, h: 50 },
    tip: 'Havada hızını azaltmak için zıt yöne bas.',
    platforms: [
      { id: 'l13-p1', x: 40, y: 160, w: 120, h: 25, type: 'solid' },
      { id: 'l13-c1', x: 200, y: 220, w: 70, h: 20, type: 'crumbly' },
      { id: 'l13-c2', x: 340, y: 280, w: 70, h: 20, type: 'crumbly' },
      { id: 'l13-c3', x: 480, y: 340, w: 70, h: 20, type: 'crumbly' },
      { id: 'l13-c4', x: 620, y: 400, w: 70, h: 20, type: 'crumbly' },
      { id: 'l13-p2', x: 780, y: 500, w: 150, h: 30, type: 'solid' },
    ],
    spikes: [
      { id: 'l13-s1', x: 160, y: 520, w: 620, h: 20, dir: 'up' },
      // Low ceiling spikes
      { id: 'l13-sc1', x: 260, y: 150, w: 100, h: 20, dir: 'down' },
      { id: 'l13-sc2', x: 400, y: 200, w: 100, h: 20, dir: 'down' },
      { id: 'l13-sc3', x: 540, y: 260, w: 100, h: 20, dir: 'down' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 14: Tuzaklı Merdiven (Crumbly + Fake combo)
  // ----------------------------------------------------
  {
    id: 14,
    name: 'Bölüm 14: Aldatıcı Merdiven',
    subtitle: 'Hangi basamağa basacağını iyi seç...',
    isCheckpoint: false,
    spawn: { x: 60, y: 440 },
    portal: { x: 880, y: 180, w: 40, h: 50 },
    tip: 'Sahte blokların kenarında hafif bir titreme sezebilirsin.',
    platforms: [
      { id: 'l14-p1', x: 40, y: 480, w: 120, h: 30, type: 'solid' },
      { id: 'l14-c1', x: 200, y: 430, w: 70, h: 20, type: 'crumbly' },
      { id: 'l14-fake1', x: 310, y: 390, w: 75, h: 20, type: 'fake' },
      { id: 'l14-p2', x: 310, y: 340, w: 75, h: 20, type: 'solid' },
      { id: 'l14-c2', x: 440, y: 290, w: 70, h: 20, type: 'crumbly' },
      { id: 'l14-fake2', x: 560, y: 250, w: 80, h: 20, type: 'fake' },
      { id: 'l14-p3', x: 580, y: 360, w: 80, h: 20, type: 'solid' },
      // Spring pad to reach portal
      { id: 'l14-sp', x: 710, y: 360, w: 50, h: 20, type: 'spring', springStrength: -12.5 },
      { id: 'l14-p4', x: 810, y: 220, w: 120, h: 30, type: 'solid' },
    ],
    spikes: [
      { id: 'l14-sg', x: 160, y: 520, w: 660, h: 20, dir: 'up' },
      { id: 'l14-s2', x: 310, y: 500, w: 80, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 15: CHECKPOINT 3: Çöküş Vadisi
  // ----------------------------------------------------
  {
    id: 15,
    name: 'Bölüm 15: KONTROL NOKTASI 3',
    subtitle: '3. Kontrol Noktası! Aralıksız hızlı sıçramalar.',
    isCheckpoint: true,
    spawn: { x: 70, y: 440 },
    portal: { x: 880, y: 440, w: 40, h: 50 },
    tip: 'Büyük başarı! Son 5 bölüme giriyorsun.',
    platforms: [
      { id: 'l15-p1', x: 40, y: 480, w: 120, h: 30, type: 'solid' },
      // Fast crumbly path
      { id: 'l15-c1', x: 200, y: 450, w: 65, h: 20, type: 'crumbly' },
      { id: 'l15-c2', x: 305, y: 420, w: 65, h: 20, type: 'crumbly' },
      { id: 'l15-c3', x: 410, y: 390, w: 65, h: 20, type: 'crumbly' },
      { id: 'l15-c4', x: 515, y: 420, w: 65, h: 20, type: 'crumbly' },
      { id: 'l15-c5', x: 620, y: 450, w: 65, h: 20, type: 'crumbly' },
      { id: 'l15-c6', x: 725, y: 470, w: 65, h: 20, type: 'crumbly' },
      { id: 'l15-p2', x: 830, y: 480, w: 110, h: 30, type: 'solid' },
    ],
    spikes: [
      { id: 'l15-sg', x: 160, y: 520, w: 670, h: 20, dir: 'up' },
      // Moving spike passing above crumbly blocks
      {
        id: 'l15-ms1',
        x: 460,
        y: 350,
        w: 30,
        h: 25,
        dir: 'down',
        isMoving: true,
        startX: 260,
        startY: 350,
        targetX: 660,
        targetY: 350,
        speed: 2.6,
      },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 16: Zaman Sayacı (Laser corridors)
  // ----------------------------------------------------
  {
    id: 16,
    name: 'Bölüm 16: Zaman Sayacı',
    subtitle: 'Lazer koridoru yüksek hızda yanıp sönüyor!',
    isCheckpoint: false,
    spawn: { x: 70, y: 440 },
    portal: { x: 880, y: 440, w: 40, h: 50 },
    tip: 'Lazer söndüğü milisaniyede fırla!',
    platforms: [
      { id: 'l16-p1', x: 40, y: 480, w: 130, h: 30, type: 'solid' },
      { id: 'l16-p2', x: 230, y: 480, w: 90, h: 30, type: 'solid' },
      { id: 'l16-p3', x: 380, y: 480, w: 90, h: 30, type: 'solid' },
      { id: 'l16-p4', x: 530, y: 480, w: 90, h: 30, type: 'solid' },
      { id: 'l16-p5', x: 680, y: 480, w: 90, h: 30, type: 'solid' },
      { id: 'l16-p6', x: 820, y: 480, w: 120, h: 30, type: 'solid' },
      // Faster alternating lasers
      {
        id: 'l16-las1',
        x: 180,
        y: 300,
        w: 24,
        h: 180,
        type: 'laser',
        laserCycle: 120,
        laserOffset: 0,
        laserActiveDuration: 50,
        laserWarnDuration: 25,
      },
      {
        id: 'l16-las2',
        x: 335,
        y: 300,
        w: 24,
        h: 180,
        type: 'laser',
        laserCycle: 120,
        laserOffset: 60,
        laserActiveDuration: 50,
        laserWarnDuration: 25,
      },
      {
        id: 'l16-las3',
        x: 485,
        y: 300,
        w: 24,
        h: 180,
        type: 'laser',
        laserCycle: 120,
        laserOffset: 0,
        laserActiveDuration: 50,
        laserWarnDuration: 25,
      },
      {
        id: 'l16-las4',
        x: 635,
        y: 300,
        w: 24,
        h: 180,
        type: 'laser',
        laserCycle: 120,
        laserOffset: 60,
        laserActiveDuration: 50,
        laserWarnDuration: 25,
      },
    ],
    spikes: [
      { id: 'l16-sg', x: 170, y: 520, w: 650, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 17: Hızlı Refleks (Fast Moving Platforms & Proximity)
  // ----------------------------------------------------
  {
    id: 17,
    name: 'Bölüm 17: Hızlı Refleks',
    subtitle: 'Hareketli platformlar ve sinsi tuzaklar iç içe!',
    isCheckpoint: false,
    spawn: { x: 70, y: 430 },
    portal: { x: 880, y: 220, w: 40, h: 50 },
    tip: 'Platformdan platforma atlarken havada pozisyonunu ayarla.',
    platforms: [
      { id: 'l17-p1', x: 40, y: 470, w: 120, h: 30, type: 'solid' },
      {
        id: 'l17-m1',
        x: 210,
        y: 430,
        w: 80,
        h: 22,
        type: 'moving',
        startX: 190,
        startY: 430,
        targetX: 350,
        targetY: 430,
        speed: 2.8,
      },
      { id: 'l17-p2', x: 410, y: 370, w: 90, h: 22, type: 'solid' },
      {
        id: 'l17-m2',
        x: 560,
        y: 320,
        w: 80,
        h: 22,
        type: 'moving',
        startX: 540,
        startY: 320,
        targetX: 700,
        targetY: 320,
        speed: 3.0,
      },
      { id: 'l17-p3', x: 780, y: 260, w: 140, h: 30, type: 'solid' },
    ],
    spikes: [
      { id: 'l17-sg', x: 160, y: 520, w: 660, h: 20, dir: 'up' },
      {
        id: 'l17-prox1',
        x: 445,
        y: 345,
        w: 25,
        h: 25,
        dir: 'up',
        isProximity: true,
        triggerRadius: 75,
      },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 18: Kıl Payı (Micro Platforms)
  // ----------------------------------------------------
  {
    id: 18,
    name: 'Bölüm 18: Kıl Payı',
    subtitle: 'Nokta atışı yapman gerek! 30 piksellik basamaklar.',
    isCheckpoint: false,
    spawn: { x: 60, y: 440 },
    portal: { x: 880, y: 440, w: 40, h: 50 },
    tip: 'Havada hızını azaltmak için hafifçe ters tuşa bas.',
    platforms: [
      { id: 'l18-p1', x: 40, y: 480, w: 100, h: 30, type: 'solid' },
      { id: 'l18-p2', x: 190, y: 440, w: 32, h: 20, type: 'solid' },
      { id: 'l18-p3', x: 280, y: 400, w: 32, h: 20, type: 'solid' },
      { id: 'l18-p4', x: 370, y: 360, w: 32, h: 20, type: 'solid' },
      { id: 'l18-p5', x: 460, y: 330, w: 32, h: 20, type: 'solid' },
      { id: 'l18-p6', x: 550, y: 360, w: 32, h: 20, type: 'solid' },
      { id: 'l18-p7', x: 640, y: 400, w: 32, h: 20, type: 'solid' },
      { id: 'l18-p8', x: 730, y: 440, w: 32, h: 20, type: 'solid' },
      { id: 'l18-p9', x: 820, y: 480, w: 120, h: 30, type: 'solid' },
    ],
    spikes: [
      { id: 'l18-sg', x: 140, y: 520, w: 680, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 19: Öfke Senfonisi (All mechanics combined!)
  // ----------------------------------------------------
  {
    id: 19,
    name: 'Bölüm 19: Öfke Senfonisi',
    subtitle: 'Bütün mekanikler bir arada. Sakin kal ve odaklan!',
    isCheckpoint: false,
    spawn: { x: 60, y: 440 },
    portal: { x: 880, y: 160, w: 40, h: 50 },
    tip: 'Yay -> Çöken Zemin -> Lazer -> Zafer!',
    platforms: [
      { id: 'l19-p1', x: 40, y: 480, w: 100, h: 30, type: 'solid' },
      // Spring pad 1
      { id: 'l19-sp1', x: 170, y: 480, w: 50, h: 20, type: 'spring', springStrength: -13.8 },
      // Crumbly step
      { id: 'l19-c1', x: 270, y: 280, w: 70, h: 20, type: 'crumbly' },
      // Moving platform
      {
        id: 'l19-m1',
        x: 400,
        y: 280,
        w: 80,
        h: 22,
        type: 'moving',
        startX: 380,
        startY: 280,
        targetX: 520,
        targetY: 280,
        speed: 2.5,
      },
      // Fake platform bait
      { id: 'l19-fake', x: 630, y: 280, w: 70, h: 20, type: 'fake' },
      // Real spring pad below fake
      { id: 'l19-sp2', x: 640, y: 450, w: 50, h: 20, type: 'spring', springStrength: -14.2 },
      { id: 'l19-p2', x: 800, y: 200, w: 130, h: 30, type: 'solid' },
      // Laser
      {
        id: 'l19-las',
        x: 740,
        y: 120,
        w: 24,
        h: 200,
        type: 'laser',
        laserCycle: 130,
        laserOffset: 40,
        laserActiveDuration: 55,
        laserWarnDuration: 25,
      },
    ],
    spikes: [
      { id: 'l19-sg', x: 140, y: 520, w: 490, h: 20, dir: 'up' },
      { id: 'l19-sg2', x: 700, y: 520, w: 120, h: 20, dir: 'up' },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 20: İMKÂNSIZ FİNAL (The Master Gauntlet)
  // ----------------------------------------------------
  {
    id: 20,
    name: 'Bölüm 20: İMKÂNSIZ FİNAL',
    subtitle: 'Nihai Sınav! 20 bölümün şampiyonu olmaya hazır mısın?',
    isCheckpoint: true,
    spawn: { x: 60, y: 440 },
    portal: { x: 880, y: 150, w: 45, h: 55 },
    tip: 'Pes etme! Bu oyunu bitiren efsaneler arasına girecek.',
    secretToken: { x: 480, y: 120, size: 24 }, // Collect to unlock bonus level!
    platforms: [
      { id: 'l20-p1', x: 40, y: 480, w: 110, h: 30, type: 'solid' },
      // Step 1: Crumbly with moving spike
      { id: 'l20-c1', x: 190, y: 440, w: 70, h: 20, type: 'crumbly' },
      // Wall jump shaft
      { id: 'l20-w1', x: 300, y: 220, w: 25, h: 220, type: 'solid' },
      { id: 'l20-w2', x: 400, y: 180, w: 25, h: 220, type: 'solid' },
      // Moving platform in midair
      {
        id: 'l20-m1',
        x: 460,
        y: 280,
        w: 75,
        h: 20,
        type: 'moving',
        startX: 450,
        startY: 280,
        targetX: 580,
        targetY: 280,
        speed: 2.7,
      },
      // Spring pad launch
      { id: 'l20-sp1', x: 670, y: 350, w: 50, h: 20, type: 'spring', springStrength: -14.2 },
      // High precision crumbly steps
      { id: 'l20-c2', x: 740, y: 200, w: 50, h: 20, type: 'crumbly' },
      { id: 'l20-p2', x: 830, y: 190, w: 110, h: 30, type: 'solid' },
    ],
    spikes: [
      { id: 'l20-sg', x: 150, y: 520, w: 700, h: 20, dir: 'up' },
      // Wall spike
      { id: 'l20-sw', x: 325, y: 290, w: 20, h: 50, dir: 'right' },
      // Moving spike underneath
      {
        id: 'l20-ms',
        x: 520,
        y: 250,
        w: 28,
        h: 24,
        dir: 'down',
        isMoving: true,
        startX: 450,
        startY: 250,
        targetX: 620,
        targetY: 250,
        speed: 3.2,
      },
    ],
  },

  // ----------------------------------------------------
  // LEVEL 21: GİZLİ BONUS BÖLÜM: RAGE CEHENNEMİ
  // ----------------------------------------------------
  {
    id: 21,
    name: 'Bölüm 21: RAGE CEHENNEMİ (Gizli Bonus)',
    subtitle: 'Sadece gerçek Rage Ustaları için... Canın yanacak!',
    isCheckpoint: false,
    spawn: { x: 60, y: 440 },
    portal: { x: 880, y: 140, w: 45, h: 55 },
    tip: 'Tebrikler gizli bölümü keşfettin! Şimdi acı çekme vakti.',
    platforms: [
      { id: 'l21-p1', x: 40, y: 480, w: 100, h: 30, type: 'solid' },
      { id: 'l21-c1', x: 180, y: 440, w: 50, h: 18, type: 'crumbly' },
      { id: 'l21-c2', x: 270, y: 400, w: 50, h: 18, type: 'crumbly' },
      {
        id: 'l21-m1',
        x: 370,
        y: 350,
        w: 65,
        h: 20,
        type: 'moving',
        startX: 360,
        startY: 350,
        targetX: 470,
        targetY: 350,
        speed: 3.6,
      },
      { id: 'l21-sp1', x: 530, y: 460, w: 45, h: 20, type: 'spring', springStrength: -14.5 },
      { id: 'l21-c3', x: 650, y: 220, w: 50, h: 18, type: 'crumbly' },
      { id: 'l21-p2', x: 790, y: 180, w: 140, h: 30, type: 'solid' },
      // High speed lasers
      {
        id: 'l21-las1',
        x: 330,
        y: 180,
        w: 24,
        h: 240,
        type: 'laser',
        laserCycle: 90,
        laserOffset: 0,
        laserActiveDuration: 40,
        laserWarnDuration: 20,
      },
      {
        id: 'l21-las2',
        x: 600,
        y: 180,
        w: 24,
        h: 240,
        type: 'laser',
        laserCycle: 90,
        laserOffset: 45,
        laserActiveDuration: 40,
        laserWarnDuration: 20,
      },
    ],
    spikes: [
      { id: 'l21-sg', x: 140, y: 520, w: 660, h: 20, dir: 'up' },
      {
        id: 'l21-prox1',
        x: 820,
        y: 155,
        w: 25,
        h: 25,
        dir: 'up',
        isProximity: true,
        triggerRadius: 90,
      },
    ],
  },
];
