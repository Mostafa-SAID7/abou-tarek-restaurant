<template>
  <DefaultLayout>
    <LoadingSpinner v-if="loading" :full="true" label="Loading branch…" />

    <div v-else-if="restaurant" class="detail-page">
      <button class="back-link" @click="$router.back()">
        <AppIcon name="arrow-left" :size="17" aria-hidden="true" />
        Back to branches
      </button>

      <!-- Hero -->
      <div class="detail-hero">
        <div class="hero-bowl" aria-hidden="true"><AppIcon name="bowl" :size="80" color="rgba(255,255,255,.85)" /></div>
        <div class="hero-info">
          <div class="hero-top">
            <div>
              <div class="hero-badges">
                <span v-if="restaurant.isMainBranch" class="badge badge-gold">
                  <AppIcon name="star-fill" :size="11" aria-hidden="true" />
                  Flagship
                </span>
                <span class="badge badge-glass">
                  {{ restaurant.area }}
                </span>
              </div>
              <h1 class="hero-title">{{ restaurant.name }}</h1>
            </div>
            <button
              class="fav-btn"
              @click="store.toggleFavorite(String(restaurant.id))"
              :aria-pressed="isFav"
              :aria-label="isFav ? 'Remove from saved' : 'Save branch'"
            >
              <AppIcon :name="isFav ? 'heart-fill' : 'heart'" :size="18"
                :color="isFav ? '#ff8080' : 'rgba(255,255,255,.75)'" aria-hidden="true" />
              {{ isFav ? 'Saved' : 'Save' }}
            </button>
          </div>
          <p class="hero-desc" v-if="restaurant.description">{{ restaurant.description }}</p>
        </div>
      </div>

      <!-- Detail grid -->
      <div class="detail-grid">
        <div class="detail-card card">
          <div class="detail-icon-wrap">
            <AppIcon name="map-pin" :size="22" color="var(--primary)" aria-hidden="true" />
          </div>
          <div>
            <p class="detail-label">Address</p>
            <p class="detail-value">{{ restaurant.address }}</p>
          </div>
        </div>
        <div class="detail-card card">
          <div class="detail-icon-wrap">
            <AppIcon name="phone" :size="22" color="var(--primary)" aria-hidden="true" />
          </div>
          <div>
            <p class="detail-label">Phone</p>
            <p class="detail-value">
              <a :href="`tel:${restaurant.contact}`" class="phone-link">{{ restaurant.contact }}</a>
            </p>
          </div>
        </div>
        <div class="detail-card card">
          <div class="detail-icon-wrap">
            <AppIcon name="clock" :size="22" color="var(--text-muted)" aria-hidden="true" />
          </div>
          <div>
            <p class="detail-label">Opening Hours</p>
            <p class="detail-value">{{ restaurant.hours || 'See branch' }}</p>
          </div>
        </div>
        <div class="detail-card card">
          <div class="detail-icon-wrap">
            <AppIcon name="truck" :size="22"
              :color="restaurant.delivery ? 'var(--success)' : 'var(--text-muted)'" aria-hidden="true" />
          </div>
          <div>
            <p class="detail-label">Delivery</p>
            <p class="detail-value" :class="restaurant.delivery ? 'text-success' : 'text-muted'">
              {{ restaurant.delivery
                ? `Available · Hotline ${restaurant.hotline || '16011'}`
                : 'Not available' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Hotline banner -->
      <div v-if="restaurant.delivery" class="hotline-banner">
        <AppIcon name="phone" :size="20" color="var(--gold-text)" aria-hidden="true" />
        <span class="hotline-text">Order Delivery</span>
        <a :href="`tel:${restaurant.hotline || '16011'}`" class="hotline-num">
          {{ restaurant.hotline || '16011' }}
        </a>
        <span class="hotline-sub">Daily 7 AM – 10 PM</span>
      </div>

      <!-- Admin actions -->
      <div v-if="auth.isAuthenticated" class="detail-actions">
        <router-link :to="{ name: 'Update', params: { id: restaurant.id } }" class="btn btn-secondary">
          <AppIcon name="edit" :size="15" aria-hidden="true" />
          Edit Branch
        </router-link>
        <button class="btn btn-danger" @click="showDelete = true">
          <AppIcon name="trash" :size="15" aria-hidden="true" />
          Delete
        </button>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="empty-state">
      <AppIcon name="alert-circle" :size="52" color="var(--border)" aria-hidden="true" />
      <h3>Branch not found</h3>
      <router-link to="/" class="btn btn-primary">
        <AppIcon name="home" :size="16" aria-hidden="true" />
        Go Home
      </router-link>
    </div>

    <!-- Delete modal -->
    <Teleport to="body">
      <div v-if="showDelete" class="modal-overlay" @click.self="showDelete = false" role="dialog" aria-modal="true" aria-label="Confirm deletion">
        <div class="modal">
          <h3>Delete Branch?</h3>
          <p>Remove <strong>{{ restaurant?.name }}</strong>? This cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" @click="showDelete = false">Cancel</button>
            <button class="btn btn-danger" @click="doDelete">
              <AppIcon name="trash" :size="14" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import AppIcon from '../components/AppIcon.vue'
import { useBranchStore } from '../stores/restaurantStore'

const store    = useBranchStore()
const route    = useRoute()

const loading = ref(true)
const branch  = ref(null)

const isFav = computed(() => store.isFavorite(route.params.id))

onMounted(() => {
  branch.value = store.getById(route.params.id)
  loading.value = false
})
</script>

<style scoped>
.detail-page { max-width: 720px; margin: 0 auto; padding: var(--sp-8) var(--sp-6); }

/* Back link */
.back-link {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  background: none; border: none; cursor: pointer;
  color: var(--text-muted); font-size: .88rem; font-weight: 600;
  padding: 0; margin-bottom: var(--sp-6); transition: color .15s;
}
.back-link:hover { color: var(--primary); }

/* Hero */
.detail-hero {
  background: var(--hero-gradient);
  border-radius: var(--r-3xl);
  padding: var(--sp-6) var(--sp-8);
  display: flex; align-items: flex-start; gap: var(--sp-6);
  margin-bottom: var(--sp-5); box-shadow: var(--shadow-primary);
}
.hero-bowl {
  width: 72px; height: 72px; flex-shrink: 0;
  background: var(--hero-glass); border: 2px solid var(--hero-glass-border);
  border-radius: var(--r-2xl);
  display: flex; align-items: center; justify-content: center;
  font-size: 2.1rem;
}
.hero-info { flex: 1; min-width: 0; }
.hero-top { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--sp-3); flex-wrap: wrap; margin-bottom: var(--sp-3); }
.hero-badges { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-2); }
.badge-glass  { background: var(--hero-glass); color: #fff; border: 1px solid var(--hero-glass-border); }
.hero-title { margin: 0; font-size: 1.5rem; font-weight: 900; color: #fff; line-height: 1.25; }
.hero-desc  { margin: 0; font-size: .88rem; color: rgba(255,255,255,.8); line-height: 1.6; }

.fav-btn {
  display: flex; align-items: center; gap: var(--sp-2);
  background: var(--hero-glass); border: 1.5px solid var(--hero-glass-border);
  padding: 8px var(--sp-4); border-radius: var(--r-lg);
  cursor: pointer; font-size: .83rem; font-weight: 700; color: #fff;
  transition: background .15s; white-space: nowrap; flex-shrink: 0;
}
.fav-btn:hover { background: rgba(255,255,255,.28); }
.fav-btn:focus-visible { outline: 2px solid var(--gold); }

/* Detail grid */
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-3); margin-bottom: var(--sp-5); }
.detail-card { padding: var(--sp-5); display: flex; align-items: flex-start; gap: var(--sp-4); }
.detail-icon-wrap {
  width: 44px; height: 44px; flex-shrink: 0;
  background: var(--bg); border-radius: var(--r-xl);
  display: flex; align-items: center; justify-content: center;
}
.detail-label { margin: 0 0 var(--sp-1); font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--text-muted); }
.detail-value { margin: 0; font-size: .93rem; font-weight: 600; color: var(--text); }
.phone-link { color: var(--primary); }
.phone-link:hover { text-decoration: underline; }
.text-success { color: var(--success); }
.text-muted { color: var(--text-muted); }

/* Hotline banner */
.hotline-banner {
  background: var(--gold-light); border: 1.5px solid rgba(245,166,35,.35);
  border-radius: var(--r-xl); padding: var(--sp-4) var(--sp-6);
  display: flex; align-items: center; gap: var(--sp-4);
  margin-bottom: var(--sp-6); flex-wrap: wrap;
}
.hotline-text { font-size: .85rem; color: var(--gold-text); font-weight: 600; }
.hotline-num { font-size: 1.55rem; font-weight: 900; color: var(--primary); letter-spacing: .08em; }
.hotline-num:hover { text-decoration: underline; }
.hotline-sub { font-size: .8rem; color: var(--text-muted); }

/* Actions */
.detail-actions { display: flex; gap: var(--sp-3); flex-wrap: wrap; }

/* Empty */
.empty-state {
  text-align: center; padding: var(--sp-12) var(--sp-6);
  display: flex; flex-direction: column; align-items: center; gap: var(--sp-5);
  color: var(--text-muted);
}
.empty-state h3 { font-size: 1.2rem; color: var(--text); margin: 0; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 500; padding: var(--sp-4); }
.modal { background: var(--surface); border-radius: var(--r-2xl); padding: var(--sp-8); max-width: 380px; width: 100%; box-shadow: var(--shadow-lg); }
.modal h3 { margin: 0 0 var(--sp-2); font-size: 1.2rem; color: var(--text); }
.modal p { margin: 0 0 var(--sp-6); color: var(--text-muted); font-size: .9rem; line-height: 1.5; }
.modal-actions { display: flex; gap: var(--sp-3); justify-content: flex-end; }

@media (max-width: 540px) {
  .detail-page { padding: var(--sp-5) var(--sp-4); }
  .detail-grid { grid-template-columns: 1fr; }
  .detail-hero { flex-direction: column; padding: var(--sp-5); }
  .hero-bowl { width: 56px; height: 56px; font-size: 1.6rem; }
}
</style>
