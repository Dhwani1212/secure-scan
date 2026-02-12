"use client"

import { useState, FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Shield, Globe, Activity, ArrowRight } from "lucide-react"
import { DNAParticleField } from "./dna-particle-field"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const dnaMarkers = [
    { label: "DNS_A_RECORD", val: "104.21.34.112", color: "text-primary" },
    { label: "DNS_A_RECORD", val: "104.21.34.112", color: "text-primary" },
    { label: "MAIL_SECURITY", val: "SPF/DKIM: PASS", color: "text-primary" },
    { label: "PHISHING_SCORE", val: "0.2/10 (CLEAN)", color: "text-primary" }
]

export function DomainDNAHero({ isLightMode = false }: { isLightMode?: boolean }) {
    const [userInput, setUserInput] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [isScanning, setIsScanning] = useState(false)
    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (userInput.trim()) {
            setIsScanning(true)
            setTimeout(() => {
                router.push(`/dashboard/new?domain=${encodeURIComponent(userInput.trim())}`)
            }, 1500)
        }
    }

    return (
        <div className="relative w-full min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
            {!isLightMode && <DNAParticleField />}

            {/* Central DNA Stream / Text Reveal */}
            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">

                {/* Branching Markers (Top) */}
                <div className="h-32 w-full flex justify-center items-end gap-12 md:gap-24 mb-4">
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
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${marker.color}`}>{marker.val}</span>
                                        <div className="w-px h-12 bg-gradient-to-t from-blue-500/20 to-transparent my-2" />
                                        <span className={cn(
                                            "text-[8px] font-bold uppercase tracking-tighter",
                                            isLightMode ? "text-slate-400" : "text-slate-500"
                                        )}>{marker.label}</span>
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main Input / Cyber Aperture */}
                <div className="relative w-full max-w-2xl px-4">
                    <motion.div
                        initial={false}
                        animate={{
                            scale: isFocused ? 1.02 : 1,
                            borderColor: isFocused
                                ? "rgba(59, 130, 246, 0.5)"
                                : isLightMode ? "rgba(0, 0, 0, 0.05)" : "rgba(226, 232, 240, 0.1)",
                            backgroundColor: isLightMode ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.05)"
                        }}
                        className={cn(
                            "relative flex items-center p-6 backdrop-blur-3xl rounded-full border shadow-2xl overflow-hidden group",
                            isLightMode ? "border-slate-200 shadow-slate-200/50" : "border-white/10"
                        )}
                    >
                        {/* Aperture Background Glow */}
                        <motion.div
                            animate={{ opacity: isFocused ? (isLightMode ? 0.2 : 0.8) : (isLightMode ? 0.05 : 0.3) }}
                            className={cn(
                                "absolute inset-0 bg-gradient-to-r via-white/5",
                                isLightMode ? "from-blue-200/50 to-blue-200/50" : "from-blue-500/10 to-blue-500/10"
                            )}
                        />

                        <Search className={`relative z-10 mr-4 transition-colors ${isFocused ? 'text-primary' : 'text-slate-400'}`} size={24} />

                        <form onSubmit={handleSubmit} className="relative z-10 flex-1">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="ISCAN_TARGET: enter_domain.com"
                                className={cn(
                                    "w-full bg-transparent border-none outline-none text-xl md:text-2xl font-black tracking-tight placeholder:font-bold",
                                    isLightMode ? "text-slate-900 placeholder:text-slate-300" : "text-white placeholder:text-slate-600"
                                )}
                            />
                        </form>

                        <AnimatePresence>
                            {(userInput.length > 0 || isFocused) && (
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    type="submit"
                                    onClick={handleSubmit}
                                    className={cn(
                                        "relative z-10 flex items-center justify-center size-12 rounded-full shadow-xl hover:scale-110 transition-transform",
                                        isLightMode ? "bg-primary text-white" : "bg-slate-900 text-white"
                                    )}
                                >
                                    <ArrowRight size={20} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </motion.div>

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

                {/* Branching Markers (Bottom) */}
                <div className="h-32 w-full flex justify-center items-start gap-12 md:gap-24 mt-4">
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
                                        <div className="w-px h-12 bg-gradient-to-b from-blue-500/20 to-transparent my-2" />
                                        <span className={cn(
                                            "text-[8px] font-bold uppercase tracking-tighter mb-1",
                                            isLightMode ? "text-slate-400" : "text-slate-500"
                                        )}>{marker.label}</span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${marker.color}`}>{marker.val}</span>
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Status HUD (Tiny) */}
                <div className="mt-12 flex gap-8 items-center justify-center opacity-40">
                    {[
                        { icon: Activity, label: "LATENCY: 14MS" },
                        { icon: Shield, label: "SHIELD: ACTIVE" },
                        { icon: Globe, label: "NODES: 84" }
                    ].map((hud, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <hud.icon size={10} className="text-primary" />
                            <span className={cn(
                                "text-[8px] font-black tracking-widest uppercase",
                                isLightMode ? "text-slate-400" : "text-slate-600"
                            )}>{hud.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

