<template>
  <main class="py-12 md:py-20">
    <BaseContainer size="wide">
      <!-- ─── Header & Theme Toggle ────────────────────────────── -->
      <header class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-warm-200 dark:border-dark-border mb-12">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-mono uppercase tracking-widest text-warm-600 dark:text-dark-muted">
              01 / Design System Showcase
            </span>
            <BaseBadge variant="outline" dot dotColor="emerald">
              • AVAILABLE FOR SELECT PROJECTS
            </BaseBadge>
          </div>
          <h1 class="text-3xl md:text-5xl font-serif tracking-tight text-warm-900 dark:text-dark-text">
            Quiet Editorial Baseline
          </h1>
          <p class="text-sm md:text-base font-light text-warm-700 dark:text-dark-muted mt-2 max-w-xl">
            Sistem desain visual terkurasi untuk portofolio Ilham Mustaqim, terinspirasi dari referensi majalah digital monokrom & tipografi presisi.
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <BaseButton
            variant="outline"
            size="sm"
            @click="toggleTheme"
          >
            <template #iconLeft>
              <Sun v-if="isDark" class="w-3.5 h-3.5 text-amber-400" />
              <Moon v-else class="w-3.5 h-3.5 text-warm-700" />
            </template>
            {{ isDark ? 'Warm Dark Mode' : 'Warm Light Mode' }}
          </BaseButton>
        </div>
      </header>

      <!-- ─── Section 1: Typography Scale ──────────────────────── -->
      <section class="mb-16">
        <BaseDivider number="1" label="Typography Scale & Outline Text (Referensi 1)" align="left" spacing="sm" />

        <div class="space-y-6 bg-warm-100/50 dark:bg-dark-surface/50 p-6 md:p-8 rounded-lg border-thin">
          <div>
            <span class="text-[0.6875rem] font-mono text-warm-600 dark:text-dark-muted block mb-1">
              NEWSREADER SERIF DISPLAY — DISPLAY XL
            </span>
            <p class="text-display-xl text-warm-900 dark:text-dark-text">
              A Developer in Progress.
            </p>
          </div>

          <!-- Outline Text Demo (Terinspirasi Referensi 1 - Nathan Stampfli) -->
          <div>
            <span class="text-[0.6875rem] font-mono text-warm-600 dark:text-dark-muted block mb-1">
              EDITORIAL OUTLINE TEXT (INSPIRASI REFERENSI 1)
            </span>
            <p class="text-display-xl font-serif tracking-tight text-editorial-outline">
              CREATIVE DEVELOPER
            </p>
          </div>

          <BaseDivider spacing="sm" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span class="text-[0.6875rem] font-mono text-warm-600 dark:text-dark-muted block mb-1">
                INTER SANS-SERIF — BODY TEXT
              </span>
              <p class="text-sm font-sans text-warm-700 dark:text-dark-muted leading-relaxed">
                Membangun antarmuka web yang bermakna. Mengombinasikan ketelitian kode frontend dengan perhatian mendalam pada visual, hirarki teks, dan pengalaman pengguna.
              </p>
            </div>

            <div>
              <span class="text-[0.6875rem] font-mono text-warm-600 dark:text-dark-muted block mb-1">
                JETBRAINS MONO — META & NUMBERING
              </span>
              <p class="text-mono-number block mb-1">01 / FRONTEND ARCHITECTURE</p>
              <p class="text-mono-number block">PERIOD: 2024 — PRESENT</p>
              <code class="text-xs font-mono bg-warm-200/60 dark:bg-dark-border/60 px-2 py-1 rounded inline-block mt-2 text-warm-900 dark:text-dark-text">
                npm run dev --host
              </code>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── Section 2: Color Palette Swatches ────────────────── -->
      <section class="mb-16">
        <BaseDivider number="2" label="Warm Neutral Color Palette" align="left" spacing="sm" />

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div class="p-4 rounded-lg bg-warm-50 border-thin">
            <span class="text-xs font-mono font-medium text-warm-900 block">warm-50</span>
            <span class="text-[0.6875rem] font-mono text-warm-600 block">#faf9f6</span>
            <span class="text-[0.6875rem] text-warm-700 mt-2 block">Background</span>
          </div>

          <div class="p-4 rounded-lg bg-warm-100 border-thin">
            <span class="text-xs font-mono font-medium text-warm-900 block">warm-100</span>
            <span class="text-[0.6875rem] font-mono text-warm-600 block">#f4f1ea</span>
            <span class="text-[0.6875rem] text-warm-700 mt-2 block">Card Surface</span>
          </div>

          <div class="p-4 rounded-lg bg-warm-200 border-thin">
            <span class="text-xs font-mono font-medium text-warm-900 block">warm-200</span>
            <span class="text-[0.6875rem] font-mono text-warm-600 block">#e6e1d5</span>
            <span class="text-[0.6875rem] text-warm-700 mt-2 block">Thin Border</span>
          </div>

          <div class="p-4 rounded-lg bg-dark-bg text-dark-text border border-dark-border">
            <span class="text-xs font-mono font-medium block">dark-bg</span>
            <span class="text-[0.6875rem] font-mono text-dark-muted block">#121110</span>
            <span class="text-[0.6875rem] text-dark-muted mt-2 block">Dark Slate</span>
          </div>

          <div class="p-4 rounded-lg bg-dark-surface text-dark-text border border-dark-border">
            <span class="text-xs font-mono font-medium block">dark-surface</span>
            <span class="text-[0.6875rem] font-mono text-dark-muted block">#1a1917</span>
            <span class="text-[0.6875rem] text-dark-muted mt-2 block">Dark Card</span>
          </div>

          <div class="p-4 rounded-lg bg-warm-900 text-warm-50 border border-warm-900">
            <span class="text-xs font-mono font-medium block">warm-900</span>
            <span class="text-[0.6875rem] font-mono text-warm-300 block">#1c1b18</span>
            <span class="text-[0.6875rem] text-warm-300 mt-2 block">Deep Charcoal</span>
          </div>
        </div>
      </section>

      <!-- ─── Section 3: Base Component Showcase ──────────────── -->
      <section class="mb-16">
        <BaseDivider number="3" label="Base UI Components (Pill Badges & Buttons)" align="left" spacing="sm" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- BaseButton Variants -->
          <BaseCard hoverable>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-serif text-warm-900 dark:text-dark-text">BaseButton</h3>
                <BaseBadge variant="neutral">4 Variants</BaseBadge>
              </div>
            </template>

            <div class="space-y-4">
              <div class="flex flex-wrap items-center gap-3">
                <BaseButton variant="primary" size="sm">Primary SM</BaseButton>
                <BaseButton variant="primary" size="md">
                  VIEW PROJECTS
                  <template #iconRight>
                    <ArrowUpRight class="w-4 h-4" />
                  </template>
                </BaseButton>
                <BaseButton variant="outline" size="md">Outline MD</BaseButton>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <BaseButton variant="ghost" size="sm">Ghost Button</BaseButton>
                <BaseButton variant="link" size="md">
                  Editorial Underline Link
                  <template #iconRight>
                    <ArrowRight class="w-3.5 h-3.5" />
                  </template>
                </BaseButton>
              </div>

              <div class="flex items-center gap-3 pt-2">
                <BaseButton variant="outline" size="sm" href="https://github.com/ilhamust" external>
                  GitHub Profile
                  <template #iconRight>
                    <ExternalLink class="w-3.5 h-3.5" />
                  </template>
                </BaseButton>
              </div>
            </div>
          </BaseCard>

          <!-- BaseBadge Capsule Variants (Terinspirasi Referensi 4) -->
          <BaseCard hoverable>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-serif text-warm-900 dark:text-dark-text">BaseBadge (Capsule Shapes)</h3>
                <BaseBadge variant="accent">Pill Style</BaseBadge>
              </div>
            </template>

            <div class="space-y-4">
              <div class="flex flex-wrap items-center gap-2">
                <BaseBadge variant="neutral">VUE 3.5</BaseBadge>
                <BaseBadge variant="outline">TAILWIND V4</BaseBadge>
                <BaseBadge variant="subtle">QUIET EDITORIAL</BaseBadge>
                <BaseBadge variant="accent">FEATURED</BaseBadge>
              </div>

              <div class="flex flex-wrap items-center gap-3 pt-2">
                <BaseBadge variant="neutral" dot dotColor="emerald">AVAILABLE FOR WORK</BaseBadge>
                <BaseBadge variant="outline" dot dotColor="amber">LEARNING RUST</BaseBadge>
                <BaseBadge variant="subtle" dot dotColor="terracotta">REFLECTIVE MODE</BaseBadge>
              </div>
            </div>
          </BaseCard>
        </div>
      </section>

      <!-- ─── Section 4: Card Surface Variants ─────────────── -->
      <section class="mb-16">
        <BaseDivider number="4" label="BaseCard Surfaces & Grids (Referensi 2)" align="left" spacing="sm" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BaseCard variant="default" hoverable>
            <span class="text-xs font-mono uppercase tracking-wider text-warm-600 dark:text-dark-muted block mb-2">
              Default Surface
            </span>
            <h4 class="text-lg font-serif mb-2 text-warm-900 dark:text-dark-text">Card Surface Semi-Warm</h4>
            <p class="text-xs text-warm-700 dark:text-dark-muted leading-relaxed">
              Permukaan kartu hangat semi-transparan dengan garis tipis 1px dan efek blur halus.
            </p>
          </BaseCard>

          <BaseCard variant="outline" hoverable>
            <span class="text-xs font-mono uppercase tracking-wider text-warm-600 dark:text-dark-muted block mb-2">
              Outline Surface
            </span>
            <h4 class="text-lg font-serif mb-2 text-warm-900 dark:text-dark-text">Pure Transparent</h4>
            <p class="text-xs text-warm-700 dark:text-dark-muted leading-relaxed">
              Permukaan transparan dengan penekanan utama pada *thin border* minimalis.
            </p>
          </BaseCard>

          <BaseCard variant="flat">
            <span class="text-xs font-mono uppercase tracking-wider text-warm-600 dark:text-dark-muted block mb-2">
              Flat Surface
            </span>
            <h4 class="text-lg font-serif mb-2 text-warm-900 dark:text-dark-text">Flat Borderless</h4>
            <p class="text-xs text-warm-700 dark:text-dark-muted leading-relaxed">
              Permukaan kartu datar tanpa garis pemisah untuk kontainer sekunder.
            </p>
          </BaseCard>
        </div>
      </section>

      <!-- ─── Footer System Baseline ────────────────────────────── -->
      <footer class="pt-8 border-t border-warm-200 dark:border-dark-border text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-warm-600 dark:text-dark-muted">
        <p>© 2026 Ilham Mustaqim — Quiet Editorial Baseline</p>
        <p>Built with Vue 3.5 & Tailwind CSS v4</p>
      </footer>
    </BaseContainer>
  </main>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'
import {
  BaseContainer,
  BaseButton,
  BaseCard,
  BaseBadge,
  BaseDivider
} from '@/components/base'
import { Sun, Moon, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-vue-next'

const { isDark, toggleTheme } = useTheme()
</script>
