/**
 * API Service Layer
 *
 * Organized HTTP client for communicating with our Symfony API.
 *
 * - Base axios instance configured for our API (localhost:8000/api/v1)
 * - apiService object contains typed methods for each endpoint
 * - Each method returns Promise<ApiResponse<T>> where T is the expected data type
 * - Methods handle the response.data extraction automatically
 *
 * Usage:
 * const healthData = await apiService.health(); // Returns typed HealthResponse
 *
 * This keeps API calls organized and provides TypeScript autocomplete/type checking.
 */

import axios from 'axios'
import type { ApiResponse, HealthResponse } from '@/types'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
if (!apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is required in environment configuration')
}

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

console.log(apiBaseUrl)

// API service methods
export const apiService = {
  health: (): Promise<ApiResponse<HealthResponse>> =>
    api.get('/health').then(response => response.data)
}

export default api
