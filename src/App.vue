<template>
  <AppLoader v-if="loading" @done="loading = false" />

  <Transition name="page-reveal">
    <div v-if="!loading" class="app-body">
      <ErrorBoundary>
        <router-view v-slot="{ Component, route }">
          <Transition name="page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </router-view>
        <AppToast />
      </ErrorBoundary>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLoader from './components/AppLoader.vue'
import AppToast from './components/AppToast.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'

const router  = useRouter()
const loading = ref(true)

onMounted(async () => {
  await router.isReady()
  // AppLoader controls its own minimum display time (1.4s)
  // and emits 'done' when its exit animation finishes
})
</script>

<style>
/* App body wrapper */
.app-body { min-height: 100vh; display: flex; flex-direction: column; }

/* ══════════════════════════════════════════════
   DESIGN TOKENS  —  single source of truth
══════════════════════════════════════════════ */
:root {
  /* ── Brand colours ── */
  --primary:        #C8102E;
  --primary-dark:   #a00d24;
  --primary-light:  #fff0f2;
  --primary-shadow: rgba(200,16,46,.18);
  --gold:           #F5A623;
  --gold-light:     #fff8ec;
  --gold-text:      #b37400;

  /* ── Surfaces ── */
  --bg:       #f7f3f3;
  --surface:  #ffffff;
  --border:   #e8d8d8;

  /* ── Text ── */
  --text:       #1a0a0a;
  --text-muted: #7a5a5a;

  /* ── Status ── */
  --success:       #10b981;
  --success-light: #ecfdf5;
  --error:         #ef4444;
  --error-light:   #fef2f2;
  --warning:       #f59e0b;
  --warning-light: #fffbeb;
  --info:          #6366f1;
  --info-light:    #eef2ff;

  /* ── Shimmer ── */
  --shimmer-base:      #f0e0e0;
  --shimmer-mid:       #fdf4f4;
  --shimmer-gold-tint: #fef3e2;

  /* ── Border radius ── */
  --r-xs:   4px;
  --r-sm:   6px;
  --r-md:   8px;
  --r-lg:   10px;
  --r-xl:   14px;
  --r-2xl:  18px;
  --r-3xl:  24px;
  --r-pill: 9999px;

  /* ── Spacing ── */
  --sp-1:  4px;
  --sp-2:  8px;
  --sp-3:  12px;
  --sp-4:  16px;
  --sp-5:  20px;
  --sp-6:  24px;
  --sp-8:  32px;
  --sp-10: 40px;
  --sp-12: 48px;

  /* ── Shadows ── */
  --shadow-xs:      0 1px 2px rgba(0,0,0,.06);
  --shadow-sm:      0 2px 6px  rgba(0,0,0,.07);
  --shadow-md:      0 4px 14px rgba(0,0,0,.09);
  --shadow-lg:      0 8px 30px rgba(0,0,0,.12);
  --shadow-primary: 0 6px 22px var(--primary-shadow);
  --shadow-card:    0 2px 8px  rgba(0,0,0,.06);

  /* ── Layout ── */
  --grid-cards:    repeat(auto-fill, minmax(300px, 1fr));
  --grid-cards-sm: repeat(auto-fill, minmax(220px, 1fr));
  --max-content:   1200px;
  --max-body:      900px;

  /* ── Hero ── */
  --hero-gradient: linear-gradient(135deg, #8b0920 0%, var(--primary) 45%, #a50e28 100%);
  --hero-glass:    rgba(255,255,255,.13);
  --hero-glass-border: rgba(255,255,255,.22);

  /* ── Typography ── */
  --font-body:    'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-arabic:  'Cairo', 'Segoe UI', sans-serif;
  --font-display: 'Dancing Script', cursive;
}

/* ── Dark mode ── */
[data-theme="dark"] {
  --primary:        #e84060;
  --primary-dark:   #ff6080;
  --primary-light:  #2d1015;
  --primary-shadow: rgba(232,64,96,.2);
  --gold:           #F5A623;
  --gold-light:     #2d2210;
  --gold-text:      #c89030;

  --bg:       #120808;
  --surface:  #1e0e0e;
  --border:   #3d2020;

  --text:       #fdf0f0;
  --text-muted: #c49898;

  --success-light: #0d2e20;
  --error-light:   #2e0d0d;

  --shimmer-base:      #2a1212;
  --shimmer-mid:       #3d1e1e;
  --shimmer-gold-tint: #2a1a08;
}

/* ══════════════════════════════════════════════
   RESET & BASE
══════════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }
html[dir="rtl"] { direction: rtl; }
html[dir="ltr"] { direction: ltr; }

body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background .25s, color .25s;
}

a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
button, input, textarea, select { font-family: inherit; }

/* Arabic elements — Cairo */
[lang="ar"]:not(html):not(body),
.ar, .brand-ar, .hero-ar, .item-name-ar {
  font-family: var(--font-arabic);
  unicode-bidi: embed;
}

/* English display — Dancing Script */
.en-display, .hero-en, .brand-en, .script {
  font-family: var(--font-display);
  font-weight: 600;
}

/* ══════════════════════════════════════════════
   GLOBAL UTILITY CLASSES
══════════════════════════════════════════════ */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--sp-2); padding: var(--sp-3) var(--sp-5);
  border-radius: var(--r-lg); border: 1.5px solid transparent;
  font-size: .9rem; font-weight: 700; font-family: inherit;
  cursor: pointer; text-decoration: none;
  transition: all .18s ease; white-space: nowrap; line-height: 1.2;
}
.btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
.btn:disabled { opacity: .55; cursor: not-allowed; }

.btn-primary   { background: var(--primary); color: #fff; border-color: var(--primary); box-shadow: var(--shadow-primary); }
.btn-primary:hover:not(:disabled) { background: var(--primary-dark); border-color: var(--primary-dark); }
.btn-secondary { background: var(--surface); color: var(--text); border-color: var(--border); }
.btn-secondary:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
.btn-danger    { background: var(--error-light); color: var(--error); border-color: transparent; }
.btn-danger:hover:not(:disabled) { background: var(--error); color: #fff; }
.btn-ghost     { background: transparent; color: var(--text-muted); border-color: transparent; }
.btn-ghost:hover:not(:disabled) { background: var(--bg); color: var(--text); }
.btn-sm        { padding: var(--sp-1) var(--sp-3); font-size: .8rem; border-radius: var(--r-md); }
.btn-lg        { padding: var(--sp-3) var(--sp-8); font-size: 1rem; border-radius: var(--r-xl); }
.btn-full      { width: 100%; }

.icon-btn {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px; border: none; border-radius: var(--r-pill);
  background: transparent; color: inherit; cursor: pointer;
  transition: background .15s; flex-shrink: 0;
}
.icon-btn:hover { background: rgba(0,0,0,.07); }
.icon-btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

/* Form */
.form-field  { display: flex; flex-direction: column; gap: var(--sp-2); }
.form-label  { font-size: .85rem; font-weight: 600; color: var(--text); }
.form-input  {
  padding: 11px var(--sp-4); border: 1.5px solid var(--border);
  border-radius: var(--r-lg); background: var(--bg); color: var(--text);
  font-size: .95rem; font-family: inherit;
  transition: border-color .15s, box-shadow .15s;
}
.form-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-shadow); }
.form-input.has-error { border-color: var(--error); }
.form-input::placeholder { color: var(--text-muted); opacity: .7; }
.form-error-msg { font-size: .82rem; color: var(--error); }

/* Badges */
.badge         { display: inline-flex; align-items: center; gap: var(--sp-1); padding: 3px 10px; border-radius: var(--r-pill); font-size: .72rem; font-weight: 700; letter-spacing: .04em; white-space: nowrap; }
.badge-primary { background: var(--primary-light); color: var(--primary); }
.badge-gold    { background: var(--gold-light);    color: var(--gold-text); }
.badge-success { background: var(--success-light); color: var(--success); }
.badge-error   { background: var(--error-light);   color: var(--error); }

/* Card */
.card       { background: var(--surface); border: 1.5px solid var(--border); border-radius: var(--r-2xl); box-shadow: var(--shadow-card); }
.card-hover { cursor: pointer; transition: transform .2s, box-shadow .2s, border-color .2s; }
.card-hover:hover { transform: translateY(-3px); box-shadow: var(--shadow-primary); border-color: var(--primary); }

/* Page hero (shared) */
.page-hero {
  background: var(--hero-gradient);
  padding: var(--sp-12) var(--sp-10);
  position: relative; overflow: hidden;
}
.page-hero::before {
  content: ''; position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
/* Page hero children — used by all inner-page hero banners */
.page-hero-inner { position: relative; z-index: 1; }
.page-eyebrow    { font-size: .8rem; color: rgba(255,255,255,.6); text-transform: uppercase; letter-spacing: .1em; display: block; margin-bottom: var(--sp-2); }
.page-hero-title { font-size: clamp(2rem,5vw,3.5rem); font-weight: 900; color: #fff; margin: 0 0 var(--sp-3); font-family: 'Cairo', sans-serif; }
.page-hero-sub   { font-size: 1rem; color: rgba(255,255,255,.72); margin: 0; }

.hero-glass-chip {
  display: inline-flex; align-items: center; gap: var(--sp-2);
  background: var(--hero-glass); border: 1px solid var(--hero-glass-border);
  color: rgba(255,255,255,.9); padding: 5px 14px; border-radius: var(--r-pill);
  font-size: .75rem; font-weight: 600; letter-spacing: .04em;
}

/* Section eyebrow pill — small labelled tag above section headings */
.section-eyebrow { display: inline-block; font-size: .75rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: .1em; background: var(--primary-light); padding: 3px 12px; border-radius: var(--r-pill); margin-bottom: var(--sp-2); }

/* Section typography */
.section-title { font-size: 1.35rem; font-weight: 800; color: var(--text); line-height: 1.2; }
.section-sub   { font-size: .9rem; color: var(--text-muted); margin-top: var(--sp-1); }

/* Shared page body container — max-width centred column */
.content-inner { max-width: 1100px; margin: 0 auto; padding: var(--sp-10) var(--sp-8); }
@media (max-width: 640px) { .content-inner { padding: var(--sp-6) var(--sp-4); } }

/* Empty state — used when a list has no items */
.empty-state    { text-align: center; padding: var(--sp-12) var(--sp-6); display: flex; flex-direction: column; align-items: center; gap: var(--sp-4); color: var(--text-muted); }
.empty-state h3 { margin: 0; font-size: 1.2rem; color: var(--text); }
.empty-state p  { margin: 0; }

/* Loading spinner */
.spinner { display: inline-block; width: 18px; height: 18px; border: 2px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: var(--r-pill); animation: spin .7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Shimmer */
@keyframes shimmer {
  0%   { background-position: -300% center; }
  100% { background-position:  300% center; }
}
.shimmer {
  background: linear-gradient(90deg, var(--shimmer-base) 0%, var(--shimmer-mid) 30%, var(--shimmer-gold-tint) 50%, var(--shimmer-mid) 70%, var(--shimmer-base) 100%);
  background-size: 300% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
  border-radius: var(--r-sm);
}

/* Accessibility */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: var(--r-sm); }

/* Focus */
:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }

/* ══════════════════════════════════════════════
   PAGE TRANSITIONS
══════════════════════════════════════════════ */
/* App reveal after loader */
.page-reveal-enter-active { transition: opacity .5s ease, transform .5s ease; }
.page-reveal-enter-from   { opacity: 0; transform: translateY(10px); }

/* Route-to-route transitions */
.page-enter-active,
.page-leave-active { transition: opacity .18s ease, transform .18s ease; }
.page-enter-from   { opacity: 0; transform: translateY(6px); }
.page-leave-to     { opacity: 0; transform: translateY(-4px); }
</style>
