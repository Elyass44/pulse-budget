<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Minimal Header -->
      <div class="text-center">
        <div class="mx-auto h-20 w-20 bg-primary-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
          <span class="text-3xl">📊</span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-3">
          Pulse Budget
        </h1>
        <p class="text-gray-600 text-lg">
          Connectez-vous à votre compte
        </p>
      </div>

      <!-- Clean Login Form -->
      <div class="card p-8 shadow-xl">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="input-field"
              placeholder="votre@email.com"
              :disabled="loading"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="input-field"
              placeholder="••••••••"
              :disabled="loading"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="text-primary-600 hover:text-primary-500 font-medium">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <button
            type="submit"
            class="w-full btn-primary py-3 text-base relative"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connexion...
            </span>
            <span v-else>Se connecter</span>
          </button>
        </form>

        <!-- Dev Test Buttons (remove in production) -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-center text-sm text-gray-500 mb-4">Mode développement</p>
          <div class="space-y-2">
            <button
              type="button"
              @click="simulateLogin"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-sm"
            >
              ✅ Simuler connexion
            </button>
            <button
              type="button"
              @click="simulateLogout"
              class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-sm"
            >
              🚪 Simuler déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Form data
const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Login attempt:', { email: email.value, password: password.value })

    // For now, accept any email/password
    simulateLogin()

  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

function simulateLogin() {
  localStorage.setItem('auth_token', 'fake-jwt-token-for-testing')
  // Always redirect to dashboard (home page) after login
  const redirectPath = route.query.redirect as string || '/'
  router.push(redirectPath)
}

function simulateLogout() {
  localStorage.removeItem('auth_token')
  router.push('/')
}
</script>
