"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float, Sphere, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"
import { usePerformance } from "@/hooks/use-performance"

function HolographicArcs({ count = 15, isLow = false }) {
    const lines = useMemo(() => {
        const result = []
        // Halve the curve smoothness on low-end devices
        const segments = isLow ? 20 : 50

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

            const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(3.5)
            const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
            const points = curve.getPoints(segments)
            result.push(points)
        }
        return result
    }, [count, isLow])

    return (
        <group>
            {lines.map((points, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry" onUpdate={(self) => self.setFromPoints(points)} />
                    <lineBasicMaterial
                        attach="material"
                        color={i % 2 === 0 ? "#a146a1" : "#c084fc"}
                        transparent
                        opacity={0.3}
                    />
                </line>
            ))}
        </group>
    )
}

function HolographicGrid({ isLow = false }) {
    const gridRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.rotation.y += 0.001
            gridRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
        }
    })

    const lines = useMemo(() => {
        const result = []
        // Significantly reduce grid density for mobile
        const segments = isLow ? 10 : 20

        for (let i = 0; i <= segments; i++) {
            const lat = (i / segments) * Math.PI - Math.PI / 2

            for (let j = 0; j <= segments; j++) {
                const lng = (j / segments) * Math.PI * 2

                const point = new THREE.Vector3().setFromSphericalCoords(
                    2.6,
                    lat,
                    lng
                )

                result.push(point)
            }
        }

        return result
    }, [isLow])

    return (
        <group ref={gridRef}>
            <points>
                <bufferGeometry attach="geometry">
                    <bufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array(lines.flatMap(p => [p.x, p.y, p.z])), 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.02}
                    color="#a146a1"
                    transparent
                    opacity={0.6}
                />
            </points>
        </group>
    )
}

function ThreatNodes({ count = 8, isLow = false }) {
    const nodes = useMemo(() => {
        const result = []
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count)
            const theta = Math.sqrt(count * Math.PI) * phi
            const pos = new THREE.Vector3().setFromSphericalCoords(2.6, phi, theta)
            result.push(pos)
        }
        return result
    }, [count])

    return (
        <group>
            {nodes.map((pos, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
                    <mesh position={pos}>
                        <octahedronGeometry args={[0.08, 0]} />
                        <meshBasicMaterial color={i % 2 === 0 ? "#a146a1" : "#c084fc"} transparent opacity={0.6} />
                        {/* Reduce shadow/light casting nodes on mobile */}
                        {!isLow && <pointLight distance={1} intensity={2} color={i % 2 === 0 ? "#a146a1" : "#c084fc"} />}
                    </mesh>
                </Float>
            ))}
        </group>
    )
}

function ShieldAura() {
    const auraRef = useRef<THREE.Mesh>(null)
    useFrame((_state) => {
        if (auraRef.current) {
            auraRef.current.rotation.y += 0.005
            auraRef.current.rotation.z += 0.002
        }
    })

    return (
        <Sphere ref={auraRef} args={[3.2, 32, 32]}>
            <meshStandardMaterial
                name="ShieldAuraMaterial"
                color="#a146a1"
                transparent
                opacity={0.03}
                side={THREE.BackSide}
                metalness={1}
                roughness={0}
            />
        </Sphere>
    )
}

function HolographicGlobeInner({ isActive = false, profile }: { isActive?: boolean; profile: any }) {
    const globeRef = useRef<THREE.Group>(null)
    const ringRef = useRef<THREE.Mesh>(null)
    const coreRef = useRef<THREE.Mesh>(null)

    const isLow = profile.isLow
    const isHigh = profile.isHigh

    useFrame((_state) => {
        if (globeRef.current) {
            const speed = isActive ? 0.008 : 0.003
            globeRef.current.rotation.y += speed
        }

        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI / 2
            ringRef.current.rotation.z += 0.02
        }

        if (coreRef.current) {
            coreRef.current.rotation.x += 0.005
            coreRef.current.rotation.y += 0.006
        }
    })

    return (
        <group ref={globeRef}>
            {/* Inner Core - Technical Heart */}
            <Sphere ref={coreRef} args={[1.8, isLow ? 16 : 32, isLow ? 16 : 32]}>
                <meshBasicMaterial
                    color="#a146a1"
                    wireframe={true}
                    transparent
                    opacity={0.3}
                />
            </Sphere>

            {/* Main Globe - Structural Mesh */}
            <Sphere args={[2.5, isLow ? 24 : 48, isLow ? 24 : 48]}>
                <meshStandardMaterial
                    color="#f8fafc"
                    emissive="#a146a1"
                    emissiveIntensity={0.5}
                    wireframe={true}
                    transparent
                    opacity={0.25}
                    metalness={0.5}
                    roughness={0.5}
                />
            </Sphere>

            {/* Data Visualization Elements - Scaled for performance */}
            <HolographicGrid isLow={isLow} />
            <HolographicArcs count={isLow ? 8 : (isHigh ? 25 : 15)} isLow={isLow} />
            <ThreatNodes count={isLow ? 6 : 12} isLow={isLow} />

            {/* Disable aura on mobile to save GPU blits */}
            {!isLow && <ShieldAura />}

            {/* Interactive Scanning Rings */}
            <mesh ref={ringRef}>
                <torusGeometry args={[3.1, 0.015, 12, isLow ? 60 : 120]} />
                <meshBasicMaterial
                    color="#c084fc"
                    transparent
                    opacity={0.4}
                />
            </mesh>

            <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2.9, 0.01, 12, isLow ? 60 : 120]} />
                <meshBasicMaterial
                    color="#a146a1"
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Vertical HUD Ring */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[3.3, 0.005, 12, isLow ? 60 : 120]} />
                <meshBasicMaterial color="#a146a1" transparent opacity={0.2} />
            </mesh>
        </group>
    )
}

interface HolographicGlobeProps {
    isActive?: boolean
}

export function HolographicGlobe({ isActive = false }: HolographicGlobeProps) {
    const profile = usePerformance()

    return (
        <div className="relative size-[600px] md:size-[800px] pointer-events-none select-none">
            <Canvas gl={{ antialias: !profile.isLow, powerPreference: "high-performance", alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#a146a1" />
                {!profile.isLow && <pointLight position={[-10, -10, -10]} intensity={0.8} color="#c084fc" />}

                {/* Scale stars count */}
                <Stars radius={100} depth={50} count={profile.isLow ? 800 : 3000} factor={4} saturation={0} fade speed={0.8} />

                <Float speed={profile.isLow ? 1 : 2} rotationIntensity={0.8} floatIntensity={0.6}>
                    <HolographicGlobeInner isActive={isActive} profile={profile} />
                </Float>

                {/* Holographic Projection Effect */}
                {isActive && (
                    <group>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <circleGeometry args={[3.2, profile.isLow ? 32 : 64]} />
                            <meshBasicMaterial
                                color="#a146a1"
                                transparent
                                opacity={0.08}
                                side={THREE.DoubleSide}
                            />
                        </mesh>
                    </group>
                )}
            </Canvas>
        </div>
    )
}
