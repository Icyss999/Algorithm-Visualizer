import type { ResponseType, AlgorithmResponse } from "../types/schema"

function isValidVisualization(response: AlgorithmResponse): boolean {
  if (!response.name || typeof response.name !== "string") return false
  if (!["bars", "array", "grid", "graph", "tree"].includes(response.template)) return false
  if (!response.complexity?.time || !response.complexity?.space) return false
  if (!Array.isArray(response.steps) || response.steps.length === 0) return false
  if (!response.code || typeof response.code !== "string") return false
  if (!response.explanation || typeof response.explanation !== "string") return false
  return true
}

export function validateResponse(response: ResponseType): {
  success: boolean
  data: ResponseType
} {
  if (!response || !response.type) {
    return {
      success: false,
      data: { type: "error", message: "Invalid response structure" }
    }
  }

  if (response.type === "visualization") {
    if (!isValidVisualization(response)) {
      return {
        success: false,
        data: { type: "error", message: "Incomplete visualization data returned" }
      }
    }
    return { success: true, data: response }
  }

  if (response.type === "error") {
    return { success: false, data: response }
  }

  if (response.type === "api_error") {
    return { success: false, data: response }
  }

  return {
    success: false,
    data: { type: "error", message: "Unknown response type" }
  }
}