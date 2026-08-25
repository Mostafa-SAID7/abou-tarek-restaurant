<template>
  <DefaultLayout>
    <section class="page-hero relative flex min-h-[280px] items-center justify-center overflow-hidden bg-cover bg-center before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,rgba(15,4,4,.72)_0%,rgba(20,6,6,.85)_100%)]" :style="{ backgroundImage: 'url(/Homebg.png)' }" aria-label="News">
      <div class="page-hero-inner relative z-[1]">
        <span class="page-eyebrow">{{ t('كشري أبو طارق', 'Koshary Abou Tarek') }}</span>
        <h1 class="page-hero-title">{{ t('الأخبار', 'News') }}</h1>
        <p class="page-hero-sub">{{ t('آخر أخبار وإنجازات كشري أبو طارق', 'Latest news and achievements from Koshary Abou Tarek') }}</p>
      </div>
    </section>

    <div class="news-body bg-[var(--bg)]">
      <div class="content-inner">

        <!-- Featured article -->
        <article class="news-featured mb-8 grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border-[1.5px] border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 hover:border-primary min-[901px]:grid-cols-[300px_1fr]">
          <div class="featured-thumb flex h-full min-h-[160px] items-center justify-center min-[901px]:min-h-[220px]" :style="{ background: featuredNews.color }">
            <AppIcon :name="featuredNews.icon" :size="56" color="rgba(255,255,255,.85)" aria-hidden="true" />
          </div>
          <div class="featured-text p-6">
            <span class="news-tag mb-2 inline-block rounded-pill bg-primary-light px-2.5 py-0.5 text-[.72rem] font-bold uppercase tracking-[.05em] text-primary">{{ t(featuredNews.tagAr, featuredNews.tagEn) }}</span>
            <h2 class="my-2 mb-3 text-[1.3rem] font-black leading-[1.35] text-[var(--text)]">{{ t(featuredNews.titleAr, featuredNews.titleEn) }}</h2>
            <p class="mb-3 text-[.88rem] leading-[1.75] text-[var(--text-muted)]">{{ t(featuredNews.excerptAr, featuredNews.excerptEn) }}</p>
            <span class="news-date text-[.75rem] text-[var(--text-muted)]">{{ featuredNews.date }}</span>
          </div>
        </article>

        <!-- All articles grid -->
        <div class="all-news-grid grid grid-cols-1 gap-4 min-[641px]:grid-cols-2 min-[901px]:grid-cols-3">
          <article v-for="a in allNews" :key="a.id" class="news-card overflow-hidden rounded-2xl border-[1.5px] border-[var(--border)] bg-[var(--surface)] transition duration-200 hover:-translate-y-[3px] hover:border-primary hover:shadow-md">
            <div class="news-thumb flex aspect-video items-center justify-center bg-[linear-gradient(135deg,#1a0a0a,#2d1515)]">
              <AppIcon :name="a.icon" :size="32" color="rgba(255,255,255,.85)" aria-hidden="true" />
            </div>
            <div class="news-body-inner px-5 py-4">
              <span class="news-tag mb-2 inline-block rounded-pill bg-primary-light px-2.5 py-0.5 text-[.72rem] font-bold uppercase tracking-[.05em] text-primary">{{ t(a.tagAr, a.tagEn) }}</span>
              <h3 class="mb-2 text-[.9rem] font-extrabold leading-[1.4] text-[var(--text)]">{{ t(a.titleAr, a.titleEn) }}</h3>
              <p class="mb-3 text-[.8rem] leading-[1.6] text-[var(--text-muted)]">{{ t(a.excerptAr, a.excerptEn) }}</p>
              <span class="news-date text-[.75rem] text-[var(--text-muted)]">{{ a.date }}</span>
            </div>
          </article>
        </div>

      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AppIcon from '../components/AppIcon.vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/usePageMeta'
import allNewsData from '../data/news.json'

const { t } = useLanguage()
usePageMeta({ title: 'الأخبار', description: 'Latest news from Koshary Abou Tarek' })

const featuredNews = allNewsData[0]
const allNews = allNewsData.slice(1)
</script>
