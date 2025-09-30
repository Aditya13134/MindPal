"use client"

import { useState } from "react"

interface UseAIServiceOptions {
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
}

export function useAIService(endpoint: string, options: UseAIServiceOptions = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  const execute = async (payload: any) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Request failed")
      }

      const result = await response.json()
      setData(result)
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      options.onError?.(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }

  return {
    execute,
    isLoading,
    error,
    data,
    reset,
  }
}

// Specific hooks for each service
export const usePromptGenerator = (options?: UseAIServiceOptions) => useAIService("prompt", options)

export const useProofreader = (options?: UseAIServiceOptions) => useAIService("proofread", options)

export const useSummarizer = (options?: UseAIServiceOptions) => useAIService("summarize", options)

export const useTranslator = (options?: UseAIServiceOptions) => useAIService("translate", options)

export const useWriter = (options?: UseAIServiceOptions) => useAIService("write", options)

export const useRewriter = (options?: UseAIServiceOptions) => useAIService("rewrite", options)
