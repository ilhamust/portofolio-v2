<template>
  <component :is="as" ref="elRef" class="inline-block font-mono tracking-wider select-none">
    {{ displayText }}
  </component>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  as: {
    type: String,
    default: 'span'
  },
  duration: {
    type: Number,
    default: 550 // Snappy, responsive terminal deciphering that completes just as user scrolls into view
  },
  delay: {
    type: Number,
    default: 0
  },
  chars: {
    type: String,
    default: '!<>-_\\/[]{}—=+*^?#_0101%&$@'
  }
})

const emit = defineEmits(['complete'])

const elRef = ref(null)
const displayText = ref(props.text)
let animationFrameId = null
let timeoutId = null
let observer = null

const scramble = () => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (timeoutId) clearTimeout(timeoutId)

  timeoutId = setTimeout(() => {
    const target = props.text
    const targetLength = target.length
    const startTime = performance.now()
    let lastGlyphUpdate = 0
    const glyphInterval = 35 // Crisp, rhythmic cipher glyph updates
    let currentRandomPool = Array(targetLength).fill('')

    const update = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / props.duration, 1)
      const currentResolved = Math.floor(progress * targetLength)

      // Rhythmic cycle of random terminal glyphs
      if (now - lastGlyphUpdate > glyphInterval) {
        for (let i = 0; i < targetLength; i++) {
          currentRandomPool[i] = props.chars[Math.floor(Math.random() * props.chars.length)]
        }
        lastGlyphUpdate = now
      }

      let result = ''
      for (let i = 0; i < targetLength; i++) {
        if (i < currentResolved) {
          result += target[i]
        } else if (target[i] === ' ' || target[i] === '/') {
          result += target[i]
        } else {
          result += currentRandomPool[i] || props.chars[Math.floor(Math.random() * props.chars.length)]
        }
      }

      displayText.value = result

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update)
      } else {
        displayText.value = target
        emit('complete')
      }
    }

    animationFrameId = requestAnimationFrame(update)
  }, props.delay)
}

watch(() => props.text, () => {
  scramble()
})

onMounted(() => {
  displayText.value = props.text

  if (typeof IntersectionObserver !== 'undefined' && elRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scramble()
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(elRef.value)
  } else {
    scramble()
  }
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (timeoutId) clearTimeout(timeoutId)
  if (observer) observer.disconnect()
})
</script>
