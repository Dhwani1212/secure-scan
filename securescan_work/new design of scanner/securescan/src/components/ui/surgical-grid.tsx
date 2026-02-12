"use client"

import { motion } from "framer-motion"

export function SurgicalGrid() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Base Coordinate Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #a146a1 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.35
                }}
            />

            {/* Ambient Purple Glows */}
            <div className="absolute -top-[10%] -left-[10%] size-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute top-[20%] -right-[10%] size-[30%] bg-purple-200/20 blur-[100px] rounded-full" />

            {/* Subtle Lattice Structure */}
            <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage: `linear-gradient(#a146a1 1px, transparent 1px), linear-gradient(90deg, #a146a1 1px, transparent 1px)`,
                    backgroundSize: '160px 160px'
                }}
            />

            {/* Subtle Gradient Overlay to fade grid at edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 opacity-20" />

            {/* Decorative Corner Accents (Surgical Brackets) */}
            <div className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-primary/10" />
            <div className="absolute top-12 right-12 w-8 h-8 border-t-2 border-r-2 border-primary/10" />
            <div className="absolute bottom-12 left-12 w-8 h-8 border-b-2 border-l-2 border-primary/10" />
            <div className="absolute bottom-12 right-12 w-8 h-8 border-b-2 border-r-2 border-primary/10" />

            {/* Faint Horizontal Scanning Line (Refined for Brand) */}
            <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "200%" }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent z-10"
            />
        </div>
    )
}
