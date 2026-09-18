<template>
  <DefaultLayout v-slot="{ activeSectionId, scrollToSection }">
    <div id="portfolio-sections">
      <!-- 01 — HOME / HERO -->
      <SectionHero />

      <!-- 02 — ABOUT -->
      <SectionAbout />

      <!-- 03 — SELECTED PROJECTS -->
      <SectionProjects />

      <!-- 04 — TECH STACK -->
      <SectionTechStack />

      <!-- 05 — EXPERIENCE -->
      <SectionExperience />

      <!-- 06 — GUESTBOOK -->
      <SectionGuestbook />
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SectionHero from '@/components/sections/SectionHero.vue'
import SectionAbout from '@/components/sections/SectionAbout.vue'
import SectionProjects from '@/components/sections/SectionProjects.vue'
import SectionTechStack from '@/components/sections/SectionTechStack.vue'
import SectionExperience from '@/components/sections/SectionExperience.vue'
import SectionGuestbook from '@/components/sections/SectionGuestbook.vue'
</script>
