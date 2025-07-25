/**
 * Route Guards
 *
 * Guards are functions that control access to routes.
 * They run BEFORE the route component is loaded.
 *
 * Types of guards:
 * - beforeEach: Runs before every route change
 * - beforeEnter: Runs before entering a specific route
 * - beforeRouteEnter: Runs before entering a component
 */

import type {NavigationGuardNext, RouteLocationNormalized} from 'vue-router'

function isAuthenticated(): boolean {
  // TODO: Replace with actual auth store check
  // For now, check if JWT token exists in localStorage
  const token = localStorage.getItem('auth_token')

  // Simple check: token exists and is not empty
  return token !== null && token.trim() !== ''
}

/**
 * Authentication Guard
 *
 * This function runs before navigation to check if user should access the route.
 *
 * @param to - Route we're trying to go to
 * @param from - Route we're coming from
 * @param next - Function to call to continue/redirect navigation
 */
export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const requiresAuth = to.meta.requiresAuth

  if (!requiresAuth) {
    next() // Continue to the route
    return
  }

  if (isAuthenticated()) {
    next()
  } else {
    // Redirect to login page if not authenticated
    next({
      name: 'login',
      query: {redirect: to.fullPath}
    })
  }
}

/**
 * Guest Guard (for login page)
 *
 * Prevents authenticated users from accessing login page
 */
export function guestGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // Check if route should be hidden for authenticated users
  const hideForAuthenticated = to.meta.hideForAuthenticated

  if (!hideForAuthenticated) {
    next()
    return
  }

  if (isAuthenticated()) {
    // User is already authenticated, redirect to dashboard
    next({name: 'dashboard'})
  } else {
    next()
  }
}
