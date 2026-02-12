"use client"

import { motion } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import { Scan } from "@/lib/api"

interface ActiveScansProps {
    scans: Scan[];
}

export function ActiveScans({ scans }: ActiveScansProps) {
    return (
        <div className="relative p-8 bg-white border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] rounded-none overflow-hidden">
            {/* Surgical Accents */}
            <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-slate-300 to-transparent" />
            <div className="absolute top-0 right-0 w-[1px] h-24 bg-gradient-to-b from-slate-300 to-transparent" />

            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-slate-900" />
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Active Assessments</h2>
                </div>
                {scans.length > 0 && (
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-900 bg-slate-100 px-3 py-1 border border-slate-200 uppercase tracking-widest">
                        <Loader2 className="size-3 animate-spin" />
                        NODE_COUNT: {scans.length.toString().padStart(2, '0')}
                    </div>
                )}
            </div>

            <div className="space-y-10">
                {scans.map((scan) => (
                    <div key={scan._id} className="group cursor-default relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-baseline gap-4">
                                <span className="text-[10px] tabular-nums font-black text-slate-400">
                                    #{scan._id.slice(-4).toUpperCase()}
                                </span>
                                <div>
                                    <p className="text-xs font-black text-slate-950 uppercase tracking-wider mb-0.5">{scan.domain}</p>
                                    <p className="text-[10px] text-slate-500 font-bold font-mono tracking-tighter">
                                        MODE::{scan.mode?.toUpperCase()} // SYS_INIT
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-slate-900 bg-slate-900 text-white px-1.5 mb-1">
                                    {scan.status === 'pending' ? 'QUEUED' : 'ACTIVE'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                                    {scan.currentModule || 'ENGINE_READY'}
                                </span>
                            </div>
                        </div>

                        {/* Sharp Linear Progress */}
                        <div className="relative h-[2px] w-full bg-slate-100 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${scan.progressPct}%` }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full bg-slate-900"
                            />
                            {/* Pulse scanning line inside progress */}
                            <motion.div
                                animate={{ x: ["0%", "100%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            />
                        </div>
                    </div>
                ))}

                {scans.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-slate-100 bg-slate-50/30">
                        <AlertCircle size={24} className="text-slate-200 mb-4" />
                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Grid_Status: Idle</p>
                        <p className="text-slate-400 text-[11px] font-medium leading-relaxed max-w-[200px]">
                            AWAITING_INPUT: START_NEW_SCAN_TO_PROCEED
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
