'use client'

import { useState, useEffect } from 'react'
import { networkUtils } from '@/lib/network-utils'

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    // Initial status
    setIsOnline(networkUtils.getOnlineStatus())

    // Listen for status changes
    const unsubscribe = networkUtils.onStatusChange((online) => {
      setIsOnline(online)
    })

    return unsubscribe
  }, [])

  const checkConnectivity = async () => {
    setIsChecking(true)
    try {
      const online = await networkUtils.checkConnectivity()
      setIsOnline(online)
      return online
    } finally {
      setIsChecking(false)
    }
  }

  return {
    isOnline,
    isChecking,
    checkConnectivity
  }
}