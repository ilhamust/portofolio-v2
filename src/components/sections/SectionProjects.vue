<template>
  <section id="projects" class="py-14 lg:py-20 border-t border-thin scroll-mt-20">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-12 md:space-y-16">
        
        <!-- Header: Monospace Tag (Left) x View All Link (Right) -->
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono text-dark-muted light:text-warm-600 uppercase tracking-widest">
            {{ t('projects.sectionNum') }}
          </span>

          <a
            href="https://github.com/ilhamust"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs font-mono uppercase tracking-wider text-accent-navy hover:underline font-semibold flex items-center gap-1.5"
          >
            <span>{{ t('projects.viewAll') }}</span>
            <span>→</span>
          </a>
        </div>

        <!-- 3-Card Horizontal Grid (Presisi Referensi 0) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            class="bg-dark-surface light:bg-warm-100 border border-thin rounded-lg p-6 flex flex-col justify-between group hover:border-dark-hover light:hover:border-warm-300 transition-colors"
          >
            <div class="space-y-4">
              <!-- Number Tag + Category -->
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold text-accent-navy">
                  {{ project.number }}
                </span>
                <span class="text-[0.6875rem] font-mono text-dark-muted light:text-warm-600 uppercase tracking-wider">
                  {{ project.year }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="text-xl font-serif font-medium text-dark-text light:text-warm-900 group-hover:text-accent-navy transition-colors">
                {{ project.title }}
              </h3>

              <!-- Category Tag -->
              <span class="text-[0.6875rem] font-mono text-accent-navy block uppercase tracking-wider">
                {{ project.category }}
              </span>

              <!-- Description -->
              <p class="text-xs text-dark-muted light:text-warm-700 font-light leading-relaxed">
                {{ project.narrative }}
              </p>

              <!-- Image Frame (wms.png placeholder) -->
              <div class="pt-2">
                <div class="w-full h-40 rounded border border-thin overflow-hidden bg-dark-bg/50">
                  <img
                    :src="project.image"
                    :alt="project.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <!-- Footer Action Link -->
            <div class="pt-6">
              <a
                v-if="project.demoUrl || project.githubUrl"
                :href="project.demoUrl || project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-dark-text light:text-warm-900 group-hover:text-accent-navy transition-colors font-semibold"
              >
                <span>{{ t('projects.viewDetail') }}</span>
                <span>→</span>
              </a>
              <span v-else class="text-xs font-mono text-dark-muted light:text-warm-600 uppercase">
                // Internal System
              </span>
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
import { projectsData } from '@/data/projects.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// Ambil 3 project featured untuk tampilan grid referensi0
const featuredProjects = computed(() => {
  return projectsData.filter(p => p.featured).slice(0, 3)
})
</script>
