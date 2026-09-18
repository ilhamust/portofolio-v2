import { ref, onMounted, onUnmounted } from 'vue'

const SECTION_IDS = ['home', 'about', 'projects', 'techstack', 'experience', 'now']

export function useActiveSection(sectionIds = SECTION_IDS) {
  const activeSectionId = ref(sectionIds[0] || 'home')
  let observer = null

  /**
   * Mendapatkan tinggi navbar secara akurat (80px desktop / 64px mobile)
   */
  const getNavOffset = () => {
    if (typeof document === 'undefined') return 80
    const header = document.querySelector('header')
    return header ? header.offsetHeight : 80
  }

  /**
   * Scroll handler presisi untuk mendeteksi posisi teratas (Home) & terbawah (Guestbook)
   */
  const handleScroll = () => {
    if (typeof window === 'undefined') return
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    const navOffset = getNavOffset()

    // 1. Jika pengguna berada di paling atas layar (Home/Hero Section)
    if (scrollY < navOffset + 40) {
      activeSectionId.value = sectionIds[0] || 'home'
      return
    }

    // 2. Jika pengguna berada di paling bawah halaman
    const windowHeight = window.innerHeight
    const fullHeight = document.documentElement.scrollHeight
    if (scrollY + windowHeight >= fullHeight - 40) {
      activeSectionId.value = sectionIds[sectionIds.length - 1] || 'now'
    }
  }

  /**
   * Mengatur IntersectionObserver untuk melacak section yang aktif di viewport saat scrolling
   */
  const initObserver = () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const options = {
      root: null,
      // Focus area presisi (15% top margin, 50% bottom margin)
      rootMargin: '-15% 0px -50% 0px',
      threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop
        const navOffset = getNavOffset()

        // Jangan override jika berada di area teratas (Home)
        if (scrollY < navOffset + 40) {
          activeSectionId.value = sectionIds[0] || 'home'
          return
        }

        if (entry.isIntersecting) {
          activeSectionId.value = entry.target.id
        }
      })
    }, options)

    // Daftarkan elemen-elemen section ke observer
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
      }
    })
  }

  /**
   * Fungsi untuk smooth scroll ke section tertentu secara presisi flush di bawah navbar
   */
  const scrollToSection = (sectionId) => {
    if (typeof window === 'undefined') return

    const el = document.getElementById(sectionId)
    if (el) {
      activeSectionId.value = sectionId

      // Dapatkan offset posisi elemen dikurangi tinggi tepat navbar melayang (bukan hardcoded 100px)
      const navOffset = getNavOffset()
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Update URL hash tanpa memicu sudden jump
      if (history.pushState) {
        history.pushState(null, null, `#${sectionId}`)
      } else {
        location.hash = `#${sectionId}`
      }
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    setTimeout(() => {
      initObserver()

      if (window.location.hash) {
        const initialId = window.location.hash.replace('#', '')
        if (sectionIds.includes(initialId)) {
          scrollToSection(initialId)
        }
      }
    }, 100)
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll)
    }
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    activeSectionId,
    scrollToSection,
    sectionIds
  }
}
