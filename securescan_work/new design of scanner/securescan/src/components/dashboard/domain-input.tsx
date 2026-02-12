"use client"

import { Globe, Search } from "lucide-react"

interface DomainInputProps {
    value: string
    onChange: (val: string) => void
}

export function DomainInput({ value, onChange }: DomainInputProps) {
    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Globe className="size-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            </div>
            <input
                type="text"
                placeholder="TARGET_URI_INPUT::[example.com]"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-24 pl-16 pr-6 bg-white border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] rounded-none text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-slate-950 transition-all text-2xl font-black uppercase tracking-tighter"
            />
            <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hidden sm:block font-mono">NODE_INIT::READY</span>
            </div>
            {/* Bottom technical line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-100 group-focus-within:bg-primary transition-colors" />
        </div>
    )
}
