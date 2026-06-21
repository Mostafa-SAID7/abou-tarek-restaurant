<template>
  <DefaultLayout>

    <!-- ══ HERO — full-screen video (exact match to official site) ══ -->
    <section class="land-hero" aria-label="Hero">
      <!-- Video backgrounds -->
      <video
        ref="heroVideoDesktop"
        class="hero-video hero-video-desktop"
        autoplay muted loop playsinline
        poster="/hero-bg.webp"
      >
        <source src="https://cdn.jsdelivr.net/gh/innovationscope/website-videos@main/promo_final_colored_horizontal_compressed.m4v" type="video/mp4" />
      </video>
      <video
        ref="heroVideoMobile"
        class="hero-video hero-video-mobile"
        autoplay muted loop playsinline
        poster="/hero-bg.webp"
      >
        <source src="https://cdn.jsdelivr.net/gh/innovationscope/website-videos@main/promo_final_colored_vertical_compressed.m4v" type="video/mp4" />
      </video>

      <!-- Gradient overlay: transparent → #282828 (exact official gradient) -->
      <div class="hero-gradient-overlay"></div>

      <!-- Text content -->
      <div class="hero-content" :class="{ 'visible': heroVisible }">
        <p class="hero-welcome">{{ t('مرحبًا بكم في', 'Welcome to') }}</p>
        <h1 class="hero-empire">{{ t('إمبراطورية أبو طارق', 'The Empire of Abou Tarek') }}</h1>
      </div>
    </section>

    <!-- ══ ABOUT — hero character section (matches /about-us) ══ -->
    <section class="about-hero-section" :style="{ backgroundImage: 'url(/About-bg.webp)' }">
      <div class="about-hero-inner">
        <div class="about-char-wrap">
          <img src="/hero-section.webp" alt="" class="about-char-img" />
        </div>
        <p class="about-hero-eyebrow">{{ t('من نحن', 'About Us') }}</p>
        <h2 class="about-hero-title">{{ t('إمبراطورية الكشري المصري منذ الخمسينيات', 'Egypt\'s Koshary Empire Since the 1950s') }}</h2>
        <p class="about-hero-desc">{{ t(
          'في الخمسينيات، انطلقت قصة كشري أبو طارق من عربة صغيرة في شوارع وسط القاهرة. بوصفة سرية وحب أصيل لإطعام الناس، نجح أبو طارق في تحويل أكلة شعبية بسيطة إلى تجربة لا تُنسى. اليوم، يستقبل المطعم الأسطوري من 4 طوابق الزوار يومياً من كل أنحاء العالم.',
          'In the 1950s, Koshary Abou Tarek\'s story began with a small cart on the streets of Downtown Cairo. With a secret recipe and a genuine love for feeding people, Abou Tarek transformed a simple folk dish into an unforgettable experience. Today, the legendary 4-story restaurant welcomes visitors daily from all over the world.'
        ) }}</p>
        <router-link to="/about" class="about-hero-btn">
          {{ t('اقرأ أكثر', 'Read More') }}
        </router-link>
      </div>
      <div class="about-hero-dark"></div>
    </section>

    <!-- ══ SEPARATORS ══ -->
    <!-- Desktop: masked separator -->
    <div class="separator-desktop" aria-hidden="true">
      <div class="separator-masked" :style="{
        backgroundImage: 'url(/MainHomeSeparator.webp)',
        maskImage: 'url(/HomeSeparator2.png)',
        WebkitMaskImage: 'url(/HomeSeparator2.png)'
      }"></div>
    </div>
    <!-- Mobile -->
    <div class="separator-mobile" aria-hidden="true">
      <img src="/separator.png" alt="" class="separator-mobile-img" />
    </div>

    <!-- ══ FEATURED NEWS — driven by featured.json ══ -->
    <div class="featured-news-wrap">
      <article
        v-for="(article, idx) in featuredArticles"
        :key="article.id"
        class="featured-article"
        :class="`featured-article-${article.id}`"
      >
        <template v-if="idx % 2 === 0">
          <div class="featured-text">
            <h2 class="featured-title">{{ isAR ? article.titleAr : article.titleEn }}</h2>
            <p class="featured-desc">{{ isAR ? article.descAr : article.descEn }}</p>
            <router-link :to="article.link" class="featured-btn">{{ t('اقرأ أكثر', 'Read More') }}</router-link>
          </div>
          <div class="featured-image">
            <img :src="article.image" alt="" class="featured-img" />
          </div>
        </template>
        <template v-else>
          <div class="featured-image">
            <img :src="article.image" alt="" class="featured-img" />
          </div>
          <div class="featured-text">
            <h2 class="featured-title">{{ isAR ? article.titleAr : article.titleEn }}</h2>
            <p class="featured-desc">{{ isAR ? article.descAr : article.descEn }}</p>
            <router-link :to="article.link" class="featured-btn">{{ t('اقرأ أكثر', 'Read More') }}</router-link>
          </div>
        </template>
      </article>
    </div>

    <!-- ══ NEWS GRID ══ -->
    <section class="news-section" aria-labelledby="news-heading">
      <div class="news-inner">
        <div class="news-header">
          <p class="news-eyebrow">{{ t('آخر الأخبار', 'Recent News') }}</p>
          <h2 id="news-heading" class="news-main-title">{{ t('أخبار أبو طارق', 'Abou Tarek News') }}</h2>
        </div>
        <div class="news-grid">
          <article v-for="article in newsItems" :key="article.id" class="news-card">
            <div class="news-card-thumb">
              <div class="news-card-thumb-inner" :style="{ background: article.color }">
                <AppIcon :name="article.icon" :size="28" color="rgba(255,255,255,.85)" aria-hidden="true" />
              </div>
            </div>
            <div class="news-card-body">
              <div class="news-card-top">
                <h3 class="news-card-title">{{ t(article.titleAr, article.titleEn) }}</h3>
                <svg class="news-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  :class="{ 'rotated': isAR }">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#1D1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <p class="news-card-desc">{{ t(article.excerptAr, article.excerptEn) }}</p>
            </div>
          </article>
        </div>
        <div class="news-more">
          <router-link to="/news" class="news-more-btn">{{ t('كل الأخبار', 'View All News') }}</router-link>
        </div>
      </div>
    </section>

    <!-- ══ VR / EXPERIENCE CTA ══ -->
    <section class="vr-section">
      <div class="vr-inner" :style="{ backgroundImage: 'url(/VRbg.webp)' }">
        <div class="vr-content">
          <h2 class="vr-title">{{ t('اكتشف تجربة كشري أبو طارق', 'Experience Koshary Abou Tarek') }}</h2>
          <p class="vr-desc">{{ t(
            'زور مطعمنا الأسطوري في قلب وسط القاهرة واكتشف سر الوصفة التي أبهرت ملايين الزوار من أنحاء العالم.',
            'Visit our legendary restaurant in the heart of Downtown Cairo and discover the secret recipe that has amazed millions of visitors from around the world.'
          ) }}</p>
          <a href="https://storage.net-fs.com/hosting/7825364/32/" target="_blank" rel="noopener" class="vr-btn">
            {{ t('تفضل بزيارتنا', 'Visit Us') }}
          </a>
        </div>
      </div>
    </section>

    <!-- ══ STATS ══ -->
    <section class="stats-section">
      <div class="stats-inner">
        <template v-for="(stat, i) in landingStats" :key="stat.value">
          <div class="stat-item">
            <span class="stat-num">{{ stat.value }}</span>
            <span class="stat-lbl">{{ t(stat.labelAr, stat.labelEn) }}</span>
          </div>
          <div v-if="i < landingStats.length - 1" class="stat-divider" aria-hidden="true"></div>
        </template>
      </div>
    </section>

    <!-- ══ REVIEWS / TESTIMONIALS ══ -->
    <section class="reviews-section">
      <div class="reviews-header">
        <p class="reviews-eyebrow">{{ t('آراء عملائنا', 'Client Testimonials') }}</p>
        <h2 class="reviews-title">{{ t('ماذا يقولون عنّا', 'What They Say About Us') }}</h2>
      </div>
      <div class="reviews-track-wrap" :style="{ backgroundImage: 'url(/Testimonialsbg.png)' }">
        <div class="reviews-overlay"></div>
        <div class="reviews-track" ref="reviewsTrack"
          :style="{ transform: `translateX(${isAR ? reviewOffset : -reviewOffset}px)` }">
          <div v-for="(r, i) in reviews" :key="i" class="review-card">
            <p class="review-text">"{{ t(r.textAr, r.textEn) }}"</p>
            <div class="review-footer">
              <div class="review-stars">
                <span v-for="s in 5" :key="s" class="star" :class="{ filled: s <= r.rating }">★</span>
              </div>
              <div class="review-author">
                <span class="review-name">{{ r.name }}</span>
                <span class="review-role">{{ t(r.roleAr, r.roleEn) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="reviews-nav">
          <button class="rev-btn" @click="prevReview" :disabled="reviewIndex === 0" :aria-label="t('السابق','Previous')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <button class="rev-btn" @click="nextReview" :disabled="reviewIndex >= maxIndex" :aria-label="t('التالي','Next')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
    </section>

  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AppIcon from '../components/AppIcon.vue'
import { useLanguage } from '../composables/useLanguage'
import { usePageMeta } from '../composables/usePageMeta'
import allNewsData from '../data/news.json'
import reviewsData from '../data/reviews.json'
import statsData from '../data/stats.json'
import featuredArticles from '../data/featured.json'

const { t, isAR } = useLanguage()
usePageMeta({ title: 'إمبراطورية أبو طارق', description: 'Koshary Abou Tarek — Egypt\'s legendary koshary since the 1950s' })

const heroVisible = ref(false)
onMounted(() => setTimeout(() => { heroVisible.value = true }, 80))

const newsItems = allNewsData.slice(0, 3)
const reviews   = reviewsData
const landingStats = statsData.landing

const reviewIndex = ref(0)
const cardWidth = 360 + 16
const maxIndex = computed(() => Math.max(0, reviews.length - 2))
const reviewOffset = computed(() => reviewIndex.value * cardWidth)

function nextReview() { if (reviewIndex.value < maxIndex.value) reviewIndex.value++ }
function prevReview() { if (reviewIndex.value > 0) reviewIndex.value-- }
</script>

<style scoped>
/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
.land-hero {
  position: relative; overflow: hidden;
  height: 100vh; min-height: 600px;
  display: flex; align-items: center; justify-content: center;
  /* Pull hero up to fill under the transparent fixed navbar */
  margin-top: -72px;
}
@media (max-width: 640px) {
  .land-hero { margin-top: -60px; }
}
.hero-video {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; z-index: 0;
  pointer-events: none;
}
.hero-video-desktop { display: block; }
.hero-video-mobile  { display: none; }
@media (max-width: 768px) {
  .hero-video-desktop { display: none; }
  .hero-video-mobile  { display: block; }
}
.hero-gradient-overlay {
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, #282828 100%);
}
.hero-content {
  position: relative; z-index: 2;
  text-align: center; padding: 0 var(--sp-6);
  opacity: 0; transform: translateY(20px);
  transition: opacity .8s ease, transform .8s ease;
}
.hero-content.visible { opacity: 1; transform: translateY(0); }
.hero-welcome {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 300; color: #fff;
  font-family: 'Poppins', 'Cairo', sans-serif;
  margin-bottom: var(--sp-3); letter-spacing: .04em;
}
.hero-empire {
  font-size: clamp(2.5rem, 8vw, 6.25rem);
  font-weight: 300; color: #fff;
  line-height: 1.1; margin: 0;
  font-family: 'Cairo', sans-serif;
}

/* ══════════════════════════════════════════════
   ABOUT HERO SECTION
══════════════════════════════════════════════ */
.about-hero-section {
  position: relative; overflow: hidden;
  background-size: cover; background-position: center; background-repeat: no-repeat;
  background-color: #1a0a0a;
  padding: clamp(60px, 10vw, 160px) var(--sp-6) clamp(80px, 14vw, 200px);
  display: flex; align-items: center; justify-content: center;
}
.about-hero-dark {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,.3), rgba(10,3,3,.7));
  pointer-events: none;
}
.about-hero-inner {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  max-width: 800px;
}
.about-char-wrap { margin-bottom: var(--sp-6); }
.about-char-img {
  width: clamp(200px, 28vw, 350px);
  height: auto; object-fit: contain;
  filter: drop-shadow(0 16px 40px rgba(0,0,0,.5));
}
.about-hero-eyebrow {
  font-size: 1.1rem; font-weight: 400;
  color: rgba(255,255,255,.9);
  font-family: 'Poppins', sans-serif; letter-spacing: .06em;
  margin-bottom: var(--sp-3);
}
.about-hero-title {
  font-size: clamp(1.6rem, 4vw, 3.125rem);
  font-weight: 400; color: #FEFEFE;
  line-height: 1.2; margin: 0 0 var(--sp-6);
  font-family: 'Cairo', sans-serif;
}
.about-hero-desc {
  font-size: clamp(.9rem, 1.5vw, 1.125rem);
  font-weight: 400; color: rgba(255,255,255,.85);
  line-height: 1.8; max-width: 620px;
  font-family: 'Poppins', sans-serif;
  margin-bottom: var(--sp-8);
}
.about-hero-btn {
  display: inline-block;
  border: 1.5px solid #FEFEFE; color: #FEFEFE;
  border-radius: 7px; padding: 18px 80px;
  font-size: 1.125rem; font-weight: 500;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  transition: background .2s, color .2s;
}
.about-hero-btn:hover { background: #FEFEFE; color: #1D1B1B; }

/* ══════════════════════════════════════════════
   SEPARATORS
══════════════════════════════════════════════ */
.separator-desktop {
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; height: 450px;
  background: var(--bg);
}
.separator-masked {
  width: 100%; height: 100%;
  background-size: cover; background-position: top; background-repeat: no-repeat;
  -webkit-mask-size: contain; mask-size: contain;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
  -webkit-mask-position: center; mask-position: center;
}
.separator-mobile {
  display: none;
  padding: var(--sp-8) 0; text-align: center; background: var(--bg);
}
.separator-mobile-img {
  width: 80%; max-width: 340px; height: auto; object-fit: contain; margin: 0 auto;
  opacity: .6;
}
@media (max-width: 768px) {
  .separator-desktop { display: none; }
  .separator-mobile  { display: block; }
}

/* ══════════════════════════════════════════════
   FEATURED NEWS ARTICLES
══════════════════════════════════════════════ */
.featured-news-wrap { display: flex; flex-direction: column; gap: 0; }

.featured-article {
  display: flex; align-items: stretch;
  border-radius: 20px; overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  background: #fff; border: 1px solid #f0e0e0;
  min-height: 500px;
  max-width: 1200px; margin: 48px auto; width: calc(100% - 64px);
}
.featured-article-2 { flex-direction: row-reverse; }
html[dir="rtl"] .featured-article-1 { flex-direction: row-reverse; }
html[dir="rtl"] .featured-article-2 { flex-direction: row; }

.featured-text {
  flex: 0 0 55%; padding: clamp(32px, 5vw, 56px);
  display: flex; flex-direction: column; justify-content: center; gap: var(--sp-5);
}
.featured-title {
  font-size: clamp(1.3rem, 2.5vw, 2.5rem);
  font-weight: 500; color: #1D1B1B; line-height: 1.25;
  font-family: 'Cairo', sans-serif; margin: 0;
}
.featured-desc {
  font-size: clamp(.85rem, 1.4vw, 1.0625rem);
  color: #646363; line-height: 1.8;
  font-family: 'Poppins', sans-serif; margin: 0;
}
.featured-btn {
  display: inline-block; width: fit-content;
  border: 1.5px solid #1D1B1B; color: #1D1B1B;
  border-radius: 5px; padding: 18px 48px;
  font-size: 1.125rem; font-weight: 500;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  transition: background .2s, color .2s;
  margin-top: var(--sp-3);
}
.featured-btn:hover { background: #1D1B1B; color: #fff; }

.featured-image { flex: 0 0 45%; position: relative; min-height: 450px; overflow: hidden; }
.featured-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
}

@media (max-width: 768px) {
  .featured-article,
  .featured-article-2,
  html[dir="rtl"] .featured-article-1,
  html[dir="rtl"] .featured-article-2 {
    flex-direction: column; width: calc(100% - 32px); margin: 24px auto;
  }
  .featured-text { flex: none; }
  .featured-image { flex: none; min-height: 280px; }
}

/* ══════════════════════════════════════════════
   NEWS GRID
══════════════════════════════════════════════ */
.news-section { background: var(--bg); padding: 48px 0; }
.news-inner { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
.news-header { display: flex; flex-direction: column; align-items: center; margin-bottom: 32px; gap: 6px; text-align: center; }
.news-eyebrow { font-size: 1.1rem; font-weight: 400; color: #646363; font-family: 'Poppins', sans-serif; }
.news-main-title { font-size: clamp(2rem, 4vw, 3.125rem); font-weight: 400; color: #1D1B1B; font-family: 'Cairo', sans-serif; margin: 0; }
.news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.news-card {
  background: #FEFEFE; border-radius: 7px;
  display: flex; flex-direction: column;
  min-height: 450px;
  transition: box-shadow .2s, transform .2s;
  cursor: pointer;
}
.news-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,.12); transform: translateY(-3px); }
.news-card-thumb { width: 100%; aspect-ratio: 16/10; overflow: hidden; border-radius: 7px 7px 0 0; flex-shrink: 0; }
.news-card-thumb-inner {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.news-card-body { padding: 16px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.news-card-top { display: flex; justify-content: space-between; align-items: flex-start; width: 100%; }
.news-card-title { font-size: 1.1rem; font-weight: 800; color: #1D1B1B; font-family: 'Poppins', 'Cairo', sans-serif; line-height: 1.3; width: 80%; }
.news-arrow { flex-shrink: 0; }
.news-arrow.rotated { transform: rotate(-90deg); }
.news-card-desc { font-size: .95rem; color: #808080; font-family: 'Poppins', sans-serif; line-height: 1.6; }
.news-more { display: flex; justify-content: center; margin-top: 32px; }
.news-more-btn {
  border: 1.5px solid #1D1B1B; color: #1D1B1B;
  border-radius: 5px; padding: 18px 96px;
  font-size: 1.125rem; font-weight: 500;
  font-family: 'Poppins', sans-serif; text-decoration: none;
  transition: background .2s, color .2s; display: inline-block;
}
.news-more-btn:hover { background: #1D1B1B; color: #fff; }
@media (max-width: 768px) { .news-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 540px) { .news-grid { grid-template-columns: 1fr; } }

/* ══════════════════════════════════════════════
   VR / CTA SECTION
══════════════════════════════════════════════ */
.vr-section { display: flex; justify-content: center; padding: 24px; }
.vr-inner {
  width: 90%; max-width: 1100px; border-radius: 20px; overflow: hidden;
  background-size: cover; background-position: center; background-repeat: no-repeat;
  background-color: #1D1B1B;
  padding: clamp(48px, 8vw, 96px) var(--sp-8);
  box-shadow: 0 12px 40px rgba(0,0,0,.2);
}
.vr-content { display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--sp-5); }
.vr-title {
  font-size: clamp(1.6rem, 3.5vw, 2.5rem);
  font-weight: 400; color: #FEFEFE;
  font-family: 'Cairo', sans-serif; margin: 0;
}
.vr-desc {
  font-size: clamp(.9rem, 1.4vw, 1.125rem);
  color: rgba(255,255,255,.85);
  max-width: 600px; line-height: 1.8;
  font-family: 'Poppins', sans-serif; margin: 0;
}
.vr-btn {
  display: inline-block;
  border: 1.5px solid #FEFEFE; color: #FEFEFE;
  border-radius: 7px; padding: 18px 80px;
  font-size: 1.125rem; font-weight: 500;
  font-family: 'Poppins', sans-serif; text-decoration: none;
  transition: background .2s, color .2s; margin-top: var(--sp-3);
}
.vr-btn:hover { background: #FEFEFE; color: #1D1B1B; }

/* ══════════════════════════════════════════════
   STATS
══════════════════════════════════════════════ */
.stats-section { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.stats-inner {
  max-width: 1100px; margin: 0 auto; padding: 48px 32px;
  display: flex; align-items: center; justify-content: center; gap: 0;
  flex-wrap: wrap;
}
.stat-item { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 48px; }
.stat-num { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 700; color: var(--primary); font-family: 'Cairo', sans-serif; line-height: 1; }
.stat-lbl { font-size: .9rem; color: #646363; font-family: 'Poppins', sans-serif; text-align: center; }
.stat-divider { width: 1px; height: 60px; background: var(--border); }
@media (max-width: 640px) {
  .stat-divider { display: none; }
  .stat-item { padding: 16px 24px; }
}

/* ══════════════════════════════════════════════
   REVIEWS
══════════════════════════════════════════════ */
.reviews-section { background: var(--bg); padding: 48px 0 0; }
.reviews-header { text-align: center; margin-bottom: 32px; padding: 0 32px; }
.reviews-eyebrow { font-size: 1.1rem; color: #646363; font-family: 'Poppins', sans-serif; margin-bottom: 6px; }
.reviews-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; color: #1D1B1B; font-family: 'Cairo', sans-serif; margin: 0; }

.reviews-track-wrap {
  position: relative; overflow: hidden;
  min-height: 400px;
  background-size: cover; background-position: center;
  background-color: #1D1B1B;
  padding: 40px 0;
}
.reviews-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.4); pointer-events: none;
}
.reviews-track {
  position: relative; z-index: 1;
  display: flex; gap: 16px;
  padding: 0 40px;
  transition: transform .5s ease;
}
.review-card {
  flex-shrink: 0; width: 360px;
  background: #fff; border-radius: 16px;
  padding: 32px; box-shadow: 0 8px 24px rgba(0,0,0,.12);
  display: flex; flex-direction: column; justify-content: space-between; gap: 20px;
}
.review-text { font-size: .95rem; color: #1D1B1B; line-height: 1.8; font-family: 'Poppins', 'Cairo', sans-serif; font-style: italic; }
.review-footer { display: flex; flex-direction: column; gap: 8px; }
.review-stars { display: flex; gap: 2px; }
.star { font-size: 1.1rem; color: #d1d1d1; }
.star.filled { color: #FBBF24; }
.review-author { display: flex; flex-direction: column; }
.review-name { font-weight: 700; font-size: .95rem; color: #1D1B1B; }
.review-role { font-size: .8rem; color: #808080; }
.reviews-nav {
  position: relative; z-index: 1;
  display: flex; justify-content: center; gap: 16px; padding: 24px 0;
}
.rev-btn {
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,.15); border: 1.5px solid rgba(255,255,255,.4);
  color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .2s;
}
.rev-btn:hover:not(:disabled) { background: rgba(255,255,255,.3); }
.rev-btn:disabled { opacity: .35; cursor: not-allowed; }

/* ══════════════════════════════════════════════
   DARK MODE OVERRIDES
══════════════════════════════════════════════ */
[data-theme="dark"] .featured-article { background: var(--surface); border-color: var(--border); }
[data-theme="dark"] .featured-title   { color: var(--text); }
[data-theme="dark"] .featured-desc    { color: var(--text-muted); }
[data-theme="dark"] .featured-btn     { border-color: var(--text); color: var(--text); }
[data-theme="dark"] .featured-btn:hover { background: var(--text); color: var(--surface); }
[data-theme="dark"] .news-card        { background: var(--surface); }
[data-theme="dark"] .news-card-title  { color: var(--text); }
[data-theme="dark"] .news-card-desc   { color: var(--text-muted); }
[data-theme="dark"] .news-arrow path  { stroke: var(--text); }
[data-theme="dark"] .news-main-title  { color: var(--text); }
[data-theme="dark"] .news-more-btn    { border-color: var(--text); color: var(--text); }
[data-theme="dark"] .news-more-btn:hover { background: var(--text); color: var(--bg); }
[data-theme="dark"] .reviews-title    { color: var(--text); }
[data-theme="dark"] .stat-lbl         { color: var(--text-muted); }
[data-theme="dark"] .separator-mobile-img { opacity: .15; mix-blend-mode: screen; }
</style>
