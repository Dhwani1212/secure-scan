"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { ProgressVisualizer } from "@/components/dashboard/progress-visualizer"
import { StatusTimeline } from "@/components/dashboard/status-timeline"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Globe, ExternalLink, AlertTriangle, Loader2, Activity, Cpu } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { api, Scan } from "@/lib/api"

export default function ScanStatusPage() {
    const params = useParams()
    const id = params.id as string
    const [scan, setScan] = useState<Scan | null>(null)
    const [loading, setLoading] = useState(true)
    const [telemetryLogs, setTelemetryLogs] = useState<{ timestamp: string; message: string; type: string }[]>([])

    // Derived values
    const progress = scan?.progressPct || 0
    const phaseIndex = progress < 25 ? 0 : progress < 50 ? 1 : progress < 75 ? 2 : 3

    useEffect(() => {
        const fetchScan = async () => {
            try {
                const data = await api.getScanStatus(id)
                setScan(data)

                // Synthesize telemetry based on progress
                const newLogs = [
                    { timestamp: "00:00:01", message: "NODE_INITIALIZATION_SUCCESSFUL", type: "info" },
                ]

                if (data.progressPct > 10) newLogs.push({ timestamp: "00:00:05", message: "TARGET_HANDSHAKE_ESTABLISHED", type: "info" })
                if (data.progressPct > 25) newLogs.push({ timestamp: "00:00:12", message: "PORT_SCAN_SEQUENCE_STARTED", type: "info" })
                if (data.progressPct > 40) newLogs.push({ timestamp: "00:01:45", message: "SSL_CERTIFICATE_VALIDATION_ACTIVE", type: "info" })
                if (data.progressPct > 60) newLogs.push({ timestamp: "00:02:10", message: "VULN_DB_LOOKUP_NOMINAL", type: "info" })
                if (data.progressPct > 80) newLogs.push({ timestamp: "00:03:33", message: "FINALIZING_AUDIT_LOG_BUFFER", type: "info" })
                if (data.status === 'completed') newLogs.push({ timestamp: "SEC_FINAL", message: "SESSION_CONCLUDED_REPORT_GENERATED", type: "info" })
                if (data.status === 'failed') newLogs.push({ timestamp: "ERR_ABORT", message: `SCAN_FAILED: ${data.error || 'UNKNOWN_EXCEPTION'}`, type: "error" })

                setTelemetryLogs(newLogs.reverse())
            } catch (err) {
                console.error("Failed to fetch scan status:", err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchScan()
            const interval = setInterval(() => {
                fetchScan()
            }, 3000)

            // Stop polling if scan is terminal
            if (scan?.status === 'completed' || scan?.status === 'failed') {
                clearInterval(interval)
            }

            return () => clearInterval(interval)
        }
    }, [id, scan?.status])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-32">
                <Loader2 className="size-16 animate-spin text-slate-950 mb-8 stroke-[1px]" />
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] font-mono animate-pulse">
                    Synchronizing_node_telemetry...
                </p>
            </div>
        )
    }

    const handleAbort = async () => {
        if (confirm("Are you sure you want to abort this assessment?")) {
            try {
                await api.stopScan(id)
                // Polling will handle redirect or status update
            } catch (err) {
                console.error("Failed to abort scan:", err)
            }
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
            {/* HUD Navigation / Context Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 border-b border-slate-100 pb-12">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    {(scan?.status === 'running' || scan?.status === 'pending') ? (
                        <button
                            onClick={handleAbort}
                            className="inline-flex items-center text-[10px] font-black text-red-400 hover:text-red-600 transition-colors group uppercase tracking-widest font-mono mb-6"
                        >
                            <AlertTriangle className="mr-3 size-4 group-hover:scale-110 transition-transform" />
                            Terminate_Assessment_Node
                        </button>
                    ) : (
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center text-[10px] font-black text-slate-400 hover:text-slate-950 transition-colors group uppercase tracking-widest font-mono mb-6"
                        >
                            <ArrowLeft className="mr-3 size-4 group-hover:-translate-x-1 transition-transform" />
                            Return_to_Operational_Hub
                        </Link>
                    )}
                    <div className="flex items-center gap-6">
                        <div className="size-16 border border-slate-200 bg-white flex items-center justify-center p-4">
                            <Activity className="size-8 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Live_Assessment_Node</span>
                                <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase mb-1">
                                {scan?.domain || "AWAITING_DOMAIN"}
                            </h1>
                            <div className="flex items-center gap-4 text-[10px] font-bold font-mono text-slate-400">
                                <span>UID::{id.slice(-12).toUpperCase()}</span>
                                <span className="size-1 bg-slate-200" />
                                <span className="text-slate-900 font-black">MODE::{scan?.mode?.toUpperCase() || "STANDARD"}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="hidden lg:flex items-center gap-12 text-right">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Threat_Vanguard</p>
                        <p className="text-2xl font-black text-slate-950 tabular-nums tracking-tighter">00</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Node_Latency</p>
                        <p className="text-2xl font-black text-slate-950 tabular-nums tracking-tighter">42ms</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Packet_Flow</p>
                        <p className="text-2xl font-black text-primary tabular-nums tracking-tighter">NOMINAL</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-12">
                {/* Phase Execution List */}
                <div className="lg:col-span-4 bg-white/50 backdrop-blur-sm border border-slate-200 p-10 shadow-sm relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-[1px] bg-slate-200 group-hover:bg-primary transition-colors duration-500" />
                    <div className="absolute top-0 right-0 w-[1px] h-16 bg-slate-200 group-hover:bg-primary transition-colors duration-500" />

                    <div className="mb-12 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1 h-3 bg-slate-950" />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-950">Phase_Execution</h3>
                            </div>
                            <p className="text-slate-400 font-mono text-[9px] font-bold uppercase tracking-widest">
                                // STEP_BY_STEP_DIAGNOSTICS
                            </p>
                        </div>
                        <Cpu className="size-4 text-slate-200" />
                    </div>
                    <StatusTimeline currentPhaseIndex={phaseIndex} />
                </div>

                {/* Progress Visualizer Focus */}
                <div className="lg:col-span-8 bg-white border border-slate-200 p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center relative min-h-[500px] overflow-hidden group">
                    {/* Kinetic Corner Markings */}
                    <div className="absolute top-8 left-8 size-12 border-t border-l border-slate-200 group-hover:border-primary transition-colors" />
                    <div className="absolute top-8 right-8 size-12 border-t border-r border-slate-200 group-hover:border-primary transition-colors" />
                    <div className="absolute bottom-8 left-8 size-12 border-b border-l border-slate-200 group-hover:border-primary transition-colors" />
                    <div className="absolute bottom-8 right-8 size-12 border-b border-r border-slate-200 group-hover:border-primary transition-colors" />

                    <div className="relative z-10 text-center w-full">
                        <ProgressVisualizer progress={progress} status={scan?.status || 'initializing'} />
                    </div>

                    {/* HUD Metadata Overlay */}
                    <div className="absolute bottom-12 inset-x-12 flex justify-between items-end border-t border-slate-100 pt-8 opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="space-y-1">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Symmetry_Coefficient</p>
                            <p className="text-[10px] font-black text-slate-950 font-mono tracking-tighter">0.99984323</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Signal_Lock</p>
                            <p className="text-[10px] font-black text-emerald-500 font-mono tracking-tighter">ESTABLISHED</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Node Telemetry Terminal */}
            <div className="bg-slate-950 border border-slate-800 p-10 rounded-none shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 size-48 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-colors" />

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/5 pb-8">
                    <div className="flex items-center gap-6">
                        <div className="size-12 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-primary group-hover:border-primary transition-colors">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">Node_Telemetry_Log</h3>
                            <p className="text-white/30 font-mono text-[9px] font-bold uppercase tracking-[0.3em]">
                                // ENCRYPTED_STREAM_V4.0 // RECV_BUFFER_NOMINAL
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[9px] font-black text-white/40 font-mono uppercase tracking-widest">Buffer_Integrity</span>
                            <span className="text-[10px] font-bold text-emerald-400 font-mono tracking-tighter">100.0%_SECURE</span>
                        </div>
                        <div className="w-px h-8 bg-white/5 mx-2 hidden md:block" />
                        <span className="text-[10px] font-black text-white bg-primary px-3 py-1 uppercase tracking-widest">Live_Feed</span>
                    </div>
                </div>

                <div className="space-y-4 font-mono text-[11px] uppercase tracking-tighter max-h-72 overflow-y-auto pr-6 custom-scrollbar scroll-smooth">
                    {telemetryLogs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-6 group/line hover:bg-white/5 p-1 transition-colors"
                        >
                            <span className={`shrink-0 font-black ${log.type === 'error' ? 'text-red-500' : 'text-primary'}`}>
                                [{log.timestamp}]
                            </span>
                            <span className="text-white/20 font-black shrink-0">::</span>
                            <span className={`font-bold flex-1 ${log.type === 'error' ? 'text-red-400' : 'text-white/70 group-hover/line:text-white'}`}>
                                {log.message}
                            </span>
                            <span className="text-white/10 tabular-nums shrink-0 hidden md:block">0x{Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}</span>
                        </motion.div>
                    ))}
                    {telemetryLogs.length === 0 && (
                        <div className="py-8 text-center text-white/20 italic animate-pulse">
                            AWAITING_SIGNAL_HANDSHAKE...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
