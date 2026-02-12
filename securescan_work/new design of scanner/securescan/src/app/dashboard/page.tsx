"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { api, Scan } from "@/lib/api"
import { ScanStats } from "@/components/dashboard/scan-stats"
import { ActiveScans } from "@/components/dashboard/active-scans"
import { ScanHistory } from "@/components/dashboard/scan-history"
import { NewScanTrigger } from "@/components/dashboard/new-scan-trigger"

export default function DashboardPage() {
    const [scans, setScans] = useState<Scan[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadScans = async () => {
            try {
                const data = await api.getAllScans()
                setScans(data)
            } catch (error) {
                console.error("Dashboard data fetch failed:", error)
            } finally {
                setLoading(false)
            }
        }

        loadScans()
        const interval = setInterval(loadScans, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-100 pb-12"
            >
                <div className="max-w-3xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-[1px] bg-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">SecureScan_Dashboard_v4.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter mb-6 uppercase">
                        Operational <span className="text-slate-500">Hub</span>
                    </h1>
                    <p className="text-slate-600 text-base font-bold font-mono leading-relaxed max-w-xl">
                        // MONITOR_INFRASTRUCTURE: STANDBY
                        <br />
                        // ANALYZE_VULNERABILITIES: IN_PROGRESS
                        <br />
                        // SYSTEM_STATUS: NOMINAL
                    </p>
                </div>
                <NewScanTrigger />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Active Scans */}
                <div className="lg:col-span-2 space-y-8">
                    <ScanStats scans={scans} />
                    <ActiveScans scans={scans.filter(s => s.status === 'running' || s.status === 'pending')} />
                </div>

                {/* Right Column: History */}
                <div className="lg:col-span-1">
                    <ScanHistory scans={scans.filter(s => s.status === 'completed' || s.status === 'failed').slice(0, 5)} />
                </div>
            </div>
        </div>
    )
}
