<template>
  <section id="techstack" class="py-20 md:py-32 border-t border-thin scroll-mt-20">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-12 md:space-y-16">
        
        <!-- Header & Headline Split Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-4 space-y-4">
            <span class="text-xs font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest block">
              {{ t('techStack.sectionNum') }}
            </span>

            <h2 class="text-2xl sm:text-3xl font-serif text-dark-text light:text-warm-900 leading-tight">
              {{ t('techStack.headline') }}
            </h2>

            <p class="text-xs md:text-sm text-dark-muted light:text-warm-700 font-light leading-relaxed">
              {{ t('techStack.description') }}
            </p>
          </div>

          <!-- 6x2 Tech Stack Grid (12 Items - Presisi Referensi 0) -->
          <div class="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div
              v-for="tech in cvData.techStack"
              :key="tech.name"
              class="bg-dark-surface light:bg-warm-100 border border-thin rounded-lg p-4 flex flex-col items-center justify-center gap-3 text-center hover:border-accent-navy/40 transition-colors group cursor-default"
            >
              <!-- Icon Box -->
              <div class="w-10 h-10 flex items-center justify-center text-dark-text light:text-warm-900 group-hover:text-accent-navy transition-colors">
                <component :is="getTechIconComponent(tech.icon)" class="w-6 h-6 stroke-[1.5]" />
              </div>

              <!-- Label -->
              <span class="text-xs font-mono font-medium text-dark-text light:text-warm-900">
                {{ tech.name }}
              </span>
            </div>
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
import {
  Code,
  Layers,
  Atom,
  Server,
  Terminal,
  FileCode,
  Database,
  GitBranch,
  Box,
  Figma as FigmaIcon,
  Smartphone
} from 'lucide-vue-next'

const { t } = useI18n()

// Icon mapping untuk 12 teknologi referensi0
const getTechIconComponent = (iconKey) => {
  const iconMap = {
    laravel: Code,
    vue: Layers,
    react: Atom,
    nodejs: Server,
    express: Terminal,
    php: FileCode,
    mysql: Database,
    postgresql: Database,
    git: GitBranch,
    docker: Box,
    figma: FigmaIcon,
    flutter: Smartphone
  }
  return iconMap[iconKey] || Code
}
</script>
