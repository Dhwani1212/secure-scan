"use client"

import { motion } from "framer-motion"
import {
    Lock,
    Globe,
    RefreshCw,
    Cpu,
    AlertOctagon,
    FileText,
    Mail,
    Server,
    LucideIcon,
    Shield
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TiltCard } from "@/components/ui/tilt-card"

interface Metric {
    name: string
    score: number
    icon: LucideIcon
    color: string
}

const metrics: Metric[] = [
    { name: "DNS Security", score: 92, icon: Globe, color: "blue" },
    { name: "Web Encryption", score: 88, icon: Lock, color: "indigo" },
    { name: "Network Security", score: 74, icon: Cpu, color: "emerald" },
    { name: "Patching Posture", score: 65, icon: RefreshCw, color: "amber" },
    { name: "Application Security", score: 95, icon: FileText, color: "violet" },
    { name: "Breach Events", score: 100, icon: AlertOctagon, color: "rose" },
    { name: "System Reputation", score: 82, icon: Shield, color: "sky" },
    { name: "Email Security", score: 71, icon: Mail, color: "blue" },
    { name: "System Hosting", score: 89, icon: Server, color: "slate" }
]


const colorMap: Record<string, { bg: string, text: string, bar: string }> = {
    blue: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    indigo: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    emerald: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    amber: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    violet: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    rose: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    sky: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
    slate: { bg: "bg-slate-50", text: "text-slate-900", bar: "bg-slate-900" },
}

import { Scan } from "@/lib/api"

interface MetricGridProps {
    scan?: Scan
}

export function MetricGrid({ scan }: MetricGridProps) {
    const results = scan?.results || {}
    const findings = scan?.findings || []

    const countHits = (keywords: string[]) =>
        findings.filter(f => new RegExp(keywords.join('|'), 'i').test(f.title || f.raw || "")).length

    const runtimeMetrics: Metric[] = [
        {
            name: "DNS Security",
            score: Math.round(Math.max(0, 10 - (results.subdomains?.length || 0) * 0.05) * 10),
            icon: Globe,
            color: "blue"
        },
        {
            name: "Web Encryption",
            score: Math.round(Math.max(0, 10 - countHits(['ssl', 'tls', 'https', 'cert']) * 1.5) * 10),
            icon: Lock,
            color: "indigo"
        },
        {
            name: "Network Security",
            score: Math.round(Math.max(0, 10 - (results.openPorts?.length || 0) * 0.5) * 10),
            icon: Cpu,
            color: "emerald"
        },
        {
            name: "Software Patching",
            score: Math.round(Math.max(0, 10 - countHits(['version', 'outdated', 'cve', 'patch']) * 2) * 10),
            icon: RefreshCw,
            color: "amber"
        },
        {
            name: "Application Security",
            score: Math.round(Math.max(0, 10 - countHits(['sql', 'xss', 'injection', 'broken', 'auth', 'csrf', 'ssrf', 'rce', 'file']) * 1.5) * 10),
            icon: FileText,
            color: "violet"
        },
        {
            name: "Breach Events",
            score: Math.round(Math.max(0, 10 - countHits(['secret', 'key', 'leak', 'exposed', 'token', 'password', 'credential']) * 2.5) * 10),
            icon: AlertOctagon,
            color: "rose"
        },
        {
            name: "System Reputation",
            score: Math.round(Math.max(0, 10 - countHits(['blacklist', 'reputation', 'malicious', 'phishing']) * 3.0) * 10),
            icon: Shield,
            color: "sky"
        },
        {
            name: "Email Security",
            score: Math.round(Math.max(0, 10 - countHits(['spf', 'dkim', 'dmarc', 'email']) * 2.0) * 10),
            icon: Mail,
            color: "blue"
        },
        {
            name: "System Hosting",
            score: Math.round(Math.max(0, 10 - countHits(['cloud', 'bucket', 'aws', 'azure', 'gcp', 's3', 'storage', 'lambda', 'instance']) * 1.0) * 10),
            icon: Server,
            color: "slate"
        }
    ]

    const displayMetrics = scan ? runtimeMetrics : metrics

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayMetrics.map((metric, index) => {
                const colors = colorMap[metric.color] || colorMap.blue
                return (
                    <TiltCard
                        key={metric.name}
                        degree={15}
                        className="h-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-6 rounded-none border border-slate-200 hover:border-slate-950 transition-all group relative overflow-hidden h-full flex flex-col"
                        >
                            {/* Surgical Accents */}
                            <div className="absolute top-0 right-0 w-6 h-[1px] bg-slate-200 group-hover:bg-slate-950 transition-colors" />
                            <div className="absolute top-0 right-0 w-[1px] h-6 bg-slate-200 group-hover:bg-slate-950 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-4 h-[1px] bg-slate-100 group-hover:bg-slate-950 transition-colors" />

                            {/* Technical Telemetry Noise */}
                            <div className="absolute top-2 left-2 flex flex-col gap-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <span className="text-[5px] font-mono text-slate-300">NODE::{(index + 1).toString().padStart(2, '0')}</span>
                            </div>

                            <div className="flex items-center justify-between mb-4 flex-1">
                                <div className={cn(
                                    "p-2 border transition-all duration-300",
                                    "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-950 group-hover:bg-white group-hover:text-slate-950 shadow-sm"
                                )}>
                                    <metric.icon size={16} strokeWidth={2.5} />
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1.5 mb-0.5">
                                        <div className={cn(
                                            "size-1 rounded-full animate-pulse",
                                            metric.score > 0 ? "bg-emerald-500" : "bg-slate-300"
                                        )} />
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 font-mono">VAL::OUT</span>
                                    </div>
                                    <span className="text-3xl lg:text-4xl font-black tracking-tighter tabular-nums text-slate-950">
                                        {metric.score}%
                                    </span>
                                </div>
                            </div>

                            <div className="mt-2">
                                <h3 className="font-black text-slate-950 uppercase tracking-wider mb-3 text-[13px]">
                                    {metric.name}
                                </h3>

                                <div className="w-full bg-slate-50 h-[2px] rounded-none overflow-hidden mb-1.5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${metric.score}%` }}
                                        transition={{ duration: 1.5, delay: 0.5 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                        className={cn(
                                            "h-full rounded-none transition-colors",
                                            metric.score >= 70 ? "bg-slate-950" : "bg-slate-300"
                                        )}
                                    />
                                </div>
                                <div className="flex justify-between text-[7px] font-black text-slate-400 uppercase tracking-widest font-mono">
                                    <span>THR</span>
                                    <span>CAL::{metric.score}/100</span>
                                </div>
                            </div>
                        </motion.div>
                    </TiltCard>
                )
            })}
        </div>
    )
}
