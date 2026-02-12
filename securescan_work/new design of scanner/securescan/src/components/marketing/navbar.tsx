"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { JellyThemeToggle } from "./jelly-theme-toggle"

export function Navbar() {
    const [isHovered, setIsHovered] = useState(false)
    const pathname = usePathname()
    const isDashboard = pathname ? pathname.startsWith("/dashboard") : false

    const links = isDashboard ? [
        { name: "Dashboard", href: "/dashboard" },
        { name: "New Scan", href: "/dashboard/new" },
        { name: "Scan History", href: "/dashboard/history" },
        { name: "Assessments", href: "/dashboard/assessments" },
        { name: "Profile", href: "/dashboard/profile" },
        { name: "Settings", href: "/dashboard/settings" },
    ] : [
        { name: "Product", href: "#" },
        { name: "Solutions", href: "#" },
        { name: "Resources", href: "#" },
        { name: "Company", href: "#" },
        { name: "Pricing", href: "#" },
    ]

    return (
        <>
            {/* Centered Floating Island Logo & Expanded Menu */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none"
            >
                <motion.div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-white rounded-full shadow-xl shadow-slate-200/50 flex items-center border border-slate-100 backdrop-blur-md bg-white/90 pointer-events-auto h-12 overflow-hidden"
                    style={{ paddingLeft: 8, paddingRight: 8 }}
                    animate={{
                        width: isHovered ? "auto" : "fit-content"
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8
                    }}
                >
                    <Link href="/" className="flex items-center shrink-0 px-4">
                        <Image
                            src="/logo_isecurify.svg"
                            alt="iSecurify"
                            width={120}
                            height={32}
                            className="h-6 w-auto"
                            priority
                        />
                    </Link>

                    <AnimatePresence mode="wait">
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{
                                    opacity: 1,
                                    width: "auto",
                                }}
                                exit={{
                                    opacity: 0,
                                    width: 0,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                className="flex items-center overflow-hidden whitespace-nowrap"
                            >
                                <div className="w-1 h-3 bg-primary mx-2" />
                                <div className="flex items-center gap-1 px-2">
                                    {links.map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: i * 0.03,
                                                duration: 0.2
                                            }}
                                        >
                                            <Link
                                                href={link.href}
                                                className="px-3 py-2 hover:bg-slate-50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.header>

            {/* Top Right Action Buttons (Relocated) */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-6 right-6 z-50 hidden md:flex items-center gap-5"
            >
                <JellyThemeToggle />
                {!isDashboard ? (
                    <>
                        <Link href="/login">
                            <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-white hover:shadow-sm rounded-full px-6 border border-slate-100/50">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="sm" className="rounded-full px-6 bg-slate-950 hover:bg-primary shadow-xl shadow-primary/10 text-white font-bold text-[10px] uppercase tracking-widest transition-all">
                                Sign Up
                            </Button>
                        </Link>
                    </>
                ) : (
                    <div className="flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg shadow-primary/20 border border-slate-100">
                        <Link href="/login">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-rose-600 rounded-full text-[10px] font-bold uppercase tracking-widest px-6 h-9 transition-colors">
                                Sign Out
                            </Button>
                        </Link>
                    </div>
                )}
            </motion.div>
        </>
    )
}