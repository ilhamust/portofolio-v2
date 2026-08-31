<template>
  <section id="contact" class="py-14 lg:py-20 border-t border-thin scroll-mt-20">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-12 md:space-y-16">
        
        <!-- Header Monospace Tag -->
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest">
            {{ t('contact.sectionNum') }}
          </span>
        </div>

        <!-- Headline Serif Display -->
        <div class="max-w-3xl">
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-dark-text light:text-warm-900 leading-tight">
            {{ t('contact.headline') }}<span class="text-accent-navy inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-navy ml-1"></span>
          </h2>
        </div>

        <!-- Contact Grid (EMAIL, LINKEDIN, GITHUB, PHONE + RESPONSE TIME - Presisi Referensi 0) -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-6">
          
          <!-- Contact Items (Left) -->
          <div class="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <!-- Email -->
            <div class="space-y-1.5 border-b border-thin pb-4">
              <span class="text-[0.6875rem] font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest block">
                {{ t('contact.email') }}
              </span>
              <a
                :href="`mailto:${cvData.email}`"
                class="text-sm md:text-base font-mono text-dark-text light:text-warm-900 hover:text-accent-navy transition-colors font-semibold block truncate"
              >
                {{ cvData.email }}
              </a>
            </div>

            <!-- LinkedIn -->
            <div class="space-y-1.5 border-b border-thin pb-4">
              <span class="text-[0.6875rem] font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest block">
                {{ t('contact.linkedin') }}
              </span>
              <a
                :href="cvData.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm md:text-base font-mono text-dark-text light:text-warm-900 hover:text-accent-navy transition-colors font-semibold block truncate"
              >
                {{ cvData.linkedinHandle }}
              </a>
            </div>

            <!-- GitHub -->
            <div class="space-y-1.5 border-b border-thin pb-4">
              <span class="text-[0.6875rem] font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest block">
                {{ t('contact.github') }}
              </span>
              <a
                :href="cvData.github"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm md:text-base font-mono text-dark-text light:text-warm-900 hover:text-accent-navy transition-colors font-semibold block truncate"
              >
                {{ cvData.githubHandle }}
              </a>
            </div>

            <!-- Phone -->
            <div class="space-y-1.5 border-b border-thin pb-4">
              <span class="text-[0.6875rem] font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest block">
                {{ t('contact.phone') }}
              </span>
              <a
                :href="`tel:${cvData.phone.replace(/\s+/g, '')}`"
                class="text-sm md:text-base font-mono text-dark-text light:text-warm-900 hover:text-accent-navy transition-colors font-semibold block truncate"
              >
                {{ cvData.phone }}
              </a>
            </div>

          </div>

          <!-- Response Time Side Block (Right) -->
          <div class="md:col-span-4 bg-dark-surface light:bg-warm-100 border border-thin rounded-lg p-6 space-y-2">
            <span class="text-[0.6875rem] font-mono uppercase tracking-widest text-dark-muted light:text-warm-600 block">
              {{ t('contact.responseLabel') }}
            </span>
            <p class="text-xl font-mono font-bold text-accent-navy">
              {{ t('contact.responseValue') }}
            </p>
          </div>

        </div>

      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { BaseContainer } from '@/components/base'
import { cvData } from '@/data/cv.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
