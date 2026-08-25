<template>
  <ErrorBoundary>
    <Suspense>
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <div class="app-loading-fallback">⏳ Loading page...</div>
      </template>
    </Suspense>
  </ErrorBoundary>

  <AppToast />
</template>

<script setup>
import { onErrorCaptured } from 'vue'
import AppToast from './components/AppToast.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'

onErrorCaptured((err) => {
  console.error('[App Error]:', err)
})
</script>

