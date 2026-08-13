<template>
  <header class="sticky top-0 z-50 w-full bg-dark-bg/90 light:bg-warm-50/90 backdrop-blur-md border-b border-thin transition-colors duration-300 select-none">
    <BaseContainer size="wide" :padding="true">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- ─── Left Side: Accent Box + Branding (Presisi Referensi 0) ─── -->
        <a
          href="#home"
          @click.prevent="scrollToSection('home')"
          class="flex items-center gap-2.5 group focus:outline-none"
        >
          <!-- Accent Box [■] -->
          <div class="w-3.5 h-3.5 bg-accent-navy rounded-xs shrink-0 group-hover:scale-110 transition-transform duration-300"></div>
          <span class="font-sans text-sm md:text-base font-bold tracking-tight text-dark-text light:text-warm-900 uppercase">
            ILHAM
          </span>
        </a>

        <!-- ─── Center/Right Side: 8 Navigation Links (Presisi Referensi 0) ── -->
        <nav class="hidden lg:flex items-center gap-6 xl:gap-8">
          <button
            v-for="nav in navItems"
            :key="nav.id"
            @click="scrollToSection(nav.id)"
            :class="[
              'text-[0.6875rem] xl:text-xs font-mono uppercase tracking-wider transition-colors duration-200 cursor-pointer focus:outline-none py-1 relative',
              activeSectionId === nav.id
                ? 'text-dark-text light:text-warm-900 font-semibold nav-dot-active'
                : 'text-dark-muted light:text-warm-600 hover:text-dark-text light:hover:text-warm-900'
            ]"
          >
            <span>{{ t(`nav.${nav.key}`) }}</span>
          </button>
        </nav>

        <!-- ─── Language Toggle (ID / EN) ─── -->
        <div class="hidden lg:flex items-center gap-3 border-l border-thin pl-6">
          <button
            @click="toggleLang"
            class="text-[0.6875rem] font-mono tracking-widest text-dark-muted light:text-warm-600 hover:text-dark-text light:hover:text-warm-900 transition-colors cursor-pointer"
            title="Switch Language"
          >
            <span :class="lang === 'en' ? 'font-bold text-dark-text light:text-warm-900' : ''">EN</span>
            <span class="mx-1 opacity-40">/</span>
            <span :class="lang === 'id' ? 'font-bold text-dark-text light:text-warm-900' : ''">ID</span>
          </button>
        </div>

        <!-- ─── Mobile Right: Drawer Toggle ─── -->
        <div class="flex items-center gap-3 lg:hidden">
          <button
            @click="toggleLang"
            class="text-xs font-mono tracking-widest text-dark-muted light:text-warm-600 uppercase"
          >
            {{ lang }}
          </button>

          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 text-dark-muted light:text-warm-700 hover:text-dark-text light:hover:text-warm-900 focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            <X v-if="isMobileMenuOpen" class="w-5 h-5" />
            <Menu v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </BaseContainer>

    <!-- ─── Mobile Dropdown Drawer ─── -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden border-t border-thin bg-dark-bg light:bg-warm-50 px-6 py-6 space-y-3"
      >
        <button
          v-for="nav in navItems"
          :key="nav.id"
          @click="handleMobileNavClick(nav.id)"
          :class="[
            'flex items-center justify-between w-full py-2 text-xs font-mono uppercase tracking-wider transition-colors duration-200',
            activeSectionId === nav.id
              ? 'text-accent-navy font-bold'
              : 'text-dark-muted light:text-warm-600'
          ]"
        >
          <span>{{ t(`nav.${nav.key}`) }}</span>
          <span v-if="activeSectionId === nav.id" class="w-1.5 h-1.5 rounded-full bg-accent-navy"></span>
        </button>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { BaseContainer } from '@/components/base'
import { Menu, X } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const props = defineProps({
  activeSectionId: {
    type: String,
    default: 'home'
  }
})

const emit = defineEmits(['navigate'])

const { lang, t, setLanguage } = useI18n()
const isMobileMenuOpen = ref(false)

// 8 Sections presisi Referensi 0
const navItems = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'projects', key: 'projects' },
  { id: 'techstack', key: 'techStack' },
  { id: 'experience', key: 'experience' },
  { id: 'explore', key: 'explore' },
  { id: 'now', key: 'now' },
  { id: 'contact', key: 'contact' }
]

const scrollToSection = (sectionId) => {
  emit('navigate', sectionId)
}

const handleMobileNavClick = (sectionId) => {
  isMobileMenuOpen.value = false
  scrollToSection(sectionId)
}

const toggleLang = () => {
  setLanguage(lang.value === 'en' ? 'id' : 'en')
}
</script>
