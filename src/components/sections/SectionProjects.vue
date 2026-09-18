<template>
  <section id="projects" class="min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex items-center py-5 lg:py-7 border-t border-thin scroll-mt-20 relative select-none overflow-hidden">
    <BaseContainer size="wide" :padding="true" class="w-full">
      <div class="space-y-4 sm:space-y-5 lg:space-y-6">
        
        <!-- Header: Case Studies Tag + Headline (Left) x "See recent work" Pill Button (Right) -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div class="space-y-1">
            <span class="text-[0.6875rem] font-mono text-accent-navy font-semibold uppercase tracking-widest block">
              {{ t('projects.tag') }}
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-dark-text light:text-warm-900 tracking-tight leading-none">
              {{ t('projects.headline') }}
            </h2>
          </div>

          <!-- Right: "See recent work" Pill Button -->
          <a
            href="https://github.com/ilhamust"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full border border-thin text-xs font-mono tracking-wide text-dark-text light:text-warm-900 hover:border-dark-text/40 light:hover:border-warm-400 hover:text-dark-text light:hover:text-warm-900 transition-all duration-200 group bg-dark-surface/60 light:bg-warm-100/60 shrink-0 self-start sm:self-auto"
          >
            <span>{{ t('projects.seeRecentWork') }}</span>
            <span class="w-5 h-5 rounded-full bg-dark-bg light:bg-warm-200 flex items-center justify-center text-[0.6875rem] text-dark-muted light:text-warm-700 group-hover:text-dark-text light:group-hover:text-warm-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              ↗
            </span>
          </a>
        </div>

        <!-- Horizontal Scrollable Showcase Track (Scroll to Shift Projects) -->
        <div
          ref="scrollContainer"
          @scroll="onScroll"
          class="flex gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none py-1 select-none"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <div
            v-for="project in projectsData"
            :key="project.id"
            tabindex="0"
            class="w-[85vw] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] shrink-0 snap-start bg-dark-surface light:bg-warm-100 border border-thin rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-dark-text/30 light:hover:border-warm-400 transition-colors duration-300 shadow-sm focus:outline-none focus-within:border-accent-navy/60 relative"
          >
            <!-- 1. Bagian Atas: Gambar Mockup Full-Bleed + Frosted Curtain saat di-Hover -->
            <div class="relative w-full aspect-[16/10] overflow-hidden bg-[#0d0d0d] shrink-0">
              <!-- Mockup Image dengan Zoom Halus saat Hover -->
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover object-top group-hover:scale-105 group-focus-within:scale-105 transition-transform duration-500 ease-out"
              />

              <!-- Gradient Halus Atas agar Brand & Badge Selalu Terbaca Jelas -->
              <div class="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none"></div>

              <!-- Floating Status Badge (Top Right) -->
              <div class="absolute top-3 right-3.5 z-10 pointer-events-none">
                <span class="text-[0.625rem] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/60 text-white/90 border border-white/20 backdrop-blur-sm shadow-xs">
                  {{ project.statusBadge }}
                </span>
              </div>

              <!-- Opsi 1: Glassmorphism Frosted Curtain (Menutupi seluruh area mockup dengan kaca buram berkelas) -->
              <div
                class="absolute inset-0 z-20 bg-dark-bg/85 light:bg-warm-100/90 backdrop-blur-md p-4 sm:p-5 flex flex-col justify-start gap-2.5 sm:gap-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all duration-300 ease-out"
              >
                <!-- Top Bar in Curtain: Header -->
                <div class="flex items-center justify-between shrink-0 translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300">
                  <span class="text-[0.625rem] font-mono uppercase tracking-widest text-accent-navy font-bold flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent-navy animate-pulse"></span>
                    CASE STUDY OVERVIEW
                  </span>
                </div>

                <!-- Narrative Text: Elegan & Jelas -->
                <p class="text-xs sm:text-[0.8125rem] text-dark-text light:text-warm-900 font-light leading-relaxed translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300">
                  {{ project.narrative }}
                </p>
              </div>
            </div>

            <!-- 2. Bagian Bawah: Bodi Kartu Stabil (Judul Konsisten Sesuai CV_ILHAM.md) -->
            <div class="p-4 sm:p-5 flex flex-col justify-between grow space-y-3">
              <div class="space-y-2">
                <!-- Judul Proyek: Sesuai CV_ILHAM.md -->
                <h3 class="text-xs sm:text-sm lg:text-base font-sans font-bold text-dark-text light:text-warm-900 line-clamp-1 leading-snug">
                  {{ project.title }}
                </h3>

                <!-- Tech Stack Project Pills -->
                <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <TechBadge
                    v-for="tool in project.tools"
                    :key="tool"
                    :tool="tool"
                  />
                </div>
              </div>

              <!-- Action Footer: Repository (GitHub) / Live Demo & Nomor Proyek -->
              <div class="pt-3 border-t border-thin flex items-center justify-between mt-auto">
                <!-- Case 1: Both GitHub Repo AND Live Demo -->
                <template v-if="project.githubUrl && project.demoUrl">
                  <a
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-dark-text hover:text-accent-navy light:text-warm-900 light:hover:text-accent-navy transition-colors font-semibold group/repo"
                  >
                    <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>{{ t('projects.repository') }}</span>
                  </a>

                  <a
                    :href="project.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent-navy hover:underline font-semibold group/demo"
                  >
                    <span>{{ t('projects.liveDemo') }}</span>
                    <span class="group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                </template>

                <!-- Case 2: Only GitHub Repo -->
                <template v-else-if="project.githubUrl">
                  <a
                    :href="project.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-dark-text hover:text-accent-navy light:text-warm-900 light:hover:text-accent-navy transition-colors font-semibold group/repo"
                  >
                    <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>{{ t('projects.repository') }}</span>
                    <span class="group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5 transition-transform text-[0.6875rem]">↗</span>
                  </a>
                  <span class="text-[0.6875rem] font-mono font-bold text-dark-muted/50 light:text-warm-400">
                    {{ project.number }}
                  </span>
                </template>

                <!-- Case 3: Only Live Demo -->
                <template v-else-if="project.demoUrl">
                  <a
                    :href="project.demoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent-navy hover:underline font-semibold group/demo"
                  >
                    <span>{{ t('projects.liveDemo') }}</span>
                    <span class="group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform">↗</span>
                  </a>
                  <span class="text-[0.6875rem] font-mono font-bold text-dark-muted/50 light:text-warm-400">
                    {{ project.number }}
                  </span>
                </template>

                <!-- Case 4: Neither (Internal System) -->
                <template v-else>
                  <span class="text-[0.6875rem] font-mono text-dark-muted light:text-warm-600 uppercase">
                    {{ t('projects.internalSystem') }}
                  </span>
                  <span class="text-[0.6875rem] font-mono font-bold text-dark-muted/50 light:text-warm-400">
                    {{ project.number }}
                  </span>
                </template>
              </div>
            </div>

          </div>
        </div>

        <!-- Bottom Navigation Bar: Reactive Indicators + Prev/Next Scroll Controls -->
        <div class="flex items-center justify-between pt-1 sm:pt-2">
          <!-- Left: Current Card Index & Interactive Segmented Indicators -->
          <div class="flex items-center gap-2.5">
            <span class="text-[0.6875rem] font-mono tracking-wider text-dark-muted light:text-warm-600 font-medium">
              {{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(projectsData.length).padStart(2, '0') }}
            </span>
            <div class="flex items-center gap-1.5">
              <button
                v-for="(_, index) in projectsData"
                :key="index"
                type="button"
                @click="scrollToIndex(index)"
                :class="[
                  'h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none',
                  activeIndex === index
                    ? 'w-6 bg-accent-navy'
                    : 'w-1.5 bg-dark-muted/30 light:bg-warm-400/40 hover:bg-dark-muted/60'
                ]"
                :aria-label="`Go to project ${index + 1}`"
              />
            </div>
          </div>

          <!-- Right: Prev / Next Scroll Buttons -->
          <div class="flex items-center gap-2 font-mono text-xs">
            <button
              type="button"
              @click="scrollPrev"
              :disabled="!canScrollLeft"
              class="px-3 py-1.5 rounded-full border border-thin bg-dark-surface/60 light:bg-warm-100/80 flex items-center gap-1.5 text-dark-text light:text-warm-900 hover:border-dark-text/40 light:hover:border-warm-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer focus:outline-none text-[0.6875rem] uppercase tracking-wider"
              aria-label="Previous projects"
            >
              <span>←</span>
              <span class="hidden sm:inline">{{ t('projects.prev') }}</span>
            </button>
            <button
              type="button"
              @click="scrollNext"
              :disabled="!canScrollRight"
              class="px-3 py-1.5 rounded-full border border-thin bg-dark-surface/60 light:bg-warm-100/80 flex items-center gap-1.5 text-dark-text light:text-warm-900 hover:border-dark-text/40 light:hover:border-warm-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer focus:outline-none text-[0.6875rem] uppercase tracking-wider"
              aria-label="Next projects"
            >
              <span class="hidden sm:inline">{{ t('projects.next') }}</span>
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { BaseContainer } from '@/components/base'
import TechBadge from '@/components/common/TechBadge.vue'
import { projectsData } from '@/data/projects.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const scrollContainer = ref(null)
const activeIndex = ref(0)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

let isThrottled = false

// Hitung jarak geser per kartu secara presisi termasuk gap
const getCardStep = () => {
  const el = scrollContainer.value
  if (!el || !el.firstElementChild) return 350
  const card = el.firstElementChild
  const style = window.getComputedStyle(el)
  const gap = parseFloat(style.columnGap || style.gap || '20') || 20
  return card.offsetWidth + gap
}

// Hitung kartu aktif & batas scroll saat digeser
const onScroll = () => {
  const el = scrollContainer.value
  if (!el) return

  const maxScroll = el.scrollWidth - el.clientWidth
  if (maxScroll <= 0) {
    activeIndex.value = 0
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }

  canScrollLeft.value = el.scrollLeft > 8
  canScrollRight.value = el.scrollLeft < maxScroll - 8

  // Deteksi batas ujung secara akurat agar pil biru selalu sampai ke ujung
  if (el.scrollLeft <= 8) {
    activeIndex.value = 0
  } else if (el.scrollLeft >= maxScroll - 8) {
    activeIndex.value = projectsData.length - 1
  } else {
    const progress = el.scrollLeft / maxScroll
    activeIndex.value = Math.min(
      projectsData.length - 1,
      Math.max(0, Math.round(progress * (projectsData.length - 1)))
    )
  }
}

// Navigasi tombol kiri/kanan
const scrollPrev = () => {
  const el = scrollContainer.value
  if (!el) return
  const step = getCardStep()
  el.scrollBy({ left: -step, behavior: 'smooth' })
}

const scrollNext = () => {
  const el = scrollContainer.value
  if (!el) return
  const step = getCardStep()
  el.scrollBy({ left: step, behavior: 'smooth' })
}

// Klik langsung pada pill indikator
const scrollToIndex = (index) => {
  const el = scrollContainer.value
  if (!el) return
  const maxScroll = el.scrollWidth - el.clientWidth
  if (maxScroll <= 0) return

  // Hitung target scroll proporsional sesuai index dot
  const target = (index / (projectsData.length - 1)) * maxScroll
  el.scrollTo({ left: target, behavior: 'smooth' })
}

// Fitur Wheel Scroll yang menggeser kartu per kartu secara mulus dan teratur
const onWheelScroll = (e) => {
  const el = scrollContainer.value
  if (!el) return

  // Jika user melakukan gesture trackpad horizontal, biarkan native
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

  const maxScroll = el.scrollWidth - el.clientWidth
  if (maxScroll <= 0) return

  const tolerance = 8
  const canScrollRight = el.scrollLeft < maxScroll - tolerance
  const canScrollLeft = el.scrollLeft > tolerance

  const isMovingForward = e.deltaY > 0
  const isMovingBackward = e.deltaY < 0

  // Intersep wheel hanya ketika kartu masih bisa digeser ke arah tersebut
  if ((isMovingForward && canScrollRight) || (isMovingBackward && canScrollLeft)) {
    e.preventDefault()

    if (!isThrottled) {
      isThrottled = true
      const step = getCardStep()
      const direction = isMovingForward ? 1 : -1

      el.scrollBy({
        left: direction * step,
        behavior: 'smooth'
      })

      // Berikan jeda waktu agar pergeseran kartu terlihat jelas dan tenang
      setTimeout(() => {
        isThrottled = false
      }, 420)
    }
  }
  // Jika sudah mentok di ujung, biarkan scroll vertikal halaman berlanjut secara normal
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('wheel', onWheelScroll, { passive: false })
    onScroll()
  }
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('wheel', onWheelScroll)
  }
})
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
