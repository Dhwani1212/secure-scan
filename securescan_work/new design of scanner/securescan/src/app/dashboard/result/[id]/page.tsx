"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { SecurityScoreCard } from "@/components/dashboard/result/security-score-card"
import { MetricGrid } from "@/components/dashboard/result/metric-grid"
import { ReportDeepDive } from "@/components/dashboard/result/report-deep-dive"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share2, Printer, Loader2, AlertCircle, Shield } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { api, Scan } from "@/lib/api"

export default function ScanResultPage() {
    const params = useParams()
    const id = params.id as string
    const [scan, setScan] = useState<Scan | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await api.getScanResults(id)
                setScan(data)
            } catch (err: any) {
                console.error("Failed to fetch scan results:", err)
                setError(err.message || "Failed to load report")
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchResults()
    }, [id])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-32">
                <Loader2 className="size-16 animate-spin text-slate-950 mb-8 stroke-[1px]" />
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] font-mono animate-pulse">
                    Synthesizing_intelligence_report...
                </p>
            </div>
        )
    }

    if (error || !scan) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-48 text-center">
                <div className="inline-flex p-6 border border-red-600 bg-red-50 text-red-600 mb-8">
                    <AlertCircle size={48} strokeWidth={1} />
                </div>
                <h1 className="text-4xl font-black text-slate-950 mb-4 uppercase tracking-tighter">Report_Not_Found</h1>
                <p className="text-slate-500 mb-12 font-bold font-mono text-xs uppercase opacity-60">
                    // ERR_CODE::404_NULL_POINTER
                    <br />
                    // {error || "The requested assessment report could not be retrieved from the intelligence buffer."}
                </p>
                <Link href="/dashboard/history">
                    <Button className="bg-slate-950 text-white rounded-none h-14 px-10 font-black text-[10px] uppercase tracking-widest border border-slate-950 hover:bg-white hover:text-slate-950 transition-all">
                        Back_to_History_Log
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
            {/* HUD Framing Decoration */}
            <div className="fixed inset-4 border border-slate-950/5 pointer-events-none hidden lg:block">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-slate-950/20" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-950/20" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-slate-950/20" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-slate-950/20" />
            </div>

            {/* Technical Toolset Bar */}
            <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-950 text-white text-[8px] font-black uppercase tracking-widest font-mono">
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    Live_Intel
                </div>
                <div className="h-3 w-[1px] bg-slate-200" />
                <div className="flex items-center gap-4">
                    <button className="text-[9px] font-bold text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-widest flex items-center gap-1.5 group">
                        <Download className="size-2.5 group-hover:-translate-y-0.5 transition-transform" />
                        Export
                    </button>
                    <button className="text-[9px] font-bold text-slate-400 hover:text-slate-950 transition-colors uppercase tracking-widest flex items-center gap-1.5 group">
                        <Share2 className="size-2.5 group-hover:-translate-y-0.5 transition-transform" />
                        Share
                    </button>
                </div>
            </div>

            {/* Main Content Stack */}
            <div className="space-y-8 mb-16">
                {/* Wide Horizon Banner Score */}
                <div className="w-full">
                    <SecurityScoreCard score={scan?.score || 0} />
                </div>

                {/* Primary Metrics Grid (Symmetric 3x3) */}
                <div className="w-full">
                    <MetricGrid scan={scan} />
                </div>
            </div>

            {/* Detailed Findings & JSON Buffer */}
            <div className="relative">
                <ReportDeepDive scan={scan} />
            </div>

            {/* Expert Reminders / Footer */}
            <div className="p-16 border-2 border-slate-950 bg-white rounded-none relative overflow-hidden group">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none font-mono text-[8px] leading-none overflow-hidden uppercase whitespace-pre p-2">
                    {Array(40).fill("SURGICAL_APERTURE_SECURITY_SYSTEM_OPTIMIZED_V4.2 ").join("\n")}
                </div>

                <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                    <div className="size-16 border border-slate-950 flex items-center justify-center mb-8 rotate-45 group-hover:rotate-180 transition-transform duration-1000">
                        <div className="-rotate-45 group-hover:-rotate-180 transition-transform duration-1000">
                            <Shield className="size-6 text-slate-950" strokeWidth={2.5} />
                        </div>
                    </div>
                    <h3 className="text-4xl font-black text-slate-950 mb-6 uppercase tracking-tighter">Deeper_Perimeter_Intelligence?</h3>
                    <p className="text-slate-600 font-bold font-mono text-xs mb-10 uppercase leading-relaxed opacity-80">
                        // Schedule a manual diagnostic walkthrough with our primary security architects.
                        <br />
                        // Build a custom remediation roadmap tailored to your specific infrastructure requirements.
                    </p>
                    <Button className="h-16 px-12 bg-slate-950 hover:bg-black text-white rounded-none font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-2xl">
                        Schedule_Advisory_Session
                    </Button>
                </div>
            </div>
        </div>
    )
}
