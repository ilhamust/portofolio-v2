<template>
  <footer class="w-full bg-dark-bg light:bg-warm-50 border-t border-thin py-8 transition-colors duration-300 select-none">
    <BaseContainer size="wide" :padding="true">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-dark-muted light:text-warm-600">
        <!-- Left: Copyright -->
        <div>
          <span>{{ t('contact.copyright') }}</span>
        </div>

        <!-- Right: Social Links & Back to Top -->
        <div class="flex items-center gap-6">
          <a
            :href="cvData.github"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-dark-text light:hover:text-warm-900 transition-colors"
            title="GitHub Profile"
          >
            <Github class="w-4 h-4" />
          </a>
          <a
            :href="cvData.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-dark-text light:hover:text-warm-900 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin class="w-4 h-4" />
          </a>
          <a
            :href="`mailto:${cvData.email}`"
            class="hover:text-dark-text light:hover:text-warm-900 transition-colors"
            title="Send Email"
          >
            <Mail class="w-4 h-4" />
          </a>

          <div class="w-px h-3 bg-dark-border light:bg-warm-200"></div>

          <button
            @click="scrollToTop"
            class="flex items-center gap-1.5 hover:text-dark-text light:hover:text-warm-900 transition-colors duration-200 focus:outline-none cursor-pointer"
            title="Back to top"
          >
            <span class="uppercase tracking-wider text-[0.6875rem]">{{ t('contact.backToTop') }}</span>
            <ArrowUp class="w-3.5 h-3.5 text-accent-navy" />
          </button>
        </div>
      </div>
    </BaseContainer>
  </footer>
</template>

<script setup>
import { BaseContainer } from '@/components/base'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-vue-next'
import { cvData } from '@/data/cv.data.js'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
</script>
