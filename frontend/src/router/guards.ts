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

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

/**
 * Check if user is authenticated
 *
 * For now, this is a simple check. Later we'll integrate with Pinia auth store.
 *
 * @returns boolean - true if user is logged in
 */
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
  // Check if the route requires authentication
  const requiresAuth = to.meta.requiresAuth

  // If route doesn't require auth, allow access
  if (!requiresAuth) {
    next() // Continue to the route
    return
  }

  // Route requires auth - check if user is logged in
  if (isAuthenticated()) {
    next() // User is authenticated, allow access
  } else {
    // User not authenticated, redirect to login
    next({
      name: 'login',
      // Save the attempted URL so we can redirect back after login
      query: { redirect: to.fullPath }
    })
  }
}

/**
 * Guest Guard (for login page)
 *
 * Prevents authenticated users from accessing login page
 * (redirects them to dashboard instead)
 */
export function guestGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // Check if route should be hidden for authenticated users
  const hideForAuthenticated = to.meta.hideForAuthenticated

  if (!hideForAuthenticated) {
    next() // Route doesn't have this restriction
    return
  }

  // If user is already authenticated, redirect to dashboard (home)
  if (isAuthenticated()) {
    next({ name: 'dashboard' }) // Dashboard is now the home page
  } else {
    next() // User not authenticated, can access login page
  }
}
