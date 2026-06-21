<template>
  <DefaultLayout>

    <!-- ══ HERO with background image ══ -->
    <section class="menu-hero" :style="{ backgroundImage: 'url(/hero-bg.webp)' }" :aria-label="t('قائمة الطعام', 'Menu')">
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
              <img v-if="item.image" :src="item.image" :alt="t(item.name.ar, item.name.en)" class="item-img" loading="lazy" @error="onImgError" />
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
                <img v-if="item.image" :src="item.image" :alt="t(item.name.ar, item.name.en)" class="item-img" loading="lazy" @error="onImgError" />
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
  e.target.style.display = 'none'
  e.target.nextElementSibling?.style && (e.target.nextElementSibling.style.display = 'flex')
}
</script>

<style scoped>
/* ══ Hero with bg image ══ */
.menu-hero {
  position: relative; overflow: hidden;
  background-size: cover; background-position: center 40%;
  padding: var(--sp-12) var(--sp-10);
  min-height: 320px; display: flex; align-items: flex-end;
}
.menu-hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(15,4,4,.88) 0%, rgba(25,8,8,.65) 50%, rgba(10,3,3,.4) 100%);
}
.hero-inner { max-width: 680px; position: relative; z-index: 1; }
.hero-glass-chip {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2);
  color: rgba(255,255,255,.9); padding: 5px var(--sp-3); border-radius: var(--r-pill);
  font-size: .78rem; font-weight: 600; margin-bottom: var(--sp-4);
}
.hero-title { margin: 0 0 var(--sp-3); display: flex; flex-direction: column; gap: var(--sp-1); }
.hero-ar  { font-size: 2.2rem; font-weight: 900; color: #fff; line-height: 1.1; }
.hero-en  { font-size: 1rem; font-weight: 600; color: rgba(255,255,255,.75); letter-spacing: .04em; }
.hero-sub { color: rgba(255,255,255,.8); font-size: .9rem; line-height: 1.6; margin: 0 0 var(--sp-5); }
.hero-tags { display: flex; gap: var(--sp-3); flex-wrap: wrap; }
.tag {
  background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.2);
  color: rgba(255,255,255,.9); padding: 5px var(--sp-3); border-radius: var(--r-pill);
  font-size: .78rem; font-weight: 600;
}
.tag-link { color: var(--gold); text-decoration: none; font-weight: 800; }
.tag-link:hover { text-decoration: underline; }

/* ══ Filter bar ══ */
.filter-bar-wrap {
  position: sticky; top: 72px; z-index: 100;
  background: var(--surface); border-bottom: 1.5px solid var(--border);
  transition: box-shadow .2s;
}
.filter-bar-wrap.bar-stuck { box-shadow: 0 4px 20px rgba(0,0,0,.1); }
.filter-bar {
  max-width: var(--max-body, 1100px); margin: 0 auto;
  padding: var(--sp-3) var(--sp-8);
  display: flex; align-items: center; gap: var(--sp-4); flex-wrap: wrap;
}

/* Category tabs */
.cat-tabs { display: flex; gap: var(--sp-2); flex-wrap: wrap; flex: 1; }
.cat-tab {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px var(--sp-4); border-radius: var(--r-pill);
  border: 1.5px solid var(--border); background: transparent;
  color: var(--text-muted); font-size: .82rem; font-weight: 600;
  cursor: pointer; transition: all .15s; white-space: nowrap;
}
.cat-tab:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }
.cat-tab.active {
  background: var(--primary); border-color: var(--primary); color: #fff;
}

/* Search */
.search-wrap {
  position: relative; display: flex; align-items: center;
  min-width: 220px; flex-shrink: 0;
}
.search-icon { position: absolute; inset-inline-start: var(--sp-3); pointer-events: none; }
.search-input {
  width: 100%; padding: 8px var(--sp-4) 8px calc(var(--sp-3) + 24px);
  border: 1.5px solid var(--border); border-radius: var(--r-xl);
  background: var(--bg); color: var(--text); font-size: .85rem;
  outline: none; transition: border-color .15s;
}
.search-input:focus { border-color: var(--primary); }
.search-input::placeholder { color: var(--text-muted); }
.search-clear {
  position: absolute; inset-inline-end: var(--sp-3);
  background: none; border: none; cursor: pointer; padding: 2px;
  color: var(--text-muted); display: flex;
}

/* ══ Body ══ */
.menu-body {
  max-width: 1100px; margin: 0 auto;
  padding: var(--sp-8) var(--sp-8);
  display: flex; flex-direction: column; gap: var(--sp-10);
}

/* ══ Item card (shared by both views) ══ */
.items-grid { display: grid; gap: var(--sp-5); grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
.items-grid--wide { grid-template-columns: 1fr; }
.flat-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }

.item-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-2xl); overflow: hidden;
  display: flex; flex-direction: column;
  transition: border-color .15s, box-shadow .15s;
}
.item-card:hover { border-color: var(--primary); box-shadow: var(--shadow-primary); }
.item-card.featured { border-color: var(--gold); }
.item-card.featured:hover { box-shadow: 0 6px 20px rgba(245,166,35,.22); }

/* Image area */
.item-img-wrap {
  position: relative; width: 100%; height: 180px; overflow: hidden;
  background: var(--bg); flex-shrink: 0;
}
.item-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.item-img-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, var(--primary-light), var(--bg));
}
.featured-badge {
  position: absolute; top: var(--sp-3); inset-inline-end: var(--sp-3);
  display: inline-flex; align-items: center; gap: 4px;
  background: var(--gold); color: #1a0a0a;
  padding: 4px var(--sp-3); border-radius: var(--r-pill);
  font-size: .7rem; font-weight: 800;
}

/* Content area */
.item-content {
  padding: var(--sp-4) var(--sp-5); display: flex; flex-direction: column; gap: var(--sp-2); flex: 1;
}
.item-names { display: flex; flex-direction: column; gap: 2px; }
.item-name    { font-size: 1rem; font-weight: 800; color: var(--text); }
.item-name-alt { font-size: .8rem; color: var(--text-muted); }
.item-desc    { font-size: .82rem; color: var(--text-muted); line-height: 1.55; margin: 0; }

.item-sizes {
  display: flex; flex-direction: column; gap: 6px;
  background: var(--bg); border-radius: var(--r-lg); padding: var(--sp-3) var(--sp-4);
  margin-top: auto;
}
.size-row { display: flex; align-items: center; gap: var(--sp-3); font-size: .85rem; color: var(--text); }
.size-name { flex: 1; font-weight: 500; }
.size-price { font-weight: 800; color: var(--primary); }
.item-card.featured .size-price { color: var(--gold-text); }

.item-note {
  font-size: .75rem; color: var(--text-muted);
  background: var(--bg); border-radius: var(--r-md); padding: var(--sp-2) var(--sp-3);
  display: flex; align-items: flex-start; gap: 5px;
}
.item-price {
  font-size: .9rem; font-weight: 800; color: var(--primary);
  background: var(--primary-light); padding: 5px var(--sp-3); border-radius: var(--r-md);
  align-self: flex-start; margin-top: auto;
}

/* ══ Result meta ══ */
.result-meta {
  display: flex; align-items: center; gap: var(--sp-3); flex-wrap: wrap;
  margin-bottom: var(--sp-2);
}
.result-count { font-size: .85rem; color: var(--text-muted); }
.active-filter {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--primary-light); color: var(--primary);
  border: 1px solid rgba(200,16,46,.2);
  padding: 3px var(--sp-3); border-radius: var(--r-pill);
  font-size: .75rem; font-weight: 700;
}

/* ══ Section layout (default view) ══ */
.menu-section { display: flex; flex-direction: column; gap: var(--sp-5); scroll-margin-top: 140px; }
.section-label {
  display: flex; gap: var(--sp-4); align-items: flex-start;
  padding-bottom: var(--sp-4); border-bottom: 2px solid var(--border);
}
.section-icon {
  width: 52px; height: 52px; flex-shrink: 0;
  background: var(--primary-light); border-radius: var(--r-xl);
  display: flex; align-items: center; justify-content: center;
}
.section-name { margin: 0 0 var(--sp-1); font-size: 1.3rem; font-weight: 800; color: var(--text); }
.section-name-alt { font-weight: 400; color: var(--text-muted); font-size: 1.1rem; }
.section-desc { margin: 0; font-size: .88rem; color: var(--text-muted); line-height: 1.55; }

/* ══ Filtered / empty state ══ */
.filtered-section { display: flex; flex-direction: column; gap: var(--sp-6); }
.empty-state {
  text-align: center; padding: var(--sp-12) var(--sp-6);
  display: flex; flex-direction: column; align-items: center; gap: var(--sp-4);
  color: var(--text-muted);
}
.empty-state h3 { font-size: 1.2rem; color: var(--text); margin: 0; }
.empty-state p  { font-size: .88rem; margin: 0; }

/* ══ Daqqah ══ */
.daqqah-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-2xl); padding: var(--sp-5);
  display: flex; gap: var(--sp-4); align-items: flex-start;
}
.daqqah-icon  { font-size: 2.5rem; flex-shrink: 0; }
.daqqah-title { margin: 0 0 var(--sp-2); font-size: 1rem; font-weight: 800; color: var(--text); }
.daqqah-subtitle { color: var(--text-muted); font-size: .88rem; font-weight: 400; }
.daqqah-desc  { margin: 0 0 var(--sp-3); font-size: .85rem; color: var(--text-muted); line-height: 1.6; }
.daqqah-levels { display: flex; gap: var(--sp-2); flex-wrap: wrap; }
.level { padding: 4px var(--sp-3); border-radius: var(--r-pill); font-size: .75rem; font-weight: 600; }
.level-0 { background: var(--bg); color: var(--text-muted); }
.level-1 { background: var(--primary-light); color: var(--primary); }
.level-2 { background: rgba(200,16,46,.2); color: var(--primary); }
.level-3 { background: var(--primary); color: #fff; }

/* ══ Pagination ══ */
.pagination {
  display: flex; align-items: center; justify-content: center; gap: var(--sp-2); flex-wrap: wrap;
}
.page-btn {
  width: 36px; height: 36px; border-radius: var(--r-lg);
  border: 1.5px solid var(--border); background: var(--surface);
  color: var(--text-muted); font-size: .88rem; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .15s;
}
.page-btn:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
.page-btn.page-active { background: var(--primary); border-color: var(--primary); color: #fff; }
.page-btn:disabled { opacity: .35; cursor: not-allowed; }

/* ══ Order CTA ══ */
.order-cta {
  background: linear-gradient(135deg, #1a0a0a 0%, #2d1015 100%);
  border-radius: var(--r-3xl); padding: var(--sp-8); box-shadow: var(--shadow-lg);
}
.cta-inner { display: flex; align-items: center; gap: var(--sp-6); flex-wrap: wrap; }
.cta-text { flex: 1; min-width: 200px; }
.cta-text h2 { margin: 0 0 var(--sp-1); font-size: 1.3rem; font-weight: 800; color: #fff; }
.cta-text p  { margin: 0; font-size: .88rem; color: rgba(255,255,255,.65); line-height: 1.5; }
.cta-btn {
  display: flex; align-items: center; gap: var(--sp-3);
  background: var(--primary); color: #fff; text-decoration: none;
  border-radius: var(--r-xl); padding: var(--sp-4) var(--sp-6);
  box-shadow: var(--shadow-primary); transition: opacity .15s; white-space: nowrap; flex-shrink: 0;
}
.cta-btn:hover { opacity: .88; }
.cta-num { font-size: 1.5rem; font-weight: 900; letter-spacing: .08em; }
.cta-platforms { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; width: 100%; }
.platform-label { font-size: .78rem; color: rgba(255,255,255,.5); }
.platform-chip {
  background: rgba(255,255,255,.1); color: rgba(255,255,255,.8);
  border: 1px solid rgba(255,255,255,.15);
  padding: 4px var(--sp-3); border-radius: var(--r-pill); font-size: .78rem; font-weight: 600;
}

/* ══ Responsive ══ */
@media (max-width: 860px) {
  .filter-bar { padding: var(--sp-3) var(--sp-4); gap: var(--sp-3); }
  .search-wrap { min-width: 0; width: 100%; }
  .cat-tabs { gap: var(--sp-2); }
  .menu-hero { padding: var(--sp-8) var(--sp-4); min-height: 260px; }
  .hero-ar { font-size: 1.7rem; }
}
@media (max-width: 640px) {
  .menu-body { padding: var(--sp-6) var(--sp-4); gap: var(--sp-8); }
  .hero-tags { gap: var(--sp-2); }
  .tag { font-size: .72rem; padding: 4px var(--sp-3); }
  .section-label { flex-direction: column; gap: var(--sp-3); }
  .daqqah-card { flex-direction: column; }
  .cta-inner { flex-direction: column; align-items: flex-start; gap: var(--sp-5); }
  .cta-btn { width: 100%; justify-content: center; }
  .order-cta { padding: var(--sp-5); border-radius: var(--r-2xl); }
  .items-grid { grid-template-columns: 1fr; }
}
</style>
