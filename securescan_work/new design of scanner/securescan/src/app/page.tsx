"use client"

import React, { useRef } from "react"
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/marketing/navbar"
import { Hero } from "@/components/marketing/hero"
import { AnatomyOfScan } from "@/components/marketing/anatomy-of-scan"
import { PerformanceVisualizer } from "@/components/marketing/performance-visualizer"
import { OutcomeMetrics } from "@/components/marketing/outcome-metrics"
import { Footer } from "@/components/marketing/footer"
import { HolographicGlobe } from "@/components/marketing/holographic-globe"
import { BrandReveal } from "@/components/marketing/brand-reveal"

export default function Home() {
  const [showContent, setShowContent] = React.useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Globe transitions:
  // Starts offset to the right (Hero position)
  // Transitions to center on scroll (Gradual journey)
  // Fades out before footer
  const globeOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.9, 1], [1, 1, 0.3, 0.3, 0])
  const globeX = useTransform(scrollYProgress, [0, 0.25], ["29vw", "0vw"])
  const globeY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <main ref={containerRef} className="min-h-screen bg-transparent relative">
      <AnimatePresence>
        {!showContent && (
          <BrandReveal
            onRevealStart={() => setShowContent(true)}
            onRevealComplete={() => { }}
          />
        )}
      </AnimatePresence>

      {/* Global Persistent Globe Background - Moved outside to guarantee visibility */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            opacity: globeOpacity,
            x: globeX,
            y: globeY,
          }}
          className="relative"
        >
          <HolographicGlobe isActive={showContent} />
        </motion.div>
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-50"
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        animate={{
          opacity: showContent ? 1 : 0,
          scale: showContent ? 1 : 1.05,
          filter: showContent ? "blur(0px)" : "blur(10px)"
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <div className="relative z-10">
          <Hero />
          <AnatomyOfScan />
          <PerformanceVisualizer />
          <OutcomeMetrics />
          <Footer />
        </div>
      </motion.div>
    </main>
  )
}
