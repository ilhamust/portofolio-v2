<template>
  <section id="explore" class="py-14 lg:py-20 border-t border-thin scroll-mt-20">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-12 md:space-y-16">
        
        <!-- Header Monospace Tag -->
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest">
            {{ t('explore.sectionNum') }}
          </span>
        </div>

        <!-- 3-Column Exploration Grid (Presisi Referensi 0) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Column 1: Currently Focused -->
          <div class="bg-dark-surface light:bg-warm-100 border border-thin rounded-lg p-6 md:p-8 space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded flex items-center justify-center text-accent-navy bg-dark-bg/60 light:bg-warm-50">
                <Code class="w-5 h-5" />
              </div>
              <h3 class="text-base font-serif font-medium text-dark-text light:text-warm-900">
                {{ t('explore.currentFocus.title') }}
              </h3>
            </div>

            <ul class="space-y-3">
              <li
                v-for="item in exploreData.currentFocus.items"
                :key="item.name"
                class="space-y-0.5"
              >
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent-navy shrink-0"></span>
                  <span class="text-xs font-mono font-semibold text-dark-text light:text-warm-900">
                    {{ item.name }}
                  </span>
                </div>
                <p class="text-[0.6875rem] text-dark-muted light:text-warm-600 font-light pl-3.5 leading-relaxed">
                  {{ item.desc }}
                </p>
              </li>
            </ul>
          </div>

          <!-- Column 2: Currently Learning -->
          <div class="bg-dark-surface light:bg-warm-100 border border-thin rounded-lg p-6 md:p-8 space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded flex items-center justify-center text-accent-navy bg-dark-bg/60 light:bg-warm-50">
                <BookOpen class="w-5 h-5" />
              </div>
              <h3 class="text-base font-serif font-medium text-dark-text light:text-warm-900">
                {{ t('explore.learning.title') }}
              </h3>
            </div>

            <ul class="space-y-3">
              <li
                v-for="item in exploreData.learning.items"
                :key="item.name"
                class="space-y-0.5"
              >
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent-navy shrink-0"></span>
                  <span class="text-xs font-mono font-semibold text-dark-text light:text-warm-900">
                    {{ item.name }}
                  </span>
                </div>
                <p class="text-[0.6875rem] text-dark-muted light:text-warm-600 font-light pl-3.5 leading-relaxed">
                  {{ item.desc }}
                </p>
              </li>
            </ul>
          </div>

          <!-- Column 3: Interested In -->
          <div class="bg-dark-surface light:bg-warm-100 border border-thin rounded-lg p-6 md:p-8 space-y-6">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded flex items-center justify-center text-accent-navy bg-dark-bg/60 light:bg-warm-50">
                <Sparkles class="w-5 h-5" />
              </div>
              <h3 class="text-base font-serif font-medium text-dark-text light:text-warm-900">
                {{ t('explore.interested.title') }}
              </h3>
            </div>

            <ul class="space-y-3">
              <li
                v-for="item in exploreData.interested.items"
                :key="item.name"
                class="space-y-0.5"
              >
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-accent-navy shrink-0"></span>
                  <span class="text-xs font-mono font-semibold text-dark-text light:text-warm-900">
                    {{ item.name }}
                  </span>
                </div>
                <p class="text-[0.6875rem] text-dark-muted light:text-warm-600 font-light pl-3.5 leading-relaxed">
                  {{ item.desc }}
                </p>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { BaseContainer } from '@/components/base'
import { exploreData } from '@/data/explore.data.js'
import { Code, BookOpen, Sparkles } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
