<template>
  <div class="app-shell" :class="{ rtl: isAR, ltr: !isAR }">
    <a href="#main-content" class="skip-link">{{ t('تخطى إلى المحتوى', 'Skip to content') }}</a>

    <!-- ══ NAVBAR ══ -->
    <header class="navbar" :class="{ 'navbar-scrolled': scrolled }" role="banner">
      <div class="navbar-inner">

        <!-- Logo -->
        <router-link to="/" class="navbar-logo" :aria-label="t('كشري أبو طارق – الرئيسية', 'Koshary Abou Tarek – Home')">
          <img src="/koshary-logo.png" :alt="t('شعار كشري أبو طارق', 'Koshary Abou Tarek logo')" class="logo-img" />
        </router-link>

        <!-- Centre nav links -->
        <nav class="navbar-links" :aria-label="t('التنقل الرئيسي', 'Main navigation')">
          <router-link to="/" class="nav-link" exact-active-class="nav-active">{{ t('الرئيسية', 'Home') }}</router-link>
          <router-link to="/menu" class="nav-link" active-class="nav-active">{{ t('القائمة', 'Menu') }}</router-link>
          <router-link to="/branches" class="nav-link" active-class="nav-active">{{ t('الفروع', 'Branches') }}</router-link>
          <router-link to="/about" class="nav-link" active-class="nav-active">{{ t('من نحن', 'About') }}</router-link>
          <router-link to="/news" class="nav-link" active-class="nav-active">{{ t('الأخبار', 'News') }}</router-link>
          <router-link to="/contact" class="nav-link" active-class="nav-active">{{ t('تواصل معنا', 'Contact') }}</router-link>
        </nav>

        <!-- End cluster -->
        <div class="navbar-end">
          <!-- Language toggle -->
          <span class="lang-toggle" @click="toggle" role="button" tabindex="0" @keydown.enter="toggle">
            {{ isAR ? 'EN' : 'ع' }}
          </span>

          <!-- Dark mode -->
          <button class="icon-btn dark-btn" @click="toggleDark"
            :aria-label="dark ? t('الوضع الفاتح','Light mode') : t('الوضع الداكن','Dark mode')">
            <AppIcon :name="dark ? 'sun' : 'moon'" :size="17" color="rgba(255,255,255,.8)" />
          </button>

          <!-- Phone -->
          <a href="tel:16011" class="navbar-phone" aria-label="Hotline 16011">
            <!-- Phone SVG matching official site -->
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="phone-svg" :class="{ '-scale-x-100': isAR }">
              <path d="M25.49 31.75C24.12 31.75 22.19 31.25 19.3 29.64C15.79 27.67 13.08 25.85 9.59 22.37C6.22 19.01 4.58 16.83 2.29 12.66C-.3 7.95.14 5.48.63 4.42C1.22 3.16 2.09 2.41 3.21 1.66C3.85 1.24 4.52.88 5.22.59C5.29.56 5.36.53 5.42.5C5.77.35 6.29.11 6.96.36C7.41.53 7.81.87 8.43 1.49C9.71 2.75 11.45 5.55 12.1 6.93C12.53 7.86 12.82 8.47 12.82 9.16C12.82 9.97 12.41 10.59 11.92 11.26C11.83 11.38 11.74 11.5 11.65 11.62C11.11 12.32 11 12.53 11.07 12.89C11.23 13.62 12.4 15.79 14.32 17.71C16.24 19.62 18.35 20.72 19.08 20.87C19.46 20.96 19.67 20.83 20.39 20.28C20.5 20.2 20.6 20.12 20.72 20.04C21.46 19.48 22.06 19.08 22.84 19.08H22.85C23.53 19.08 24.12 19.38 25.09 19.87C26.35 20.51 29.24 22.23 30.51 23.51C31.13 24.13 31.47 24.53 31.64 24.97C31.89 25.64 31.65 26.17 31.5 26.52C31.47 26.58 31.44 26.64 31.41 26.71C31.12 27.41 30.76 28.09 30.34 28.72C29.59 29.84 28.83 30.71 27.57 31.3C26.92 31.6 26.21 31.76 25.49 31.75Z" fill="#FEFEFE"/>
            </svg>
            <span class="phone-num">16011</span>
          </a>
        </div>

      </div>
    </header>

    <!-- ══ MAIN ══ -->
    <main class="main-content" id="main-content">
      <slot />
    </main>

    <!-- ══ FOOTER ══ -->
    <footer class="app-footer" role="contentinfo">
      <div class="footer-overlay"></div>
      <div class="footer-inner">
        <div class="footer-logo-wrap">
          <img src="/koshary-logo.png" alt="Koshary Abou Tarek" class="footer-logo-img" />
        </div>
        <div class="footer-cols">
          <div class="footer-col">
            <h3 class="footer-col-title">{{ t('تعرف علينا', 'About Us') }}</h3>
            <ul class="footer-col-links">
              <li><router-link to="/" class="footer-link">{{ t('الرئيسية', 'Home') }}</router-link></li>
              <li><router-link to="/about" class="footer-link">{{ t('من نحن', 'About') }}</router-link></li>
              <li><router-link to="/news" class="footer-link">{{ t('الأخبار', 'News') }}</router-link></li>
              <li><router-link to="/contact" class="footer-link">{{ t('تواصل معنا', 'Contact') }}</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="footer-col-title">{{ t('أصناف', 'Menu') }}</h3>
            <ul class="footer-col-links">
              <li><router-link to="/menu#koshary" class="footer-link">{{ t('كشري', 'Koshary') }}</router-link></li>
              <li><router-link to="/menu#soups" class="footer-link">{{ t('شوربة', 'Soup') }}</router-link></li>
              <li><router-link to="/menu#desserts" class="footer-link">{{ t('حلويات', 'Desserts') }}</router-link></li>
              <li><router-link to="/menu#drinks" class="footer-link">{{ t('مشروبات', 'Drinks') }}</router-link></li>
              <li><router-link to="/menu#extras" class="footer-link">{{ t('إضافات', 'Add-ons') }}</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="footer-col-title">{{ t('الفروع', 'Branches') }}</h3>
            <ul class="footer-col-links">
              <li><router-link to="/branches" class="footer-link">{{ t('مصر', 'Egypt') }}</router-link></li>
              <li><router-link to="/branches" class="footer-link">{{ t('الإمارات العربية المتحدة', 'UAE') }}</router-link></li>
              <li><router-link to="/branches" class="footer-link">{{ t('المملكة العربية السعودية', 'Saudi Arabia') }}</router-link></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="footer-col-title">{{ t('تابعونا', 'Follow Us') }}</h3>
            <div class="footer-socials">
              <a href="https://www.instagram.com/koshariabotarek" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/kosharyabotarek" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@koshariaboutarek" target="_blank" rel="noopener" class="social-btn" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://www.youtube.com/@koshari_apo_tareq" target="_blank" rel="noopener" class="social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              </a>
            </div>
            <div class="footer-hotline">
              <a href="tel:16011" class="hotline-link"><AppIcon name="phone" :size="14" aria-hidden="true" /> <strong>16011</strong></a>
              <span class="hotline-hours">{{ t('يومياً ٧ ص – ١٠ م', 'Daily 7 AM – 10 PM') }}</span>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-badges">
            <span class="guinness-badge"><AppIcon name="trophy" :size="14" aria-hidden="true" /> {{ t('موسوعة غينيس للأرقام القياسية', 'Guinness World Records') }}</span>
            <span class="tasteatlas-badge"><AppIcon name="star-fill" :size="14" aria-hidden="true" /> {{ t('أفضل ١٠٠ مطعم – TasteAtlas', 'Top 100 Legendary – TasteAtlas') }}</span>
          </div>
          <p class="footer-copy">© {{ new Date().getFullYear() }} {{ t('كشري أبو طارق. جميع الحقوق محفوظة.', 'Koshary Abou Tarek. All rights reserved.') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'
import { useLanguage } from '../composables/useLanguage'
import AppIcon from '../components/AppIcon.vue'

const { dark, toggle: toggleDark } = useDarkMode()
const { isAR, toggle, t } = useLanguage()

const scrolled = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.app-shell { min-height: 100vh; display: flex; flex-direction: column; }

.skip-link {
  position: absolute; top: -100px; inset-inline-start: var(--sp-4);
  background: var(--gold); color: #1a0a0a;
  padding: var(--sp-2) var(--sp-4); border-radius: 0 0 var(--r-md) var(--r-md);
  font-weight: 700; font-size: .9rem; z-index: 9999; transition: top .15s;
}
.skip-link:focus { top: 0; }

/* ══ NAVBAR ══ */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 9000;
  background: transparent;
  transition: background .3s ease, box-shadow .3s ease;
}
.navbar-scrolled {
  background: #1D1B1B;
  box-shadow: 0 2px 20px rgba(0,0,0,.5);
}
.navbar-inner {
  max-width: 1300px; margin: 0 auto;
  display: flex; align-items: center;
  padding: 0 var(--sp-6); height: 72px;
  gap: var(--sp-4);
}

/* Nav links */
.navbar-links {
  display: flex; align-items: center; gap: 0;
  flex: 1; justify-content: center;
}
.nav-link {
  padding: 8px 18px;
  color: rgba(255,255,255,.85); font-weight: 500; font-size: .95rem;
  text-decoration: none; white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: border-color .2s;
  font-family: 'Poppins', 'Cairo', sans-serif;
}
.nav-link:hover { border-bottom-color: rgba(255,255,255,.6); }
.nav-active,
.nav-link.router-link-active { border-bottom-color: rgba(255,255,255,.6) !important; color: #fff; }
.nav-link:focus-visible { outline: 2px solid var(--gold); }

/* End cluster */
.navbar-end { display: flex; align-items: center; gap: var(--sp-2); flex-shrink: 0; }

.lang-toggle {
  color: rgba(255,255,255,.85); font-weight: 500; font-size: .95rem;
  cursor: pointer; transition: color .15s; user-select: none;
  font-family: 'Poppins', 'Cairo', sans-serif;
  padding: 4px 6px;
}
.lang-toggle:hover { color: #fff; }

.dark-btn {
  width: 34px; height: 34px; border-radius: var(--r-pill);
  background: rgba(255,255,255,.08); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: background .15s;
}
.dark-btn:hover { background: rgba(255,255,255,.18); }

.login-btn {
  display: flex; align-items: center; gap: var(--sp-2);
  background: var(--primary); color: #fff;
  border: 1.5px solid var(--primary);
  border-radius: var(--r-md); padding: 6px var(--sp-4);
  font-size: .85rem; font-weight: 700; text-decoration: none;
  transition: all .15s;
}
.login-btn:hover { background: var(--primary-dark); }
.login-btn:focus-visible { outline: 2px solid var(--gold); }

/* User menu */
.user-menu {
  display: flex; align-items: center; gap: var(--sp-2);
  cursor: pointer; padding: 5px var(--sp-2); border-radius: var(--r-md);
  position: relative; user-select: none; transition: background .15s;
}
.user-menu:hover { background: rgba(255,255,255,.1); }
.avatar {
  width: 32px; height: 32px; flex-shrink: 0;
  background: var(--gold); color: #1a0a0a;
  border-radius: var(--r-pill);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: .88rem;
}
.dropdown {
  position: absolute; top: calc(100% + 8px); inset-inline-end: 0;
  background: #1a1a1a; border: 1px solid rgba(255,255,255,.1);
  border-radius: var(--r-xl); box-shadow: 0 8px 30px rgba(0,0,0,.5);
  min-width: 160px; overflow: hidden; z-index: 300;
}
.dropdown-item {
  display: flex; align-items: center; gap: var(--sp-2);
  width: 100%; padding: 11px var(--sp-4);
  font-size: .9rem; color: rgba(255,255,255,.8);
  background: none; border: none; cursor: pointer; transition: background .12s;
}
.dropdown-item:hover { background: rgba(255,255,255,.08); color: #fff; }

/* Phone */
.navbar-phone {
  display: flex; align-items: center; gap: 8px;
  color: #fff; text-decoration: none; transition: opacity .15s;
}
.navbar-phone:hover { opacity: .8; }
.phone-svg { flex-shrink: 0; }
.phone-num { font-size: 1.3rem; font-weight: 600; letter-spacing: .02em; line-height: 1; }

/* Logo */
.navbar-logo { display: flex; align-items: center; flex-shrink: 0; }
.logo-img {
  width: 60px; height: 60px;
  object-fit: contain; object-position: center;
  transition: opacity .15s;
}
.navbar-logo:hover .logo-img { opacity: .85; }

/* ══ MAIN — push below fixed navbar ══ */
.main-content { flex: 1; width: 100%; padding-top: 72px; }

/* ══ FOOTER ══ */
.app-footer {
  position: relative; overflow: hidden;
  background: #0d0d0d;
  color: rgba(255,255,255,.65);
}
.footer-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse at 20% 80%, rgba(200,16,46,.12) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(245,166,35,.08) 0%, transparent 60%);
}
.footer-inner {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto;
  padding: var(--sp-12) var(--sp-8) var(--sp-8);
  display: flex; flex-direction: column; gap: var(--sp-10);
}
.footer-logo-wrap { display: flex; justify-content: center; }
.footer-logo-img {
  width: 160px; height: auto; object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(245,166,35,.25)); opacity: .92;
}
.footer-cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sp-8); }
.footer-col-title {
  font-size: .9rem; font-weight: 800; color: #fff;
  margin-bottom: var(--sp-4); letter-spacing: .02em;
  position: relative; padding-bottom: var(--sp-3);
}
.footer-col-title::after {
  content: ''; position: absolute; bottom: 0; inset-inline-start: 0;
  width: 28px; height: 2px; background: var(--primary);
}
.footer-col-links { list-style: none; display: flex; flex-direction: column; gap: var(--sp-2); }
.footer-link { color: rgba(255,255,255,.5); font-size: .85rem; text-decoration: none; transition: color .15s; }
.footer-link:hover { color: var(--gold); }
.footer-socials { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-4); }
.social-btn {
  width: 36px; height: 36px; border-radius: var(--r-pill);
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
  color: rgba(255,255,255,.65);
  display: flex; align-items: center; justify-content: center;
  transition: all .15s; text-decoration: none;
}
.social-btn:hover { background: var(--primary); color: #fff; border-color: var(--primary); }
.footer-hotline { display: flex; flex-direction: column; gap: 4px; }
.hotline-link { color: rgba(255,255,255,.75); text-decoration: none; font-size: 1rem; font-weight: 700; transition: color .15s; }
.hotline-link:hover { color: var(--gold); }
.hotline-link strong { color: var(--gold); }
.hotline-hours { font-size: .78rem; color: rgba(255,255,255,.4); }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,.08); padding-top: var(--sp-6);
  display: flex; flex-direction: column; align-items: center; gap: var(--sp-3); text-align: center;
}
.footer-badges { display: flex; gap: var(--sp-4); flex-wrap: wrap; justify-content: center; }
.guinness-badge,
.tasteatlas-badge {
  font-size: .75rem; color: rgba(255,255,255,.45);
  background: rgba(255,255,255,.05);
  padding: 5px 12px; border-radius: var(--r-pill);
  border: 1px solid rgba(255,255,255,.08);
}
.footer-copy { font-size: .75rem; color: rgba(255,255,255,.3); }

/* Responsive */
@media (max-width: 1024px) { .footer-cols { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 860px) {
  .nav-link { padding: 8px 10px; font-size: .82rem; }
}
@media (max-width: 640px) {
  .navbar-inner { padding: 0 var(--sp-3); height: 60px; }
  .phone-num  { font-size: 1.1rem; }
  .navbar-links { display: none; }
  .footer-cols { grid-template-columns: 1fr 1fr; gap: var(--sp-6); }
  .footer-inner { padding: var(--sp-8) var(--sp-4) var(--sp-6); }
  .main-content { padding-top: 60px; }
}
@media (max-width: 400px) { .footer-cols { grid-template-columns: 1fr; } }
</style>
