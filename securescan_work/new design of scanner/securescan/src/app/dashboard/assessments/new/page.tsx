"use client"

import { motion } from "framer-motion"
import { AssessmentWizard } from "@/components/dashboard/assessments/assessment-wizard"

export default function NewAssessmentPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
            <div className="max-w-4xl mb-12 border-b border-slate-200 pb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-[1px] bg-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Protocol_044::Maturity_Assessment</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-none uppercase">
                        Active <br />
                        <span className="text-slate-400">Questionnaire</span>
                    </h1>
                </motion.div>
            </div>

            <AssessmentWizard />
        </div>
    )
}
