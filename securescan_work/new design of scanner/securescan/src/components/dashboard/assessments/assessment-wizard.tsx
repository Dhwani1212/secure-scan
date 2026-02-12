"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { api, AssessmentItem } from "@/lib/api"
import { ChevronRight, ChevronLeft, Shield, CheckCircle2, Loader2, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function AssessmentWizard() {
    const router = useRouter()
    const [questions, setQuestions] = useState<AssessmentItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [currentStep, setCurrentStep] = useState(0) // 0: Intro, 1+: Questions
    const [flatQuestions, setFlatQuestions] = useState<any[]>([])
    const [responses, setResponses] = useState<Record<string, string>>({})
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await api.getAssessmentQuestions()
                setQuestions(data)

                // Flatten questions for easier navigation
                const flat: any[] = []
                data.forEach(cat => {
                    cat.questions.forEach(q => {
                        flat.push({ ...q, category: cat.category })
                    })
                })
                setFlatQuestions(flat)
            } catch (error) {
                console.error("Failed to fetch questions", error)
                setError("COMMUNICATION_FAILURE::BACKEND_UNREACHABLE")
            } finally {
                setLoading(false)
            }
        }
        fetchQuestions()
    }, [])

    const handleOptionSelect = (questionId: number, optionKey: string) => {
        setResponses(prev => ({
            ...prev,
            [questionId.toString()]: optionKey
        }))

        // Auto-advance after a short delay
        setTimeout(() => {
            if (currentQuestionIdx < flatQuestions.length - 1) {
                setCurrentQuestionIdx(prev => prev + 1)
            } else {
                // Last question answered
                // We could show a "Review" screen or just stay here
            }
        }, 300)
    }

    const handleSubmit = async () => {
        if (Object.keys(responses).length < flatQuestions.length) {
            alert("Please answer all questions before submitting.")
            return
        }

        setSubmitting(true)
        try {
            const result = await api.submitAssessment(responses)
            router.push(`/dashboard/assessments/result/${result.assessmentId}`)
        } catch (error) {
            console.error("Failed to submit assessment", error)
            alert("Submission failed. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest">Initialising_Assessment_Engine...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[400px] text-center">
                <AlertTriangle className="text-red-500 mb-4" size={40} />
                <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter mb-2">Protocol_Initialization_Failed</h3>
                <p className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest mb-8">{error}</p>
                <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="border-2 border-slate-950 rounded-none font-black text-[10px] uppercase tracking-widest"
                >
                    Retry_Link
                </Button>
            </div>
        )
    }

    if (currentStep === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto text-center py-12"
            >
                <div className="inline-block p-4 border border-slate-200 mb-8 bg-white shadow-sm">
                    <Shield className="text-primary" size={32} />
                </div>
                <h2 className="text-3xl font-black text-slate-950 tracking-tighter uppercase mb-6">Maturity Assessment Protocol</h2>
                <p className="text-slate-600 font-mono text-sm font-bold leading-relaxed mb-12">
                    This protocol evaluates your security controls across 40 critical vectors.
                    Be accurate in your responses to ensure effective gap analysis and risk remediation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
                    <div className="p-6 border border-slate-100 bg-slate-50/50">
                        <div className="text-[10px] font-black text-primary uppercase mb-2">Phase_01</div>
                        <div className="text-xs font-bold text-slate-950 uppercase">Basic Controls</div>
                    </div>
                    <div className="p-6 border border-slate-100 bg-slate-50/50">
                        <div className="text-[10px] font-black text-primary uppercase mb-2">Phase_02</div>
                        <div className="text-xs font-bold text-slate-950 uppercase">Infrastructure</div>
                    </div>
                    <div className="p-6 border border-slate-100 bg-slate-50/50">
                        <div className="text-[10px] font-black text-primary uppercase mb-2">Phase_03</div>
                        <div className="text-xs font-bold text-slate-950 uppercase">Governance</div>
                    </div>
                </div>
                <Button
                    onClick={() => setCurrentStep(1)}
                    className="h-16 px-12 bg-slate-950 hover:bg-black text-white rounded-none font-black text-[11px] uppercase tracking-widest transition-all"
                >
                    Begin_Sequence
                    <ArrowRight className="ml-4 size-4" />
                </Button>
            </motion.div>
        )
    }

    const currentQuestion = flatQuestions[currentQuestionIdx]
    const progress = ((currentQuestionIdx + 1) / flatQuestions.length) * 100
    const isAnswered = responses[currentQuestion?.id.toString()]

    return (
        <div className="max-w-3xl mx-auto py-12 px-4">
            {/* Progress Header */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">
                        Assessment_In_Progress::{currentQuestion.category}
                    </div>
                    <div className="text-[10px] font-black text-slate-400 font-mono">
                        {currentQuestionIdx + 1} / {flatQuestions.length}
                    </div>
                </div>
                <div className="h-1 w-full bg-slate-100 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border-2 border-slate-950 p-10 md:p-16 relative shadow-[8px_8px_0_rgba(0,0,0,0.05)]"
                >
                    <div className="absolute -top-3 -left-3 bg-slate-950 text-white px-3 py-1 font-mono text-[10px] font-bold">
                        Q::{currentQuestion.id.toString().padStart(2, '0')}
                    </div>

                    <h3 className="text-2xl font-black text-slate-950 mb-12 tracking-tighter leading-tight uppercase italic">
                        {currentQuestion.text}
                    </h3>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option: any, index: number) => (
                            <button
                                key={option.key}
                                onClick={() => handleOptionSelect(currentQuestion.id, option.key)}
                                className={cn(
                                    "w-full p-6 text-left border-2 transition-all group flex items-center justify-between",
                                    responses[currentQuestion.id.toString()] === option.key
                                        ? "border-primary bg-purple-50/30 ring-1 ring-primary"
                                        : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={cn(
                                        "w-8 h-8 flex items-center justify-center font-mono text-xs font-black border-2",
                                        responses[currentQuestion.id.toString()] === option.key
                                            ? "border-primary bg-primary text-white"
                                            : "border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-600"
                                    )}>
                                        {option.key}
                                    </div>
                                    <span className={cn(
                                        "font-bold text-sm uppercase tracking-tight",
                                        responses[currentQuestion.id.toString()] === option.key
                                            ? "text-primary"
                                            : "text-slate-600"
                                    )}>
                                        {option.text}
                                    </span>
                                </div>
                                {responses[currentQuestion.id.toString()] === option.key && (
                                    <CheckCircle2 className="text-primary" size={20} />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Footer */}
            <div className="mt-12 flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIdx === 0}
                    className="font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-950"
                >
                    <ChevronLeft className="mr-2" size={16} />
                    Previous_Buffer
                </Button>

                {currentQuestionIdx === flatQuestions.length - 1 && isAnswered ? (
                    <Button
                        size="lg"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="h-14 px-10 bg-primary hover:opacity-90 text-white rounded-none font-black text-[10px] uppercase tracking-widest transition-all"
                    >
                        {submitting ? (
                            <Loader2 className="animate-spin mr-2" size={14} />
                        ) : (
                            <Shield className="mr-2" size={14} />
                        )}
                        Finalize_Assessment
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setCurrentQuestionIdx(prev => Math.min(flatQuestions.length - 1, prev + 1))}
                        disabled={!isAnswered}
                        className="h-14 px-10 border-2 border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-white rounded-none font-black text-[10px] uppercase tracking-widest transition-all"
                    >
                        Next_Question
                        <ChevronRight className="ml-2" size={16} />
                    </Button>
                )}
            </div>

            {/* Error Message for incomplete survey */}
            {currentQuestionIdx === flatQuestions.length - 1 && !submitting && Object.keys(responses).length < flatQuestions.length && (
                <div className="mt-6 p-4 border border-amber-200 bg-amber-50 flex items-center gap-3 text-amber-800 text-[10px] font-black uppercase tracking-widest">
                    <AlertTriangle size={14} />
                    Warning: All questions must be answered for complete scoring.
                </div>
            )}
        </div>
    )
}

function ArrowRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
