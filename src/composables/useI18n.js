import { ref, computed } from 'vue'
import { en } from '@/locales/en'
import { id } from '@/locales/id'

const currentLang = ref('en') // Default: Full English as requested by user

const dictionaries = { en, id }

export function useI18n() {
  const t = (key) => {
    const keys = key.split('.')
    let result = dictionaries[currentLang.value]
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k]
      } else {
        // Fallback to English dictionary if key not found in active locale
        let fallback = dictionaries.en
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk]
          } else {
            return key
          }
        }
        return fallback
      }
    }
    return result
  }

  const setLanguage = (lang) => {
    if (dictionaries[lang]) {
      currentLang.value = lang
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', lang)
      }
    }
  }

  return {
    lang: computed(() => currentLang.value),
    t,
    setLanguage
  }
}
