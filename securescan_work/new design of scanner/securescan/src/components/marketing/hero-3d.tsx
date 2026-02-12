"use client"

import { Canvas } from "@react-three/fiber"
import { Sparkles } from "@react-three/drei"

export function Hero3D() {
    return (
        <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Sparkles
                    count={400}
                    scale={10}
                    size={6}
                    speed={0.4}
                    opacity={0.8}
                    color="#1d4ed8"
                />
            </Canvas>
        </div>
    )
}
