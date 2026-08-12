<template>
  <div
    :class="[
      'relative flex items-center w-full transition-colors duration-300',
      spacingClasses[spacing] || spacingClasses.md
    ]"
  >
    <!-- Left Border Line -->
    <div
      v-if="align === 'center' || align === 'right'"
      class="grow border-t border-warm-200 dark:border-dark-border"
    ></div>

    <!-- Number / Label Content -->
    <div
      v-if="number || label || $slots.default"
      :class="[
        'shrink-0 flex items-center gap-2.5 text-mono-number select-none',
        align === 'left' && (align === 'center' || align === 'right') ? 'px-4' : '',
        align === 'left' ? 'pr-4' : '',
        align === 'right' ? 'pl-4' : '',
        align === 'center' ? 'px-4' : ''
      ]"
    >
      <!-- Section Number (e.g. "01 /") -->
      <span v-if="number" class="font-mono text-warm-600 dark:text-dark-muted font-medium">
        {{ formattedNumber }}
      </span>

      <!-- Section Label or Slot -->
      <span v-if="label || $slots.default" class="font-mono text-xs uppercase tracking-widest text-warm-700 dark:text-dark-muted font-medium">
        <slot>{{ label }}</slot>
      </span>
    </div>

    <!-- Right Border Line -->
    <div
      v-if="align === 'left' || align === 'center'"
      class="grow border-t border-warm-200 dark:border-dark-border"
    ></div>
  </div>
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
   * Label teks penanda section (misal: 'PROYEK PILIHAN')
   */
  label: {
    type: String,
    default: null
  },
  /**
   * Posisi nomor/label ('left' | 'center' | 'right')
   */
  align: {
    type: String,
    default: 'left',
    validator: (val) => ['left', 'center', 'right'].includes(val)
  },
  /**
   * Spasi vertikal margin ('sm' | 'md' | 'lg' | 'xl')
   */
  spacing: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg', 'xl'].includes(val)
  }
})

// Format nomor agar selalu 2 digit (misal: 1 -> '01')
const formattedNumber = computed(() => {
  if (props.number === null || props.number === undefined) return ''
  const numStr = String(props.number).trim()
  if (numStr.length === 1 && !isNaN(numStr)) {
    return `0${numStr} /`
  }
  return numStr.endsWith('/') ? numStr : `${numStr} /`
})

const spacingClasses = {
  sm: 'my-6',
  md: 'my-10 md:my-14',
  lg: 'my-14 md:my-20',
  xl: 'my-20 md:my-28'
}
</script>
