<template>
  <header
    :class="[
      'w-full transition-colors duration-300 mb-8 md:mb-12',
      bordered ? 'pb-6 border-b border-thin' : '',
      align === 'center' ? 'text-center mx-auto' : 'text-left'
    ]"
  >
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <!-- Section Number Tag Monospace (Terinspirasi Referensi 1 & 2) -->
        <div v-if="number || label" class="flex items-center gap-2 text-mono-number mb-2">
          <span v-if="number" class="font-mono text-warm-600 dark:text-dark-muted font-medium">
            {{ formattedNumber }}
          </span>
          <span v-if="label" class="font-mono text-xs uppercase tracking-widest text-warm-700 dark:text-dark-muted font-semibold">
            {{ label }}
          </span>
        </div>

        <!-- Section Main Serif Title -->
        <h2 class="text-2xl md:text-4xl font-serif tracking-tight text-warm-900 dark:text-dark-text">
          <slot name="title">{{ title }}</slot>
        </h2>

        <!-- Section Context Subtitle -->
        <p
          v-if="subtitle || $slots.subtitle"
          :class="[
            'text-sm md:text-base font-light text-warm-600 dark:text-dark-muted mt-2 leading-relaxed',
            align === 'center' ? 'max-w-xl mx-auto' : 'max-w-2xl'
          ]"
        >
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>

      <!-- Action / Extra Badge Slot -->
      <div v-if="$slots.action" class="shrink-0 flex items-center gap-3">
        <slot name="action" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * Nomor section (misal: '01', 2, '03')
   */
  number: {
    type: [String, Number],
    default: null
  },
  /**
   * Label singkat section (misal: 'SELECTED WORKS')
   */
  label: {
    type: String,
    default: null
  },
  /**
   * Judul utama section
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * Deskripsi / narasi singkat di bawah judul
   */
  subtitle: {
    type: String,
    default: ''
  },
  /**
   * Penyelarasan teks ('left' | 'center')
   */
  align: {
    type: String,
    default: 'left',
    validator: (val) => ['left', 'center'].includes(val)
  },
  /**
   * Apakah menampilkan garis batas tipis di bawah header
   */
  bordered: {
    type: Boolean,
    default: true
  }
})

// Format nomor agar selalu 2 digit (misal: 1 -> '01 /')
const formattedNumber = computed(() => {
  if (props.number === null || props.number === undefined) return ''
  const numStr = String(props.number).trim()
  if (numStr.length === 1 && !isNaN(numStr)) {
    return `0${numStr} /`
  }
  return numStr.endsWith('/') ? numStr : `${numStr} /`
})
</script>
