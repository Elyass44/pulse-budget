<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Conditional Layout: Show navigation only for non-auth pages -->
    <template v-if="!isAuthPage">
      <!-- Navigation Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Brand -->
            <div class="flex items-center space-x-4">
              <RouterLink to="/" class="flex items-center space-x-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
                <span class="text-2xl">📊</span>
                <span>Pulse Budget</span>
              </RouterLink>
            </div>

            <!-- Navigation Links -->
            <div class="hidden md:flex items-center space-x-8">
              <RouterLink
                to="/"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-primary-600 bg-primary-50"
              >
                Tableau de bord
              </RouterLink>

              <!-- User Dropdown (when authenticated) -->
              <div v-if="isAuthenticated" class="relative">
                <button
                  @click="toggleUserDropdown"
                  class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <!-- User Avatar -->
                  <div class="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">JD</span>
                  </div>
                  <!-- User Name -->
                  <span>John Doe</span>
                  <!-- Dropdown Arrow -->
                  <svg
                    class="w-4 h-4 transition-transform duration-200"
                    :class="{ 'rotate-180': isUserDropdownOpen }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <div
                  v-if="isUserDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  <!-- User Info -->
                  <div class="px-4 py-3 border-b border-gray-100">
                    <p class="text-sm font-medium text-gray-900">John Doe</p>
                    <p class="text-sm text-gray-500">john.doe@example.com</p>
                  </div>

                  <!-- Menu Items -->
                  <div class="py-1">
                    <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      Mon profil
                    </a>
                    <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                      <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      Paramètres
                    </a>
                  </div>

                  <!-- Divider -->
                  <div class="border-t border-gray-100"></div>

                  <!-- Logout Button -->
                  <button
                    @click="logout"
                    class="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Se déconnecter
                  </button>
                </div>
              </div>

              <!-- Login Button (when not authenticated) -->
              <RouterLink
                v-else
                to="/login"
                class="btn-primary text-sm"
              >
                Connexion
              </RouterLink>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden">
              <button class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </template>

    <!-- Main Content -->
    <main class="flex-1" :class="{ 'min-h-screen': isAuthPage }">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted, onUnmounted } from 'vue'

/**
 * Root App Component with Conditional Layout
 *
 * Features:
 * - Shows navigation for app pages (dashboard, etc.)
 * - Hides navigation for auth pages (login, forgot password, etc.)
 * - User dropdown with profile options and logout
 * - Clean, minimal design for authentication flows
 */

const route = useRoute()
const router = useRouter()

// User dropdown state
const isUserDropdownOpen = ref(false)

/**
 * Determine if current page is an authentication page
 * These pages should have minimal, clean layout without navigation
 */
const isAuthPage = computed(() => {
  const authRoutes = ['login', 'forgot-password', 'reset-password', 'register', 'not-found']
  return authRoutes.includes(route.name as string)
})

/**
 * Check if user is authenticated
 * Same logic as in auth guards
 */
const isAuthenticated = computed(() => {
  const token = localStorage.getItem('auth_token')
  return token !== null && token.trim() !== ''
})

/**
 * Toggle user dropdown visibility
 */
function toggleUserDropdown() {
  isUserDropdownOpen.value = !isUserDropdownOpen.value
}

/**
 * Close dropdown when clicking outside
 */
function closeDropdownOnClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isUserDropdownOpen.value = false
  }
}

/**
 * Logout function
 * Removes token and redirects to login
 */
function logout() {
  localStorage.removeItem('auth_token')
  isUserDropdownOpen.value = false // Close dropdown
  router.push('/login')
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', closeDropdownOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside)
})
</script>
