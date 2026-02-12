"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Activity, Zap, Search, Shield, Cpu, Database, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/hooks/use-performance"

const PerformanceStep = ({
    time,
    label,
    description,
    icon: Icon,
    isLast = false,
    isLow = false
}: {
    time: string,
    label: string,
    description: string,
    icon: any,
    isLast?: boolean,
    isLow?: boolean
}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <div ref={ref} className="relative pl-12 pb-16 last:pb-0">
            {!isLast && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={isInView ? { height: "100%" } : {}}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute left-[19px] top-10 w-px bg-gradient-to-b from-blue-500 via-blue-200 to-transparent z-0"
                />
            )}

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute left-0 top-0 size-10 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10 shadow-lg shadow-purple-200"
            >
                <Icon size={18} className="text-primary" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-black text-primary font-mono tracking-tighter">{time}</span>
                    <h4 className="text-lg font-black tracking-tight text-slate-900">{label}</h4>
                </div>
                <p className="text-slate-500 font-medium max-w-md">{description}</p>

                {label === "AI Logic Analysis" && isInView && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-xl font-mono text-[10px] text-primary overflow-hidden"
                    >
                        <motion.div
                            animate={isLow ? { y: -50 } : { y: [0, -100] }}
                            transition={{ duration: 2, repeat: isLow ? 0 : Infinity, ease: "linear" }}
                        >
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i}>SCAN_BUFFER_{Math.random().toString(16).slice(2, 8)}... OK</div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

const EKGLine = ({ isLow }: { isLow: boolean }) => {
    return (
        <div className="relative w-full h-32 overflow-hidden bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100 flex items-center shadow-inner">
            <svg viewBox="0 0 400 100" className="w-full h-full">
                <motion.path
                    d="M 0 50 L 50 50 L 60 20 L 70 80 L 80 50 L 130 50 L 140 10 L 150 90 L 160 50 L 210 50 L 220 30 L 230 70 L 240 50 L 290 50 L 300 15 L 310 85 L 320 50 L 400 50"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 3, repeat: isLow ? 0 : Infinity, ease: "linear" }}
                />
                {/* Glow layer - Disabled on low end */}
                {!isLow && (
                    <motion.path
                        d="M 0 50 L 50 50 L 60 20 L 70 80 L 80 50 L 130 50 L 140 10 L 150 90 L 160 50 L 210 50 L 220 30 L 230 70 L 240 50 L 290 50 L 300 15 L 310 85 L 320 50 L 400 50"
                        fill="none"
                        stroke="#a146a1"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="blur-[2px] opacity-30"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                )}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none" />
        </div>
    )
}

export function PerformanceVisualizer() {
    const profile = usePerformance()
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })
    const isLow = profile.isLow

    // Performance number counter
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (isInView) {
            let start = 0
            const end = 140
            const duration = 2000
            const increment = end / (duration / 16)

            const timer = setInterval(() => {
                start += increment
                if (start >= end) {
                    setCount(end)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(start))
                }
            }, 16)
            return () => clearInterval(timer)
        }
    }, [isInView])

    return (
        <section ref={containerRef} className="py-32 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Left: Headline & Gauge */}
                    <div className="flex-1 space-y-12">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 mb-6"
                            >
                                <Activity size={12} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Zero-Latency Engine</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9] mb-8"
                            >
                                Analysis at the <br />
                                <span className="text-primary italic">Speed of Thought.</span>
                            </motion.h2>
                        </div>

                        <div className="space-y-6">
                            <EKGLine isLow={isLow} />
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">SCAN_LATENCY</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-6xl font-black text-primary tracking-tighter">{count}</span>
                                        <span className="text-2xl font-black text-primary/30">ms</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">ACCURACY_INDEX</span>
                                    <span className="text-2xl font-black text-slate-900">99.98%</span>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-slate-900 text-white font-black uppercase tracking-widest text-xs px-10 py-5 rounded-full shadow-2xl shadow-slate-200"
                        >
                            View technical specs
                        </motion.button>
                    </div>

                    {/* Right: Interactive Dissection Timeline */}
                    <div className="flex-1 bg-slate-50/50 rounded-[40px] p-12 border border-slate-100/50 backdrop-blur-sm self-stretch">
                        <div className="mb-12 border-b border-slate-100 pb-8">
                            <h3 className="text-2xl font-black tracking-tight text-slate-900 mb-2 whitespace-nowrap">Single Scan Dissection</h3>
                            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Cycle ID: SS-SCAN-X912</p>
                        </div>

                        <div className="space-y-0">
                            <PerformanceStep
                                time="0ms"
                                label="Request Initiated"
                                description="SecureScan node receives target domain. Encryption handshake completed."
                                icon={Zap}
                                isLow={isLow}
                            />
                            <PerformanceStep
                                time="45ms"
                                label="Global Cross-Reference"
                                description="Async querying of 200+ global threat databases and WHOIS records."
                                icon={Database}
                                isLow={isLow}
                            />
                            <PerformanceStep
                                time="90ms"
                                label="AI Logic Analysis"
                                description="Custom neural network evaluates behavioral patterns and phishing probability."
                                icon={Cpu}
                                isLow={isLow}
                            />
                            <PerformanceStep
                                time="120ms"
                                label="Report Generated"
                                description="Clinical report compiled with actionable mitigation protocols."
                                icon={CheckCircle2}
                                isLast={true}
                                isLow={isLow}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
