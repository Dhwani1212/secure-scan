"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Shield, Globe, Lock, Code2, AlertCircle, Terminal } from "lucide-react"
import { usePerformance } from "@/hooks/use-performance"

const layers = [
    {
        id: "base",
        title: "The Target",
        bgLabel: "DOM_RECON",
        description: "Everything starts with a domain name. It looks simple, but hides vast infrastructure.",
        data: "securescan.tech [IP: 142.250.190.46]",
        icon: Globe,
        color: "text-slate-400"
    },
    {
        id: "dns",
        title: "DNS Infrastructure",
        bgLabel: "DNS_PARSING",
        description: "Our agents parse MX, SPF, and TXT records to verify routing integrity and sender authenticity.",
        data: "MX: mx1.securescan.tech (10)\nSPF: v=spf1 include:_spf.google.com ~all\nTXT: google-site-verification=...",
        icon: Shield,
        color: "text-primary"
    },
    {
        id: "ssl",
        title: "Encryption Layer",
        bgLabel: "TLS_HANDSHAKE",
        description: "Validating certificate chains, expiration dates, and the strength of the TLS 1.3 handshake.",
        data: "Cert: Valid | Expires: 240 days\nCipher: TLS_AES_256_GCM_SHA384\nIssuer: Let's Encrypt E6",
        icon: Lock,
        color: "text-primary/70"
    },
    {
        id: "content",
        title: "Content & Scripts",
        bgLabel: "SCRIPT_AUDIT",
        description: "Deep-scanning HTML for malicious JS, hidden redirects, and DOM-based vulnerabilities.",
        data: "Scripts: 14 [CLEAN]\nRedirects: 0 Malicious\nDOM_XSS: Negative",
        icon: Code2,
        color: "text-emerald-500"
    },
    {
        id: "reputation",
        title: "Global Reputation",
        bgLabel: "INTEL_REPORT",
        description: "Cross-referencing global blacklists and threat intelligence feeds for historical patterns.",
        data: "Blacklist: 0 Hits\nThreat_Level: Minimal\nVerdict: TRUSTED_SOURCE",
        icon: AlertCircle,
        color: "text-slate-900"
    }
]

function Typewriter({ text, active }: { text: string; active: boolean }) {
    const [displayedText, setDisplayedText] = useState("")

    useEffect(() => {
        if (!active) {
            setDisplayedText("")
            return
        }

        let i = 0
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i))
            i++
            if (i > text.length) clearInterval(interval)
        }, 30)

        return () => clearInterval(interval)
    }, [text, active])

    return <p className="leading-relaxed whitespace-pre-wrap">{displayedText}</p>
}

export function AnatomyOfScan() {
    const profile = usePerformance()
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Optimize spring settings based on performance tier
    // Low performance = Much lighter spring calculation
    const springConfig = profile.isLow
        ? { stiffness: 40, damping: 20, restDelta: 0.1 } // Faster, less precise exit
        : { stiffness: 100, damping: 30, restDelta: 0.001 }

    const smoothProgress = useSpring(scrollYProgress, springConfig)

    return (
        <section ref={containerRef} className="relative h-[600vh] bg-transparent">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Side: Visual Dissection */}
                    <div className="relative h-[500px] flex items-center justify-center">
                        {/* SVG Connectors - Simplify on mobile */}
                        {!profile.isLow && (
                            <svg className="absolute inset-0 size-full pointer-events-none opacity-20" viewBox="0 0 500 500">
                                {layers.map((_, i) => {
                                    const start = i / layers.length
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    const pathLength = useTransform(smoothProgress, [start, start + 0.1], [0, 1])
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    const opacity = useTransform(smoothProgress, [start, start + 0.1], [0, 1])

                                    return (
                                        <motion.path
                                            key={`path-${i}`}
                                            d={`M 250 250 L ${250 + (i % 2 === 0 ? -150 : 150)} ${250 + (i - 2) * 100}`}
                                            stroke="#cbd5e1"
                                            strokeWidth="1"
                                            strokeDasharray="4 4"
                                            fill="none"
                                            style={{ pathLength, opacity }}
                                        />
                                    )
                                })}
                            </svg>
                        )}

                        {/* Render Layers (Keep rest of logic same but consuming profile if needed) */}
                        {layers.map((layer, index) => {
                            const start = index / layers.length
                            const end = (index + 1) / layers.length

                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const opacity = useTransform(smoothProgress, [start, start + 0.01, end - 0.05, end], [0, 1, 1, 0])
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const y = useTransform(smoothProgress, [start, end], [index === 0 ? 0 : 150, -150])
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const scale = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [0.7, 1, 1, 0.7])

                            // Determine if this layer is primarily active
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const [isActive, setIsActive] = useState(false)
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            useEffect(() => {
                                const unsubscribe = smoothProgress.on("change", (v) => {
                                    setIsActive(v >= start && v < end)
                                })
                                return () => unsubscribe()
                            }, [smoothProgress, start, end])

                            return (
                                <motion.div
                                    key={layer.id}
                                    style={{ opacity, y, scale }}
                                    className="absolute inset-0 flex items-center justify-center p-4"
                                >
                                    <div className="relative group w-full max-w-sm">
                                        <div className={`absolute -inset-1 bg-gradient-to-r ${index % 2 === 0 ? "from-primary to-purple-600" : "from-slate-950 to-slate-800"
                                            } rounded-[2.6rem] blur opacity-0 group-hover:opacity-20 transition duration-500`} />

                                        <div className="relative bg-white border border-slate-100 p-6 md:p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-4 rounded-2xl bg-slate-50 ${layer.color}`}>
                                                        <layer.icon size={28} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{layer.title}</h3>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Layer_Protocol v2.1</span>
                                                    </div>
                                                </div>
                                                <Terminal size={18} className="text-slate-200" />
                                            </div>

                                            <div className="bg-slate-900 rounded-[1.5rem] p-6 font-mono text-xs md:text-sm text-primary overflow-hidden relative">
                                                <div className="absolute top-0 right-0 p-3 opacity-20">
                                                    <div className="size-1 rounded-full bg-purple-400 animate-ping" />
                                                </div>

                                                <div className="flex items-center gap-2 mb-3 text-slate-600 border-b border-slate-800 pb-2">
                                                    <span className="size-1.5 rounded-full bg-red-500/50" />
                                                    <span className="size-1.5 rounded-full bg-yellow-500/50" />
                                                    <span className="size-1.5 rounded-full bg-green-500/50" />
                                                    <span className="ml-2 text-[10px] uppercase tracking-tighter">Live_Security_Audit</span>
                                                </div>

                                                <Typewriter text={layer.data} active={isActive} />

                                                <motion.span
                                                    animate={{ opacity: [0, 1, 0] }}
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                    className="inline-block w-2 h-4 bg-primary ml-1 translate-y-1"
                                                />
                                            </div>

                                            <div className="mt-6 flex items-center justify-between">
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">ID: {layer.id.toUpperCase()}_00{index + 1}</span>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3].map(d => <div key={d} className="size-1 rounded-full bg-slate-100" />)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                    {/* Right Side: Copy */}
                    <div className="relative h-[200px] flex items-center">
                        {layers.map((layer, index) => {
                            const start = index / layers.length
                            const end = (index + 1) / layers.length

                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const opacity = useTransform(smoothProgress, [start, start + 0.02, end - 0.05, end], [0, 1, 1, 0])
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const x = useTransform(smoothProgress, [start, start + 0.1], [60, 0])
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const blur = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [10, 0, 0, 10])

                            return (
                                <motion.div
                                    key={`copy-${layer.id}`}
                                    style={{ opacity, x, filter: `blur(${blur}px)` }}
                                    className="absolute inset-0 flex flex-col justify-center"
                                >
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="h-px w-8 bg-slate-200" />
                                        <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
                                            Protocol Phase 0{index + 1}
                                        </span>
                                    </div>
                                    <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.85] uppercase tracking-tighter">
                                        {layer.title.split(' ').map((word, i) => (
                                            <span key={i} className={i === 1 ? "text-slate-200" : ""}>
                                                {word}<br />
                                            </span>
                                        ))}
                                    </h2>
                                    <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-sm">
                                        {layer.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Vertical Progress Bar */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 h-48 w-px bg-slate-100 hidden md:block">
                    <motion.div
                        className="w-full bg-slate-900"
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                    />
                </div>

                {/* Progress Indicators (Bottom) */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                    {layers.map((_, i) => {
                        const start = i / layers.length
                        const end = (i + 1) / layers.length

                        return (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <motion.div
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    style={{
                                        height: useTransform(smoothProgress, [start, end], [4, 12]),
                                        opacity: useTransform(smoothProgress, [start, end], [0.2, 1]),
                                        backgroundColor: useTransform(smoothProgress, [start, end], ["#e2e8f0", "#0f172a"])
                                    }}
                                    className="w-1.5 rounded-full"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
