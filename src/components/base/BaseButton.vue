<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :type="isButton ? type : undefined"
    :disabled="isButton ? disabled : undefined"
    :class="[
      'inline-flex items-center justify-center font-sans transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-warm-400 dark:focus-visible:ring-dark-muted',
      variantClasses[variant] || variantClasses.primary,
      sizeClasses[size] || sizeClasses.md,
      block ? 'w-full' : '',
      disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
    ]"
  >
    <!-- Left Icon Slot -->
    <span v-if="$slots.iconLeft" class="inline-flex shrink-0 mr-2">
      <slot name="iconLeft" />
    </span>

    <!-- Default Label Slot -->
    <span>
      <slot />
    </span>

    <!-- Right Icon Slot -->
    <span v-if="$slots.iconRight" class="inline-flex shrink-0 ml-2">
      <slot name="iconRight" />
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * Varian visual button ('primary' | 'outline' | 'ghost' | 'link')
   */
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'outline', 'ghost', 'link'].includes(val)
  },
  /**
   * Ukuran button ('sm' | 'md' | 'lg')
   */
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  },
  /**
   * Router link target ('/work', { name: 'Home' })
   */
  to: {
    type: [String, Object],
    default: null
  },
  /**
   * External URL link
   */
  href: {
    type: String,
    default: null
  },
  /**
   * Apakah tautan eksternal (menambahkan target="_blank" & rel="noopener")
   */
  external: {
    type: Boolean,
    default: false
  },
  /**
   * Type elemen button ('button' | 'submit' | 'reset')
   */
  type: {
    type: String,
    default: 'button'
  },
  /**
   * Status disabled
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * Lebar penuh (w-full)
   */
  block: {
    type: Boolean,
    default: false
  }
})

// Menentukan tag HTML yang dirender (router-link, a, atau button)
const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const isButton = computed(() => tag.value === 'button')

const variantClasses = {
  primary: 'bg-warm-900 text-warm-50 hover:bg-warm-700 dark:bg-dark-text dark:text-dark-bg dark:hover:bg-warm-200 rounded-md shadow-xs',
  outline: 'border border-warm-200 dark:border-dark-border text-warm-900 dark:text-dark-text hover:bg-warm-100 dark:hover:bg-dark-surface hover:border-warm-300 dark:hover:border-dark-hover rounded-md',
  ghost: 'text-warm-700 dark:text-dark-muted hover:text-warm-900 dark:hover:text-dark-text hover:bg-warm-100/60 dark:hover:bg-dark-surface/60 rounded-md',
  link: 'link-editorial text-warm-900 dark:text-dark-text p-0 bg-transparent rounded-none'
}

const sizeClasses = {
  sm: 'text-xs px-3 py-1.5 font-mono tracking-wider uppercase',
  md: 'text-sm px-4 py-2 font-medium tracking-wide',
  lg: 'text-base px-6 py-3 font-medium'
}
</script>
