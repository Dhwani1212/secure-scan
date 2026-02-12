"use client"

import { motion } from "framer-motion"

interface ProgressVisualizerProps {
    progress: number
    status: string
}

export function ProgressVisualizer({ progress, status }: ProgressVisualizerProps) {
    const radius = 100
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
        <div className="relative flex items-center justify-center">
            <svg className="size-64 md:size-80 transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="transparent"
                    className="text-slate-100"
                />

                {/* Technical Ticks */}
                {[...Array(36)].map((_, i) => (
                    <line
                        key={i}
                        x1="50%"
                        y1="10%"
                        x2="50%"
                        y2="14%"
                        stroke="currentColor"
                        strokeWidth="1"
                        className={i * (100 / 36) <= progress ? "text-slate-900" : "text-slate-200"}
                        transform={`rotate(${i * 10}, 160, 160)`}
                    />
                ))}

                {/* Progress Circle */}
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    fill="transparent"
                    className="text-slate-950"
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2 font-mono">TASK_PROXIMITY</span>
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl font-black text-slate-950 tabular-nums tracking-tighter"
                    >
                        {progress}%
                    </motion.span>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 px-4 py-1 border border-slate-950 flex items-center gap-3"
                    >
                        <div className="size-1.5 bg-slate-950 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-950 uppercase tracking-widest">
                            {status.replace(/ /g, '_')}
                        </span>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
