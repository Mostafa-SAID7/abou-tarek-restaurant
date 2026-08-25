<template>
  <DefaultLayout class="menu-page">

    <!-- ══ HERO with background image ══ -->
    <section class="menu-hero" :aria-label="t('قائمة الطعام', 'Menu')">
      <div class="menu-hero-overlay"></div>
      <div class="hero-inner">
        <div class="hero-glass-chip">
          <AppIcon name="utensils" :size="14" aria-hidden="true" />
          {{ t('قائمتنا الكاملة', 'Our Full Menu') }}
        </div>
        <h1 class="hero-title">
          <span class="hero-ar" lang="ar">قائمة الطعام</span>
          <span class="hero-en">Koshary Abou Tarek Menu</span>
        </h1>
        <p class="hero-sub">{{ t('قائمة بسيطة وأسطورية — مثالية منذ أكثر من ٧٠ عامًا', 'A deliberately simple, legendary menu — perfected over 70+ years') }}</p>
        <div class="hero-tags">
          <span class="tag"><AppIcon name="leaf" :size="14" aria-hidden="true" /> {{ t('خيارات نباتية ١٠٠٪', '100% Vegan Options') }}</span>
          <span class="tag"><AppIcon name="shield-check" :size="14" aria-hidden="true" /> {{ t('صديق للغلوتين', 'Gluten friendly') }}</span>
          <span class="tag"><AppIcon name="ban" :size="14" aria-hidden="true" /> {{ t('بدون دهون حيوانية', 'No animal fats') }}</span>
          <span class="tag"><AppIcon name="phone" :size="14" aria-hidden="true" /> {{ t('للتوصيل:', 'Delivery:') }} <a href="tel:16011" class="tag-link">16011</a></span>
        </div>
      </div>
    </section>

    <!-- ══ STICKY FILTER BAR ══ -->
    <div class="filter-bar-wrap" :class="{ 'bar-stuck': barStuck }" ref="filterBar">
      <div class="filter-bar">

        <!-- Category tabs -->
        <div class="cat-tabs" role="tablist" :aria-label="t('تصفية حسب الصنف', 'Filter by category')">
          <button
            class="cat-tab" :class="{ active: selectedCat === 'all' }"
            role="tab" :aria-selected="selectedCat === 'all'"
            @click="selectCat('all')"
          >{{ t('الكل', 'All') }}</button>
          <button
            v-for="cat in CATEGORIES" :key="cat.id"
            class="cat-tab" :class="{ active: selectedCat === cat.id }"
            role="tab" :aria-selected="selectedCat === cat.id"
            @click="selectCat(cat.id)"
          >
            <AppIcon :name="cat.icon" :size="14" aria-hidden="true" />
            {{ t(cat.nameAr, cat.nameEn) }}
          </button>
        </div>

        <!-- Search -->
        <div class="search-wrap">
          <AppIcon name="search" :size="16" color="var(--text-muted)" class="search-icon" aria-hidden="true" />
          <input
            v-model="searchQ"
            type="search"
            class="search-input"
            :placeholder="t('ابحث في القائمة…', 'Search menu…')"
            :aria-label="t('بحث في القائمة', 'Search the menu')"
          />
          <button v-if="searchQ" class="search-clear" @click="searchQ = ''" :aria-label="t('مسح البحث', 'Clear search')">
            <AppIcon name="x" :size="14" aria-hidden="true" />
          </button>
        </div>

      </div>
    </div>

    <div class="menu-body">

      <!-- ══ SEARCH / FILTER RESULTS ══ -->
      <div v-if="searchQ || selectedCat !== 'all'" class="filtered-section">

        <!-- Result count -->
        <div class="result-meta">
          <span class="result-count">
            {{ t(`${paginatedItems.length > 0 ? `عرض ${(currentPage-1)*PER_PAGE+1}–${Math.min(currentPage*PER_PAGE, filteredItems.length)} من ${filteredItems.length}` : 'لا نتائج'}`,
               `${paginatedItems.length > 0 ? `Showing ${(currentPage-1)*PER_PAGE+1}–${Math.min(currentPage*PER_PAGE, filteredItems.length)} of ${filteredItems.length}` : 'No results'}`) }}
          </span>
          <span v-if="selectedCat !== 'all' && selectedCatObj" class="active-filter">
            <AppIcon :name="selectedCatObj.icon" :size="12" aria-hidden="true" />
            {{ t(selectedCatObj.nameAr, selectedCatObj.nameEn) }}
          </span>
        </div>

        <!-- Items grid -->
        <div v-if="paginatedItems.length" class="items-grid flat-grid">
          <article v-for="item in paginatedItems" :key="item.id" class="item-card" :class="{ featured: item.flags.isFeatured }">
            <!-- Image -->
            <div class="item-img-wrap">
              <img v-if="item.image && !failedImages.has(item.id)" :src="item.image" :alt="t(item.name.ar, item.name.en)" class="item-img" :data-item-id="item.id" loading="lazy" @error="onImgError" />
              <div v-else class="item-img-placeholder">
                <AppIcon :name="item.icon" :size="36" color="var(--primary)" aria-hidden="true" />
              </div>
              <span v-if="item.flags.isFeatured" class="featured-badge">
                <AppIcon name="star-fill" :size="11" aria-hidden="true" />
                {{ t('الأكثر طلبًا', 'Signature') }}
              </span>
            </div>
            <!-- Content -->
            <div class="item-content">
              <div class="item-names">
                <span class="item-name">{{ t(item.name.ar, item.name.en) }}</span>
                <span class="item-name-alt">{{ isAR ? item.name.en : item.name.ar }}</span>
              </div>
              <p class="item-desc">{{ t(item.description.ar, item.description.en) }}</p>
              <div v-if="item.sizes?.length" class="item-sizes">
                <div v-for="sz in item.sizes" :key="sz.size" class="size-row">
                  <span class="size-name">{{ t(sz.label.ar, sz.label.en) }}</span>
                  <span class="size-price">~{{ sz.price }} {{ t('ج.م.', 'EGP') }}</span>
                </div>
              </div>
              <div v-if="!item.sizes?.length" class="item-price">
                {{ item.price === 'market' ? t('سعر السوق', 'Market price') : `~${item.price} ${t('ج.م.', 'EGP')}` }}
              </div>
            </div>
          </article>
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state">
          <AppIcon name="search" :size="48" color="var(--border)" aria-hidden="true" />
          <h3>{{ t('لا توجد نتائج', 'No results found') }}</h3>
          <p>{{ t('جرّب كلمة بحث أخرى أو اختر صنفًا مختلفًا', 'Try a different search term or pick another category') }}</p>
          <button class="btn btn-primary" @click="resetFilters">{{ t('عرض الكل', 'Show All') }}</button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination" :aria-label="t('التنقل بين الصفحات', 'Pagination')">
          <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
            <AppIcon name="chevron-right" :size="16" aria-hidden="true" />
          </button>
          <button
            v-for="p in totalPages" :key="p"
            class="page-btn" :class="{ 'page-active': p === currentPage }"
            @click="currentPage = p"
          >{{ p }}</button>
          <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
            <AppIcon name="chevron-left" :size="16" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- ══ DEFAULT — CATEGORY SECTIONS ══ -->
      <template v-else>
        <section
          v-for="cat in CATEGORIES" :key="cat.id"
          class="menu-section"
          :id="cat.id"
          :aria-labelledby="cat.headingId"
        >
          <div class="section-label">
            <div class="section-icon">
              <AppIcon :name="cat.icon" :size="28" color="var(--primary)" aria-hidden="true" />
            </div>
            <div>
              <h2 :id="cat.headingId" class="section-name">
                {{ t(cat.nameAr, cat.nameEn) }}
                <span class="section-name-alt">— {{ isAR ? cat.nameEn : cat.nameAr }}</span>
              </h2>
              <p class="section-desc">{{ t(cat.descAr, cat.descEn) }}</p>
            </div>
          </div>

          <div class="items-grid" :class="{ 'items-grid--wide': cat.id === 'koshary' }">
            <article
              v-for="item in itemsByCategory(cat.id)" :key="item.id"
              class="item-card" :class="{ featured: item.flags.isFeatured }"
            >
              <!-- Image -->
              <div class="item-img-wrap">
                <img v-if="item.image && !failedImages.has(item.id)" :src="item.image" :alt="t(item.name.ar, item.name.en)" class="item-img" :data-item-id="item.id" loading="lazy" @error="onImgError" />
                <div v-else class="item-img-placeholder">
                  <AppIcon :name="item.icon" :size="36" color="var(--primary)" aria-hidden="true" />
                </div>
                <span v-if="item.flags.isFeatured" class="featured-badge">
                  <AppIcon name="star-fill" :size="11" aria-hidden="true" />
                  {{ t('الأكثر طلبًا', 'Signature') }}
                </span>
              </div>
              <!-- Content -->
              <div class="item-content">
                <div class="item-names">
                  <span class="item-name">{{ t(item.name.ar, item.name.en) }}</span>
                  <span class="item-name-alt">{{ isAR ? item.name.en : item.name.ar }}</span>
                </div>
                <p class="item-desc">{{ t(item.description.ar, item.description.en) }}</p>
                <div v-if="item.customizations?.length" class="item-note">
                  <AppIcon name="info" :size="14" aria-hidden="true" />
                  {{ t('خصّص طلبك:', 'Customize with') }}
                  {{ item.customizations.map(c => t(c.label.ar, c.label.en)).join(t('، ', ', ')) }}
                </div>
                <div v-if="item.sizes?.length" class="item-sizes">
                  <div v-for="sz in item.sizes" :key="sz.size" class="size-row">
                    <AppIcon name="soup" :size="14" color="var(--primary)" aria-hidden="true" />
                    <span class="size-name">{{ t(sz.label.ar, sz.label.en) }}</span>
                    <span class="size-price">~{{ sz.price }} {{ t('ج.م.', 'EGP') }}</span>
                  </div>
                </div>
                <div v-if="!item.sizes?.length" class="item-price">
                  {{ item.price === 'market' ? t('سعر السوق', 'Market price') : `~${item.price} ${t('ج.م.', 'EGP')}` }}
                </div>
              </div>
            </article>
          </div>

          <!-- Daqqah info card — after koshary section -->
          <div v-if="cat.id === 'koshary'" class="daqqah-card">
            <div class="daqqah-icon"><AppIcon name="jar" :size="44" color="var(--primary)" aria-hidden="true" /></div>
            <div class="daqqah-info">
              <h3 class="daqqah-title">
                {{ t(daqqah.titleAr, daqqah.titleEn) }}
                <span class="daqqah-subtitle">{{ isAR ? 'Daqqah' : 'الدقة' }}</span>
              </h3>
              <p class="daqqah-desc">{{ t(daqqah.descAr, daqqah.descEn) }}</p>
              <div class="daqqah-levels">
                <span v-for="level in daqqah.levels" :key="level.cls" :class="['level', level.cls]">
                  {{ t(level.labelAr, level.labelEn) }}
                </span>
              </div>
            </div>
          </div>
        </section>
      </template>

      <!-- ══ ORDER CTA ══ -->
      <section class="order-cta" :aria-label="t('اطلب التوصيل', 'Order delivery')">
        <div class="cta-inner">
          <div class="cta-text">
            <h2>{{ t('اطلب دلوقتي', 'Order Now') }}</h2>
            <p>{{ t('التوصيل متاح يومياً من ٧ ص إلى ١٠ م في القاهرة والجيزة وما حولهما.', 'Delivery available daily from 7 AM to 10 PM across Cairo, Giza & beyond.') }}</p>
          </div>
          <a href="tel:16011" class="cta-btn" :aria-label="t('اتصل للطلب — الخط الساخن 16011', 'Call to order, hotline 16011')">
            <AppIcon name="phone" :size="20" aria-hidden="true" />
            <span class="cta-num">16011</span>
          </a>
          <div class="cta-platforms">
            <span class="platform-label">{{ t('متوفر أيضًا على:', 'Also on:') }}</span>
            <span class="platform-chip"><AppIcon name="truck" :size="14" aria-hidden="true" /> Talabat</span>
            <span class="platform-chip"><AppIcon name="smartphone" :size="14" aria-hidden="true" /> Elmenus</span>
          </div>
        </div>
      </section>

    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AppIcon from '../components/AppIcon.vue'
import { usePageMeta } from '../composables/usePageMeta'
import { useLanguage } from '../composables/useLanguage'
import menuData from '../data/menu.json'
import CATEGORIES from '../data/categories.json'
import daqqah from '../data/daqqah.json'

const { t, isAR } = useLanguage()
usePageMeta({
  title: 'قائمة الطعام — Our Menu',
  description: 'Full menu of Koshary Abou Tarek — Koshary in all sizes, Lentil Soup, Rice Pudding and drinks. Prices, sizes and the legendary daqqah sauce explained.'
})

const PER_PAGE = 6
const selectedCat = ref('all')
const searchQ = ref('')
const currentPage = ref(1)
const filterBar = ref(null)
const barStuck = ref(false)
const failedImages = ref(new Set())

const selectedCatObj = computed(() => CATEGORIES.find(c => c.id === selectedCat.value))

const filteredItems = computed(() => {
  let items = selectedCat.value === 'all' ? menuData : menuData.filter(i => i.category === selectedCat.value)
  if (searchQ.value.trim()) {
    const q = searchQ.value.toLowerCase()
    items = items.filter(i =>
      i.name.ar.toLowerCase().includes(q) ||
      i.name.en.toLowerCase().includes(q) ||
      i.description.ar.toLowerCase().includes(q) ||
      i.description.en.toLowerCase().includes(q)
    )
  }
  return items
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / PER_PAGE))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE
  return filteredItems.value.slice(start, start + PER_PAGE)
})

watch([filteredItems], () => { currentPage.value = 1 })

function selectCat(id) {
  selectedCat.value = id
  currentPage.value = 1
  if (id !== 'all') searchQ.value = ''
}

function resetFilters() {
  selectedCat.value = 'all'
  searchQ.value = ''
  currentPage.value = 1
}

function itemsByCategory(catId) {
  return menuData.filter(item => item.category === catId)
}

function onImgError(e) {
  failedImages.value = new Set([...failedImages.value, e.currentTarget.dataset.itemId])
}
</script>

<style scoped>
.menu-page {
  --menu-ink: #241113;
  --menu-muted: #80696b;
  --menu-line: rgb(109 54 58 / .14);
  background: radial-gradient(circle at 8% 14%, rgb(245 166 35 / .08), transparent 28rem), radial-gradient(circle at 92% 42%, rgb(200 16 46 / .06), transparent 30rem), var(--bg);
  color: var(--menu-ink);
}

:global([data-theme="dark"]) .menu-page {
  --menu-ink: #fff5f1;
  --menu-muted: #c9a7a3;
  --menu-line: rgb(255 255 255 / .12);
  background: radial-gradient(circle at 8% 14%, rgb(245 166 35 / .1), transparent 28rem), radial-gradient(circle at 92% 42%, rgb(200 16 46 / .12), transparent 30rem), #120808;
}

.menu-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 430px;
  overflow: hidden;
  background-image: url('~@/../public/hero-bg.webp');
  background-position: center 42%;
  background-size: cover;
  padding: 112px var(--sp-6) 76px;
  text-align: center;
}

.menu-hero::before,
.menu-hero::after {
  position: absolute;
  content: '';
  pointer-events: none;
}

.menu-hero::before {
  inset: 0;
  background: linear-gradient(180deg, rgb(12 3 4 / .5), rgb(28 5 8 / .72) 62%, rgb(12 3 4 / .94)), radial-gradient(circle at 50% 20%, rgb(245 166 35 / .18), transparent 36%);
}

.menu-hero::after {
  inset-inline: 0;
  bottom: -1px;
  height: 90px;
  background: linear-gradient(180deg, transparent, var(--bg));
}

.menu-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgb(10 2 3 / .12);
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: min(100%, 760px);
}

.hero-glass-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-5);
  border: 1px solid rgb(255 255 255 / .28);
  border-radius: var(--r-pill);
  background: rgb(255 255 255 / .12);
  box-shadow: 0 10px 30px rgb(0 0 0 / .16);
  color: rgb(255 255 255 / .92);
  padding: 7px 16px;
  font-size: .76rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0 0 var(--sp-4);
}

.hero-ar {
  color: #fff;
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.08;
  text-shadow: 0 5px 25px rgb(0 0 0 / .3);
}

.hero-en {
  color: rgb(255 255 255 / .8);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 600;
  letter-spacing: .08em;
}

.hero-sub {
  max-width: 590px;
  margin: 0 auto var(--sp-6);
  color: rgb(255 255 255 / .78);
  font-size: .95rem;
  line-height: 1.8;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--sp-2);
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgb(255 255 255 / .2);
  border-radius: var(--r-pill);
  background: rgb(255 255 255 / .1);
  color: rgb(255 255 255 / .88);
  padding: 7px 12px;
  font-size: .75rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
}

.tag-link {
  color: var(--gold);
  font-weight: 900;
}

.filter-bar-wrap {
  position: sticky;
  top: 72px;
  z-index: 100;
  border-bottom: 1px solid var(--menu-line);
  background: color-mix(in srgb, var(--surface) 90%, transparent);
  box-shadow: 0 8px 30px rgb(38 12 14 / .06);
  backdrop-filter: blur(18px);
}

.filter-bar-wrap.bar-stuck {
  box-shadow: 0 12px 32px rgb(38 12 14 / .14);
}

.filter-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-5);
  width: min(100%, 1160px);
  margin: 0 auto;
  padding: 14px var(--sp-6);
}

.cat-tabs {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--sp-2);
}

.cat-tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 38px;
  border: 1px solid var(--menu-line);
  border-radius: var(--r-pill);
  background: var(--surface);
  color: var(--menu-muted);
  padding: 7px 15px;
  font-size: .8rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform .18s, border-color .18s, background .18s, color .18s, box-shadow .18s;
  white-space: nowrap;
}

.cat-tab:hover {
  border-color: var(--primary);
  box-shadow: 0 6px 16px rgb(200 16 46 / .1);
  color: var(--primary);
  transform: translateY(-1px);
}

.cat-tab.active {
  border-color: var(--primary);
  background: var(--primary);
  box-shadow: 0 8px 18px rgb(200 16 46 / .22);
  color: #fff;
}

.search-wrap {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: 240px;
}

.search-icon {
  position: absolute;
  inset-inline-start: 14px;
  pointer-events: none;
}

.search-input {
  width: 100%;
  min-height: 40px;
  border: 1px solid var(--menu-line);
  border-radius: var(--r-pill);
  outline: none;
  background: var(--bg);
  color: var(--menu-ink);
  padding: 9px 40px 9px 42px;
  font-size: .82rem;
  transition: border-color .18s, box-shadow .18s, background .18s;
}

.search-input:focus {
  border-color: var(--primary);
  background: var(--surface);
  box-shadow: 0 0 0 4px var(--primary-shadow);
}

.search-clear {
  position: absolute;
  inset-inline-end: 12px;
  display: flex;
  border: 0;
  background: transparent;
  color: var(--menu-muted);
  padding: 4px;
  cursor: pointer;
}

.menu-body {
  display: flex;
  flex-direction: column;
  gap: clamp(56px, 8vw, 96px);
  width: min(100%, 1160px);
  margin: 0 auto;
  padding: clamp(48px, 7vw, 88px) var(--sp-6) clamp(64px, 8vw, 104px);
}

.menu-section {
  display: flex;
  flex-direction: column;
  gap: 28px;
  scroll-margin-top: 140px;
}

.section-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  border: 1px solid rgb(200 16 46 / .18);
  border-radius: 22px;
  background: linear-gradient(145deg, var(--primary-light), var(--surface));
  box-shadow: 0 10px 24px rgb(82 20 24 / .08);
}

.section-name {
  margin: 0 0 7px;
  color: var(--menu-ink);
  font-size: clamp(1.45rem, 3vw, 2rem);
  font-weight: 900;
  letter-spacing: -.02em;
}

.section-name-alt {
  color: var(--menu-muted);
  font-size: .9em;
  font-weight: 400;
}

.section-desc {
  max-width: 700px;
  margin: 0 auto;
  color: var(--menu-muted);
  font-size: .9rem;
  line-height: 1.75;
}

.section-label::after {
  width: 64px;
  height: 3px;
  margin-top: 6px;
  border-radius: var(--r-pill);
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  content: '';
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.items-grid--wide {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.flat-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.item-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--menu-line);
  border-radius: 22px;
  background: color-mix(in srgb, var(--surface) 94%, var(--primary-light));
  box-shadow: 0 12px 28px rgb(63 22 26 / .07);
  transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
}

.item-card:hover {
  border-color: rgb(200 16 46 / .38);
  box-shadow: 0 20px 40px rgb(63 22 26 / .14);
  transform: translateY(-6px);
}

.item-card.featured {
  border-color: rgb(245 166 35 / .65);
  box-shadow: 0 14px 34px rgb(180 111 17 / .13);
}

.item-card.featured::before {
  position: absolute;
  inset-inline: 22px;
  top: 0;
  height: 3px;
  border-radius: 0 0 4px 4px;
  background: var(--gold);
  content: '';
}

.item-img-wrap {
  position: relative;
  height: 210px;
  flex-shrink: 0;
  overflow: hidden;
  background: var(--bg);
}

.item-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .45s ease;
}

.item-card:hover .item-img {
  transform: scale(1.04);
}

.item-img-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, var(--primary-light), var(--bg));
}

.featured-badge {
  position: absolute;
  top: 14px;
  inset-inline-end: 14px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: var(--r-pill);
  background: var(--gold);
  box-shadow: 0 5px 15px rgb(0 0 0 / .14);
  color: #261507;
  padding: 6px 11px;
  font-size: .68rem;
  font-weight: 900;
}

.item-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 11px;
  padding: 22px;
  text-align: center;
}

.item-names {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.item-name {
  color: var(--menu-ink);
  font-size: 1.05rem;
  font-weight: 900;
}

.item-name-alt {
  color: var(--menu-muted);
  font-size: .78rem;
}

.item-desc {
  min-height: 52px;
  margin: 0;
  color: var(--menu-muted);
  font-size: .8rem;
  line-height: 1.7;
}

.item-sizes {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: auto;
  border: 1px solid var(--menu-line);
  border-radius: 14px;
  background: var(--bg);
  padding: 12px 14px;
  text-align: start;
}

.size-row {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--menu-ink);
  font-size: .8rem;
}

.size-name {
  flex: 1;
  font-weight: 600;
}

.size-price {
  color: var(--primary);
  font-weight: 900;
}

.item-card.featured .size-price {
  color: var(--gold-text);
}

.item-note {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  border-radius: 12px;
  background: var(--bg);
  color: var(--menu-muted);
  padding: 9px 11px;
  font-size: .72rem;
  text-align: start;
}

.item-price {
  align-self: center;
  margin-top: auto;
  border: 1px solid rgb(200 16 46 / .15);
  border-radius: var(--r-pill);
  background: var(--primary-light);
  color: var(--primary);
  padding: 7px 14px;
  font-size: .86rem;
  font-weight: 900;
}

.filtered-section {
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
}

.result-count {
  color: var(--menu-muted);
  font-size: .82rem;
}

.active-filter {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid rgb(200 16 46 / .18);
  border-radius: var(--r-pill);
  background: var(--primary-light);
  color: var(--primary);
  padding: 5px 11px;
  font-size: .74rem;
  font-weight: 800;
}

.empty-state {
  gap: 14px;
  border: 1px dashed var(--menu-line);
  border-radius: 22px;
  color: var(--menu-muted);
  padding: 76px var(--sp-6);
}

.empty-state h3 {
  margin: 0;
  color: var(--menu-ink);
  font-size: 1.2rem;
}

.empty-state p {
  margin: 0;
  font-size: .88rem;
}

.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--menu-line);
  border-radius: 12px;
  background: var(--surface);
  color: var(--menu-muted);
  font-size: .82rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color .18s, background .18s, color .18s, transform .18s, box-shadow .18s;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-1px);
}

.page-btn.page-active {
  border-color: var(--primary);
  background: var(--primary);
  box-shadow: 0 6px 15px rgb(200 16 46 / .2);
  color: #fff;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: .35;
}

.daqqah-card {
  display: flex;
  align-items: center;
  gap: var(--sp-5);
  border: 1px solid rgb(245 166 35 / .3);
  border-radius: 22px;
  background: linear-gradient(135deg, var(--gold-light), var(--surface));
  box-shadow: 0 14px 28px rgb(151 91 12 / .08);
  padding: var(--sp-6);
  text-align: start;
}

.daqqah-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: rgb(245 166 35 / .14);
}

.daqqah-title {
  margin: 0 0 7px;
  color: var(--menu-ink);
  font-size: 1.1rem;
  font-weight: 900;
}

.daqqah-subtitle {
  color: var(--menu-muted);
  font-size: .86rem;
  font-weight: 400;
}

.daqqah-desc {
  margin: 0 0 14px;
  color: var(--menu-muted);
  font-size: .83rem;
  line-height: 1.75;
}

.daqqah-levels {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 7px;
}

.level {
  border-radius: var(--r-pill);
  padding: 5px 11px;
  font-size: .72rem;
  font-weight: 700;
}

.level-0 {
  background: var(--bg);
  color: var(--menu-muted);
}

.level-1 {
  background: var(--primary-light);
  color: var(--primary);
}

.level-2 {
  background: rgb(200 16 46 / .18);
  color: var(--primary);
}

.level-3 {
  background: var(--primary);
  color: #fff;
}

.order-cta {
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(245 166 35 / .25);
  border-radius: 26px;
  background: linear-gradient(135deg, #210b0d, #3b1119 55%, #241016);
  box-shadow: 0 22px 50px rgb(35 8 12 / .22);
  color: #fff;
  padding: clamp(28px, 5vw, 48px);
  text-align: center;
}

.order-cta::before {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 85% 15%, rgb(245 166 35 / .2), transparent 28%), radial-gradient(circle at 10% 100%, rgb(200 16 46 / .24), transparent 30%);
  content: '';
  pointer-events: none;
}

.cta-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 22px;
}

.cta-text {
  flex: 1 1 300px;
}

.cta-text h2 {
  margin: 0 0 6px;
  color: #fff;
  font-size: clamp(1.35rem, 3vw, 1.8rem);
  font-weight: 900;
}

.cta-text p {
  max-width: 600px;
  margin: 0 auto;
  color: rgb(255 255 255 / .68);
  font-size: .86rem;
  line-height: 1.7;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  min-width: 180px;
  border: 1px solid rgb(245 166 35 / .35);
  border-radius: var(--r-xl);
  background: var(--primary);
  box-shadow: 0 10px 24px rgb(200 16 46 / .3);
  color: #fff;
  padding: 14px 22px;
  transition: transform .18s, background .18s;
}

.cta-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.cta-num {
  font-size: 1.4rem;
  font-weight: 900;
  letter-spacing: .08em;
}

.cta-platforms {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: var(--sp-2);
}

.platform-label {
  color: rgb(255 255 255 / .48);
  font-size: .76rem;
}

.platform-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid rgb(255 255 255 / .14);
  border-radius: var(--r-pill);
  background: rgb(255 255 255 / .08);
  color: rgb(255 255 255 / .8);
  padding: 5px 11px;
  font-size: .75rem;
  font-weight: 700;
}

@media (max-width: 900px) {
  .filter-bar {
    flex-direction: column;
    gap: var(--sp-3);
  }

  .cat-tabs {
    width: 100%;
  }

  .search-wrap {
    width: min(100%, 420px);
  }

  .items-grid,
  .items-grid--wide,
  .flat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .menu-hero {
    min-height: 410px;
    padding: 96px var(--sp-4) 70px;
  }

  .hero-tags {
    gap: 7px;
  }

  .tag {
    padding: 6px 9px;
    font-size: .68rem;
  }

  .filter-bar-wrap {
    top: 60px;
  }

  .filter-bar {
    padding: var(--sp-3) var(--sp-4);
  }

  .cat-tabs {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
  }

  .cat-tabs::-webkit-scrollbar {
    display: none;
  }

  .cat-tab {
    flex-shrink: 0;
  }

  .menu-body {
    padding: var(--sp-12) var(--sp-4) 64px;
  }

  .items-grid,
  .items-grid--wide,
  .flat-grid {
    grid-template-columns: 1fr;
  }

  .item-img-wrap {
    height: 220px;
  }

  .daqqah-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .daqqah-levels {
    justify-content: center;
  }

  .cta-inner {
    flex-direction: column;
  }

  .cta-btn {
    width: 100%;
  }
}
</style>
