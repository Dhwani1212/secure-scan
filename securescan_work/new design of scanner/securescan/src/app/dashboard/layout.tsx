"use client"

import { Navbar } from "@/components/marketing/navbar"
import { PortalTransition } from "@/components/ui/portal-transition"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="min-h-screen bg-transparent selection:bg-purple-50 selection:text-primary">
            <Navbar />
            <PortalTransition>
                {children}
            </PortalTransition>
        </main>
    )
}
