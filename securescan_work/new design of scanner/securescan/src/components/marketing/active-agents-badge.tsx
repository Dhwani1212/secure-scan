"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"

export function ActiveAgentsBadge() {
    const [count, setCount] = useState(1248)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev + Math.floor(Math.random() * 3))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl ring-1 ring-inset ring-white/5 pointer-events-none select-none"
        >
            <div className="relative">
                <Users size={14} className="text-primary" />
                <span className="absolute -top-1 -right-1 size-1.5 bg-primary rounded-full animate-ping" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-none mb-0.5">Active Agents</span>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={count}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs font-black text-white leading-none"
                    >
                        {count.toLocaleString()}
                    </motion.span>
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
