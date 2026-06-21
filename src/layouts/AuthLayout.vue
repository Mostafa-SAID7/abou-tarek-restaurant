<template>
  <div class="auth-shell">
    <div class="auth-card card">
      <div class="auth-brand">
        <div class="auth-logo">
          <AppIcon name="bowl" :size="28" color="#fff" aria-hidden="true" />
        </div>
        <div class="brand-text">
          <span class="brand-ar">كشري أبو طارق</span>
          <span class="brand-en">Koshary Abou Tarek</span>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import AppIcon from '../components/AppIcon.vue'
</script>

<style scoped>
.auth-shell {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f0f0 0%, #fff5f5 100%);
  display: flex; align-items: center; justify-content: center;
  padding: var(--sp-6);
}
[data-theme="dark"] .auth-shell {
  background: linear-gradient(135deg, var(--bg) 0%, var(--surface) 100%);
}
.auth-card {
  padding: var(--sp-12) var(--sp-10);
  width: 100%; max-width: 440px;
  box-shadow: 0 12px 48px var(--primary-shadow);
  border-radius: var(--r-3xl);
}
.auth-brand {
  display: flex; align-items: center; justify-content: center;
  gap: var(--sp-3); margin-bottom: var(--sp-8);
}
.auth-logo {
  width: 52px; height: 52px;
  background: var(--primary); border-radius: var(--r-xl);
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-primary);
}
.brand-text { display: flex; flex-direction: column; gap: 2px; }
.brand-ar { font-size: 1.05rem; font-weight: 900; color: var(--primary); line-height: 1; }
.brand-en { font-size: .7rem; font-weight: 600; color: var(--text-muted); letter-spacing: .04em; line-height: 1; }

@media (max-width: 480px) {
  .auth-card { padding: var(--sp-8) var(--sp-6); }
}
</style>
