<template>
  <section id="projects" class="min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex items-center py-5 lg:py-7 border-t border-thin scroll-mt-20 relative select-none overflow-hidden">
    <BaseContainer size="wide" :padding="true" class="w-full">
      <div class="space-y-4 sm:space-y-5 lg:space-y-6">
        
        <!-- Header: Case Studies Tag + Headline (Left) x Controls & Pill Button (Right) -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div class="space-y-1">
            <span class="text-[0.6875rem] font-mono text-accent-navy font-semibold uppercase tracking-widest block">
              {{ t('projects.tag') }}
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-dark-text light:text-warm-900 tracking-tight leading-none">
              {{ t('projects.headline') }}
            </h2>
          </div>

          <!-- Right: Slider Controls + See Recent Work Pill Button -->
          <div class="flex items-center gap-3 self-start sm:self-auto">
            <!-- Prev / Next Pagination Controls (01 / 02) -->
            <div class="flex items-center gap-1.5 font-mono text-xs">
              <button
                type="button"
                @click="prevPage"
                :disabled="currentPage === 0"
                class="w-8 h-8 rounded-full border border-thin bg-dark-surface/50 light:bg-warm-100 flex items-center justify-center text-dark-text light:text-warm-900 hover:border-accent-navy hover:text-accent-navy disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer focus:outline-none"
                aria-label="Previous projects"
              >
                ←
              </button>
              <span class="px-1 text-[0.6875rem] font-semibold tracking-wider text-dark-muted light:text-warm-600">
                0{{ currentPage + 1 }} / 0{{ totalPages }}
              </span>
              <button
                type="button"
                @click="nextPage"
                :disabled="currentPage === totalPages - 1"
                class="w-8 h-8 rounded-full border border-thin bg-dark-surface/50 light:bg-warm-100 flex items-center justify-center text-dark-text light:text-warm-900 hover:border-accent-navy hover:text-accent-navy disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer focus:outline-none"
                aria-label="Next projects"
              >
                →
              </button>
            </div>

            <!-- "See recent work" Pill Button with circular icon -->
            <a
              href="https://github.com/ilhamust"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full border border-thin text-xs font-mono tracking-wide text-dark-text light:text-warm-900 hover:border-accent-navy hover:text-accent-navy transition-all duration-200 group bg-dark-surface/60 light:bg-warm-100/60 shrink-0"
            >
              <span>{{ t('projects.seeRecentWork') }}</span>
              <span class="w-5 h-5 rounded-full bg-dark-bg light:bg-warm-200 flex items-center justify-center text-[0.6875rem] text-dark-muted light:text-warm-700 group-hover:text-accent-navy group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                ↗
              </span>
            </a>
          </div>
        </div>

        <!-- 3-Column Showcase Grid: Satu Card Utuh (Single Card Design) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          <div
            v-for="project in visibleProjects"
            :key="project.id"
            class="bg-dark-surface light:bg-warm-100 border border-thin rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-accent-navy/40 transition-all duration-300 shadow-sm"
          >
            <!-- 1. Bagian Atas: Gambar Mockup Full-Bleed dengan Floating Badge -->
            <div class="relative w-full aspect-[16/10] overflow-hidden bg-[#0d0d0d]">
              <!-- Mockup Image -->
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <!-- Gradient Halus Atas agar Brand & Badge Selalu Terbaca Jelas -->
              <div class="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none"></div>

              <!-- Floating Brand Moniker & Status Badge -->
              <div class="absolute top-3 inset-x-3.5 flex items-center justify-between z-10">
                <span class="font-sans font-black text-xs sm:text-sm tracking-wider text-white uppercase drop-shadow-sm">
                  {{ project.brand }}
                </span>

                <span class="text-[0.625rem] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/60 text-white/90 border border-white/20 backdrop-blur-sm shadow-xs">
                  {{ project.statusBadge }}
                </span>
              </div>

              <!-- Bayangan Hitam Geser ke Atas (Slide-up Dark Shadow Berisi Deskripsi Lengkap) -->
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/95 to-black/30 p-3.5 transition-transform duration-500 ease-out flex flex-col justify-end translate-y-[calc(100%-1.85rem)] group-hover:translate-y-0 backdrop-blur-[2px]">
                <!-- Mini Bar Saat Tidak di-Hover -->
                <div class="flex items-center justify-between gap-2 pb-1 shrink-0">
                  <span class="text-[0.5625rem] font-mono uppercase tracking-widest text-accent-navy font-bold flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent-navy"></span>
                    OVERVIEW
                  </span>
                  <span class="text-[0.5625rem] font-mono text-white/40 group-hover:opacity-0 transition-opacity">
                    Hover to read ↑
                  </span>
                </div>

                <!-- Teks Deskripsi: Hanya Sedikit Saat Default, Lengkap Saat di-Hover -->
                <p class="text-[0.6875rem] text-white/90 font-light leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                  {{ project.narrative }}
                </p>
              </div>
            </div>

            <!-- 2. Bagian Bawah: Judul, Tech Stack & Tombol View Project (Satu Kesatuan Card) -->
            <div class="p-4 sm:p-5 flex flex-col justify-between grow space-y-3">
              <div class="space-y-2">
                <!-- Judul Dampak Proyek -->
                <h3 class="text-xs sm:text-sm lg:text-base font-sans font-bold text-dark-text light:text-warm-900 group-hover:text-accent-navy transition-colors line-clamp-2 leading-snug">
                  {{ project.impactTitle }}
                </h3>

                <!-- Tech Stack Project Pills -->
                <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span
                    v-for="tool in project.tools"
                    :key="tool"
                    class="text-[0.625rem] font-mono px-2 py-0.5 rounded-md bg-dark-bg light:bg-warm-50 text-dark-muted light:text-warm-700 border border-thin"
                  >
                    {{ tool }}
                  </span>
                </div>
              </div>

              <!-- Action Footer: View Project & Nomor Proyek -->
              <div class="pt-3 border-t border-thin flex items-center justify-between mt-auto">
                <a
                  v-if="project.demoUrl || project.githubUrl"
                  :href="project.demoUrl || project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent-navy hover:underline font-semibold group/btn"
                >
                  <span>{{ t('projects.viewProject') }}</span>
                  <span class="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">↗</span>
                </a>
                <span v-else class="text-[0.6875rem] font-mono text-dark-muted light:text-warm-600 uppercase">
                  {{ t('projects.internalSystem') }}
                </span>

                <!-- Nomor Urut Proyek -->
                <span class="text-[0.6875rem] font-mono font-bold text-dark-muted/50 light:text-warm-400">
                  {{ project.number }}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BaseContainer } from '@/components/base'
import { projectsData } from '@/data/projects.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// Pagination state: tampilkan 3 kartu per slide
const currentPage = ref(0)
const itemsPerPage = 3

const totalPages = computed(() => {
  return Math.ceil(projectsData.length / itemsPerPage)
})

const visibleProjects = computed(() => {
  const start = currentPage.value * itemsPerPage
  return projectsData.slice(start, start + itemsPerPage)
})

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++
  }
}
</script>
