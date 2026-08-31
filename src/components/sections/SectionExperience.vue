<template>
  <section id="experience" class="py-14 lg:py-20 border-t border-thin scroll-mt-20">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-12 md:space-y-16">
        
        <!-- Header Monospace Tag (Left) x Action Link (Right) -->
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest">
            {{ t('experience.sectionNum') }}
          </span>

          <a
            :href="cvData.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs font-mono uppercase tracking-wider text-accent-navy hover:underline font-semibold flex items-center gap-1.5"
          >
            <span>{{ t('experience.viewFullJourney') }}</span>
            <span>→</span>
          </a>
        </div>

        <!-- Vertical Timeline Grid (Presisi Referensi 0) -->
        <div class="max-w-4xl space-y-8 relative">
          <div
            v-for="(item, index) in experienceData"
            :key="item.id"
            class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start relative group"
          >
            <!-- Timeline Year Tag (Left) -->
            <div class="md:col-span-3 flex items-center gap-3">
              <!-- Blue Circle Dot Marker -->
              <div class="w-3 h-3 rounded-full bg-dark-border light:bg-warm-200 border-2 border-dark-bg group-hover:bg-accent-navy transition-colors shrink-0"></div>
              <span class="text-sm font-mono font-bold text-accent-navy">
                {{ item.year }}
              </span>
            </div>

            <!-- Experience Card (Right) -->
            <div class="md:col-span-9 bg-dark-surface light:bg-warm-100 border border-thin rounded-lg p-6 space-y-3 hover:border-dark-hover transition-colors">
              <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 class="text-base md:text-lg font-serif font-medium text-dark-text light:text-warm-900">
                  {{ item.role }}
                </h3>
                <span class="text-[0.6875rem] font-mono text-dark-muted light:text-warm-600 uppercase">
                  {{ item.period }}
                </span>
              </div>

              <span class="text-xs font-mono text-accent-navy block uppercase tracking-wider font-semibold">
                {{ item.company }} • {{ item.location }}
              </span>

              <p class="text-xs md:text-sm text-dark-muted light:text-warm-700 font-light leading-relaxed">
                {{ item.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 pt-2">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="text-[0.625rem] font-mono px-2 py-0.5 rounded bg-dark-bg light:bg-warm-50 border border-thin text-dark-muted light:text-warm-600"
                >
                  {{ tag }}
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
import { BaseContainer } from '@/components/base'
import { experienceData } from '@/data/experience.data.js'
import { cvData } from '@/data/cv.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
