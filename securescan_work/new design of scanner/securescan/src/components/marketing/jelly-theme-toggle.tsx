"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function JellyThemeToggle() {
    const [isDark, setIsDark] = useState(false)

    // Jelly spring configuration
    const jellySpring = {
        type: "spring",
        stiffness: 600,
        damping: 15,
        mass: 1
    } as const

    return (
        <div className="relative pointer-events-auto">
            <motion.button
                onClick={() => setIsDark(!isDark)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9, rotate: isDark ? -5 : 5 }}
                className="relative h-9 w-16 rounded-full bg-slate-100/80 border border-slate-200 p-1 flex items-center overflow-hidden shadow-sm backdrop-blur-sm"
            >
                {/* Squishy Background Indicator */}
                <motion.div
                    layout
                    transition={jellySpring}
                    className="absolute inset-y-1 rounded-full bg-white shadow-md flex items-center justify-center z-10"
                    style={{
                        left: isDark ? "44%" : "4px",
                        right: isDark ? "4px" : "44%",
                    }}
                >
                    <motion.div
                        layout
                        initial={false}
                        animate={{
                            rotate: isDark ? 180 : 0,
                            scale: isDark ? 1 : 1
                        }}
                        transition={jellySpring}
                    >
                        {isDark ? (
                            <Moon size={12} className="text-slate-900" />
                        ) : (
                            <Sun size={12} className="text-amber-500" />
                        )}
                    </motion.div>
                </motion.div>

                {/* Background Icons */}
                <div className="flex w-full justify-between items-center px-2 text-slate-300">
                    <Sun size={10} className={!isDark ? "opacity-0" : "opacity-100"} />
                    <Moon size={10} className={isDark ? "opacity-0" : "opacity-100"} />
                </div>
            </motion.button>

            {/* Ambient Glow */}
            <motion.div
                animate={{
                    opacity: isDark ? 0.3 : 0,
                    scale: isDark ? 1.5 : 0.8
                }}
                className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full -z-10 pointer-events-none"
            />
        </div>
    )
}
