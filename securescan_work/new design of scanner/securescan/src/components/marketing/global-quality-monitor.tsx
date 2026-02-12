"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Shield, Globe as GlobeIcon, Zap, CheckCircle2 } from "lucide-react";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
    ssr: false,
});

export function GlobalQualityMonitor() {
    const globeConfig = {
        pointSize: 4,
        globeColor: "#0A1229", // Industrial Navy
        showAtmosphere: true,
        atmosphereColor: "#a146a1",
        atmosphereAltitude: 0.15,
        emissive: "#0A1229",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#38bdf8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.3193, lng: 114.1694 },
        autoRotate: true,
        autoRotateSpeed: 0.8,
    };

    const colors = ["#a146a1", "#c084fc", "#10b981"]; // Purple, Light Purple, Emerald

    const sampleArcs = [
        { order: 1, startLat: 40.7128, startLng: -74.006, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.2, color: colors[0] }, // NY to London
        { order: 1, startLat: 35.6762, startLng: 139.6503, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.3, color: colors[1] }, // Tokyo to SG
        { order: 2, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: colors[2] }, // Delhi to KL
        { order: 2, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: colors[0] }, // Sydney to HK
        { order: 3, startLat: 48.8566, startLng: 2.3522, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5, color: colors[1] }, // Paris to BA
        { order: 3, startLat: 19.4326, startLng: -99.1332, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: colors[2] }, // Mexico to LA
        { order: 4, startLat: 55.7558, startLng: 37.6173, endLat: 39.9042, endLng: 116.4074, arcAlt: 0.3, color: colors[0] }, // Moscow to Beijing
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden border-t border-slate-100">
            <div className="container mx-auto px-6 md:px-12 text-center relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white mb-6">
                        <GlobeIcon size={12} className="animate-spin-slow" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Global Quality Mapping</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.8] mb-8">
                        Global Reliability, <br />
                        <span className="text-emerald-600">Clinical Outcomes.</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                        Visualizing real-time project quality results and security handshakes across our globalized edge network.
                        Every arc represents a verified outcome.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12 items-center justify-center mb-24">
                    <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100">
                        <div className="size-10 rounded-full bg-purple-100 flex items-center justify-center text-primary">
                            <Zap size={20} />
                        </div>
                        <div className="text-left">
                            <span className="block text-2xl font-black text-slate-900">12ms</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Sync</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100">
                        <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 size={20} />
                        </div>
                        <div className="text-left">
                            <span className="block text-2xl font-black text-slate-900">100%</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Uptime Integrity</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Globe Container */}
            <div className="relative w-full h-[600px] md:h-[800px] -mt-40 pointer-events-none">
                <div className="absolute inset-0 z-10 pointer-events-auto">
                    <World data={sampleArcs} globeConfig={globeConfig} />
                </div>

                {/* Aesthetic Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white pointer-events-none z-20" />
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />
            </div>

            {/* Floating Info Snippets */}
            <div className="container mx-auto px-6 relative -mt-32 z-30 pointer-events-none">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["North America: Active", "Europe: Verified", "APAC: Monitoring", "LatAm: Protected"].map((label, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="p-4 bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl flex items-center gap-3"
                        >
                            <div className="size-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">{label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
