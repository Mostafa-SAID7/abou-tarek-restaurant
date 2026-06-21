<template>
  <Transition name="loader-out" @after-leave="$emit('done')">
    <div v-if="visible" class="app-loader" aria-label="جار التحميل…" aria-live="polite" role="status">

      <!-- ══ NAVBAR SKELETON ══ -->
      <div class="sk-navbar">
        <div class="sk-nb-inner">
          <!-- Logo -->
          <div class="sk-logo"></div>

          <!-- Nav pills -->
          <div class="sk-nav-pills">
            <div class="sk-pill delay-05 sk-w-64"></div>
            <div class="sk-pill delay-10 sk-w-52"></div>
            <div class="sk-pill delay-15 sk-w-60"></div>
            <div class="sk-pill delay-20 sk-w-68"></div>
            <div class="sk-pill delay-25 sk-w-72"></div>
            <div class="sk-pill delay-30 sk-w-76"></div>
          </div>

          <!-- End cluster -->
          <div class="sk-nb-end">
            <div class="sk-btn-sm delay-12 sk-w-40"></div>
            <div class="sk-circle delay-18"></div>
            <div class="sk-btn-sm delay-22 sk-w-70"></div>
            <div class="sk-btn-sm delay-28 sk-w-56"></div>
          </div>
        </div>
      </div>

      <!-- ══ HERO SKELETON ══ -->
      <div class="sk-hero">
        <!-- Brand mark -->
        <div class="sk-brand-mark">
          <img src="/koshary-logo.png" alt="" class="sk-brand-img" />
        </div>

        <!-- Text block — end side -->
        <div class="sk-hero-text">
          <div class="sk-eyebrow delay-10"></div>
          <div class="sk-headline sk-h1 delay-18 sk-w-72p"></div>
          <div class="sk-headline sk-h1 delay-22 sk-w-50p"></div>
          <div class="sk-line delay-30 sk-w-90p"></div>
          <div class="sk-line delay-36 sk-w-70p"></div>
          <div class="sk-cta-row">
            <div class="sk-cta-btn delay-42"></div>
            <div class="sk-cta-ghost delay-48"></div>
          </div>
        </div>

        <!-- Character placeholder — start side -->
        <div class="sk-hero-char delay-30"></div>

        <!-- Pulsing ring -->
        <div class="sk-pulse-ring" aria-hidden="true"></div>
      </div>

      <!-- ══ SEPARATOR ══ -->
      <div class="sk-separator delay-40"></div>

      <!-- ══ HISTORY SECTION SKELETON ══ -->
      <div class="sk-section sk-history">
        <div class="sk-section-inner">
          <!-- Section label -->
          <div class="sk-section-label">
            <div class="sk-tag delay-35"></div>
            <div class="sk-section-title delay-40"></div>
          </div>
          <!-- Video block -->
          <div class="sk-video delay-45">
            <div class="sk-play-btn"></div>
          </div>
          <!-- 3-column cards -->
          <div class="sk-card-grid">
            <div v-for="(d, i) in 3" :key="i" class="sk-card" :style="{ animationDelay: (.50 + i * .08) + 's' }">
              <div class="sk-card-icon"></div>
              <div class="sk-card-title"></div>
              <div class="sk-card-line"></div>
              <div class="sk-card-line sk-card-line-80"></div>
              <div class="sk-card-line sk-card-line-65"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ ACHIEVEMENT SKELETON ══ -->
      <div class="sk-section sk-achievement">
        <div class="sk-section-inner sk-achieve-inner">
          <div class="sk-achieve-img delay-55"></div>
          <div class="sk-achieve-text">
            <div class="sk-tag delay-58"></div>
            <div class="sk-headline sk-h2 delay-62 sk-w-90p"></div>
            <div class="sk-headline sk-h2 delay-66 sk-w-65p"></div>
            <div class="sk-line delay-70"></div>
            <div class="sk-line delay-74 sk-w-80p"></div>
            <div class="sk-btn-sm delay-78 sk-w-120"></div>
          </div>
        </div>
        <!-- Stats row -->
        <div class="sk-stats-row">
          <div v-for="i in 4" :key="i" class="sk-stat" :style="{ animationDelay: (.80 + i * .06) + 's' }">
            <div class="sk-stat-num"></div>
            <div class="sk-stat-lbl"></div>
          </div>
        </div>
      </div>

      <!-- ══ NEWS SKELETON ══ -->
      <div class="sk-section sk-news">
        <div class="sk-section-inner">
          <div class="sk-news-header">
            <div class="sk-section-title delay-85"></div>
            <div class="sk-btn-sm delay-88 sk-w-80"></div>
          </div>
          <div class="sk-news-grid">
            <div v-for="i in 3" :key="i" class="sk-news-card" :style="{ animationDelay: (.90 + i * .08) + 's' }">
              <div class="sk-news-thumb"></div>
              <div class="sk-news-body">
                <div class="sk-tag"></div>
                <div class="sk-card-title"></div>
                <div class="sk-card-line"></div>
                <div class="sk-card-line sk-card-line-70"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ LOADING PROGRESS BAR ══ -->
      <div class="sk-progress" aria-hidden="true">
        <div class="sk-progress-bar" :style="{ width: progress + '%' }"></div>
      </div>

    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineEmits(['done'])

const visible  = ref(true)
const progress = ref(0)

let pTimer  = null
let pInterval = null

onMounted(() => {
  /* Animate progress bar 0→88% during the minimum display window,
     then jump to 100% just before hiding */
  let p = 0
  pInterval = setInterval(() => {
    // Fast at first (0→70%), then slow (70→88%)
    const step = p < 70 ? 3.5 : p < 85 ? 0.6 : 0
    p = Math.min(88, p + step)
    progress.value = p
  }, 40)

  /* Minimum 1.2 s display so the shimmer always plays a full cycle */
  pTimer = setTimeout(() => {
    clearInterval(pInterval)
    progress.value = 100
    setTimeout(() => {
      visible.value = false
    }, 180)
  }, 1200)
})

onBeforeUnmount(() => {
  clearTimeout(pTimer)
  clearInterval(pInterval)
})
</script>

<style scoped>
/* ══════════════════════════════════════════════
   SHIMMER KEYFRAMES
══════════════════════════════════════════════ */
@keyframes shimmer {
  0%   { transform: translateX(-150%); }
  100% { transform: translateX(150%); }
}
@keyframes shimmerRTL {
  0%   { transform: translateX(150%); }
  100% { transform: translateX(-150%); }
}
@keyframes pulse {
  0%, 100% { opacity: .5; transform: scale(1); }
  50%       { opacity: .8; transform: scale(1.04); }
}
@keyframes ringPulse {
  0%   { transform: translate(-50%,-50%) scale(.6); opacity: .6; }
  100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0; }
}
@keyframes progressSlide {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ══════════════════════════════════════════════
   SHIMMER MIXIN — applied to every skeleton el
══════════════════════════════════════════════ */
.sk-logo, .sk-pill, .sk-btn-sm, .sk-circle,
.sk-eyebrow, .sk-headline, .sk-line,
.sk-cta-btn, .sk-cta-ghost, .sk-hero-char,
.sk-tag, .sk-section-title, .sk-video,
.sk-card, .sk-card-icon, .sk-card-title, .sk-card-line,
.sk-achieve-img, .sk-stat, .sk-stat-num, .sk-stat-lbl,
.sk-news-card, .sk-news-thumb,
.sk-separator {
  position: relative; overflow: hidden;
  background: var(--sk-base);
  border-radius: var(--sk-r);
}

/* Shimmer sweep pseudo-element */
.sk-logo::after, .sk-pill::after, .sk-btn-sm::after, .sk-circle::after,
.sk-eyebrow::after, .sk-headline::after, .sk-line::after,
.sk-cta-btn::after, .sk-cta-ghost::after, .sk-hero-char::after,
.sk-tag::after, .sk-section-title::after, .sk-video::after,
.sk-card::after, .sk-card-icon::after, .sk-card-title::after, .sk-card-line::after,
.sk-achieve-img::after, .sk-stat::after, .sk-stat-num::after, .sk-stat-lbl::after,
.sk-news-card::after, .sk-news-thumb::after,
.sk-separator::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(
    105deg,
    transparent 20%,
    var(--sk-sheen) 50%,
    transparent 80%
  );
  animation: shimmer 1.7s ease-in-out infinite;
  animation-delay: inherit;
  pointer-events: none;
}
/* RTL: reverse shimmer direction */
html[dir="rtl"] .sk-logo::after,
html[dir="rtl"] .sk-pill::after,
html[dir="rtl"] .sk-headline::after,
html[dir="rtl"] .sk-line::after,
html[dir="rtl"] .sk-card::after,
html[dir="rtl"] .sk-section-title::after,
html[dir="rtl"] .sk-news-card::after {
  animation-name: shimmerRTL;
}

/* ══════════════════════════════════════════════
   CSS VARIABLES
══════════════════════════════════════════════ */
.app-loader {
  --sk-base:  rgba(255,255,255,.08);
  --sk-sheen: rgba(255,255,255,.16);
  --sk-r:     8px;
  --sk-gap:   16px;

  position: fixed; inset: 0; z-index: 9999;
  overflow-y: auto; overflow-x: hidden;
  background: var(--bg, #f7f3f3);
}
[data-theme="dark"] .app-loader {
  --sk-base:  rgba(255,255,255,.06);
  --sk-sheen: rgba(255,255,255,.12);
}

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
.sk-navbar {
  height: 66px; background: #0d0d0d;
  position: sticky; top: 0; z-index: 10;
  border-bottom: 1px solid rgba(255,255,255,.06);
}
.sk-nb-inner {
  max-width: 1300px; margin: 0 auto; height: 100%;
  display: flex; align-items: center; gap: 16px; padding: 0 24px;
}
.sk-logo {
  width: 56px; height: 56px; border-radius: 12px; flex-shrink: 0;
  background: rgba(255,255,255,.1);
  overflow: hidden;
}
.sk-logo::after { background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,.18) 50%, transparent 80%); }
.sk-nav-pills { display: flex; gap: 8px; flex: 1; justify-content: center; }
.sk-pill {
  height: 28px; border-radius: 8px;
  background: rgba(255,255,255,.08);
}
.sk-nb-end { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
.sk-btn-sm  { height: 32px; border-radius: 8px; background: rgba(255,255,255,.1); }
.sk-circle  { width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,.1); }

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
.sk-hero {
  min-height: 100vh; position: relative;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(160deg, #0a0202 0%, #2a0808 40%, #0d0203 80%, #000 100%);
  overflow: hidden;
}
.sk-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 65% 40%, rgba(139,9,32,.5) 0%, transparent 60%);
}

/* Brand mark - faded logo in center during load */
.sk-brand-mark {
  position: absolute; top: 50%; left: 50%; z-index: 1;
  transform: translate(-50%, -50%);
  animation: pulse 2s ease-in-out infinite;
  pointer-events: none;
}
.sk-brand-img {
  width: clamp(140px, 18vw, 240px);
  height: auto; object-fit: contain;
  opacity: .15;
  filter: grayscale(1);
}

/* Pulsing ring */
.sk-pulse-ring {
  position: absolute; top: 50%; left: 50%; z-index: 1;
  width: 80px; height: 80px; border-radius: 50%;
  border: 2px solid rgba(200,16,46,.4);
  animation: ringPulse 2.4s ease-out infinite;
  pointer-events: none;
}

/* Hero text — end side */
.sk-hero-text {
  position: relative; z-index: 2;
  max-width: 600px; padding: 0 32px;
  display: flex; flex-direction: column; gap: 14px;
  text-align: end;
}
.sk-eyebrow {
  width: 120px; height: 14px;
  background: rgba(255,255,255,.12);
  margin-inline-start: auto;
}
.sk-h1 { height: 52px; border-radius: 10px; background: rgba(255,255,255,.12); }
.sk-h2 { height: 36px; border-radius: 8px;  background: rgba(255,255,255,.1); }
.sk-line {
  width: 100%; height: 14px;
  background: rgba(255,255,255,.08);
}
.sk-cta-row { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
.sk-cta-btn  { width: 140px; height: 48px; border-radius: 14px; background: rgba(200,16,46,.35); }
.sk-cta-ghost{ width: 120px; height: 48px; border-radius: 14px; background: rgba(255,255,255,.1); }

/* Hero character */
.sk-hero-char {
  position: absolute; bottom: 0;
  inset-inline-start: clamp(20px, 6vw, 120px);
  width: clamp(140px, 18vw, 280px); height: clamp(220px, 28vw, 420px);
  border-radius: 20px 20px 0 0;
  background: rgba(255,255,255,.06);
}

/* ══════════════════════════════════════════════
   SEPARATOR
══════════════════════════════════════════════ */
.sk-separator {
  width: 40%; max-width: 360px; height: 32px;
  margin: 16px auto; border-radius: 16px;
  background: rgba(0,0,0,.06);
}

/* ══════════════════════════════════════════════
   SECTIONS
══════════════════════════════════════════════ */
.sk-section { background: var(--bg, #f7f3f3); padding: 48px 0; }
.sk-section.sk-achievement { background: var(--surface, #fff); border-top: 1px solid var(--border, #e8d8d8); border-bottom: 1px solid var(--border, #e8d8d8); }
.sk-section-inner { max-width: 1100px; margin: 0 auto; padding: 0 32px; }

/* Section label */
.sk-section-label { text-align: center; margin-bottom: 32px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.sk-tag { width: 80px; height: 22px; border-radius: 99px; background: rgba(200,16,46,.12); }
.sk-section-title { width: 280px; height: 32px; border-radius: 8px; }

/* Video */
.sk-video {
  width: 100%; aspect-ratio: 16/7; border-radius: 18px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, rgba(26,10,10,.6), rgba(45,16,16,.8));
  display: flex; align-items: center; justify-content: center;
}
.sk-video::after { background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,.06) 50%, transparent 80%); border-radius: 18px; }
.sk-play-btn {
  width: 72px; height: 72px; border-radius: 50%;
  background: rgba(200,16,46,.3);
  border: 2px solid rgba(200,16,46,.5);
  animation: pulse 2s ease-in-out infinite;
}

/* History cards */
.sk-card-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.sk-card { border-radius: 18px; padding: 24px; display: flex; flex-direction: column; gap: 10px; border: 1.5px solid var(--border, #e8d8d8); }
.sk-card::after { border-radius: 18px; }
.sk-card-icon     { width: 40px; height: 40px; border-radius: 10px; }
.sk-card-title    { width: 70%;  height: 18px; }
.sk-card-line     { width: 100%; height: 12px; }
.sk-card-line-80  { width: 80%; }
.sk-card-line-70  { width: 70%; }
.sk-card-line-65  { width: 65%; }

/* Achievement */
.sk-achieve-inner { display: grid; grid-template-columns: 1fr 1.2fr; gap: 40px; align-items: center; margin-bottom: 40px; }
.sk-achieve-img { aspect-ratio: 4/3; border-radius: 18px; }
.sk-achieve-text { display: flex; flex-direction: column; gap: 14px; }

/* Stats */
.sk-stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; max-width: 1100px; margin: 0 auto; padding: 0 32px; }
.sk-stat { border-radius: 18px; padding: 24px 16px; border: 1.5px solid var(--border, #e8d8d8); display: flex; flex-direction: column; align-items: center; gap: 10px; }
.sk-stat::after { border-radius: 18px; }
.sk-stat-num { width: 60px; height: 32px; border-radius: 6px; }
.sk-stat-lbl { width: 80px; height: 14px; border-radius: 6px; }

/* News */
.sk-news-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.sk-news-grid   { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.sk-news-card { border-radius: 18px; overflow: hidden; border: 1.5px solid var(--border, #e8d8d8); display: flex; flex-direction: column; }
.sk-news-card::after { border-radius: 0; }
.sk-news-thumb { width: 100%; aspect-ratio: 16/9; background: rgba(26,10,10,.08); border-radius: 0; }
.sk-news-thumb::after { border-radius: 0; }
.sk-news-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; }

/* ══════════════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════════════ */
.sk-progress {
  position: fixed; top: 0; left: 0; right: 0; z-index: 99999;
  height: 3px; background: rgba(0,0,0,.1);
  animation: progressSlide .2s ease;
}
.sk-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary, #C8102E), var(--gold, #F5A623));
  transition: width .12s ease;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 10px rgba(200,16,46,.5);
}

/* ══════════════════════════════════════════════
   EXIT TRANSITION
══════════════════════════════════════════════ */
.loader-out-leave-active {
  transition: opacity .4s ease, transform .4s ease;
}
.loader-out-leave-to {
  opacity: 0;
  transform: scale(1.015);
}

/* ══════════════════════════════════════════════
   SKELETON WIDTH HELPERS
   Static pixel / percentage widths for skeleton
   elements — keeps template free of inline styles.
══════════════════════════════════════════════ */
.sk-w-40  { width:  40px; } .sk-w-52  { width:  52px; } .sk-w-56  { width:  56px; }
.sk-w-60  { width:  60px; } .sk-w-64  { width:  64px; } .sk-w-68  { width:  68px; }
.sk-w-70  { width:  70px; } .sk-w-72  { width:  72px; } .sk-w-76  { width:  76px; }
.sk-w-80  { width:  80px; } .sk-w-120 { width: 120px; }
.sk-w-50p { width:  50%; } .sk-w-65p { width:  65%; } .sk-w-70p { width:  70%; }
.sk-w-72p { width:  72%; } .sk-w-80p { width:  80%; } .sk-w-90p { width:  90%; }

/* ══════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════ */
@media (max-width: 860px) {
  .sk-card-grid   { grid-template-columns: 1fr 1fr; }
  .sk-achieve-inner { grid-template-columns: 1fr; }
  .sk-stats-row   { grid-template-columns: 1fr 1fr; }
  .sk-news-grid   { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .sk-nav-pills { display: none; }
  .sk-card-grid { grid-template-columns: 1fr; }
  .sk-news-grid { grid-template-columns: 1fr; }
  .sk-achieve-inner { grid-template-columns: 1fr; }
  .sk-section-inner { padding: 0 16px; }
  .sk-hero-text { padding: 0 16px; }
}
</style>
