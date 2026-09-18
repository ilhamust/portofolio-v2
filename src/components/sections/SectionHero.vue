<template>
  <section id="home" class="min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] flex items-center py-4 lg:py-6 scroll-mt-20 relative select-none overflow-hidden">
    <BaseContainer size="wide" :padding="true" class="w-full">
      <!-- Concept 2: 2-Column Split Layout (Typography Left 7 : Photo + Badges Right 5) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        
        <!-- Left Column (7 Cols): Monospace Tag, Giant Title, Subtitle, Bio & CTAs -->
        <div class="col-span-1 lg:col-span-7 xl:col-span-7 space-y-2.5 sm:space-y-3 lg:space-y-4">
          <!-- Step 1: Monospace Section Number Tag (Cyber-Terminal Hack Decode) -->
          <div class="flex items-center gap-2">
            <TextScramble
              :text="t('hero.sectionNum')"
              :duration="600"
              @complete="onSectionNumComplete"
              class="text-[0.6875rem] font-mono text-accent-navy font-semibold uppercase tracking-widest"
            />
          </div>

          <!-- Step 2: Giant Display Name with Editorial Mask Slide-Up -->
          <h1 class="space-y-0.5 overflow-hidden">
            <span class="block overflow-hidden py-0.5">
              <span
                class="block text-display-giant text-dark-text light:text-warm-900 tracking-tight leading-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                :class="showName ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'"
              >
                ILHAM
              </span>
            </span>
            <span class="block overflow-hidden py-0.5">
              <span
                class="text-display-giant text-editorial-outline tracking-tight leading-none flex items-baseline gap-1 transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
                :class="showName ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'"
              >
                MUSTAQIM<span class="text-accent-navy inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-navy"></span>
              </span>
            </span>
          </h1>

          <!-- Step 3: Tagline Subtitle with Typewriter & Blinking Monospace Caret -->
          <div
            class="transition-opacity duration-500 min-h-[1.5rem] flex items-center"
            :class="showTagline ? 'opacity-100' : 'opacity-0'"
          >
            <h2 class="text-xs md:text-sm font-mono uppercase tracking-widest text-dark-text light:text-warm-900 font-semibold pt-0.5 flex items-center">
              <span>{{ typedTagline }}</span>
              <span class="inline-block w-1.5 h-3.5 bg-accent-navy ml-1 animate-terminal-blink"></span>
            </h2>
          </div>

          <!-- Step 4: Bio Narrative Paragraph (Cascading Entrance) -->
          <p
            class="text-xs sm:text-sm lg:text-base text-dark-muted light:text-warm-700 font-light max-w-lg leading-relaxed transition-all duration-700 ease-out"
            :class="showBio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            {{ t('hero.bio') }}
          </p>

          <!-- Step 4 (cont.): CTAs Link Group -->
          <div
            class="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4.5 text-xs font-mono transition-all duration-700 ease-out delay-150"
            :class="showBio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          >
            <a
              :href="cvData.cvUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-accent-navy hover:underline font-semibold uppercase tracking-wider"
            >
              <span>{{ t('hero.viewCv') }}</span>
              <span>→</span>
            </a>

            <!-- Separator Vertical Bar | -->
            <span class="text-dark-muted/40 light:text-warm-400 select-none">|</span>

            <!-- Social Links: LinkedIn, Instagram, GitHub -->
            <div class="flex items-center gap-3 sm:gap-4">
              <a
                :href="cvData.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-dark-muted light:text-warm-600 hover:text-dark-text light:hover:text-warm-900 transition-colors uppercase tracking-wider text-[0.6875rem] sm:text-xs"
                title="LinkedIn"
              >
                <Linkedin class="w-3.5 h-3.5" />
                <span class="hidden sm:inline">LinkedIn</span>
              </a>

              <a
                :href="cvData.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-dark-muted light:text-warm-600 hover:text-dark-text light:hover:text-warm-900 transition-colors uppercase tracking-wider text-[0.6875rem] sm:text-xs"
                title="Instagram"
              >
                <Instagram class="w-3.5 h-3.5" />
                <span class="hidden sm:inline">Instagram</span>
              </a>

              <a
                :href="cvData.github"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-dark-muted light:text-warm-600 hover:text-dark-text light:hover:text-warm-900 transition-colors uppercase tracking-wider text-[0.6875rem] sm:text-xs"
                title="GitHub"
              >
                <Github class="w-3.5 h-3.5" />
                <span class="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Step 5: Right Column Editorial Portrait Frame -->
        <div
          class="col-span-1 lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="showPhoto ? 'opacity-100 scale-100 translate-y-0 rotate-0' : 'opacity-0 scale-95 translate-y-5 rotate-1'"
        >
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
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { BaseContainer } from '@/components/base'
import HeroPhotoFrame from '@/components/common/HeroPhotoFrame.vue'
import TextScramble from '@/components/common/TextScramble.vue'
import { Linkedin, Instagram, Github } from 'lucide-vue-next'
import { cvData } from '@/data/cv.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

// Choreographed Sequential Stages:
// Stage 1: 01 / BERANDA decodes (TextScramble duration 750ms)
// Stage 2: ILHAM MUSTAQIM slides up from mask
// Stage 3: Tagline types out with blinking caret
// Stage 4: Bio & CTAs slide up
// Stage 5: Photo frame emerges
const showName = ref(false)
const showTagline = ref(false)
const showBio = ref(false)
const showPhoto = ref(false)

const typedTagline = ref('')
let typingTimer = null

const startTyping = () => {
  if (typingTimer) clearInterval(typingTimer)
  typedTagline.value = ''
  const fullText = t('hero.tagline')
  let i = 0
  typingTimer = setInterval(() => {
    if (i < fullText.length) {
      typedTagline.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(typingTimer)
      // Step 4 & 5: Reveal Bio, CTAs, and Photo smoothly
      setTimeout(() => {
        showBio.value = true
        setTimeout(() => {
          showPhoto.value = true
        }, 80)
      }, 100)
    }
  }, 22)
}

const onSectionNumComplete = () => {
  // Step 2: Trigger giant name reveal right as tag finishes
  showName.value = true

  // Step 3: Trigger typing as name slides up (quick 200ms pause)
  setTimeout(() => {
    showTagline.value = true
    startTyping()
  }, 200)
}

watch(() => t('hero.tagline'), () => {
  if (showTagline.value) {
    startTyping()
  }
})

onMounted(() => {
  // Quick safety fallback
  setTimeout(() => {
    if (!showName.value) {
      onSectionNumComplete()
    }
  }, 500)
})

onUnmounted(() => {
  if (typingTimer) clearInterval(typingTimer)
})
</script>
