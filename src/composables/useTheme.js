import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'ilham_portfolio_theme'
const isDarkState = ref(false)
const isInitialized = ref(false)

export function useTheme() {
  /**
   * Mengaplikasikan class 'dark' ke elemen <html>
   */
  const applyTheme = (dark) => {
    isDarkState.value = dark
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  /**
   * Inisialisasi tema dari localStorage atau prefers-color-scheme
   */
  const initTheme = () => {
    if (isInitialized.value) return

    let preferredDark = false
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEY)
      if (savedTheme) {
        preferredDark = savedTheme === 'dark'
      } else {
        preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    }

    applyTheme(preferredDark)
    isInitialized.value = true
  }

  /**
   * Berpindah antara mode Light & Dark
   */
  const toggleTheme = () => {
    const nextDark = !isDarkState.value
    applyTheme(nextDark)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, nextDark ? 'dark' : 'light')
    }
  }

  /**
   * Mengatur tema secara spesifik ('light' | 'dark')
   */
  const setTheme = (themeName) => {
    const nextDark = themeName === 'dark'
    applyTheme(nextDark)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, themeName)
    }
  }

  // Otomatis init saat composable dipanggil pertama kali
  if (typeof window !== 'undefined' && !isInitialized.value) {
    initTheme()
  }

  return {
    isDark: computed(() => isDarkState.value),
    theme: computed(() => (isDarkState.value ? 'dark' : 'light')),
    toggleTheme,
    setTheme,
    initTheme
  }
}
