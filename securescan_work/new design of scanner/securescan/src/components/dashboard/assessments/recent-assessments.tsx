"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Clock, ChevronRight, FileText, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { api, AssessmentResult } from "@/lib/api"

export function RecentAssessments() {
    const [history, setHistory] = useState<AssessmentResult[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await api.getAssessmentHistory()
                setHistory(data.slice(0, 5)) // Show only top 5 in "Recent"
            } catch (error) {
                console.error("Failed to fetch assessment history", error)
            } finally {
                setLoading(false)
            }
        }
        fetchHistory()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-none">
                <Loader2 className="animate-spin text-primary mb-4" size={24} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Retaining_Recent_Logs...</p>
            </div>
        )
    }

    if (history.length === 0) {
        return (
            <section className="mb-32">
                <div className="flex items-center justify-between mb-12 border-b border-slate-200 pb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-950 tracking-tighter uppercase">Recent History</h2>
                        <p className="text-slate-500 font-mono text-xs font-bold leading-relaxed mt-2">// NO_ACTIVE_SEQUENCES_DETECTED</p>
                    </div>
                </div>
                <div className="p-16 border-2 border-dashed border-slate-200 text-center">
                    <AlertCircle className="text-slate-300 mx-auto mb-4" size={32} />
                    <p className="text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest">
                        Ready for first maturity audit
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="mb-32">
            <div className="flex items-center justify-between mb-12 border-b border-slate-200 pb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-950 tracking-tighter uppercase">Recent_Sequences</h2>
                    <p className="text-slate-500 font-mono text-xs font-bold leading-relaxed mt-2">// DIRECT_ARCHIVE_ACCESS::TOP_05_ENTRIES</p>
                </div>
                <Link href="/dashboard/assessments/history">
                    <Button variant="outline" className="rounded-none border-2 border-slate-950 h-12 px-8 text-slate-950 hover:bg-slate-950 hover:text-white shadow-sm font-black text-[10px] uppercase tracking-widest transition-all">
                        View_All_Archive
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {history.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white p-8 border border-slate-200 hover:border-slate-950 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all group flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex items-center gap-8">
                            <div className="w-16 h-16 flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-900 font-black text-xl tracking-tighter">
                                {item.grade}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-black text-slate-950 uppercase tracking-tight italic">
                                        Sequence_{item._id.slice(-6).toUpperCase()}
                                    </h4>
                                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-950 text-white">
                                        Active_Report
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black font-mono">
                                    <span className="flex items-center gap-1.5 uppercase"><Shield size={12} className="text-primary" />{item.score}% Fidelity</span>
                                    <span className="h-3 w-px bg-slate-200" />
                                    <span className="flex items-center gap-1.5 uppercase"><Clock size={12} />{new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link href={`/dashboard/assessments/result/${item._id}`}>
                                <Button variant="outline" className="h-12 px-8 border-2 border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2 rounded-none">
                                    <FileText size={16} />
                                    Inspect_Report
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
