"use client"

import { motion } from "framer-motion"
import { Shield, Activity, BarChart3 } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { Scan } from "@/lib/api"

interface ScanStatsProps {
    scans: Scan[];
}

export function ScanStats({ scans }: ScanStatsProps) {
    const totalScans = scans.length;
    const activeScansCount = scans.filter(s => s.status === 'running' || s.status === 'pending').length;

    const completedWithScore = scans.filter(s => s.score !== undefined && s.score !== null);
    const avgScore = completedWithScore.length > 0
        ? (completedWithScore.reduce((acc, s) => acc + (s.score || 0), 0) / completedWithScore.length / 10).toFixed(1)
        : "0.0";

    const stats = [
        {
            label: "Total Assets Scanned",
            value: totalScans.toLocaleString(),
            icon: Shield,
            change: scans.length > 0 ? "STABLE" : "INIT",
            color: "text-primary"
        },
        {
            label: "Real-time Nodes",
            value: activeScansCount.toString(),
            icon: Activity,
            change: "ACTIVE",
            color: "text-emerald-600"
        },
        {
            label: "Cumulative Risk Score",
            value: avgScore,
            icon: BarChart3,
            change: "NOMINAL",
            color: "text-slate-900"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                    className="group relative p-8 bg-white border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500 rounded-none"
                >
                    {/* Surgical Corner Brackets (0px radius) */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center justify-between mb-8">
                        <div className="p-2 border border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 text-slate-500">
                            <stat.icon size={20} />
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black tracking-widest text-slate-400 mb-1">STATUS</span>
                            <span className="text-[10px] font-bold tracking-tighter bg-slate-900 text-white px-2 py-0.5">
                                {stat.change}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-slate-500 font-black text-[11px] uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary" />
                            {stat.label}
                        </p>
                        <h3 className="text-4xl font-semibold text-slate-950 tracking-tighter leading-none">{stat.value}</h3>
                    </div>

                    {/* Decorative Technical Line */}
                    <div className="mt-6 h-1 w-full bg-slate-50 relative overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 bg-slate-900"
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
