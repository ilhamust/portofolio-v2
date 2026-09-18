<template>
  <footer id="footer" class="w-full bg-dark-bg light:bg-warm-50 border-t border-thin py-12 lg:py-16 transition-colors duration-300 select-none">
    <BaseContainer size="wide" :padding="true">
      <div class="space-y-10 lg:space-y-12">
        
        <!-- Main 2-Column Split: Left (Social Media) x Right (Editorial Text & Status) -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
          
          <!-- Sisi Kiri (Social Media & Direct Channels) -->
          <div class="md:col-span-5 space-y-4">
            <span class="text-xs font-mono tracking-widest uppercase text-dark-muted light:text-warm-600 font-medium block">
              {{ t('footer.socialTag') }}
            </span>

            <div class="space-y-2.5">
              <!-- Email -->
              <a
                :href="`mailto:${cvData.email}`"
                class="flex items-center justify-between p-3 rounded-xl border border-thin bg-dark-surface/40 light:bg-warm-100/50 hover:border-dark-text/40 light:hover:border-warm-400 hover:bg-dark-surface light:hover:bg-warm-100 transition-all duration-200 group"
                title="Kirim Email"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-8 h-8 rounded-lg bg-dark-bg light:bg-warm-50 flex items-center justify-center text-dark-muted light:text-warm-600 group-hover:text-dark-text light:group-hover:text-warm-900 transition-colors shrink-0">
                    <Mail class="w-4 h-4" />
                  </div>
                  <div class="min-w-0">
                    <span class="text-[0.625rem] font-mono text-dark-muted light:text-warm-500 uppercase block tracking-wider">Email</span>
                    <span class="text-xs sm:text-sm font-mono text-dark-text light:text-warm-900 font-medium truncate block">{{ cvData.email }}</span>
                  </div>
                </div>
                <ArrowUpRight class="w-4 h-4 text-dark-muted/40 group-hover:text-dark-text light:group-hover:text-warm-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </a>

              <!-- LinkedIn -->
              <a
                :href="cvData.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-3 rounded-xl border border-thin bg-dark-surface/40 light:bg-warm-100/50 hover:border-dark-text/40 light:hover:border-warm-400 hover:bg-dark-surface light:hover:bg-warm-100 transition-all duration-200 group"
                title="LinkedIn Profile"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-8 h-8 rounded-lg bg-dark-bg light:bg-warm-50 flex items-center justify-center text-dark-muted light:text-warm-600 group-hover:text-dark-text light:group-hover:text-warm-900 transition-colors shrink-0">
                    <Linkedin class="w-4 h-4" />
                  </div>
                  <div class="min-w-0">
                    <span class="text-[0.625rem] font-mono text-dark-muted light:text-warm-500 uppercase block tracking-wider">LinkedIn</span>
                    <span class="text-xs sm:text-sm font-mono text-dark-text light:text-warm-900 font-medium truncate block">{{ cvData.linkedinHandle }}</span>
                  </div>
                </div>
                <ArrowUpRight class="w-4 h-4 text-dark-muted/40 group-hover:text-dark-text light:group-hover:text-warm-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </a>

              <!-- GitHub -->
              <a
                :href="cvData.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-3 rounded-xl border border-thin bg-dark-surface/40 light:bg-warm-100/50 hover:border-dark-text/40 light:hover:border-warm-400 hover:bg-dark-surface light:hover:bg-warm-100 transition-all duration-200 group"
                title="GitHub Profile"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-8 h-8 rounded-lg bg-dark-bg light:bg-warm-50 flex items-center justify-center text-dark-muted light:text-warm-600 group-hover:text-dark-text light:group-hover:text-warm-900 transition-colors shrink-0">
                    <Github class="w-4 h-4" />
                  </div>
                  <div class="min-w-0">
                    <span class="text-[0.625rem] font-mono text-dark-muted light:text-warm-500 uppercase block tracking-wider">GitHub</span>
                    <span class="text-xs sm:text-sm font-mono text-dark-text light:text-warm-900 font-medium truncate block">{{ cvData.githubHandle }}</span>
                  </div>
                </div>
                <ArrowUpRight class="w-4 h-4 text-dark-muted/40 group-hover:text-dark-text light:group-hover:text-warm-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </a>

              <!-- WhatsApp / Phone -->
              <a
                :href="`https://wa.me/${cvData.phone.replace(/[^0-9]/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between p-3 rounded-xl border border-thin bg-dark-surface/40 light:bg-warm-100/50 hover:border-dark-text/40 light:hover:border-warm-400 hover:bg-dark-surface light:hover:bg-warm-100 transition-all duration-200 group"
                title="Hubungi via WhatsApp"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-8 h-8 rounded-lg bg-dark-bg light:bg-warm-50 flex items-center justify-center text-dark-muted light:text-warm-600 group-hover:text-dark-text light:group-hover:text-warm-900 transition-colors shrink-0">
                    <Phone class="w-4 h-4" />
                  </div>
                  <div class="min-w-0">
                    <span class="text-[0.625rem] font-mono text-dark-muted light:text-warm-500 uppercase block tracking-wider">WhatsApp / Telepon</span>
                    <span class="text-xs sm:text-sm font-mono text-dark-text light:text-warm-900 font-medium truncate block">{{ cvData.phone }}</span>
                  </div>
                </div>
                <ArrowUpRight class="w-4 h-4 text-dark-muted/40 group-hover:text-dark-text light:group-hover:text-warm-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </a>
            </div>
          </div>

          <!-- Sisi Kanan (Tulisan Editorial & Narasi Penutup) -->
          <div class="md:col-span-7 flex flex-col justify-center space-y-4 py-1">
            <span class="text-xs font-mono tracking-widest uppercase text-dark-muted/60 light:text-warm-500 block">
              // SAY HELLO
            </span>

            <h3 class="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-dark-text light:text-warm-900 leading-tight tracking-tight">
              {{ t('footer.closingHeadline') }}
            </h3>

            <p class="text-xs sm:text-sm text-dark-muted light:text-warm-700 font-light leading-relaxed max-w-lg">
              {{ t('footer.closingDescription') }}
            </p>
          </div>

        </div>

        <!-- Bottom Bar: Copyright & Back to Top -->
        <div class="pt-6 border-t border-thin flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-dark-muted light:text-warm-600">
          <div>
            <span>{{ t('footer.copyright') }}</span>
          </div>

          <button
            @click="scrollToTop"
            class="flex items-center gap-1.5 text-dark-muted light:text-warm-600 hover:text-dark-text light:hover:text-warm-900 transition-colors duration-200 focus:outline-none cursor-pointer group"
            title="Kembali ke bagian paling atas"
          >
            <span class="uppercase tracking-wider text-[0.6875rem]">{{ t('footer.backToTop') }}</span>
            <ArrowUp class="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </BaseContainer>
  </footer>
</template>

<script setup>
import { BaseContainer } from '@/components/base'
import { Github, Linkedin, Mail, Phone, ArrowUpRight, ArrowUp } from 'lucide-vue-next'
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
