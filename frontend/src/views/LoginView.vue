<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Connexion</h1>
      <p class="subtitle">Accédez à votre budget Pulse</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="votre@email.com"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="••••••••"
          />
        </div>

        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>

        <!-- Temporary testing buttons -->
        <div class="test-buttons">
          <p class="test-info">🧪 Test buttons (temporary):</p>
          <button type="button" @click="simulateLogin" class="test-button">
            Simulate Login (saves token)
          </button>
          <button type="button" @click="simulateLogout" class="test-button">
            Simulate Logout (removes token)
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

/**
 * Login Component
 *
 * For now, this is a simple form that simulates login.
 * Later we'll integrate with:
 * - Pinia auth store
 * - Real API authentication
 * - Form validation
 */

const router = useRouter()
const route = useRoute()

// Form data
const email = ref('')
const password = ref('')
const loading = ref(false)

/**
 * Handle form submission
 * TODO: Replace with real API call
 */
async function handleLogin() {
  loading.value = true

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // TODO: Replace with real authentication API call
    console.log('Login attempt:', { email: email.value, password: password.value })

    // For now, accept any email/password
    simulateLogin()

  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

/**
 * Simulate successful login (for testing)
 */
function simulateLogin() {
  // Save fake token to localStorage
  localStorage.setItem('auth_token', 'fake-jwt-token-for-testing')

  // Redirect to originally requested page or dashboard
  const redirectPath = route.query.redirect as string || '/dashboard'
  router.push(redirectPath)
}

/**
 * Simulate logout (for testing)
 */
function simulateLogout() {
  localStorage.removeItem('auth_token')
  router.push('/')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 8px;
  color: #333;
  font-size: 2rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: 500;
  color: #333;
}

input {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}

.login-button {
  background: #3b82f6;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover:not(:disabled) {
  background: #2563eb;
}

.login-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* Temporary test buttons */
.test-buttons {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.test-info {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
}

.test-button {
  width: 100%;
  background: #f59e0b;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 8px;
}

.test-button:hover {
  background: #d97706;
}
</style>
