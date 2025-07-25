<template>
  <div id="app">
    <!-- Navigation Header (optional) -->
    <header class="app-header">
      <nav class="nav-container">
        <div class="brand">
          <router-link to="/" class="brand-link">
            📊 Pulse Budget
          </router-link>
        </div>

        <div class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
        </div>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <!--
        RouterView: This is where route components are rendered
        When user navigates to /dashboard, DashboardView appears here
      -->
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * Root App Component
 *
 * This component wraps the entire application.
 * RouterView renders the component for the current route.
 *
 * Key concepts:
 * - <router-view />: Shows the component for current route
 * - <router-link>: Creates navigation links (instead of <a> tags)
 * - router-link automatically adds 'active' class for current route
 */

// No logic needed yet - this is a presentational component
// Later we'll add auth state checking for conditional navigation
</script>

<style scoped>
.app-header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.brand-link {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #3b82f6;
  background: #f3f4f6;
}

/* Vue Router automatically adds these classes */
.nav-link.router-link-active {
  color: #3b82f6;
  background: #eff6ff;
}

.main-content {
  min-height: calc(100vh - 60px);
  padding: 20px;
}
</style>
