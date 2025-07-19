<template>
  <div class="home">
    <h1>Pulse Budget</h1>

    <div class="api-test">
      <h2>API Connection Test</h2>
      <button @click="testConnection">Test Symfony API</button>

      <div v-if="loading">Loading...</div>

      <div v-if="apiResponse" class="success">
        <h3>✅ API Connected!</h3>
        <pre>{{ apiResponse }}</pre>
      </div>

      <div v-if="error" class="error">
        <h3>❌ Error:</h3>
        <pre>{{ error }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/services/api'
import { apiService } from '@/services/api'

// Variables
const loading = ref(false)
const apiResponse = ref(null)
const error = ref(null)

// Function to test API connection
const testConnection = async () => {
  loading.value = true
  error.value = null
  apiResponse.value = null

  try {
    const response = await apiService.health()
    apiResponse.value = response.data
  } catch (err: any) {
    error.value = err.message
    console.error('API Error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.api-test {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.success {
  color: green;
  margin: 10px 0;
}

.error {
  color: red;
  margin: 10px 0;
}

pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

button {
  background: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #369870;
}
</style>
