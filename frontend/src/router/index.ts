/**
 * Vue Router Configuration
 *
 * This file defines all the routes in the application.
 *
 * Key concepts:
 * - Routes: URL patterns that map to Vue components
 * - Route Guards: Functions that control access to routes
 * - Meta fields: Extra data attached to routes (like requiresAuth)
 * - Lazy loading: Components loaded only when needed (import())
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' // TypeScript type of array

import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const routes: RouteRecordRaw[] = [
  // PUBLIC ROUTES - No authentication required
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Accueil',
      requiresAuth: false
    }
  },
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

  // PROTECTED ROUTES - Authentication required
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'), // Lazy loading : View is loaded only when route is accessed
    meta: {
      title: 'Tableau de bord',
      requiresAuth: true
    }
  }
]

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

import { authGuard, guestGuard } from './guards'

// 1. Authentication Guard - Check if user can access protected routes
router.beforeEach(authGuard)

// 2. Guest Guard - Prevent authenticated users from accessing hideForAuthenticated page
router.beforeEach(guestGuard)

// 3. Set page title based on route meta
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Pulse Budget`
  }
  next()
})

export default router
