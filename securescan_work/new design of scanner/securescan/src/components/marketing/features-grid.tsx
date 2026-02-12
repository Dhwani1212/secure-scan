"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code2, Globe, Cpu, Zap, Database, Server, ShieldCheck } from "lucide-react"
import { Card3D } from "@/components/ui/3d-card"

export function FeaturesGrid() {
    return (
        <section className="bg-white text-slate-900 border-t border-slate-200">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="py-20 px-6 md:px-12 border-b border-slate-200">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        Features & <br /> performance
                    </motion.h2>
                </div>

                {/* Top Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* Cell 1: API */}
                    <Card3D className="border-b md:border-r border-slate-200 border-dashed h-full">
                        <div className="p-8 md:p-12 h-full">
                            <h3 className="text-lg font-semibold mb-3">API-first integration</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Easily integrate advanced malware detection and scan capabilities into any application with few lines of code.
                            </p>
                            <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100 font-mono text-xs text-slate-600">
                                <span className="text-primary">POST</span> /v1/scan/file
                            </div>
                        </div>
                    </Card3D>

                    {/* Cell 2: Multilingual (Span 2 on LG) */}
                    <Card3D className="border-b border-slate-200 lg:col-span-2 relative overflow-hidden h-full group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white/40 to-indigo-50/20 backdrop-blur-[2px] z-0" />
                        <div className="p-8 md:p-12 h-full relative z-10">
                            <div className="relative z-10 max-w-md">
                                <h3 className="text-lg font-semibold mb-3">Multi-vector analysis</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    Analyze, retrieve, and display verdict information across hundreds of file types and protocols.
                                </p>
                            </div>
                            {/* Visual Placeholder for Pills/Data */}
                            <div className="mt-8 flex flex-wrap gap-3 relative z-10">
                                {['PDF', 'EXE', 'DOCX', 'ELF', 'DYLIB', 'APK'].map(type => (
                                    <span key={type} className="px-3 py-1 rounded-xl bg-white/60 backdrop-blur-md border border-white/50 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-white hover:-translate-y-0.5">
                                        {type}
                                    </span>
                                ))}
                            </div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                                <Globe className="size-64" />
                            </div>
                        </div>
                    </Card3D>
                </div>

                {/* Middle Feature (Big ML) */}
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Abstract Visual Left */}
                    <div className="border-b md:border-r border-slate-200 p-8 md:p-12 flex items-center justify-center relative overflow-hidden h-full min-h-[400px]">
                        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
                        <div className="relative size-40 md:size-56">
                            {/* Concentric circles abstract */}
                            <div className="absolute inset-0 border border-slate-200 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-4 border border-dashed border-slate-300 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="absolute inset-12 border border-slate-100 rounded-full" />
                        </div>
                    </div>

                    {/* Main Content Right */}
                    <div className="lg:col-span-2 border-b border-slate-200 p-8 md:p-12 flex flex-col justify-center">
                        <Card3D className="h-full">
                            <div>
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Best-in-class AI</h3>
                                <p className="text-xl text-slate-500 max-w-2xl text-balance mb-8">
                                    Backed by world-class security researchers, iSecurify's ML models provide unmatched detection rates with near-zero false positives.
                                </p>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-900">
                                    {['Static Analysis', 'Behavioral Heuristics', 'Zero-day Detection', 'Generative Defense'].map(item => (
                                        <div key={item} className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
                                            {item} <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card3D>
                    </div>
                </div>

                {/* Perf Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    <Card3D className="h-full">
                        <div className="p-8 md:p-12 h-full">
                            <h4 className="font-semibold mb-2">Performance</h4>
                            <p className="text-sm text-slate-500">Ultra-fast response times with our optimized cloud infrastructure, under 100 milliseconds.</p>
                        </div>
                    </Card3D>

                    <Card3D className="h-full">
                        <div className="p-8 md:p-12 flex items-center justify-center h-full">
                            {/* Gauge visual */}
                            <div className="relative size-32">
                                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <path className="text-primary" strokeDasharray="98, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-2xl font-bold text-slate-900">98<span className="text-sm">%</span></span>
                                    <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Accuracy</span>
                                </div>
                            </div>
                        </div>
                    </Card3D>

                    <Card3D className="h-full">
                        <div className="p-8 md:p-12 h-full">
                            <h4 className="font-semibold mb-2">Hybrid Retrieval</h4>
                            <p className="text-sm text-slate-500">Leverage the best of both worlds - configure traditional signature matching with semantic behavioral search.</p>
                        </div>
                    </Card3D>
                </div>

                {/* Features Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    <div className="p-8">
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><Zap className="size-4 text-primary" /> Auto-scale features</h4>
                        <motion.div className="h-0.5 w-8 bg-purple-100 mb-4" />
                        <p className="text-sm text-slate-500 mb-4 font-mono leading-tight uppercase">// SCALE_MOD: EL_CAP_MAX</p>
                        <h4 className="font-semibold mb-2 flex items-center gap-2"><Database className="size-4 text-primary" /> Stateful analysis</h4>
                        <motion.div className="h-0.5 w-8 bg-purple-100 mb-4" />
                        <p className="text-sm text-slate-500 mb-4 font-mono leading-tight uppercase">// STATE_SYNC: 99.99%_Uptime</p>
                        <p className="text-xs text-slate-500 mt-2">Customize replication settings and dedicated nodes for resilience under peak loads.</p>
                    </div>
                </div>

                {/* Security Footer Split */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 md:p-20 flex flex-col justify-center">
                        <h3 className="text-4xl font-bold tracking-tight mb-4">Security</h3>
                        <p className="text-lg text-slate-500 leading-relaxed">
                            iSecurify is compliant with SOC 2 Type II, HIPAA, and GDPR. The platform supports OAuth 2.0, API-key authentication, and role-based access control.
                        </p>
                    </div>
                    <Card3D className="border-l border-slate-200 h-full">
                        <div className="p-8 md:p-20 flex items-center justify-center h-full">
                            <div className="relative">
                                <ShieldCheck className="size-32 text-slate-100" strokeWidth={1} />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="size-16 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xs ring-4 ring-white shadow-xl">
                                        SOC2
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm">
                                    GDPR
                                </div>
                                <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 size-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm">
                                    HIPAA
                                </div>
                            </div>
                        </div>
                    </Card3D>
                </div>
            </div>
        </section>
    )
}
