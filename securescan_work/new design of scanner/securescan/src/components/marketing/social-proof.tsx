export function SocialProof() {
    const logos = [
        { name: "Acme Corp", opacity: "opacity-40" },
        { name: "Quantum", opacity: "opacity-60" },
        { name: "Echo", opacity: "opacity-50" },
        { name: "Celestial", opacity: "opacity-40" },
        { name: "Pulse", opacity: "opacity-60" },
        { name: "Apex", opacity: "opacity-50" },
    ]
    // Using placeholders since I don't have SVGs. Using text for low-fi/minimal look or simple blocks.
    // Actually, I'll use simple text with heavy font for a clean look, or abstract shapes if requested.
    // Prompt says "Muted grayscale logos".

    return (
        <section className="py-10 border-y border-slate-50 bg-slate-50/20">
            <div className="container mx-auto px-4 md:px-6">
                <p className="text-center text-sm font-semibold text-slate-500 mb-8 uppercase tracking-wider">
                    Trusted by 2,000+ organizations
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Mock Logos - replacing with simple text to avoid broken images */}
                    {logos.map((logo, i) => (
                        <div key={i} className={`text-xl font-bold font-sans text-slate-400 ${logo.opacity}`}>
                            {logo.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
