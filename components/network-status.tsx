'use client'

import { useNetworkStatus } from '@/hooks/use-network-status'
import { Badge } from '@/components/ui/badge'
import { WifiIcon, WifiOffIcon, RefreshCwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function NetworkStatus() {
  const { isOnline, isChecking, checkConnectivity } = useNetworkStatus()

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant={isOnline ? "default" : "destructive"}
        className="flex items-center gap-1"
      >
        {isOnline ? (
          <>
            <WifiIcon className="h-3 w-3" />
            Online
          </>
        ) : (
          <>
            <WifiOffIcon className="h-3 w-3" />
            Offline
          </>
        )}
      </Badge>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={checkConnectivity}
        disabled={isChecking}
        className="h-6 w-6 p-0"
      >
        <RefreshCwIcon className={`h-3 w-3 ${isChecking ? 'animate-spin' : ''}`} />
      </Button>
      
      {!isOnline && (
        <span className="text-xs text-muted-foreground">
          Using Gemini Nano
        </span>
      )}
    </div>
  )
}