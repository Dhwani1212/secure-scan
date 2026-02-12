import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/20 blur-[100px] rounded-full" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Start building with confidence</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
                    Join thousands of engineering teams who trust SecureScan to manage their AI infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 min-w-[200px]">
                        Get Started Now
                    </Button>
                    <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800 min-w-[200px]">
                        Contact Sales
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
