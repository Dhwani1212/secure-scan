"use client"

import { useRef, useEffect } from "react"

interface Particle {
    x: number
    y: number
    size: number
    speed: number
    opacity: number
    char: string
}

export function DNAParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particles = useRef<Particle[]>([])
    const chars = "010101<>{}[]!@#$%^&*()_+"

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            init()
        }

        const init = () => {
            particles.current = []
            for (let i = 0; i < 150; i++) {
                particles.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 8 + 8,
                    speed: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.1,
                    char: chars[Math.floor(Math.random() * chars.length)]
                })
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.font = "bold 10px monospace"

            particles.current.forEach((p) => {
                ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})` // Blue-400
                ctx.fillText(p.char, p.x, p.y)

                p.x += p.speed
                if (p.x > canvas.width) {
                    p.x = -20
                    p.y = Math.random() * canvas.height
                    p.char = chars[Math.floor(Math.random() * chars.length)]
                }
            })

            animationFrameId = requestAnimationFrame(draw)
        }

        window.addEventListener("resize", resize)
        resize()
        draw()

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-40"
        />
    )
}
