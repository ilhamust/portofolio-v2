import { ref, onMounted, onUnmounted } from 'vue'

const SECTION_IDS = ['home', 'about', 'projects', 'techstack', 'experience', 'explore', 'now', 'contact']

export function useActiveSection(sectionIds = SECTION_IDS) {
  const activeSectionId = ref(sectionIds[0] || 'home')
  let observer = null

  /**
   * Mengatur IntersectionObserver untuk melacak section yang aktif di viewport
   */
  const initObserver = () => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const options = {
      root: null,
      // Focus area di bagian tengah layar (20% top margin, 60% bottom margin)
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
   * Fungsi untuk smooth scroll ke section tertentu secara presisi
   */
  const scrollToSection = (sectionId) => {
    if (typeof window === 'undefined') return

    const el = document.getElementById(sectionId)
    if (el) {
      activeSectionId.value = sectionId

      // Dapatkan offset posisi elemen dikurangi tinggi navbar melayang
      const navOffset = 100
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
    // Inisialisasi observer setelah DOM siap
    setTimeout(() => {
      initObserver()

      // Jika ada hash di URL saat halaman pertama dimuat, scroll ke sana
      if (window.location.hash) {
        const initialId = window.location.hash.replace('#', '')
        if (sectionIds.includes(initialId)) {
          scrollToSection(initialId)
        }
      }
    }, 100)
  })

  onUnmounted(() => {
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
