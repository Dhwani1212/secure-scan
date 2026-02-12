"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function ProjectInfo() {
    return (
        <section className="py-32 md:py-48 bg-[#FDFCF8] text-center px-4">
            <div className="container mx-auto max-w-4xl">
                <ScrollReveal>
                    <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-[#1a1a1a] mb-16 leading-[0.9]">
                        Security made simple
                    </h2>
                </ScrollReveal>

                <ScrollReveal>
                    <p className="text-xl md:text-2xl font-medium text-[#1a1a1a] leading-relaxed max-w-2xl mx-auto">
                        Powered by state-of-the-art AI models and an ever-expanding threat library,
                        iSecurify doesn't just know how to find vulnerabilities—it actively learns and
                        adapts faster than any cyber threat that has come before it.
                    </p>
                </ScrollReveal>
            </div>
        </section>
    )
}
