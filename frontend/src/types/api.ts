/**
 * API Response Types
 *
 * These TypeScript interfaces match the JSON structure returned by our Symfony API.
 *
 * ApiResponse<T> matches our BaseApiController::success() format:
 * - message?: string (optional message from Symfony)
 * - data?: T (the actual data passed to $data parameter)
 *
 * Specific response types (like HealthResponse) define what goes in the "data" field.
 *
 * Example:
 * Symfony: return $this->success(['status' => 'OK'], 'API running');
 * TypeScript: ApiResponse<HealthResponse>
 */

// ========== Basic API response structure ==========
export interface ApiResponse<T = any> {
  message?: string
  data?: T
}

// ========== Endpoints check response ==========
// Health check response
export interface HealthResponse {
  status: string
  timestamp: string
  version: string
}
