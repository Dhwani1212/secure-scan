"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function ScanBar() {
    const [domain, setDomain] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (domain.trim()) {
            router.push(`/dashboard/new?domain=${encodeURIComponent(domain.trim())}`)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4 relative">
            {/* CLI Tooltip */}
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl z-20 flex items-center gap-2 whitespace-nowrap"
                    >
                        <span className="text-primary">TIP:</span> Enter any domain to begin deep-recon
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`relative group flex items-center bg-white/40 backdrop-blur-xl border-2 transition-all duration-500 rounded-[2rem] p-2 ${isFocused
                    ? "border-slate-900 shadow-2xl shadow-slate-200 ring-8 ring-slate-900/5"
                    : "border-slate-100 shadow-xl shadow-slate-200/50 hover:border-slate-200"
                    }`}
            >
                <div className="flex items-center gap-3 pl-6 pr-2">
                    <span className="font-mono text-slate-400 font-bold select-none text-sm md:text-base">scanner &gt;</span>
                </div>

                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="enter_target_domain.com"
                    className="flex-1 bg-transparent border-none outline-none py-4 text-slate-900 font-mono text-sm md:text-lg placeholder:text-slate-300 placeholder:italic"
                />

                <button
                    type="submit"
                    disabled={!domain.trim()}
                    className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-all disabled:opacity-30 disabled:grayscale group/btn shrink-0"
                >
                    <ArrowRight className="size-5 md:size-6 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {/* Pulsing indicator */}
                {!domain && !isFocused && (
                    <div className="absolute left-[7.5rem] md:left-[8.5rem] top-1/2 -translate-y-1/2 pointer-events-none">
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-[2px] h-6 md:h-7 bg-slate-400"
                        />
                    </div>
                )}
            </motion.form>

            <div className="flex items-center justify-center gap-4 mt-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-1.5"><Search size={14} /> Full Port Scan</span>
                <span className="flex items-center gap-1.5"><Search size={14} /> Subdomain Enumeration</span>
                <span className="flex items-center gap-1.5"><Search size={14} /> Vulnerability Audit</span>
            </div>
        </div>
    )
}
