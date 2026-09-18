<template>
  <section id="experience" class="py-16 lg:py-24 border-t border-thin scroll-mt-20 relative">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-10 sm:space-y-12">
        
        <!-- Header: Tag & Headline (Left) x View Full Journey / LinkedIn (Right) -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="space-y-2">
            <!-- Small Pretitle Tag with Dash -->
            <div class="flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
              <TextScramble :text="t('experience.sectionNum')" :duration="550" class="text-accent-navy font-semibold" />
              <span class="text-dark-muted/40 light:text-warm-400">—</span>
              <span class="text-dark-muted light:text-warm-600">{{ t('experience.tag') }}</span>
            </div>

            <!-- Big Bold Editorial Headline -->
            <h2
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :visible="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.16, 1, 0.3, 1], delay: 40 } }"
              class="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-dark-text light:text-warm-900 tracking-tight leading-tight"
            >
              {{ t('experience.headline') }}
            </h2>
          </div>

          <!-- Right Action: View Full Journey / LinkedIn Link -->
          <a
            :href="cvData.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            v-motion
            :initial="{ opacity: 0, scale: 0.88 }"
            :visible="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 160, damping: 16, delay: 90 } }"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-thin text-xs font-mono tracking-wide text-dark-text light:text-warm-900 hover:border-dark-text/40 light:hover:border-warm-400 hover:text-dark-text light:hover:text-warm-900 transition-all duration-200 group bg-dark-surface/60 light:bg-warm-100/60 self-start sm:self-auto shrink-0 shadow-xs"
          >
            <span>{{ t('experience.viewFullJourney') }}</span>
            <span class="w-5 h-5 rounded-full bg-dark-bg light:bg-warm-200 flex items-center justify-center text-[0.6875rem] text-dark-muted light:text-warm-700 group-hover:text-dark-text light:group-hover:text-warm-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </a>
        </div>

        <!-- Vertical Timeline with Expandable Cards -->
        <div class="relative pl-6 sm:pl-10 max-w-4xl">
          <!-- Continuous Vertical Rail Track -->
          <div class="absolute left-2.5 sm:left-4 top-8 bottom-8 w-px bg-dark-border light:bg-warm-200 pointer-events-none"></div>

          <!-- Experience Items List with Rail Outward Branch Motion (Re-triggers with :visible) -->
          <div class="space-y-4 sm:space-y-5">
            <div
              v-for="(item, index) in experienceData"
              :key="item.id"
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :visible="{ opacity: 1, x: 0, transition: { duration: 450, ease: [0.16, 1, 0.3, 1], delay: 130 + (index * 60) } }"
              class="relative group"
            >
              <!-- Timeline Indicator Node (Left Rail Marker) -->
              <div class="absolute -left-6 sm:-left-10 top-7 sm:top-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                <div
                  class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 bg-dark-bg light:bg-warm-50 border"
                  :class="[
                    isExpanded(item.id)
                      ? 'border-accent-navy shadow-[0_0_12px_rgba(29,78,216,0.5)] scale-110'
                      : 'border-dark-border light:border-warm-300 group-hover:border-dark-text/50 light:group-hover:border-warm-500 group-hover:scale-105'
                  ]"
                >
                  <div
                    class="w-2 h-2 rounded-full transition-colors duration-300"
                    :class="[
                      isExpanded(item.id)
                        ? 'bg-accent-navy scale-125'
                        : 'bg-dark-muted/60 light:bg-warm-400 group-hover:bg-dark-text light:group-hover:bg-warm-900'
                    ]"
                  ></div>
                </div>
              </div>

              <!-- Main Card Container -->
              <div
                class="glass-editorial-card rounded-2xl transition-all duration-300 overflow-hidden shadow-xs"
                :class="[
                  isExpanded(item.id)
                    ? 'border-dark-text/30 light:border-warm-400 shadow-sm'
                    : 'hover:border-dark-hover light:hover:border-warm-300'
                ]"
              >
                <!-- Card Header (Clickable Toggle Trigger) -->
                <button
                  type="button"
                  @click="toggleExpand(item.id)"
                  class="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-navy"
                  :aria-expanded="isExpanded(item.id)"
                >
                  <!-- Left: Company / Role Emblem & Titles -->
                  <div class="flex items-center gap-3 sm:gap-4 min-w-0">
                    <!-- Brand / Company Logo Emblem -->
                    <div
                      class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 overflow-hidden"
                    >
                      <img
                        v-if="item.logo"
                        :src="item.logo"
                        :alt="item.company"
                        loading="lazy"
                        class="w-full h-full object-contain rounded-xl"
                      />
                      <component
                        v-else
                        :is="getBadgeIcon(item.brandBadge?.icon)"
                        class="w-5 h-5 sm:w-5.5 sm:h-5.5"
                      />
                    </div>

                    <!-- Role & Company Details -->
                    <div class="min-w-0">
                      <h3
                        class="text-sm sm:text-base font-sans font-bold text-dark-text light:text-warm-900 transition-colors leading-snug truncate"
                        :class="[isExpanded(item.id) ? 'text-accent-navy light:text-accent-navy' : '']"
                      >
                        {{ item.role }}
                      </h3>
                      <div class="flex items-center gap-2 mt-0.5 text-xs font-mono text-dark-muted light:text-warm-600 truncate">
                        <span class="truncate">{{ item.company }}</span>
                        <span class="opacity-40">•</span>
                        <span class="text-accent-navy light:text-accent-navy font-semibold shrink-0">
                          {{ item.employmentType }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Right: Short Date Pill & Circular Arrow / Expand Toggle -->
                  <div class="flex items-center gap-2 sm:gap-3 shrink-0">
                    <!-- Calendar Period Badge -->
                    <div class="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-bg/60 light:bg-warm-200/60 border border-thin text-xs font-mono text-dark-muted light:text-warm-700">
                      <Calendar class="w-3.5 h-3.5 text-accent-navy shrink-0" />
                      <span>{{ item.shortPeriod || item.year }}</span>
                    </div>

                    <!-- Circular Expand Button (Rotates smoothly on expand) -->
                    <div
                      class="w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300"
                      :class="[
                        isExpanded(item.id)
                          ? 'bg-accent-navy text-white border-accent-navy shadow-[0_0_12px_rgba(29,78,216,0.35)] rotate-45'
                          : 'bg-dark-bg/60 light:bg-warm-200/60 border-thin text-dark-muted light:text-warm-700 group-hover:border-dark-text/40 light:group-hover:border-warm-400 group-hover:text-dark-text light:group-hover:text-warm-900 rotate-0'
                      ]"
                    >
                      <ArrowUpRight class="w-4 h-4 transition-transform duration-300" />
                    </div>
                  </div>
                </button>

                <!-- Expandable Accordion Body (Animated with CSS Grid rows) -->
                <div
                  class="grid transition-all duration-300 ease-out"
                  :class="[isExpanded(item.id) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0']"
                >
                  <div class="overflow-hidden">
                    <div class="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 space-y-4 border-t border-thin/60">
                      
                      <!-- Mobile Date Display (Visible on small screens) -->
                      <div class="flex sm:hidden items-center gap-2 text-xs font-mono text-dark-muted light:text-warm-600 pt-2">
                        <Calendar class="w-3.5 h-3.5 text-accent-navy shrink-0" />
                        <span>{{ item.period }}</span>
                        <span class="opacity-40">•</span>
                        <span>{{ item.location }}</span>
                      </div>

                      <!-- Detailed Role Narrative -->
                      <p class="text-xs sm:text-sm text-dark-muted light:text-warm-700 font-light leading-relaxed">
                        {{ item.description }}
                      </p>

                      <!-- Key Highlights Bullet Points -->
                      <div v-if="item.highlights && item.highlights.length" class="space-y-2 pt-1">
                        <span class="text-[0.6875rem] font-mono uppercase tracking-widest text-accent-navy font-semibold block">
                          {{ t('experience.responsibilities') }}
                        </span>
                        <ul class="space-y-1.5">
                          <li
                            v-for="(point, idx) in item.highlights"
                            :key="idx"
                            class="flex items-start gap-2.5 text-xs sm:text-sm text-dark-text/90 light:text-warm-800 leading-relaxed font-light"
                          >
                            <span class="w-1.5 h-1.5 rounded-full bg-accent-navy mt-2 shrink-0"></span>
                            <span>{{ point }}</span>
                          </li>
                        </ul>
                      </div>

                      <!-- Skills & Technologies Tag Chips -->
                      <div v-if="item.tags && item.tags.length" class="space-y-2 pt-2">
                        <span class="text-[0.625rem] font-mono uppercase tracking-widest text-dark-muted/80 light:text-warm-600 block">
                          {{ t('experience.technologies') }}
                        </span>
                        <div class="flex flex-wrap gap-1.5 sm:gap-2">
                          <span
                            v-for="tag in item.tags"
                            :key="tag"
                            class="text-[0.6875rem] font-mono px-2.5 py-0.5 rounded-md bg-dark-bg light:bg-warm-50 border border-thin text-dark-muted light:text-warm-700 hover:border-dark-text/30 light:hover:border-warm-400 transition-colors"
                          >
                            {{ tag }}
                          </span>
                        </div>
                      </div>

                      <!-- Bottom Metadata: Location & Full Period -->
                      <div class="hidden sm:flex items-center justify-between pt-2 text-[0.6875rem] font-mono text-dark-muted/60 light:text-warm-500 border-t border-thin/40">
                        <div class="flex items-center gap-1.5">
                          <MapPin class="w-3.5 h-3.5" />
                          <span>{{ item.location }}</span>
                        </div>
                        <span>{{ item.period }}</span>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </div>
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
import { experienceData } from '@/data/experience.data.js'
import { cvData } from '@/data/cv.data.js'
import { useI18n } from '@/composables/useI18n'
import {
  Code2,
  GraduationCap,
  Globe,
  Server,
  Calendar,
  ArrowUpRight,
  MapPin
} from 'lucide-vue-next'

const { t } = useI18n()

// Active expanded card ID state (default first experience is expanded for immediate discovery)
const expandedId = ref('exp-1')

const isExpanded = (id) => expandedId.value === id

const toggleExpand = (id) => {
  if (expandedId.value === id) {
    expandedId.value = null // Click same card collapses it
  } else {
    expandedId.value = id // Open target card
  }
}

// Icon resolver helper based on item badge icon name
const getBadgeIcon = (iconName) => {
  switch (iconName) {
    case 'code':
      return Code2
    case 'academic':
      return GraduationCap
    case 'globe':
      return Globe
    case 'network':
      return Server
    default:
      return Code2
  }
}
</script>
