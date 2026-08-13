<template>
  <div
    :class="[
      'relative flex items-center justify-between gap-1.5 md:gap-2.5 w-full select-none group',
      heightClass
    ]"
    :aria-label="alt"
  >
    <!-- 5 Vertical Sliced Image Slats (Terinspirasi Referensi 1 - Nathan Stampfli) -->
    <div
      v-for="(slat, index) in slatsCount"
      :key="index"
      :class="[
        'flex-1 h-full overflow-hidden rounded-full bg-dark-surface border-thin transition-all duration-500 ease-out group-hover:border-accent-navy/50',
        offsetClasses[index % offsetClasses.length]
      ]"
    >
      <div
        class="w-full h-full bg-cover bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
        :style="getSlatStyle(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
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
    default: 'Project Showcase'
  },
  /**
   * Jumlah bilah pemotong (default: 5 bilah presisi Referensi 1)
   */
  slatsCount: {
    type: Number,
    default: 5
  },
  /**
   * Tinggi total kontainer
   */
  heightClass: {
    type: String,
    default: 'h-[260px] sm:h-[320px] md:h-[400px]'
  }
})

// Offset tinggi staggered acak (Terinspirasi offset bilah di Referensi 1)
const offsetClasses = [
  'translate-y-2 md:translate-y-4',
  '-translate-y-2 md:-translate-y-3',
  'translate-y-0',
  '-translate-y-3 md:-translate-y-4',
  'translate-y-2 md:translate-y-3'
]

/**
 * Menghitung background-position dan background-size untuk setiap bilah pemotong
 * sehingga ketika 5 bilah digabung, gambar utuh terbentuk kembali secara potongan vertikal
 */
const getSlatStyle = (index) => {
  const total = props.slatsCount
  // Hitung persentase posisi horizontal gambar (0% hingga 100%)
  const percentage = total > 1 ? (index / (total - 1)) * 100 : 50

  return {
    backgroundImage: `url("${props.src}")`,
    backgroundPosition: `${percentage}% center`,
    // Perbesar background-size agar menutupi potongan tiap bilah secara proporsional
    backgroundSize: `${total * 100}% 100%`
  }
}
</script>
