"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"

function Arcs({ count = 10 }) {
    const lines = useMemo(() => {
        const result = []
        for (let i = 0; i < count; i++) {
            const start = new THREE.Vector3().setFromSphericalCoords(
                2.5,
                Math.random() * Math.PI,
                Math.random() * Math.PI * 2
            )
            const end = new THREE.Vector3().setFromSphericalCoords(
                2.5,
                Math.random() * Math.PI,
                Math.random() * Math.PI * 2
            )

            // Create a curve
            const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(3.5)
            const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
            const points = curve.getPoints(50)
            result.push(points)
        }
        return result
    }, [count])

    return (
        <group>
            {lines.map((points, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry" onUpdate={(self) => self.setFromPoints(points)} />
                    <lineBasicMaterial attach="material" color="#a146a1" transparent opacity={0.2} />
                </line>
            ))}
        </group>
    )
}

function GlobeInner({ isLockOn = false }) {
    const globeRef = useRef<THREE.Group>(null)
    const ringRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!isLockOn && globeRef.current) {
            globeRef.current.rotation.y += 0.002
        }
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2
            ringRef.current.rotation.z += 0.01
        }
    })

    return (
        <group ref={globeRef}>
            {/* Core Sphere */}
            <Sphere args={[2.5, 64, 64]}>
                <meshStandardMaterial
                    color="#0f172a"
                    emissive="#100010"
                    wireframe={true}
                    transparent
                    opacity={0.1}
                />
            </Sphere>

            {/* Atmosphere Glow */}
            <Sphere args={[2.52, 64, 64]}>
                <MeshDistortMaterial
                    color="#a146a1"
                    speed={2}
                    distort={0.1}
                    radius={1}
                    transparent
                    opacity={0.05}
                />
            </Sphere>

            <Arcs count={15} />

            {/* Scanning Ring */}
            <mesh ref={ringRef}>
                <torusGeometry args={[3, 0.01, 16, 100]} />
                <meshBasicMaterial color="#a146a1" transparent opacity={0.2} />
            </mesh>
        </group>
    )
}

interface GlobalThreatGlobeProps {
    isLockOn?: boolean
}

export function GlobalThreatGlobe({ isLockOn = false }: GlobalThreatGlobeProps) {
    return (
        <div className="relative size-[600px] md:size-[800px] pointer-events-none select-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#a146a1" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <GlobeInner isLockOn={isLockOn} />
                </Float>

                {/* Lock-on Laser Effect */}
                <AnimatePresence>
                    {isLockOn && (
                        <group>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <circleGeometry args={[2.8, 64]} />
                                <meshBasicMaterial color="#ef4444" transparent opacity={0.05} side={THREE.DoubleSide} />
                            </mesh>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <ringGeometry args={[2.75, 2.8, 64]} />
                                <meshBasicMaterial color="#ef4444" transparent opacity={0.5} />
                            </mesh>
                        </group>
                    )}
                </AnimatePresence>
            </Canvas>

            {/* Overlay Gradient to soften edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_70%)] pointer-events-none" />
        </div>
    )
}
