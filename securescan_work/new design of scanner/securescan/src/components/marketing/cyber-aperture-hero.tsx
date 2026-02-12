"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { Search, ArrowRight, Dna } from "lucide-react"
import { useRouter } from "next/navigation"

export function CyberApertureHero() {
    const [userInput, setUserInput] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [isScanning, setIsScanning] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Dot to Aperture expansion logic
    const apertureSize = useTransform(scrollYProgress, [0, 0.4], ["4px", "600px"])
    const apertureOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4], [0.8, 1, 1])
    const contentScale = useTransform(scrollYProgress, [0, 0.4], [0.5, 1])

    // Smooth spring for expansion
    const smoothSize = useSpring(apertureSize, { stiffness: 100, damping: 20 })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (userInput.trim()) {
            setIsScanning(true)
            setTimeout(() => {
                router.push(`/dashboard/new?domain=${encodeURIComponent(userInput.trim())}`)
            }, 1500)
        }
    }

    // Pulse effect on keystroke
    const [pulse, setPulse] = useState(0)
    useEffect(() => {
        if (userInput.length > 0) {
            setPulse(prev => prev + 1)
        }
    }, [userInput])

    return (
        <div ref={containerRef} className="relative w-full min-h-[120vh] flex flex-col items-center pt-32 overflow-hidden bg-black">

            {/* The Hook Headline (Static or slightly faded) */}
            <div className="relative z-20 text-center mb-24 px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center gap-2 mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-primary/60"
                >
                    <div className="size-1 rounded-full bg-primary animate-pulse" />
                    Aperture_Protocol_v9
                </motion.div>
                <motion.h1
                    className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0.2]) }}
                >
                    Opening <br />
                    The <span className="text-primary italic">Unseen</span>
                </motion.h1>
            </div>

            {/* The Search Line (Premium Minimalism) */}
            <div className="sticky top-1/2 -translate-y-1/2 z-30 w-full max-w-xl px-4 flex flex-col items-center">
                <div className="relative w-full">
                    <motion.div
                        animate={{
                            width: isFocused ? "100%" : "60%",
                            opacity: isFocused ? 1 : 0.4
                        }}
                        className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto relative"
                    >
                        {/* Type Pulse */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={pulse}
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: [0, 1, 0], scaleX: [0, 1.2, 1] }}
                                className="absolute inset-0 bg-purple-400 blur-sm"
                            />
                        </AnimatePresence>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="mt-4 flex items-center justify-center">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="TYPE_URL"
                            className="bg-transparent border-none outline-none text-center text-2xl md:text-4xl font-black tracking-widest text-white placeholder:text-purple-900/40 uppercase"
                        />
                    </form>
                </div>
            </div>

            {/* The Aperture (Center Expand) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                    style={{
                        width: smoothSize,
                        height: smoothSize,
                        opacity: apertureOpacity,
                    }}
                    className="relative rounded-full border border-primary/20 bg-[#020617] overflow-hidden shadow-[0_0_100px_rgba(161,70,161,0.1)]"
                >
                    {/* Internal Mesh (3D Abstract) */}
                    <motion.div
                        style={{ scale: contentScale }}
                        className="absolute inset-0 flex items-center justify-center opacity-30"
                    >
                        <div className="relative size-full">
                            {/* SVG Mesh Grid */}
                            <svg className="absolute inset-0 size-full" viewBox="0 0 100 100">
                                <defs>
                                    <pattern id="mesh-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-primary/40" />
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill="url(#mesh-grid)" />

                                {/* Moving "Racks" or "Threads" */}
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <motion.path
                                        key={i}
                                        d={`M ${20 * i} 0 L ${20 * i} 100`}
                                        stroke="currentColor"
                                        strokeWidth="0.2"
                                        className="text-primary/20"
                                        animate={{ y: [-100, 100] }}
                                        transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                                    />
                                ))}
                            </svg>

                            {/* Center Core Dot */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 bg-purple-500/10 blur-3xl rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    )
}
