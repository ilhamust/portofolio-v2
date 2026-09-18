<template>
  <section id="techstack" class="py-14 lg:py-20 border-t border-thin scroll-mt-20 relative select-none overflow-hidden">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-8 sm:space-y-12">
        
        <!-- Header & Headline Split Layout -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div class="space-y-2 max-w-xl">
            <span class="text-[0.6875rem] font-mono text-accent-navy font-semibold uppercase tracking-widest block">
              {{ t('techStack.sectionNum') }}
            </span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-dark-text light:text-warm-900 leading-tight">
              {{ t('techStack.headline') }}
            </h2>
          </div>

          <p class="text-xs sm:text-sm text-dark-muted light:text-warm-700 font-light leading-relaxed max-w-md">
            {{ t('techStack.description') }}
          </p>
        </div>

        <!-- Minimalist Line Grid Marquee Band (Hanya Garis-Garis Bersih & Minimalis seperti Contoh Laravel) -->
        <div class="border-y border-x border-thin flex flex-col md:flex-row items-stretch">
          
          <!-- Sisi Kiri: Fixed Monospace Text Cell (Dibatasi Garis Vertikal) -->
          <div class="w-full md:w-64 lg:w-72 shrink-0 py-6 px-6 lg:px-8 border-b md:border-b-0 md:border-r border-thin flex flex-col justify-center bg-dark-bg/95 light:bg-warm-50/95 z-20">
            <span class="text-[0.625rem] font-mono text-accent-navy font-bold uppercase tracking-widest block pb-1">
              {{ t('techStack.tag') }}
            </span>
            <p class="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-dark-text light:text-warm-900 leading-snug">
              {{ t('techStack.marqueeTitle1') }}<br class="hidden sm:inline" />
              {{ t('techStack.marqueeTitle2') }}
            </p>
          </div>

          <!-- Sisi Kanan: Moving Logo Cells dengan Pembatas Garis Vertikal Antar Logo -->
          <div class="relative grow overflow-hidden flex items-center min-h-[80px] sm:min-h-[96px] bg-transparent">
            <!-- Edge Fade Masks (Gradasi Halus Kiri & Kanan) -->
            <div class="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-dark-bg light:from-warm-50 to-transparent pointer-events-none z-10"></div>
            <div class="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-dark-bg light:from-warm-50 to-transparent pointer-events-none z-10"></div>

            <!-- Moving Logo Track -->
            <div class="flex animate-marquee hover:[animation-play-state:paused] h-full items-stretch">
              <div
                v-for="(tech, idx) in duplicatedTechStack"
                :key="`${tech.name}-${idx}`"
                class="flex items-center gap-3.5 px-8 sm:px-12 py-5 sm:py-6 border-r border-thin shrink-0 group/item hover:bg-white/[0.03] light:hover:bg-black/[0.02] transition-colors duration-200 cursor-default select-none"
              >
                <!-- Brand Vector SVG Icon -->
                <div class="text-dark-text light:text-warm-900 group-hover/item:scale-110 transition-transform duration-300">
                  <TechBrandIcon :name="tech.icon" />
                </div>

                <!-- Brand Name Monospace Minimalis -->
                <span class="text-xs sm:text-sm font-mono font-medium tracking-wide text-dark-text light:text-warm-900 whitespace-nowrap">
                  {{ tech.name }}
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
import { computed } from 'vue'
import { BaseContainer } from '@/components/base'
import TechBrandIcon from '@/components/common/TechBrandIcon.vue'
import { cvData } from '@/data/cv.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// Duplikasi tech stack 3 kali untuk animasi loop mulus tanpa celah
const duplicatedTechStack = computed(() => {
  return [...cvData.techStack, ...cvData.techStack, ...cvData.techStack]
})
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-33.333333%);
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 35s linear infinite;
  will-change: transform;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
