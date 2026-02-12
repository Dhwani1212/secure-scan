"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Search, Layout, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const scanTypes = [
    {
        id: "passive",
        title: "Passive Scan",
        duration: "5 min",
        icon: Search,
        description: "External inspection without active probes. Minimal footprint."
    },
    {
        id: "subdomain",
        title: "Subdomain Discovery",
        duration: "10 min",
        icon: Layout,
        description: "Deep crawl of infrastructure to find hidden assets and endpoints."
    },
    {
        id: "web-app",
        title: "Web App Scan",
        duration: "15 min",
        icon: Zap,
        description: "Active assessment for OWASP vulnerabilities (SQLi, XSS, etc.)"
    },
    {
        id: "comprehensive",
        title: "Comprehensive Scan",
        duration: "30+ min",
        icon: Shield,
        description: "Complete full-stack audit including infrastructure and logic."
    }
]

interface ScanTypeSelectorProps {
    selected: string | null
    onSelect: (id: string) => void
}

export function ScanTypeSelector({ selected, onSelect }: ScanTypeSelectorProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scanTypes.map((type) => {
                const isSelected = selected === type.id
                return (
                    <motion.div
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                            "p-10 rounded-none border transition-all cursor-pointer group relative overflow-hidden",
                            isSelected
                                ? "border-slate-950 bg-slate-50/50 shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
                                : "border-slate-200 bg-white hover:border-slate-950 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                        )}
                    >
                        {/* Selector indicator */}
                        {isSelected && (
                            <div className="absolute top-0 left-0 w-2 h-full bg-slate-950" />
                        )}

                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div className={cn(
                                "p-3 border transition-all duration-300",
                                isSelected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-950 group-hover:bg-white group-hover:text-slate-950"
                            )}>
                                <type.icon size={20} strokeWidth={2.5} />
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-[0.2em] font-mono">
                                <Clock size={10} />
                                EST::{type.duration.replace(' min', 'M')}
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-slate-950 mb-3 tracking-tighter uppercase">{type.title}</h3>
                            <p className="text-[11px] text-slate-600 font-bold font-mono leading-relaxed uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                                // {type.description}
                            </p>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
