"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { ScanLogItem } from "@/components/dashboard/scan-log-item"
import { ArrowLeft, Search, Filter, Loader2 } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { api, Scan } from "@/lib/api"

export default function HistoryPage() {
    const [scans, setScans] = useState<Scan[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await api.getAllScans()
                setScans(data)
            } catch (error) {
                console.error("Failed to load history:", error)
            } finally {
                setLoading(false)
            }
        }
        loadHistory()
    }, [])

    const filteredHistory = useMemo(() => {
        return scans.filter(scan => {
            return scan.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                scan._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (scan.mode || "").toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [scans, searchQuery])

    return (
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
            {/* Header / Breadcrumbs */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-12 flex items-center justify-between border-b border-slate-200 pb-8"
            >
                <Link
                    href="/dashboard"
                    className="inline-flex items-center text-[10px] font-black text-slate-400 hover:text-slate-950 transition-colors group uppercase tracking-[0.2em]"
                >
                    <ArrowLeft className="mr-3 size-3 group-hover:-translate-x-1 transition-transform" />
                    Return_to_Hub
                </Link>
            </motion.div>

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-slate-200 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-[1px] bg-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Audit_Log_Retrieval</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter mb-8 uppercase">
                        Scan <span className="text-slate-400">History</span>
                    </h1>
                    <p className="text-slate-600 text-base font-bold font-mono max-w-2xl leading-relaxed">
                        // ACCESSING_DECENTRALIZED_THREAT_DATABASE
                        <br />
                        // FILTERING_HISTORICAL_ATTACK_SURFACES
                    </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative group w-full sm:w-64 border border-slate-200 hover:border-slate-950 transition-all">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-3 text-slate-400 group-focus-within:text-slate-950 transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH_INDEX..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-3 bg-white rounded-none text-[10px] font-black uppercase tracking-widest focus:outline-none w-full"
                        />
                    </div>
                </div>
            </div>


            <div className="space-y-6">
                {loading ? (
                    <div className="py-24 flex justify-center">
                        <Loader2 className="size-8 animate-spin text-slate-200" />
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredHistory.map((scan, index) => (
                            <ScanLogItem key={scan._id} scan={scan} index={index} />
                        ))}
                    </AnimatePresence>
                )}

                {!loading && filteredHistory.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-32 text-center border border-dashed border-slate-200 bg-slate-50/20"
                    >
                        <p className="text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] mb-4">NO_MATCHING_RECORDS_IDENTIFIED</p>
                        <button
                            onClick={() => { setSearchQuery(""); }}
                            className="text-[10px] font-black text-slate-400 hover:text-slate-950 border-b border-slate-400 hover:border-slate-950 pb-0.5 uppercase tracking-widest transition-all"
                        >
                            Reset_All_Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div >
    )
}
