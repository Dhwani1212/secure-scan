"use client"

import { useState, useEffect } from "react"

export type QualityProfile = "low" | "medium" | "high"

export function usePerformance() {
    const [quality, setQuality] = useState<QualityProfile>("medium")

    useEffect(() => {
        const detectQuality = () => {
            // 1. Mobile Detection (Basic but effective for Tier 0)
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )

            if (isMobile) {
                setQuality("low")
                return
            }

            // 2. Hardware Concurrency (CPU Cores)
            const cores = navigator.hardwareConcurrency || 4

            // 3. Memory (RAM) - if available
            const memory = (navigator as any).deviceMemory || 4

            // 4. Heuristic Tiering
            if (cores <= 4 || memory <= 4) {
                setQuality("medium")
            } else if (cores > 8 && memory >= 8) {
                setQuality("high")
            } else {
                setQuality("medium")
            }

            // 5. Future-proof: Listen for Save-Data header or Battery status if needed
        }

        detectQuality()
    }, [])

    return {
        quality,
        isLow: quality === "low",
        isMedium: quality === "medium",
        isHigh: quality === "high"
    }
}
