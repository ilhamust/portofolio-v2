<template>
  <component
    :is="as"
    :class="[
      'mx-auto w-full transition-colors duration-300',
      sizeClasses[size] || sizeClasses.default,
      padding ? 'px-4 sm:px-6 md:px-10 lg:px-12' : '',
      grid ? 'grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12' : ''
    ]"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * HTML tag yang dirender ('div', 'section', 'header', 'footer', 'main')
   */
  as: {
    type: String,
    default: 'div'
  },
  /**
   * Ukuran maksimal container ('narrow' | 'default' | 'wide' | 'full')
   */
  size: {
    type: String,
    default: 'default',
    validator: (val) => ['narrow', 'default', 'wide', 'full'].includes(val)
  },
  /**
   * Apakah mengaktifkan CSS Grid 12 Kolom
   */
  grid: {
    type: Boolean,
    default: false
  },
  /**
   * Apakah menambahkan padding horizontal responsif
   */
  padding: {
    type: Boolean,
    default: true
  }
})

const sizeClasses = {
  narrow: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-6xl',
  full: 'max-w-none'
}
</script>
