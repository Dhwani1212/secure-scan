"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Bot,
    ShieldCheck,
    Activity,
    Settings,
    Search,
    MoreHorizontal,
    Plus,
    Command,
    Globe,
    Lock
} from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
    { id: "agents", label: "Active Agents", icon: Bot },
    { id: "security", label: "Security Policies", icon: ShieldCheck },
    { id: "logs", label: "Audit Logs", icon: Activity },
]

const agents = [
    { name: "Customer Support L1", status: "online", uptime: "99.9%", loads: "Low" },
    { name: "Data Sanitizer Bot", status: "processing", uptime: "99.9%", loads: "High" },
    { name: "Payment Guard", status: "online", uptime: "100%", loads: "Medium" },
    { name: "Outbound Sales SDR", status: "idle", uptime: "98.5%", loads: "None" },
]

export function ProductPreview() {
    const [activeTab, setActiveTab] = useState("agents")

    return (
        <section className="py-20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Mission control for your AI workforce
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        A unified interface to manage lifecycle, permissions, and performance of every agent in your organization.
                    </p>
                </div>

                {/* Dashboard Frame */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 max-w-5xl mx-auto overflow-hidden"
                >
                    {/* Mac-style header */}
                    <div className="h-10 border-b border-slate-100 bg-slate-50/50 flex items-center px-4 justify-between">
                        <div className="flex gap-1.5">
                            <div className="size-3 rounded-full bg-red-400/20 border border-red-400/50" />
                            <div className="size-3 rounded-full bg-amber-400/20 border border-amber-400/50" />
                            <div className="size-3 rounded-full bg-green-400/20 border border-green-400/50" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-slate-200 shadow-sm text-xs text-slate-500 font-medium">
                            <Lock className="size-3" />
                            securescan.app
                        </div>
                        <div />
                    </div>

                    <div className="flex h-[500px]">
                        {/* Sidebar */}
                        <div className="w-64 border-r border-slate-100 bg-slate-50/30 p-4 hidden md:flex flex-col gap-1">
                            <div className="flex items-center gap-2 px-2 py-3 mb-4">
                                <div className="size-6 bg-primary rounded-md" />
                                <span className="font-semibold text-slate-900 text-sm">SecureScan Workspace</span>
                            </div>

                            <div className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                            activeTab === tab.id
                                                ? "bg-white text-primary shadow-sm border border-slate-200/60"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        )}
                                    >
                                        <tab.icon className="size-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors">
                                    <Settings className="size-4" />
                                    Settings
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col min-w-0 bg-white">
                            {/* Toolbar */}
                            <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6">
                                <div className="font-semibold text-slate-900 capitalize">
                                    {tabs.find(t => t.id === activeTab)?.label}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="h-8 w-48 pl-9 pr-3 rounded-md bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>
                                    <button className="h-8 px-3 bg-slate-900 text-white text-xs font-medium rounded-md flex items-center gap-1.5 hover:bg-slate-800 transition-colors">
                                        <Plus className="size-3.5" />
                                        New Agent
                                    </button>
                                </div>
                            </div>

                            {/* View Content */}
                            <div className="flex-1 p-6 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {activeTab === "agents" ? (
                                        <motion.div
                                            key="agents"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="h-full"
                                        >
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-slate-100">
                                                        <th className="text-left text-xs font-medium text-slate-500 pb-3 pl-2">Agent Name</th>
                                                        <th className="text-left text-xs font-medium text-slate-500 pb-3">Status</th>
                                                        <th className="text-left text-xs font-medium text-slate-500 pb-3">Uptime</th>
                                                        <th className="text-left text-xs font-medium text-slate-500 pb-3">Load</th>
                                                        <th className="w-8 pb-3"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {agents.map((agent, i) => (
                                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                                            <td className="py-3 pl-2">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                                        <Bot className="size-4" />
                                                                    </div>
                                                                    <span className="text-sm font-medium text-slate-900">{agent.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3">
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className={cn(
                                                                        "size-1.5 rounded-full",
                                                                        agent.status === 'online' ? "bg-emerald-500" :
                                                                            agent.status === 'processing' ? "bg-amber-500 animate-pulse" : "bg-slate-300"
                                                                    )} />
                                                                    <span className="text-xs text-slate-600 capitalize">{agent.status}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 text-sm text-slate-600 font-mono">{agent.uptime}</td>
                                                            <td className="py-3 text-sm text-slate-600">{agent.loads}</td>
                                                            <td className="py-3">
                                                                <button className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-600">
                                                                    <MoreHorizontal className="size-4" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="other"
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="h-full flex flex-col items-center justify-center text-slate-400"
                                        >
                                            <Lock className="size-10 mb-3 opacity-20" />
                                            <p>Restricted Access Area</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
