"use client"

import { motion } from "framer-motion"

export function AnimatedGridPattern() {
    return (
        <div className="absolute inset-0 -z-30 h-full w-full overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 h-full w-full stroke-purple-100/30"
            >
                <svg
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full"
                >
                    <defs>
                        <pattern
                            id="hero-grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                            x="50%"
                            y="-1"
                        >
                            <path d="M.5 40V.5H40" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-grid)" />

                    {/* Moving Beam Effect */}
                    <motion.path
                        d="M.5 40V.5H40"
                        fill="none"
                        stroke="url(#gradient-beam)"
                        strokeWidth="2"
                        strokeLinecap="square"
                        initial={{ pathLength: 0, opacity: 0, x: -100, y: -100 }}
                        animate={{
                            pathLength: [0, 0.2, 0],
                            opacity: [0, 1, 0],
                            x: [0, 400],
                            y: [0, 400]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 2
                        }}
                    />
                </svg>
            </motion.div>

            {/* Aurora / Mesh Gradient Overlay */}
            <div className="absolute -top-40 left-0 right-0 h-96 bg-purple-500/10 blur-[100px] rounded-full mix-blend-multiply opacity-20 animate-pulse" />
        </div>
    )
}
