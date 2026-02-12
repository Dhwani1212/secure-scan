"use client"

import { motion } from "framer-motion"

const activities = [
    { domain: "example-fin.com", status: "CLEAN", ip: "104.21.34.xxx", origin: "US", type: "success" },
    { domain: "crypto-vault.io", status: "SCANNING", ip: "172.67.142.xxx", origin: "SG", type: "info" },
    { domain: "hidden-phish.net", status: "THREAT", ip: "185.22.110.xxx", origin: "RU", type: "danger" },
    { domain: "secure-node.app", status: "CLEAN", ip: "76.76.21.xxx", origin: "NL", type: "success" },
    { domain: "dev-portal-304.org", status: "CLEAN", ip: "13.248.169.xxx", origin: "DE", type: "success" },
    { domain: "malicious-db.ru", status: "THREAT", ip: "91.241.19.xxx", origin: "BY", type: "danger" },
    { domain: "api-gateway.com", status: "SCANNING", ip: "35.211.90.xxx", origin: "UK", type: "info" },
    { domain: "enterprise-auth.net", status: "CLEAN", ip: "52.84.162.xxx", origin: "FR", type: "success" },
]

export function LiveActivityTicker() {
    return (
        <div className="relative mt-12 w-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

            <motion.div
                animate={{ x: [0, -2000] }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex gap-8 whitespace-nowrap py-4"
            >
                {[...activities, ...activities].map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 px-6 py-3 bg-white/40 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-sm group hover:scale-105 transition-transform duration-300"
                    >
                        <div className="flex flex-col items-start leading-none gap-1">
                            <span className="font-mono text-[10px] text-slate-400 font-bold tracking-tighter">{item.ip} [{item.origin}]</span>
                            <span className="font-mono text-xs text-slate-900 font-black tracking-tight uppercase">{item.domain}</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-2">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md tracking-widest ${item.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                item.type === "danger" ? "bg-rose-50 text-rose-600 border border-rose-100" :
                                    "bg-purple-50 text-primary border border-purple-100"
                                }`}>
                                [{item.status}]
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
