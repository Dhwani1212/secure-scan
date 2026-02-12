"use client"

import { motion } from "framer-motion"

export function GlobalRadar() {
    return (
        <div className="relative size-[600px] opacity-20 pointer-events-none select-none">
            {/* Rotating Outer Ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-purple-500/20 rounded-full"
            />
            {/* Middle Ring */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-20 border border-dashed border-purple-500/10 rounded-full"
            />

            {/* The Globe Shadow */}
            <div className="absolute inset-40 bg-slate-100 rounded-full blur-[100px] opacity-10" />

            {/* SVG Globe */}
            <svg className="absolute inset-0 size-full" viewBox="0 0 600 600">
                <defs>
                    <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#a146a1" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Globe Sphere */}
                <circle cx="300" cy="300" r="180" fill="url(#globeGrad)" />
                <circle cx="300" cy="300" r="180" stroke="#a146a1" strokeWidth="0.5" strokeOpacity="0.1" fill="none" />

                {/* Arcs (Simulating connections) */}
                {[...Array(6)].map((_, i) => (
                    <motion.path
                        key={i}
                        d={`M ${300 + Math.cos(i) * 150} ${300 + Math.sin(i) * 150} Q 300 300 ${300 + Math.cos(i + 2) * 150} ${300 + Math.sin(i + 2) * 150}`}
                        stroke="#a146a1"
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0, 0.5, 0],
                            x: [0, Math.random() * 20 - 10],
                            y: [0, Math.random() * 20 - 10]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}

                {/* Latitude/Longitude Lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <ellipse
                        key={`lat-${i}`}
                        cx="300" cy="300"
                        rx="180" ry={180 * (i / 8)}
                        fill="none" stroke="#a146a1"
                        strokeWidth="0.5" strokeOpacity="0.05"
                    />
                ))}
            </svg>

            {/* Scanning Laser Effect (Vertical Bar) */}
            <motion.div
                animate={{ y: [200, 400, 200] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[120px] right-[120px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10"
            />
        </div>
    )
}
