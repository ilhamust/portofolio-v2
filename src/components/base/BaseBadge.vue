<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 border-thin transition-colors duration-200 select-none',
      pill ? 'rounded-full' : 'rounded',
      mono ? 'font-mono tracking-wider' : 'font-sans tracking-normal font-medium',
      variantClasses[variant] || variantClasses.neutral,
      sizeClasses[size] || sizeClasses.sm
    ]"
  >
    <!-- Pulse Status Dot -->
    <span v-if="dot" class="relative flex h-2 w-2 shrink-0">
      <span :class="['animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', dotBgClasses[dotColor] || 'bg-emerald-400']"></span>
      <span :class="['relative inline-flex rounded-full h-2 w-2', dotBgClasses[dotColor] || 'bg-emerald-500']"></span>
    </span>

    <!-- Optional Badge Icon Slot -->
    <span v-if="$slots.icon" class="inline-flex shrink-0">
      <slot name="icon" />
    </span>

    <!-- Badge Text Slot -->
    <span>
      <slot />
    </span>
  </span>
</template>

<script setup>
const props = defineProps({
  /**
   * Varian visual badge ('neutral' | 'outline' | 'subtle' | 'accent')
   */
  variant: {
    type: String,
    default: 'neutral',
    validator: (val) => ['neutral', 'outline', 'subtle', 'accent'].includes(val)
  },
  /**
   * Ukuran badge ('sm' | 'md')
   */
  size: {
    type: String,
    default: 'sm',
    validator: (val) => ['sm', 'md'].includes(val)
  },
  /**
   * Bentuk capsule/pill (rounded-full) terinspirasi Referensi 4
   */
  pill: {
    type: Boolean,
    default: true
  },
  /**
   * Apakah menampilkan titik penanda status (dot)
   */
  dot: {
    type: Boolean,
    default: false
  },
  /**
   * Warna titik status ('emerald' | 'amber' | 'terracotta' | 'sky')
   */
  dotColor: {
    type: String,
    default: 'emerald',
    validator: (val) => ['emerald', 'amber', 'terracotta', 'sky'].includes(val)
  },
  /**
   * Apakah menggunakan font monospace (default: true untuk rasa editorial)
   */
  mono: {
    type: Boolean,
    default: true
  }
})

const variantClasses = {
  neutral: 'bg-warm-100 dark:bg-dark-surface text-warm-700 dark:text-dark-muted border-warm-200 dark:border-dark-border',
  outline: 'bg-transparent text-warm-700 dark:text-dark-muted border-warm-200 dark:border-dark-border',
  subtle: 'bg-warm-200/50 dark:bg-dark-surface/90 text-warm-900 dark:text-dark-text border-warm-300 dark:border-dark-hover',
  accent: 'bg-warm-900 text-warm-50 dark:bg-dark-text dark:text-dark-bg border-warm-900 dark:border-dark-text'
}

const sizeClasses = {
  sm: 'text-[0.6875rem] px-2.5 py-0.5',
  md: 'text-xs px-3 py-1'
}

const dotBgClasses = {
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  terracotta: 'bg-accent-warm',
  sky: 'bg-sky-500'
}
</script>
