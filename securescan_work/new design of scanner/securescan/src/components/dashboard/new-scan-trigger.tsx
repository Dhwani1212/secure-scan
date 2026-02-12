"use client"

import { Plus, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function NewScanTrigger() {
    return (
        <Link href="/dashboard/assessments">
            <Button
                className="h-14 px-8 bg-slate-950 hover:bg-black rounded-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-white font-black uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px] active:translate-y-[1px] group border border-slate-800"
            >
                <div className="mr-4 p-1 bg-white/10 group-hover:bg-primary transition-colors">
                    <Plus size={16} strokeWidth={3} />
                </div>
                Access_Protocol
                <Zap className="ml-4 size-4 text-primary group-hover:animate-pulse" />
            </Button>
        </Link>
    )
}
