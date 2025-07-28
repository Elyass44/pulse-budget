<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <!-- 404 Icon -->
      <div class="mx-auto h-24 w-24 bg-primary-100 rounded-full flex items-center justify-center mb-8">
        <svg class="h-12 w-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-3v.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
        </svg>
      </div>

      <!-- Error Message -->
      <div>
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Page non trouvée</h2>
        <p class="text-gray-600 mb-8">
          Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
        </p>
      </div>

      <!-- Actions -->
      <div class="space-y-4">
        <button
          @click="goHome"
          class="w-full btn-primary py-3 text-base"
        >
          Retour à l'application
        </button>
      </div>

      <!-- Current URL Info -->
      <div class="mt-8 p-4 bg-gray-100 rounded-lg">
        <p class="text-sm text-gray-600">
          URL demandée : <code class="bg-gray-200 px-2 py-1 rounded text-xs">{{ $route.fullPath }}</code>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

/**
 * 404 Not Found Page
 *
 * Clean error page that provides helpful navigation options.
 * Shows current URL and offers ways to get back to valid pages.
 */

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>
