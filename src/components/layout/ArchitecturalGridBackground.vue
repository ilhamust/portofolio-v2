<template>
  <div 
    class="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none transition-colors duration-300"
    aria-hidden="true"
  >
    <!-- 1. Distributed Soft Atmospheric Ambient Blooms (Tipis-tipis & Merata) -->
    <!-- Section 01 (Hero): Top-Right Ambient Spotlight Bloom (Referensi 1) -->
    <div 
      class="absolute -top-10 right-[-5%] w-[45vw] lg:w-[650px] h-[45vw] lg:h-[650px] rounded-full bg-accent-navy/[0.14] dark:bg-accent-navy/[0.12] light:bg-accent-navy/[0.07] blur-[150px] pointer-events-none"
    />
    
    <!-- Section 02 (About): Soft Left Ambient Bloom -->
    <div 
      class="absolute top-[16%] -left-16 w-[36vw] lg:w-[500px] h-[36vw] lg:h-[500px] rounded-full bg-accent-navy/[0.08] dark:bg-accent-navy/[0.07] light:bg-accent-navy/[0.04] blur-[140px] pointer-events-none"
    />

    <!-- Section 03 (Projects): Soft Right Ambient Bloom -->
    <div 
      class="absolute top-[33%] -right-16 w-[42vw] lg:w-[550px] h-[42vw] lg:h-[550px] rounded-full bg-accent-navy/[0.09] dark:bg-accent-navy/[0.08] light:bg-accent-navy/[0.05] blur-[150px] pointer-events-none"
    />

    <!-- Section 04 (Tech Stack): Subtle Center-Left Ambient Bloom -->
    <div 
      class="absolute top-[50%] left-[8%] w-[38vw] lg:w-[480px] h-[38vw] lg:h-[480px] rounded-full bg-accent-navy/[0.07] dark:bg-accent-navy/[0.06] light:bg-accent-navy/[0.04] blur-[140px] pointer-events-none"
    />

    <!-- Section 05 (Experience): Soft Left Ambient Bloom -->
    <div 
      class="absolute top-[67%] -left-12 w-[40vw] lg:w-[520px] h-[40vw] lg:h-[520px] rounded-full bg-accent-navy/[0.08] dark:bg-accent-navy/[0.07] light:bg-accent-navy/[0.04] blur-[150px] pointer-events-none"
    />

    <!-- Section 06 (Guestbook & Footer): Soft Right Ambient Bloom -->
    <div 
      class="absolute top-[84%] -right-10 w-[45vw] lg:w-[580px] h-[45vw] lg:h-[580px] rounded-full bg-accent-navy/[0.09] dark:bg-accent-navy/[0.08] light:bg-accent-navy/[0.05] blur-[160px] pointer-events-none"
    />

    <!-- 2. Continuous Flowing Wave String SVG Canvas (Subtle & Pure Background Element) -->
    <svg 
      class="w-full h-full absolute inset-0 overflow-visible"
      viewBox="0 0 1000 6000"
      preserveAspectRatio="none"
    >
      <defs>
        <!-- Primary Wave Gradient (Soft, Non-Dominant Royal Navy to Subtle Cyan) -->
        <linearGradient id="primaryWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.65" />
          <stop offset="6%" stop-color="#60a5fa" stop-opacity="0.75" />
          <stop offset="12%" stop-color="#1d4ed8" stop-opacity="0.55" />
          <stop offset="22%" stop-color="#2563eb" stop-opacity="0.45" />
          <stop offset="42%" stop-color="#3b82f6" stop-opacity="0.55" />
          <stop offset="55%" stop-color="#1d4ed8" stop-opacity="0.4" />
          <stop offset="68%" stop-color="#60a5fa" stop-opacity="0.5" />
          <stop offset="82%" stop-color="#2563eb" stop-opacity="0.45" />
          <stop offset="95%" stop-color="#1d4ed8" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.15" />
        </linearGradient>

        <!-- Secondary Echo Wave Gradient (Ultra-Subtle Harmonic Depth) -->
        <linearGradient id="echoWaveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.22" />
          <stop offset="25%" stop-color="#3b82f6" stop-opacity="0.15" />
          <stop offset="50%" stop-color="#1d4ed8" stop-opacity="0.1" />
          <stop offset="75%" stop-color="#2563eb" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.05" />
        </linearGradient>

        <!-- Delicate Micro Glow for Crisp Line Quality -->
        <filter id="delicateGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <!-- Wave 1 (Secondary Echo Curve - Ultra-Soft Hairline) -->
      <path
        :d="echoCurvePath"
        fill="none"
        stroke="url(#echoWaveGrad)"
        stroke-width="1.0"
        vector-effect="non-scaling-stroke"
        class="opacity-60 dark:opacity-50 light:opacity-30"
      />

      <!-- Wave 2 (Main Flowing Wave String - Refined, Subtle, Clean) -->
      <path
        :d="mainCurvePath"
        fill="none"
        stroke="url(#primaryWaveGrad)"
        stroke-width="1.25"
        vector-effect="non-scaling-stroke"
        filter="url(#delicateGlow)"
        class="opacity-75 dark:opacity-70 light:opacity-50 transition-opacity duration-300"
      />
    </svg>
  </div>
</template>

<script setup>
// Continuous Bezier Spline Path from Section 01 (Hero) to Section 06 (Guestbook & Footer)
// Height mapped to 6000 units (~1000 units per section)
// Hero (0 - 1000): Sweeps across giant "ILHAM MUSTAQIM" and towards top-right bloom (Referensi 1)
// About (1000 - 2000): Graceful S-curve framing values cards
// Projects (2000 - 3000): Weaving under project carousel cards
// Tech Stack (3000 - 4000): Fluid flow underneath marquee
// Experience (4000 - 5000): Elegant vertical guide alongside timeline
// Guestbook (5000 - 6000): Dynamic curve framing guestbook wall & footer
const mainCurvePath = `
  M -20, 680
  C 180, 720, 290, 480, 520, 520
  C 710, 550, 880, 310, 990, 380
  C 1060, 430, 960, 1150, 860, 1380
  C 750, 1620, 240, 1520, 160, 1850
  C 90, 2150, 420, 2280, 680, 2480
  C 900, 2660, 940, 2880, 780, 3150
  C 640, 3380, 180, 3420, 140, 3720
  C 100, 4020, 360, 4180, 420, 4420
  C 480, 4680, 180, 4850, 140, 5150
  C 100, 5450, 780, 5480, 820, 5750
  C 850, 5950, 620, 6020, 480, 6050
`

// Harmonic Echo Curve (slightly offset to create 3D wave ribbon depth like in Referensi 1)
const echoCurvePath = `
  M -20, 720
  C 170, 760, 280, 520, 510, 560
  C 700, 590, 870, 350, 980, 420
  C 1050, 470, 940, 1180, 840, 1410
  C 730, 1650, 220, 1550, 140, 1880
  C 70, 2180, 400, 2310, 660, 2510
  C 880, 2690, 920, 2910, 760, 3180
  C 620, 3410, 160, 3450, 120, 3750
  C 80, 4050, 340, 4210, 400, 4450
  C 460, 4710, 160, 4880, 120, 5180
  C 80, 5480, 760, 5510, 800, 5780
  C 830, 5980, 600, 6050, 460, 6080
`
</script>
