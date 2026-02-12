import { Shield, Zap, Globe, Lock } from "lucide-react"

const features = [
    {
        icon: Shield,
        title: "Secure by default",
        description: "Enterprise-grade security and compliance built-in from day one. SOC2 Type II ready."
    },
    {
        icon: Globe,
        title: "Agent Orchestration",
        description: "Manage fleets of intelligent agents at scale across multiple environments."
    },
    {
        icon: Zap,
        title: "Deep Integrations",
        description: "Connect seamlessly with your existing internal tools, databases, and APIs."
    },
    {
        icon: Lock,
        title: "Full Governance",
        description: "Complete visibility, granular permissions, and immutable audit logs for every action."
    },
]

export function Features() {
    return (
        <section id="solutions" className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <div key={i} className="group p-6 rounded-2xl border border-slate-100 bg-slate-50/20 hover:bg-slate-50 hover:border-slate-200 transition-all duration-300">
                            <div className="size-12 rounded-lg bg-purple-50 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                                <feature.icon className="size-6" />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
