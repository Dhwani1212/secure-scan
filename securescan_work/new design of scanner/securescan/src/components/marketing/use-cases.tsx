"use client"

import { Terminal, Shield, Users, Cpu } from "lucide-react"

const cases = [
    {
        role: "Engineering Teams",
        desc: "Ship AI agents faster with pre-built CI/CD pipelines and sandbox environments.",
        icon: Terminal
    },
    {
        role: "Security Teams",
        desc: "Enforce DLP, access controls, and compliance policies across all agent interactions.",
        icon: Shield
    },
    {
        role: "Operations",
        desc: "Monitor costs, latency, and performance metrics in real-time dashboards.",
        icon: Cpu
    },
    {
        role: "Product Teams",
        desc: "Iterate on agent prompts and behaviors without waiting for deployment cycles.",
        icon: Users
    }
]

export function UseCases() {
    return (
        <section id="resources" className="py-24 bg-slate-50/50 border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for every team</h2>
                <p className="text-slate-500">Unified collaboration for the AI-native enterprise.</p>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cases.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-4">
                                <item.icon className="size-5" />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">{item.role}</h3>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
