<template>
  <section id="home" class="min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex items-center py-4 lg:py-6 scroll-mt-20 relative select-none overflow-hidden">
    <BaseContainer size="wide" :padding="true" class="w-full">
      <!-- Concept 2: 2-Column Split Layout (Typography Left 7 : Photo + Badges Right 5) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        
        <!-- Left Column (7 Cols): Monospace Tag, Giant Title, Subtitle, Bio & CTAs -->
        <div class="col-span-1 lg:col-span-7 xl:col-span-7 space-y-2.5 sm:space-y-3 lg:space-y-4">
          <!-- Monospace Section Number Tag -->
          <div class="flex items-center gap-2">
            <span class="text-[0.6875rem] font-mono text-accent-navy font-semibold uppercase tracking-widest">
              {{ t('hero.sectionNum') }}
            </span>
          </div>

          <!-- Giant Display Name -->
          <div class="space-y-0.5">
            <h1 class="text-display-giant text-dark-text light:text-warm-900 tracking-tight leading-none">
              ILHAM
            </h1>
            <h1 class="text-display-giant text-editorial-outline tracking-tight leading-none flex items-baseline gap-1">
              MUSTAQIM<span class="text-accent-navy inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-navy"></span>
            </h1>
          </div>

          <!-- Tagline Subtitle -->
          <h2 class="text-xs md:text-sm font-mono uppercase tracking-widest text-dark-text light:text-warm-900 font-semibold pt-0.5">
            {{ t('hero.tagline') }}
          </h2>

          <!-- Bio Narrative Paragraph -->
          <p class="text-xs sm:text-sm lg:text-base text-dark-muted light:text-warm-700 font-light max-w-lg leading-relaxed">
            {{ t('hero.bio') }}
          </p>

          <!-- CTAs Link Group -->
          <div class="pt-2 flex items-center gap-6">
            <a
              :href="cvData.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-accent-navy hover:underline font-mono font-semibold uppercase tracking-wider text-xs"
            >
              <span>{{ t('hero.viewCv') }}</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <!-- Right Column (5 Cols): Clean Focal Photo Frame with Prominent Bottom-Right Location Glass Badge -->
        <div class="col-span-1 lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
          <HeroPhotoFrame
            src="/foto_profile.png"
            alt="Ilham Mustaqim Profile Photo"
            badgeText="FIG. 01 // PORTRAIT"
            :locationLabel="t('hero.basedInLabel')"
            :locationText="`${t('hero.location')}, ${t('hero.country')}`"
            maxWidthClass="w-full max-w-[240px] sm:max-w-[270px] lg:max-w-[295px]"
            aspectClass="aspect-[4/5] h-[250px] sm:h-[285px] lg:h-[320px]"
          />
        </div>

      </div>
    </BaseContainer>
  </section>
</template>

<script setup>
import { BaseContainer } from '@/components/base'
import HeroPhotoFrame from '@/components/common/HeroPhotoFrame.vue'
import { cvData } from '@/data/cv.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
