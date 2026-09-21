<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 w-full select-none transition-all duration-300',
      isScrolled
        ? 'backdrop-blur-xl bg-dark-bg/75 light:bg-warm-50/80 border-b border-white/[0.08] light:border-black/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.35)] light:shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
        : 'bg-transparent border-b border-transparent'
    ]"
  >
    <!-- ─── Horizontal Scroll Progress Bar on Top Edge of Navbar ─── -->
    <div class="absolute top-0 left-0 right-0 h-[2.5px] bg-white/[0.03] dark:bg-white/[0.02] overflow-hidden pointer-events-none">
      <div
        class="h-full bg-gradient-to-r from-accent-navy via-blue-400 to-accent-navy shadow-[0_0_10px_rgba(29,78,216,0.85)] transition-all duration-75 ease-out will-change-[width]"
        :style="{ width: `${scrollProgress}%` }"
      />
    </div>

    <BaseContainer size="wide" :padding="true">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- ─── Left Side: Accent Box + Branding (Presisi Referensi 0) ─── -->
        <a
          href="#home"
          @click.prevent="scrollToSection('home')"
          class="flex items-center gap-2.5 group focus:outline-none"
        >
          <!-- Brand Logo Image -->
          <img
            src="/logo.webp"
            alt="Ilham Logo"
            class="w-6 h-6 md:w-6.5 md:h-6.5 object-contain shrink-0 group-hover:scale-105 transition-transform duration-300 rounded-xs"
          />
          <span class="font-sans text-xs sm:text-sm font-medium tracking-tight text-dark-text/90 light:text-warm-800 group-hover:text-dark-text transition-colors">
            Ilham Mustaqim
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
        class="lg:hidden border-t border-thin bg-dark-bg/95 light:bg-warm-50/95 backdrop-blur-xl px-6 py-6 space-y-3"
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
import { ref, onMounted, onUnmounted } from 'vue'
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
const isScrolled = ref(false)
const scrollProgress = ref(0)
let ticking = false

// 6 Sections
const navItems = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'projects', key: 'projects' },
  { id: 'techstack', key: 'techStack' },
  { id: 'experience', key: 'experience' },
  { id: 'now', key: 'now' }
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

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY || window.pageYOffset
      isScrolled.value = scrollY > 20

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        scrollProgress.value = Math.min(Math.max((scrollY / docHeight) * 100, 0), 100)
      } else {
        scrollProgress.value = 0
      }

      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
