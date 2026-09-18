<template>
  <section id="now" class="py-14 lg:py-20 border-t border-thin scroll-mt-20">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-12 md:space-y-16">
        
        <!-- Header Monospace Tag -->
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest">
            {{ t('now.sectionNum') }}
          </span>
        </div>

        <!-- Split Grid: Headline & Focus (Left) x Availability Card (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          <!-- Left Side: Headline & Focus Narrative -->
          <div class="lg:col-span-8 space-y-6">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-dark-text light:text-warm-900 leading-tight">
              {{ t('now.headline') }}
            </h2>

            <div class="space-y-2 pt-2">
              <span class="text-xs font-mono uppercase tracking-widest text-accent-navy font-semibold block">
                {{ t('now.focusLabel') }}
              </span>
              <p class="text-sm md:text-base text-dark-muted light:text-warm-700 font-light leading-relaxed max-w-2xl">
                {{ t('now.focusDescription') }}
              </p>
            </div>
          </div>

          <!-- Right Side: Availability Status Card (Presisi Referensi 0) -->
          <div class="lg:col-span-4 bg-dark-surface light:bg-warm-100 border border-thin rounded-lg p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div class="space-y-3">
              <span class="text-[0.6875rem] font-mono uppercase tracking-widest text-dark-muted light:text-warm-600 block">
                {{ t('now.availableLabel') }}
              </span>

              <h3 class="text-lg md:text-xl font-sans font-semibold text-dark-text light:text-warm-900 leading-snug">
                {{ t('now.availableValue') }}
              </h3>
            </div>

            <div class="pt-4">
              <a
                href="#contact"
                @click.prevent="scrollToSection('contact')"
                class="w-full inline-flex items-center justify-between p-3 rounded bg-accent-navy hover:bg-accent-navy-hover text-white transition-colors text-xs font-mono font-semibold uppercase tracking-wider group"
              >
                <span>Get in Touch</span>
                <ArrowUpRight class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { BaseContainer } from '@/components/base'
import { ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
