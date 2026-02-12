"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Send } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#050505] text-white pt-20 overflow-hidden relative">
            <div className="container mx-auto px-6 md:px-12 relative z-10">

                {/* Top Section: Brand & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
                    <div>
                        <div className="mb-6">
                            {/* Reusing the logo SVG but forcing white color via filter or class if possible, 
                     or just using text if SVG isn't easily color-swapped without prop drilling. 
                     For now using text as requested "instead amini text there should be i securify" */}
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">iSecurify</h2>
                        </div>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-md leading-relaxed">
                            Blending deep tech with local context for shared prosperity across the Global South.
                        </p>
                    </div>

                    <div className="flex flex-col justify-start">
                        <h3 className="text-lg font-medium mb-4">Subscribe to our newsletter</h3>
                        <div className="relative max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-full py-3 pl-5 pr-12 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 transition-colors"
                            />
                            <button className="absolute right-1.5 top-1.5 p-1.5 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white">
                                <ArrowRight className="size-4" />
                            </button>
                        </div>
                        <p className="text-[10px] text-zinc-600 mt-3 uppercase tracking-wider font-medium">
                            By subscribing you agree to our <span className="underline decoration-zinc-700 underline-offset-2">Terms</span>.
                        </p>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 mb-24">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Links</h4>
                        <ul className="space-y-4 text-sm text-zinc-300">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Platform</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact us</Link></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm text-zinc-300">
                            <li><Link href="#" className="hover:text-white transition-colors">Our Platform</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Why iSecurify?</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-zinc-300">
                            <li><Link href="#" className="hover:text-white transition-colors">Case Studies</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Blog & Insights</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Research</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Socials</h4>
                        <ul className="space-y-4 text-sm text-zinc-300">
                            <li><Link href="#" className="hover:text-white transition-colors">LinkedIn</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">X (Twitter)</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-900 pt-8 mb-32 md:mb-48 text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                    <p>© Copyright 2026 iSecurify.AI</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-zinc-400 transition-colors">Data Platform TOS</Link>
                    </div>
                </div>
            </div>

            {/* Massive Watermark Text */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
                <h1 className="text-[18vw] leading-[0.8] font-black text-center text-zinc-800 tracking-tighter whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b from-zinc-800 to-zinc-950 transform translate-y-[10%]">
                    ISECURIFY
                </h1>
            </div>
        </footer>
    )
}
