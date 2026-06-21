<template>
  <DefaultLayout>

    <!-- ── Hero Banner ── -->
    <section class="hero" aria-label="Restaurant overview">
      <div class="hero-content">
        <div class="hero-glass-chip" role="note">
          <AppIcon name="star-fill" :size="13" color="var(--gold)" aria-hidden="true" />
          TasteAtlas Top 100 Legendary Restaurants
        </div>
        <h1 class="hero-title">
          <span class="hero-ar" lang="ar">كشري أبو طارق</span>
          <span class="hero-en en-display">Koshary Abou Tarek</span>
        </h1>
        <p class="hero-sub">
          {{ t(
            'أشهر كشري في مصر منذ الخمسينيات — بدأ من عربة متجولة، وأصبح معلمًا أسطوريًا من 4 طوابق في وسط القاهرة يعشقه الملايين.',
            'Egypt\'s most iconic koshary since the 1950s — born from a street cart, now a legendary 4-story landmark in Downtown Cairo loved by millions.'
          ) }}
        </p>
        <div class="hero-stats" role="list" aria-label="Restaurant statistics">
          <template v-for="(stat, i) in heroStats" :key="stat.value">
            <div class="stat" role="listitem">
              <span class="stat-num">{{ stat.value }}</span>
              <span class="stat-label">{{ t(stat.labelAr, stat.labelEn) }}</span>
            </div>
            <div v-if="i < heroStats.length - 1" class="stat-div" aria-hidden="true"></div>
          </template>
        </div>
        <div class="hero-hotline">
          <AppIcon name="phone" :size="17" color="rgba(255,255,255,.75)" aria-hidden="true" />
          <span class="hotline-label">{{ t('اطلب التوصيل', 'Order Delivery') }}</span>
          <a class="hotline-num" href="tel:16011" aria-label="Call delivery hotline 16011">16011</a>
          <span class="hotline-sub">{{ t('يومياً ٧ ص – ١٠ م', 'Daily 7 AM – 10 PM') }}</span>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="branch-img-wrap">
          <img src="/branch1.png" alt="" class="branch-img" />
        </div>
        <div class="dish-label">{{ t('الأكلة الشعبية المصرية', 'Egypt\'s National Street Food') }}</div>
      </div>
    </section>

    <!-- ── Menu Highlights ── -->
    <section class="menu-section" aria-labelledby="menu-heading">
      <div class="section-header">
        <h2 id="menu-heading" class="section-title">
          <AppIcon name="utensils" :size="22" color="var(--primary)" aria-hidden="true" />
          {{ t('قائمتنا', 'Our Menu') }}
        </h2>
        <p class="section-sub">{{ t('بسيط. مثالي. أسطوري.', 'Simple. Perfect. Legendary.') }}</p>
      </div>
      <div class="menu-grid" role="list">
        <article v-for="item in menuHighlights" :key="item.id"
          class="menu-item" :class="{ featured: item.flags.isFeatured }" role="listitem">
          <div class="menu-icon" aria-hidden="true"><AppIcon :name="item.icon" :size="32" color="var(--primary)" /></div>
          <div class="menu-info">
            <h3>{{ t(item.name.ar, item.name.en) }}</h3>
            <p>{{ t(item.description.ar, item.description.en) }}</p>
          </div>
          <div class="menu-price">{{ displayPrice(item) }}</div>
        </article>
      </div>
    </section>

    <!-- ── Branches Section ── -->
    <section class="branches-section" aria-labelledby="branches-heading">
      <div class="branches-header">
        <div>
          <h2 id="branches-heading" class="section-title">
            <AppIcon name="map-pin" :size="22" color="var(--primary)" aria-hidden="true" />
            {{ t('فروعنا', 'Our Branches') }}
          </h2>
          <p class="section-sub" aria-live="polite">
            {{ store.filtered.length }} {{ t('فرع', 'branch') }}{{ !isAR && store.filtered.length !== 1 ? 'es' : '' }} {{ t('متاح', 'found') }}
          </p>
        </div>
        <router-link v-if="auth.isAuthenticated" to="/add" class="btn btn-primary" :aria-label="t('إضافة فرع جديد', 'Add a new branch')">
          <AppIcon name="plus" :size="16" aria-hidden="true" />
          {{ t('إضافة فرع', 'Add Branch') }}
        </router-link>
      </div>

      <!-- Toolbar -->
      <div class="toolbar" role="search">
        <div class="search-wrap">
          <label for="branch-search" class="sr-only">{{ t('ابحث عن فروع', 'Search branches') }}</label>
          <span class="search-icon-wrap" aria-hidden="true">
            <AppIcon name="search" :size="16" color="var(--text-muted)" />
          </span>
          <input
            id="branch-search"
            v-model="store.searchQuery"
            class="search-input"
            type="search"
            :placeholder="t('ابحث بالاسم أو المنطقة أو العنوان…', 'Search by name, area, address…')"
            @input="store.currentPage = 1"
            autocomplete="off"
          />
          <button
            v-if="store.searchQuery"
            class="clear-btn icon-btn"
            @click="store.searchQuery = ''; store.currentPage = 1"
            :aria-label="t('مسح البحث', 'Clear search')"
          >
            <AppIcon name="x" :size="15" aria-hidden="true" />
          </button>
        </div>
        <div class="view-toggle" role="group" :aria-label="t('وضع العرض', 'View mode')">
          <button
            :class="['toggle-btn', store.viewMode === 'grid' && 'active']"
            @click="store.setViewMode('grid')"
            :aria-pressed="store.viewMode === 'grid'"
            :aria-label="t('عرض البطاقات', 'Card view')"
          >
            <AppIcon name="grid" :size="17" aria-hidden="true" />
          </button>
          <button
            :class="['toggle-btn', store.viewMode === 'table' && 'active']"
            @click="store.setViewMode('table')"
            :aria-pressed="store.viewMode === 'table'"
            :aria-label="t('عرض الجدول', 'Table view')"
          >
            <AppIcon name="list" :size="17" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Loading -->
      <BranchSkeleton v-if="store.loading" :mode="store.viewMode" :count="6" />

      <!-- Empty: no data -->
      <template v-else-if="store.restaurants.length === 0">
        <div class="empty-state" role="status">
          <div class="empty-icon" aria-hidden="true"><AppIcon name="bowl" :size="56" color="var(--border)" /></div>
          <h3>{{ t('لا توجد فروع بعد', 'No branches yet') }}</h3>
          <p>{{ auth.isAuthenticated ? t('أضف أول فرع للبدء.', 'Add the first branch to get started.') : t('لا توجد بيانات فروع حتى الآن.', 'No branch data available yet.') }}</p>
          <router-link v-if="auth.isAuthenticated" to="/add" class="btn btn-primary">
            <AppIcon name="plus" :size="15" aria-hidden="true" />
            {{ t('إضافة فرع', 'Add Branch') }}
          </router-link>
        </div>
      </template>

      <!-- Empty: no search results -->
      <template v-else-if="store.filtered.length === 0">
        <div class="empty-state" role="status" aria-live="polite">
          <AppIcon name="search" :size="44" color="var(--border)" aria-hidden="true" />
          <h3>{{ t('لا نتائج لـ', 'No results for') }} "{{ store.searchQuery }}"</h3>
          <p>{{ t('جرّب مصطلح بحث مختلف.', 'Try a different search term.') }}</p>
          <button class="btn btn-secondary" @click="store.searchQuery = ''">{{ t('مسح البحث', 'Clear search') }}</button>
        </div>
      </template>

      <template v-else>
        <!-- Grid view -->
        <div v-if="store.viewMode === 'grid'" class="branches-grid" role="list" :aria-label="t('بطاقات الفروع', 'Branch cards')">
          <div role="listitem" v-for="r in store.paginated" :key="r.id">
            <RestaurantCard :r="r" @delete="confirmDelete" />
          </div>
        </div>

        <!-- Table view -->
        <div v-else class="table-wrap">
          <table class="table" role="table" :aria-label="t('جدول الفروع', 'Branches table')">
            <thead>
              <tr>
                <th scope="col">{{ t('الفرع', 'Branch') }}</th>
                <th scope="col">{{ t('المنطقة', 'Area') }}</th>
                <th scope="col">{{ t('التواصل', 'Contact') }}</th>
                <th scope="col">{{ t('ساعات العمل', 'Hours') }}</th>
                <th scope="col"><span class="sr-only">{{ t('محفوظ', 'Saved') }}</span></th>
                <th v-if="auth.isAuthenticated" scope="col">{{ t('الإجراءات', 'Actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in store.paginated" :key="r.id">
                <td>
                  <div class="table-name">
                    <button class="name-btn" @click="$router.push({ name: 'RestaurantDetail', params: { id: r.id } })" :aria-label="`${t('عرض تفاصيل', 'View details for')} ${r.name}`">
                      {{ r.name }}
                    </button>
                    <span v-if="r.isMainBranch" class="badge badge-gold">
                      <AppIcon name="star-fill" :size="10" aria-hidden="true" />
                      {{ t('الفرع الرئيسي', 'Flagship') }}
                    </span>
                  </div>
                </td>
                <td class="area-cell">{{ r.area }}</td>
                <td><a :href="`tel:${r.contact}`" class="phone-link">{{ r.contact }}</a></td>
                <td class="hours-cell">{{ r.hours }}</td>
                <td>
                  <button
                    class="fav-inline icon-btn"
                    @click="store.toggleFavorite(String(r.id))"
                    :aria-label="store.isFavorite(String(r.id)) ? `${t('إزالة', 'Remove')} ${r.name} ${t('من المحفوظات', 'from saved')}` : `${t('حفظ', 'Save')} ${r.name}`"
                    :aria-pressed="store.isFavorite(String(r.id))"
                  >
                    <AppIcon
                      :name="store.isFavorite(String(r.id)) ? 'heart-fill' : 'heart'"
                      :size="17"
                      :color="store.isFavorite(String(r.id)) ? 'var(--error)' : 'var(--text-muted)'"
                      aria-hidden="true"
                    />
                  </button>
                </td>
                <td v-if="auth.isAuthenticated" class="actions-cell">
                  <router-link :to="{ name: 'Update', params: { id: r.id } }" class="link-btn" :aria-label="`${t('تعديل', 'Edit')} ${r.name}`">
                    <AppIcon name="edit" :size="13" aria-hidden="true" />
                    {{ t('تعديل', 'Edit') }}
                  </router-link>
                  <button class="del-btn" @click="confirmDelete(r)" :aria-label="`${t('حذف', 'Delete')} ${r.name}`">
                    <AppIcon name="trash" :size="13" aria-hidden="true" />
                    {{ t('حذف', 'Delete') }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <nav v-if="store.totalPages > 1" class="pagination" :aria-label="t('ترقيم الصفحات', 'Branches pagination')">
          <button class="btn btn-secondary btn-sm" :disabled="store.currentPage <= 1" @click="store.currentPage--" :aria-label="t('الصفحة السابقة', 'Previous page')">
            <AppIcon :name="isAR ? 'chevron-right' : 'chevron-left'" :size="15" aria-hidden="true" />
            {{ t('السابق', 'Prev') }}
          </button>
          <span class="page-info" aria-live="polite">{{ store.currentPage }} / {{ store.totalPages }}</span>
          <button class="btn btn-secondary btn-sm" :disabled="store.currentPage >= store.totalPages" @click="store.currentPage++" :aria-label="t('الصفحة التالية', 'Next page')">
            {{ t('التالي', 'Next') }}
            <AppIcon :name="isAR ? 'chevron-left' : 'chevron-right'" :size="15" aria-hidden="true" />
          </button>
        </nav>
      </template>
    </section>

    <!-- ── Delete Modal ── -->
    <Teleport to="body">
      <div v-if="deleteTarget" class="modal-overlay" @click.self="deleteTarget = null" role="dialog" aria-modal="true" :aria-label="`${t('تأكيد حذف', 'Confirm deletion of')} ${deleteTarget.name}`">
        <div class="modal">
          <h3>{{ t('حذف الفرع؟', 'Delete Branch?') }}</h3>
          <p>{{ t('حذف', 'Remove') }} <strong>{{ deleteTarget.name }}</strong>{{ t('؟ لا يمكن التراجع عن هذا الإجراء.', '? This cannot be undone.') }}</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" @click="deleteTarget = null" autofocus>{{ t('إلغاء', 'Cancel') }}</button>
            <button class="btn btn-danger" @click="doDelete">
              <AppIcon name="trash" :size="14" aria-hidden="true" />
              {{ t('حذف', 'Delete') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </DefaultLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import BranchSkeleton from '../components/BranchSkeleton.vue'
import AppIcon from '../components/AppIcon.vue'
import { useBranchStore } from '../stores/restaurantStore'
import { usePageMeta } from '../composables/usePageMeta'
import { useLanguage } from '../composables/useLanguage'
import statsData from '../data/stats.json'
import menuData from '../data/menu.json'

usePageMeta({
  title: 'All Branches',
  description: 'Find all Koshary Abou Tarek branch locations, addresses, phone numbers, and opening hours.'
})

const store        = useBranchStore()
const { isAR, t }  = useLanguage()

const heroStats      = statsData.hero
const menuHighlights = menuData.slice(0, 3)

function displayPrice(item) {
  if (item.price === 'market') return t('سعر السوق', 'Market price')
  if (item.sizes?.length) {
    const min = Math.min(...item.sizes.map(s => s.price))
    return `~${min} ${t('ج.م.', 'EGP')}`
  }
  return `~${item.price} ${t('ج.م.', 'EGP')}`
}

onMounted(() => {
  // Branches are automatically loaded from service into the store
})
</script>

<style scoped>
/* ── Hero ── */
.hero {
  background: var(--hero-gradient);
  padding: var(--sp-12) var(--sp-10);
  display: flex; align-items: center; justify-content: space-between;
  gap: var(--sp-8); position: relative; overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.hero-content { flex: 1; max-width: 540px; position: relative; z-index: 1; }

.hero-title  { margin: var(--sp-4) 0 var(--sp-3); display: flex; flex-direction: column; gap: var(--sp-1); }
.hero-ar     { font-size: 2.5rem; font-weight: 900; color: #fff; line-height: 1.1; font-family: 'Cairo', sans-serif; }
.hero-en     { font-size: 1.05rem; color: rgba(255,255,255,.75); letter-spacing: .02em; }

.hero-sub { color: rgba(255,255,255,.82); font-size: .9rem; line-height: 1.65; margin: 0 0 var(--sp-5); max-width: 480px; }

.hero-stats   { display: flex; align-items: center; gap: var(--sp-4); margin-bottom: var(--sp-5); flex-wrap: wrap; }
.stat         { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-num     { font-size: 1.3rem; font-weight: 900; color: var(--gold); line-height: 1; }
.stat-label   { font-size: .68rem; color: rgba(255,255,255,.6); text-transform: uppercase; letter-spacing: .07em; }
.stat-div     { width: 1px; height: 28px; background: rgba(255,255,255,.2); }

.hero-hotline {
  display: inline-flex; align-items: center; gap: var(--sp-3);
  background: var(--hero-glass); border: 1px solid var(--hero-glass-border);
  border-radius: var(--r-xl); padding: 11px var(--sp-5); flex-wrap: wrap;
}
.hotline-label { font-size: .8rem; color: rgba(255,255,255,.7); white-space: nowrap; }
.hotline-num   { font-size: 1.5rem; font-weight: 900; color: var(--gold); letter-spacing: .06em; }
.hotline-num:hover { text-decoration: underline; }
.hotline-sub   { font-size: .75rem; color: rgba(255,255,255,.6); }

.hero-visual { display: flex; flex-direction: column; align-items: center; gap: var(--sp-3); position: relative; z-index: 1; flex-shrink: 0; }
.dish-circle {
  width: 150px; height: 150px;
  background: var(--hero-glass); border: 3px solid rgba(255,255,255,.22);
  border-radius: var(--r-pill); display: flex; align-items: center; justify-content: center;
  font-size: 4.5rem; box-shadow: 0 0 60px rgba(245,166,35,.25);
}
.dish-label { font-size: .8rem; color: rgba(255,255,255,.7); text-align: center; line-height: 1.4; }

/* ── Menu ── */
.menu-section { padding: var(--sp-10) var(--sp-8) var(--sp-8); border-bottom: 1px solid var(--border); }
.section-header { display: flex; flex-direction: column; gap: var(--sp-1); margin-bottom: var(--sp-5); }
.section-title  { display: flex; align-items: center; gap: var(--sp-2); }

.menu-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: var(--sp-4); }
.menu-item {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--r-2xl); padding: var(--sp-5);
  display: flex; flex-direction: column; gap: var(--sp-3);
  transition: border-color .15s, box-shadow .15s;
}
.menu-item:hover { border-color: var(--primary); box-shadow: 0 4px 16px var(--primary-shadow); }
.menu-item.featured { border-color: var(--gold); background: var(--gold-light); }
.menu-item.featured:hover { box-shadow: 0 4px 16px rgba(245,166,35,.2); }
.menu-icon { font-size: 2rem; }
.menu-info h3 { margin: 0 0 var(--sp-1); font-size: .95rem; font-weight: 800; color: var(--text); }
.menu-info p  { margin: 0; font-size: .8rem; color: var(--text-muted); line-height: 1.55; }
.menu-price {
  margin-top: auto; font-size: .88rem; font-weight: 700; color: var(--primary);
  background: var(--primary-light); padding: 4px var(--sp-3); border-radius: var(--r-md);
  align-self: flex-start;
}
.menu-item.featured .menu-price { background: rgba(245,166,35,.2); color: var(--gold-text); }

/* ── Branches ── */
.branches-section { padding: var(--sp-8); }
.branches-header  { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--sp-5); gap: var(--sp-4); flex-wrap: wrap; }

.toolbar       { display: flex; gap: var(--sp-3); margin-bottom: var(--sp-5); flex-wrap: wrap; align-items: center; }
.search-wrap   { flex: 1; min-width: 200px; position: relative; display: flex; align-items: center; }
.search-icon-wrap { position: absolute; inset-inline-start: var(--sp-3); pointer-events: none; display: flex; }
.search-input {
  width: 100%; padding: 10px var(--sp-10) 10px 38px;
  border: 1.5px solid var(--border); border-radius: var(--r-lg);
  background: var(--surface); color: var(--text); font-size: .9rem;
  transition: border-color .15s, box-shadow .15s; font-family: inherit;
}
.search-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-shadow); }
.clear-btn { position: absolute; inset-inline-end: var(--sp-2); }

.view-toggle { display: flex; gap: var(--sp-1); }
.toggle-btn {
  width: 38px; height: 38px; border: 1.5px solid var(--border);
  background: var(--surface); border-radius: var(--r-md);
  cursor: pointer; color: var(--text-muted);
  display: flex; align-items: center; justify-content: center;
  transition: all .15s;
}
.toggle-btn:hover { border-color: var(--primary); color: var(--primary); }
.toggle-btn.active { background: var(--primary); border-color: var(--primary); color: #fff; }

.branches-grid { display: grid; grid-template-columns: var(--grid-cards); gap: var(--sp-5); }

.table-wrap { overflow-x: auto; border-radius: var(--r-xl); border: 1px solid var(--border); background: var(--surface); }
.table { width: 100%; border-collapse: collapse; min-width: 580px; }
.table th {
  background: var(--bg); padding: var(--sp-3) var(--sp-4); text-align: start;
  font-size: .74rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .05em; color: var(--text-muted); border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
.table td { padding: var(--sp-3) var(--sp-4); border-bottom: 1px solid var(--border); font-size: .88rem; color: var(--text); }
.table tbody tr:last-child td { border-bottom: none; }
.table tbody tr:hover { background: var(--bg); }

.table-name { display: flex; align-items: center; gap: var(--sp-2); flex-wrap: wrap; }
.name-btn {
  cursor: pointer; font-weight: 700; color: var(--primary);
  background: none; border: none; padding: 0; font-size: inherit;
  font-family: inherit; text-align: start;
}
.name-btn:hover { text-decoration: underline; }

.area-cell  { color: var(--text-muted); font-size: .83rem; }
.hours-cell { font-size: .83rem; white-space: nowrap; }
.phone-link { color: var(--primary); font-weight: 600; }
.phone-link:hover { text-decoration: underline; }
.fav-inline { color: var(--text-muted); }

.actions-cell { display: flex; gap: var(--sp-2); align-items: center; flex-wrap: wrap; }
.link-btn {
  display: inline-flex; align-items: center; gap: var(--sp-1);
  color: var(--primary); font-weight: 600; text-decoration: none;
  font-size: .82rem; padding: 5px var(--sp-3); border-radius: var(--r-sm);
  border: 1px solid var(--primary); white-space: nowrap; transition: all .15s;
}
.link-btn:hover { background: var(--primary); color: #fff; }
.del-btn {
  display: inline-flex; align-items: center; gap: var(--sp-1);
  background: var(--error-light); color: var(--error); border: none;
  padding: 5px var(--sp-3); border-radius: var(--r-sm); cursor: pointer;
  font-size: .82rem; font-weight: 600; transition: all .15s; white-space: nowrap;
}
.del-btn:hover { background: var(--error); color: #fff; }

.pagination { display: flex; align-items: center; justify-content: center; gap: var(--sp-4); margin-top: var(--sp-6); }
.page-info  { font-size: .9rem; color: var(--text-muted); font-weight: 600; }

.empty-icon { display: flex; justify-content: center; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 500; padding: var(--sp-4); backdrop-filter: blur(4px); }
.modal { background: var(--surface); border-radius: var(--r-2xl); padding: var(--sp-8); max-width: 380px; width: 100%; box-shadow: var(--shadow-lg); animation: modalIn .18s ease-out; }
@keyframes modalIn { from { opacity: 0; transform: scale(.96) translateY(-6px); } to { opacity: 1; transform: none; } }
.modal h3 { margin: 0 0 var(--sp-2); font-size: 1.2rem; color: var(--text); }
.modal p  { margin: 0 0 var(--sp-6); color: var(--text-muted); font-size: .9rem; line-height: 1.55; }
.modal-actions { display: flex; gap: var(--sp-3); justify-content: flex-end; }

/* ── Responsive ── */
@media (max-width: 860px) {
  .hero { padding: var(--sp-8) var(--sp-6); }
  .hero-visual { display: none; }
  .menu-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .hero { padding: var(--sp-6) var(--sp-4); gap: var(--sp-4); }
  .hero-ar { font-size: 1.9rem; }
  .menu-section, .branches-section { padding: var(--sp-5) var(--sp-4); }
  .menu-grid { grid-template-columns: 1fr; }
  .branches-grid { grid-template-columns: 1fr; }
  .toolbar { flex-direction: column; align-items: stretch; }
  .view-toggle { align-self: flex-end; }
}
</style>
