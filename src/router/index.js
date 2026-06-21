import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  /* ── Public Pages (SPA) ── */
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/LandingView.vue'),
    meta: { title: 'إمبراطورية أبو طارق | Koshary Abou Tarek' }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/MenuView.vue'),
    meta: { title: 'القائمة | Our Menu' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'من نحن | About Us' }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/NewsView.vue'),
    meta: { title: 'الأخبار | News' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'تواصل معنا | Contact Us' }
  },
  {
    path: '/branches',
    name: 'Branches',
    component: () => import('../views/BranchesView.vue'),
    meta: { title: 'الفروع | Our Branches' }
  },

  /* ── 404 Not Found ── */
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'الصفحة غير موجودة | Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, saved) => saved || { top: 0, behavior: 'smooth' }
})

/**
 * Global after-navigation hook
 * Updates document title based on route meta
 */
router.afterEach((to) => {
  const base = 'كشري أبو طارق | Koshary Abou Tarek'
  document.title = to.meta.title ? `${to.meta.title}` : base
})

export default router
