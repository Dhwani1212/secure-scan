"use client"

import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Scan } from "@/lib/api"

interface ScanHistoryProps {
    scans: Scan[];
}

export function ScanHistory({ scans }: ScanHistoryProps) {
    return (
        <div className="relative p-8 bg-white border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] rounded-none h-full overflow-hidden">
            {/* HUD Corner Marking */}
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
                <div className="absolute top-0 left-0 w-[1px] h-4 bg-slate-300" />
                <div className="absolute top-0 left-0 w-4 h-[1px] bg-slate-300" />
            </div>

            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-3 bg-primary" />
                    <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Log_Buffer</h2>
                </div>
                <Link href="/dashboard/history">
                    <button className="text-[9px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-all border-b border-transparent hover:border-slate-900 pb-0.5">
                        Access_Full_Log
                    </button>
                </Link>
            </div>

            <div className="space-y-2">
                {scans.map((item, index) => (
                    <Link key={item._id} href={item.status === 'completed' || item.status === 'failed' ? `/dashboard/result/${item._id}` : `/dashboard/status/${item._id}`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group flex items-center justify-between p-4 border border-slate-100 hover:border-slate-900 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer rounded-none relative overflow-hidden mb-2"
                        >
                            {/* Hover background pulse */}
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-50/50 transition-colors pointer-events-none" />

                            <div className="flex items-center gap-4 relative z-10">
                                <div className={`flex items-center justify-center p-2 rounded-none border ${item.status === "completed"
                                    ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                                    : (item.status === "failed" ? "border-red-100 bg-red-50 text-red-600" : "border-slate-100 bg-slate-50 text-slate-400")
                                    }`}>
                                    {item.status === "completed" ? <CheckCircle2 size={14} /> : (item.status === "failed" ? <XCircle size={14} /> : <Clock size={14} />)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-black text-slate-950 truncate uppercase mt-0.5 tracking-tight">
                                        {item.domain}
                                    </p>
                                    <p className="text-[9px] text-slate-500 font-bold font-mono tracking-tighter">
                                        SN::{item._id.slice(-6).toUpperCase()} // {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="flex flex-col items-end">
                                    <span className={`text-[10px] font-black uppercase tracking-tighter ${item.status === "completed" ? "text-slate-900" : "text-slate-400"
                                        }`}>
                                        {item.status === "completed" ? `GRADE::${item.grade || "A"}` : (item.status === "failed" ? "SYS_ERR" : "SCAN_ACTIVE")}
                                    </span>
                                    <div className="flex gap-0.5 mt-1">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className={`w-2 h-[2px] ${item.status === 'completed' && i <= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                                        ))}
                                    </div>
                                </div>
                                <ChevronRight className="size-3 text-slate-300 group-hover:text-slate-900 transition-colors" />
                            </div>
                        </motion.div>
                    </Link>
                ))}

                {scans.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-slate-100 bg-slate-50/20">
                        <p className="text-slate-300 text-[10px] font-black uppercase tracking-widest">NO_LOGS_DETECTED</p>
                    </div>
                )}
            </div>
        </div>
    )
}
