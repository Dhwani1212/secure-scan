import Link from "next/link"
import Image from "next/image"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-[#FAF9F6]">
            {/* Left side: Security UI / Image */}
            <div className="relative hidden w-full md:flex md:w-1/2 lg:w-[48%] bg-[#0A0C10] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center brightness-[0.7] contrast-[1.1]"
                    style={{ backgroundImage: "url('/auth-bg.png')" }}
                />
                {/* Sophisticated Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0C10] via-[#0A0C10]/80 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_50%)]" />

                <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">
                    <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
                        <Image
                            src="/logo_isecurify.svg"
                            alt="iSecurify"
                            width={160}
                            height={48}
                            className="brightness-0 invert h-9 w-auto"
                            priority
                        />
                    </Link>

                    <div className="max-w-xl">
                        <h2 className="text-5xl font-semibold text-white mb-6 leading-[1.1] tracking-tight">
                            Autonomous security for the <span className="text-primary">modern enterprise.</span>
                        </h2>
                        <p className="text-slate-400 text-xl leading-relaxed font-light">
                            Deploy intelligent agents that scan, detect, and defend your infrastructure around the clock.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
                        <span className="hover:text-slate-300 cursor-default transition-colors">© 2026 iSecurify Inc.</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-300 transition-colors">Security Standards</Link>
                    </div>
                </div>

                {/* Advanced decorative elements */}
                <div className="absolute -bottom-32 -left-32 size-[500px] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute top-1/4 -right-16 size-80 bg-primary/10 blur-[100px] rounded-full" />
            </div>

            {/* Right side: Auth forms */}
            <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 md:px-16 lg:px-24">
                <div className="w-full max-w-[420px]">
                    {children}
                </div>
            </div>
        </div>
    )
}
