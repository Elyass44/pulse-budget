<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Dashboard Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          📊 Tableau de bord
        </h1>
        <p class="text-xl text-gray-600">
          Bienvenue dans Pulse Budget!
        </p>
      </div>

      <!-- Success Card -->
      <div class="max-w-4xl mx-auto">
        <div class="card p-8 mb-8">
          <div class="flex items-center mb-6">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-2xl font-bold text-green-800">Authentification réussie</h2>
              <p class="text-green-600">Vous êtes maintenant connecté et pouvez accéder aux pages protégées.</p>
            </div>
          </div>

          <!-- Auth Test Info -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              🧪 Test de l'authentification
            </h3>
            <div class="space-y-3">
              <div class="flex items-center text-green-700">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Vous voyez cette page → l'auth guard fonctionne</span>
              </div>
              <div class="flex items-center text-green-700">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Essayez d'aller sur /login → vous serez redirigé ici</span>
              </div>
              <div class="flex items-center text-green-700">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Supprimez le token et rechargez → redirection vers login</span>
              </div>
            </div>
          </div>

          <!-- Future Features Preview -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">🚀 Prochaines fonctionnalités</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center text-gray-600">
                <div class="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                <span>Aperçu du budget mensuel</span>
              </div>
              <div class="flex items-center text-gray-600">
                <div class="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                <span>Transactions récentes</span>
              </div>
              <div class="flex items-center text-gray-600">
                <div class="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                <span>Progression de l'épargne</span>
              </div>
              <div class="flex items-center text-gray-600">
                <div class="w-2 h-2 bg-primary-400 rounded-full mr-3"></div>
                <span>Actions rapides</span>
              </div>
            </div>
          </div>

          <!-- Logout Button -->
          <div class="flex justify-center">
            <button
              @click="logout"
              class="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  localStorage.removeItem('auth_token')
  router.push('/login')
}
</script>
