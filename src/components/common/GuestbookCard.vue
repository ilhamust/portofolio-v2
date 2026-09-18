<template>
  <div
    :class="[
      ratioClass,
      standalone ? 'w-[260px] sm:w-[280px] h-[160px] shrink-0' : 'w-full min-h-0',
      'bg-dark-surface light:bg-warm-100 border border-thin rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:border-dark-text/40 light:hover:border-warm-400 shadow-xs group select-none relative overflow-hidden'
    ]"
  >
    <!-- Card Header: Avatar Initial, Name, Pending Badge & Relative Date -->
    <div class="flex items-start justify-between gap-2.5 shrink-0">
      <div class="flex items-center gap-2 min-w-0">
        <!-- Initials Avatar with Deterministic Color Palette -->
        <div
          class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[0.6875rem] font-mono font-bold text-white shrink-0 shadow-xs"
          :style="{ backgroundColor: avatarColor }"
        >
          {{ initials }}
        </div>

        <div class="min-w-0">
          <div class="flex items-center gap-1.5">
            <h4 class="text-xs sm:text-sm font-sans font-bold text-dark-text light:text-warm-900 leading-tight truncate">
              {{ entry.name }}
            </h4>
            <!-- Offline Pending Sync Badge -->
            <span
              v-if="entry.isPendingSync"
              class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[0.5625rem] font-mono font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0"
              title="Pesan tersimpan di antrean offline, menunggu koneksi ke Supabase"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Offline
            </span>
          </div>
          <span class="text-[0.625rem] font-mono text-dark-muted light:text-warm-600 block mt-0.5">
            {{ formattedDate }}
          </span>
        </div>
      </div>

      <!-- Subtle Quote Icon -->
      <span class="text-dark-muted/30 light:text-warm-400 group-hover:text-accent-navy transition-colors shrink-0 text-base leading-none">
        ”
      </span>
    </div>

    <!-- Message Content Body: Full message displayed naturally without cutting off text -->
    <div class="my-auto py-1 overflow-y-auto max-h-full scrollbar-none">
      <p class="text-xs sm:text-[0.8125rem] text-dark-muted light:text-warm-700 font-light leading-relaxed whitespace-pre-line break-words">
        {{ entry.message }}
      </p>
    </div>

    <!-- Bottom Footer -->
    <div class="pt-1.5 border-t border-thin/40 flex items-center justify-between text-[0.625rem] font-mono text-dark-muted/60 light:text-warm-500 shrink-0">
      <span class="truncate max-w-[130px]">{{ entry.name }}</span>
      <span class="text-accent-navy/80">#guestbook</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  entry: {
    type: Object,
    required: true
  },
  ratioClass: {
    type: String,
    default: 'flex-1'
  },
  isCompact: {
    type: Boolean,
    default: false
  },
  standalone: {
    type: Boolean,
    default: false
  }
})

// Generate initials from name (e.g., "Fathur Rahman" -> "FR")
const initials = computed(() => {
  if (!props.entry.name) return '?'
  const parts = props.entry.name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})

// Deterministic color palette for avatars
const avatarColor = computed(() => {
  const palette = [
    '#3b82f6', // blue
    '#6366f1', // indigo
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#10b981', // emerald
    '#14b8a6', // teal
    '#f59e0b', // amber
    '#06b6d4'  // cyan
  ]
  let hash = 0
  const name = props.entry.name || 'User'
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % palette.length
  return palette[index]
})

// Format date into human-readable relative time or readable date
const formattedDate = computed(() => {
  const rawTimestamp = props.entry.created_at || props.entry.createdAt
  if (!rawTimestamp) return 'Recently'
  try {
    const created = new Date(rawTimestamp)
    const now = new Date()
    const diffMs = now - created
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Baru saja'
    if (diffMins < 60) return `${diffMins}m lalu`
    if (diffHours < 24) return `${diffHours}j lalu`
    if (diffDays < 7) return `${diffDays}h lalu`

    return created.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return 'Recently'
  }
})
</script>
