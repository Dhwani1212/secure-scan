"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Globe, Lock, Search, Zap, Activity, Cpu, Database, Network } from "lucide-react"
import { cn } from "@/lib/utils"

const ScanningLine = () => (
    <motion.div
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-10 pointer-events-none"
    />
)

const BlacklistRadar = () => {
    return (
        <div className="relative size-32 rounded-full border border-purple-100/30 flex items-center justify-center overflow-hidden bg-slate-50/50">
            {/* Radar Sweep */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(168,85,247,0.2)_90deg,transparent_91deg)]"
            />
            {/* Grid Lines */}
            <div className="absolute inset-0 border border-purple-100/20 rounded-full scale-75" />
            <div className="absolute inset-0 border border-purple-100/10 rounded-full scale-50" />

            {/* Threat Dots */}
            {[
                { top: '20%', left: '70%', delay: 0.5 },
                { top: '60%', left: '30%', delay: 2.2 },
                { top: '40%', left: '40%', delay: 1.1 },
            ].map((dot, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 1.5]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: dot.delay
                    }}
                    style={{ top: dot.top, left: dot.left }}
                    className="absolute size-1.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                />
            ))}

            <Shield className="text-primary size-6 relative z-10" />
        </div>
    )
}

const DNSTree = () => {
    return (
        <div className="relative w-full h-32 flex items-center justify-center">
            <svg viewBox="0 0 200 100" className="w-full h-full">
                {/* Root to Branches */}
                <motion.path
                    d="M100 20 L60 60 M100 20 L140 60 M60 60 L40 90 M60 60 L80 90 M140 60 L120 90 M140 60 L160 90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-purple-100"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Nodes */}
                {[
                    { cx: 100, cy: 20, label: "ROOT" },
                    { cx: 60, cy: 60, label: "NS1" },
                    { cx: 140, cy: 60, label: "NS2" },
                    { cx: 40, cy: 90, label: "A" },
                    { cx: 80, cy: 90, label: "MX" },
                    { cx: 120, cy: 90, label: "TXT" },
                    { cx: 160, cy: 90, label: "AAAA" },
                ].map((node, i) => (
                    <motion.g
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                    >
                        <circle cx={node.cx} cy={node.cy} r="4" fill="#a146a1" className="shadow-lg shadow-purple-500/30" />
                        <text x={node.cx} y={node.cy - 8} fontSize="6" textAnchor="middle" fontWeight="bold" className="fill-slate-400">{node.label}</text>
                    </motion.g>
                ))}
            </svg>
        </div>
    )
}

const BentoCard = ({
    children,
    className,
    title,
    description,
    icon: Icon
}: {
    children?: React.ReactNode,
    className?: string,
    title: string,
    description: string,
    icon: any
}) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={cn(
                "relative group bg-white border border-slate-200/60 rounded-3xl p-8 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500",
                className
            )}
        >
            <ScanningLine />

            <div className="relative z-20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 rounded-xl bg-purple-50 flex items-center justify-center text-primary">
                        <Icon size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black tracking-tight text-slate-900 leading-none">{title}</h3>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{description}</p>
                    </div>
                </div>
            </div>

            <div className="relative z-20 flex-1 flex flex-col justify-center">
                {children}
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute -bottom-24 -right-24 size-48 bg-purple-500/5 blur-[100px] rounded-full group-hover:bg-purple-500/10 transition-colors" />
        </motion.div>
    )
}

export function BentoFeatures() {
    return (
        <section className="py-32 bg-[#F8F9FA] relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 mb-4"
                    >
                        <Zap size={12} className="text-primary fill-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Core Capabilities</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-[0.9] mb-6"
                    >
                        Security Architecture, <br />
                        <span className="text-primary">Reinvented.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 font-medium"
                    >
                        A comprehensive ecosystem of security tools designed for the modern decentralized infrastructure.
                        One platform, infinite visibility.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[1000px]">
                    {/* DNA Deep Dive */}
                    <BentoCard
                        title="DNS Deep-Dive"
                        description="Domain Infrastructure"
                        icon={Network}
                        className="md:col-span-2 md:row-span-1"
                    >
                        <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 mt-2">
                            <DNSTree />
                        </div>
                    </BentoCard>

                    {/* Blacklist Radar */}
                    <BentoCard
                        title="Blacklist Radar"
                        description="Threat Prevention"
                        icon={Activity}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <div className="flex justify-center py-4">
                            <BlacklistRadar />
                        </div>
                    </BentoCard>

                    {/* AI Logic Analysis */}
                    <BentoCard
                        title="AI Logic Analysis"
                        description="Heuristic Recon"
                        icon={Cpu}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <div className="space-y-3 mt-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${Math.random() * 60 + 40}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className="h-full bg-purple-500/30"
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400">{(Math.random() * 0.99).toFixed(3)}</span>
                                </div>
                            ))}
                            <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 mt-4">
                                <span className="text-[10px] font-black uppercase text-primary tracking-tighter block mb-1">Risk Score</span>
                                <span className="text-2xl font-black text-primary leading-none">0.024</span>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Database Cross-Ref */}
                    <BentoCard
                        title="Global Cross-Reference"
                        description="Unified Intelligence"
                        icon={Database}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                                    className="aspect-square rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center"
                                >
                                    <Globe size={12} className="text-purple-300" />
                                </motion.div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Smart Shield */}
                    <BentoCard
                        title="Smart Deflection"
                        description="Proactive Shield"
                        icon={Shield}
                        className="md:col-span-2 md:row-span-1"
                    >
                        <div className="relative mt-4 h-48 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-primary leading-none uppercase tracking-tighter">Verified</span>
                                    <div className="text-xs font-mono text-white/50">TLS_1.3_VERIFIED</div>
                                </div>
                                <Shield className="text-primary size-4" />
                            </div>

                            <div className="flex items-end gap-1 h-20">
                                {Array.from({ length: 40 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 2 }}
                                        animate={{ height: Math.random() * 40 + 10 }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'mirror', delay: i * 0.02 }}
                                        className="w-1 bg-emerald-500/20 rounded-full"
                                    />
                                ))}
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
                        </div>
                    </BentoCard>

                    {/* Data Sovereignty */}
                    <BentoCard
                        title="Privacy Layer"
                        description="AES Encryption"
                        icon={Lock}
                        className="md:col-span-1 md:row-span-1"
                    >
                        <div className="mt-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="relative size-32"
                            >
                                <div className="absolute inset-0 border-2 border-dashed border-purple-100 rounded-full" />
                                <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary size-8" />
                            </motion.div>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    )
}
