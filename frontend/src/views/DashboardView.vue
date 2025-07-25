<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>🎉 Tableau de bord</h1>
      <p class="welcome-message">Bienvenue dans Pulse Budget!</p>
    </div>

    <div class="dashboard-content">
      <div class="info-card">
        <h2>✅ Authentification réussie</h2>
        <p>Vous êtes maintenant connecté et pouvez accéder aux pages protégées.</p>

        <div class="test-info">
          <h3>🧪 Test de l'authentification:</h3>
          <ul>
            <li>✅ Vous voyez cette page → l'auth guard fonctionne</li>
            <li>✅ Essayez d'aller sur /login → vous serez redirigé ici</li>
            <li>✅ Supprimez le token et rechargez → redirection vers login</li>
          </ul>
        </div>

        <button @click="logout" class="logout-button">
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

/**
 * Dashboard Component
 *
 * This is a protected route - users can only access it if they're authenticated.
 * The auth guard in router/guards.ts protects this route.
 *
 * Later this will contain:
 * - Budget overview
 * - Recent transactions
 * - Savings progress
 * - Quick actions
 */

const router = useRouter()

/**
 * Logout function
 * Removes the auth token and redirects to home
 */
function logout() {
  // Remove auth token
  localStorage.removeItem('auth_token')

  // Redirect to home page
  router.push('/')
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.welcome-message {
  font-size: 1.2rem;
  color: #666;
}

.dashboard-content {
  display: flex;
  justify-content: center;
}

.info-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

.info-card h2 {
  color: #059669;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.info-card p {
  color: #666;
  margin-bottom: 25px;
  line-height: 1.6;
}

.test-info {
  background: #f0f9ff;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
  margin-bottom: 25px;
}

.test-info h3 {
  color: #1e40af;
  margin-bottom: 10px;
}

.test-info ul {
  color: #374151;
  line-height: 1.6;
}

.test-info li {
  margin-bottom: 5px;
}

.logout-button {
  background: #ef4444;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background: #dc2626;
}
</style>
