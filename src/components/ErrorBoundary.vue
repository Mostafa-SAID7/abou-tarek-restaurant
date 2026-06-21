<template>
  <slot v-if="!hasError" />
  <div v-else class="error-boundary">
    <div class="eb-card">
      <div class="eb-icon" aria-hidden="true"><AppIcon name="alert-circle" :size="56" color="var(--error)" /></div>
      <h2 class="eb-title">{{ t('حدث خطأ ما', 'Something went wrong') }}</h2>
      <p class="eb-sub">{{ t('نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.', 'We\'re sorry about this. Please try again.') }}</p>
      <details v-if="errorMessage" class="eb-details">
        <summary class="eb-summary">{{ t('تفاصيل الخطأ', 'Error details') }}</summary>
        <pre class="eb-pre">{{ errorMessage }}</pre>
      </details>
      <div class="eb-actions">
        <button class="btn btn-primary" @click="reset">
          <AppIcon name="refresh-cw" :size="15" />
          {{ t('إعادة المحاولة', 'Try Again') }}
        </button>
        <router-link to="/" class="btn btn-secondary">
          <AppIcon name="home" :size="15" />
          {{ t('الرئيسية', 'Go Home') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import AppIcon from './AppIcon.vue'

const { t } = useLanguage()

const hasError    = ref(false)
const errorMessage = ref('')

onErrorCaptured((err) => {
  hasError.value     = true
  errorMessage.value = err?.message || String(err)
  return false
})

function reset() {
  hasError.value     = false
  errorMessage.value = ''
}
</script>

<style scoped>
.error-boundary {
  min-height: 60vh;
  display: flex; align-items: center; justify-content: center;
  padding: var(--sp-8) var(--sp-4);
  background: var(--bg);
}
.eb-card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--r-2xl);
  padding: var(--sp-10) var(--sp-8);
  max-width: 480px; width: 100%;
  text-align: center;
  box-shadow: var(--shadow-lg);
  animation: ebIn .3s ease-out;
}
@keyframes ebIn {
  from { opacity: 0; transform: scale(.96) translateY(-8px); }
  to   { opacity: 1; transform: none; }
}
.eb-icon { margin-bottom: var(--sp-4); display: flex; justify-content: center; }
.eb-title { font-size: 1.35rem; font-weight: 800; color: var(--text); margin: 0 0 var(--sp-2); }
.eb-sub   { font-size: .9rem; color: var(--text-muted); margin: 0 0 var(--sp-6); line-height: 1.6; }
.eb-details { text-align: start; margin-bottom: var(--sp-6); }
.eb-summary {
  font-size: .82rem; color: var(--text-muted); cursor: pointer;
  padding: var(--sp-2); border-radius: var(--r-sm);
  list-style: none; user-select: none;
}
.eb-summary:hover { color: var(--primary); }
.eb-pre {
  margin-top: var(--sp-2);
  background: var(--bg); border: 1px solid var(--border);
  border-radius: var(--r-md); padding: var(--sp-3);
  font-size: .75rem; color: var(--error);
  overflow-x: auto; white-space: pre-wrap; word-break: break-all;
  max-height: 120px;
}
.eb-actions { display: flex; gap: var(--sp-3); justify-content: center; flex-wrap: wrap; }
</style>
