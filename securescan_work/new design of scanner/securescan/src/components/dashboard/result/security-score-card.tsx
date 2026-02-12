"use client"

import { motion } from "framer-motion"
import { Shield, TrendingDown, TrendingUp } from "lucide-react"

interface SecurityScoreCardProps {
    score: number
    previousScore?: number
}

export function SecurityScoreCard({ score, previousScore = 78 }: SecurityScoreCardProps) {
    const isImproving = score > previousScore
    const diff = Math.abs(score - previousScore)

    return (
        <div className="bg-white rounded-none p-6 lg:p-10 relative overflow-hidden group border border-slate-100 hover:border-slate-950 transition-colors duration-500 w-full">
            {/* Surgical Accents */}
            <div className="absolute top-0 left-0 w-32 h-[1px] bg-slate-100 group-hover:bg-slate-950 transition-colors" />
            <div className="absolute top-0 left-0 w-[1px] h-32 bg-slate-100 group-hover:bg-slate-950 transition-colors" />

            {/* Telemetry Sidebar (HUD Noise) */}
            <div className="absolute right-0 top-0 bottom-0 w-24 border-l border-slate-50 flex flex-col items-center py-6 gap-6 overflow-hidden opacity-20 group-hover:opacity-100 transition-opacity hidden md:flex">
                <div className="flex flex-col gap-4 animate-vertical-scroll w-full items-center">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-1 items-center px-4 w-full">
                            <span className="text-[5px] font-mono font-black text-slate-400 uppercase tracking-tighter truncate w-full text-center">HEX::{Math.floor(Math.random() * 99999).toString(16).toUpperCase()}</span>
                            <div className="w-8 h-[1px] bg-slate-200" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 mr-0 lg:mr-24">
                {/* Left: Score Text Cluster */}
                <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 lg:mb-6">
                        <div className="p-3 lg:p-4 border border-slate-950 bg-slate-950 text-white transition-all scale-90 group-hover:scale-100 duration-700">
                            <Shield className="size-5 lg:size-6" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.4em] text-primary">POSTURE_INDEX_V4.0</span>
                            <span className="text-[7px] lg:text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Diagnostic Monitor</span>
                        </div>
                    </div>
                    <h2 className="text-5xl lg:text-8xl font-black text-slate-950 tracking-tighter mb-4 uppercase leading-[0.8]">
                        Audit <span className="text-slate-400">Score</span>
                    </h2>
                </div>

                {/* Center: Major Score & Gauge Cluster */}
                <div className="relative flex items-center justify-center scale-90 lg:scale-110">
                    <svg className="size-56 lg:size-64 transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="90"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="transparent"
                            className="text-slate-100"
                        />
                        {/* Orbital HUD Ring */}
                        <motion.circle
                            cx="50%"
                            cy="50%"
                            r="105"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="4 8"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            fill="transparent"
                            className="text-slate-100/50"
                        />
                        {/* Tick marks */}
                        {[...Array(12)].map((_, i) => (
                            <line
                                key={i}
                                x1="50%"
                                y1="10%"
                                x2="50%"
                                y2="15%"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-slate-200"
                                transform={`rotate(${i * 30}, 128, 128)`}
                            />
                        ))}
                        <motion.circle
                            cx="50%"
                            cy="50%"
                            r="90"
                            stroke="currentColor"
                            strokeWidth="14"
                            strokeDasharray={565}
                            initial={{ strokeDashoffset: 565 }}
                            animate={{ strokeDashoffset: 565 - (score / 100) * 565 }}
                            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                            fill="transparent"
                            className="text-slate-950"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-7xl lg:text-9xl font-black text-slate-950 tracking-[-0.1em] tabular-nums"
                        >
                            {score}
                        </motion.span>
                        <div className={`flex items-center gap-1.5 px-3 py-0.5 border font-black text-[9px] uppercase tracking-widest font-mono ${isImproving ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                            }`}>
                            {isImproving ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            VAR::{diff}%
                        </div>
                    </div>
                </div>

                {/* Right: Telemetry Snippet (Optional for wide) */}
                <div className="hidden xl:flex flex-col gap-2 max-w-[200px]">
                    <div className="h-[1px] w-full bg-slate-100" />
                    <p className="text-slate-500 text-[9px] font-bold font-mono leading-tight uppercase opacity-60">
                        // ENGINE::CALC_V4.0
                        <br />
                        // INTELLIGENCE_GATHERED::NINE_NODES
                        <br />
                        // SCAN_CONFIDENCE::99.9%
                    </p>
                    <div className="h-[1px] w-full bg-slate-100" />
                </div>
            </div>
        </div>
    )
}
