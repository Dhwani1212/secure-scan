"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    User,
    Shield,
    CreditCard,
    Building,
    Lock,
    Key,
    Fingerprint,
    Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
    { id: "account", label: "Account_Intel", icon: User },
    { id: "security", label: "Security_Protocol", icon: Shield },
    { id: "subscription", label: "Subscription_Tier", icon: CreditCard }
]

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("account")

    return (
        <div className="max-w-6xl mx-auto px-6 py-32">
            {/* Profile Header */}
            <header className="mb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-slate-200 pb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-[1px] bg-primary" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Operator_Credentials_v4.2</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-slate-950 tracking-tighter uppercase mb-6">
                            Identity <span className="text-slate-400">Profile</span>
                        </h1>
                        <p className="text-slate-600 font-bold font-mono text-xs uppercase opacity-80 flex items-center gap-3">
                            <span className="text-slate-400">// ACCESS_REV::</span> TIER_3_ADMINISTRATOR
                        </p>
                    </div>

                    <div className="flex items-center gap-2 p-1 bg-slate-100 border border-slate-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all",
                                    activeTab === tab.id
                                        ? "bg-white text-slate-950 shadow-sm border border-slate-200"
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Tab content */}
            <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === "account" && <AccountTab />}
                        {activeTab === "security" && <SecurityTab />}
                        {activeTab === "subscription" && <SubscriptionTab />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

function AccountTab() {
    const [editing, setEditing] = useState(false)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
                <div className="bg-white p-12 border border-slate-200 rounded-none relative overflow-hidden group hover:border-slate-950 transition-colors">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-6 h-[2px] bg-slate-950" />
                        <h3 className="text-lg font-black text-slate-950 uppercase tracking-tighter flex items-center gap-4">
                            <User size={20} strokeWidth={2.5} /> Identity_Parameters
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full_Name_Descriptor</label>
                            <input
                                type="text"
                                disabled={!editing}
                                defaultValue="Bhuvaneshwaran"
                                className="w-full h-16 px-6 bg-slate-50 border border-slate-200 focus:border-slate-950 focus:outline-none transition-all font-mono font-bold text-slate-950 disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital_Mailing_Address</label>
                            <input
                                type="email"
                                disabled={!editing}
                                defaultValue="bhuvan@isecurify.io"
                                className="w-full h-16 px-6 bg-slate-50 border border-slate-200 focus:border-slate-950 focus:outline-none transition-all font-mono font-bold text-slate-950 disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-200 mt-12">
                        <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter mb-8 italic">Organizational_Meta</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entity_Affiliation</label>
                                <input
                                    type="text"
                                    disabled={!editing}
                                    defaultValue="ISecurify Networks"
                                    className="w-full h-16 px-6 bg-slate-50 border border-slate-200 focus:border-slate-950 focus:outline-none transition-all font-mono font-bold text-slate-950 disabled:opacity-50"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary_Role_ID</label>
                                <input
                                    type="text"
                                    disabled={!editing}
                                    defaultValue="Lead Security Architect"
                                    className="w-full h-16 px-6 bg-slate-50 border border-slate-200 focus:border-slate-950 focus:outline-none transition-all font-mono font-bold text-slate-950 disabled:opacity-50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex gap-4">
                        <Button
                            onClick={() => setEditing(!editing)}
                            className="h-14 px-10 rounded-none bg-slate-950 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest shadow-[8px_8px_0px_rgba(0,0,0,0.1)] transition-all"
                        >
                            {editing ? "Save_Changes" : "Edit_Metadata"}
                        </Button>
                        {editing && (
                            <Button
                                variant="outline"
                                onClick={() => setEditing(false)}
                                className="h-14 px-10 rounded-none border-slate-200 text-slate-950 hover:border-slate-950 font-black text-[10px] uppercase tracking-widest transition-all"
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </div>

                <div className="bg-white p-12 border border-slate-200 rounded-none relative overflow-hidden group hover:border-slate-950 transition-colors">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-6 h-[2px] bg-slate-950" />
                        <h3 className="text-lg font-black text-slate-950 uppercase tracking-tighter flex items-center gap-4">
                            <Building size={20} strokeWidth={2.5} /> Organization_Protocol
                        </h3>
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-mono">PARENT_ENTITY</label>
                        <input type="text" readOnly defaultValue="iSecurify Autonomous Inc." className="w-full h-14 px-5 rounded-none border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-950 outline-none transition-all text-xs font-bold font-mono uppercase" />
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="bg-slate-950 p-10 rounded-none relative overflow-hidden group border border-slate-800 shadow-[12px_12px_0px_rgba(30,58,138,0.2)]">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Fingerprint className="text-primary" size={24} />
                            <h4 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Identity_Verified</h4>
                        </div>
                        <p className="text-white/40 text-[11px] font-bold font-mono uppercase tracking-[0.2em] leading-relaxed mb-10">
                            // ACCOUNT SECURED VIA BIOMETRIC TELEMETRY AND ENCRYPTED SESSION TOKENS.
                        </p>
                        <Button variant="outline" className="w-full h-14 rounded-none border-white/10 text-white hover:bg-white/10 text-[10px] font-black uppercase tracking-widest">
                            Rotate_Identity_Lease
                        </Button>
                    </div>
                    {/* Visual Grid Pattern */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none font-mono text-[8px] leading-none p-4 break-all">
                        {Array(10).fill("SYSTEM_INTEGRITY_CHECK_OK_2FA_ENABLED").join(" ")}
                    </div>
                </div>
            </div>
        </div>
    )
}

function SecurityTab() {
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-12 border border-slate-200 rounded-none group hover:border-slate-950 transition-colors">
                    <div className="size-16 border-2 border-slate-950 flex items-center justify-center mb-8 shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
                        <Fingerprint size={28} strokeWidth={2.5} className="text-slate-950" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-tighter">Multi-Factor_Auth</h3>
                    <p className="text-slate-400 text-xs font-bold font-mono leading-relaxed mb-10 uppercase opacity-70">
                        // SECURE NODE ACCESS BY REQUIRING CRYPTOGRAPHIC VERIFICATION ON ENTRANCE.
                    </p>
                    <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-200 group-hover:border-slate-950 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="size-2 bg-primary animate-pulse shadow-[0_0_8px_rgba(161,70,161,0.6)]" />
                            <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.2em] font-mono">STATUS::OPERATIONAL</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-10 px-6 rounded-none text-[10px] font-black uppercase tracking-widest border-slate-200 hover:border-slate-950">
                            CONFIGURE
                        </Button>
                    </div>
                </div>

                <div className="bg-white p-12 border border-slate-200 rounded-none group hover:border-slate-950 transition-colors">
                    <div className="size-16 border-2 border-slate-950 flex items-center justify-center mb-8 shadow-[6px_6px_0px_rgba(0,0,0,0.05)]">
                        <Key size={28} strokeWidth={2.5} className="text-slate-950" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-tighter">API_Access_Lease</h3>
                    <p className="text-slate-400 text-xs font-bold font-mono leading-relaxed mb-10 uppercase opacity-70">
                        // MANAGE TOKENS FOR AUTONOMOUS ENGINE INTEGRATION AND AUTOMATED REPORTING.
                    </p>
                    <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-200 group-hover:border-slate-950 transition-colors">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-slate-950 uppercase tracking-[0.2em] font-mono">ACTIVE_TOKENS::04</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-10 px-6 rounded-none text-[10px] font-black uppercase tracking-widest border-slate-200 hover:border-slate-950">
                            MANAGE
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-12 border border-slate-200 rounded-none relative overflow-hidden group hover:border-slate-950 transition-colors">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-6 h-[2px] bg-slate-950" />
                    <h3 className="text-lg font-black text-slate-950 uppercase tracking-tighter flex items-center gap-4">
                        <Lock size={20} strokeWidth={2.5} /> Password_Protocol
                    </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-mono">CURRENT_CIPHER</label>
                        <input type="password" placeholder="••••••••••••" className="w-full h-14 px-5 rounded-none border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-950 outline-none transition-all text-xs font-bold font-mono uppercase" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-mono">NEW_ENCRYPTION_STRING</label>
                        <input type="password" placeholder="••••••••••••" className="w-full h-14 px-5 rounded-none border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-950 outline-none transition-all text-xs font-bold font-mono uppercase" />
                    </div>
                </div>
                <Button className="h-14 px-10 rounded-none bg-slate-950 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest shadow-[8px_8px_0px_rgba(0,0,0,0.1)] transition-all">
                    Update_Protocol_Cipher
                </Button>
            </div>
        </div>
    )
}

function SubscriptionTab() {
    return (
        <div className="space-y-12">
            <div className="p-16 border-2 border-slate-950 bg-white rounded-none relative overflow-hidden group">
                {/* Visual Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none font-mono text-[8px] leading-none overflow-hidden uppercase whitespace-pre p-2">
                    {Array(40).fill("ENTERPRISE_LICENSE_VERIFIED_V4.2 ").join("\n")}
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-16">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] border border-slate-950 mb-10">
                            <Zap size={14} className="fill-primary text-primary" /> ACTIVE_LICENSE_TIER
                        </div>
                        <h2 className="text-5xl font-black text-slate-950 mb-6 tracking-tighter uppercase">Enterprise <span className="text-slate-300">Hub</span></h2>
                        <p className="text-slate-500 font-bold font-mono text-xs uppercase max-w-lg leading-relaxed mb-12 opacity-80">
                            // COMPLETE AUTONOMOUS CAPACITY WITH UNLIMITED ASSESSMENTS AND PRIORITY NODE SCHEDULING.
                        </p>
                        <div className="flex items-center gap-12">
                            <div>
                                <p className="text-4xl font-black text-slate-950 tracking-tighter italic">$499<span className="text-sm font-bold text-slate-400">/MO</span></p>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2 font-mono">BILLING_CYCLE::YEARLY</p>
                            </div>
                            <div className="w-[1px] h-14 bg-slate-100" />
                            <div>
                                <p className="text-4xl font-black text-slate-950 tracking-tighter">MAX</p>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2 font-mono">NODE_CAPACITY</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 min-w-[300px]">
                        <Button className="w-full h-16 px-10 bg-slate-950 hover:bg-slate-800 rounded-none shadow-[10px_10px_0px_rgba(15,23,42,0.1)] text-white font-black text-[11px] uppercase tracking-widest transition-all">
                            Manage_Subscription
                        </Button>
                        <Button variant="outline" className="w-full h-16 px-10 border-slate-200 text-slate-950 hover:border-slate-950 rounded-none font-black text-[11px] uppercase tracking-widest transition-all bg-white">
                            Fetch_Invoices
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-12 border border-slate-200 rounded-none relative overflow-hidden group">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-10 font-mono">QUOTA_TELEMETRY</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">MONTHLY_SCANS</span>
                                <span className="text-[10px] font-black text-slate-950 font-mono">42 / 100</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-none overflow-hidden">
                                <div className="h-full w-[42%] bg-slate-950" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">API_THREADS</span>
                                <span className="text-[10px] font-black text-slate-950 font-mono">8.4K / 50K</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-none overflow-hidden">
                                <div className="h-full w-[17%] bg-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
