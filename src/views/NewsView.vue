<template>
  <DefaultLayout>
    <section class="page-hero" :style="{ backgroundImage: 'url(/Homebg.png)' }" aria-label="News">
      <div class="page-hero-inner">
        <span class="page-eyebrow">{{ t('كشري أبو طارق', 'Koshary Abou Tarek') }}</span>
        <h1 class="page-hero-title">{{ t('الأخبار', 'News') }}</h1>
        <p class="page-hero-sub">{{ t('آخر أخبار وإنجازات كشري أبو طارق', 'Latest news and achievements from Koshary Abou Tarek') }}</p>
      </div>
    </section>

    <div class="news-body">
      <div class="content-inner">

        <!-- Featured article -->
        <article class="news-featured">
          <div class="featured-thumb" :style="{ background: featuredNews.color }">
            <AppIcon :name="featuredNews.icon" :size="56" color="rgba(255,255,255,.85)" aria-hidden="true" />
          </div>
          <div class="featured-text">
            <span class="news-tag">{{ t(featuredNews.tagAr, featuredNews.tagEn) }}</span>
            <h2>{{ t(featuredNews.titleAr, featuredNews.titleEn) }}</h2>
            <p>{{ t(featuredNews.excerptAr, featuredNews.excerptEn) }}</p>
            <span class="news-date">{{ featuredNews.date }}</span>
          </div>
        </article>

        <!-- All articles grid -->
        <div class="all-news-grid">
          <article v-for="a in allNews" :key="a.id" class="news-card">
            <div class="news-thumb">
              <AppIcon :name="a.icon" :size="32" color="rgba(255,255,255,.85)" aria-hidden="true" />
            </div>
            <div class="news-body-inner">
              <span class="news-tag">{{ t(a.tagAr, a.tagEn) }}</span>
              <h3>{{ t(a.titleAr, a.titleEn) }}</h3>
              <p>{{ t(a.excerptAr, a.excerptEn) }}</p>
              <span class="news-date">{{ a.date }}</span>
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

<style scoped>
.page-hero {
  position: relative; overflow: hidden;
  background-size: cover; background-position: center;
  min-height: 280px; display: flex; align-items: center; justify-content: center;
}
.page-hero::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(15,4,4,.72) 0%, rgba(20,6,6,.85) 100%);
}
.page-hero-inner { position: relative; z-index: 1; }
.news-body { background: var(--bg); }

/* Featured */
.news-featured {
  display:grid; grid-template-columns:300px 1fr; gap:var(--sp-8);
  background:var(--surface); border:1.5px solid var(--border);
  border-radius:var(--r-2xl); overflow:hidden; margin-bottom:var(--sp-8);
  transition:border-color .2s; align-items:center;
}
.news-featured:hover { border-color:var(--primary); }
.featured-thumb { background:linear-gradient(135deg,#1a0a0a,#3d1515); display:flex; align-items:center; justify-content:center; height:100%; min-height:220px; }
.featured-text { padding:var(--sp-6); }
.featured-text h2 { font-size:1.3rem; font-weight:900; color:var(--text); margin:var(--sp-2) 0 var(--sp-3); line-height:1.35; }
.featured-text p  { font-size:.88rem; color:var(--text-muted); line-height:1.75; margin:0 0 var(--sp-3); }

.news-tag { display:inline-block; font-size:.72rem; font-weight:700; color:var(--primary); background:var(--primary-light); padding:2px 10px; border-radius:var(--r-pill); text-transform:uppercase; letter-spacing:.05em; margin-bottom:var(--sp-2); }
.news-date { font-size:.75rem; color:var(--text-muted); }

/* Grid */
.all-news-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--sp-4); }
.news-card { background:var(--surface); border:1.5px solid var(--border); border-radius:var(--r-2xl); overflow:hidden; transition:border-color .2s,box-shadow .2s,transform .2s; }
.news-card:hover { border-color:var(--primary); box-shadow:var(--shadow-md); transform:translateY(-3px); }
.news-thumb { aspect-ratio:16/9; background:linear-gradient(135deg,#1a0a0a,#2d1515); display:flex; align-items:center; justify-content:center; }
.news-body-inner { padding:var(--sp-4) var(--sp-5); }
.news-body-inner h3 { font-size:.9rem; font-weight:800; color:var(--text); margin:0 0 var(--sp-2); line-height:1.4; }
.news-body-inner p  { font-size:.8rem; color:var(--text-muted); line-height:1.6; margin:0 0 var(--sp-3); }

@media(max-width:900px){ .all-news-grid{grid-template-columns:1fr 1fr} .news-featured{grid-template-columns:1fr} .featured-thumb{min-height:160px} }
@media(max-width:640px){ .all-news-grid{grid-template-columns:1fr} }
</style>
