import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import { seedStorageIfNeeded } from './data/seed'
import './assets/styles/globals.css'

console.log('🔵 [1] main.js loaded')

/**
 * Initialize app with seed data
 */
async function initApp() {
  try {
    console.log('🔵 [2] Seeding storage...')
    await seedStorageIfNeeded()
    console.log('🟢 [3] Storage seeded successfully')
  } catch (error) {
    console.error('🔴 [!] Seed error:', error)
  }

  try {
    console.log('🔵 [4] Creating Vue app...')
    const app = createApp(App)
    console.log('🟢 [5] App created')
    
    app.use(createPinia())
    console.log('🟢 [6] Pinia installed')
    
    app.use(router)
    console.log('🟢 [7] Router installed')
    
    app.mount('#app')
    console.log('🟢 [8] App mounted to #app successfully!')
  } catch (error) {
    console.error('🔴 [!] App init error:', error)
    document.body.innerHTML = '<div style="color: red; font-size: 20px; padding: 20px;">ERROR: ' + error.message + '</div>'
  }
}

initApp()

/* ── Register Service Worker (PWA) ── */
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('[SW] Registered:', reg.scope)
        /* Check for updates every 60 min */
        setInterval(() => reg.update(), 60 * 60 * 1000)
      })
      .catch(err => console.warn('[SW] Registration failed:', err))
  })
}

/* ── PWA install prompt ── */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  window.__pwaInstallPrompt = e
})
