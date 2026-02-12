"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function PortalTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for "snappy" mechanical feel
                }}
                className="relative z-10"
            >
                {/* Refractive "Lens" Overlay that pulses on transition */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, times: [0, 0.2, 1] }}
                    className="fixed inset-0 pointer-events-none z-50 bg-white"
                />

                {children}
            </motion.div>
        </AnimatePresence>
    )
}
