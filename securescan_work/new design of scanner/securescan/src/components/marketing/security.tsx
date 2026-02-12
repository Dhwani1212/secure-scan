import { ShieldCheck, Lock, FileKey } from "lucide-react"

export function SecuritySection() {
    return (
        <section id="security" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Enterprise-grade Security</h2>
                    <p className="text-slate-500">
                        We meet the most stringent security and compliance requirements of the world's leading organizations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <ShieldCheck className="size-12 text-primary mx-auto mb-4" />
                        <h3 className="font-semibold text-slate-900 mb-2">SOC2 Type II</h3>
                        <p className="text-sm text-slate-500">Independently audited and verified for security, availability, and confidentiality.</p>
                    </div>
                    <div className="p-6">
                        <Lock className="size-12 text-primary mx-auto mb-4" />
                        <h3 className="font-semibold text-slate-900 mb-2">End-to-End Encryption</h3>
                        <p className="text-sm text-slate-500">Data is encrypted at rest and in transit using industry-standard protocols.</p>
                    </div>
                    <div className="p-6">
                        <FileKey className="size-12 text-primary mx-auto mb-4" />
                        <h3 className="font-semibold text-slate-900 mb-2">GDPR & CCPA Ready</h3>
                        <p className="text-sm text-slate-500">Built-in tools to help you manage data privacy and compliance requests.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
