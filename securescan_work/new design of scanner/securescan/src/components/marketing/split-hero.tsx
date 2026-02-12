"use client"

import React, { useRef } from "react"
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence, useScroll } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { usePerformance } from "@/hooks/use-performance"

const dnaMarkers = [
    { label: "DNS_A_RECORD", val: "104.21.34.112", color: "text-primary" },
    { label: "DNS_A_RECORD", val: "104.21.34.112", color: "text-primary" },
    { label: "MAIL_SECURITY", val: "SPF/DKIM: PASS", color: "text-primary" },
    { label: "PHISHING_SCORE", val: "0.2/10 (CLEAN)", color: "text-primary" }
]


export function SplitHero() {
    const containerRef = useRef<HTMLDivElement>(null)

    const profile = usePerformance()

    // Mouse movement values for parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth magnetic/parallax springs - Lighter on Low tier
    const springConfig = profile.isLow
        ? { stiffness: 40, damping: 20 }
        : { stiffness: 100, damping: 30 }

    const smoothX = useSpring(mouseX, springConfig)
    const smoothY = useSpring(mouseY, springConfig)

    // Transform values
    const bgX = useTransform(smoothX, [-500, 500], [20, -20])
    const bgY = useTransform(smoothY, [-500, 500], [20, -20])
    const textTiltX = useTransform(smoothY, [-500, 500], [5, -5])
    const textTiltY = useTransform(smoothX, [-500, 500], [-5, 5])

    // Scroll progress for exit animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 1])
    const textFlyOut = useTransform(scrollYProgress, [0, 1], [0, 0])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        mouseX.set(x)
        mouseY.set(y)
    }


    const [userInput, setUserInput] = React.useState("")
    const [isFocused, setIsFocused] = React.useState(false)
    const [isScanning, setIsScanning] = React.useState(false)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (userInput.trim()) {
            setIsScanning(true)
            setTimeout(() => {
                router.push(`/dashboard/new?domain=${encodeURIComponent(userInput.trim())}`)
            }, 1500)
        }
    }

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative z-0 min-h-screen bg-transparent flex flex-col justify-start pt-20 pb-10 overflow-hidden"
        >

            {/* Content Container - Asymmetric Staggered */}
            <div className="container mx-auto px-6 md:px-12 z-20 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Column - High Tension Typography */}
                <div className="lg:col-span-7 flex flex-col items-start text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-4 flex items-center gap-3"
                    >
                        <div className="h-px w-12 bg-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">SecureScan_Protocol_Active</span>
                    </motion.div>

                    <motion.h1
                        style={{ rotateX: textTiltX, rotateY: textTiltY, opacity: heroOpacity, y: textFlyOut }}
                        className="text-6xl md:text-7xl lg:text-[8rem] font-black tracking-tighter text-slate-900 leading-[0.85] mb-6 flex flex-col items-start"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            THE
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400"
                        >
                            SECURE
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="italic text-slate-400/20"
                        >
                            ENTITY.
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ opacity: heroOpacity }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-6 opacity-80 max-w-lg border-l-2 border-slate-200 pl-6"
                    >
                        Diagnose infrastructure health with clinical precision. <br />
                        <span className="text-slate-900 font-bold">Advanced recon for the decentralized web.</span>
                    </motion.p>

                    <div className="relative w-full max-w-xl">
                        {/* Branching Markers (Top) */}
                        <div className="h-16 w-full flex justify-center items-end gap-12 mb-2">
                            <AnimatePresence>
                                {userInput.length > 5 && (
                                    <>
                                        {dnaMarkers.slice(0, 2).map((marker, i) => (
                                            <motion.div
                                                key={marker.label}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex flex-col items-center"
                                            >
                                                <span className={`text-[8px] font-black uppercase tracking-widest ${marker.color}`}>{marker.val}</span>
                                                <div className="w-px h-4 bg-gradient-to-t from-primary/20 to-transparent my-1" />
                                                <span className="text-[7px] font-bold uppercase tracking-tighter text-slate-400">{marker.label}</span>
                                            </motion.div>
                                        ))}
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div
                            initial={false}
                            animate={{
                                scale: isFocused ? 1.02 : 1,
                                borderColor: isFocused ? "rgba(161, 70, 161, 0.4)" : "rgba(226, 232, 240, 1)",
                                backgroundColor: isFocused ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.6)"
                            }}
                            className="relative flex items-center p-5 backdrop-blur-3xl rounded-sm border shadow-2xl overflow-hidden group"
                        >
                            <Search className={`relative z-10 mr-4 transition-colors ${isFocused ? 'text-primary' : 'text-slate-400'}`} size={24} />

                            <form onSubmit={handleSubmit} className="relative z-10 flex-1">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="ISCAN_TARGET: enter_domain.com"
                                    className="w-full bg-transparent border-none outline-none text-xl font-black tracking-tight placeholder:text-slate-300 text-slate-900"
                                />
                            </form>

                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: userInput.length > 0 ? 1 : 0, x: userInput.length > 0 ? 0 : 20 }}
                                type="submit"
                                onClick={handleSubmit}
                                className="relative z-10 flex items-center justify-center size-10 bg-slate-900 text-white rounded-sm hover:bg-primary transition-colors"
                            >
                                <ArrowRight size={18} />
                            </motion.button>
                        </motion.div>

                        {/* Branching Markers (Bottom) */}
                        <div className="h-16 w-full flex justify-center items-start gap-12 mt-2">
                            <AnimatePresence>
                                {userInput.length > 8 && (
                                    <>
                                        {dnaMarkers.slice(2, 4).map((marker, i) => (
                                            <motion.div
                                                key={marker.label}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex flex-col items-center"
                                            >
                                                <div className="w-px h-4 bg-gradient-to-b from-primary/20 to-transparent my-1" />
                                                <span className="text-[7px] font-bold uppercase tracking-tighter mb-1 text-slate-400">{marker.label}</span>
                                                <span className={`text-[8px] font-black uppercase tracking-widest ${marker.color}`}>{marker.val}</span>
                                            </motion.div>
                                        ))}
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Scanning Line overlay */}
                        {isScanning && (
                            <motion.div
                                initial={{ left: "0%" }}
                                animate={{ left: "100%" }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 bottom-0 w-px bg-primary shadow-[0_0_20px_rgba(161,70,161,1)] z-20"
                            />
                        )}
                    </div>
                </div>

                {/* Right Column - Reserved for Global Globe */}
                <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center pointer-events-none">
                    {/* Empty space allows the fixed global globe to be the main visual here */}
                </div>
            </div>


            {/* Decorative Geometric Overlays */}
            <div className="absolute bottom-10 left-10 text-[10px] font-mono text-slate-300 pointer-events-none origin-bottom-left -rotate-90">
                L_COORD: 51.5074 N, 0.1278 W // SYSTEM_UPTIME: 99.99%
            </div>


            {/* Decorative Side Glow */}
            <motion.div
                style={{ opacity: useTransform(smoothX, [-500, 500], [0.1, 0.3]) }}
                className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50/50 to-transparent pointer-events-none"
            />
        </section>
    )
}

