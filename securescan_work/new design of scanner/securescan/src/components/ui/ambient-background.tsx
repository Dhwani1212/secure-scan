"use client"

import { useEffect, useRef } from "react"

export function AmbientBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let width = window.innerWidth
        let height = window.innerHeight

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        const points: { x: number; y: number; vx: number; vy: number }[] = []
        const pointCount = 40

        for (let i = 0; i < pointCount; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
            })
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height)
            ctx.strokeStyle = "rgba(15, 23, 42, 0.06)" // Subtle Slate-900
            ctx.lineWidth = 1

            points.forEach((p, i) => {
                p.x += p.vx
                p.y += p.vy

                if (p.x < 0 || p.x > width) p.vx *= -1
                if (p.y < 0 || p.y > height) p.vy *= -1

                points.slice(i + 1).forEach((p2) => {
                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < 250) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                })
            })

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none opacity-40 bg-[#FAF9F6]"
        />
    )
}
