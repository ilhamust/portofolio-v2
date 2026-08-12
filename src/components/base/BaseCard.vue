<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[
      'block rounded-lg transition-all duration-300 border-thin',
      variantClasses[variant] || variantClasses.default,
      hoverable ? 'hover:border-warm-400 dark:hover:border-dark-hover hover:-translate-y-[2px] cursor-pointer' : '',
      paddingClasses[padding] || paddingClasses.md
    ]"
  >
    <!-- Card Header Slot -->
    <div v-if="$slots.header" class="mb-4 pb-3 border-b border-warm-200/60 dark:border-dark-border/60">
      <slot name="header" />
    </div>

    <!-- Default Content Slot -->
    <div>
      <slot />
    </div>

    <!-- Card Footer Slot -->
    <div v-if="$slots.footer" class="mt-6 pt-4 border-t border-warm-200/60 dark:border-dark-border/60">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * Tag HTML yang dirender ('div', 'article', 'section')
   */
  as: {
    type: String,
    default: 'div'
  },
  /**
   * Router link target jika kartu berfungsi sebagai link
   */
  to: {
    type: [String, Object],
    default: null
  },
  /**
   * External link URL jika kartu berfungsi sebagai link eksternal
   */
  href: {
    type: String,
    default: null
  },
  /**
   * Tautan eksternal (target="_blank")
   */
  external: {
    type: Boolean,
    default: false
  },
  /**
   * Apakah mengaktifkan efek hover (interaktif)
   */
  hoverable: {
    type: Boolean,
    default: false
  },
  /**
   * Preset padding kartu ('none' | 'sm' | 'md' | 'lg')
   */
  padding: {
    type: String,
    default: 'md',
    validator: (val) => ['none', 'sm', 'md', 'lg'].includes(val)
  },
  /**
   * Varian permukaan kartu ('default' | 'outline' | 'flat')
   */
  variant: {
    type: String,
    default: 'default',
    validator: (val) => ['default', 'outline', 'flat'].includes(val)
  }
})

// Menentukan tag HTML (router-link, a, atau tag kostum)
const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return props.as
})

const variantClasses = {
  default: 'bg-warm-100/70 dark:bg-dark-surface/70 backdrop-blur-xs',
  outline: 'bg-transparent',
  flat: 'bg-warm-100/40 dark:bg-dark-surface/40 border-none'
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4 md:p-5',
  md: 'p-6 md:p-8',
  lg: 'p-8 md:p-12'
}
</script>
