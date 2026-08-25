<template>
  <DefaultLayout>
    <div class="notfound-page relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
      <!-- Animated koshary bowl -->
      <div class="bowl-wrap relative mb-4 animate-[bowlFloat_3s_ease-in-out_infinite]" aria-hidden="true">
        <div class="steam steam1 absolute bottom-[90%] left-1/2 ml-[-16px] h-[30px] w-[6px] origin-bottom rounded-pill bg-white/[.2] animate-[steamRise_2s_ease-in-out_infinite]"></div>
        <div class="steam steam2 absolute bottom-[90%] left-1/2 ml-0 h-[40px] w-[6px] origin-bottom rounded-pill bg-white/[.2] [animation-delay:.4s] animate-[steamRise_2s_ease-in-out_infinite]"></div>
        <div class="steam steam3 absolute bottom-[90%] left-1/2 ml-[14px] h-[24px] w-[6px] origin-bottom rounded-pill bg-white/[.2] [animation-delay:.8s] animate-[steamRise_2s_ease-in-out_infinite]"></div>
        <div class="bowl-icon block animate-[bowlSpin_8s_linear_infinite] drop-shadow-[0_8px_24px_rgba(200,16,46,.3)]">
          <AppIcon name="bowl" :size="96" color="var(--primary)" aria-hidden="true" />
        </div>
      </div>

      <div class="notfound-code mb-4 flex items-center gap-2">
        <span class="digit digit-4 animate-[digitPop_.6s_cubic-bezier(.36,.07,.19,.97)_both] font-['Cairo',sans-serif] text-[clamp(4rem,12vw,8rem)] font-black leading-none text-primary">4</span>
        <span class="digit digit-0 animate-[digitPop_.6s_cubic-bezier(.36,.07,.19,.97)_.12s_both] font-['Cairo',sans-serif] text-[clamp(4rem,12vw,8rem)] font-black leading-none text-gold">0</span>
        <span class="digit digit-4b animate-[digitPop_.6s_cubic-bezier(.36,.07,.19,.97)_.24s_both] font-['Cairo',sans-serif] text-[clamp(4rem,12vw,8rem)] font-black leading-none text-primary">4</span>
      </div>

      <h1 class="notfound-title mb-3 animate-[fadeUp_.5s_.3s_both] text-[clamp(1.2rem,3vw,1.8rem)] font-extrabold text-[var(--text)]">{{ t('الصفحة غير موجودة', 'Page Not Found') }}</h1>
      <p class="notfound-sub mb-8 max-w-[420px] animate-[fadeUp_.5s_.45s_both] text-[.95rem] leading-[1.6] text-[var(--text-muted)]">
        {{ t(
          'يبدو أن هذه الصفحة ذهبت تأكل كشري ولم تعد!',
          'Looks like this page went out for koshary and never came back!'
        ) }}
      </p>

      <div class="notfound-actions flex flex-wrap justify-center gap-3 animate-[fadeUp_.5s_.55s_both]">
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
      <div class="particles pointer-events-none absolute inset-0" aria-hidden="true">
        <span v-for="(p, i) in particles" :key="i" class="particle absolute animate-[particleDrift_var(--dur,4s)_var(--delay,0s)_ease-in-out_infinite_alternate]"
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
