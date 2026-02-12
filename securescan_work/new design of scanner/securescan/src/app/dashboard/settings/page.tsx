"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    Settings,
    Bell,
    Shield,
    Code,
    Monitor,
    Check,
    RotateCcw,
    Save
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { id: "general", label: "General_Engine", icon: Settings },
    { id: "notifications", label: "Alert_Protocol", icon: Bell },
    { id: "security", label: "Access_Control", icon: Shield },
    { id: "api", label: "API_Threads", icon: Code }
]

const themes = [
    { id: "light", label: "Light_Mode", desc: "Surgical clarity for daylight operations.", color: "bg-white" },
    { id: "dark", label: "Dark_Aperture", desc: "Low-light precision for deep analysis.", color: "bg-slate-950" },
    { id: "auto", label: "System_Default", desc: "Matches technical environment settings.", color: "bg-slate-400" }
]

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general")
    const [theme, setTheme] = useState("auto")

    return (
        <div className="max-w-6xl mx-auto px-6 py-32">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-slate-200 pb-16">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-[1px] bg-purple-500" />
                        <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">Audit_Log_Retrieval</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase mb-6">
                        Control <span className="text-slate-400">Center</span>
                    </h1>
                    <p className="text-slate-600 font-bold font-mono text-xs uppercase opacity-80 flex items-center gap-3">
                        <span className="text-slate-400">// CORE_ENGINE::</span> STATUS_OPTIMAL
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3">
                    <div className="space-y-4 sticky top-32">
                        {navigation.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-6 transition-all border group",
                                    activeTab === item.id
                                        ? "bg-slate-950 border-slate-950 text-white shadow-[8px_8px_0px_rgba(15,23,42,0.1)]"
                                        : "bg-white border-slate-200 text-slate-400 hover:border-slate-950 hover:text-slate-950"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                </div>
                                <div className={cn(
                                    "size-1.5 rounded-full transition-all",
                                    activeTab === item.id ? "bg-purple-400 animate-pulse" : "bg-transparent group-hover:bg-slate-200"
                                )} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-12"
                        >
                            {activeTab === "general" ? (
                                <section className="space-y-12">
                                    <div className="bg-white p-12 border border-slate-200 rounded-none relative overflow-hidden group">
                                        <div className="flex items-center gap-4 mb-10">
                                            <div className="w-6 h-[2px] bg-slate-950" />
                                            <h3 className="text-lg font-black text-primary uppercase tracking-tighter flex items-center gap-4">
                                                Visual_Interface_Protocol
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {themes.map(t => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => setTheme(t.id)}
                                                    className={cn(
                                                        "p-6 rounded-none border-2 text-left transition-all relative group h-full",
                                                        theme === t.id
                                                            ? "border-slate-950 bg-slate-50/50 shadow-[6px_6px_0px_rgba(0,0,0,0.05)]"
                                                            : "border-slate-100 hover:border-slate-200"
                                                    )}
                                                >
                                                    {theme === t.id && (
                                                        <div className="absolute top-4 right-4 text-primary">
                                                            <Check size={16} strokeWidth={3} />
                                                        </div>
                                                    )}
                                                    <div className={cn("size-12 rounded-none mb-6 border border-slate-200", t.color)} />
                                                    <p className="text-[10px] font-black text-slate-950 uppercase tracking-tighter mb-1">{t.label}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono leading-relaxed">{t.desc}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <Button className="w-full sm:w-auto h-16 px-12 bg-slate-950 hover:bg-slate-800 rounded-none shadow-[10px_10px_0px_rgba(15,23,42,0.1)] text-white font-black text-[11px] uppercase tracking-widest flex items-center gap-3 transition-all">
                                            <Save size={18} strokeWidth={2.5} /> Update_Parameters
                                        </Button>
                                        <Button variant="ghost" className="w-full sm:w-auto h-16 px-12 text-slate-400 hover:text-slate-950 font-black text-[11px] uppercase tracking-widest flex items-center gap-3 transition-all rounded-none border border-transparent hover:border-slate-100">
                                            <RotateCcw size={18} strokeWidth={2.5} /> Revert_to_Genesis
                                        </Button>
                                    </div>
                                </section>
                            ) : (
                                <div className="bg-slate-50 p-24 border border-slate-100 rounded-none border-dashed text-center">
                                    <div className="p-8 border border-slate-200 bg-white text-slate-200 rounded-none w-fit mx-auto mb-8 shadow-[10px_10px_0px_rgba(0,0,0,0.02)]">
                                        <Monitor size={48} strokeWidth={1} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-950 mb-4 uppercase tracking-tighter">Under_Maintenance</h3>
                                    <p className="text-slate-400 font-bold font-mono text-[10px] uppercase tracking-widest leading-relaxed">
                                        // EXPERIMENTAL_MODULE::{activeTab.toUpperCase()}_CONTROL
                                        <br />
                                        // RELAYING HEARTBEAT... COMPONENT CURRENTLY OFFLINE.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
