/**
 * Vue Router Configuration
 *
 * This file defines all the routes in our application.
 *
 * Key concepts:
 * - Routes: URL patterns that map to Vue components
 * - Route Guards: Functions that control access to routes
 * - Meta fields: Extra data attached to routes (like requiresAuth)
 * - Lazy loading: Components loaded only when needed (import())
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Import views that should be loaded immediately (small, critical pages)
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

/**
 * Route Definitions
 *
 * Architecture simplifiée :
 * - "/" → Dashboard (page d'accueil) - protégée par auth
 * - "/login" → Page de connexion
 * - Pas de page d'accueil séparée
 */
const routes: RouteRecordRaw[] = [
  // HOME = DASHBOARD (Page d'accueil protégée)
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      title: 'Tableau de bord',
      requiresAuth: true
    }
  },

  // LOGIN PAGE - Public route
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Connexion',
      requiresAuth: false,
      hideForAuthenticated: true // Hide this route if user is already logged in
    }
  },

  // CATCH-ALL ROUTE - Must be last (404 handler)
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Page non trouvée',
      requiresAuth: false
    }
  }
]

// Import our guard functions
import { authGuard, guestGuard } from './guards'

/**
 * Create Router Instance
 *
 * createWebHistory(): Uses the HTML5 History API for clean URLs
 * Alternative: createWebHashHistory() for hash-based routing (#/about)
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Scroll behavior: scroll to top when navigating to a new route
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

/**
 * Global Navigation Guards
 *
 * These run before EVERY route change in the application.
 * Order matters: guards run in the order they're defined.
 */

// 1. Authentication Guard - Check if user can access protected routes
router.beforeEach(authGuard)

// 2. Guest Guard - Prevent authenticated users from accessing login page
router.beforeEach(guestGuard)

// 3. Set page title based on route meta
router.beforeEach((to, from, next) => {
  // Update document title if route has title in meta
  if (to.meta.title) {
    document.title = `${to.meta.title} - Pulse Budget`
  }
  next()
})

export default router
