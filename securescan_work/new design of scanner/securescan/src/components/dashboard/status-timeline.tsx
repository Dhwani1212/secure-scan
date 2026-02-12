"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const phases = [
    { id: "init", title: "Initialization", description: "Configuring assessment parameters and secure handshake." },
    { id: "recon", title: "Infrastructure Recon", description: "Mapping target infrastructure and endpoint discovery." },
    { id: "vuln", title: "Vulnerability Analysis", description: "Deep inspection for SQLi, XSS, and logic flaws." },
    { id: "report", title: "Report Generation", description: "Consolidating findings into an actionable audit log." }
]

interface StatusTimelineProps {
    currentPhaseIndex: number
}

export function StatusTimeline({ currentPhaseIndex }: StatusTimelineProps) {
    return (
        <div className="space-y-12 relative px-2">
            {/* Vertical Line */}
            <div className="absolute left-[20px] top-4 bottom-4 w-px bg-slate-100" />

            {phases.map((phase, index) => {
                const isCompleted = index < currentPhaseIndex
                const isActive = index === currentPhaseIndex

                return (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex gap-10 relative group"
                    >
                        <div className={cn(
                            "relative z-10 size-10 border-2 transition-all duration-500 rounded-none flex items-center justify-center",
                            isCompleted ? "bg-slate-950 border-slate-950 text-white" :
                                isActive ? "bg-white border-primary text-primary scale-110 shadow-[0_0_20px_rgba(128,0,128,0.1)]" :
                                    "bg-white border-slate-100 text-slate-200"
                        )}>
                            {isCompleted ? <CheckCircle2 size={16} strokeWidth={3} /> :
                                isActive ? <Loader2 size={16} strokeWidth={3} className="animate-spin" /> :
                                    <div className="size-1.5 bg-slate-100" />}

                            {/* Connector indicator for active */}
                            {isActive && (
                                <div className="absolute left-full ml-4 w-8 h-[2px] bg-primary" />
                            )}
                        </div>

                        <div className="space-y-2 py-1 flex-1">
                            <div className="flex items-center gap-4">
                                <h3 className={cn(
                                    "text-sm font-black uppercase tracking-[0.2em] transition-colors",
                                    isActive ? "text-slate-950" : isCompleted ? "text-slate-600" : "text-slate-300"
                                )}>
                                    PHASE_0{index + 1}::{phase.title}
                                </h3>
                                {isActive && <span className="text-[8px] font-black text-primary animate-pulse tracking-widest bg-purple-50 px-2 py-0.5">EXE_ACTIVE</span>}
                            </div>
                            <p className={cn(
                                "text-[11px] font-bold font-mono leading-relaxed transition-colors uppercase",
                                isActive ? "text-slate-500" : "text-slate-300"
                            )}>
                                // {phase.description}
                            </p>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
