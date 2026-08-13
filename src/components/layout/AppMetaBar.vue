<template>
  <div class="w-full bg-warm-50/90 dark:bg-dark-bg/90 backdrop-blur-xs border-b border-thin transition-colors duration-300 select-none">
    <BaseContainer size="wide" :padding="true">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-2 py-2 text-xs font-mono">
        <!-- Left Side: Location & Live Time (Terinspirasi Referensi 3 - Amelie Luttier) -->
        <div class="flex items-center gap-4 text-warm-600 dark:text-dark-muted">
          <div class="flex items-center gap-1.5">
            <MapPin class="w-3.5 h-3.5 text-warm-400 dark:text-dark-muted shrink-0" />
            <span>KLATEN / YOGYA, ID</span>
          </div>

          <span class="hidden md:inline-block text-warm-300 dark:text-dark-border">•</span>

          <div class="flex items-center gap-1.5">
            <Clock class="w-3.5 h-3.5 text-warm-400 dark:text-dark-muted shrink-0" />
            <span>{{ currentTime }} WIB (UTC+7)</span>
          </div>
        </div>

        <!-- Right Side: Capsule Status & Theme Toggle (Terinspirasi Referensi 4 - Steven/Zed) -->
        <div class="flex items-center gap-3">
          <BaseBadge
            variant="neutral"
            size="sm"
            :dot="true"
            dotColor="emerald"
            :pill="true"
          >
            AVAILABLE FOR SELECT PROJECTS
          </BaseBadge>

          <!-- Theme Switcher -->
          <button
            @click="toggleTheme"
            class="p-1 rounded hover:bg-warm-200/50 dark:hover:bg-dark-surface/80 text-warm-700 dark:text-dark-muted transition-colors duration-200 focus:outline-none"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            aria-label="Toggle Theme"
          >
            <Sun v-if="isDark" class="w-3.5 h-3.5 text-amber-400" />
            <Moon v-else class="w-3.5 h-3.5 text-warm-700" />
          </button>
        </div>
      </div>
    </BaseContainer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { BaseContainer, BaseBadge } from '@/components/base'
import { useTheme } from '@/composables/useTheme'
import { MapPin, Clock, Sun, Moon } from 'lucide-vue-next'

const { isDark, toggleTheme } = useTheme()
const currentTime = ref('')
let timer = null

/**
   * Meng-update tampilan jam lokal WIB (UTC+7)
   */
const updateClock = () => {
  const now = new Date()
  // Format jam 24-jam dalam zona waktu Asia/Jakarta (WIB)
  const formatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  currentTime.value = formatter.format(now).replace(/\./g, ':')
}

onMounted(() => {
  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
