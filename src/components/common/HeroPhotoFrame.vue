<template>
  <div :class="['relative w-full mx-auto select-none group', maxWidthClass]">
    <!-- Floating Offset Backdrop Layer (Aksen Kedalaman Arsitektural) -->
    <div
      class="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-full h-full rounded-lg bg-dark-surface/60 light:bg-warm-200/50 border border-thin border-accent-navy/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
      aria-hidden="true"
    ></div>

    <!-- Main Container Frame -->
    <div
      :class="[
        'relative w-full overflow-hidden rounded-lg bg-dark-surface light:bg-warm-100 border border-thin transition-all duration-500 group-hover:border-dark-text/30 light:group-hover:border-warm-400 group-hover:shadow-xl group-hover:shadow-black/20',
        aspectClass
      ]"
    >
      <!-- Corner Registration Marks (Aksen Presisi Editorial Studio) -->
      <span class="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 text-[9px] sm:text-[10px] font-mono text-dark-muted/60 light:text-warm-600/60 z-20 pointer-events-none">+</span>
      <span class="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-[9px] sm:text-[10px] font-mono text-dark-muted/60 light:text-warm-600/60 z-20 pointer-events-none">+</span>
      <span class="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 text-[9px] sm:text-[10px] font-mono text-dark-muted/60 light:text-warm-600/60 z-20 pointer-events-none">+</span>
      <span class="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 text-[9px] sm:text-[10px] font-mono text-dark-muted/60 light:text-warm-600/60 z-20 pointer-events-none">+</span>

      <!-- Top-Left Monospace Editorial Badge Tag -->
      <div
        v-if="badgeText"
        class="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 bg-dark-bg/40 light:bg-warm-50/50 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[0.5625rem] sm:text-[0.625rem] font-mono uppercase tracking-wider text-dark-text/90 light:text-warm-900 border border-white/15 light:border-black/15 group-hover:border-white/30 light:group-hover:border-black/30 transition-colors shadow-sm"
      >
        {{ badgeText }}
      </div>

      <!-- Main Photo Image (Universal & Adaptive) -->
      <img
        :src="src"
        :alt="alt"
        :class="[
          'w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105',
          grayscale ? 'grayscale contrast-105 group-hover:grayscale-0' : '',
          objectPositionClass
        ]"
      />

      <!-- Subtle Dark Overlay Gradient for Smooth Visual Cohesion -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark-bg/70 via-transparent to-transparent light:from-warm-900/30 pointer-events-none z-10"></div>

      <!-- Prominent Bottom-Right Location Transparent Glass Card -->
      <div
        v-if="locationText"
        class="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-20 max-w-[90%] bg-dark-bg/40 light:bg-warm-50/50 backdrop-blur-lg px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-lg border border-white/15 light:border-black/15 shadow-xl shadow-black/30 group-hover:border-white/30 light:group-hover:border-black/30 group-hover:bg-dark-bg/50 transition-all duration-300"
      >
        <div class="flex items-center gap-2 sm:gap-2.5">
          <span class="text-xs sm:text-sm">📍</span>
          <div>
            <span class="text-[0.5rem] sm:text-[0.5625rem] font-mono text-dark-muted/80 light:text-warm-700/80 block uppercase tracking-widest leading-none mb-0.5 sm:mb-1">
              {{ locationLabel }}
            </span>
            <p class="font-mono text-[0.6875rem] sm:text-xs text-dark-text light:text-warm-900 font-bold leading-tight tracking-wide">
              {{ locationText }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  /**
   * URL atau path relatif foto
   */
  src: {
    type: String,
    required: true
  },
  /**
   * Teks alternatif foto
   */
  alt: {
    type: String,
    default: 'Profile Photo'
  },
  /**
   * Teks label badge atas kiri (default: FIG. 01 // PORTRAIT)
   */
  badgeText: {
    type: String,
    default: 'FIG. 01 // PORTRAIT'
  },
  /**
   * Teks label posisi (default: BASED IN)
   */
  locationLabel: {
    type: String,
    default: 'BASED IN'
  },
  /**
   * Teks lokasi (opsional)
   */
  locationText: {
    type: String,
    default: ''
  },
  /**
   * Class aspect-ratio atau height (default: aspect-[4/5] h-[280px] sm:h-[320px] lg:h-[360px])
   */
  aspectClass: {
    type: String,
    default: 'aspect-[4/5] h-[280px] sm:h-[320px] lg:h-[360px]'
  },
  /**
   * Class max-width kontainer utama
   */
  maxWidthClass: {
    type: String,
    default: 'max-w-[260px] sm:max-w-[290px] lg:max-w-[320px]'
  },
  /**
   * Posisi alignment foto (e.g. object-top, object-center)
   */
  objectPositionClass: {
    type: String,
    default: 'object-center'
  },
  /**
   * Efek monokrom saat idle (berubah warna saat hover)
   */
  grayscale: {
    type: Boolean,
    default: true
  }
})
</script>
