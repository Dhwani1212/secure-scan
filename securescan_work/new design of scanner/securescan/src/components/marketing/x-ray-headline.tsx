"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function XRayHeadline() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { stiffness: 150, damping: 20 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                mouseX.set(e.clientX - rect.left)
                mouseY.set(e.clientY - rect.top)
            }
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    const maskImage = useTransform(
        [x, y],
        ([latestX, latestY]) => `radial-gradient(250px circle at ${latestX}px ${latestY}px, black 0%, transparent 100%)`
    )

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-none select-none py-10"
        >
            {/* Base "Clean" Text */}
            <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter text-slate-900 leading-[0.8] uppercase">
                DECODING<br />DOMAINS
            </h1>

            {/* Hidden "Metadata" Layer */}
            <motion.div
                className="absolute inset-x-0 top-10 pointer-events-none"
                style={{
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                }}
            >
                <div className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.8] uppercase text-primary/20 font-mono">
                    {/* Background noise of IPs and data */}
                    <div className="absolute inset-0 flex flex-wrap gap-2 overflow-hidden opacity-10 text-[8px] font-mono leading-none tracking-widest p-4">
                        {Array.from({ length: 1000 }).map((_, i) => (
                            <span key={i} className="text-primary">
                                {Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}.xxx.xxx
                            </span>
                        ))}
                    </div>
                    <span className="relative z-10 text-primary block">
                        42.67.110.12<br />INFRA_RECON
                    </span>
                </div>
            </motion.div>

            {/* Flashlight Cursor */}
            <motion.div
                style={{ left: x, top: y, opacity: isHovered ? 1 : 0 }}
                className="pointer-events-none absolute size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl"
            />
            <motion.div
                style={{ left: x, top: y, opacity: isHovered ? 1 : 0 }}
                className="pointer-events-none absolute size-1 border border-primary/50 rounded-full flex items-center justify-center"
            >
                <div className="size-[200px] border border-primary/5 [mask-image:radial-gradient(circle,white,transparent)] rounded-full" />
            </motion.div>
        </div>
    )
}
