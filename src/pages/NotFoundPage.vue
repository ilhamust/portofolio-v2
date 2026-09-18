<template>
  <main class="min-h-screen bg-warm-50 dark:bg-dark-bg text-warm-900 dark:text-dark-text flex items-center justify-center px-6">
    <div class="text-center max-w-md">
      <span class="text-xs font-mono uppercase tracking-widest text-warm-600 dark:text-dark-muted mb-2 block">
        404 / Page Not Found
      </span>
      <h1 class="text-3xl font-sans font-bold mb-4">Halaman Tidak Ditemukan</h1>
      <p class="text-sm text-warm-700 dark:text-dark-muted mb-6">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <router-link to="/" class="inline-block px-4 py-2 border border-warm-200 dark:border-dark-border text-xs font-mono uppercase tracking-wider hover:bg-warm-100 dark:hover:bg-dark-surface transition-colors">
        Kembali ke Beranda
      </router-link>
    </div>
  </main>
</template>

<script setup>
</script>
