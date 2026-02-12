"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export function CurtainMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    const links = [
        { name: "Product", href: "#" },
        { name: "Solutions", href: "#" },
        { name: "Resources", href: "#" },
        { name: "Company", href: "#" },
        { name: "Pricing", href: "#" },
    ]

    return (
        <>
            {/* Menu Trigger */}
            <button
                onClick={toggleMenu}
                className="z-50 relative p-2 -mr-2 text-slate-900 focus:outline-none"
                aria-label="Toggle menu"
            >
                <div className="flex flex-col gap-1.5 w-8 items-end">
                    <span className={cn("h-0.5 bg-slate-900 transition-all duration-300", isOpen ? "w-8 rotate-45 translate-y-2" : "w-8")} />
                    <span className={cn("h-0.5 bg-slate-900 transition-all duration-300", isOpen ? "opacity-0" : "w-6 group-hover:w-8")} />
                    <span className={cn("h-0.5 bg-slate-900 transition-all duration-300", isOpen ? "w-8 -rotate-45 -translate-y-2" : "w-4")} />
                </div>
            </button>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Modal Card */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-6xl h-[80vh] bg-[#FDFCF8] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            {/* Close Button (Mobile) */}
                            <button onClick={toggleMenu} className="absolute top-6 right-6 md:hidden p-2">
                                <X className="size-6 text-slate-900" />
                            </button>

                            {/* Left Column: Navigation */}
                            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
                                <nav className="flex flex-col space-y-4">
                                    {links.map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 hover:text-primary transition-colors inline-flex items-center group"
                                            >
                                                {link.name}
                                                <ArrowRight className="ml-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 size-8 text-primary" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                <div className="mt-12 flex gap-8 text-sm font-medium text-slate-500">
                                    <Link href="#" className="hover:text-slate-900">Sign In</Link>
                                    <Link href="#" className="hover:text-slate-900">Contact Support</Link>
                                    <Link href="#" className="hover:text-slate-900">Careers</Link>
                                </div>
                            </div>

                            {/* Right Column: Rich Content */}
                            <div className="w-full md:w-[45%] bg-slate-100 relative overflow-hidden hidden md:block group cursor-pointer">
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors z-10" />

                                {/* Placeholder Image/Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20" />
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="size-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <div className="size-16 rounded-full bg-white flex items-center justify-center pl-1 shadow-lg">
                                            <Play className="size-6 text-slate-900 fill-slate-900" />
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-12 left-12 right-12 text-slate-900 z-20">
                                    <h3 className="text-2xl font-bold mb-2">Our Story</h3>
                                    <p className="text-slate-700">See how we're redefining enterprise security with autonomous agents.</p>
                                </div>

                                {/* Abstract shapes / Image placeholder */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-50 mix-blend-multiply" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
