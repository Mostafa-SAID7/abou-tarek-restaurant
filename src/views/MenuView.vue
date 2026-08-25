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
