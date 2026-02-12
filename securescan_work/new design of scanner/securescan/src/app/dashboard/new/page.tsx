"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { DomainInput } from "@/components/dashboard/domain-input"
import { ScanTypeSelector } from "@/components/dashboard/scan-type-selector"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Rocket, Loader2, Info, Activity, ShieldCheck, Database } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { useEffect } from "react"

export default function NewScanPage() {
    const [domain, setDomain] = useState("")
    const [scanType, setScanType] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const prefilledDomain = searchParams.get("domain")
        if (prefilledDomain) {
            setDomain(prefilledDomain)
        }
    }, [searchParams])

    const handleStartScan = async () => {
        if (!domain || !scanType) return;

        setLoading(true);
        setError(null);

        try {
            const mode = scanType.toLowerCase();
            await api.startScan(domain, mode);
            router.push("/dashboard");
        } catch (err: any) {
            console.error("Failed to start scan:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
            {/* Header / Breadcrumbs */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8 flex items-center justify-between"
            >
                <Link
                    href="/dashboard"
                    className="inline-flex items-center text-[10px] font-black text-slate-400 hover:text-slate-950 transition-colors group uppercase tracking-[0.2em]"
                >
                    <ArrowLeft className="mr-3 size-3 group-hover:-translate-x-1 transition-transform" />
                    Abort_Session
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest font-mono">NODE_OPERATOR::ADMIN</span>
                    <div className="size-2 bg-primary animate-pulse" />
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Main Configuration Column */}
                <div className="lg:col-span-8 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="p-12 bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-none relative overflow-hidden"
                    >
                        {/* HUD Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-slate-50 pointer-events-none" />

                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-[1px] bg-primary" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Protocol_Initiation</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter mb-8 uppercase">
                            Configuration <span className="text-slate-400">Node</span>
                        </h1>
                        <p className="text-slate-600 text-base font-bold font-mono max-w-xl leading-relaxed">
                            // DEFINE_TARGET_PARAMETERS
                            <br />
                            // CONFIGURE_ASSESSMENT_DEPTH
                        </p>
                    </motion.div>

                    <div className="space-y-16">
                        {/* Step 1: Target Domain */}
                        <section className="bg-white p-10 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-6 mb-10">
                                <span className="flex items-center justify-center size-10 border-2 border-slate-950 rounded-none text-[10px] font-black">01</span>
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-950">Target_Destination</h2>
                            </div>
                            <DomainInput value={domain} onChange={setDomain} />
                        </section>

                        {/* Step 2: Scan Type Selection */}
                        <section className="bg-white p-10 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-6 mb-10">
                                <span className="flex items-center justify-center size-10 border-2 border-slate-950 rounded-none text-[10px] font-black">02</span>
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-950">Depth_Calibration</h2>
                            </div>
                            <ScanTypeSelector selected={scanType} onSelect={setScanType} />
                        </section>
                    </div>
                </div>

                {/* Technical Sidebar / Intel Column */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="p-10 bg-white border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="flex items-center gap-4 mb-8">
                            <Info className="text-slate-950" size={18} strokeWidth={2.5} />
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-950">Guidance_Buffer</h3>
                        </div>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="shrink-0 size-1.5 bg-primary mt-1.5" />
                                <p className="text-[11px] text-slate-600 font-bold font-mono uppercase leading-relaxed">Ensure target domain is publicly accessible via port 80/443 for web app audits.</p>
                            </li>
                            <li className="flex gap-4">
                                <div className="shrink-0 size-1.5 bg-primary mt-1.5" />
                                <p className="text-[11px] text-slate-600 font-bold font-mono uppercase leading-relaxed">Comprehensive scans may take up to 45 minutes for dense infrastructure.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="p-10 border-2 border-dashed border-slate-200 bg-slate-50/50 text-center">
                        <Database className="mx-auto mb-4 text-slate-300" size={24} />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                            AWAITING_PARAMETERS::FINALIZE_STEP_01_&_02_TO_START
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-12 p-8 bg-red-50 border border-red-200 rounded-none text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-4">
                    <div className="p-2 bg-red-600 text-white">!</div>
                    ERROR_BUFFER::{error.toUpperCase().replace(/ /g, '_')}
                </div>
            )}

            {/* Action Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-16 pt-16 border-t border-slate-200 flex items-center justify-between"
            >
                <div className="hidden md:block">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] font-mono">READY_FOR_EXECUTION</p>
                </div>
                <Button
                    size="lg"
                    disabled={!domain || !scanType || loading}
                    onClick={handleStartScan}
                    className="h-20 px-16 bg-slate-950 hover:bg-black rounded-none shadow-[10px_10px_40px_rgba(0,0,0,0.15)] text-white font-black text-xs uppercase tracking-[0.3em] transition-all disabled:opacity-30 group border border-slate-800"
                >
                    {loading ? (
                        <>
                            INITIALIZING_SYSTEM...
                            <Loader2 className="ml-4 size-5 animate-spin" />
                        </>
                    ) : (
                        <>
                            Execute_Scan_Protocol
                            <Rocket className="ml-4 size-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
            </motion.div>
        </div>
    )
}
