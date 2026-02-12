"use client"

import { motion } from "framer-motion"
import { Activity, FileText, Trash2, ShieldCheck, ShieldAlert, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { api, Scan } from "@/lib/api"

interface ScanLogItemProps {
    scan: Scan
    index: number
}

export function ScanLogItem({ scan, index }: ScanLogItemProps) {
    const isSuccess = scan.status === "completed"
    const date = new Date(scan.createdAt).toLocaleDateString()
    const time = new Date(scan.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const handleCancel = async () => {
        if (confirm("Are you sure you want to abort this assessment?")) {
            try {
                await api.stopScan(scan._id)
                // The polling in the parent will pick up the 'stopped' status
            } catch (err) {
                console.error("Failed to stop scan:", err)
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`bg-white border ${scan.status === 'stopped' ? 'border-red-100 opacity-60' : 'border-slate-200'} rounded-none p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:border-slate-950 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all group relative overflow-hidden`}
        >
            {/* Surgical Accents */}
            <div className="absolute top-0 right-0 w-16 h-[1px] bg-slate-200 group-hover:bg-slate-950 transition-colors" />
            <div className="absolute top-0 right-0 w-[1px] h-16 bg-slate-200 group-hover:bg-slate-950 transition-colors" />

            <div className="flex items-center gap-6 relative z-10">
                <div className={`p-4 border ${isSuccess ? "border-slate-950 bg-slate-950 text-white" : scan.status === 'stopped' ? 'border-red-200 bg-red-50 text-red-400' : "border-slate-200 bg-slate-50 text-slate-400 group-hover:border-slate-950 group-hover:bg-white group-hover:text-slate-950"
                    } transition-all duration-300 shadow-sm`}>
                    {isSuccess ? <ShieldCheck size={24} strokeWidth={2.5} /> : <ShieldAlert size={24} strokeWidth={2.5} />}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-black text-slate-950 tracking-tighter uppercase">{scan.domain}</h3>
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 ${isSuccess ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : scan.status === 'stopped' ? 'bg-red-50 text-red-500 border border-red-200' : "bg-slate-100 text-slate-500 border border-slate-200"
                            }`}>
                            STATUS::{isSuccess ? (scan.grade || "SECURED") : (scan.status === "failed" ? "SYS_FAILURE" : (scan.status === "pending" ? "QUEUED" : (scan.status === "stopped" ? "ABORTED" : "SCAN_ACTIVE")))}
                        </span>
                    </div>
                    {/* ... (rest of metadata stays same) */}
                    <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
                        <p className="text-[10px] font-black text-slate-400 font-mono tracking-widest uppercase">
                            UID: <span className="text-slate-950">{scan._id.slice(-12).toUpperCase()}</span>
                        </p>
                        <div className="text-[10px] font-black text-slate-400 font-mono tracking-widest uppercase flex items-center gap-2">
                            <span className="size-1 bg-primary inline-block" />
                            MODE: <span className="text-slate-950">{scan.mode?.toUpperCase()}</span>
                        </div>
                        <div className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-tighter flex items-center gap-2">
                            <Clock size={10} />
                            LOGGED::{date} @ {time}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 ml-auto lg:ml-0 relative z-10">
                <Link href={`/dashboard/status/${scan._id}`}>
                    <Button
                        variant="ghost"
                        className="h-12 px-6 rounded-none border border-slate-200 text-slate-500 hover:text-slate-950 hover:border-slate-950 transition-all font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-3 bg-white shadow-sm"
                    >
                        <Activity size={12} />
                        Live_Feed
                    </Button>
                </Link>
                {(scan.status === "completed" || scan.status === "failed") && (
                    <Link href={`/dashboard/result/${scan._id}`}>
                        <Button
                            variant="ghost"
                            className="h-12 px-6 rounded-none border border-slate-200 text-slate-500 hover:text-slate-950 hover:border-slate-950 transition-all font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-3 bg-white shadow-sm"
                        >
                            <FileText size={12} />
                            Audit_Rpt
                        </Button>
                    </Link>
                )}

                {(scan.status === 'running' || scan.status === 'pending') && (
                    <Button
                        onClick={handleCancel}
                        variant="ghost"
                        className="h-12 px-6 rounded-none border border-red-100 text-red-400 hover:text-red-600 hover:border-red-600 hover:bg-red-50 transition-all font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-3 bg-white shadow-sm"
                    >
                        <Trash2 size={12} />
                        Abort_Scan
                    </Button>
                )}

                <div className="w-px h-8 bg-slate-200 hidden sm:block" />
                <Button
                    variant="ghost"
                    className="h-12 w-12 rounded-none text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all p-0 border border-transparent hover:border-red-100"
                    title="Purge Data"
                >
                    <Trash2 size={16} />
                </Button>
            </div>
        </motion.div>
    )
}
