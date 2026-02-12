"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Layout,
    Hash,
    Terminal,
    Search,
    ChevronDown,
    CheckCircle2,
    AlertCircle,
    HardDrive,
    Code2
} from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
    {
        id: "summary",
        name: "Findings Summary",
        icon: Layout,
        data: [
            { type: "Critical", count: 0, color: "bg-black" },
            { type: "High", count: 2, color: "bg-slate-700" },
            { type: "Medium", count: 5, color: "bg-slate-400" },
            { type: "Low", count: 12, color: "bg-slate-200" }
        ]
    },
    {
        id: "subdomains",
        name: "Subdomains",
        icon: Hash,
        data: ["api.isecurify.io", "auth.isecurify.io", "cdn.isecurify.io", "vpn.isecurify.io"]
    },
    {
        id: "ports",
        name: "Open Ports",
        icon: Terminal,
        data: ["80/TCP (HTTP)", "443/TCP (HTTPS)", "22/TCP (SSH - Restricted)", "5432/TCP (PostgreSQL)"]
    },
    {
        id: "hosts",
        name: "Active Hosts",
        icon: HardDrive,
        data: ["104.26.10.12 (Cloudflare)", "104.26.11.12 (Cloudflare)", "172.64.32.74 (Edge)"]
    },
    {
        id: "osint",
        name: "OSINT & Web Data",
        icon: Search,
        data: ["Leaked Credentials: 0", "GitHub References: 12", "WHOIS Privacy: Active", "S3 Buckets: Secure"]
    }
]

import { Scan } from "@/lib/api"

interface ReportDeepDiveProps {
    scan?: Scan
}

export function ReportDeepDive({ scan }: ReportDeepDiveProps) {
    const [activeTab, setActiveTab] = useState(sections[0].id)
    const [showJson, setShowJson] = useState(false)
    const results = scan?.results || {}
    const findings = scan?.findings || []

    const criticalCount = findings.filter((f: any) => f.severity === "critical").length
    const highCount = findings.filter((f: any) => f.severity === "high").length
    const mediumCount = findings.filter((f: any) => f.severity === "medium").length
    const lowCount = findings.filter((f: any) => f.severity === "low").length

    const dynamicSections = [
        {
            id: "summary",
            name: "Audit_Summary",
            icon: Layout,
            data: [
                { type: "CRITICAL", count: criticalCount, color: "bg-red-600" },
                { type: "HIGH_RISK", count: highCount, color: "bg-orange-500" },
                { type: "MEDIUM", count: mediumCount, color: "bg-slate-400" },
                { type: "LOW_INFO", count: lowCount, color: "bg-slate-200" }
            ]
        },
        {
            id: "subdomains",
            name: "SUBDOMAINS",
            icon: Hash,
            data: results.subdomains || []
        },
        {
            id: "ports",
            name: "PORT_TELEMETRY",
            icon: Terminal,
            data: results.openPorts?.map((p: any) => `${p.port}/TCP :: ${p.service?.toUpperCase() || "UNKNOWN"}`) || []
        },
        {
            id: "hosts",
            name: "HOST_INDEX",
            icon: HardDrive,
            data: results.hosts || []
        },
        {
            id: "osint",
            name: "OSINT_INTEL",
            icon: Search,
            data: [
                `TECH_VECTORS::${results.technologies?.length || 0}`,
                `OSINT_RECORDS::${results.osint?.length || 0}`,
                `WEB_ENDPOINTS::${results.webData?.length || 0}`,
                `CLOUD_HOSTING::${results.hosts?.some((h: string) => h.includes("amazon") || h.includes("google") || h.includes("azure")) ? "PROVIDER_DETECTED" : "UNIDENTIFIED"}`
            ]
        }
    ]

    const activeSection = dynamicSections.find(s => s.id === activeTab) || dynamicSections[0]

    return (
        <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
                {/* Navigation Sidebar */}
                <div className="md:col-span-4 lg:col-span-3 border-r border-slate-200 bg-slate-50/20 p-8 space-y-3 relative">
                    <div className="mb-12 relative z-10">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary block mb-3 font-mono">INTEL_NAVIGATION</span>
                        <h3 className="text-xl font-black text-slate-950 tracking-tighter uppercase">Query_Buffer</h3>
                    </div>

                    {dynamicSections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={cn(
                                "w-full flex items-center justify-between px-6 py-5 rounded-none border transition-all duration-300 font-black text-[10px] tracking-widest relative z-10 uppercase",
                                activeTab === section.id
                                    ? "bg-slate-950 text-white border-slate-950 shadow-[5px_5px_0px_rgba(0,0,0,0.1)] translate-x-1"
                                    : "text-slate-500 border-slate-200 hover:text-slate-950 hover:border-slate-950 bg-white"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <section.icon size={14} strokeWidth={2.5} />
                                {section.name}
                            </div>
                            {activeTab === section.id && <div className="size-1 bg-primary" />}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="md:col-span-8 lg:col-span-9 p-12 md:p-16 bg-white relative">
                    {/* Surgical Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-slate-50 pointer-events-none" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full flex flex-col"
                        >
                            {activeTab === "summary" ? (
                                <div className="space-y-16">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                        {activeSection.data.map((item: any) => (
                                            <div key={item.type} className="p-8 border border-slate-200 bg-white hover:border-slate-950 shadow-sm transition-colors group">
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-4 font-mono">{item.type}</span>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-4xl font-black text-slate-950 tabular-nums">{item.count}</span>
                                                    <div className={cn("size-2 transition-all group-hover:scale-125", item.color)} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-[1px] bg-slate-950" />
                                            <h4 className="text-xs font-black text-slate-950 uppercase tracking-[0.4em]">Audit_Verdict_Report</h4>
                                        </div>

                                        <div className={cn(
                                            "p-10 border-2 flex gap-10 items-start transition-all",
                                            (criticalCount > 0 || highCount > 0)
                                                ? "bg-white border-red-600 shadow-[10px_10px_0px_rgba(220,38,38,0.1)]"
                                                : "bg-white border-slate-950 shadow-[10px_10px_0px_rgba(0,0,0,0.1)]"
                                        )}>
                                            <div className={cn(
                                                "p-4 border transition-colors",
                                                (criticalCount > 0 || highCount > 0) ? "bg-red-600 border-red-600 text-white" : "bg-slate-950 border-slate-950 text-white"
                                            )}>
                                                {(criticalCount > 0 || highCount > 0)
                                                    ? <AlertCircle size={32} strokeWidth={2.5} />
                                                    : <CheckCircle2 size={32} strokeWidth={2.5} />
                                                }
                                            </div>
                                            <div>
                                                <p className={cn(
                                                    "font-black mb-4 text-2xl uppercase tracking-tighter",
                                                    (criticalCount > 0 || highCount > 0) ? "text-red-600" : "text-slate-950"
                                                )}>
                                                    {(criticalCount > 0 || highCount > 0)
                                                        ? "VULNERABILITIES_IDENTIFIED::HIGH_RISK"
                                                        : "INFRASTRUCTURE_STABLE::NOMINAL"
                                                    }
                                                </p>
                                                <p className="text-slate-600 leading-relaxed font-bold font-mono text-[11px] uppercase opacity-80">
                                                    {(criticalCount > 0 || highCount > 0)
                                                        ? `// SYSTEM_SCAN: ${criticalCount} CRITICAL, ${highCount} HIGH_LEVEL THREATS DETECTED. PERIMETER INTEGRITY COMPROMISED. IMMEDIATE REMEDIATION CALIBRATION REQUIRED.`
                                                        : "// SYSTEM_SCAN: NO CRITICAL VECTORS IDENTIFIED. INFRASTRUCTURE ALIGNED WITH ENTERPRISE SECURITY STANDARDS. PERIMETER INTEGRITY: 100%."
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-10 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-10">
                                        <div className="flex flex-col gap-2">
                                            <h4 className="text-3xl font-black text-slate-950 tracking-tighter uppercase">
                                                {activeSection.name}
                                            </h4>
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-[1px] bg-slate-200" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-mono">
                                                    COUNT::{activeSection.data.length.toString().padStart(3, '0')}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowJson(!showJson)}
                                            className={cn(
                                                "flex items-center gap-3 px-6 py-3 border font-black text-[10px] uppercase tracking-widest transition-all",
                                                showJson
                                                    ? "bg-slate-950 text-white border-slate-950"
                                                    : "bg-white text-slate-500 border-slate-200 hover:text-slate-950 hover:border-slate-950 shadow-sm"
                                            )}
                                        >
                                            <Code2 size={12} strokeWidth={2.5} />
                                            {showJson ? "Render_UI" : "Query_JSON"}
                                        </button>
                                    </div>

                                    <div className="flex-1">
                                        <AnimatePresence mode="wait">
                                            {showJson ? (
                                                <motion.div
                                                    key="json-view"
                                                    initial={{ opacity: 0, scale: 0.98 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.98 }}
                                                    className="bg-slate-50 border border-slate-200 rounded-none p-10 font-mono text-xs text-slate-950 overflow-auto max-h-[500px] shadow-inner"
                                                >
                                                    <pre className="whitespace-pre-wrap uppercase tracking-tighter">{JSON.stringify(activeSection.data, null, 4)}</pre>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="ui-view"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="grid gap-3"
                                                >
                                                    {activeSection.data.length > 0 ? (
                                                        activeSection.data.map((item: any, i: number) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.03 }}
                                                                className="flex items-center justify-between p-6 rounded-none border border-slate-100 hover:border-slate-950 transition-all bg-white group shadow-sm hover:shadow-md"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div className="size-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                    <span className="text-slate-950 font-black font-mono text-sm uppercase tracking-tighter">{item}</span>
                                                                </div>
                                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity">VERIFIED::LOD_01</span>
                                                            </motion.div>
                                                        ))
                                                    ) : (
                                                        <div className="py-24 text-center border border-dashed border-slate-200 bg-slate-50/20 shadow-inner">
                                                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">NO_DATA_BUFFERED_FOR_THIS_NODE</p>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
