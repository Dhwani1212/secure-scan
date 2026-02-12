"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Shield, Globe, Lock, Search, ArrowRight, X } from "lucide-react"
import { useRouter } from "next/navigation"

const demoLogs = [
    "INITIALIZING_RECON_ENGINE...",
    "RESOLVING SECURESCAN.TECH...",
    "IP FOUND: 104.21.34.112",
    "CHECKING DNS_RECORD: MX [SUCCESS]",
    "CHECKING DNS_RECORD: SPF [SUCCESS]",
    "PROBING SSL_CERT: EXPIRES_IN_210d",
    "DETECTING TLS_CIPHER: AES_256_GCM",
    "AUDITING_WEB_CONTENT: 14_SCRIPTS",
    "SCANNING_REPUTATION: CLEAN",
    "VERDICT: TRUSTED_SOURCE",
    "DONE."
]

interface HackerTerminalHeroProps {
    onInteraction?: (isActive: boolean) => void
}

export function HackerTerminalHero({ onInteraction }: HackerTerminalHeroProps) {
    const [command, setCommand] = useState("")
    const [logs, setLogs] = useState<string[]>([])
    const [isAutoTyping, setIsAutoTyping] = useState(true)
    const [userInput, setUserInput] = useState("")
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        onInteraction?.(userInput.length > 0 || isFocused)
    }, [userInput, isFocused, onInteraction])
    const router = useRouter()
    const logContainerRef = useRef<HTMLDivElement>(null)

    const fullCommand = "isecurity scan --domain: suspicious-link.net"

    // Auto-typing effect
    useEffect(() => {
        if (!isAutoTyping) return

        let i = 0
        const interval = setInterval(() => {
            setCommand(fullCommand.slice(0, i))
            i++
            if (i > fullCommand.length) {
                clearInterval(interval)
                // Start log flicker after command is typed
                startLogFlicker()
            }
        }, 50)

        return () => clearInterval(interval)
    }, [isAutoTyping])

    const startLogFlicker = () => {
        let logIndex = 0
        const interval = setInterval(() => {
            const currentLog = demoLogs[logIndex]
            if (currentLog) {
                setLogs(prev => [...prev.slice(-10), currentLog])
            }
            logIndex++
            if (logIndex >= demoLogs.length) clearInterval(interval)
        }, 150)
    }

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
        }
    }, [logs])

    const handleTerminalClick = () => {
        if (isAutoTyping || logs.length > 0) {
            setIsAutoTyping(false)
            setCommand("")
            setLogs([])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (userInput.trim()) {
            router.push(`/dashboard/new?domain=${encodeURIComponent(userInput.trim())}`)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 mt-20 relative z-20">
            {/* Terminal Window */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onClick={handleTerminalClick}
                className="group relative bg-[#020617]/80 backdrop-blur-2xl border border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
            >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 border-b border-white/5">
                    <div className="flex gap-2">
                        <div className="size-3 rounded-full bg-[#ff5f56]" />
                        <div className="size-3 rounded-full bg-[#ffbd2e]" />
                        <div className="size-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-widest font-bold">
                        <Terminal size={12} /> isecurity_terminal v4.2
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-10 font-mono">
                    <div className="flex flex-col gap-4">
                        {/* Prompt Line */}
                        <div className="flex items-center gap-3">
                            <span className="text-primary font-black">isecurify_root@scanner:~$</span>
                            <div className="relative flex-1 flex items-center">
                                {isAutoTyping ? (
                                    <span className="text-white text-lg md:text-xl font-medium">{command}</span>
                                ) : (
                                    <form onSubmit={handleSubmit} className="w-full">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            placeholder="enter_target_domain.com"
                                            className="w-full bg-transparent border-none outline-none text-white text-lg md:text-xl font-medium placeholder:text-slate-700 placeholder:italic"
                                        />
                                    </form>
                                )}
                                <motion.div
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="w-2.5 h-6 bg-primary ml-1"
                                />
                            </div>
                        </div>

                        {/* Logs Stream */}
                        <div ref={logContainerRef} className="h-40 overflow-y-auto space-y-1.5 scrollbar-hide select-none transition-all duration-500">
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`text-[10px] md:text-xs tracking-tighter flex items-center gap-2 ${log && log.includes("VERDICT") ? "text-primary font-bold" :
                                        log && log.includes("SUCCESS") ? "text-emerald-500" : "text-slate-500"
                                        }`}
                                >
                                    <span className="text-slate-800">[{new Date().toLocaleTimeString('en-GB', { hour12: false })}]</span>
                                    <span>{log}</span>
                                </motion.div>
                            ))}
                            {!isAutoTyping && userInput.length === 0 && !isFocused && (logs.length === 0) && (
                                <div className="text-slate-600 text-xs italic opacity-40 animate-pulse">
                                    // Awaiting destination parameter...
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit Indicator */}
                <AnimatePresence>
                    {(userInput.length > 0) && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onClick={handleSubmit}
                            className="absolute bottom-6 right-6 h-12 px-6 rounded-full bg-primary text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-2xl shadow-purple-500/20 hover:opacity-90 transition-all hover:scale-105"
                        >
                            Execute Scan <ArrowRight size={14} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Quick Stats Overlay (HUD) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                    { label: "Active Nodes", val: "1,248", delta: "+12", icon: Globe },
                    { label: "Threats Blocked", val: "842k", delta: "LIVE", icon: Shield },
                    { label: "Latency", val: "42ms", delta: "-2ms", icon: Search },
                    { label: "Protocol", val: "TLS_1.3", delta: "STABLE", icon: Lock }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-xl flex flex-col gap-1 ring-1 ring-inset ring-white/5"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <stat.icon size={12} className="text-primary/50" />
                            <span className="text-[10px] font-black text-primary">{stat.delta}</span>
                        </div>
                        <span className="text-lg font-black text-white">{stat.val}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
