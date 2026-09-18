<template>
  <section id="now" class="py-16 lg:py-24 border-t border-thin scroll-mt-20 relative select-none">
    <div id="guestbook" class="absolute -top-20"></div>
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-10 sm:space-y-12">
        
        <!-- Header: Section Num, Tag & Editorial Headline (Left) x Counter Pill (Right) -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="space-y-2 max-w-2xl">
            <!-- Small Pretitle Tag with Dash -->
            <div class="flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
              <span class="text-accent-navy font-semibold">{{ t('now.sectionNum') }}</span>
              <span class="text-dark-muted/40 light:text-warm-400">—</span>
              <span class="text-dark-muted light:text-warm-600">{{ t('now.tag') }}</span>
            </div>

            <!-- Headline -->
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-dark-text light:text-warm-900 tracking-tight leading-tight">
              {{ t('now.headline') }}
            </h2>

            <!-- Subtitle Description -->
            <p class="text-xs sm:text-sm text-dark-muted light:text-warm-700 font-light leading-relaxed pt-1">
              {{ t('now.description') }}
            </p>
          </div>

          <!-- Right: Total Message Counter Pill -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-thin bg-dark-surface/60 light:bg-warm-100/60 text-xs font-mono text-dark-muted light:text-warm-700 shrink-0 self-start sm:self-auto">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{{ messages.length }} {{ t('now.countLabel') }}</span>
          </div>
        </div>

        <!-- 1. Interactive Form Container (Minimalist, Elevated, Responsive) -->
        <div class="bg-dark-surface/60 light:bg-warm-100 border border-thin rounded-2xl p-5 sm:p-7 shadow-xs">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Two Columns for Name & Email -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Name Input -->
              <div class="space-y-1.5">
                <label for="gb-name" class="block text-xs font-mono uppercase tracking-wider text-dark-text/90 light:text-warm-800 font-medium">
                  {{ t('now.form.nameLabel') }} <span class="text-accent-navy">*</span>
                </label>
                <input
                  id="gb-name"
                  v-model="form.name"
                  type="text"
                  required
                  maxlength="60"
                  :placeholder="t('now.form.namePlaceholder')"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg/80 light:bg-warm-50 border border-thin text-xs sm:text-sm text-dark-text light:text-warm-900 placeholder:text-dark-muted/50 light:placeholder:text-warm-400 focus:outline-none focus:border-accent-navy/80 focus:ring-1 focus:ring-accent-navy/40 transition-colors"
                />
              </div>

              <!-- Email Input (Optional & Kept Private) -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <label for="gb-email" class="block text-xs font-mono uppercase tracking-wider text-dark-text/90 light:text-warm-800 font-medium">
                    {{ t('now.form.emailLabel') }}
                  </label>
                  <span class="text-[0.625rem] font-mono text-dark-muted/60 light:text-warm-500">
                    // optional
                  </span>
                </div>
                <input
                  id="gb-email"
                  v-model="form.email"
                  type="email"
                  maxlength="80"
                  :placeholder="t('now.form.emailPlaceholder')"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg/80 light:bg-warm-50 border border-thin text-xs sm:text-sm text-dark-text light:text-warm-900 placeholder:text-dark-muted/50 light:placeholder:text-warm-400 focus:outline-none focus:border-accent-navy/80 focus:ring-1 focus:ring-accent-navy/40 transition-colors"
                />
              </div>
            </div>

            <!-- Message Textarea -->
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label for="gb-message" class="block text-xs font-mono uppercase tracking-wider text-dark-text/90 light:text-warm-800 font-medium">
                  {{ t('now.form.messageLabel') }} <span class="text-accent-navy">*</span>
                </label>
                <span class="text-[0.625rem] font-mono text-dark-muted/60 light:text-warm-500">
                  {{ form.message.length }} / 400
                </span>
              </div>
              <textarea
                id="gb-message"
                v-model="form.message"
                rows="3"
                required
                maxlength="400"
                :placeholder="t('now.form.messagePlaceholder')"
                class="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg/80 light:bg-warm-50 border border-thin text-xs sm:text-sm text-dark-text light:text-warm-900 placeholder:text-dark-muted/50 light:placeholder:text-warm-400 focus:outline-none focus:border-accent-navy/80 focus:ring-1 focus:ring-accent-navy/40 transition-colors resize-y leading-relaxed"
              ></textarea>
            </div>

            <!-- Action Bar: Helper Privacy Note (Left) x Submit Button (Right) -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <span class="text-[0.6875rem] font-mono text-dark-muted/70 light:text-warm-600">
                {{ t('now.form.emailHelp') }}
              </span>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent-navy hover:bg-accent-navy-hover text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs group"
              >
                <span>{{ isSubmitting ? t('now.form.sending') : t('now.form.submitButton') }}</span>
                <Send class="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            <!-- Status Alert Feedback -->
            <div
              v-if="statusMessage"
              class="p-3 rounded-xl text-xs font-mono border transition-all duration-300 flex items-center gap-2"
              :class="[
                statusType === 'success'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              ]"
            >
              <span>{{ statusMessage }}</span>
            </div>
          </form>
        </div>

        <!-- 2. Horizontal Bento-Packing Showcase (Adaptive Sizing & Clean Borderless Frame) -->
        <div class="space-y-4">
          
          <!-- Loading Skeleton -->
          <div v-if="isLoading && messages.length === 0" class="flex gap-4 overflow-hidden py-2">
            <div
              v-for="i in 3"
              :key="i"
              class="w-[280px] h-48 shrink-0 rounded-2xl border border-thin bg-dark-surface/40 light:bg-warm-100/50 animate-pulse p-4 flex flex-col justify-between"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-dark-border light:bg-warm-200"></div>
                <div class="space-y-1.5 flex-1">
                  <div class="w-24 h-3 rounded bg-dark-border light:bg-warm-200"></div>
                  <div class="w-16 h-2 rounded bg-dark-border/60 light:bg-warm-200/60"></div>
                </div>
              </div>
              <div class="space-y-1.5">
                <div class="w-full h-2 rounded bg-dark-border/60 light:bg-warm-200/60"></div>
                <div class="w-3/4 h-2 rounded bg-dark-border/40 light:bg-warm-200/40"></div>
              </div>
            </div>
          </div>

          <!-- Empty State (if no messages yet) -->
          <div
            v-else-if="!isLoading && messages.length === 0"
            class="p-8 sm:p-12 text-center rounded-2xl border border-dashed border-dark-border light:border-warm-300 bg-dark-surface/30 light:bg-warm-100/40"
          >
            <MessageSquareDashed class="w-8 h-8 mx-auto text-dark-muted/60 light:text-warm-500 mb-3" />
            <p class="text-sm font-sans font-medium text-dark-text light:text-warm-800">
              Belum ada pesan yang ditinggalkan
            </p>
            <p class="text-xs font-mono text-dark-muted light:text-warm-600 mt-1">
              Jadilah orang pertama yang menuliskan pesan di buku tamu ini!
            </p>
          </div>

          <!-- Outer Showcase Container: Clean horizontal track without outer border -->
          <div
            v-else
            class="overflow-hidden relative py-2 [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]"
          >
            <!-- A. Mobile View (< sm): 1 Row of cards running smoothly -->
            <div class="block sm:hidden">
              <div class="flex items-stretch gap-3 animate-marquee-left marquee-pause-hover py-1">
                <GuestbookCard
                  v-for="(entry, idx) in mobileLoop"
                  :key="`m-${entry.id}-${idx}`"
                  :entry="entry"
                  :standalone="true"
                />
              </div>
            </div>

            <!-- B. Tablet & Desktop View (>= sm): Horizontal Column Bento-Packing based on message length -->
            <div class="hidden sm:block h-[380px] lg:h-[420px]">
              <div class="flex items-stretch gap-3.5 sm:gap-4 h-full animate-marquee-left marquee-pause-hover">
                <!-- Each Column Stacks Vertically into 100% Height (Zero Gaps) -->
                <div
                  v-for="(col, colIdx) in loopingColumns"
                  :key="`col-${colIdx}`"
                  :class="[
                    col.widthClass,
                    'h-full shrink-0 flex flex-col gap-3 sm:gap-3.5 justify-between'
                  ]"
                >
                  <GuestbookCard
                    v-for="(item, cardIdx) in col.items"
                    :key="`col-${colIdx}-c-${cardIdx}`"
                    :entry="item.entry"
                    :ratio-class="item.ratioClass"
                    :is-compact="col.items.length >= 3"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { BaseContainer } from '@/components/base'
import GuestbookCard from '@/components/common/GuestbookCard.vue'
import {
  fetchGuestbookMessages,
  saveGuestbookMessage,
  syncPendingMessages,
  getCachedGuestbookMessages
} from '@/data/guestbook.data.js'
import { Send, MessageSquareDashed } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// Reactive list of guestbook messages
const messages = ref([])
const isLoading = ref(true)

// Form state
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const statusMessage = ref('')
const statusType = ref('success')

// Mobile loop
const mobileLoop = computed(() => {
  if (messages.value.length === 0) return []
  let result = [...messages.value]
  while (result.length < 6) {
    result = [...result, ...messages.value]
  }
  return [...result, ...result]
})

// --------------------------------------------------------------------------
// SMART CONTENT-AWARE BENTO COLUMN PACKER
// Dynamically sizes cards:
// - Long messages (> 150 chars) -> Big card in wide column (flex-[2])
// - Short messages (< 70 chars) -> Small compact card (flex-1)
// - Medium messages (70-150 chars) -> Standard card (flex-1 or flex-[1.4])
// - Zero gaps: All cards in a column sum to 100% column height
// --------------------------------------------------------------------------
const columns = computed(() => {
  const list = messages.value
  if (!list || list.length === 0) return []

  const cols = []
  let i = 0

  while (i < list.length) {
    const current = list[i]
    const len = current.message ? current.message.trim().length : 0

    if (len > 150) {
      // Long message -> Big card in a wide column
      const next = list[i + 1]
      if (next) {
        cols.push({
          id: `col-${cols.length}`,
          widthClass: 'w-[360px] sm:w-[440px]',
          items: [
            { entry: current, ratioClass: 'flex-[2]' }, // Big card on top
            { entry: next, ratioClass: 'flex-1' }       // Compact card below
          ]
        })
        i += 2
      } else {
        cols.push({
          id: `col-${cols.length}`,
          widthClass: 'w-[360px] sm:w-[420px]',
          items: [{ entry: current, ratioClass: 'flex-1' }]
        })
        i += 1
      }
    } else if (len < 70) {
      // Short message -> try to group into 3 small cards if available
      const next1 = list[i + 1]
      const next2 = list[i + 2]
      const next1Len = next1?.message ? next1.message.trim().length : 999
      const next2Len = next2?.message ? next2.message.trim().length : 999

      if (next1 && next2 && next1Len < 130 && next2Len < 130) {
        // 3 small compact cards stacked
        cols.push({
          id: `col-${cols.length}`,
          widthClass: 'w-[240px] sm:w-[270px]',
          items: [
            { entry: current, ratioClass: 'flex-1' },
            { entry: next1, ratioClass: 'flex-1' },
            { entry: next2, ratioClass: 'flex-1' }
          ]
        })
        i += 3
      } else if (next1) {
        const isNextLong = next1Len > 130
        cols.push({
          id: `col-${cols.length}`,
          widthClass: isNextLong ? 'w-[340px] sm:w-[400px]' : 'w-[270px] sm:w-[310px]',
          items: [
            { entry: current, ratioClass: 'flex-1' },
            { entry: next1, ratioClass: isNextLong ? 'flex-[1.8]' : 'flex-1' }
          ]
        })
        i += 2
      } else {
        cols.push({
          id: `col-${cols.length}`,
          widthClass: 'w-[260px] sm:w-[290px]',
          items: [{ entry: current, ratioClass: 'flex-1' }]
        })
        i += 1
      }
    } else {
      // Medium message (70 - 150 chars)
      const next = list[i + 1]
      if (next) {
        const nextLen = next.message ? next.message.trim().length : 0
        const isNextShort = nextLen < 70
        cols.push({
          id: `col-${cols.length}`,
          widthClass: 'w-[290px] sm:w-[330px]',
          items: [
            { entry: current, ratioClass: isNextShort ? 'flex-[1.4]' : 'flex-1' },
            { entry: next, ratioClass: 'flex-1' }
          ]
        })
        i += 2
      } else {
        cols.push({
          id: `col-${cols.length}`,
          widthClass: 'w-[290px] sm:w-[320px]',
          items: [{ entry: current, ratioClass: 'flex-1' }]
        })
        i += 1
      }
    }
  }

  return cols
})

// Continuous smooth looping of columns for horizontal marquee
const loopingColumns = computed(() => {
  if (columns.value.length === 0) return []
  let result = [...columns.value]
  while (result.length < 6) {
    result = [...result, ...columns.value]
  }
  return [...result, ...result]
})

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Background queue sync handler
const handleOnlineSync = async () => {
  try {
    const res = await syncPendingMessages()
    if (res.synced > 0) {
      if (res.messages) {
        messages.value = res.messages
      }
      statusType.value = 'success'
      statusMessage.value = `${res.synced} pesan di antrean offline berhasil disinkronkan ke Supabase!`
      setTimeout(() => {
        statusMessage.value = ''
      }, 5000)
    }
  } catch (err) {
    console.warn('[Sync Error]:', err)
  }
}

const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    handleOnlineSync()
  }
}

onMounted(async () => {
  // 1. Instant load from local cache
  messages.value = getCachedGuestbookMessages()

  // 2. Fetch fresh from Supabase
  try {
    const fresh = await fetchGuestbookMessages()
    messages.value = fresh
    await handleOnlineSync()
  } catch (err) {
    console.warn('[SectionGuestbook] Failed to load messages:', err)
  } finally {
    isLoading.value = false
  }

  // 3. Listen to online and visibility changes
  window.addEventListener('online', handleOnlineSync)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  window.removeEventListener('online', handleOnlineSync)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

const handleSubmit = async () => {
  const name = form.name.trim()
  const email = form.email.trim()
  const message = form.message.trim()

  if (!name || !message) {
    statusType.value = 'error'
    statusMessage.value = t('now.form.errorMessage')
    return
  }

  if (email && !isValidEmail(email)) {
    statusType.value = 'error'
    statusMessage.value = t('now.form.invalidEmailMessage') || t('now.form.errorMessage')
    return
  }

  isSubmitting.value = true

  try {
    const result = await saveGuestbookMessage({
      name,
      email,
      message
    })

    if (result.messages) {
      messages.value = result.messages
    }

    // Reset form
    form.name = ''
    form.email = ''
    form.message = ''

    statusType.value = 'success'
    if (result.queued) {
      statusMessage.value = 'Koneksi offline. Pesan Anda tersimpan di antrean lokal dan akan otomatis terkirim saat terhubung.'
    } else {
      statusMessage.value = t('now.form.successMessage')
    }

    // Hide message after 6 seconds
    setTimeout(() => {
      statusMessage.value = ''
    }, 6000)
  } catch (err) {
    statusType.value = 'error'
    statusMessage.value = 'Terjadi kendala saat mengirim pesan. Coba beberapa saat lagi.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
