<template>
  <span
    class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-dark-bg/90 light:bg-warm-50 text-dark-text/90 light:text-warm-900 border border-thin text-[0.625rem] font-mono tracking-tight transition-colors duration-150 select-none shrink-0"
  >
    <!-- 1. External jsDelivr CDN SVG icon (Devicon) -->
    <img
      v-if="iconInfo.type === 'cdn'"
      :src="iconInfo.url"
      :alt="tool"
      loading="lazy"
      class="w-3.5 h-3.5 object-contain shrink-0"
      :class="{ 'dark:invert': iconInfo.invertInDark }"
    />

    <!-- 2. Specialized SVG Icons (BLoC, REST API, Dio, Clean Architecture, etc. as in screenshot) -->
    <!-- BLoC (Flow/State nodes in purple) -->
    <svg
      v-else-if="iconInfo.type === 'bloc'"
      class="w-3.5 h-3.5 text-indigo-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" />
      <rect x="9" y="15" width="6" height="6" rx="1.5" />
      <path d="M6 9v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9" />
      <path d="M12 13v2" />
    </svg>

    <!-- REST API (Dual horizontal server ports in emerald) -->
    <svg
      v-else-if="iconInfo.type === 'rest-api'"
      class="w-3.5 h-3.5 text-emerald-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="2" y="4" width="20" height="6" rx="2" />
      <rect x="2" y="14" width="20" height="6" rx="2" />
      <circle cx="6" cy="7" r="0.75" fill="currentColor" />
      <circle cx="6" cy="17" r="0.75" fill="currentColor" />
      <line x1="14" y1="7" x2="18" y2="7" />
      <line x1="14" y1="17" x2="18" y2="17" />
    </svg>

    <!-- Clean Architecture / Architecture Layers -->
    <svg
      v-else-if="iconInfo.type === 'clean-arch'"
      class="w-3.5 h-3.5 text-zinc-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="9" y1="9" x2="15" y2="15" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </svg>

    <!-- Dio (HTTP package box) -->
    <svg
      v-else-if="iconInfo.type === 'dio'"
      class="w-3.5 h-3.5 text-zinc-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="9" y1="9" x2="15" y2="15" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </svg>

    <!-- Midtrans (Payment/Card in sky) -->
    <svg
      v-else-if="iconInfo.type === 'payment'"
      class="w-3.5 h-3.5 text-sky-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>

    <!-- Storage / Database (localStorage / IndexedDB) -->
    <svg
      v-else-if="iconInfo.type === 'storage'"
      class="w-3.5 h-3.5 text-amber-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>

    <!-- FIFO Logic / Queue -->
    <svg
      v-else-if="iconInfo.type === 'queue'"
      class="w-3.5 h-3.5 text-orange-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <polyline points="16 3 19 6 16 9" />
    </svg>

    <!-- Responsive UI -->
    <svg
      v-else-if="iconInfo.type === 'responsive'"
      class="w-3.5 h-3.5 text-purple-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>

    <!-- Text editor / Tiptap -->
    <svg
      v-else-if="iconInfo.type === 'editor'"
      class="w-3.5 h-3.5 text-teal-400 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>

    <!-- Default generic code tag -->
    <svg
      v-else
      class="w-3.5 h-3.5 text-accent-navy shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>

    <!-- Tool Name Text -->
    <span>{{ tool }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tool: {
    type: String,
    required: true
  }
})

// Pemetaan teknologi ke icon CDN jsDelivr (Devicon) atau SVG khusus sesuai mockup
const iconInfo = computed(() => {
  const t = props.tool.toLowerCase().trim()

  // 1. Flutter
  if (t.includes('flutter')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg'
    }
  }

  // 2. Dart
  if (t === 'dart' || t.includes('dart')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg'
    }
  }

  // 3. Firebase
  if (t.includes('firebase')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
    }
  }

  // 4. BLoC
  if (t.includes('bloc')) {
    return { type: 'bloc' }
  }

  // 5. REST API
  if (t.includes('rest') || t.includes('api')) {
    return { type: 'rest-api' }
  }

  // 6. Clean Architecture
  if (t.includes('clean') || t.includes('architecture')) {
    return { type: 'clean-arch' }
  }

  // 7. Dio
  if (t === 'dio') {
    return { type: 'dio' }
  }

  // 8. Laravel
  if (t.includes('laravel')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'
    }
  }

  // 9. React / React.js
  if (t.includes('react')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    }
  }

  // 10. Vue / Vue.js / Vue 3
  if (t.includes('vue')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
    }
  }

  // 11. Next.js
  if (t.includes('next')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      invertInDark: true
    }
  }

  // 12. Node.js
  if (t.includes('node')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    }
  }

  // 13. Express / Express.js
  if (t.includes('express')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      invertInDark: true
    }
  }

  // 14. PostgreSQL
  if (t.includes('postgres')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
    }
  }

  // 15. MySQL
  if (t.includes('mysql')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
    }
  }

  // 16. Supabase
  if (t.includes('supabase')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg'
    }
  }

  // 17. Tailwind / Tailwind CSS
  if (t.includes('tailwind')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
    }
  }

  // 18. JavaScript
  if (t.includes('javascript') || t === 'js') {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
    }
  }

  // 19. HTML5
  if (t.includes('html')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
    }
  }

  // 20. CSS3
  if (t.includes('css')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
    }
  }

  // 21. GitHub Actions / CI/CD
  if (t.includes('github') || t.includes('ci/cd')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg'
    }
  }

  // 22. Swagger
  if (t.includes('swagger')) {
    return {
      type: 'cdn',
      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg'
    }
  }

  // 23. Midtrans
  if (t.includes('midtrans')) {
    return { type: 'payment' }
  }

  // 24. Storage (localStorage / IndexedDB)
  if (t.includes('storage') || t.includes('indexeddb')) {
    return { type: 'storage' }
  }

  // 25. FIFO Logic
  if (t.includes('fifo')) {
    return { type: 'queue' }
  }

  // 26. Tiptap
  if (t.includes('tiptap')) {
    return { type: 'editor' }
  }

  // 27. Responsive UI
  if (t.includes('responsive')) {
    return { type: 'responsive' }
  }

  // Fallback
  return { type: 'generic' }
})
</script>
