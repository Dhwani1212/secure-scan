"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { api, AssessmentResult } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft, Download, Share2, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react"
import Link from "next/link"
import { use } from "react"

export default function AssessmentResultPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [result, setResult] = useState<AssessmentResult | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const data = await api.getAssessmentDetails(id)
                setResult(data)
            } catch (error) {
                console.error("Failed to fetch assessment result", error)
            } finally {
                setLoading(false)
            }
        }
        fetchResult()
    }, [id])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 min-h-[600px]">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin mb-8" />
                <p className="text-slate-500 font-mono text-xs font-black uppercase tracking-widest">Generating_Maturity_Report...</p>
            </div>
        )
    }

    if (!result) {
        return (
            <div className="max-w-xl mx-auto py-32 text-center px-6">
                <AlertCircle className="text-red-500 mx-auto mb-6" size={48} />
                <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-4">Report_Not_Found</h2>
                <p className="text-slate-500 font-mono text-xs font-bold mb-8">
                    The requested assessment sequence could not be retrieved from the archives.
                </p>
                <Link href="/dashboard/assessments">
                    <Button variant="outline" className="border-2 border-slate-950 rounded-none font-black text-[10px] uppercase tracking-widest">
                        Return_to_Hub
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
            {/* Nav Back */}
            <Link href="/dashboard/assessments" className="flex items-center gap-2 text-slate-400 hover:text-slate-950 transition-colors mb-12">
                <ArrowLeft size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Back_to_Assessments</span>
            </Link>

            {/* Result Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-[1px] bg-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Report_Generated::{result._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter leading-none mb-10 uppercase italic">
                        Security <br />
                        <span className="text-slate-400">Maturity</span>
                    </h1>
                    <p className="text-slate-600 text-lg font-bold font-mono leading-relaxed max-w-xl">
                        Based on the 40-point assessment protocol, your infrastructure has been assigned a
                        security health score of <span className="text-slate-950 underline">{result.score}%</span>.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center p-12 bg-white border-4 border-slate-950 shadow-[16px_16px_0_rgba(0,0,0,0.05)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] grayscale pointer-events-none select-none overflow-hidden">
                        <div className="font-mono text-[8px] leading-none whitespace-pre uppercase p-2">
                            {Array(20).fill("SURGICAL_APERTURE_SECURITY_SYSTEM_V4.2 ").join("\n")}
                        </div>
                    </div>

                    <div className="relative z-10 text-center">
                        <div className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-4">Final_Grade</div>
                        <div className="text-[180px] font-black text-slate-950 leading-none tracking-tighter mb-4 animate-in fade-in zoom-in duration-700">
                            {result.grade}
                        </div>
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-100 border border-slate-200">
                            <Shield className="text-primary" size={16} />
                            <span className="text-[14px] font-black text-slate-950">{result.score}% Accuracy</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations Section */}
            <div className="mb-32">
                <h2 className="text-3xl font-black text-slate-950 tracking-tighter uppercase mb-12 border-b-2 border-slate-100 pb-8">Analysis_Remediation</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 border-2 border-slate-950 bg-white">
                        <div className="size-12 rounded-full bg-purple-50 flex items-center justify-center mb-8 border border-purple-100">
                            <CheckCircle2 className="text-primary" size={24} />
                        </div>
                        <h3 className="text-lg font-black text-slate-950 mb-4 uppercase tracking-tight">Active Strengths</h3>
                        <p className="text-slate-500 font-mono text-xs font-bold leading-relaxed italic">
                            Your security posture shows significant resilience in foundational network filtering and identity management modules.
                        </p>
                    </div>

                    <div className="p-10 border-2 border-slate-950 bg-white">
                        <div className="size-12 rounded-full bg-amber-50 flex items-center justify-center mb-8 border border-amber-100">
                            <AlertCircle className="text-amber-600" size={24} />
                        </div>
                        <h3 className="text-lg font-black text-slate-950 mb-4 uppercase tracking-tight">Identified Gaps</h3>
                        <p className="text-slate-500 font-mono text-xs font-bold leading-relaxed italic">
                            Potential vulnerabilities detected in background task monitoring and third-party dependency auditing protocols.
                        </p>
                    </div>

                    <div className="p-10 border-2 border-slate-950 bg-slate-950 text-white">
                        <div className="size-12 rounded-full bg-white/10 flex items-center justify-center mb-8">
                            <ChevronRight className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Next Sequence</h3>
                        <p className="text-slate-400 font-mono text-xs font-bold leading-relaxed italic mb-8">
                            Execute a detailed scan on your primary infrastructure to begin automated remediation.
                        </p>
                        <Link href="/dashboard/new">
                            <Button className="w-full h-12 bg-white text-slate-950 hover:bg-slate-200 rounded-none font-black text-[10px] uppercase tracking-widest">
                                Start_Scan
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-16">
                <Button className="h-14 px-10 bg-slate-950 text-white hover:bg-black rounded-none font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                    <Download size={16} />
                    Export_Maturity_PDF
                </Button>
                <Button variant="outline" className="h-14 px-10 border-2 border-slate-950 text-slate-950 hover:bg-slate-50 rounded-none font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                    <Share2 size={16} />
                    Secure_Share
                </Button>
            </div>
        </div>
    )
}
