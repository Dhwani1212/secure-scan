"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

interface ScrollRevealProps {
    children: React.ReactNode
}

export function ScrollReveal({ children }: ScrollRevealProps) {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start 0.9", "start 0.25"]
    })

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
    const y = useTransform(scrollYProgress, [0, 1], [50, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0])

    return (
        <motion.div
            ref={container}
            style={{ opacity, y, scale, rotateX, transformPerspective: "1000px" }}
            className="will-change-transform"
        >
            {children}
        </motion.div>
    )
}
