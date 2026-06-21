<template>
  <DefaultLayout>

    <!-- ══ HERO ══ -->
    <section class="branches-hero" :style="{ backgroundImage: 'url(/About-bg.webp)' }" aria-label="Branches">
      <div class="branches-hero-overlay"></div>
      <div class="branches-hero-inner">
        <span class="hero-eyebrow">
          <AppIcon name="map-pin" :size="14" aria-hidden="true" />
          {{ t('فروعنا', 'Our Branches') }}
        </span>
        <h1 class="hero-title">
          <span lang="ar">فروع كشري أبو طارق</span>
          <span class="hero-en">Koshary Abou Tarek — Branches</span>
        </h1>
        <p class="hero-sub">{{ t('نخدمك في القاهرة والجيزة ودول الخليج — بنفس الوصفة الأصلية والجودة الأسطورية', 'Serving you across Cairo, Giza & the Gulf — same original recipe, same legendary quality') }}</p>
      </div>
    </section>

    <!-- ══ BRANCHES GRID ══ -->
    <div class="branches-body">
      <div class="branches-inner">

        <!-- Stats bar -->
        <div class="stats-bar">
          <div class="stat-chip">
            <AppIcon name="map-pin" :size="16" color="var(--primary)" aria-hidden="true" />
            <strong>{{ branches.length }}</strong>
            <span>{{ t('فرع', 'Branches') }}</span>
          </div>
          <div class="stat-chip">
            <AppIcon name="globe" :size="16" color="var(--primary)" aria-hidden="true" />
            <strong>3</strong>
            <span>{{ t('دول', 'Countries') }}</span>
          </div>
          <div class="stat-chip">
            <AppIcon name="clock" :size="16" color="var(--primary)" aria-hidden="true" />
            <strong>{{ t('٧٠+', '70+') }}</strong>
            <span>{{ t('سنة خبرة', 'Years') }}</span>
          </div>
        </div>

        <!-- Flagship branch — prominent card -->
        <div v-if="flagship" class="flagship-card">
          <div class="flagship-img-wrap">
            <img :src="flagship.images?.hero || '/branch1.png'" alt="" class="flagship-img" />
            <div class="flagship-img-overlay"></div>
          </div>
          <div class="flagship-body">
            <div class="flagship-badges">
              <span class="badge badge-gold">
                <AppIcon name="star-fill" :size="11" aria-hidden="true" />
                {{ t('الفرع الرئيسي', 'Flagship') }}
              </span>
              <span class="badge badge-guinness">
                <AppIcon name="trophy" :size="11" aria-hidden="true" />
                {{ t('موسوعة جينيس', 'Guinness Record') }}
              </span>
            </div>
            <h2 class="flagship-name">{{ t(flagship.name.ar, flagship.name.en) }}</h2>
            <p class="flagship-desc">{{ t(flagship.description.ar, flagship.description.en) }}</p>
            <div class="flagship-meta">
              <span class="meta-row">
                <AppIcon name="map-pin" :size="15" color="var(--primary)" aria-hidden="true" />
                {{ t(flagship.address.ar, flagship.address.en) }}
              </span>
              <span class="meta-row">
                <AppIcon name="clock" :size="15" color="var(--primary)" aria-hidden="true" />
                {{ t(flagship.hours.ar, flagship.hours.en) }}
              </span>
              <span class="meta-row">
                <AppIcon name="phone" :size="15" color="var(--primary)" aria-hidden="true" />
                <a :href="`tel:${flagship.contact}`" class="phone-link">{{ flagship.contact }}</a>
              </span>
            </div>
            <div v-if="flagship.delivery" class="flagship-delivery">
              <AppIcon name="truck" :size="14" aria-hidden="true" />
              {{ t('توصيل متاح — اتصل بـ', 'Delivery available — call') }}
              <a :href="`tel:${flagship.hotline}`" class="hotline-link">{{ flagship.hotline }}</a>
            </div>
          </div>
        </div>

        <!-- Other branches grid -->
        <h2 class="branches-section-title">{{ t('فروع أخرى', 'Other Branches') }}</h2>
        <div class="branches-grid">
          <article
            v-for="branch in otherBranches"
            :key="branch.id"
            class="branch-card"
          >
            <div class="branch-card-header">
              <div class="branch-icon-wrap">
                <AppIcon name="map-pin" :size="22" color="var(--primary)" aria-hidden="true" />
              </div>
              <div>
                <h3 class="branch-name">{{ t(branch.name.ar, branch.name.en) }}</h3>
                <span class="branch-area">{{ branch.area }}</span>
              </div>
            </div>

            <p class="branch-desc">{{ t(branch.description.ar, branch.description.en) }}</p>

            <div class="branch-details">
              <div class="branch-detail">
                <AppIcon name="map-pin" :size="14" color="var(--text-muted)" aria-hidden="true" />
                <span>{{ t(branch.address.ar, branch.address.en) }}</span>
              </div>
              <div class="branch-detail">
                <AppIcon name="clock" :size="14" color="var(--text-muted)" aria-hidden="true" />
                <span>{{ t(branch.hours.ar, branch.hours.en) }}</span>
              </div>
            </div>

            <div class="branch-footer">
              <span v-if="branch.delivery" class="delivery-badge">
                <AppIcon name="truck" :size="13" aria-hidden="true" />
                {{ t('توصيل', 'Delivery') }}
              </span>
              <a :href="`tel:${branch.hotline}`" class="branch-call">
                <AppIcon name="phone" :size="13" aria-hidden="true" />
                {{ branch.hotline }}
              </a>
            </div>
          </article>
        </div>

        <!-- International -->
        <div class="intl-banner">
          <div class="intl-icon"><AppIcon name="globe" :size="40" color="var(--primary)" aria-hidden="true" /></div>
          <div>
            <h3>{{ t('التوسع الدولي', 'International Expansion') }}</h3>
            <p>{{ t('فروع كشري أبو طارق تمتد إلى خارج مصر مع وجود في الإمارات العربية المتحدة والمملكة العربية السعودية — نحمل معنا طعم مصر الأصيل أينما كنا.', 'Koshary Abou Tarek expands beyond Egypt with a presence in the UAE and Saudi Arabia — bringing the authentic taste of Egypt wherever we go.') }}</p>
          </div>
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
import { computed } from 'vue'
import branchesData from '../data/branches.json'

const { t } = useLanguage()
usePageMeta({
  title: 'الفروع — Our Branches',
  description: 'Find a Koshary Abou Tarek branch near you across Cairo, Giza and beyond.'
})

const branches = branchesData
const flagship = computed(() => branches.find(b => b.flags?.isMainBranch))
const otherBranches = computed(() => branches.filter(b => !b.flags?.isMainBranch))
</script>

<style scoped>
/* ══ Hero ══ */
.branches-hero {
  position: relative; overflow: hidden;
  background-size: cover; background-position: center;
  min-height: 320px;
  display: flex; align-items: flex-end;
  padding: var(--sp-12) var(--sp-10) var(--sp-10);
}
.branches-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(15,4,4,.82) 0%, rgba(25,8,8,.55) 60%, rgba(10,3,3,.35) 100%);
}
.branches-hero-inner { position: relative; z-index: 1; max-width: 680px; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2);
  color: rgba(255,255,255,.9); padding: 5px var(--sp-3); border-radius: var(--r-pill);
  font-size: .78rem; font-weight: 600; margin-bottom: var(--sp-4);
}
.hero-title {
  margin: 0 0 var(--sp-3); display: flex; flex-direction: column; gap: 4px;
  font-size: 2.2rem; font-weight: 900; color: #fff; line-height: 1.1;
}
.hero-en { font-size: 1rem; font-weight: 600; color: rgba(255,255,255,.7); }
.hero-sub { color: rgba(255,255,255,.75); font-size: .9rem; line-height: 1.6; margin: 0; }

/* ══ Body ══ */
.branches-body { background: var(--bg); }
.branches-inner {
  max-width: 1100px; margin: 0 auto;
  padding: var(--sp-10) var(--sp-8);
  display: flex; flex-direction: column; gap: var(--sp-10);
}

/* Stats bar */
.stats-bar { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.stat-chip {
  display: flex; align-items: center; gap: var(--sp-2);
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-xl); padding: var(--sp-3) var(--sp-5);
  font-size: .88rem; color: var(--text-muted);
}
.stat-chip strong { font-size: 1.1rem; font-weight: 900; color: var(--text); }

/* ══ Flagship card ══ */
.flagship-card {
  display: grid; grid-template-columns: 380px 1fr;
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-3xl); overflow: hidden;
  box-shadow: var(--shadow-md);
}
.flagship-img-wrap { position: relative; overflow: hidden; min-height: 300px; }
.flagship-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.flagship-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to right, transparent 60%, rgba(0,0,0,.12));
}
.flagship-body { padding: var(--sp-8); display: flex; flex-direction: column; gap: var(--sp-4); }
.flagship-badges { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
.badge-guinness {
  background: rgba(200,16,46,.1); color: var(--primary);
  border: 1px solid rgba(200,16,46,.2);
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px var(--sp-3); border-radius: var(--r-pill); font-size: .72rem; font-weight: 700;
}
.flagship-name { margin: 0; font-size: 1.5rem; font-weight: 900; color: var(--text); line-height: 1.25; }
.flagship-desc { margin: 0; font-size: .88rem; color: var(--text-muted); line-height: 1.7; }
.flagship-meta { display: flex; flex-direction: column; gap: var(--sp-2); }
.meta-row {
  display: flex; align-items: flex-start; gap: var(--sp-2);
  font-size: .85rem; color: var(--text-muted); line-height: 1.5;
}
.phone-link { color: var(--primary); font-weight: 700; text-decoration: none; }
.phone-link:hover { text-decoration: underline; }
.flagship-delivery {
  display: flex; align-items: center; gap: var(--sp-2);
  background: var(--primary-light); border: 1px solid rgba(200,16,46,.2);
  border-radius: var(--r-xl); padding: var(--sp-3) var(--sp-4);
  font-size: .82rem; font-weight: 600; color: var(--primary);
  margin-top: auto;
}
.hotline-link { font-size: 1rem; font-weight: 900; color: var(--primary); text-decoration: none; letter-spacing: .05em; }
.hotline-link:hover { text-decoration: underline; }

/* ══ Branches grid ══ */
.branches-section-title {
  font-size: 1.2rem; font-weight: 900; color: var(--text);
  margin: 0; padding-bottom: var(--sp-4);
  border-bottom: 2px solid var(--border);
}
.branches-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--sp-5);
}
.branch-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-2xl); padding: var(--sp-5);
  display: flex; flex-direction: column; gap: var(--sp-3);
  transition: border-color .2s, box-shadow .2s;
}
.branch-card:hover { border-color: var(--primary); box-shadow: var(--shadow-primary); }
.branch-card-header { display: flex; align-items: flex-start; gap: var(--sp-3); }
.branch-icon-wrap {
  width: 48px; height: 48px; flex-shrink: 0;
  background: var(--primary-light); border-radius: var(--r-xl);
  display: flex; align-items: center; justify-content: center;
}
.branch-name { margin: 0 0 2px; font-size: 1rem; font-weight: 800; color: var(--text); line-height: 1.3; }
.branch-area { font-size: .75rem; color: var(--text-muted); font-weight: 600; letter-spacing: .04em; }
.branch-desc { margin: 0; font-size: .82rem; color: var(--text-muted); line-height: 1.6; }
.branch-details { display: flex; flex-direction: column; gap: var(--sp-2); }
.branch-detail {
  display: flex; align-items: flex-start; gap: var(--sp-2);
  font-size: .8rem; color: var(--text-muted); line-height: 1.5;
}
.branch-footer {
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid var(--border); padding-top: var(--sp-3);
  margin-top: auto;
}
.delivery-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--success-light); color: var(--success);
  border: 1px solid rgba(16,185,129,.2);
  padding: 4px var(--sp-3); border-radius: var(--r-pill);
  font-size: .75rem; font-weight: 700;
}
.branch-call {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--primary); color: #fff; text-decoration: none;
  padding: 6px var(--sp-4); border-radius: var(--r-xl);
  font-size: .8rem; font-weight: 700; transition: opacity .15s;
}
.branch-call:hover { opacity: .88; }

/* ══ International banner ══ */
.intl-banner {
  background: linear-gradient(135deg, #1a0a0a 0%, #2d1015 100%);
  border-radius: var(--r-3xl); padding: var(--sp-8);
  display: flex; align-items: center; gap: var(--sp-6); flex-wrap: wrap;
}
.intl-icon { flex-shrink: 0; }
.intl-banner h3 { margin: 0 0 var(--sp-2); font-size: 1.2rem; font-weight: 900; color: #fff; }
.intl-banner p { margin: 0; font-size: .88rem; color: rgba(255,255,255,.65); line-height: 1.7; }

/* Responsive */
@media (max-width: 860px) {
  .flagship-card { grid-template-columns: 1fr; }
  .flagship-img-wrap { min-height: 220px; }
  .branches-hero { padding: var(--sp-8) var(--sp-4) var(--sp-8); }
  .hero-title { font-size: 1.7rem; }
}
@media (max-width: 640px) {
  .branches-inner { padding: var(--sp-6) var(--sp-4); gap: var(--sp-8); }
  .branches-grid { grid-template-columns: 1fr; }
  .intl-banner { flex-direction: column; align-items: flex-start; gap: var(--sp-4); }
}
</style>
