<template>
  <div class="min-h-screen flex flex-col bg-dark-bg text-dark-text light:bg-warm-50 light:text-warm-900 transition-colors duration-300 relative overflow-x-hidden">
    <!-- Architectural Grid & Luminous Spine Background -->
    <ArchitecturalGridBackground />

    <!-- Sticky Navigation Bar (Branding & 8 Section Links) -->
    <AppNavbar
      :activeSectionId="activeSectionId"
      @navigate="scrollToSection"
    />

    <!-- Main Content Body Slot -->
    <div class="grow relative z-10 pt-16 md:pt-20">
      <slot
        :activeSectionId="activeSectionId"
        :scrollToSection="scrollToSection"
      />
    </div>

    <!-- Editorial Slim Footer -->
    <AppFooter class="relative z-10" />
  </div>
</template>

<script setup>
import { AppNavbar, AppFooter, ArchitecturalGridBackground } from '@/components/layout'
import { useActiveSection } from '@/composables/useActiveSection'

const { activeSectionId, scrollToSection } = useActiveSection()
</script>
