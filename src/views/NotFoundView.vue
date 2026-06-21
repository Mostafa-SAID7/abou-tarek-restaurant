<template>
  <DefaultLayout>
    <div class="notfound-page">
      <!-- Animated koshary bowl -->
      <div class="bowl-wrap" aria-hidden="true">
        <div class="steam steam1"></div>
        <div class="steam steam2"></div>
        <div class="steam steam3"></div>
        <div class="bowl-icon">
          <AppIcon name="bowl" :size="96" color="var(--primary)" aria-hidden="true" />
        </div>
      </div>

      <div class="notfound-code">
        <span class="digit digit-4">4</span>
        <span class="digit digit-0">0</span>
        <span class="digit digit-4b">4</span>
      </div>

      <h1 class="notfound-title">{{ t('الصفحة غير موجودة', 'Page Not Found') }}</h1>
      <p class="notfound-sub">
        {{ t(
          'يبدو أن هذه الصفحة ذهبت تأكل كشري ولم تعد!',
          'Looks like this page went out for koshary and never came back!'
        ) }}
      </p>

      <div class="notfound-actions">
        <router-link to="/" class="btn btn-primary">
          <AppIcon name="home" :size="16" />
          {{ t('الرئيسية', 'Go Home') }}
        </router-link>
        <router-link to="/branches" class="btn btn-secondary">
          <AppIcon name="map-pin" :size="16" />
          {{ t('الفروع', 'See Branches') }}
        </router-link>
      </div>

      <!-- Floating particles -->
      <div class="particles" aria-hidden="true">
        <span v-for="(p, i) in particles" :key="i" class="particle"
          :style="{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.dur, opacity: p.opacity }">
          <AppIcon name="bowl" :size="p.size" color="var(--primary)" aria-hidden="true" />
        </span>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AppIcon from '../components/AppIcon.vue'
import { useLanguage } from '../composables/useLanguage'
import particles from '../data/particles.json'

const { t } = useLanguage()
</script>

<style scoped>
.notfound-page {
  min-height: 70vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center; padding: var(--sp-12) var(--sp-6);
  position: relative; overflow: hidden;
}

/* ── Bowl ── */
.bowl-wrap {
  position: relative; margin-bottom: var(--sp-4);
  animation: bowlFloat 3s ease-in-out infinite;
}
.bowl-icon {
  display: block;
  filter: drop-shadow(0 8px 24px rgba(200,16,46,.3));
  animation: bowlSpin 8s linear infinite;
}
@keyframes bowlFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}
@keyframes bowlSpin {
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(-5deg); }
  75%  { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}

/* ── Steam ── */
.steam {
  position: absolute; bottom: 90%; left: 50%;
  width: 6px; height: 30px;
  background: rgba(255,255,255,.2);
  border-radius: 9999px;
  animation: steamRise 2s ease-in-out infinite;
  transform-origin: bottom center;
}
.steam1 { margin-left: -16px; animation-delay: 0s; }
.steam2 { margin-left: 0px;   animation-delay: 0.4s; height: 40px; }
.steam3 { margin-left: 14px;  animation-delay: 0.8s; height: 24px; }
@keyframes steamRise {
  0%   { opacity: 0; transform: scaleX(1) translateY(0); }
  40%  { opacity: 1; }
  100% { opacity: 0; transform: scaleX(2.5) translateY(-40px); }
}

/* ── 404 digits ── */
.notfound-code {
  display: flex; align-items: center; gap: var(--sp-2);
  margin-bottom: var(--sp-4);
}
.digit {
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 900; line-height: 1;
  color: var(--primary); font-family: 'Cairo', sans-serif;
}
.digit-4  { animation: digitPop 0.6s cubic-bezier(.36,.07,.19,.97) both; }
.digit-0  { animation: digitPop 0.6s cubic-bezier(.36,.07,.19,.97) .12s both; color: var(--gold); }
.digit-4b { animation: digitPop 0.6s cubic-bezier(.36,.07,.19,.97) .24s both; }
@keyframes digitPop {
  0%  { opacity: 0; transform: scale(.3) rotate(-10deg); }
  60% { transform: scale(1.15) rotate(2deg); }
  100%{ opacity: 1; transform: scale(1) rotate(0deg); }
}

/* ── Text ── */
.notfound-title {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 800; color: var(--text);
  margin: 0 0 var(--sp-3);
  animation: fadeUp .5s .3s both;
}
.notfound-sub {
  font-size: .95rem; color: var(--text-muted);
  max-width: 420px; line-height: 1.6;
  margin: 0 0 var(--sp-8);
  animation: fadeUp .5s .45s both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}

.notfound-actions {
  display: flex; gap: var(--sp-3); flex-wrap: wrap; justify-content: center;
  animation: fadeUp .5s .55s both;
}

/* ── Floating particles ── */
.particles { position: absolute; inset: 0; pointer-events: none; }
.particle {
  position: absolute;
  animation: particleDrift var(--dur, 4s) var(--delay, 0s) ease-in-out infinite alternate;
}
@keyframes particleDrift {
  from { transform: translateY(0) rotate(0deg); }
  to   { transform: translateY(-20px) rotate(15deg); }
}
</style>
