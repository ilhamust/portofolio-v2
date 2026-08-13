<template>
  <section id="home" class="min-h-[90vh] flex flex-col justify-between py-12 md:py-20 scroll-mt-20 relative select-none">
    <BaseContainer size="wide" :padding="true">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <!-- Left Column: Side Section Numbering (01 - 07) -->
        <div class="hidden xl:flex flex-col items-center gap-4 col-span-1 pt-4 text-xs font-mono text-dark-muted light:text-warm-600">
          <span class="font-bold text-accent-navy">01</span>
          <div class="w-px h-8 bg-dark-border light:bg-warm-200"></div>
          <span class="opacity-40">02</span>
          <span class="opacity-40">03</span>
          <span class="opacity-40">04</span>
          <span class="opacity-40">05</span>
          <span class="opacity-40">06</span>
          <span class="opacity-40">07</span>
        </div>

        <!-- Center Column: Title, Subtitle, Narrative & Profile Photo -->
        <div class="col-span-1 lg:col-span-8 space-y-6 md:space-y-8">
          <!-- Monospace Section Number Tag -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-accent-navy font-semibold uppercase tracking-widest">
              {{ t('hero.sectionNum') }}
            </span>
          </div>

          <!-- Giant Display Name (Presisi Referensi 0) -->
          <div class="space-y-1">
            <h1 class="text-display-giant text-dark-text light:text-warm-900 tracking-tight leading-none">
              ILHAM
            </h1>
            <h1 class="text-display-giant text-editorial-outline text-dark-text light:text-warm-900 tracking-tight leading-none flex items-baseline gap-1">
              MUSTAQIM<span class="text-accent-navy inline-block w-4 h-4 md:w-6 md:h-6 rounded-full bg-accent-navy"></span>
            </h1>
          </div>

          <!-- Tagline Subtitle -->
          <h2 class="text-sm md:text-base font-mono uppercase tracking-widest text-dark-text light:text-warm-900 font-semibold pt-2">
            {{ t('hero.tagline') }}
          </h2>

          <!-- Bio Paragraf Narrative -->
          <p class="text-base md:text-lg text-dark-muted light:text-warm-700 font-light max-w-xl leading-relaxed">
            {{ t('hero.bio') }}
          </p>

          <!-- Bottom Explore Link -->
          <div class="pt-4">
            <a
              href="#about"
              @click.prevent="scrollToSection('about')"
              class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-dark-text light:text-warm-900 hover:text-accent-navy transition-colors group"
            >
              <span>{{ t('hero.exploreMore') }}</span>
              <span class="group-hover:translate-y-1 transition-transform">↓</span>
            </a>
          </div>
        </div>

        <!-- Right Column: Sliced Photo + Info Card (Presisi Referensi 0) -->
        <div class="col-span-1 lg:col-span-3 space-y-8">
          <!-- Sliced Profile Photo (5 Slats) -->
          <div class="w-full max-w-[280px] lg:max-w-none mx-auto">
            <SlicedImageMask
              src="/foto_profile.png"
              alt="Ilham Mustaqim Profile Photo"
              heightClass="h-[240px] sm:h-[300px] lg:h-[320px]"
            />
          </div>

          <!-- Side Info Panel (Location, Available, CV Link) -->
          <div class="bg-dark-surface light:bg-warm-100 border border-thin p-6 rounded-lg space-y-5 text-xs font-mono">
            <!-- Based In -->
            <div>
              <span class="text-dark-muted light:text-warm-600 block mb-1 uppercase tracking-wider">{{ t('hero.basedInLabel') }}</span>
              <p class="text-dark-text light:text-warm-900 font-semibold leading-snug">
                {{ t('hero.location') }}<br />
                <span class="font-normal text-dark-muted light:text-warm-600">{{ t('hero.country') }}</span>
              </p>
            </div>

            <div class="w-full h-px bg-dark-border light:bg-warm-200"></div>

            <!-- Open For -->
            <div>
              <span class="text-dark-muted light:text-warm-600 block mb-1 uppercase tracking-wider">{{ t('hero.openForLabel') }}</span>
              <p class="text-dark-text light:text-warm-900 leading-relaxed">
                {{ t('hero.openForValue') }}
              </p>
            </div>

            <!-- View CV Link -->
            <div class="pt-2">
              <a
                :href="cvData.cvUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-accent-navy hover:underline font-bold uppercase tracking-wider"
              >
                <span>{{ t('hero.viewCv') }}</span>
                <span>→</span>
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
import SlicedImageMask from '@/components/common/SlicedImageMask.vue'
import { cvData } from '@/data/cv.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const scrollToSection = (sectionId) => {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
