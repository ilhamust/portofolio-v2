<template>
  <div
    :class="[
      'relative flex items-center gap-1.5 md:gap-2.5 w-full select-none group',
      heightClass
    ]"
    :aria-label="alt"
  >
    <!-- 4 Vertical Sliced Image Slats (Presisi Referensi) -->
    <div
      v-for="(slat, index) in slatsCount"
      :key="index"
      :class="[
        'relative flex-1 h-full overflow-hidden rounded-xs bg-dark-surface border-thin transition-all duration-500 ease-out group-hover:border-accent-navy/50',
        slatOffsets[index % slatOffsets.length]
      ]"
    >
      <img
        :src="src"
        :alt="alt"
        class="absolute top-0 max-w-none h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
        :style="{
          width: `${slatsCount * 100}%`,
          left: `-${index * 100}%`
        }"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  /**
   * URL gambar atau path relatif aset gambar
   */
  src: {
    type: String,
    required: true
  },
  /**
   * Teks alternatif gambar
   */
  alt: {
    type: String,
    default: 'Profile Photo'
  },
  /**
   * Jumlah bilah pemotong (default: 4 bilah presisi Referensi)
   */
  slatsCount: {
    type: Number,
    default: 4
  },
  /**
   * Tinggi total kontainer
   */
  heightClass: {
    type: String,
    default: 'h-[240px] sm:h-[270px] lg:h-[280px]'
  }
})

// Offset staggered tinggi & tinggi bilah presisi referensi (4 Bilah)
const slatOffsets = [
  'h-[82%] mt-auto',
  'h-[98%] mb-auto',
  'h-[90%] mt-3',
  'h-[78%] mt-auto'
]
</script>
