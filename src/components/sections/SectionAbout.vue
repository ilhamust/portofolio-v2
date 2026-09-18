<template>
  <section id="about" class="min-h-[calc(100vh-80px)] flex items-center py-8 lg:py-12 border-t border-thin scroll-mt-20 relative select-none">
    <BaseContainer size="wide" :padding="true" class="w-full">
      <div class="space-y-6 md:space-y-8 lg:space-y-10">
        
        <!-- Section Header Monospace Tag with Cyber-Terminal Decoder -->
        <div class="flex items-center justify-between">
          <TextScramble
            :text="t('about.sectionNum')"
            :duration="550"
            class="text-xs font-mono text-accent-navy font-semibold uppercase tracking-widest"
          />
        </div>

        <!-- Split Layout: Headline Serif (Left) x Paragraf Description (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.16, 1, 0.3, 1], delay: 40 } }"
            class="lg:col-span-6 space-y-3"
          >
            <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-dark-text light:text-warm-900 leading-snug">
              {{ t('about.headline') }}
            </h2>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.16, 1, 0.3, 1], delay: 100 } }"
            class="lg:col-span-6 space-y-4"
          >
            <!-- Paragraph 1 (Always Visible Intro) -->
            <p class="text-xs sm:text-sm md:text-base text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('about.paragraph1') }}
            </p>

            <!-- Paragraph 2 (Smooth Expandable Bio) -->
            <div
              class="grid transition-all duration-500 ease-in-out overflow-hidden"
              :class="isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
              <div class="min-h-0">
                <p class="text-xs sm:text-sm md:text-base text-dark-muted light:text-warm-700 font-light leading-relaxed pt-1">
                  {{ t('about.paragraph2') }}
                </p>
              </div>
            </div>

            <!-- Expand / Collapse Toggle Button -->
            <div class="pt-1">
              <button
                @click="toggleExpand"
                class="inline-flex items-center gap-2 text-xs font-mono text-accent-navy hover:underline cursor-pointer uppercase tracking-wider font-semibold focus:outline-none"
                :aria-expanded="isExpanded"
              >
                <span>{{ isExpanded ? t('about.readLess') : t('about.moreAboutMe') }}</span>
                <span class="transition-transform duration-300" :class="{ 'rotate-180': isExpanded }">↓</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 4 Value Cards Grid with Tactile Spring Pop (Re-triggers on scroll with :visible) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 pt-2">
          <!-- Value Card 1: Process -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30, scale: 0.94 }"
            :visible="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 140, damping: 16, delay: 140 } }"
            class="glass-editorial-card p-4 sm:p-5 rounded-lg space-y-2.5 hover:border-dark-text/30 light:hover:border-warm-400 transition-all duration-300 group shadow-xs"
          >
            <div class="w-8 h-8 flex items-center justify-center text-accent-navy group-hover:scale-110 transition-transform">
              <Code class="w-5 h-5" />
            </div>
            <h3 class="text-sm sm:text-base font-sans font-semibold text-dark-text light:text-warm-900">
              {{ t('about.values.process.title') }}
            </h3>
            <p class="text-xs text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('about.values.process.description') }}
            </p>
          </div>

          <!-- Value Card 2: Collaborative -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30, scale: 0.94 }"
            :visible="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 140, damping: 16, delay: 200 } }"
            class="glass-editorial-card p-4 sm:p-5 rounded-lg space-y-2.5 hover:border-dark-text/30 light:hover:border-warm-400 transition-all duration-300 group shadow-xs"
          >
            <div class="w-8 h-8 flex items-center justify-center text-accent-navy group-hover:scale-110 transition-transform">
              <Users class="w-5 h-5" />
            </div>
            <h3 class="text-sm sm:text-base font-sans font-semibold text-dark-text light:text-warm-900">
              {{ t('about.values.collaborative.title') }}
            </h3>
            <p class="text-xs text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('about.values.collaborative.description') }}
            </p>
          </div>

          <!-- Value Card 3: Structured -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30, scale: 0.94 }"
            :visible="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 140, damping: 16, delay: 260 } }"
            class="glass-editorial-card p-4 sm:p-5 rounded-lg space-y-2.5 hover:border-dark-text/30 light:hover:border-warm-400 transition-all duration-300 group shadow-xs"
          >
            <div class="w-8 h-8 flex items-center justify-center text-accent-navy group-hover:scale-110 transition-transform">
              <Layers class="w-5 h-5" />
            </div>
            <h3 class="text-sm sm:text-base font-sans font-semibold text-dark-text light:text-warm-900">
              {{ t('about.values.structured.title') }}
            </h3>
            <p class="text-xs text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('about.values.structured.description') }}
            </p>
          </div>

          <!-- Value Card 4: Learning -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 30, scale: 0.94 }"
            :visible="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 140, damping: 16, delay: 320 } }"
            class="glass-editorial-card p-4 sm:p-5 rounded-lg space-y-2.5 hover:border-dark-text/30 light:hover:border-warm-400 transition-all duration-300 group shadow-xs"
          >
            <div class="w-8 h-8 flex items-center justify-center text-accent-navy group-hover:scale-110 transition-transform">
              <BookOpen class="w-5 h-5" />
            </div>
            <h3 class="text-sm sm:text-base font-sans font-semibold text-dark-text light:text-warm-900">
              {{ t('about.values.learning.title') }}
            </h3>
            <p class="text-xs text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('about.values.learning.description') }}
            </p>
          </div>
        </div>

      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { BaseContainer } from '@/components/base'
import TextScramble from '@/components/common/TextScramble.vue'
import { Code, Users, Layers, BookOpen } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const isExpanded = ref(false)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>
