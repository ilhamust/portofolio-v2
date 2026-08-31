<template>
  <section id="about" class="py-14 lg:py-20 border-t border-thin scroll-mt-20">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-12 md:space-y-16">
        
        <!-- Section Header Monospace -->
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest">
            {{ t('about.sectionNum') }}
          </span>
        </div>

        <!-- Split Layout: Headline Serif (Left) x Paragraf Description (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div class="lg:col-span-6 space-y-4">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-serif text-dark-text light:text-warm-900 leading-tight">
              {{ t('about.headline') }}
            </h2>
          </div>

          <div class="lg:col-span-6 space-y-6">
            <p class="text-sm md:text-base text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('about.description') }}
            </p>

            <a
              href="#contact"
              @click.prevent="scrollToSection('contact')"
              class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-navy hover:underline font-semibold"
            >
              <span>{{ t('about.moreAboutMe') }}</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <!-- 4 Value Cards Grid (Presisi Referensi 0) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <!-- Value Card 1: Process -->
          <div class="bg-dark-surface light:bg-warm-100 border border-thin p-6 rounded-lg space-y-3">
            <div class="w-8 h-8 flex items-center justify-center text-accent-navy">
              <Code class="w-5 h-5" />
            </div>
            <h3 class="text-base font-serif font-medium text-dark-text light:text-warm-900">
              {{ t('about.values.process.title') }}
            </h3>
            <p class="text-xs text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('about.values.process.description') }}
            </p>
          </div>

          <!-- Value Card 2: Collaborative -->
          <div class="bg-dark-surface light:bg-warm-100 border border-thin p-6 rounded-lg space-y-3">
            <div class="w-8 h-8 flex items-center justify-center text-accent-navy">
              <Users class="w-5 h-5" />
            </div>
            <h3 class="text-base font-serif font-medium text-dark-text light:text-warm-900">
              {{ t('about.values.collaborative.title') }}
            </h3>
            <p class="text-xs text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('about.values.collaborative.description') }}
            </p>
          </div>

          <!-- Value Card 3: Structured -->
          <div class="bg-dark-surface light:bg-warm-100 border border-thin p-6 rounded-lg space-y-3">
            <div class="w-8 h-8 flex items-center justify-center text-accent-navy">
              <Layers class="w-5 h-5" />
            </div>
            <h3 class="text-base font-serif font-medium text-dark-text light:text-warm-900">
              {{ t('about.values.structured.title') }}
            </h3>
            <p class="text-xs text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('about.values.structured.description') }}
            </p>
          </div>

          <!-- Value Card 4: Learning -->
          <div class="bg-dark-surface light:bg-warm-100 border border-thin p-6 rounded-lg space-y-3">
            <div class="w-8 h-8 flex items-center justify-center text-accent-navy">
              <BookOpen class="w-5 h-5" />
            </div>
            <h3 class="text-base font-serif font-medium text-dark-text light:text-warm-900">
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
import { BaseContainer } from '@/components/base'
import { Code, Users, Layers, BookOpen } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
