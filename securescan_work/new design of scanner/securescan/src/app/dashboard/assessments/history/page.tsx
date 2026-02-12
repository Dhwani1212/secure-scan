"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Clock, FileText, Loader2, Search, ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { api, AssessmentResult } from "@/lib/api"
import { Input } from "@/components/ui/input"

export default function AssessmentHistoryPage() {
    const [history, setHistory] = useState<AssessmentResult[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await api.getAssessmentHistory()
                setHistory(data)
            } catch (error) {
                console.error("Failed to fetch assessment history", error)
            } finally {
                setLoading(false)
            }
        }
        fetchHistory()
    }, [])

    const filteredHistory = history.filter(item =>
        item.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item._id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center min-h-[600px]">
                <Loader2 className="animate-spin text-primary mb-8" size={48} />
                <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em]">Deciphering_Security_Archives...</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 border-b border-slate-200 pb-16">
                <div>
                    <Link href="/dashboard/assessments" className="flex items-center gap-2 text-slate-400 hover:text-slate-950 transition-colors mb-8 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Return_to_Hub</span>
                    </Link>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-slate-950 flex items-center justify-center text-white">
                            <Shield size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Archive_Protocol::Security_Maturity</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-none italic">
                        Assessment <br />
                        <span className="text-primary font-bold">Protocol Archive</span>
                    </h1>
                </div>

                <div className="relative max-w-md w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input
                        placeholder="SEARCH_BY_SEQUENCE_OR_GRADE..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="h-16 pl-14 bg-white border-2 border-slate-950 rounded-none font-mono text-xs font-bold uppercase tracking-tight shadow-sm focus-visible:ring-0 focus-visible:border-primary"
                    />
                </div>
            </div>

            {/* List */}
            {filteredHistory.length === 0 ? (
                <div className="p-32 border-2 border-dashed border-slate-200 text-center">
                    <Search className="text-slate-300 mx-auto mb-8" size={64} />
                    <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-4">No_Records_Extracted</h3>
                    <p className="text-slate-500 font-mono text-xs font-bold leading-relaxed">
                        The requested search parameters yielded zero historical data points.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {filteredHistory.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-white p-10 border-2 border-slate-100 hover:border-slate-950 transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-[4px_4px_0_rgba(0,0,0,0.02)] hover:shadow-[12px_12px_0_rgba(0,0,0,0.05)]"
                        >
                            <div className="flex items-center gap-10">
                                <div className="text-center">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Grade</div>
                                    <div className="w-20 h-20 flex items-center justify-center border-4 border-slate-950 font-black text-4xl text-slate-950 italic">
                                        {item.grade}
                                    </div>
                                </div>
                                <div className="h-20 w-px bg-slate-100 hidden lg:block" />
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <h4 className="text-2xl font-black text-slate-950 uppercase tracking-tighter">Sequence_{item._id.slice(-8).toUpperCase()}</h4>
                                        <div className="px-3 py-1 bg-purple-50 text-primary border border-purple-100 text-[10px] font-black uppercase tracking-widest">
                                            Verified_Data
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-6 text-slate-400 text-[11px] font-black font-mono">
                                        <span className="flex items-center gap-2 uppercase">
                                            <Shield size={14} className="text-primary" />
                                            Fidelity: {item.score}%
                                        </span>
                                        <span className="flex items-center gap-2 uppercase">
                                            <Clock size={14} />
                                            Compiled: {new Date(item.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 lg:border-l lg:border-slate-100 lg:pl-10">
                                <Link href={`/dashboard/assessments/result/${item._id}`}>
                                    <Button className="h-16 px-12 bg-slate-950 text-white hover:bg-black rounded-none font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all border border-slate-800 shadow-xl shadow-slate-200/50">
                                        <FileText size={18} />
                                        Access_Full_Audit
                                    </Button>
                                </Link>
                                <Button variant="outline" className="h-16 w-16 border-2 border-slate-100 text-slate-400 hover:text-slate-950 hover:border-slate-950 transition-all rounded-none bg-white">
                                    <ChevronRight size={24} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Pagination / Footer */}
            <div className="mt-24 pt-12 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Showing {filteredHistory.length} of {history.length} security events
                </div>
                <div className="flex items-center gap-4">
                    <span className="p-2 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">Archive_System_V4.0.2</span>
                </div>
            </div>
        </div>
    )
}
