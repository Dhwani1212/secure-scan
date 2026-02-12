"use client"

import { ReactNode } from "react"
import { ReactLenis } from "lenis/react"

export function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.05,
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        }}>
            {children}
        </ReactLenis>
    )
}
