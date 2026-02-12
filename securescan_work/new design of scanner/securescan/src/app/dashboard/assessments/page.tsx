"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { Button } from "@/components/ui/button"
import {
    ShieldCheck,
    Map,
    Search,
    Zap,
    ArrowRight,
    ChevronRight,
    Globe,
    Database,
    Lock
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { RecentAssessments } from "@/components/dashboard/assessments/recent-assessments"

const features = [
    {
        icon: Map,
        title: "Perimeter Mapping",
        description: "Our autonomous agents perform deep discovery of subdomains, hidden assets, and exposed infrastructure to build a complete visual map of your attack surface.",
        color: "blue"
    },
    {
        icon: Search,
        title: "Intelligence Gathering",
        description: "We leverage OSINT techniques and specialized web crawlers to identify leaked credentials, sensitive metadata, and leaked repository references.",
        color: "indigo"
    },
    {
        icon: Zap,
        title: "Attack Simulation",
        description: "Safe, non-destructive testing of common vulnerabilities (E.g. SQLi, XSS, Broken Auth) using high-fidelity agents that mimic real-world adversary behavior.",
        color: "emerald"
    }
]


const colorMap: Record<string, { bg: string, text: string, shadow: string }> = {
    blue: { bg: "bg-slate-100", text: "text-slate-900", shadow: "shadow-slate-100" },
    indigo: { bg: "bg-slate-100", text: "text-slate-900", shadow: "shadow-slate-100" },
    emerald: { bg: "bg-slate-100", text: "text-slate-900", shadow: "shadow-slate-100" },
}

export default function AssessmentsHubPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
            {/* Header Section */}
            <div className="max-w-4xl mb-32 border-b border-slate-200 pb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-[1px] bg-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">SecureScan_Intelligence_Unit</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter leading-none mb-10 uppercase">
                        Autonomous <br />
                        <span className="text-slate-400">Assessments</span>
                    </h1>
                    <p className="text-slate-600 text-lg font-bold font-mono leading-relaxed mb-12 max-w-2xl">
                        // ENGINE::DEEP_DISCOVERY_ACTIVE
                        <br />
                        // TARGETING::MULTI_LAYER_INFRASTRUCTURE
                        <br />
                        // GOAL::PRE_EMPTIVE_ADVERSARY_MIMICRY
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <Link href="/dashboard/assessments/new">
                            <Button size="lg" className="h-16 px-12 bg-slate-950 hover:bg-black rounded-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-white font-black text-[11px] uppercase tracking-widest transition-all group border border-slate-800">
                                Launch_Protocol
                                <ArrowRight className="ml-4 size-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="h-16 px-10 border-slate-200 text-slate-500 hover:text-slate-950 hover:border-slate-950 rounded-none font-black text-[11px] uppercase tracking-widest transition-all bg-white shadow-sm">
                            Methodology_Log
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
                {features.map((feature, index) => {
                    return (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-12 bg-white border border-slate-200 hover:border-slate-950 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all rounded-none overflow-hidden"
                        >
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="p-3 border border-slate-200 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white inline-block mb-10 transition-all duration-500 text-slate-400">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-950 mb-4 tracking-tighter uppercase">{feature.title}</h3>
                            <p className="text-slate-600 font-mono text-xs leading-relaxed font-bold">
                                {feature.description}
                            </p>
                        </motion.div>
                    )
                })}
            </div>


            {/* History Section */}
            <RecentAssessments />

            {/* Technical Stack / Assurance */}
            <div className="bg-white border border-slate-200 rounded-none p-16 md:p-24 relative overflow-hidden text-left shadow-[0_8px_30px_rgb(0,0,0,0.06)] mt-32">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <div className="absolute inset-0 border-t-8 border-r-8 border-slate-900" />
                </div>

                <div className="relative z-10 max-w-3xl">
                    <h2 className="text-4xl font-black text-slate-950 mb-8 tracking-tighter uppercase">Enterprise_Grade Assurance</h2>
                    <p className="text-slate-600 font-mono text-base font-bold leading-relaxed mb-16">
                        // SECURE_SCAN_CORE_VER::4.0.2
                        <br />
                        // OUR_AUTONOMOUS_ENGINE_UTILIZES_BEHAVIORAL_SIGNATURES_AND_PRECISE_ANALYSIS_MODES
                    // TO_PROVIDE_HIGH_FIDELITY_DATA_ON_CLOUD_INFRASTRUCTURE.
                    </p>
                    <div className="flex flex-wrap items-center gap-12 grayscale">
                        <Globe size={24} className="text-slate-400" />
                        <Database size={24} className="text-slate-400" />
                        <ShieldCheck size={24} className="text-slate-500" />
                        <Lock size={24} className="text-slate-500" />
                        <div className="h-px w-20 bg-slate-200" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aura_System_Ready</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
