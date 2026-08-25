<template>
  <div class="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,_#f8f0f0_0%,_#fff5f5_100%)] p-6 [[data-theme=dark]_&]:bg-[linear-gradient(135deg,_var(--bg)_0%,_var(--surface)_100%)]">
    <div class="card w-full max-w-[440px] rounded-[var(--r-3xl)] px-10 py-12 shadow-[0_12px_48px_var(--primary-shadow)] max-[480px]:px-6 max-[480px]:py-8">
      <div class="mb-8 flex items-center justify-center gap-3">
        <div class="flex h-[52px] w-[52px] items-center justify-center rounded-[var(--r-xl)] bg-[var(--primary)] shadow-[var(--shadow-primary)]">
          <AppIcon name="bowl" :size="28" color="#fff" aria-hidden="true" />
        </div>
        <div class="flex flex-col gap-0.5">
          <span class="brand-ar text-[1.05rem] font-black leading-none text-[var(--primary)]">كشري أبو طارق</span>
          <span class="brand-en text-[.7rem] font-semibold leading-none tracking-[.04em] text-[var(--text-muted)]">Koshary Abou Tarek</span>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import AppIcon from '../components/AppIcon.vue'
</script>
